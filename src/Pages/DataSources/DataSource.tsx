import { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, Checkbox, message } from 'antd';
import { SearchOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import doris from "@/assets/images/doris.png";
import mongoDb from "@/assets/images/mongodb.png";
import mySQL from "@/assets/images/mysql.png";
import pg from "@/assets/images/pg.png";
import starrocks from "@/assets/images/starrocks.png";
import MySqlDataSource from "@/Components/DataSourceComponent/MySQLDataSource.tsx";
import DorisDataSource from "@/Components/DataSourceComponent/DorisDataSource.tsx";
import MongoDBDataSource from "@/Components/DataSourceComponent/MongoDBDataSource.tsx";
import StarrocksDataSource from "@/Components/DataSourceComponent/StarrocksDataSource.tsx";
import PostgreSQLDataSource from "@/Components/DataSourceComponent/PostgreSQLDataSource.tsx";

// Define a type for our data source configuration
interface DataSourceConfig {
    type: string;
    name: string;
    [key: string]: any;
}

// Map technical field names to user-friendly labels
const FIELD_LABELS: { [key: string]: string } = {
    name: 'Name',
    serverIp: '服务器IP / Server IP',
    port: '端口 / Port',
    username: '用户 / Username',
    password: '密码 / Password',
    database: '数据库 / Database',
    timeout: '连接超时 / Timeout',
    charset: '字符集 / Charset',
    useSsl: '使用 SSL',
    serverSslCert: '服务器SSL证书路径 / SSL server certificate path',
    clientSslCert: '客户端SSL证书路径 / SSL client certificate path',
    clientSslKey: '客户端SSL私钥路径 / SSL private key file path',
};

const DataSource = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // This component will now manage a single data source configuration
    const [dataSource, setDataSource] = useState<DataSourceConfig | null>(null);

    const [form] = Form.useForm();
    const [modalForm] = Form.useForm(); // Separate form for the creation modal

    // Populate the main form when a data source is loaded
    useEffect(() => {
        if (dataSource) {
            form.setFieldsValue(dataSource);
        }
    }, [dataSource, form]);

    const dataSourceTypes = [
        { name: 'Doris', image: doris },
        { name: 'MongoDB', image: mongoDb },
        { name: 'MySQL', image: mySQL },
        { name: 'PostgreSQL', image: pg },
        { name: 'StarRocks', image: starrocks }
    ];

    const showModal = () => {
        setIsModalOpen(true);
        setCurrentStep(0);
        setSelectedType(null);
        setSearchQuery('');
        modalForm.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCreateDataSource = () => {
        modalForm.validateFields()
            .then(values => {
                if (selectedType) {
                    const newDataSource: DataSourceConfig = { type: selectedType, ...values };
                    setDataSource(newDataSource);
                    message.success('Data source created successfully!');
                }
                setCurrentStep(currentStep + 1);
            })
            .catch(err => console.log('Validation error:', err));
    };

    // Handler for saving changes to the existing data source
    const handleSave = (values: any) => {
        if (dataSource) {
            setDataSource({ ...dataSource, ...values });
            message.success('Changes saved successfully!');
        }
    };

    // Show confirmation modal before deleting
    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this data source?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No, Cancel',
            onOk() {
                setDataSource(null);
                message.success('Data source deleted.');
            },
        });
    };

    // --- Modal rendering logic remains largely the same ---
    const renderFormForType = (type: string, formInstance: any) => {
        switch (type) {
            case 'MySQL': return (<div><div className="flex justify-center items-center gap-2 mb-4"><img src={mySQL} className="w-20" alt="MySQL"/><p className="font-bold text-lg">MySQL</p></div><MySqlDataSource form={formInstance} /></div>);
            case 'Doris': return (<div><div className="flex justify-center items-center gap-2 mb-4"><img src={doris} className="w-20" alt="Doris"/><p className="font-bold text-lg">Doris</p></div><DorisDataSource form={formInstance} /></div>);
            case 'MongoDB': return (<div><div className="flex justify-center items-center gap-2 mb-4"><img src={mongoDb} className="w-20" alt="MongoDB"/><p className="font-bold text-lg">MongoDB</p></div><MongoDBDataSource form={formInstance} /></div>);
            case 'StarRocks': return (<div><div className="flex justify-center items-center gap-2 mb-4"><img src={starrocks} className="w-14" alt="StarRocks"/><p className="font-bold text-lg">StarRocks</p></div><StarrocksDataSource form={formInstance} /></div>);
            case 'PostgreSQL': return (<div><div className="flex justify-center items-center gap-2 mb-4"><img src={pg} className="w-14" alt="PostgreSQL"/><p className="font-bold text-lg">PostgreSQL</p></div><PostgreSQLDataSource form={formInstance} /></div>);
        }
    };
    const filteredTypes = dataSourceTypes.filter(type => type.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const steps = [
        { title: 'Type selection', content: ( <div className="space-y-4"><div className="relative"><Input placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10 pl-3"/><div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pl-2 border-l border-gray-300 h-[60%]"><SearchOutlined className="text-gray-500" /></div></div><div className="flex flex-col divide-y divide-gray-200">{filteredTypes.map((type) => (<div key={type.name} onClick={() => { setSelectedType(type.name); setCurrentStep(1); }} className="flex items-center justify-between px-2 py-3 cursor-pointer hover:bg-gray-50 transition rounded"><div className="flex items-center space-x-3"><img src={dataSourceTypes.find(i=>i.name===type.name)?.image} alt={type.name} className="w-8 object-contain" /><span className="text-gray-800 font-medium">{type.name}</span></div><span className="text-gray-400 text-lg">&rsaquo;&rsaquo;</span></div>))}</div></div>) },
        { title: 'Setting', content: selectedType ? renderFormForType(selectedType, modalForm) : <p>No type selected</p>},
        { title: 'Done', content: (<div className="text-center py-8"><p className="text-lg">Data source created successfully!</p></div>)},
    ];

    return (
        <div>
            {!dataSource ? (
                <>
                    <button className="bg-blue-500 text-white p-2 cursor-pointer font-bold rounded text-sm" onClick={showModal}>
                        + New Data Source
                    </button>
                    <div className="flex flex-col justify-center items-center gap-2 mt-4 text-center">
                        <p>There are no data sources yet.</p>
                        <button onClick={showModal} className="text-blue-500 cursor-pointer">
                            Connect a Data Source
                        </button>
                    </div>
                </>
            ) : (
                <div className="max-w-2xl mx-auto p-4 border rounded-lg bg-white shadow-sm">
                    <Form form={form} layout="vertical" onFinish={handleSave}>
                        <h1 className="text-2xl font-bold mb-6">Edit Data Source</h1>
                        {Object.keys(dataSource).map((key) => {
                            if (key === 'type' || !FIELD_LABELS[key]) return null;

                            const isPassword = key === 'password';
                            const isBoolean = typeof dataSource[key] === 'boolean';

                            return (
                                <Form.Item
                                    key={key}
                                    name={key}
                                    label={FIELD_LABELS[key]}
                                    valuePropName={isBoolean ? 'checked' : 'value'}
                                >
                                    {isBoolean ? (
                                        <Checkbox />
                                    ) : isPassword ? (
                                        <Input.Password placeholder="Enter new password to change"/>
                                    ) : (
                                        <Input />
                                    )}
                                </Form.Item>
                            );
                        })}

                        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={showDeleteConfirm}
                            >
                                Delete
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </div>
            )}

            <Modal open={isModalOpen} onCancel={handleCancel} footer={null} width={600}>
                <div className="text-lg font-semibold text-gray-800 mb-2">Create Data Source</div><hr className="mb-4 border-gray-200 mt-3" /><div className="relative mb-8"><div className="flex justify-between items-center px-6 mb-8 relative">{steps.map((step, index) => (<div key={index} className="flex-1 flex flex-col items-center relative cursor-pointer" onClick={() => setCurrentStep(index)}><div className={`w-4 h-4 rounded-full z-10 ${currentStep >= index ? 'bg-blue-500' : 'bg-gray-300'}`} /><span className={`text-sm mt-2 ${currentStep >= index ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{step.title}</span>{index !== steps.length - 1 && (<div className={`absolute top-2 left-0 h-0.5 w-full z-0 ${currentStep > index ? 'bg-blue-500' : 'bg-gray-300'}`} style={{transform: 'translateX(50%)',zIndex: 0,}}/>)}</div>))}</div></div><div className="min-h-[200px]">{steps[currentStep].content}</div><div className="flex justify-end gap-3 mt-6">{currentStep > 0 && currentStep < steps.length - 1 ? (<Button onClick={() => setCurrentStep(0)}>Previous</Button>) : (currentStep === 0 && <Button onClick={handleCancel}>Cancel</Button>)}{currentStep === 1 && (<Button type="primary" onClick={handleCreateDataSource}>Create</Button>)}{currentStep === steps.length - 1 && (<Button type="primary" onClick={handleCancel}>Done</Button>)}</div>
            </Modal>
        </div>
    );
};

export default DataSource;