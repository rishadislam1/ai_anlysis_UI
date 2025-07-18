
import {
    Form,
    Select,
    Checkbox,
    Radio,
    Button,
    Typography,
    Divider,
    Space,
    Input,
} from 'antd';

const { Title } = Typography;
const { Option } = Select;

/**
 * Organization Settings Component
 *
 * This component renders a settings form based on the provided UI image.
 * It uses Ant Design for all UI elements and form handling, including
 * conditionally showing fields based on user selection.
 */
const Organization = () => {
    // Ant Design's Form hook to control the form instance
    const [form] = Form.useForm();

    // This hook watches the 'samlEnabled' form field.
    // The component will re-render whenever this field's value changes.
    const samlEnabled = Form.useWatch('samlEnabled', form);

    /**
     * Handles form submission.
     * @param {object} values - The values from the form fields.
     */
    const onFinish = (values: any) => {
        console.log('Form Submitted Values:', values);
        // You can add your logic here to save the settings,
        // for example, by making an API call.
    };

    // Define layout for form labels and controls for a consistent look
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <div style={{ padding: '24px', background: '#ffffff', borderRadius: '8px' }}>
            <Form
                {...formItemLayout}
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                // Set initial values for the form fields
                initialValues={{
                    dateFormat: 'YYYY-MM-DD',
                    timeFormat: 'HH:mm',
                    hidePlotlyModeBar: true,
                    featureFlags: ['multipleOwners', 'emailOnFail', 'multiByteSearch'],
                    anonymousUsage: true,
                    passwordLoginEnabled: false,
                    samlEnabled: 'Disable',
                }}
                style={{ maxWidth: 700 }}
            >
                <Title level={4}>Parameters</Title>
                <Divider />

                {/* Date Format Dropdown */}
                <Form.Item label="Date Format" name="dateFormat">
                    <Select>
                        <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                        <Option value="MM/DD/YY">MM/DD/YY</Option>
                        <Option value="DD/MM/YY">DD/MM/YY</Option>
                    </Select>
                </Form.Item>

                {/* Time Format Dropdown */}
                <Form.Item label="Time Format" name="timeFormat">
                    <Select>
                        <Option value="HH:mm">HH:mm</Option>
                        <Option value="HH:mm:ss">HH:mm:ss</Option>
                        <Option value="HH:mm:ss.SSS">HH:mm:ss.SSS</Option>
                    </Select>
                </Form.Item>

                {/* Hide Plotly Mode Bar Checkbox */}
                <Form.Item
                    label="Hide Plotly mode bar (Chart)"
                    name="hidePlotlyModeBar"
                    valuePropName="checked"
                >
                    <Checkbox>Hide Plotly mode bar</Checkbox>
                </Form.Item>

                {/* Feature Flags Checkbox Group */}
                <Form.Item label="Feature Flags" name="featureFlags">
                    <Checkbox.Group>
                        <Space direction="vertical">
                            <Checkbox value="multipleOwners">
                                Enable experimental multiple owners support
                            </Checkbox>
                            <Checkbox value="emailOnFail">
                                Email report owners when scheduled Report fail
                            </Checkbox>
                            <Checkbox value="multiByteSearch">
                                Enable multi-byte (Chinese, Japanese, and Korean) search for report names and descriptions (slower)
                            </Checkbox>
                        </Space>
                    </Checkbox.Group>
                </Form.Item>

                {/* Anonymous Usage Data Sharing Checkbox */}
                <Form.Item
                    label="Help: Anonymous Usage Data Sharing"
                    name="anonymousUsage"
                    valuePropName="checked"
                >
                    <Checkbox>
                        Help us improve by automatically sending anonymous usage data
                    </Checkbox>
                </Form.Item>

                <Title level={4} style={{ marginTop: '32px' }}>Authentication</Title>
                <Divider />

                {/* Password Login Checkbox (conditionally disabled) */}
                <Form.Item label="Password Login" name="passwordLoginEnabled" valuePropName="checked">
                    <Checkbox disabled={samlEnabled === 'Disable'}>Password Login Enabled</Checkbox>
                </Form.Item>

                {/* SAML Enabled Radio Group */}
                <Form.Item label="SAML Enabled" name="samlEnabled">
                    <Radio.Group>
                        <Radio value="Disable">Disable</Radio>
                        <Radio value="Enable(Static)">Enable(Static)</Radio>
                        <Radio value="Enable(Dynamic)">Enable(Dynamic)</Radio>
                    </Radio.Group>
                </Form.Item>

                {/* Conditionally rendered SAML Static fields */}
                {samlEnabled === 'Enable(Static)' && (
                    <>
                        <Form.Item label="SAML Single Sign-on URL" name="samlSsoUrl">
                            <Input placeholder="Enter SAML Single Sign-on URL" />
                        </Form.Item>
                        <Form.Item label="SAML Entity ID" name="samlEntityId">
                            <Input placeholder="Enter SAML Entity ID" />
                        </Form.Item>
                        <Form.Item label="SAML x509 cert" name="samlCert">
                            <Input.TextArea rows={4} placeholder="Enter SAML x509 certificate" />
                        </Form.Item>
                    </>
                )}

                {/* Conditionally rendered SAML Dynamic fields */}
                {samlEnabled === 'Enable(Dynamic)' && (
                    <>
                        <Form.Item label="SAML Metadata URL" name="samlMetadataUrl">
                            <Input placeholder="Enter SAML Metadata URL" />
                        </Form.Item>
                        <Form.Item label="SAML Entity ID" name="samlEntityId">
                            <Input placeholder="Enter SAML Entity ID" />
                        </Form.Item>
                        <Form.Item label="SAML NameID Format" name="samlNameIdFormat">
                            <Input placeholder="Enter SAML NameID Format" />
                        </Form.Item>
                    </>
                )}


                <Divider />

                {/* Save Button */}
                <Form.Item wrapperCol={{ offset: formItemLayout.labelCol.span }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Organization;
