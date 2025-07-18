import { useState } from 'react';
import { List, Button, Tag, Space, Modal, Form, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";


// Define the type for a single group item for type safety
interface Group {
    id: number;
    name: string;
    type: 'Built-in' | 'Custom';
}

// Mock data based on the provided image
const initialGroups: Group[] = [
    {
        id: 1,
        name: 'admin',
        type: 'Built-in',
    },
    {
        id: 2,
        name: 'default',
        type: 'Built-in',
    },
    {
        id: 3,
        name: 'editor',
        type: 'Custom',
    }
];

const Groups: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>(initialGroups);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [deletingGroupId, setDeletingGroupId] = useState<number | null>(null);
    const [form] = Form.useForm();

    // --- Modal Handlers ---

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const handleCreateCancel = () => {
        setIsCreateModalVisible(false);
        form.resetFields();
    };

    const handleCreate = (values: { roleName: string }) => {
        const newGroup: Group = {
            id: Date.now(), // Use a more robust ID in a real app
            name: values.roleName,
            type: 'Custom',
        };
        setGroups(prevGroups => [...prevGroups, newGroup]);
        setIsCreateModalVisible(false);
        form.resetFields();
    };

    const showDeleteConfirm = (id: number) => {
        setDeletingGroupId(id);
        setIsDeleteConfirmVisible(true);
    };

    const handleDeleteConfirm = () => {
        if (deletingGroupId !== null) {
            setGroups(prevGroups => prevGroups.filter(group => group.id !== deletingGroupId));
        }
        setIsDeleteConfirmVisible(false);
        setDeletingGroupId(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteConfirmVisible(false);
        setDeletingGroupId(null);
    };

    return (
        <div style={{ background: '#fff', borderRadius: '8px' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>

                <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
                    Create role
                </Button>
            </div>

            {/* The List of Groups/Roles */}
            <List
                itemLayout="horizontal"
                dataSource={groups}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button key="data-sources">Data Sources</Button>,
                            item.type === 'Built-in' ? (
                                <Tooltip title="Cannot delete built-in groups" key="delete-tooltip">
                                    <Button danger disabled>
                                        Delete
                                    </Button>
                                </Tooltip>
                            ) : (
                                <Button key="delete" danger onClick={() => showDeleteConfirm(item.id)}>
                                    Delete
                                </Button>
                            ),
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <Space>
                                    <Link to={'/data_sources/groups/:id'} style={{ fontWeight: 500, fontSize: '16px' }}>{item.name}</Link>
                                    {item.type === 'Built-in' && <Tag color="blue">Built-in</Tag>}
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />

            {/* Create Role Modal */}
            <Modal
                title="Create role"
                visible={isCreateModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCreateCancel}
                okText="Create"
            >
                <Form form={form} onFinish={handleCreate} layout="vertical">
                    <Form.Item
                        name="roleName"

                        rules={[{ required: true, message: 'Please input the role name!' }]}
                    >
                        <Input variant="borderless" placeholder="Role name" autoFocus />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Deletion"
                visible={isDeleteConfirmVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Delete"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this role?</p>
            </Modal>
        </div>
    );
};


export default Groups;