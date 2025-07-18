import React, { useState } from 'react';
import 'antd/dist/reset.css'; // Make sure to import Ant Design styles
import { Layout, Menu, Button, Typography, Empty, List, Avatar, Modal, Input } from 'antd';
import {
    PlusOutlined,
    UserOutlined,
    DatabaseOutlined,
    CheckOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

// Define types for Ant Design components
const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

// Mock data for the members list
const membersData = [
    {
        id: '1',
        name: 'rishadislam',
        email: 'wdrishad@gmail.com',
        avatar: <UserOutlined />,
    },
];

// Mock data for users that can be added in the modal
const usersToAddData = [
    {
        id: '1',
        name: 'rishadislam',
        email: 'wdrishad@gmail.com',
        avatar: <UserOutlined />,
    },
    {
        id: '2',
        name: 'janedoe',
        email: 'jane.doe@example.com',
        avatar: <UserOutlined />,
    }
];


/**
 * GroupDetails Component (using Ant Design and TypeScript)
 * This component renders a layout with a sidebar to switch between a "Members"
 * view and a "Data Sources" view. It includes modals to add new members and data sources.
 */
const GroupDetails: React.FC = () => {
    // State to manage the currently selected menu item
    const [selectedKey, setSelectedKey] = useState('members');
    // State for members modal visibility
    const [isMembersModalVisible, setIsMembersModalVisible] = useState(false);
    // State for data source modal visibility
    const [isDataSourceModalVisible, setIsDataSourceModalVisible] = useState(false);
    // State for selected users in the modal
    const [selectedUsers, setSelectedUsers] = useState<string[]>(['1']);

    // --- Handlers for Members Modal ---
    const showMembersModal = () => setIsMembersModalVisible(true);
    const handleMembersOk = () => {
        setIsMembersModalVisible(false);
        console.log("Selected users to add:", selectedUsers);
    };
    const handleMembersCancel = () => setIsMembersModalVisible(false);

    // --- Handlers for Data Source Modal ---
    const showDataSourceModal = () => setIsDataSourceModalVisible(true);
    const handleDataSourceOk = () => {
        setIsDataSourceModalVisible(false);
        // Logic to save the new data source would go here
    };
    const handleDataSourceCancel = () => setIsDataSourceModalVisible(false);


    const toggleUserSelection = (userId: string) => {
        setSelectedUsers(prevSelected =>
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId)
                : [...prevSelected, userId]
        );
    };


    // Content for the "Data Sources" tab
    const dataSourcesContent = (
        <div style={{ padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Empty
                description={
                    <Text type="secondary">
                        There are no data sources in this group yet.
                    </Text>
                }
            >
                <Button type="primary" icon={<PlusOutlined />} onClick={showDataSourceModal}>
                    New Data Source
                </Button>
            </Empty>
        </div>
    );

    // Content for the "Members" tab
    const membersContent = (
        <div style={{ padding: '24px' }}>
            <List
                itemLayout="horizontal"
                dataSource={membersData}
                renderItem={(item) => (
                    <Link to={`/data_sources/users/${item.name}`}>
                        <List.Item style={{padding: '12px 0', cursor: 'pointer'}}>
                            <List.Item.Meta
                                avatar={<Avatar size={40} icon={item.avatar} style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }} />}
                                title={<Text strong>{item.name}</Text>}
                                description={item.email}
                            />
                        </List.Item>
                    </Link>
                )}
            />
        </div>
    );

    return (
        <>
            <Layout style={{ background: '#fff' }}>
                {/* Inner Sidebar for Admin section */}
                <Sider
                    width={240}
                    style={{
                        background: '#fff',
                        padding: '24px 8px',
                        borderRight: '1px solid #f0f0f0',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div style={{ padding: '0 16px', marginBottom: '16px' }}>
                        <Title level={5} style={{ margin: 0 }}>admin</Title>
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        onClick={({ key }) => setSelectedKey(key as string)}
                        style={{ borderRight: 0, flex: 1 }}
                        items={[
                            {
                                key: 'members',
                                icon: <UserOutlined />,
                                label: 'Members',
                            },
                            {
                                key: 'data_sources',
                                icon: <DatabaseOutlined />,
                                label: 'Data Sources',
                            },
                        ]}
                    />
                    <div style={{ padding: '16px' }}>
                        {selectedKey === 'members' ? (
                            <Button type="primary" icon={<PlusOutlined />} block onClick={showMembersModal}>
                                Add Members
                            </Button>
                        ) : (
                            <Button type="primary" icon={<PlusOutlined />} block onClick={showDataSourceModal}>
                                Add Data Source
                            </Button>
                        )}
                    </div>
                </Sider>

                {/* Inner Content for Admin section */}
                <Content>
                    {selectedKey === 'members' ? membersContent : dataSourcesContent}
                </Content>
            </Layout>

            {/* Add Members Modal */}
            <Modal
                title="Add members"
                open={isMembersModalVisible}
                onOk={handleMembersOk}
                onCancel={handleMembersCancel}
                width={600}
                footer={[
                    <Button key="back" onClick={handleMembersCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleMembersOk}>
                        Save
                    </Button>,
                ]}
            >
                <Search placeholder="Search members" style={{ marginBottom: 20 }} />
                <List
                    itemLayout="horizontal"
                    dataSource={usersToAddData}
                    renderItem={(user) => (
                        <List.Item
                            onClick={() => toggleUserSelection(user.id)}
                            style={{ cursor: 'pointer' }}
                            actions={[
                                selectedUsers.includes(user.id) ? <CheckOutlined style={{ color: '#1890ff' }} /> : <div style={{width: '14px'}} />
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size={40} icon={user.avatar} style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }} />}
                                title={<Text>{user.name}</Text>}
                                description={user.email}
                            />
                        </List.Item>
                    )}
                />
            </Modal>

            {/* New Data Source Modal */}
            <Modal
                title="New Data Source"
                open={isDataSourceModalVisible}
                onOk={handleDataSourceOk}
                onCancel={handleDataSourceCancel}
                width={800}
                footer={[
                    <Button key="back" onClick={handleDataSourceCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleDataSourceOk}>
                        Save
                    </Button>,
                ]}
            >
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
                    <Search placeholder="Search data sources" style={{ flex: 1, marginRight: '16px' }} />

                        New Data Source
                </div>
                <div style={{padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Empty
                        image={<SearchOutlined style={{ fontSize: '48px', color: '#bfbfbf' }} />}
                        description={
                            <Text type="secondary">
                                Sorry, we couldn't find anything.
                            </Text>
                        }
                    />
                </div>
            </Modal>
        </>
    );
};

export default GroupDetails;
