import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Table, Tag, Input, Button, Modal, Form } from 'antd';
import {Link} from "react-router-dom";

// Define the data type for a table row
interface User {
    key: string;
    account: {
        name: string;
        email: string;
    };
    groups: string[];
    createdAt: string;
    lastActiveAt: string;
}

// Initial static data
const initialUsers: User[] = [
    {
        key: '1',
        account: {
            name: 'rishdislam',
            email: 'wdrishad@gmail.com',
        },
        groups: ['admin', 'default', 'test'],
        createdAt: '15 days ago',
        lastActiveAt: '4 minutes ago'
    },
    {
        key: '2',
        account: {
            name: 'jane_doe',
            email: 'jane.doe@example.com',
        },
        groups: ['default'],
        createdAt: '1 month ago',
        lastActiveAt: '2 hours ago'
    },
    {
        key: '3',
        account: {
            name: 'john_smith',
            email: 'john.smith@example.com',
        },
        groups: ['test'],
        createdAt: '3 days ago',
        lastActiveAt: '30 minutes ago'
    },
];


const PendingInvitation = () => {
    const [data, setData] = useState<User[]>(initialUsers);
    const [filteredData, setFilteredData] = useState<User[]>(initialUsers);
    const [selectedMenu, setSelectedMenu] = useState('Pending Invitations');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const filtered = data.filter(user =>
            user.account.name.toLowerCase().includes(value) ||
            user.account.email.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCreate = () => {
        form.validateFields()
            .then(values => {
                const newUser: User = {
                    key: (data.length + 1).toString(),
                    account: {
                        name: values.name,
                        email: values.email,
                    },
                    groups: ['default'], // Assign a default group
                    createdAt: 'Just now',
                    lastActiveAt: 'Just now',
                };
                const newData = [...data, newUser];
                setData(newData);
                setFilteredData(newData);
                handleCancel();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };


    const columns = [
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
            sorter: (a: User, b: User) => a.account.name.localeCompare(b.account.name),
            render: (account: { Id:string, name: string; email: string; }) => (
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                    <div>
                        <Link to={`/data_sources/users/${account.Id}`} className="font-medium">{account.name}</Link>
                        <div className="text-sm text-gray-500">{account.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Groups',
            dataIndex: 'groups',
            key: 'groups',
            render: (groups: string[]) => (
                <>
                    {groups.map(group => (
                        <Tag key={group} className="bg-gray-100 border-gray-200 text-gray-700">
                            {group.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a: User, b: User) => a.createdAt.localeCompare(b.createdAt),
        },
        {
            title: 'Last Active At',
            dataIndex: 'lastActiveAt',
            key: 'lastActiveAt',
            sorter: (a: User, b: User) => a.lastActiveAt.localeCompare(b.lastActiveAt),
        },
    ];


    return (
        <div className="flex h-screen bg-white font-sans">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 p-4 flex flex-col">
                <Button type="primary" className="mb-4 bg-blue-500 hover:bg-blue-600" onClick={showModal}>+ Create by</Button>
                <Input
                    placeholder="Search"
                    className="mb-4"
                    onChange={handleSearch}
                    style = {{
                        marginTop: "10px"
                    }}
                />
                <nav className="flex flex-col space-y-1"     style = {{
                    marginTop: "10px"
                }}>
                    <Link
                        to="/data_sources/users"
                        onClick={() => setSelectedMenu('Enable User')}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${selectedMenu === 'Enable User' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Enable User
                    </Link>
                    <Link
                        to="/data_sources/pendingInvitaions"
                        onClick={() => setSelectedMenu('Pending Invitations')}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${selectedMenu === 'Pending Invitations' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Pending Invitations
                    </Link>
                    <Link
                        to="/data_sources/disableUser"
                        onClick={() => setSelectedMenu('Disable User')}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${selectedMenu === 'Disable User' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Disable User
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10 }}
                    className="w-full"
                />
            </div>

            {/* Create User Modal */}
            <Modal
                title="Create by"
                open={isModalVisible}
                onOk={handleCreate}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600">
                        Create
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" name="createUserForm">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PendingInvitation;
