
import {Form, type FormInstance, Input} from 'antd';

interface EmailAlertProps {
    form: FormInstance;
}


const GoogleHangoutsAlert: React.FC<EmailAlertProps> = ({ form }) => {

    return (
        <Form layout="vertical" form={form}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="My Goolge Hangout Chat" />
            </Form.Item>
            <Form.Item
                label="Webhook URL (get it from the room settings)"
                name="webhookUrl"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item
                label="Icon URL (32x32 or multiple, png format)"
                name="iconUrl"

            >
                <Input placeholder="" />
            </Form.Item>





        </Form>
    );
};

export default GoogleHangoutsAlert;
