
import { Button, Layout, Table, Typography, Empty } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import {useNavigate} from "react-router-dom";

const {  Content } = Layout;
const { Title } = Typography;

// Define the structure of the data for each row in the table.
interface DataType {
    key: React.Key;
    name: string;
    createdAt: string;
    taskStatus: string;
}

// Define the columns for the table.
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Task Status',
        dataIndex: 'taskStatus',
        key: 'taskStatus',
    },
];

// The main component for the page.
const HistoryAutopilot: React.FC = () => {
    // We'll use an empty array for now to show the empty state.
    const data: DataType[] = [];

    const navigate = useNavigate();

    return (
        <Layout>
            <div
                style={{
                    padding: '0 24px',

                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Title level={4} style={{ margin: 0 }}>
                    All Autopilot
                </Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={()=>navigate('/autopilot')}>
                    Data Autopilot
                </Button>
            </div>
            <Content>
                <div style={{ minHeight: 360, background: '#fff', borderRadius: '8px', marginTop: "30px" }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        locale={{
                            emptyText: (
                                <Empty
                                    image={<SearchOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />}
                                    imageStyle={{ height: 80 }}
                                    description={
                                        <span style={{ color: '#8c8c8c' }}>
                      Sorry, we couldn't find anything.
                    </span>
                                    }
                                />
                            ),
                        }}
                        pagination={false}
                    />
                </div>
            </Content>
        </Layout>
    );
};


export default HistoryAutopilot;