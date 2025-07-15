import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import DashboardTable from "@/Components/DashboardComponent/DashboardTable.tsx";
import {Button} from "antd";

interface DataType {
    key: string;
    name: string;
    createdBy?: string;
    createdAt: string;
    favourite: boolean;
}

const MenuComponent = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState<string>("dashboards");
    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: '1',
            name: 'Test',
            createdBy: 'Munna',
            createdAt: '15/07/25 23:42',
            favourite: false
        },
        {
            key: '2',
            name: 'Test 2',
            createdBy: 'Rahim',
            createdAt: '15/07/25 23:45',
            favourite: true
        },
    ]);
    const MenuItems = [
        {
            label: `All Dashboard`,
            key: 'dashboards',
            content: <DashboardTable dataSource={dataSource} setDataSource={setDataSource}/>
        },
        {
            label: `My Dashboard`,
            key: 'dashboards?menu=my',
            content: <DashboardTable dataSource={dataSource.filter(item => item?.createdBy==='Munna')} setDataSource={setDataSource}/>
        },
        {
            label: `Favourites`,
            key: 'dashboards?menu=favorites',
            content: <DashboardTable dataSource={dataSource.filter(item => item.favourite)} setDataSource={setDataSource}/>
        },
    ]


    useEffect(() => {
        setSelectedMenu(window.location.href.split('/')[3] || 'dashboards');
    }, [])

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">{MenuItems.find(item => item.key === selectedMenu)?.label}</h1>
                <Button type='primary' style={{borderRadius: 0}}>+ Create</Button>
            </div>
            <div className="grid grid-cols-12 space-x-4">
                <div className='col-span-3'>
                    <div className='space-y-4'>
                        <input
                            className='rounded-none bg-white w-full p-3 text-xs border-gray-500 hover:border-blue-400 focus:border-0'
                            placeholder='Search Dashboard'/>
                        <div className='bg-white w-full shadow'>
                            {MenuItems.map((item, index) => {
                                return (
                                    <div
                                        key={index.toString()}
                                        onClick={() => {
                                            setSelectedMenu(item?.key)
                                            navigate(`/${item?.key}`);
                                        }}
                                        className={`p-3 px-4 text-xs ${selectedMenu === item.key ? 'bg-blue-50 text-blue-500 border-s-2' : 'text-gray-500 hover:text-blue-500'} cursor-pointer`}
                                    >{item.label}</div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-span-9'>
                    {MenuItems.filter(item => item.key === selectedMenu).map((item) => item.content)}
                </div>
            </div>
        </div>
    );
};

export default MenuComponent;