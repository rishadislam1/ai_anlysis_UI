import React, { useState } from 'react';
import { Button, Typography, Empty, Modal, Form, Input, Table, Space } from 'antd';
import type { TableProps } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './ReportSnippet.css'; // Assuming you have this CSS file for your custom editor

const { Text, Link } = Typography;
const { TextArea } = Input;

// Define the structure of a snippet object with TypeScript
interface Snippet {
    id: number;
    code: string;
    description: string;
    snippet: string;
    createdAt: string;
}

const ReportSnippet: React.FC = () => {
    // State for the list of all snippets
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    // State for the main create/update modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    // State to hold the snippet currently being edited
    const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
    // State for your custom snippet editor's content
    const [snippetContent, setSnippetContent] = useState('');

    // --- New State for Delete Confirmation ---
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [snippetToDelete, setSnippetToDelete] = useState<number | null>(null);

    const [form] = Form.useForm();

    // --- Modal and Form Handling ---

    const showCreateModal = () => {
        setEditingSnippet(null);
        setSnippetContent('');
        form.resetFields();
        form.setFieldsValue({ snippet: '' });
        setIsModalVisible(true);
    };

    const showUpdateModal = (snippet: Snippet) => {
        setEditingSnippet(snippet);
        setSnippetContent(snippet.snippet);
        form.setFieldsValue(snippet);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingSnippet(null);
    };

    const handleFormFinish = (values: Omit<Snippet, 'id' | 'createdAt'>) => {
        const finalValues = { ...values, snippet: snippetContent };

        if (editingSnippet) {
            setSnippets(snippets.map(s =>
                s.id === editingSnippet.id ? { ...editingSnippet, ...finalValues } : s
            ));
        } else {
            const newSnippet: Snippet = {
                id: Date.now(),
                ...finalValues,
                createdAt: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD format
            };
            setSnippets([...snippets, newSnippet]);
        }
        setIsModalVisible(false);
    };

    // --- Deletion Handling ---

    const showDeleteModal = (id: number) => {
        setSnippetToDelete(id);
        setIsDeleteModalVisible(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setSnippetToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (snippetToDelete) {
            setSnippets(snippets.filter(s => s.id !== snippetToDelete));
        }
        handleCancelDelete(); // Close modal and reset state
    };


    // --- Table Configuration ---

    const columns: TableProps<Snippet>['columns'] = [
        {
            title: 'Report Snippet',
            dataIndex: 'code',
            key: 'code',
            // ✨ Added sorter for alphabetical sorting
            sorter: (a, b) => a.code.localeCompare(b.code),
            render: (text: string, record: Snippet) => (
                <Link onClick={() => showUpdateModal(record)}>{text}</Link>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            // ✨ Added sorter for alphabetical sorting
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'Snippet',
            dataIndex: 'snippet',
            key: 'snippet',
            render: (text: string) => (
                <Text type="secondary" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                    {text.substring(0, 50)}{text.length > 50 ? '...' : ''}
                </Text>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // ✨ Added sorter for date sorting
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Snippet) => (
                <Space size="middle">

                    {/* ✨ Changed to open a modal instead of Popconfirm */}
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => showDeleteModal(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
                        New Report Snippet
                    </Button>
                </div>

                {snippets.length > 0 ? (
                    <Table columns={columns} dataSource={snippets} rowKey="id" />
                ) : (
                    <div>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={<Text type="secondary">There are no report snippets yet</Text>}
                            className="py-20"
                        >
                            <Button type="primary" onClick={showCreateModal}>
                                Create Your First Snippet
                            </Button>
                        </Empty>
                    </div>
                )}
            </div>

            <Modal
                title={editingSnippet ? 'Update Report' : 'Create your first Report'}
                open={isModalVisible}
                onCancel={handleCancel}
                destroyOnClose
                width={600}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>
                        {editingSnippet ? 'Update' : 'Create'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" name="report_snippet_form" onFinish={handleFormFinish}>
                    <Form.Item name="code" label="Code" rules={[{ required: true, message: 'Please input the code!' }]}>
                        <Input placeholder="Enter code" />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input placeholder="Enter description" />
                    </Form.Item>
                    <Form.Item
                        name="snippet"
                        label="Snippet"
                        rules={[{ required: true, message: 'Please input the snippet!' }]}
                    >
                        <div className="snippet-editor-wrapper">
                            <div className="line-numbers">
                                {snippetContent.split('\n').map((_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            <TextArea
                                value={snippetContent}
                                onChange={(e) => {
                                    setSnippetContent(e.target.value);
                                    form.setFieldsValue({ snippet: e.target.value });
                                }}
                                className="snippet-textarea"
                                autoSize={{ minRows: 6 }}
                                spellCheck={false}
                                placeholder="Enter snippet text"
                            />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            {/* ✨ New Delete Confirmation Modal */}
            <Modal
                title="Confirm Deletion"
                open={isDeleteModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this snippet? This action cannot be undone.</p>
            </Modal>
        </>
    );
};

export default ReportSnippet;