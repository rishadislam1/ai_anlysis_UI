
import {Form, type FormInstance, Input} from 'antd';

interface EmailAlertProps {
    form: FormInstance;
}


const PagerDutyAlert: React.FC<EmailAlertProps> = ({ form }) => {

    return (
        <Form layout="vertical" form={form}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="My PagerDuty" />
            </Form.Item>
            <Form.Item
                label="PagerDuty Service Integration Key"
                name="pagerDutyKey"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item
                label="Description for the event, defaults to alert name"
                name="descirptionEvent"

            >
                <Input placeholder="" />
            </Form.Item>





        </Form>
    );
};

export default PagerDutyAlert;
