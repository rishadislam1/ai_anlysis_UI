import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, FileExcelOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

// Define the component
const UploadExcel: React.FC = () => {
    // State to hold the list of uploaded files
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Props for the Ant Design Upload component
    const props: UploadProps = {
        // Action URL is not needed as we are handling the file in the frontend
        // In a real application, you would put your server upload endpoint here.
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', // Mock API for demonstration

        // Function to run before a file is uploaded
        beforeUpload: (file) => {
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
            if (!isExcel) {
                message.error(`${file.name} is not an Excel file`);
            }
            // Prevent default upload behavior if it's not an excel file
            return isExcel || Upload.LIST_IGNORE;
        },

        // Handle changes in the file list (e.g., adding or removing files)
        onChange: ({ file, fileList: newFileList }) => {
            if (file.status !== 'uploading') {
                console.log(file, newFileList);
            }
            // Only update the file list if the file is an Excel file
            const excelFiles = newFileList.filter(f => {
                const isExcel = f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || f.type === 'application/vnd.ms-excel';
                if (!isExcel && f.originFileObj) { // Check originFileObj for newly added files
                    return false;
                }
                return true;
            });
            setFileList(excelFiles);
        },

        // Custom renderer for each item in the file list
        itemRender: (_originNode, file, _currFileList, actions) => (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#fafafa',
                    width: '220px', // Fixed width for each item
                }}
                className="ant-upload-list-item"
            >
                <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <FileExcelOutlined style={{ color: '#217346', fontSize: '24px', marginRight: '8px' }} />
                    <span style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {file.name}
                    </span>
                </div>
                <CloseOutlined
                    style={{ cursor: 'pointer', color: '#8c8c8c' }}
                    onClick={actions.remove}
                />
            </div>
        ),

        // Display files in a horizontal list
        listType: "picture",

        // Pass the current file list to the component
        fileList: fileList,
    };

    return (
        <div>
            {/* The antd Upload component's list container is targeted via its class for flex styling */}
            <style>{`
                .ant-upload-list-picture {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
            `}</style>
            <Upload {...props}>
                <Button type="primary" icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </div>
    );
};

export default UploadExcel;
