import React, { useState } from "react";
import { Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {dashboardStore} from "@/store/dashboard_store.ts";

interface NewDashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewDashboardModal: React.FC<NewDashboardModalProps> = ({isOpen, onClose}) => {
    const { dashboardDataList, setDashboardDataList, setDashboardData } = dashboardStore();
    const navigate = useNavigate();
    const [newData, setNewData] = useState({
        id: dashboardDataList.length,
        slug: "",
        name: "",
        user_id: 1,
        user: {
            id: 1,
            name: "Munna",
            email: "mahadimunna22@gmail.com",
            profile_image_url: "/static/images/gravatar.png",
        },
        layout: [],
        dashboard_filters_enabled: true,
        widgets: [],
        options: {},
        is_archived: false,
        is_draft: true,
        tags: [],
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        version: 24,
        is_favorite: false,
        can_edit: true,
    });

    const handleSave = () => {
        if (newData.name.trim() === "") {
            alert("Dashboard name cannot be empty");
            return;
        }
        const dashboards = [...dashboardDataList, newData];
        setDashboardDataList(dashboards);
        setDashboardData(newData);
        navigate(`${newData.id}-${newData.name.replace(" ", "_")}?edit`);
        onClose();
        setNewData({
            ...newData,
            id: dashboardDataList.length + 1,
            name: "",
            slug: "",
        });
    };

    return (
        <Modal
            title="New Dashboard"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isOpen}
            onCancel={onClose}
            onOk={handleSave}
            okText="Save"
            cancelText="Cancel"
        >
            <Input
                value={newData.name}
                onChange={(e) => setNewData({ ...newData, name: e.target.value, slug: e.target.value })}
                placeholder="Dashboard Name"
                style={{ padding: "8px 10px", borderRadius: "4px" }}
            />
        </Modal>
    );
};

export default NewDashboardModal;