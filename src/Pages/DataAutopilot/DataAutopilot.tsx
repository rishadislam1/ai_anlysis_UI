import Select, {type StylesConfig, type SingleValue } from 'react-select';
import { Link } from 'react-router-dom';
import { CiCircleQuestion } from 'react-icons/ci';
import csv from '@/assets/csv.png';
import NoDataFound from '@/Components/NoDataFound.tsx';
import { useState, type ChangeEvent } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure.tsx';
import { AxiosError } from 'axios';
import {IoMdSend} from "react-icons/io";

// Define the option type for react-select
interface OptionType {
    value: string;
    label: string;
    icon?: string; // Optional field for the image/icon URL
}

// Define the structure of a single CSV data item
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

// Define the structure of the API response
interface CsvDataResponse {
    code: number;
    data: CsvDataItem[]; // Ensure data is always an array
}

// Custom styles for react-select with proper typing
const customStyles: StylesConfig<OptionType, false> = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#e6f0fa' : state.isFocused ? '#e6f0fa' : 'white',
        color: 'black',
        padding: '8px 12px',
        borderRadius: '4px',
        margin: '2px 0',
        ':hover': {
            backgroundColor: '#e6f0fa',
        },
        display: 'flex',
        alignItems: 'center',
    }),
    control: (provided) => ({
        ...provided,
        border: '1px solid #e2e8f0',
        borderRadius: '4px',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#cbd5e1',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
};

// Custom option renderer to include an image
const formatOptionLabel = ({ label, icon }: OptionType) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && (
            <img
                src={icon}
                alt={`${label} icon`}
                style={{ marginRight: '8px', width: '20px', height: '20px' }}
            />
        )}
        <span>{label}</span>
    </div>
);

const DataAutopilot = () => {
    // Define data sources
    const dataSources: OptionType[] = [
        {
            value: 'source1',
            label: 'CSV Data Source',
            icon: csv,
        },
    ];

    // Hooks
    const axiosSecure = useAxiosSecure();

    // State
    const [csvData, setCsvData] = useState<CsvDataResponse | null>(null);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);

    // CSV change handler
    const handleCsvChange = async (selectedOption: SingleValue<OptionType>) => {
        if (selectedOption) {
            try {
                const response = await axiosSecure.get<CsvDataResponse>('/upload');
                const fetchedData = response.data;
                console.log(fetchedData);
                setCsvData(fetchedData);
                setSelectedSources([]);
            } catch (error) {
                console.error('Error fetching CSV data:', error as AxiosError);
                setCsvData(null);
            }
        } else {
            setCsvData(null);
            setSelectedSources([]);
        }
    };

    // Checkbox change handler
    const handleCheckboxChange = (source: string, checked: boolean) => {
        setSelectedSources((prev) =>
            checked ? [...prev, source] : prev.filter((s) => s !== source)
        );
    };

    // Select all checkbox handler
    const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const checkboxes = document.querySelectorAll<HTMLInputElement>(
            'input[name^=source]'
        );
        checkboxes.forEach((checkbox) => (checkbox.checked = checked));
        setSelectedSources(
            checked && csvData?.data ? csvData.data.map((item) => item.source_name) : []
        );
    };

    // analysis handler
    const handleAnalysisSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("hello");
    };

    return (
        <div className="lg:ml-20">
            <p className="font-semibold text-4xl">Hi!</p>
            <p className="text-gray-500 text-lg">
                Please choose your data source & table to start data analysis or{' '}
                <Link to="/data_sources" className="text-blue-500 font-semibold">
                    Add Data Sources
                </Link>
            </p>
            <div className="flex justify-center items-center">
                <div className="mt-10 rounded bg-white shadow p-4 w-1/2 border border-gray-100 ">

                    <div className={`grid grid-cols-2 gap-2`}>
                        {/* Data source */}
                        <div>
                            <div className="flex items-center gap-2 relative">
                                <p>Data&nbsp;Sources</p>
                                <div className="mt-2">
                                    <div className="group inline-block">
                                        <CiCircleQuestion
                                            size={20}
                                            className="font-bold text-black cursor-pointer"
                                        />
                                        <div
                                            className="pointer-events-none absolute left-0 top-10 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                            Select your data source and complete the corresponding table and field
                                            descriptions. DeepBI enables you to translate human language into usable
                                            actions and helps you complete real-world tasks, such as those related to
                                            your data.
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
                                <div className="mt-2"/>
                                {csvData?.data && csvData.data.length > 0 ? (
                                    <div className="w-full col-span-3 border border-gray-300 rounded-lg p-2">
                                        <div
                                            className="flex items-center p-1 hover:bg-[#e6f0fa] rounded cursor-pointer"
                                            style={{margin: '2px 0'}}
                                        >
                                            <input
                                                type="checkbox"
                                                id="select-all"
                                                name="select-all"
                                                onChange={handleSelectAllChange}
                                            />
                                            <label htmlFor="select-all" className="text-black ml-2">
                                                Select all
                                            </label>
                                        </div>
                                        {csvData.data.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center p-1 hover:bg-[#e6f0fa] rounded cursor-pointer"
                                                style={{margin: '2px 0'}}
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
                                    <div
                                        className="w-full col-span-3 border border-gray-300 rounded-lg h-[240px] flex flex-col justify-center items-center">
                                        <NoDataFound/>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Data preview (right side) */}
                        <div
                            className="border border-gray-300 p-3 rounded-lg flex flex-col justify-center items-center">
                            {selectedSources.length > 0 ? (
                                <div>
                                    <p className="text-black">Selected Sources:</p>
                                    <ul>
                                        {selectedSources.map((source, index) => (
                                            <li key={index} className="text-black">
                                                {source}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <NoDataFound/>
                            )}
                        </div>
                    </div>

                    <div className={`flex items-center gap-2 relative text-sm`}>
                        <div className="mt-2">
                            <div className="group inline-block">
                                <CiCircleQuestion
                                    size={20}
                                    className="font-bold text-black cursor-pointer"
                                />
                                <div
                                    className="pointer-events-none absolute left-0 top-10 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                                    Select your data source and complete the corresponding table and field descriptions, DeepBI enables you to translate human Languageuage into Xusable actions and helps you complete real-world tasks, such as those related to your data.
                                </div>
                            </div>
                        </div>
                        <p>Please complete the form and field comments so that the Agent can better help you complete
                            the
                            task.</p>
                    </div>


                </div>

            </div>
            <div className={`fixed bottom-10 w-3/4`}>
                <form className={`w-full relative`} onSubmit={handleAnalysisSubmit}>

                    <input type={`text`}
                           className={` w-full border border-gray-100 outline-none rounded-lg h-14 bg-white shadow-md p-2 `}
                           placeholder={`Send a message`}/>
                    <button className={`absolute top-4 right-5 cursor-pointer`}><IoMdSend size={25}/></button>

                </form>
            </div>
        </div>
    );
};

export default DataAutopilot;

