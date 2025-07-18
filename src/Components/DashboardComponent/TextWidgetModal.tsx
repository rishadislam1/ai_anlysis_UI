import React from "react";
import { Modal, Tooltip } from "antd";

interface TextWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
    selectedText: string;
    setSelectedText: (text: string) => void;
}

const TextWidgetModal: React.FC<TextWidgetModalProps> = ({isOpen, onClose, onAdd, selectedText, setSelectedText}) => {
    return (
        <Modal
            title="Add Text"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isOpen}
            onOk={onAdd}
            onCancel={onClose}
            okText="Add to Dashboard"
            cancelText="Save"
        >
      <textarea
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
          className="rounded-sm focus:rounded-none border border-blue-100 w-full p-3"
          rows={6}
          placeholder="This is where you write some text"
      />
            <span className="text-xs">
        Supports basic{" "}
                <Tooltip placement="top" title="Markdown guide opens in new tab">
          <a
              target="_blank"
              href="https://www.markdownguide.org/cheat-sheet/#basic-syntax"
          >
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
    );
};

export default TextWidgetModal;