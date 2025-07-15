import { Form, Input } from 'antd';
import { useEffect } from 'react';

const MongoDBDataSource = ({ form }: { form: any }) => {
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

                <Form.Item label="Connection Name" name="connectionName" rules={[{ required: true, message: 'Field Is Required' }]}>
                    <Input placeholder="127.0.0.1" />
                </Form.Item>



                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Authentication Database"
                    name="database"
                    rules={[{ required: true, message: 'Field Is Required' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Replica Set Name" name="replicaSetName">
                    <Input />
                </Form.Item>


            </Form>
        </div>
    );
};

export default MongoDBDataSource;
