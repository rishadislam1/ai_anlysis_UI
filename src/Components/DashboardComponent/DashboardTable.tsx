import React from "react";
import {Button, Table} from "antd";
import moment from "moment";
import {useNavigate} from "react-router-dom";

interface DataType {
    key: string;
    name: string;
    createdBy?: string;
    createdAt: string;
    favourite: boolean;
}

interface SectionAllDashboardsProps {
    dataSource: DataType[];
    setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const DashboardTable : React.FC<SectionAllDashboardsProps>  = ({dataSource, setDataSource}) => {
    const navigate = useNavigate();

    const handleToggleFavourite = (key: string) => {
        setDataSource(prev =>
            prev.map(item =>
                item.key === key ? { ...item, favourite: !item.favourite } : item
            )
        );
    };

    const columns = [
        {
            render: (_text: string, record: DataType) => (
                <span
                    className={`text-${record.favourite ? 'red' : 'gray'}-500 cursor-pointer`}
                    onClick={() => handleToggleFavourite(record.key)}
                >
                    {record.favourite ? '★' : '☆'}
                </span>
            ),
            dataIndex: 'favourite',
            key: 'favourite',
            width: 10
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: 'text-blue-500 text-xs',
            sorter: (a: DataType, b: DataType) => a.name > b.name ? 1 : -1,
            render: (text: string) => <Button style={{padding: 0, fontSize: '12px'}} onClick={() => navigate(text.replace(" ", "_"))} type={'link'}>{text}</Button>,
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 100,
            className: 'text-gray-500 text-xs',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a: DataType, b: DataType) => moment(a.createdAt, 'YY/MM/DD HH:mm').valueOf() - moment(b.createdAt, 'YY/MM/DD HH:mm').valueOf(),
            width: 120,
            className: 'text-gray-500 text-xs',
        },
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            size={'middle'}

        />
    );
};

export default DashboardTable;