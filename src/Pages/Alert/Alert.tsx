import React, { useState } from 'react';
import { Button, Card, List, Typography, Space, Modal, Steps, Input, Divider, Form } from 'antd';
import {
    MailOutlined,
    SlackOutlined,
    PlusOutlined,
    ApiOutlined,
    MessageOutlined,
    BellOutlined,
    GoogleOutlined,
    RightOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import EmailAlert from '@/Components/AlertComponents/EmailAlert'; // Assuming EmailAlert is in a separate file
import SlackAlert from '@/Components/AlertComponents/SlackAlert'; // Assuming SlackAlert is in a separate file
import WebhookAlert from "@/Components/AlertComponents/WebhookAlert";
import MattermostAlert from "@/Components/AlertComponents/MattermostAlert";
import Chatwork from "@/Components/AlertComponents/Chatwork";
import PagerDutyAlert from "@/Components/AlertComponents/PagerDutyAlert";
import GoogleHangoutsAlert from "@/Components/AlertComponents/GoogleHangoutsAlert";
import MicrosoftTeamAlert from "@/Components/AlertComponents/MicrosoftTeamAlert";


const { Text } = Typography;
const { Step } = Steps;

// --- INTERFACES AND MOCK DATA ---

// Define the type for an alert destination card
interface AlertDestination {
    id: number;
    name: string;
    type: 'email' | 'slack' | 'webhook' | 'mattermost' | 'chatwork' | 'pagerduty' | 'google-hangouts' | 'msteams';
}

// Define the type for the selection items in the modal
interface AlertTypeSelection {
    key: AlertDestination['type'];
    name: string;
    icon: React.ReactNode;
}

// Mock data for the existing alert destinations
const initialAlertDestinations: AlertDestination[] = [
    { id: 1, name: 'test', type: 'email' },
    { id: 2, name: 'test2', type: 'slack' },
];

// Data for the modal selection list
const alertTypes: AlertTypeSelection[] = [
    { key: 'email', name: 'Email', icon: <MailOutlined /> },
    { key: 'slack', name: 'Slack', icon: <SlackOutlined /> },
    { key: 'webhook', name: 'Webhook', icon: <ApiOutlined /> },
    { key: 'mattermost', name: 'Mattermost', icon: <MessageOutlined /> },
    { key: 'chatwork', name: 'ChatWork', icon: <MessageOutlined /> },
    { key: 'pagerduty', name: 'PagerDuty', icon: <BellOutlined /> },
    { key: 'google-hangouts', name: 'Google Hangouts Chat', icon: <GoogleOutlined /> },
    { key: 'msteams', name: 'Microsoft Teams Webhook', icon: <MessageOutlined /> },
];


// --- HELPER FUNCTIONS ---

// Helper to get the icon for the destination cards
const getCardIcon = (type: AlertDestination['type']) => {
    const iconNode = alertTypes.find(t => t.key === type)?.icon;
    if (React.isValidElement(iconNode)) {
        // @ts-ignore
        return React.cloneElement(iconNode, { style: { fontSize: '24px', color: '#595959' } });
    }
    return null;
};


// --- MAIN COMPONENT ---

const Alert: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [form] = Form.useForm();
    const [destinations, setDestinations] = useState<AlertDestination[]>(initialAlertDestinations);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedType, setSelectedType] = useState<AlertTypeSelection | null>(null);


    // --- MODAL HANDLERS ---
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentStep(0); // Reset step on close
        setSelectedType(null); // Reset selection
        form.resetFields(); // Reset form on close
    };

    const handleCreate = async () => {
        // On the "Setting" step (step 1), validate the form and move to the next step.
        if (currentStep === 1) {
            try {
                await form.validateFields();
                const formValues = form.getFieldsValue();
                if (selectedType) {
                    const newDestination: AlertDestination = {
                        id: Date.now(), // Use a simple unique ID
                        name: formValues.name,
                        type: selectedType.key,
                    };
                    console.log(form.getFieldsValue())
                    setDestinations(prevDestinations => [...prevDestinations, newDestination]);
                }
                handleCancel();
                setCurrentStep(currentStep - 1); // Move to "Done" step
            } catch (errorInfo) {
                console.log('Validation Failed:', errorInfo);
            }
        }

    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleTypeSelect = (type: AlertTypeSelection) => {
        setSelectedType(type);
        // Automatically advance to the next step upon selection
        setCurrentStep(1);
    };

    const handleStepClick = (step: number) => {
        // Allow navigating back to a previous step by clicking it
        if (step < currentStep) {
            setCurrentStep(step);
        }
    };


    // --- STEP DEFINITIONS ---
    const steps = [
        {
            title: 'Type selection',
            content: (
                <>
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                        style={{ marginBottom: '20px' }}
                    />
                    <List
                        dataSource={alertTypes.filter(type => type.name.toLowerCase().includes(searchText))}
                        renderItem={(item) => (
                            <List.Item
                                style={{
                                    cursor: 'pointer',
                                    padding: '12px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid transparent',
                                    borderRadius: '8px'
                                }}
                                className="hover:bg-gray-100 rounded-lg"
                                onClick={() => handleTypeSelect(item)}
                            >
                                <Space>
                                    {item.icon}
                                    <Text>{item.name}</Text>
                                </Space>
                                <RightOutlined />
                            </List.Item>
                        )}
                    />
                </>
            ),
        },
        {
            title: 'Setting',
            content: (
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <Space direction="horizontal" align="center">
                            {selectedType?.icon}
                            <Text strong>{selectedType?.name}</Text>
                        </Space>
                    </div>
                    {selectedType?.key === 'email' && <EmailAlert form={form} />}
                    {selectedType?.key === 'slack' && <SlackAlert form={form} />}
                    {selectedType?.key === 'webhook' && <WebhookAlert form={form} />}
                    {selectedType?.key === 'mattermost' && <MattermostAlert form={form} />}
                    {selectedType?.key === 'chatwork' && <Chatwork form={form} />}
                    {selectedType?.key === 'pagerduty' && <PagerDutyAlert form={form} />}
                    {selectedType?.key === 'google-hangouts' && <GoogleHangoutsAlert form={form} />}
                    {selectedType?.key === 'msteams' && <MicrosoftTeamAlert form={form} />}
                </div>
            ),
        },
        {
            title: 'Done',
            content: <div>Configuration complete for {selectedType?.name}! Click Create to finish.</div>,
        },
    ];

    return (
        <div className="p-6 font-sans">
            {/* --- MAIN CONTENT --- */}
            <div className="mb-6">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    Add Existing Alert Destinations
                </Button>
            </div>

            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
                dataSource={destinations}
                renderItem={(destination) => (
                    <List.Item>
                        <Link to={`/data_sources/destinations/${destination.id}`} style={{ textDecoration: 'none' }}>
                            <Card hoverable>
                                <Space align="center" size="large">
                                    {getCardIcon(destination.type)}
                                    <Text className="text-base">{destination.name}</Text>
                                </Space>
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />

            {/* --- MODAL --- */}
            <Modal
                title={<span className="text-xl font-semibold">Create Alert setting</span>}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    // On step 0, show "Cancel". On subsequent steps, show "Previous".
                    currentStep === 0 ? (
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>
                    ) : (
                        <Button key="previous" onClick={handleBack}>
                            Previous
                        </Button>
                    ),
                    <Button
                        key="create"
                        type="primary"
                        onClick={handleCreate}
                        disabled={currentStep === 0}
                    >
                        Create
                    </Button>,
                ]}
                width={600}
            >
                <Steps
                    current={currentStep}
                    onChange={handleStepClick}
                    className="mb-6"
                    labelPlacement="vertical"
                    progressDot // Use dots instead of numbers
                >
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <Divider />
                <div
                    className="steps-content mt-6"
                    style={{ height: '350px', overflowY: 'auto', paddingRight: '16px' }}
                >
                    {steps[currentStep].content}
                </div>
            </Modal>
        </div>
    );
};

export default Alert;
