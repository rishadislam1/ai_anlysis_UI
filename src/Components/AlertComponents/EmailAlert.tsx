import React, { useState } from 'react';
import {Form, type FormInstance, Input} from 'antd';

const { TextArea } = Input;

// --- PROPS INTERFACE ---
interface EmailAlertProps {
    form: FormInstance;
}

// --- EMAIL ALERT SETTINGS COMPONENT ---
// This component renders the form for configuring an email alert.

const EmailAlert: React.FC<EmailAlertProps> = ({ form }) => {
    const [showAdditional, setShowAdditional] = useState(false);

    return (
        <Form layout="vertical" form={form}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the alert name!' }]}
            >
                <Input placeholder="My Email" />
            </Form.Item>
            <Form.Item
                label="Addresses"
                name="addresses"
                rules={[{ required: true, message: 'Please input at least one email address!' }]}
            >
                <TextArea rows={4} placeholder="Enter email addresses, separated by commas" />
            </Form.Item>

            {/* This is the toggle button for additional settings */}
            <div
                className="p-3 my-4 text-center bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => setShowAdditional(!showAdditional)}
                style={{ border: '1px solid #d9d9d9' }}
            >
                Additional Settings {showAdditional ? '▲' : '▼'}
            </div>


            {showAdditional && (
                <Form.Item
                    label="主题模板" // Subject Template
                    name="subjectTemplate"
                    initialValue="{{state}} {{alert_name}}"
                >
                    <Input />
                </Form.Item>
            )}
        </Form>
    );
};

export default EmailAlert;
