import React from "react";
import { Button, Table } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { dashboardStore } from "@/store/dashboard_store.ts";

interface Widget {
    id: number;
    width: number;
    options: {
        isHidden: boolean;
        position: {
            autoHeight: boolean;
            sizeX: number;
            sizeY: number;
            minSizeX: number;
            maxSizeX: number;
            minSizeY: number;
            maxSizeY: number;
            col: number;
            row: number;
        };
        parameterMappings: Record<string, unknown>;
    };
    dashboard_id: number;
    text: string;
    updated_at: string;
    created_at: string;
}

interface DataType {
    id: number;
    slug: string;
    name: string;
    user_id: number;
    user: {
        id: number;
        name: string;
        email: string;
        profile_image_url: string;
    };
    layout: unknown[];
    dashboard_filters_enabled: boolean;
    widgets: Widget[];
    options: Record<string, unknown>;
    is_archived: boolean;
    is_draft: boolean;
    tags: string[];
    updated_at: string;
    created_at: string;
    version: number;
    is_favorite: boolean;
    can_edit: boolean;
}

interface DashboardTableProps {
    searchDashboard?: string;
}

const DashboardTable: React.FC<DashboardTableProps> = ({searchDashboard}) => {
    const navigate = useNavigate();
    const { dashboardDataList, setDashboardDataList, setDashboardData } = dashboardStore();
    const queryParams = new URLSearchParams(location.search);
    const menuFilter = queryParams.get("menu");

    const handleToggleFavourite = (key: number) => {
        setDashboardDataList((prev) =>
            prev.map((item: DataType) =>
                item.id === key ? { ...item, is_favorite: !item.is_favorite } : item
            )
        );
    };

    const columns = [
        {
            render: (_: string, record: DataType) => (
                <span
                    className={`text-${
                        record.is_favorite ? "red" : "gray"
                    }-500 cursor-pointer`}
                    onClick={() => handleToggleFavourite(record.id)}
                >
          {record.is_favorite ? "★" : "☆"}
        </span>
            ),
            dataIndex: "is_favorite",
            key: "is_favorite",
            width: 10,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            className: "text-blue-500 text-xs",
            sorter: (a: DataType, b: DataType) => (a.name > b.name ? 1 : -1),
            render: (text: string, record: DataType) => (
                <Button
                    onClick={() => {
                        setDashboardData(record);
                        navigate(record.id+"-"+ text.replace(" ", "_"));
                    }}
                    type="link"
                >
                    {text}
                </Button>
            ),
        },
        {
            title: "Created By",
            dataIndex: "user",
            key: "createdBy",
            width: 100,
            className: "text-gray-500 text-xs",
            render: (user: DataType["user"]) => user.name,
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "createdAt",
            sorter: (a: DataType, b: DataType) =>
                moment(a.created_at, "YY/MM/DD HH:mm").valueOf() -
                moment(b.created_at, "YY/MM/DD HH:mm").valueOf(),
            width: 120,
            className: "text-gray-500 text-xs",
            render: (text: string) => moment(text).format("YY/MM/DD HH:mm"),
        },
    ];

    return (
        <Table
            dataSource={dashboardDataList.filter(item => searchDashboard === "" || item.name.toLowerCase().includes(searchDashboard?.toLowerCase() || '')).filter((item: DataType) =>
                menuFilter === "my"
                    ? item.user.name === "Munna"
                    : menuFilter === "favorites"
                        ? item.is_favorite
                        : true
            )}
            columns={columns}
            size="middle"
        />
    );
};

export default DashboardTable;