
import 'antd/dist/reset.css';
import { Card, Col, Row, Typography, Tabs, Table } from 'antd';
import RqStatusWorker from "@/Components/SystemStatusComponent/RQStatusWorker.tsx";
import RQStatusQueries from "@/Components/SystemStatusComponent/RQStatusQueries.tsx";
import RqStatusOtherJobs from "@/Components/SystemStatusComponent/RQStatusOtherJobs.tsx";

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const RqStatus = () => {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Started', dataIndex: 'started', key: 'started' },
        { title: 'Queued', dataIndex: 'queued', key: 'queued' },
    ];

    const data = [
        { key: '1', name: 'default', started: 1, queued: 0 },
        { key: '2', name: 'emails', started: 0, queued: 0 },
        { key: '3', name: 'periodic', started: 0, queued: 0 },
        { key: '4', name: 'queries', started: 0, queued: 0 },
    ];

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false} style={{ marginBottom: 16 }}>
                        <Title level={5}>Started Jobs</Title>
                        <Text style={{ fontSize: 24 }}>1</Text>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false} style={{ marginBottom: 16 }}>
                        <Title level={5}>Queued Jobs</Title>
                        <Text style={{ fontSize: 24 }}>0</Text>
                    </Card>
                </Col>
            </Row>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Queues" key="1">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            defaultPageSize: 25,
                            pageSizeOptions: ['10', '25', '50'],
                            showSizeChanger: true,
                            position: ['bottomRight'],
                        }}
                    />
                </TabPane>
                <TabPane tab="Workers" key="2">
                    <RqStatusWorker/>
                </TabPane>
                <TabPane tab="Queries" key="3">
                    <RQStatusQueries/>
                </TabPane>
                <TabPane tab="Other Jobs" key="4">
                    <RqStatusOtherJobs/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default RqStatus;
