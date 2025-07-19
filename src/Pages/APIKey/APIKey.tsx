import { useState } from 'react';
import { Radio, Space, Divider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import OpenAi from "@/Components/APIComponent/OpenAI.tsx";
import DeepInSight from "@/Components/APIComponent/DeepInSight.tsx";
import DeepSeek from "@/Components/APIComponent/DeepSeek.tsx";
import AwsCloud from "@/Components/APIComponent/AWSCloud.tsx";
import AIBailian from "@/Components/APIComponent/AIBailian.tsx";
import BaiduQuian from "@/Components/APIComponent/BaiduQuian.tsx";
import Azure from "@/Components/APIComponent/Azure.tsx";



// --- Main ApiKey Component ---

const ApiKey = () => {
    // State to manage the currently selected AI service
    const [selectedService, setSelectedService] = useState('OpenAI');

    // Handler for when the radio button selection changes
    const handleServiceChange = (e: RadioChangeEvent) => {
        setSelectedService(e.target.value);
    };

    // A map to render the correct form based on the selected service
    const renderServiceForm = () => {
        switch (selectedService) {
            case 'OpenAI':
                return <OpenAi/>;
            case 'DeepInsight':
                return <DeepInSight />;
            case 'Deepseek':
                return <DeepSeek />;
            case 'AWSClaude':
                return <AwsCloud />;
            case 'AIBailian':
                return <AIBailian />;
            case 'BaiduQianFan':
                return <BaiduQuian />;
            case 'Azure':
                return <Azure />;
            default:
                return <p>Please select a service.</p>;
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '780px', margin: 'auto' }}>
            <Space align="center" style={{ marginBottom: '16px' }}>
                <span style={{ fontWeight: 'bold' }}>AI:</span>
                <Radio.Group onChange={handleServiceChange} value={selectedService}>
                    <Radio value="OpenAI">OpenAI</Radio>
                    <Radio value="DeepInsight">DeepInsight</Radio>
                    <Radio value="Deepseek">Deepseek</Radio>
                    <Radio value="AWSClaude">AWSClaude</Radio>
                    <Radio value="AIBailian">AIBailian</Radio>
                    <Radio value="BaiduQianFan">BaiduQianFan</Radio>
                    <Radio value="Azure">Azure</Radio>
                </Radio.Group>
            </Space>

            <Divider />

            {/* Render the selected form */}
            <div style={{ marginTop: '24px' }}>
                {renderServiceForm()}
            </div>
        </div>
    );
};



export default ApiKey;