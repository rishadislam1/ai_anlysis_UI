
import 'antd/dist/reset.css';
import { Table } from 'antd';

const RqStatusQueries = () => {
    // Define the columns for the table based on the image provided.
    const columns = [
        {
            title: 'Queue',
            dataIndex: 'queue',
            key: 'queue',
        },
        {
            title: 'Report ID',
            dataIndex: 'reportId',
            key: 'reportId',
        },
        {
            title: 'Org ID',
            dataIndex: 'orgId',
            key: 'orgId',
        },
        {
            title: 'Data Source ID',
            dataIndex: 'dataSourceId',
            key: 'dataSourceId',
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Scheduled',
            dataIndex: 'scheduled',
            key: 'scheduled',
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Enqueue Time',
            dataIndex: 'enqueueTime',
            key: 'enqueueTime',
        },
    ];

    // The data source is an empty array, as the image shows "No Data".
    // Ant Design's Table component will automatically display a "No Data" message.
    const data: readonly never[] | undefined = [];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false} // Hiding pagination as it's not in the screenshot
            />
        </div>
    );
};

export default RqStatusQueries;
