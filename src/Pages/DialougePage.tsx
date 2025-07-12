import Select from 'react-select';
import { Link } from "react-router-dom";
import { CiCircleQuestion } from "react-icons/ci";
import csv from "@/assets/csv.png";
import NoDataFound from "@/Components/NoDataFound.tsx";
import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure.tsx";

// Define the option type for TypeScript
interface OptionType {
    value: string;
    label: string;
    icon?: string; // Optional field for the image/icon URL
}

interface CsvDataItem {
    id: number;
    user_id: number;
    org_id: number;
    source_name: string;
    file_name: string;
    is_use: boolean;
    file_type: string;
    created_at: string;
}

interface CsvDataResponse {
    code: number;
    data: CsvDataItem[];
}

const DialougePage = () => {
    const dataSources: OptionType[] = [
        {
            value: 'source1',
            label: 'CSV Data Source',
            icon: `${csv}`
        },
    ];

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#e6f0fa' : state.isFocused ? '#e6f0fa' : 'white',
            color: state.isSelected ? 'black' : 'black',
            padding: '8px 12px',
            borderRadius: '4px',
            margin: '2px 0',
            ':hover': {
                backgroundColor: '#e6f0fa',
            },
            display: 'flex',
            alignItems: 'center',
        }),
        control: (provided: any) => ({
            ...provided,
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#cbd5e1',
            },
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'black',
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }),
    };

    // Custom option renderer to include an image
    const formatOptionLabel = ({ label, icon }: OptionType) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {icon && <img src={icon} alt={`${label} icon`} style={{ marginRight: '8px', width: '20px', height: '20px' }} />}
            <span>{label}</span>
        </div>
    );

    // Hooks
    const axiosSecure = useAxiosSecure();

    // State
    const [csvData, setCsvData] = useState<CsvDataResponse | null>(null);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);

    // CSV change handler
    const handleCsvChange = async (selectedOption: OptionType | null) => {
        if (selectedOption) {
            try {
                const response = await axiosSecure.get(`/upload`);
                const fetchedData = response.data; // Assuming the API returns data in the response
                console.log(fetchedData); // Log the actual data
                setCsvData(fetchedData); // Update state with fetched data
                setSelectedSources([]); // Reset selected sources on new data load
            } catch (error) {
                console.error("Error fetching CSV data:", error);
            }
        } else {
            setCsvData(null); // Clear data if no option is selected
            setSelectedSources([]);
        }
    };

    const handleCheckboxChange = (source: string, checked: boolean) => {
        setSelectedSources((prev) =>
            checked ? [...prev, source] : prev.filter((s) => s !== source)
        );
    };

    return (
        <div className={`lg:ml-20`}>
            <p className={`font-semibold text-4xl`}>Hi !</p>
            <p className={`text-gray-500 text-lg`}>
                Please choose your data source & table to start data analysis or<Link to={'/'} className={`text-blue-500 font-semibold`}>Add Data Sources</Link>
            </p>
            <div className={`flex justify-center items-center`}>
                <div className={`mt-10 rounded bg-white shadow p-4 w-1/2 border border-gray-100 grid grid-cols-2 gap-2`}>
                    {/* Data source */}
                    <div className="">
                        <div className="flex items-center gap-2 relative">
                            <p>Data Sources</p>
                            <div className="mt-2">
                                <div className="group inline-block">
                                    <CiCircleQuestion
                                        size={20}
                                        className="font-bold text-black cursor-pointer"
                                    />
                                    <div
                                        className="pointer-events-none absolute left-0 top-10 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50"
                                    >
                                        Select your data source and complete the corresponding table and field
                                        descriptions.
                                        DeepBI enables you to translate human language into usable actions and helps you
                                        complete real-world tasks, such as those related to your data.
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <Select
                                    options={dataSources}
                                    placeholder="Select Data Source"
                                    isSearchable
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    onChange={handleCsvChange}
                                />
                            </div>
                        </div>
                        {/* Show data */}
                        <div className="grid grid-cols-4 items-center gap-2 relative mt-5">
                            <div className="mt-2"></div>
                            {
                                csvData?.data?.length > 0 ? (
                                    <div className="w-full col-span-3 border border-gray-300 rounded-lg p-2">
                                        <div className="flex items-center p-1 hover:bg-[#e6f0fa] rounded cursor-pointer" style={{ margin: '2px 0' }}>
                                            <input
                                                type="checkbox"
                                                id="select-all"
                                                name="select-all"
                                                onChange={(e) => {
                                                    const checkboxes = document.querySelectorAll('input[name^=source]');
                                                    checkboxes.forEach((checkbox) => (checkbox as HTMLInputElement).checked = e.target.checked);
                                                    setSelectedSources(e.target.checked ? csvData.data.map((item) => item.source_name) : []);
                                                }}
                                            />
                                            <label htmlFor="select-all" className="text-black ml-2">
                                                Select all
                                            </label>
                                        </div>
                                        {csvData.data.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center p-1 hover:bg-[#e6f0fa] rounded cursor-pointer"
                                                style={{ margin: '2px 0' }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={item.source_name}
                                                    name={`source-${item.source_name}`}
                                                    value={item.source_name}
                                                    className="mr-2"
                                                    onChange={(e) => handleCheckboxChange(item.source_name, e.target.checked)}
                                                />
                                                <label htmlFor={item.source_name} className="text-black">
                                                    {item.source_name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full col-span-3 border border-gray-300 rounded-lg h-[240px] flex flex-col justify-center items-center">
                                        <NoDataFound />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/* Data preview (right side) */}
                    <div className={`border border-gray-300 p-3 rounded-lg flex flex-col justify-center items-center`}>
                        {selectedSources.length > 0 ? (
                            <div>
                                <p className="text-black">Selected Sources:</p>
                                <ul>
                                    {selectedSources.map((source, index) => (
                                        <li key={index} className="text-black">{source}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialougePage;