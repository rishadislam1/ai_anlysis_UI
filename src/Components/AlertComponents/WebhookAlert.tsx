
import {Form, type FormInstance, Input} from 'antd';

interface EmailAlertProps {
    form: FormInstance;
}


const WebhookAlert: React.FC<EmailAlertProps> = ({ form }) => {

    return (
        <Form layout="vertical" form={form}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="My Webhook" />
            </Form.Item>
            <Form.Item
                label="URL"
                name="url"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item
                label="UserName"
                name="username"

            >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"

            >
                <Input placeholder="" type="password" />
            </Form.Item>


        </Form>
    );
};

export default WebhookAlert;
