import React from 'react';
import { Table } from "antd";
import type { TableProps } from 'antd';

// 1. Define an interface for the data records.
// This ensures type safety for your table rows.
interface DataType {
    key: React.Key;
    name: string;
    created_at: string;
    task_status: string;
}

const DashboardsPrettify: React.FC = () => {

    const rows: DataType[] = [

    ];


    const columns: TableProps<DataType>['columns'] = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center"
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "createdAt",
            align: "center"
        },
        {
            title: "Task Status",
            dataIndex: "task_status",
            key: "task_status",
            align: "center"
        },
    ];

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-2xl">Dashboard Prettify</span>
            </div>
            <Table
                dataSource={rows}
                columns={columns}
                size="small"
                pagination={false}
            />
        </div>
    );
};

export default DashboardsPrettify;