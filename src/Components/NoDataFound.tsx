import {TbClipboardData} from "react-icons/tb";

const NoDataFound = () => {
    return (
        <div className={`flex flex-col justify-center items-center`}>
            <TbClipboardData size={30} />

            No Data
        </div>
    );
};

export default NoDataFound;