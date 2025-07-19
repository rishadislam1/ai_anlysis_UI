import {Button, Flex, Form, Input, Space, Typography} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";


const OpenAi = () => {
    const [form] = Form.useForm();

    const { Link } = Typography;

    const onFinish = (values: any) => {
        console.log('OpenAI Form Values:', values);
        // Handle form submission (e.g., save to backend)
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}

        >
            <Form.Item
                label="OpenaiApiKey"
                name="openaiApiKey"
                rules={[{ required: true, message: 'Please input your OpenAI API Key!' }]}
            >
                <Input placeholder="Enter your OpenAI API Key" />
            </Form.Item>

            <Form.Item
                label="HttpProxyHost"
                name="httpProxyHost"
            >
                <Input placeholder="e.g., 127.0.0.1" />
            </Form.Item>

            <Form.Item
                label="HttpProxyPort"
                name="httpProxyPort"
            >
                <Input placeholder="e.g., 7890" />
            </Form.Item>

            <Form.Item
                label="ApiHost"
                name="apiHost"
            >
                <Input placeholder="Enter the API Host" />
            </Form.Item>


            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                <Form.Item>
                    <Link href="https://holmes.bukeshiguang.com/" target="_blank">
                        <QuestionCircleOutlined /> Click here to get API Key
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="default">Test Connection</Button>
                        <Button type="primary" htmlType="submit">Apply</Button>
                    </Space>
                </Form.Item>
            </Flex>

        </Form>
    );
};

export default OpenAi;