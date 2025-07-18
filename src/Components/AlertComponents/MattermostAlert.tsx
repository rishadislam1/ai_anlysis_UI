
import {Form, type FormInstance, Input} from 'antd';

interface EmailAlertProps {
    form: FormInstance;
}


const MattermostAlert: React.FC<EmailAlertProps> = ({ form }) => {

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
                label="Mattermost Webhook URL"
                name="url"

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
                label="Icon (URL)"
                name="iconUrl"

            >
                <Input placeholder="" />
            </Form.Item>

            <Form.Item
                label="Channel"
                name="channel"

            >
                <Input placeholder="" />
            </Form.Item>


        </Form>
    );
};

export default MattermostAlert;


