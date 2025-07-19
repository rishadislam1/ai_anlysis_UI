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
    SearchOutlined, // Import the Search icon
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

const MyReport = () => {
    const navigate = useNavigate();

    // Handler for menu item clicks
    const handleMenuClick = (e:any) => {
        // e.key is the 'key' of the clicked menu item
        switch (e.key) {
            case 'all_report':
                // Assuming '/queries' is the route for all reports
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
                // Default fallback to all reports
                navigate('/queries');
        }
    };

    return (
        <div>
            {/* Header section for the page */}
            <Row
                justify="space-between"
                align="middle"
            >
                <Col>
                    {/* Updated Title for the page */}
                    <Title level={4} style={{ margin: 0 }}>
                        My Report
                    </Title>
                </Col>
                <Col>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/queries/new')}>
                        New Report
                    </Button>
                </Col>
            </Row>

            <Layout style={{ marginTop: "20px", background: '#f0f2f5' }}>
                {/* Sidebar Navigation */}
                <Sider
                    width={250}
                    theme="light"
                >
                    <div style={{ padding: '16px' }}>
                        <Input placeholder="Search reports..." />
                    </div>
                    <Menu
                        mode="inline"
                        // Set the default selected key to 'my_report'
                        defaultSelectedKeys={['my_report']}
                        style={{ borderRight: 0 }}
                        onClick={handleMenuClick}
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
                            padding: '24px',
                            margin: 0,
                            minHeight: 280,
                            // Use flexbox to center content
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* Centered content */}
                        <Space direction="vertical" align="center" size="large">
                            <SearchOutlined style={{ fontSize: '48px', color: '#8c8c8c' }} />
                            <Button type="primary" onClick={() => navigate('/queries/new')}>
                                Create your first Report
                            </Button>
                        </Space>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default MyReport;
