import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Button, Modal} from "antd";
import DashboardHeader from "@/Components/DashboardComponent/DashboardHeader.tsx";
import DashboardGrid from "@/Components/DashboardComponent/DashboardGrid.tsx";
import TextWidgetModal from "@/Components/DashboardComponent/TextWidgetModal.tsx";
import WidgetModal from "@/Components/DashboardComponent/WidgetModal.tsx";
import ShareModal from "@/Components/DashboardComponent/ShareModal.tsx";
import PrettifyDashboardDrawer from "@/Components/DashboardComponent/PrettifyDashboardDrawer.tsx";
import { dashboardStore } from "@/store/dashboard_store.ts";
import {MdWidgets} from "react-icons/md";
import type {Layout} from "react-grid-layout";

const DashboardDetailsPage: React.FC = () => {
    const { name } = useParams<string>();
    const { dashboardData, setDashboardData } = dashboardStore();
    const navigate = useNavigate();
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPrettifyDashboardOpen, setIsPrettifyDashboardOpen] = useState(false);
    const [layout, setLayout] = useState<Layout[]>([]);
    const [selectedTextWidget, setSelectedTextWidget] = useState("");
    const [selectedWidget, setSelectedWidget] = useState("");
    const queryParams = new URLSearchParams(location.search);
    const isEditable = queryParams.get("edit") === "";
    const [modal, contextHolder] = Modal.useModal();
    const [allowShareSecretAddress, setAllowShareSecretAddress] = useState(false);

    const handleSaveLayout = () => {
        if (dashboardData) {
            const updatedWidgets = dashboardData.widgets.map((widget) => {
                const layoutItem = layout.find((item) => item.i === widget.id.toString());
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
                            },
                        },
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

    const handleAddToDashboard = () => {
        if (!dashboardData || !selectedTextWidget) return;
        setIsTextModalOpen(false);
        const newWidget = {
            id: dashboardData.widgets.length ? Math.max(...dashboardData.widgets.map((w) => w.id)) + 1 : 1,
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
                    row: dashboardData.widgets.length
                        ? Math.max(
                            ...dashboardData.widgets.map((w) => w.options.position.row + w.options.position.sizeY)
                        ) : 0,
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
        setSelectedTextWidget("");
    };

    const handleArchive = () => {
        modal.confirm({
            title: "Archive Dashboard",
            content: `Are you sure? "${name?.split("-")[1].replace("_", " ")}" Archive Dashboard`,
            okText: "Yes",
        });
    };

    return (
        <div>
            {contextHolder}
            <DashboardHeader
                name={name}
                isEditable={isEditable}
                onSaveLayout={handleSaveLayout}
                onArchive={handleArchive}
                onShare={() => setIsShareModalOpen(true)}
                onPrettify={() => setIsPrettifyDashboardOpen(true)}
                allowShareSecretAddress={allowShareSecretAddress}
            />
            <DashboardGrid isEditable={isEditable} onLayoutChange={setLayout} />
            {isEditable && (
                <div className="card flex justify-between items-center text-sm fixed bottom-5 right-5 left-30 p-3">
                    <div className="flex items-center space-x-2">
                        <MdWidgets size={25} />
                        <p style={{marginBottom: 0}}>
                            Widgets are individual report visualizations or text boxes you can
                            place on your dashboard in various arrangements
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div>
                            <Button
                                onClick={() => setIsTextModalOpen(true)}
                                style={{ borderRadius: "0px" }}
                            >
                                Add Text
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => setIsWidgetModalOpen(true)}
                                type="primary" style={{ borderRadius: "0px" }}>
                                Add Widget
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <TextWidgetModal
                isOpen={isTextModalOpen}
                onClose={() => setIsTextModalOpen(false)}
                onAdd={handleAddToDashboard}
                selectedText={selectedTextWidget}
                setSelectedText={setSelectedTextWidget}
            />
            <WidgetModal
                isOpen={isWidgetModalOpen}
                onClose={() => setIsWidgetModalOpen(false)}
                onAdd={handleAddToDashboard}
                selectedText={selectedWidget}
                setSelectedText={setSelectedWidget}
            />
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                dashboardName={name}
                allowShareSecretAddress={allowShareSecretAddress}
                setAllowShareSecretAddress={setAllowShareSecretAddress}
            />
            <PrettifyDashboardDrawer
                isOpen={isPrettifyDashboardOpen}
                onClose={() => setIsPrettifyDashboardOpen(false)}
            />
        </div>
    );
};

export default DashboardDetailsPage;