import { useState } from 'react';
import 'antd/dist/reset.css';
import {
    Layout,
    Select,
    Input,
    Button,
    Space,
    Typography,
    Modal,
} from 'antd';
import {
    PlayCircleOutlined,
    SaveOutlined,
    PlusOutlined,
    DownOutlined,
    WarningOutlined,
    FormatPainterOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useNavigate } from 'react-router-dom';
import { FC, MouseEvent } from 'react';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const NewReport: FC = () => {
    const [query, setQuery] = useState<string>('');
    const [isExecuting, setIsExecuting] = useState<boolean>(false);
    const [siderWidth, setSiderWidth] = useState<number>(250);
    const [editorHeight, setEditorHeight] = useState<number>(300);

    const noDataSources = true;
    const navigate = useNavigate();

    const handleExecute = (): void => {
        setIsExecuting(true);
        setTimeout(() => {
            setIsExecuting(false);
        }, 2000);
    };

    const onSiderResize = (_: MouseEvent, { size }: ResizeCallbackData): void => {
        setSiderWidth(size.width);
    };

    const onEditorResize = (_: MouseEvent, { size }: ResizeCallbackData): void => {
        setEditorHeight(size.height);
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#F6F8FA' }}>
            <Header
                style={{
                    backgroundColor: '#FFF',
                    padding: '0 24px',
                    borderBottom: '1px solid #E8E8E8',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={3} style={{ margin: 0 }}>New Report</Title>
                    <Button type="text" icon={<PlusOutlined />} style={{ marginLeft: '16px', color: '#8C8C8C' }}>
                        Add tag
                    </Button>
                </div>
                <div />
            </Header>
            <Layout>
                <Resizable
                    width={siderWidth}
                    height={0}
                    onResize={onSiderResize}
                    handle={<div className="react-resizable-handle react-resizable-handle-e" />}
                    axis="x"
                    minConstraints={[200, 0]}
                    maxConstraints={[500, 0]}
                >
                    <Sider
                        width={siderWidth}
                        theme="light"
                        style={{
                            padding: '16px',
                            borderRight: '1px solid #D9D9D9',
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'calc(100vh - 64px)',
                            overflowY: 'auto'
                        }}
                    >
                        <Select
                            showSearch
                            placeholder="Choose data source..."
                            style={{ width: '100%', marginBottom: '16px' }}
                            disabled={noDataSources}
                            suffixIcon={<DownOutlined />}
                        >
                            {/* Options would be dynamically populated */}
                        </Select>
                        <div className="editor__left__schema" style={{ flex: 1 }}>
                            {/* Schema browser would go here */}
                        </div>
                    </Sider>
                </Resizable>
                <Content style={{ padding: '16px', overflow: 'hidden' }}>
                    <Modal
                        open={noDataSources}
                        closable={false}
                        maskClosable={false}
                        footer={null}
                        centered
                        width={600}
                    >
                        <div style={{ textAlign: 'center', padding: '32px 24px' }}>
                            <WarningOutlined style={{ fontSize: '48px', color: '#FAAD14', marginBottom: '24px' }} />
                            <Title level={5} style={{ marginBottom: '12px' }}>
                                Looks like no data sources were created yet or none of them available to the group(s) you're member of.
                            </Title>
                            <Text type="secondary" style={{ display: 'block', marginBottom: '32px' }}>
                                Please create one first, and then start querying.
                            </Text>
                            <Space size="middle">
                                <Button type="primary" onClick={() => navigate('/data_sources')}>Add Data Sources</Button>
                                <Button onClick={() => navigate('/data_sources/groups')}>Manage permissions</Button>
                            </Space>
                        </div>
                    </Modal>

                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Resizable
                            width={Infinity}
                            height={editorHeight}
                            onResize={onEditorResize}
                            handle={<div className="react-resizable-handle react-resizable-handle-s" />}
                            axis="y"
                            minConstraints={[100, Infinity]}
                            maxConstraints={[600, Infinity]}
                        >
                            <div
                                style={{
                                    height: editorHeight,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #D9D9D9',
                                    borderRadius: '4px',
                                    background: '#fff'
                                }}
                            >
                                <TextArea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder=""
                                    style={{
                                        flex: 1,
                                        border: 'none',
                                        boxShadow: 'none',
                                        resize: 'none',
                                        fontFamily: 'monospace',
                                        fontSize: '14px',
                                        padding: '8px',
                                        background: '#FFFFFF'
                                    }}
                                    disabled={noDataSources}
                                />
                                <div
                                    style={{
                                        padding: '8px 12px',
                                        borderTop: '1px solid #E8E8E8',
                                        background: '#FAFAFA',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Space>
                                        <Button disabled={noDataSources}>{"{{ }}"}</Button>
                                        <Button icon={<FormatPainterOutlined />} disabled={noDataSources} />
                                        <Button icon={<ThunderboltOutlined />} disabled={noDataSources} />
                                        <Button disabled={noDataSources}>LIMIT 1000</Button>
                                    </Space>
                                    <Space>
                                        <Button icon={<SaveOutlined />} disabled={noDataSources}>
                                            Save
                                        </Button>
                                        <Button
                                            type="primary"
                                            icon={<PlayCircleOutlined />}
                                            loading={isExecuting}
                                            onClick={handleExecute}
                                            disabled={noDataSources}
                                        >
                                            {isExecuting ? 'Executing' : 'Execute'}
                                        </Button>
                                    </Space>
                                </div>
                            </div>
                        </Resizable>
                        <div className="query-results-wrapper" style={{ flex: 1, marginTop: '16px', border: '1px solid #d9d9d9', borderRadius: '4px', background: '#fff', padding: '16px' }}>
                            <Text type="secondary">Query results will appear here.</Text>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default NewReport;
