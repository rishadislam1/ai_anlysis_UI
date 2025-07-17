import {Responsive, WidthProvider} from 'react-grid-layout';

import {useParams} from 'react-router-dom';
import {dashboardStore} from "@/store/dashboard_store.ts";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "./DashboardDetails.css";
import {Button, Modal, Tooltip} from "antd";
import {FaCheck} from "react-icons/fa";
import {MdWidgets} from "react-icons/md";
import {useState} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardDetails = () => {
    const {name} = useParams<string>();
    const {dashboardData, handleToggleFavourite} = dashboardStore();
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [selectedTextWidget, setSelectedTextWidget] = useState<string>('');

    const layout = [
        {i: '1', x: 0, y: 0, w: 2, h: 2},
        {i: '2', x: 2, y: 0, w: 2, h: 2},
        {i: '3', x: 4, y: 0, w: 2, h: 2},
    ];
    const [textWidget, setTextWidget] = useState<string[]>([]);

    const handleSave = () => {
        setIsTextModalOpen(false);
    }

    const handleAddToDashboard = () => {
        setIsTextModalOpen(false);
        const arr = [...textWidget];
        arr.push(selectedTextWidget);
        setTextWidget(arr);
    }

    return (
        <div>
            <div className='mb-2 flex justify-between items-center'>
                <h1 className="text-2xl">
                    <span
                        className={`text-${dashboardData?.favourite ? 'yellow' : 'gray'}-500 cursor-pointer me-2`}
                        onClick={() => handleToggleFavourite(dashboardData)}
                    >
                        {dashboardData?.favourite ? '★' : '☆'}
                    </span>
                    {name}
                </h1>
                <Button type='primary' style={{borderRadius: 0}} className='align-middle'><FaCheck/> Save</Button>
            </div>

            <div className="grid-wrapper">
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{lg: layout}}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
                    cols={{lg: 6, md: 6, sm: 4, xs: 2}}
                    rowHeight={50}
                    margin={[10, 10]}                  // spacing between items
                    containerPadding={[4, 4]}       // spacing on grid edges
                    isResizable={true}
                    isDraggable={true}
                    compactType={null}
                    preventCollision={true}
                    resizeHandles={['se']}
                >
                    {textWidget.map((text, index) =>
                        <div key={index} className="card">
                            <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
                        </div>)}
                </ResponsiveGridLayout>
            </div>

            <div className="card flex justify-between items-center text-sm fixed bottom-5 right-5 left-30 p-3">
                <div className="flex items-center space-x-2">
                    <MdWidgets size={25}/>
                    <p>Widgets are individual report visualizations or text boxes you can place on your dashboard in various arrangements</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => setIsTextModalOpen(true)} style={{borderRadius: '0px'}}>Add Text</Button>
                    <Button type={'primary'} style={{borderRadius: '0px'}} className={'font-light'}>Add Widget</Button>
                </div>
            </div>

            <Modal
                title="Add Text"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isTextModalOpen}
                onOk={handleAddToDashboard}
                onCancel={handleSave}
                okText={'Add to Dashboard'}
                cancelText={'Save'}
            >
                <textarea
                    value={selectedTextWidget}
                    onChange={(e) => {
                        setSelectedTextWidget(e.target.value);
                    }}
                    className='rounded-sm focus:rounded-none border border-blue-100 w-full p-3'
                    rows={6}
                    placeholder='This is where you write some text'
                />
                <span className='text-xs'>
                    Supports basic {" "}
                    <Tooltip placement="top" title='Markdown guide opens in new tab' >
                      <a target='_blank' href='https://www.markdownguide.org/cheat-sheet/#basic-syntax'>Markdown</a>；
                    </Tooltip>
                    <Tooltip placement="top" title='How to use Markdown' >
                      <a target='_blank' href='https://www.runoob.com/markdown/md-tutorial.html'>How to use Markdown</a>；
                    </Tooltip>
                </span>
            </Modal>
        </div>
    );

};

export default DashboardDetails;