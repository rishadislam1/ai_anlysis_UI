import { useState } from 'react';
import { Switch, Typography, Space } from 'antd';

const { Text } = Typography;

const OutDatedReport = () => {
    const [autoUpdate, setAutoUpdate] = useState(true);

    const handleAutoUpdateChange = (checked: boolean | ((prevState: boolean) => boolean)) => {
        setAutoUpdate(checked);
    };

    return (
        <div style={{
            padding: '24px',
            backgroundColor: '#fff',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {/* Top section with Switch and last updated text */}
            <div>
                <Space align="center">
                    <Text>Auto Update</Text>
                    <Switch checked={autoUpdate} onChange={handleAutoUpdateChange} />
                </Space>
                <div style={{ marginTop: '8px' }}>
                    <Text type="secondary">Last updated: a few seconds ago</Text>
                </div>
            </div>

            {/* Center message */}
            <div style={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text type="secondary">There are no outdated queries.</Text>
            </div>
        </div>
    );
};

export default OutDatedReport;
