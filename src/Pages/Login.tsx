import { Form, Input, Button, Checkbox, Typography, Row, Col, Image } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import logo from "@/assets/images/logo.png";
import {useNavigate} from "react-router-dom";

const { Title, Link } = Typography;

const Login = () => {

    const navigate = useNavigate();


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        navigate('/');
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f7f9fa' }}>
            <Col>
                <div style={{
                    width: 400,
                    padding: '30px',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    boxShadow: '0 0 6px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    {/* Logo */}
                    <Image src={logo} width={50} preview={false} style={{ marginBottom: '10px' }} />
                    <Title level={4} style={{ marginBottom: 30 }}>Login</Title>

                    <Form
                        name="login_form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '12px', textAlign: 'left' }} name="remember" valuePropName="checked">
                            <Checkbox>Remember login</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#4096ff' }}>
                                Submit
                            </Button>
                        </Form.Item>

                        <Link href="#" style={{ color: '#1677ff' }}>
                            Forget Password
                        </Link>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
