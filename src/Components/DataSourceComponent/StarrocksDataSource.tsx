import { Form, Input, Checkbox } from 'antd';
import { useEffect } from 'react';

const StarRocksDataSource = ({ form }: { form: any }) => {
    useEffect(() => {
        form.setFieldsValue({

            useUnicode: true,
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

                <Form.Item label="服务器 Server IP" name="serverIp">
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

                <Form.Item label="连接超时 Timeout" name="timeout">
                    <Input />
                </Form.Item>

                <Form.Item label="字符集" name="charset">
                    <Input />
                </Form.Item>

                <Form.Item name="useUnicode" valuePropName="checked">
                    <Checkbox>使用 Unicode</Checkbox>
                </Form.Item>

                <Form.Item name="useSSL" valuePropName="checked">
                    <Checkbox>使用 (Use SSL)</Checkbox>
                </Form.Item>

                <Form.Item label="服务器证书文件路径 (SSL server certificate path)" name="sslServerPath">
                    <Input />
                </Form.Item>

                <Form.Item label="客户端证书文件路径 (SSL client certificate path)" name="sslClientPath">
                    <Input />
                </Form.Item>

                <Form.Item label="私钥文件路径 (SSL private key file path)" name="sslPrivateKey">
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
};

export default StarRocksDataSource;
