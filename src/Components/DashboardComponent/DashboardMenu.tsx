import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardMenuProps {
    searchDashboard: string;
    setSearchDashboard: (searchDashboard : string) => void;
}
const DashboardMenu: React.FC<DashboardMenuProps> = ({searchDashboard, setSearchDashboard}) => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState<string>("dashboards");

    const menuItems = [
        { label: "All Dashboard", key: "dashboards" },
        { label: "My Dashboard", key: "dashboards?menu=my" },
        { label: "Favourites", key: "dashboards?menu=favorites" },
    ];

    useEffect(() => {
        setSelectedMenu(window.location.href.split("/")[3] || "dashboards");
    }, []);

    return (
        <div className="space-y-2">
            <div>
                <input
                    className="rounded-none bg-white w-full p-3 text-xs border-gray-500 hover:border-blue-400 focus:border-0"
                    placeholder="Search Dashboard"
                    value={searchDashboard}
                    onChange={(e) => {
                        setSearchDashboard(e.target.value);
                    }}
                />
            </div>
            <div className="bg-white w-full shadow ">
                {menuItems.map((item, index) => (
                    <div
                        key={index.toString()}
                        onClick={() => {
                            setSelectedMenu(item.key);
                            navigate(`/${item.key}`);
                        }}
                        className={`p-3 px-4 text-xs ${
                            selectedMenu === item.key
                                ? "bg-blue-50 text-blue-500 border-s-2"
                                : "text-gray-500 hover:text-blue-500"
                        } cursor-pointer`}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardMenu;