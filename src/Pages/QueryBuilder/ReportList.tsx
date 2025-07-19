import {
    Layout,
    Menu,
    Input,
    Button,
    Row,
    Col,
    Typography,
    Space,
} from 'antd';
import {
    FileTextOutlined,
    StarOutlined,
    PlusOutlined,
    RightCircleOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import queryImage from "@/assets/images/query.svg";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const ReportList = () => {
    const navigate = useNavigate();

    // Handler for menu item clicks
    const handleMenuClick = (e:any) => {
        // e.key is the 'key' of the clicked menu item
        switch (e.key) {
            case 'all_report':
                navigate('/queries');
                break;
            case 'my_report':
                navigate('/reports/my');
                break;
            case 'favorite_report':
                navigate('/reports/favorites');
                break;
            case 'archived_report':
                navigate('/reports/archived');
                break;
            default:
                navigate('/reports/all'); // Default fallback
        }
    };

    return (
        <div>
            <Row
                justify="space-between"
                align="middle"
            >
                <Col>
                    <Title level={4} style={{ margin: 0 }}>
                        All Report
                    </Title>
                </Col>
                <Col>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/queries/new')}>
                        New Report
                    </Button>
                </Col>
            </Row>

            <Layout style={{ marginTop: "20px", background: '#f0f2f5' }}>
                {/* Sidebar */}
                <Sider
                    width={250}
                    theme="light"
                >
                    <div style={{ padding: '16px' }}>
                        <Input placeholder="search_report" />
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['all_report']}
                        style={{ borderRight: 0 }}
                        onClick={handleMenuClick} // Added onClick handler
                        items={[
                            { key: 'all_report', icon: <FileTextOutlined />, label: 'All Report' },
                            { key: 'my_report', icon: <RightCircleOutlined />, label: 'My Report' },
                            { key: 'favorite_report', icon: <StarOutlined />, label: 'Favorite Report' },
                            { key: 'archived_report', icon: <MenuOutlined />, label: 'Archived Report' },
                        ]}
                    />
                </Sider>

                {/* Main Content Area Layout */}
                <Layout style={{ marginLeft: '24px', background: 'transparent' }}>
                    <Content
                        style={{
                            background: '#fff',
                            textAlign: 'center',
                        }}
                    >
                        <Row
                            align="middle"
                            justify="space-between"
                        >
                            {/* Left: Image and Description */}
                            <Col flex="1" style={{
                                backgroundColor: '#fbfcfd',
                                padding: '30px',
                            }}>
                                <Space direction="vertical" align="center" size="large" style={{ width: '100%' }}>
                                    <Text style={{ fontSize: '28px' }}>{`</>`}</Text>
                                    <Text style={{ fontSize: '16px', color: '#555' }}>
                                        Getting the data from your datasources.
                                    </Text>
                                    <img
                                        src={queryImage}
                                        alt="Data sources illustration"
                                        style={{ width: 400, marginTop: 16 }}
                                    />
                                </Space>
                            </Col>

                            {/* Right: Action Steps */}
                            <Col flex="1" style={{ textAlign: 'left', padding: "30px" }}>
                                <Space direction="vertical" size="middle">
                                    <Title level={5} style={{ fontWeight: '600' }}>
                                        Let's get started
                                    </Title>
                                    <Link to="/data_sources">1. Connect a Data Source</Link>
                                    <Link to="/queries/new">2. Create your first Report</Link>
                                </Space>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ReportList;