import React, { useState } from "react";
import { Button } from "antd";
import DashboardMenu from "@/Components/DashboardComponent/DashboardMenu.tsx";
import DashboardTable from "@/Components/DashboardComponent/DashboardTable.tsx";
import NewDashboardModal from "@/Components/DashboardComponent/NewDashboardModal.tsx";

const DashboardListPage: React.FC = () => {
    const [isNewDashboardOpen, setIsNewDashboardOpen] = useState(false);
    const [searchDashboard, setSearchDashboard] = useState("");

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">Dashboards</h1>
                <Button onClick={() => setIsNewDashboardOpen(true)} type="primary" style={{ borderRadius: 0 }}>
                    + Create
                </Button>
            </div>
            <div className="grid grid-cols-12 space-x-4">
                <div className="col-span-3">
                    <DashboardMenu
                        searchDashboard={searchDashboard}
                        setSearchDashboard={setSearchDashboard}
                    />
                </div>
                <div className="col-span-9">
                    <DashboardTable searchDashboard={searchDashboard} />
                </div>
            </div>
            <NewDashboardModal
                isOpen={isNewDashboardOpen}
                onClose={() => setIsNewDashboardOpen(false)}
            />
        </div>
    );
};

export default DashboardListPage;