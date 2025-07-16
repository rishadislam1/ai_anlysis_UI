import {Responsive, WidthProvider} from 'react-grid-layout';

import {useParams} from 'react-router-dom';
import {dashboardStore} from "@/store/dashboard_store.ts";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "./DashboardDetails.css";
import {Button} from "antd";
import {FaCheck} from "react-icons/fa";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardDetails = () => {
    const {name} = useParams<string>();
    const {dashboardData, handleToggleFavourite} = dashboardStore();
    const layout = [
        {i: '1', x: 0, y: 0, w: 2, h: 2},
        {i: '2', x: 2, y: 0, w: 2, h: 2},
        {i: '3', x: 4, y: 0, w: 2, h: 2},
    ];

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
                <Button type='primary' style={{borderRadius: 0}} className='align-middle'><FaCheck /> Save</Button>
            </div>

            <div className="grid-wrapper">
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{lg: layout}}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
                    cols={{lg: 6, md: 6, sm: 4, xs: 2}}
                    rowHeight={50}
                    margin={[4, 4]}                  // spacing between items
                    containerPadding={[4, 4]}       // spacing on grid edges
                    isResizable={true}
                    isDraggable={true}
                    compactType={null}
                    preventCollision={true}
                    resizeHandles={['se']}
                >
                    <div key="1" className="grid-item">Item 1</div>
                    <div key="2" className="grid-item">Item 2</div>
                    <div key="3" className="grid-item">Item 3</div>
                </ResponsiveGridLayout>
            </div>
        </div>
    );

};

export default DashboardDetails;