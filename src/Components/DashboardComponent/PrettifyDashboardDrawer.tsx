import React, { useState } from "react";
import { Drawer, Button, Modal, message } from "antd";
import prettifyDashboard1 from "@/assets/images/dashboards_prettify_1.jpg";
import prettifyDashboard2 from "@/assets/images/dashboards_prettify_2.jpg";
import prettifyDashboard3 from "@/assets/images/dashboards_prettify_3.jpg";

interface PrettifyDashboardDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrettifyDashboardDrawer: React.FC<PrettifyDashboardDrawerProps> = ({isOpen, onClose}) => {

    const [messageApi, messageContextHolder] = message.useMessage();
    const [selectedItem, setSelectedItem] = useState<number | null>(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const prettifyDashboardContent: { name: string; image: string }[] = [
        { name: "Example 1", image: prettifyDashboard1 },
        { name: "Example 2", image: prettifyDashboard2 },
        { name: "Example 3", image: prettifyDashboard3 },
    ];

    return (
        <>
            {messageContextHolder}
            <Drawer
                title="Prettify Dashboard"
                onClose={onClose}
                open={isOpen}
                mask={false}
                width={250}
                closable={false}
                footer={
                    <div className="flex items-center justify-center space-x-2">
                        <div>
                            <Button
                                type="primary"
                                onClick={() => {
                                    messageApi.open({
                                        type: "error",
                                        content: "Submission failed",
                                    });
                                }}
                                style={{ borderRadius: 0 }}
                            >
                                Apply
                            </Button>
                        </div>
                        <div>
                            <Button onClick={onClose} style={{ borderRadius: 0 }}>
                                Close
                            </Button>
                        </div>
                    </div>
                }
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
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className="w-full object-cover rounded-sm"
                                />
                                {hoveredIndex === index && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                                        onClick={() => setSelectedItem(index)}
                                    >
                                        <Button
                                            type={"primary"}
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
                            <img
                                src={prettifyDashboard1}
                                alt={"Comming Soon"}
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div className="border border-white rounded-sm bg-black p-2 text-center text-white">
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
                        className="preview-modal"
                        width={"80%"}
                    >
                        <img src={previewImage || ""} alt="Preview" className="w-full" />
                    </Modal>
                </div>
            </Drawer>
        </>
    );
};

export default PrettifyDashboardDrawer;