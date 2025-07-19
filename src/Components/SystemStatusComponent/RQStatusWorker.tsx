import 'antd/dist/reset.css';
import { Table } from 'antd';


const RqStatusWorker = () => {
    const columns = [
        { title: 'State', dataIndex: 'State', key: 'State' },
        { title: 'Hostname', dataIndex: 'Hostname', key: 'Hostname' },
        { title: 'PID', dataIndex: 'PID', key: 'PID' },
        { title: 'Name', dataIndex: 'Name', key: 'Name' },
        { title: 'Queues', dataIndex: 'Queues', key: 'Queues' },
        { title: 'Current Job', dataIndex: 'CurrentJob', key: 'CurrentJob' },
        { title: 'Successful Jobs', dataIndex: 'SuccessfulJobs', key: 'SuccessfulJobs' },
        { title: 'Failed Jobs', dataIndex: 'FailedJobs', key: 'FailedJobs' },
        { title: 'Birth Date', dataIndex: 'BirthDate', key: 'BirthDate' },
        { title: 'Total Working Time', dataIndex: 'TotalWorkingTime', key: 'TotalWorkingTime' },
    ];

    const data = [
        {
            key: '1',
            State: 'busy',
            Hostname: '59fa4042fc39',
            PID: 10,
            Name: 'a655f0f8561248f8b0ad0e079c98070f',
            Queues: 'periodic, emails, default, scheduled_queries, schemas',
            CurrentJob: null,
            SuccessfulJobs: 215,
            FailedJobs: 0,
            BirthDate: '2025-07-19 03:50',
            TotalWorkingTime: '20 s',
        },
        {
            key: '2',
            State: 'idle',
            Hostname: '59fa4042fc39',
            PID: 11,
            Name: 'bde4e3f62c4337810897a3cfd9e8e30',
            Queues: 'periodic, emails, default, scheduled_queries, schemas',
            CurrentJob: null,
            SuccessfulJobs: 219,
            FailedJobs: 0,
            BirthDate: '2025-07-19 03:50',
            TotalWorkingTime: '17 s',
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource= {data}
                pagination={{
                    defaultPageSize: 25,
                    pageSizeOptions: ['10', '25', '50'],
                    showSizeChanger: true,
                    position: ['bottomRight'],
                }}
            />
        </div>
    );
};

export default RqStatusWorker;