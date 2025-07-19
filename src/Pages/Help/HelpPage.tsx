import React from 'react';
import doc_0 from '@/assets/images/help/doc_0.png';
import doc_1 from '@/assets/images/help/doc_1.png';
import doc_2 from '@/assets/images/help/doc_2.png';
import doc_3 from '@/assets/images/help/doc_3.png';
import doc_4 from '@/assets/images/help/doc_4.png';
import doc_5 from '@/assets/images/help/doc_5.png';
import doc_6 from '@/assets/images/help/doc_6.png';
import doc_7 from '@/assets/images/help/doc_7.png';
import doc_8 from '@/assets/images/help/doc_8.png';
import doc_9 from '@/assets/images/help/doc_9.png';
import doc_10 from '@/assets/images/help/doc_10.png';
import doc_11 from '@/assets/images/help/doc_11.png';
import doc_12 from '@/assets/images/help/doc_12.png';
import doc_13 from '@/assets/images/help/doc_13.png';
import doc_14 from '@/assets/images/help/doc_14.png';
import doc_15 from '@/assets/images/help/doc_15.png';
import doc_16 from '@/assets/images/help/doc_16.png';
import doc_17 from '@/assets/images/help/doc_17.png';
import doc_18 from '@/assets/images/help/doc_18.png';
import doc_19 from '@/assets/images/help/doc_19.png';
import doc_20 from '@/assets/images/help/doc_20.png';
import doc_21 from '@/assets/images/help/doc_21.png';
import doc_22 from '@/assets/images/help/doc_22.png';
import doc_22_1 from '@/assets/images/help/doc_22_1.png';
import doc_22_2 from '@/assets/images/help/doc_22_2.png';
import doc_22_3 from '@/assets/images/help/doc_22_3.png';
import doc_22_4 from '@/assets/images/help/doc_22_4.png';
import doc_22_5 from '@/assets/images/help/doc_22_5.png';
import doc_22_6 from '@/assets/images/help/doc_22_6.png';
import doc_22_7 from '@/assets/images/help/doc_22_7.png';
import doc_23 from '@/assets/images/help/doc_23.png';
import doc_25 from '@/assets/images/help/doc_25.png';
import doc_26 from '@/assets/images/help/doc_26.png';
import doc_27 from '@/assets/images/help/doc_27.png';
import doc_28 from '@/assets/images/help/doc_28.png';
import doc_29 from '@/assets/images/help/doc_29.png';
import us_key from '@/assets/images/help/us_key.png';

const HelpPage: React.FC = () => {
    return (
        <div style={{ height: '95vh', overflowY: 'auto', backgroundColor: '#f4f7fa' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 className='text-4xl font-bold text-gray-800'>DeepBI User Manual</h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>1. Configure API KEY</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>[Setting]-[API KEY]</li>
                        </ul>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>1.1 About OPENAI API KEY</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Requires access to gpt4 models.</li>
                            <li className='text-sm text-gray-600'>Other large models will be supported in the future, so stay tuned.</li>
                        </ul>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>1.2 About the proxy</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>OPENAI API access may require proxy configuration, please configure the proxy yourself.</li>
                            <li className='text-sm text-gray-600'>After the KEY and proxy are configured, click [Connection Test] and "Test success" will be displayed. If the test fails, please check whether the API KEY is available and whether the proxy is configured correctly.</li>
                        </ul>
                        <p><img src={doc_0} alt="doc_0.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>1.3 About DeepInsight API KEY</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>You can click the connection below the set key to register and get the API Key. (You can add our wechat group (contact us on the home page) to apply for a free Token.)</li>
                        </ul>
                        <p><img src={us_key} alt="us_key.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>2. Configure Data Source</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Currently supported data sources are MySql, Doris, starRocks, PostgreSql, and CSV. More data sources will be supported in the future, such as sqlserver, clickhouse, SQLite, etc., so stay tuned.</li>
                        </ul>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>2.1 CSV data source configure</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>[Setting]-[CSV Data Source]-[Click to upload]-select the csv file to be uploaded</li>
                        </ul>
                        <p><img src={doc_1} alt="doc_1.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>2.2 [MySql, Doris, starRocks, PostgreSql] data source configure</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>[Setting]-[Data Sources]-[New Data Source]</li>
                            <li className='text-sm text-gray-600'>Select the data source, fill in the database information, and save. After the configuration is completed, click [Test Connection ] and "Connection Success" will be displayed.</li>
                        </ul>
                        <p><img src={doc_2} alt="doc_2.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <p><img src={doc_3} alt="doc_3.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>3. Chat Builder</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>3.1 [Chat Builder] - [Dialogue]</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.1 Check the data (data source and table)</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>The checked data will be used as the basic data for AI in conversation data analysis.</li>
                        </ul>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.2 Fill in the comments and submit for AI detection</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Try to improve the form and field annotations as much as possible to help AI better understand the data and enable the Agent to better complete the data analysis task.</li>
                        </ul>
                        <p><img src={doc_4} alt="doc_4.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.3 Modify the failed comments and submit again</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>AI will feedback the comments that have not passed. Please revise and add them and submit again until all the comments pass.</li>
                        </ul>
                        <p><img src={doc_5} alt="doc_5.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.4 After all annotations pass the detection, start the conversation</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>🔥 Note: If you want to generate a persistent report, please use [Query Builder]-[Report Generation]. The reports that appear in [Chat Builder] are temporary reports and do not support persistence.</li>
                        </ul>
                        <p><img src={doc_6} alt="doc_6.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.5 Reselect data source</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>If you want to reselect the data source and start a new round of dialogue, please click [New Dialogue] to reset the current conversation. The current conversation record will be stored in [History Dialogue].</li>
                        </ul>
                        <p><img src={doc_7} alt="doc_7.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>3.2 [Chat Builder] - [History Dialogue]</h2>
                        <p className='text-sm text-gray-600'>Can view historical conversation records</p>
                        <p><img src={doc_8} alt="doc_8.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>4. Query Builder</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>4.1 [Query Builder]-[Report Generation]</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.1 Check the data (data source and table)</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>The checked data will be used as the basic data of AI in report generation.</li>
                            <li className='text-sm text-gray-600'>🔥Note: Currently the CSV data source does not support [Report Generation]</li>
                        </ul>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.2 Fill in the comments and submit for AI detection</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Try to improve the form and field annotations as much as possible to help AI better understand the data and enable the Agent to better complete the report generation task.</li>
                        </ul>
                        <p><img src={doc_9} alt="doc_9.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.3 Modify the failed comments and submit again</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>AI will feedback the annotations that have failed. Please revise and add them and submit again until all annotations pass the test.</li>
                        </ul>
                        <p><img src={doc_10} alt="doc_10.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.4 After all annotations pass the detection, start the dialogue to generate reports</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Edit Report] to directly edit the newly generated report.</li>
                            <li className='text-sm text-gray-600'>🔥 Note: The [Report Generation] module currently only supports persistent report generation tasks. For analysis questions, please use [Chat Builder] - [Dialogue].</li>
                        </ul>
                        <p><img src={doc_11} alt="doc_11.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.5 Reselect data source</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>If you want to reselect the data source and start a new round of dialogue, please click [New Dialogue] to reset the current dialogue.</li>
                        </ul>
                        <p><img src={doc_12} alt="doc_12.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>4.2 [Query]-[Report List]</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.1 Report status</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>The newly generated report in [Report Generation] will appear in the [Report List]. At this time, the report is in draft status. If you want to display the report in the [Dashboards], please click the [Publish] button, change report status to published status.</li>
                        </ul>
                        <p><img src={doc_13} alt="doc_13.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <p><img src={doc_14} alt="doc_14.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.2 Modify SQL statement</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Edit Source] to customize the SQL statement of the report.</li>
                        </ul>
                        <p><img src={doc_15} alt="doc_15.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.3 Modify chart style</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Edit Visualization] to customize and edit the visualization chart style.</li>
                            <li className='text-sm text-gray-600'>Click [Add Visualization] to add a visual chart.</li>
                        </ul>
                        <p><img src={doc_16} alt="doc_16.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <p><img src={doc_17} alt="doc_17.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.4 Deleting a report</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Archive] to change the report status to archive (delete) status.</li>
                        </ul>
                        <p><img src={doc_18} alt="doc_18.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>5. Dashboards</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>5.1 Create a new dashboard</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>[Dashboards]-[Create]-Edit Dashboard</li>
                        </ul>
                        <p><img src={doc_19} alt="doc_19.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Add the newly generated Published report to the dashboard</li>
                        </ul>
                        <p><img src={doc_20} alt="doc_20.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Publish] Dashboard</li>
                        </ul>
                        <p><img src={doc_21} alt="doc_21.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>5.1.2 Share Dashboard</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>After clicking [Publish], you can share the dashboard</li>
                        </ul>
                        <p><img src={doc_22} alt="doc_22.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>5.2 Dashboards Prettify</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Select an existing dashboard</li>
                            <p><img src={doc_22_1} alt="doc_22_1.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                            <li className='text-sm text-gray-600'>Click to enter</li>
                            <p><img src={doc_22_2} alt="doc_22_2.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                            <li className='text-sm text-gray-600'>Select the template and click Apply</li>
                            <p><img src={doc_22_3} alt="doc_22_3.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                            <li className='text-sm text-gray-600'>Enter the beautification screen and wait for the AI automatic conversion to complete</li>
                            <p><img src={doc_22_4} alt="doc_22_4.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                            <p><img src={doc_22_5} alt="doc_22_5.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                            <li className='text-sm text-gray-600'>Conversion complete</li>
                            <p><img src={doc_22_6} alt="doc_22_6.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                            <li className='text-sm text-gray-600'>Click to view large screen</li>
                            <p><img src={doc_22_7} alt="doc_22_7.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        </ul>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>6. Automatic Data Analysis</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>6.1 Add Analysis Task</h2>
                        <ol style={{ paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click on Automatic Data Analysis.</li>
                            <li className='text-sm text-gray-600'>Choose Automatic Data Analysis.</li>
                            <li className='text-sm text-gray-600'>Click on the dropdown.</li>
                            <li className='text-sm text-gray-600'>Select the data source.</li>
                        </ol>
                        <p><img src={doc_23} alt="doc_23.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>6.2 Confirm Required Tables for the Report</h2>
                        <ol style={{ paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Select table remarks and field information.</li>
                            <li className='text-sm text-gray-600'>Choose the tables to be used in the report; multiple tables can be selected.</li>
                            <li className='text-sm text-gray-600'>Provide remarks for table fields.</li>
                            <li className='text-sm text-gray-600'>Submit.</li>
                        </ol>
                        <p><img src={doc_25} alt="doc_25.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>6.3 Wait for Report Completion</h2>
                        <ol style={{ paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>In historical analysis, check the report status.</li>
                        </ol>
                        <p><img src={doc_26} alt="doc_26.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} />2. Automatically changes to generating.</p>
                        <p><img src={doc_27} alt="doc_27.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} />3. When the status changes to successful.</p>
                        <p><img src={doc_28} alt="doc_28.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} />4. View the report details.</p>
                        <p><img src={doc_29} alt="doc_29.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;