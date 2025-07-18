
import {Form, type FormInstance, Input} from 'antd';

interface EmailAlertProps {
    form: FormInstance;
}


const Chatwork: React.FC<EmailAlertProps> = ({ form }) => {

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
                label="API Token"
                name="apiToken"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item
                label="Room ID"
                name="roomId"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item
                label="Message Template"
                name="messageTemplate"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="{alert_name} changed state to {new_state}.\n{alert_url}\n{query_url}"/>
            </Form.Item>




        </Form>
    );
};

export default Chatwork;

