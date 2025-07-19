import {Table} from "antd";

const DashboardsPrettify = () => {
    const rows = [];
    const columns = [
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
            />
        </div>
    );
};

export default DashboardsPrettify;