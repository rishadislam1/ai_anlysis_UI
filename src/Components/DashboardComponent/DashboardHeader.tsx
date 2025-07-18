import React from "react";
import { Button, Dropdown, Tooltip, type MenuProps } from "antd";
import { FaCheck } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import { dashboardStore } from "@/store/dashboard_store.ts";
import avatar from "@/assets/images/gravatar.png";
import {useNavigate} from "react-router-dom";
import {LuRefreshCw} from "react-icons/lu";
import {IoIosArrowDown, IoMdShare} from "react-icons/io";
import {SlOptionsVertical} from "react-icons/sl";
import {FaWandMagicSparkles} from "react-icons/fa6";

interface DashboardHeaderProps {
    name: string | undefined;
    isEditable: boolean;
    onSaveLayout: () => void;
    onArchive: () => void;
    onShare: () => void;
    onPrettify: () => void;
    allowShareSecretAddress: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({name, isEditable, onSaveLayout, onArchive, onShare, onPrettify, allowShareSecretAddress}) => {
    const { dashboardData, handleToggleFavourite } = dashboardStore();
    const [refreshAfter, setRefreshAfter] = React.useState("Disable auto refresh");
    const navigate = useNavigate();

    const RefreshItems: MenuProps["items"] = [
        "1 m",
        "5 m",
        "10 m",
        "30 m",
        "1 h",
        "12 h",
        "1 d",
        "Disable auto refresh",
    ]
        .filter((item) => (refreshAfter === "Disable auto refresh" ? item !== "Disable auto refresh" : true))
        .map((item, index) => ({
            label: item,
            key: index.toString(),
            onClick: () => {
                setRefreshAfter(item);
                if (item !== "Disable auto refresh") {
                    const [value, unit] = item.split(" ");
                    const time =
                        unit === "m"
                            ? parseInt(value) * 60
                            : unit === "h"
                                ? parseInt(value) * 3600
                                : parseInt(value) * 86400;
                    navigate(`/dashboards/${name}?refresh=${time}`);
                }
            },
        }));

    const EditItems: MenuProps["items"] = [
        {
            label: "Edit",
            key: "0",
            onClick: () => navigate(`/dashboards/${name}?edit`),
        },
        {
            label: "Draft",
            key: "1",
            onClick: () => console.log("Draft saved!"),
        },
        {
            label: "Archive",
            key: "2",
            onClick: onArchive,
        },
    ];

    return (
        <div className="mb-2 flex justify-between items-center">
            <div className="text-2xl flex items-center space-x-1">
                <span
                    className={`text-${dashboardData?.is_favorite ? "yellow" : "gray"}-500 cursor-pointer me-2`}
                    onClick={() => handleToggleFavourite(dashboardData)}
                >
                  {dashboardData?.is_favorite ? "★" : "☆"}
                </span>
                <span>{name?.split("-")[1].replace("_", " ")}</span>
                <img
                    src={avatar}
                    title={dashboardData?.user.name || "Unknown"}
                    alt="avatar"
                    width={16}
                />
            </div>
            {isEditable ? (
                <Button
                    onClick={onSaveLayout}
                    type="primary"
                    style={{ borderRadius: 0 }}
                    className="align-middle"
                >
                    <FaCheck /> Save
                </Button>
            ) : (
                <div className="flex items-center space-x-1">
                    <div>
                        <Button onClick={onPrettify}>
                            <FaWandMagicSparkles /> Prettify Dashboard
                        </Button>
                    </div>

                    <div className="flex items-center">
                        <Tooltip
                            placement="top"
                            title={"Auto refreshing every " + refreshAfter}
                        >
                            <Button
                                type={refreshAfter === "Disable auto refresh" ? "default" : "primary"}
                            >
                                <LuRefreshCw />{" "}
                                {refreshAfter === "Disable auto refresh" ? "Refresh" : refreshAfter}
                            </Button>
                        </Tooltip>
                        <Dropdown
                            menu={{ items: RefreshItems }}
                            trigger={["click"]}
                            placement="bottomRight"
                        >
                            <Button
                                style={{ padding: "0px 10px" }}
                                type={refreshAfter === "Disable auto refresh" ? "default" : "primary"}
                            >
                                <IoIosArrowDown />
                            </Button>
                        </Dropdown>
                    </div>
                    <div>
                        <Button style={{ padding: "0px 10px" }}>
                            <MdFullscreen />
                        </Button>
                    </div>
                    <div>
                        <Button
                            style={{ padding: "0px 10px" }}
                            onClick={onShare}
                            type={allowShareSecretAddress ? "primary" : "default"}
                        >
                            <IoMdShare />
                        </Button>
                    </div>
                    <div>
                        <Dropdown menu={{ items: EditItems }} trigger={["click"]}>
                            <Button style={{ padding: "0px 10px" }}>
                                <SlOptionsVertical />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHeader;