import { Form, Input, Button, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const PostgreSQLDataSource = ({ form }: { form: any }) => {
    // State to toggle the visibility of additional settings
    const [showAdditional, setShowAdditional] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            useUnicode: true,
            // Set a default value for the SSL mode as shown in the image
            sslmode: 'prefer',
        });
    }, [form]);

    return (
        <div className="p-5 max-w-2xl mx-auto bg-white shadow rounded-md">
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Field Is Required' }]}
                >
                    <Input placeholder="My MySQL" />
                </Form.Item>

                <Form.Item label="服务器 Server" name="serverIp">
                    <Input placeholder="127.0.0.1" />
                </Form.Item>

                <Form.Item label="端口 Port" name="port">
                    <Input placeholder="3306" />
                </Form.Item>

                <Form.Item label="用户名 Username" name="username">
                    <Input />
                </Form.Item>

                <Form.Item label="密码 Password" name="password">
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="数据库 Database"
                    name="database"
                    rules={[{ required: true, message: 'Field Is Required' }]}
                >
                    <Input />
                </Form.Item>

                {/* --- Start: Added Code --- */}

                {/* This is the toggle button for additional settings */}
                <div
                    className="p-3 my-4 text-center bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                    onClick={() => setShowAdditional(!showAdditional)}
                    style={{ border: '1px solid #d9d9d9' }}
                >
                    Additional Settings {showAdditional ? '▲' : '▼'}
                </div>

                {/* These settings are conditionally rendered based on the state */}
                {showAdditional && (
                    <>
                        <Form.Item label="SSL模式" name="sslmode">
                            <Select>

                                <Option value="disable">Disable</Option>
                                <Option value="allow">Allow</Option>
                                <Option value="prefer">Prefer</Option>
                                <Option value="require">Require</Option>
                                <Option value="verify-ca">Verify-CA</Option>
                                <Option value="verify-full">Verify-Full</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="根证书(SSL root certificate path)"
                            name="sslrootcert"
                        >
                            <Upload maxCount={1}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="客户端证书(SSL client certificate path)"
                            name="sslcert"
                        >
                            <Upload maxCount={1}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="客户端密钥(SSL client certificate key)"
                            name="sslkey"
                        >
                            <Upload maxCount={1}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </>
                )}
                {/* --- End: Added Code --- */}
            </Form>
        </div>
    );
};

export default PostgreSQLDataSource;