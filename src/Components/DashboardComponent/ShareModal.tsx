import React from "react";
import { Modal, Switch, Button } from "antd";
import { MdContentCopy } from "react-icons/md";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    dashboardName: string | undefined;
    allowShareSecretAddress: boolean;
    setAllowShareSecretAddress: (value: boolean) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, dashboardName, allowShareSecretAddress, setAllowShareSecretAddress }) => {
    const secretAddress = `https://example.com/dashboards/${dashboardName}/secret-address`;

    return (
        <Modal
            title={
                <div>
                    <p className="text-sm" style={{marginBottom: '4px'}}>Share Dashboard</p>
                    <p className="text-xs font-light text-gray-400" style={{marginBottom: 0}}>
                        Allow public access to this dashboard with a secret address.
                    </p>
                </div>
            }
            closable={{ "aria-label": "Custom Close Button" }}
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <div className={"space-y-4 py-4 ps-4"}>
                <div className="flex items-center space-x-4">
                    <p>Allow public access</p>
                    <Switch
                        value={allowShareSecretAddress}
                        onChange={(e) => setAllowShareSecretAddress(e)}
                    />
                </div>
                {allowShareSecretAddress && (
                    <div className="flex space-x-4 items-center justify-end">
                        <label>Secret Address: </label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={secretAddress}
                                readOnly
                                className="p-2 border border-gray-300 text-xs rounded-none min-w-64"
                                style={{fontSize: "10px"}}
                            />
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(secretAddress);
                                }}
                                style={{ padding: "16px 10px" }}
                            >
                                <MdContentCopy size={16}/>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ShareModal;