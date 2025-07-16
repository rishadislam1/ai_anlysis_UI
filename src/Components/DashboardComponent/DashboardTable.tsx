import React from "react";
import {Button, Table} from "antd";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {dashboardStore} from "@/store/dashboard_store.ts";

// Define the data type for the table
interface DataType {
    key: string;
    name: string;
    createdBy?: string;
    createdAt: string;
    favourite: boolean;
}

// Component without redundant props, using store directly
const DashboardTable: React.FC = () => {
    const navigate = useNavigate();
    const {dashboardDataList, setDashboardDataList, setDashboardData} = dashboardStore();
    const queryParams = new URLSearchParams(location.search);
    const menuFilter = queryParams.get("menu");

    const handleToggleFavourite = (key: string) => {
        setDashboardDataList((prev) =>
            prev.map((item: DataType) =>
                item.key === key ? {...item, favourite: !item.favourite} : item
            )
        );
    };

    const columns = [
        {
            render: (_: string, record: DataType) => (
                <span
                    className={`text-${record.favourite ? "red" : "gray"}-500 cursor-pointer`}
                    onClick={() => handleToggleFavourite(record.key)}
                >
          {record.favourite ? "★" : "☆"}
        </span>
            ),
            dataIndex: "favourite",
            key: "favourite",
            width: 10,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            className: "text-blue-500 text-xs",
            sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
            render: (text: string, record: DataType) => (
                <Button onClick={() => {
                    setDashboardData(record);
                    navigate(text.replace(" ", "_"));
                }} type="link">
                    {text}
                </Button>
            ),
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
            width: 100,
            className: "text-gray-500 text-xs",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: (a: DataType, b: DataType) =>
                moment(a.createdAt, "YY/MM/DD HH:mm").valueOf() -
                moment(b.createdAt, "YY/MM/DD HH:mm").valueOf(),
            width: 120,
            className: "text-gray-500 text-xs",
        },
    ];

    return (
        <Table
            dataSource={dashboardDataList.filter((item: DataType) => menuFilter === "my" ? item.createdBy === "Munna" : menuFilter === "favorites" ? item.favourite : true)}
            columns={columns}
            size="middle"
        />
    );
};

export default DashboardTable;