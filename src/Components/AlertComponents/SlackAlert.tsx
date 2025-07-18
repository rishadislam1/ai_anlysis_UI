
import {Form, type FormInstance, Input} from 'antd';

interface EmailAlertProps {
    form: FormInstance;
}


const SlackAlert: React.FC<EmailAlertProps> = ({ form }) => {

    return (
        <Form layout="vertical" form={form}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the alert name!' }]}
            >
                <Input placeholder="My Email" />
            </Form.Item>
            <Form.Item
                label="Slack Webhook URL"
                name="slackWebhookURL"

            >
                <Input placeholder="" />
            </Form.Item>


        </Form>
    );
};

export default SlackAlert;
