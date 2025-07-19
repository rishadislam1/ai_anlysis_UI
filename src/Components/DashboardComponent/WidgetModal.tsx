import React from "react";
import {Modal, Tooltip} from "antd";

interface TextWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
    selectedText: string;
    setSelectedText: (text: string) => void;
}

const WidgetModal: React.FC<TextWidgetModalProps> = ({isOpen, onClose, onAdd, selectedText, setSelectedText}) => {
    return (
        <Modal
            title="Add Widget"
            closable={{"aria-label": "Custom Close Button"}}
            open={isOpen}
            onOk={onAdd}
            onCancel={onClose}
            okText="Add to Dashboard"
            cancelText="Cancel"
            okButtonProps={{ disabled: true }}
            width={"40%"}
        >
            <input
                className="rounded-none bg-white w-full p-3 py-1 text-xs border border-gray-200 hover:border-blue-400"
                style={{ marginBottom: "0.5rem" }}
                placeholder="Search a report by name"
                value={selectedText}
                onChange={(e) => {
                    setSelectedText(e.target.value);
                }}
            />
            <span className="text-xs text-gray-400">
                Sorry, we couldn't find anything.
            </span>
        </Modal>
    );
};

export default WidgetModal;