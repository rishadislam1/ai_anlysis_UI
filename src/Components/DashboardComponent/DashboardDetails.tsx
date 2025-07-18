import { Responsive, WidthProvider } from 'react-grid-layout';
import { useNavigate, useParams } from 'react-router-dom';
import { dashboardStore } from '@/store/dashboard_store.ts';
import { Button, Dropdown, type MenuProps, Modal, Tooltip } from 'antd';
import { FaCheck } from 'react-icons/fa';
import { MdFullscreen, MdWidgets } from 'react-icons/md';
import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SlOptionsVertical } from 'react-icons/sl';
import { IoIosArrowDown, IoMdShare } from 'react-icons/io';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { LuRefreshCw } from 'react-icons/lu';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './DashboardDetails.css';
import avatar from '@/assets/gravatar.png';

const DashboardDetails = () => {
    const [modal, contextHolder] = Modal.useModal();
    const ResponsiveGridLayout = WidthProvider(Responsive);
    const { name } = useParams<string>();
    const { dashboardData, handleToggleFavourite, setDashboardData } = dashboardStore();
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [selectedTextWidget, setSelectedTextWidget] = useState<string>('');
    const queryParams = new URLSearchParams(location.search);
    const isEditable = queryParams.get('edit') === '';
    const navigate = useNavigate();

    // Map widgets to layout for react-grid-layout
    const layout = dashboardData?.widgets.map((widget) => ({
        i: widget.id.toString(), // Use widget.id as the unique identifier
        x: widget.options.position.col,
        y: widget.options.position.row,
        w: widget.options.position.sizeX,
        h: widget.options.position.sizeY,
        minW: widget.options.position.minSizeX,
        maxW: widget.options.position.maxSizeX,
        minH: widget.options.position.minSizeY,
        maxH: widget.options.position.maxSizeY,
    })) || [];

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

    return (
        <div>
            {contextHolder}
            <div className="mb-2 flex justify-between items-center">
                <div className="text-2xl flex items-center space-x-1">
          <span
              className={`text-${dashboardData?.is_favorite ? 'yellow' : 'gray'}-500 cursor-pointer me-2`}
              onClick={() => handleToggleFavourite(dashboardData)}
          >
            {dashboardData?.is_favorite ? '★' : '☆'}
          </span>
                    <h1>{name}</h1>
                    <img src={avatar} title={dashboardData?.user.name || 'Unknown'} alt="avatar" width={16} />
                </div>
                {isEditable ? (
                    <Button
                        onClick={() => navigate(`/dashboards/${name}`)}
                        type="primary"
                        style={{ borderRadius: 0 }}
                        className="align-middle"
                    >
                        <FaCheck /> Save
                    </Button>
                ) : (
                    <div className="flex items-center space-x-1">
                        <Button>
                            <FaWandMagicSparkles /> Prettify Dashboard
                        </Button>
                        <div className="flex items-center">
                            <Button>
                                <LuRefreshCw /> Refresh
                            </Button>
                            <Button style={{ padding: '0px 10px' }}>
                                <IoIosArrowDown />
                            </Button>
                        </div>
                        <Button
                            onClick={() => {
                                modal.confirm({
                                    title: 'Confirm',
                                    content: 'Bla bla ...',
                                });
                            }}
                            style={{ padding: '0px 10px' }}
                        >
                            <MdFullscreen />
                        </Button>
                        <Button style={{ padding: '0px 10px' }}>
                            <IoMdShare />
                        </Button>
                        <Dropdown menu={{ items: EditItems }} trigger={['click']}>
                            <Button style={{ padding: '0px 10px' }}>
                                <SlOptionsVertical />
                            </Button>
                        </Dropdown>
                    </div>
                )}
            </div>

            <div className={isEditable ? 'grid-wrapper' : ''}>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{ lg: layout }}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
                    cols={{ lg: 6, md: 6, sm: 4, xs: 2 }}
                    rowHeight={50}
                    margin={[10, 10]}
                    containerPadding={[4, 4]}
                    isResizable={isEditable}
                    isDraggable={isEditable}
                    compactType={null}
                    preventCollision={true}
                    resizeHandles={['se']}
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
                        <MdWidgets size={25} />
                        <p>Widgets are individual report visualizations or text boxes you can place on your dashboard in various arrangements</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => setIsTextModalOpen(true)} style={{ borderRadius: '0px' }}>
                            Add Text
                        </Button>
                        <Button type="primary" style={{ borderRadius: '0px' }} className="font-light">
                            Add Widget
                        </Button>
                    </div>
                </div>
            )}

            <Modal
                title="Add Text"
                closable={{ 'aria-label': 'Custom Close Button' }}
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
        </div>
    );
};

export default DashboardDetails;