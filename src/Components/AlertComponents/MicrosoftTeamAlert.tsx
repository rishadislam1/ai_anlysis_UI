
import {Form, type FormInstance, Input} from 'antd';

interface EmailAlertProps {
    form: FormInstance;
}


const MicrosoftTeamAlert: React.FC<EmailAlertProps> = ({ form }) => {

    return (
        <Form layout="vertical" form={form}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="My Microsoft Teams Webhook" />
            </Form.Item>
            <Form.Item
                label="Microsoft Teams Webhook URL"
                name="webhookUrl"
                rules={[{ required: true, message: 'This field is requried' }]}
            >
                <Input placeholder="" />
            </Form.Item>
            <Form.Item
                label="Message Template"
                name="messageTemplate"

            >
                <Input placeholder="{&quot;@type&quot;: &quot;MessageCard&quot;, &quot;@context&quot;: &quot;http://schema.org/extensions&quot;, &quot;themeColor&quot;: &quot;0076D7&quot;, &quot;summary&quot;: &quot;A BI Alert was Triggered&quot;, &quot;sections&quot;: [{&quot;activityTitle&quot;: &quot;A BI Alert was Triggered&quot;, &quot;facts&quot;: [{&quot;name&quot;: &quot;Alert Name&quot;, &quot;value&quot;: &quot;{alert_name}&quot;}, {&quot;name&quot;: &quot;Alert URL&quot;, &quot;value&quot;: &quot;{alert_url}&quot;}, {&quot;name&quot;: &quot;Query&quot;, &quot;value&quot;: &quot;{query_text}&quot;}, {&quot;name&quot;: &quot;Query URL&quot;, &quot;value&quot;: &quot;{query_url}&quot;}], &quot;markdown&quot;: true}]}"/>
            </Form.Item>





        </Form>
    );
};

export default MicrosoftTeamAlert;
