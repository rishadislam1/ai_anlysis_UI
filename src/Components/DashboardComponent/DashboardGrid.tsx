import React, { useMemo, useState, useEffect } from "react";
import { Responsive, WidthProvider, type Layout } from "react-grid-layout";
import { Checkbox } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { dashboardStore } from "@/store/dashboard_store.ts";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "../../assets/css/DashboardDetails.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
    isEditable: boolean;
    onLayoutChange: (layout: Layout[]) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ isEditable, onLayoutChange }) => {
    const { dashboardData } = dashboardStore();
    const [currentLayout, setCurrentLayout] = useState<Layout[]>([]);

    const layout = useMemo(
        () =>
            dashboardData?.widgets.map((widget) => ({
                i: widget.id.toString(),
                x: widget.options.position.col,
                y: widget.options.position.row,
                w: widget.options.position.sizeX,
                h: widget.options.position.sizeY,
                minW: widget.options.position.minSizeX,
                maxW: widget.options.position.maxSizeX,
                minH: widget.options.position.minSizeY,
                maxH: widget.options.position.maxSizeY,
            })) || [],
        [dashboardData]
    );

    useEffect(() => {
        setCurrentLayout(layout);
    }, [layout]);

    return (
        <div className='space-y-2'>
            {isEditable && (
                <div className="card flex justify-between items-center text-sm p-3">
                    <Checkbox>Use Dashboard Level Filters</Checkbox>
                </div>
            )}
            <div className={isEditable ? "grid-wrapper" : ""}>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{ lg: currentLayout }}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
                    cols={{ lg: 6, md: 6, sm: 4, xs: 2 }}
                    rowHeight={50}
                    margin={[10, 10]}
                    containerPadding={[4, 4]}
                    isResizable={isEditable}
                    isDraggable={isEditable}
                    compactType={null}
                    preventCollision={true}
                    resizeHandles={["se"]}
                    useCSSTransforms={false}
                    onDragStop={(layout) => {
                        setCurrentLayout(layout);
                        onLayoutChange(layout);
                    }}
                    onResizeStop={(layout) => {
                        setCurrentLayout(layout);
                        onLayoutChange(layout);
                    }}
                >
                    {dashboardData?.widgets.map((widget) => (
                        <div key={widget.id.toString()} className="card">
                            <Markdown remarkPlugins={[remarkGfm]}>{widget.text}</Markdown>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            </div>
        </div>
    );
};

export default DashboardGrid;