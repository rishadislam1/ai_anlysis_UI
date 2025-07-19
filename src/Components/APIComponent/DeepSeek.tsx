import {Button, Flex, Form, Input, Space, Typography} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";


const DeepSeek = () => {
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
                label="ApiKey"
                name="apikey"
                rules={[{ required: true, message: 'Please input your OpenAI API Key!' }]}
            >
                <Input placeholder="ApiKey" />
            </Form.Item>

            <Form.Item
                label="Model"
                name="model"

            >
                <Input placeholder="Model" />
            </Form.Item>

            <Form.Item
                label="ApiHost"
                name="apihost"

            >
                <Input placeholder="api host" />
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

export default DeepSeek;
