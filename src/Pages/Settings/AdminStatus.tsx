import React from 'react';
import 'antd/dist/reset.css';
import { Card, Col, Row, List, Typography, Tabs } from 'antd';
import RqStatus from "@/Components/SystemStatusComponent/RQStatus.tsx";
import OutDatedReport from "@/Components/SystemStatusComponent/OutDatedReport.tsx";

const { Text } = Typography;
const { TabPane } = Tabs;

// --- Data Definitions ---
// Using specific types for our data items enhances type safety.
type StatusItem = {
    key: string;
    label: string;
    value: string | number;
    badge?: boolean; // To show a number in a badge
    tagColor?: string; // To show a string in a colored tag
};

const generalData: StatusItem[] = [
    { key: '1', label: 'Dashboards Count', value: 2},
    { key: '2', label: 'Queries Count', value: 0},
    { key: '3', label: 'Query Results Count', value: 0 },
    { key: '4', label: 'Redis Used Memory', value: 1214872 },
    { key: '5', label: 'Redis Used Memory (Human)', value: '1.16M' },
    { key: '6', label: 'Unused Query Results Count', value: 0 },
    { key: '7', label: 'Version', value: 2.03 },
    { key: '8', label: 'Widgets Count', value: 0},
];

const managerData: StatusItem[] = [
    { key: '1', label: 'Last Refresh', value: 'a minute ago' },
    { key: '2', label: 'Started', value: '1/8' },
    { key: '3', label: 'Outdated Report Count', value: 0, badge: true },
];

const queueData: StatusItem[] = [
    { key: '1', label: 'default', value: 0, badge: true },
    { key: '2', label: 'emails', value: 0, badge: true },
    { key: '3', label: 'periodic', value: 0, badge: true },
    { key: '4', label: 'queries', value: 0, badge: true },
];

const databaseData: StatusItem[] = [
    { key: '1', label: '查询结果表容量', value: '24 KB', tagColor: 'blue' },
    { key: '2', label: '数据车已用容量', value: '10.227 MB', tagColor: 'blue' },
];


// --- Helper Component for Rendering List Items ---
// This makes the main component cleaner by abstracting the rendering logic.
const StatusListItem: React.FC<{ item: StatusItem }> = ({ item }) => {
    const renderValue = () => {


        return <Text style={{ backgroundColor: '#1890ff', padding: "2px 10px", color:"white" }}>{item.value}</Text>;
    };

    return (
        <List.Item>
            <Text>{item.label}</Text>
            {renderValue()}
        </List.Item>
    );
};


// --- Main Admin Status Component ---
const AdminStatus: React.FC = () => {
    return (
        <div style={{ background: 'white', padding: "20px" }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="System Status" key="1">
                    <Row gutter={[16, 16]}>
                        {/* General Card */}
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Card title="General" bordered={false}>
                                <List
                                    dataSource={generalData}
                                    renderItem={(item) => <StatusListItem item={item} />}
                                    split={false}
                                />
                            </Card>
                        </Col>

                        {/* Manager Card */}
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Card title="Manager" bordered={false}>
                                <List
                                    dataSource={managerData}
                                    renderItem={(item) => <StatusListItem item={item} />}
                                    split={false}
                                />
                            </Card>
                        </Col>

                        {/* Queue Card */}
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Card title="Queue" bordered={false}>
                                <List
                                    dataSource={queueData}
                                    renderItem={(item) => <StatusListItem item={item} />}
                                    split={false}
                                />
                            </Card>
                        </Col>

                        {/* Database Card */}
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Card title="Database" bordered={false}>
                                <List
                                    dataSource={databaseData}
                                    renderItem={(item) => <StatusListItem item={item} />}
                                    split={false}
                                />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="RQ Status" key="2">
                    <RqStatus/>
                </TabPane>
                <TabPane tab="Outdated Report" key="3">
                    <OutDatedReport/>
                </TabPane>
            </Tabs>
        </div>
    );
};


export default AdminStatus;
