import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Avatar,
    Typography,
    Space,
    Tag,
    Divider,
    Modal,
    Alert,
    type FormProps
} from 'antd';
import { CopyOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Define a type for the alert state
type AlertState = {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
} | null;

const UserDetails: React.FC = () => {
    // State for the main form
    const [apiKey, setApiKey] = useState<string>('mJ.9l4Qj42.IVoD884k0Be9aeo..dc7lv6SZHoDPOSUh2u');

    // State for the modal visibility
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    // State to show the "Copied" message below the input
    const [isCopied, setIsCopied] = useState<boolean>(false);

    // State to manage the Alert component
    const [alertState, setAlertState] = useState<AlertState>(null);

    // Ant Design form instance for the modal form
    const [form] = Form.useForm();

    // Function to show an alert and automatically hide it

    // @ts-ignore
    const showAlert = (message: string, type: AlertState['type']) => {
        setAlertState({ message, type });
        setTimeout(() => {
            setAlertState(null);
        }, 3000);
    };

    // Handler for the main form submission
    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
        showAlert('User  saved successfully!', 'success');
    };

    // Handler for main form submission failure
    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        showAlert('Please fill in all required fields.', 'error');
    };

    // Handler to copy the API key
    const handleCopyApiKey = () => {
        const textArea = document.createElement('textarea');
        textArea.value = apiKey;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err:unknown) {
            showAlert('Failed to copy API Key.', err);
        }
        document.body.removeChild(textArea);
    };

    // Handler to regenerate the API key
    const handleRegenerateApiKey = () => {
        const newKey = 'mJ.' + Math.random().toString(36).substring(2, 15) + '..' + Math.random().toString(36).substring(2, 20);
        setApiKey(newKey);
        showAlert('A new API Key has been generated.', 'info');
    };

    // --- Modal Handlers ---
    const showChangePasswordModal = () => setIsModalVisible(true);
    const handleOk = () => form.submit();
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Handle the password change form submission
    const onFinishChangePassword: FormProps['onFinish'] = (values) => {
        console.log('Password Change Success:', values);
        showAlert('Password changed successfully!', 'success');
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            <div style={{ padding: '24px', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                {/* Alert placeholder */}
                <div style={{ marginBottom: alertState ? '24px' : '0', transition: 'margin-bottom 0.3s' }}>
                    {alertState && (
                        <Alert
                            message={alertState.message}
                            type={alertState.type}
                            showIcon
                            closable
                            onClose={() => setAlertState(null)}
                        />
                    )}
                </div>

                <Space align="center" style={{ marginBottom: '24px' }}>
                    <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#e6f7ff', color: '#1890ff', border: '1px solid #1890ff' }} />
                    <Title level={2} style={{ margin: 0 }}>rishadislam</Title>
                </Space>

                <Form name="userDetails" layout="vertical" initialValues={{ name: 'rishadislam', email: 'wdnishad@gmail.com' }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item label={<Title level={5}>Name</Title>} name="name" required rules={[{ required: true, message: 'Please input the user name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={<Title level={5}>Email</Title>} name="email" required rules={[{ required: true, message: 'Please input the user email!' }, { type: 'email', message: 'The input is not a valid E-mail!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={<Title level={5}>Groups</Title>}>
                        <Space><Tag color="blue">admin</Tag><Tag>default</Tag></Space>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Save</Button>
                    </Form.Item>
                </Form>

                <Divider />

                <Form layout="vertical">
                    <Form.Item label={<Title level={5}>API Key</Title>}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Input value={apiKey} readOnly addonAfter={<CopyOutlined onClick={handleCopyApiKey} style={{ cursor: 'pointer' }} />} />
                            <div style={{ height: '22px' }}>
                                {isCopied && <Text style={{ color: 'green' }}>Copied</Text>}
                            </div>
                            <Button style={{ width: '100%' }} onClick={handleRegenerateApiKey}>Regenerate API Key</Button>
                        </Space>
                    </Form.Item>
                    <Divider />
                    <Form.Item label={<Title level={5}>Password</Title>}>
                        <Button style={{ width: '100%' }} onClick={showChangePasswordModal}>Change Password</Button>
                    </Form.Item>
                </Form>
            </div>

            <Modal title="Change Password" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Yes" cancelText="Cancel" destroyOnClose>
                <Form form={form} name="changePassword" layout="vertical" onFinish={onFinishChangePassword} autoComplete="off">
                    <Form.Item name="currentPassword" label="Current Password" rules={[{ required: true, message: 'Please input your current password!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="newPassword" label="New Password" rules={[{ required: true, message: 'Please input your new password!' }]} hasFeedback>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="repeatNewPassword" label="Repeat New Password" dependencies={['newPassword']} hasFeedback rules={[{ required: true, message: 'Please confirm your new password!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('newPassword') === value) { return Promise.resolve(); } return Promise.reject(new Error('The two passwords that you entered do not match!')); }, }),]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserDetails;
