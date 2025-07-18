import {Responsive, WidthProvider, type Layout} from 'react-grid-layout';
import {useNavigate, useParams} from 'react-router-dom';
import {dashboardStore} from '@/store/dashboard_store.ts';
import {Button, Checkbox, Drawer, Dropdown, type MenuProps, message, Modal, Switch, Tooltip} from 'antd';
import {FaCheck} from 'react-icons/fa';
import {MdContentCopy, MdFullscreen, MdWidgets} from 'react-icons/md';
import {useEffect, useMemo, useState} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {SlOptionsVertical} from 'react-icons/sl';
import {IoIosArrowDown, IoMdShare} from 'react-icons/io';
import {FaWandMagicSparkles} from 'react-icons/fa6';
import {LuRefreshCw} from 'react-icons/lu';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './DashboardDetails.css';
import avatar from '@/assets/gravatar.png';
import prettifyDashboard1 from "@/assets/dashboards_prettify_1.jpg";
import prettifyDashboard2 from "@/assets/dashboards_prettify_2.jpg";
import prettifyDashboard3 from "@/assets/dashboards_prettify_3.jpg";

const DashboardDetails = () => {
    const [modal, contextHolder] = Modal.useModal();
    const ResponsiveGridLayout = WidthProvider(Responsive);
    const {name} = useParams<string>();
    const {dashboardData, handleToggleFavourite, setDashboardData} = dashboardStore();
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPrettifyDashboardOpen, setIsPrettifyDashboardOpen] = useState(false);
    const [selectedTextWidget, setSelectedTextWidget] = useState<string>('');
    const queryParams = new URLSearchParams(location.search);
    const isEditable = queryParams.get('edit') === '';
    const navigate = useNavigate();
    const [currentLayout, setCurrentLayout] = useState<Layout[]>([]);
    const [selectedItem, setSelectedItem] = useState<number | null>(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [refreshAfter, setRefreshAfter] = useState("Disable auto refresh");
    const [allowShareSecretAddress, setAllowShareSecretAddress] = useState(false);
    const secretAddress = `https://example.com/dashboards/${name}/secret-address`;

    const layout = useMemo(() => dashboardData?.widgets.map((widget) => ({
        i: widget.id.toString(), // Use widget.id as the unique identifier
        x: widget.options.position.col,
        y: widget.options.position.row,
        w: widget.options.position.sizeX,
        h: widget.options.position.sizeY,
        minW: widget.options.position.minSizeX,
        maxW: widget.options.position.maxSizeX,
        minH: widget.options.position.minSizeY,
        maxH: widget.options.position.maxSizeY,
    })) || [], [dashboardData]);

    useEffect(() => {
        setCurrentLayout(layout);
    }, [layout]);

    const handleSaveLayout = () => {
        if (dashboardData) {
            const updatedWidgets = dashboardData.widgets.map(widget => {
                const layoutItem = currentLayout.find(item => item.i === widget.id.toString());
                if (layoutItem) {
                    return {
                        ...widget,
                        options: {
                            ...widget.options,
                            position: {
                                ...widget.options.position,
                                col: layoutItem.x,
                                row: layoutItem.y,
                                sizeX: layoutItem.w,
                                sizeY: layoutItem.h,
                            }
                        }
                    };
                }
                return widget;
            });
            setDashboardData({
                ...dashboardData,
                widgets: updatedWidgets,
            });
        }
        navigate(`/dashboards/${name}`);
    };

    const handleSave = () => {
        setIsTextModalOpen(false);
    };

    const handleAddToDashboard = () => {
        if (!dashboardData || !selectedTextWidget) return;
        setIsTextModalOpen(false);
        const newWidget = {
            id: (dashboardData.widgets.length ? Math.max(...dashboardData.widgets.map(w => w.id)) + 1 : 1), // Generate new ID
            width: 1,
            options: {
                isHidden: false,
                position: {
                    autoHeight: false,
                    sizeX: 2,
                    sizeY: 2,
                    minSizeX: 1,
                    maxSizeX: 6,
                    minSizeY: 1,
                    maxSizeY: 1000,
                    col: 0,
                    row: dashboardData.widgets.length ? Math.max(...dashboardData.widgets.map(w => w.options.position.row + w.options.position.sizeY)) : 0,
                },
                parameterMappings: {},
            },
            dashboard_id: dashboardData.id,
            text: selectedTextWidget,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        };
        setDashboardData({
            ...dashboardData,
            widgets: [...dashboardData.widgets, newWidget],
        });
        setSelectedTextWidget('');
    };

    const handleArchive = () => {
        modal.confirm({
            title: 'Archive Dashboard',
            content: `Are you sure? "${name}" Archive Dashboard`,
            okText: 'Yes',
        });
    };

    const handleShare = () => {
        setIsShareModalOpen(true);
    };

    const RefreshItems: MenuProps['items'] = ["1 m", "5 m", "10 m", "30 m", "1 h", "12 h", "1 d", "Disable auto refresh"]
        .filter(item => refreshAfter == "Disable auto refresh" ? item !== "Disable auto refresh" : true)
        .map((item, index) => ({label: item, key: index.toString(),
            onClick: () => {
                setRefreshAfter(item);
                if(item !== "Disable auto refresh") {
                    const [value, unit] = item.split(" ");
                    const time = unit === "m" ? parseInt(value) * 60 : unit === "h" ? parseInt(value) * 3600 : parseInt(value) * 86400;
                    navigate(`/dashboards/${name}?refresh=${time}`);
                }
            }}));

    const EditItems: MenuProps['items'] = [
        {
            label: 'Edit',
            key: '0',
            onClick: () => navigate(`/dashboards/${name}?edit`),
        },
        {
            label: 'Draft',
            key: '1',
            onClick: () => console.log('Draft saved!'),
        },
        {
            label: 'Archive',
            key: '2',
            onClick: handleArchive,
        },
    ];

    const prettifyDashboardContent : {name: string, image: string}[] = [
        {
            name: "Example 1",
            image: prettifyDashboard1
        },
        {
            name: "Example 2",
            image: prettifyDashboard2
        },
        {
            name: "Example 3",
            image: prettifyDashboard3
        },
    ];

    return (
        <div>
            {contextHolder}
            {messageContextHolder}
            <div className="mb-2 flex justify-between items-center">
                <div className="text-2xl flex items-center space-x-1">
                    <span
                      className={`text-${dashboardData?.is_favorite ? 'yellow' : 'gray'}-500 cursor-pointer me-2`}
                      onClick={() => handleToggleFavourite(dashboardData)}
                    >
                        {dashboardData?.is_favorite ? '★' : '☆'}
                    </span>
                    <h1>{name}</h1>
                    <img src={avatar} title={dashboardData?.user.name || 'Unknown'} alt="avatar" width={16}/>
                </div>
                {isEditable ? (
                    <Button
                        onClick={handleSaveLayout}
                        type="primary"
                        style={{borderRadius: 0}}
                        className="align-middle"
                    >
                        <FaCheck/> Save
                    </Button>
                ) : (
                    <div className="flex items-center space-x-1">
                        <Button onClick={() => setIsPrettifyDashboardOpen(true)}>
                            <FaWandMagicSparkles/> Prettify Dashboard
                        </Button>
                        <div className="flex items-center">
                            <Tooltip placement="top" title={"Auto refreshing every " + refreshAfter}>
                                <Button type={refreshAfter === "Disable auto refresh" ? 'default' : 'primary'}>
                                    <LuRefreshCw/> {refreshAfter === "Disable auto refresh" ? "Refresh" : refreshAfter}
                                </Button>
                            </Tooltip>
                            <Dropdown menu={{items: RefreshItems}} trigger={['click']} placement="bottomRight">
                                <Button style={{padding: '0px 10px'}} type={refreshAfter === "Disable auto refresh" ? 'default' : 'primary'}>
                                    <IoIosArrowDown/>
                                </Button>
                            </Dropdown>
                        </div>
                        <Button style={{padding: '0px 10px'}}>
                            <MdFullscreen/>
                        </Button>
                        <Button style={{padding: '0px 10px'}} onClick={handleShare} type={allowShareSecretAddress ? 'primary' : 'default'}>
                            <IoMdShare/>
                        </Button>
                        <Dropdown menu={{items: EditItems}} trigger={['click']}>
                            <Button style={{padding: '0px 10px'}}>
                                <SlOptionsVertical/>
                            </Button>
                        </Dropdown>
                    </div>
                )}
            </div>

            {isEditable && (
                <div className="card flex justify-between items-center text-sm p-3 mt-5">
                    <Checkbox >Use Dashboard Level Filters</Checkbox>
                </div>
            )}

            <div className={isEditable ? 'grid-wrapper' : ''}>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{lg: currentLayout}}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
                    cols={{lg: 6, md: 6, sm: 4, xs: 2}}
                    rowHeight={50}
                    margin={[10, 10]}
                    containerPadding={[4, 4]}
                    isResizable={isEditable}
                    isDraggable={isEditable}
                    compactType={null}
                    preventCollision={true}
                    resizeHandles={['se']}
                    useCSSTransforms={false}
                    onDragStop={(layout) => setCurrentLayout(layout)}
                    onResizeStop={(layout) => setCurrentLayout(layout)}
                >
                    {dashboardData?.widgets.map((widget) => (
                        <div key={widget.id.toString()} className="card">
                            <Markdown remarkPlugins={[remarkGfm]}>{widget.text}</Markdown>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>

            {isEditable && (
                <div className="card flex justify-between items-center text-sm fixed bottom-5 right-5 left-30 p-3">
                    <div className="flex items-center space-x-2">
                        <MdWidgets size={25}/>
                        <p>Widgets are individual report visualizations or text boxes you can place on your dashboard in
                            various arrangements</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => setIsTextModalOpen(true)} style={{borderRadius: '0px'}}>
                            Add Text
                        </Button>
                        <Button type="primary" style={{borderRadius: '0px'}} className="font-light">
                            Add Widget
                        </Button>
                    </div>
                </div>
            )}

            <Modal
                title="Add Text"
                closable={{'aria-label': 'Custom Close Button'}}
                open={isTextModalOpen}
                onOk={handleAddToDashboard}
                onCancel={handleSave}
                okText="Add to Dashboard"
                cancelText="Save"
            >
                <textarea
                    value={selectedTextWidget}
                    onChange={(e) => setSelectedTextWidget(e.target.value)}
                    className="rounded-sm focus:rounded-none border border-blue-100 w-full p-3"
                    rows={6}
                    placeholder="This is where you write some text"
                />
                <span className="text-xs">
                  Supports basic{' '}
                            <Tooltip placement="top" title="Markdown guide opens in new tab">
                    <a target="_blank" href="https://www.markdownguide.org/cheat-sheet/#basic-syntax">
                      Markdown
                    </a>
                    ；
                  </Tooltip>
                  <Tooltip placement="top" title="How to use Markdown">
                    <a target="_blank" href="https://www.runoob.com/markdown/md-tutorial.html">
                      How to use Markdown
                    </a>
                    ；
                  </Tooltip>
                </span>
            </Modal>
            <Drawer
                title="Prettify Dashboard"
                onClose={() => setIsPrettifyDashboardOpen(false)}
                open={isPrettifyDashboardOpen}
                mask={false}
                width={250}
                closable={false}
                footer={<div className='flex items-center justify-center space-x-4'>
                    <Button type="primary" onClick={() => {
                        messageApi.open({
                            type: 'error',
                            content: 'Submission failed',
                        });
                    }} style={{borderRadius: 0}}>
                        Apply
                    </Button>
                    <Button onClick={() => setIsPrettifyDashboardOpen(false)} style={{borderRadius: 0}}>
                        Close
                    </Button>
                </div>}
            >
                <div className="flex flex-col space-y-4 px-2">
                    {prettifyDashboardContent.map((item, index) => (
                        <div
                            key={index.toString()}
                            className="relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <h1 className="mb-2">{item?.name}</h1>
                            <div className="relative cursor-pointer">
                                <img src={item?.image} alt={item?.name} className="w-full object-cover rounded-sm" />
                                {hoveredIndex === index && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40" onClick={() => setSelectedItem(index)}>
                                        <Button
                                            type={'primary'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewImage(item?.image);
                                            }}
                                        >
                                            Preview
                                        </Button>
                                    </div>
                                )}
                                <input
                                    type="checkbox"
                                    checked={selectedItem === index}
                                    onChange={() => setSelectedItem(index)}
                                    className="absolute bottom-1 right-1 w-4 h-4"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="relative">
                        <h1 className="mb-2">More</h1>
                        <div className="relative cursor-pointer">
                            <img src={prettifyDashboard1} alt={'Comming Soon'} className="w-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div className='border border-white rounded-sm bg-black p-2 text-center text-white'>
                                    Coming Soon
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        open={!!previewImage}
                        footer={null}
                        onCancel={() => setPreviewImage(null)}
                        centered
                        className='preview-modal'
                        width={"80%"}
                    >
                        <img src={previewImage || ''} alt="Preview" className="w-full" />
                    </Modal>
                </div>
            </Drawer>

            <Modal
                title={
                    <div>
                        <p className='text-sm mb-1'>Share Dashboard</p>
                        <p className='text-xs font-light text-gray-400'>Allow public access to this dashboard with a secret address.</p>
                    </div>
                }
                closable={{'aria-label': 'Custom Close Button'}}
                open={isShareModalOpen}
                onCancel={() => setIsShareModalOpen(false)}
                footer={null}
            >
                <div className={'space-y-4 py-4 ps-4'}>
                    <div className='flex items-center space-x-4'>
                        <p>Allow public access</p>
                        <Switch value={allowShareSecretAddress} onChange={(e) => setAllowShareSecretAddress(e)} />
                    </div>

                    {allowShareSecretAddress && <div className='flex space-x-4 items-center justify-end'>
                        <label>Secret Address: </label>
                        <div className='flex items-center'>
                            <input
                                type="text"
                                value={secretAddress}
                                readOnly
                                className="p-2 border border-gray-300 text-xs rounded-none min-w-64"
                            />
                            <Button onClick={() => {navigator.clipboard.writeText(secretAddress)}} style={{padding: '16px 10px'}}><MdContentCopy /></Button>
                        </div>
                    </div>}
                </div>
            </Modal>
        </div>
    );
};

export default DashboardDetails;
