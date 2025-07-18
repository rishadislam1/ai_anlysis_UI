import React, { useState, useEffect } from 'react';
import {Form, Input, Button, Space, Typography, Modal, type FormInstance,} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;


// --- MOCK DATA & INTERFACES ---
// In a real application, this data would come from an API.

interface AlertDetailsData {
    id: number;
    name: string;
    type: 'email'; // For this example, we'll focus on the email type
    addresses: string;
    subjectTemplate: string;
}

const mockDestinations: AlertDetailsData[] = [
    { id: 1, name: 'test', type: 'email', addresses: 'xd', subjectTemplate: 'teste' },
    { id: 2, name: 'test2', type: 'email', addresses: 'another@example.com', subjectTemplate: '{{state}} {{alert_name}}' },
];

// --- PROPS INTERFACE ---
interface EmailAlertFormProps {
    form: FormInstance;
}

// --- REUSABLE EMAIL FORM FOR SETTINGS ---
const EmailAlertForm: React.FC<EmailAlertFormProps> = ({ form }) => {
    const [showAdditional, setShowAdditional] = useState(true); // Default to open as in the image

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label={<Text strong>Name</Text>}
                name="name"
                rules={[{ required: true, message: 'Please input the alert name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={<Text strong>Addresses</Text>}
                name="addresses"
                rules={[{ required: true, message: 'Please input at least one email address!' }]}
            >
                <Input />
            </Form.Item>

            {/* This is the toggle button for additional settings */}
            <div style={{ marginBottom: '24px' }}>
                <Button
                    block
                    onClick={() => setShowAdditional(!showAdditional)}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}
                >
                    <Space>
                        Additional Settings
                        {showAdditional ? '▲' : '▼'}
                    </Space>
                </Button>
            </div>

            {showAdditional && (
                <Form.Item
                    label="主题模板" // Subject Template
                    name="subjectTemplate"
                >
                    <Input />
                </Form.Item>
            )}
        </Form>
    );
};


// --- MAIN ALERT DETAILS COMPONENT ---

const AlertDetails: React.FC = () => {
    const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();

    const [destination, setDestination] = useState<AlertDetailsData | null>(null);

    useEffect(() => {
        // Find the destination from mock data based on the URL id
        const dest = mockDestinations.find(d => d.id.toString() === id);
        if (dest) {
            setDestination(dest);
            // Set form fields with the fetched data
            form.setFieldsValue({
                name: dest.name,
                addresses: dest.addresses,
                subjectTemplate: dest.subjectTemplate,
            });
        }
    }, [id, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            console.log('Saving values:', { ...destination, ...values });
            // Here you would typically make an API call to save the data
            // navigate('/data_sources/alert_setting'); // Redirect after save
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this destination?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('Deleting destination:', destination?.id);
                // Here you would make an API call to delete the data
                // navigate('/data_sources/alert_setting'); // Redirect after delete
            },
        });
    };

    if (!destination) {
        return <div>Loading... or Destination not found.</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '24px' }}>
            <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: '32px' }}>
                <MailOutlined style={{ fontSize: '32px', color: '#595959' }} />
                <Title level={2}>Email</Title>
            </Space>

            <EmailAlertForm form={form} />

            <div style={{ marginTop: '32px' }}>
                <Button type="primary" block size="large" onClick={handleSave}>
                    Save
                </Button>
                <Button
                    type="primary"
                    danger
                    block
                    style={{ marginTop: '16px' }}
                    onClick={showDeleteConfirm}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default AlertDetails;
