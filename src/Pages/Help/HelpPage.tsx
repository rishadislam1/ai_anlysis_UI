import React from 'react';
import img_0 from '@/assets/images/help/img.png';
import img_1 from '@/assets/images/help/img_1.png';
import img_2 from '@/assets/images/help/img_2.png';
import img_3 from '@/assets/images/help/img_3.png';
import img_4 from '@/assets/images/help/img_4.png';
import img_5 from '@/assets/images/help/img_5.png';
import img_6 from '@/assets/images/help/img_6.png';
import img_7 from '@/assets/images/help/img_7.png';
import img_8 from '@/assets/images/help/img_8.png';
import img_9 from '@/assets/images/help/img_9.png';
import img_10 from '@/assets/images/help/img_10.png';
import img_11 from '@/assets/images/help/img_11.png';
import img_12 from '@/assets/images/help/img_12.png';
import img_13 from '@/assets/images/help/img_13.png';
import img_14 from '@/assets/images/help/img_14.png';
import img_15 from '@/assets/images/help/img_15.png';
import img_16 from '@/assets/images/help/img_16.png';
import img_17 from '@/assets/images/help/img_17.png';
import img_18 from '@/assets/images/help/img_18.png';
import img_19 from '@/assets/images/help/img_19.png';
import img_20 from '@/assets/images/help/img_20.png';
import img_21 from '@/assets/images/help/img_21.png';
import img_22 from '@/assets/images/help/img_22.png';
import img_22_1 from '@/assets/images/help/img_23.png';
import img_22_2 from '@/assets/images/help/img_24.png';
import img_22_3 from '@/assets/images/help/img_25.png';
import img_22_4 from '@/assets/images/help/img_26.png';
import img_22_5 from '@/assets/images/help/img_27.png';
import img_22_6 from '@/assets/images/help/img_28.png';
import img_22_7 from '@/assets/images/help/img_29.png';
import img_23 from '@/assets/images/help/img_30.png';
import img_25 from '@/assets/images/help/img_31.png';
import img_26 from '@/assets/images/help/img_32.png';
import img_27 from '@/assets/images/help/img_33.png';
import img_28 from '@/assets/images/help/img_34.png';
import img_29 from '@/assets/images/help/img_35.png';
import us_key from '@/assets/images/help/img_36.png';

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
                        <p><img src={img_0} alt="img_0.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>1.3 About DeepInsight API KEY</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>You can click the connection below the set key to register and get the API Key.(You can add our wechat group (contact us on the home page) to apply for a free Token.)</li>
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
                        <p><img src={img_1} alt="img_1.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>2.2 [MySql, Doris, starRocks, PostgreSql] data source configure</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>[Setting]-[Data Sources]-[New Data Source]</li>
                            <li className='text-sm text-gray-600'>Select the data source, fill in the database information, and save. After the configuration is completed, click [Test Connection ] and "Connection Success" will be displayed.</li>
                        </ul>
                        <p><img src={img_2} alt="img_2.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <p><img src={img_3} alt="img_3.png" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', borderRadius: '5px' }} /></p>
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
                        <p><img src={img_4} alt="img_4.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.3 Modify the failed comments and submit again</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>AI will feedback the comments that have not passed. Please revise and add them and submit again until all the comments pass.</li>
                        </ul>
                        <p><img src={img_5} alt="img_5.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.4 After all annotations pass the detection, start the conversation</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>🔥 Note: If you want to generate a persistent report, please use [Query Builder]-[Report Generation]. The reports that appear in [Chat Builder] are temporary reports and do not support persistence.</li>
                        </ul>
                        <p><img src={img_6} alt="img_6.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>3.1.5 Reselect data source</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>If you want to reselect the data source and start a new round of dialogue, please click [New Dialogue] to reset the current conversation. The current conversation record will be stored in [History Dialogue].</li>
                        </ul>
                        <p><img src={img_7} alt="img_7.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>3.2 [Chat Builder] - [History Dialogue]</h2>
                        <p className='text-sm text-gray-600'>Can view historical conversation records</p>
                        <p><img src={img_8} alt="img_8.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
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
                        <p><img src={img_9} alt="img_9.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.3 Modify the failed comments and submit again</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>AI will feedback the annotations that have failed. Please revise and add them and submit again until all annotations pass the test.</li>
                        </ul>
                        <p><img src={img_10} alt="img_10.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.4 After all annotations pass the detection, start the dialogue to generate reports</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Edit Report] to directly edit the newly generated report.</li>
                            <li className='text-sm text-gray-600'>🔥 Note: The [Report Generation] module currently only supports persistent report generation tasks. For analysis questions, please use [Chat Builder] - [Dialogue].</li>
                        </ul>
                        <p><img src={img_11} alt="img_11.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.1.5 Reselect data source</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>If you want to reselect the data source and start a new round of dialogue, please click [New Dialogue] to reset the current dialogue.</li>
                        </ul>
                        <p><img src={img_12} alt="img_12.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-xl font-semibold text-gray-700'>4.2 [Query]-[Report List]</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.1 Report status</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>The newly generated report in [Report Generation] will appear in the [Report List]. At this time, the report is in draft status. If you want to display the report in the [Dashboards], please click the [Publish] button, change report status to published status.</li>
                        </ul>
                        <p><img src={img_13} alt="img_13.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <p><img src={img_14} alt="img_14.png" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.2 Modify SQL statement</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Edit Source] to customize the SQL statement of the report.</li>
                        </ul>
                        <p><img src={img_15} alt="img_15.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.3 Modify chart style</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Edit Visualization] to customize and edit the visualization chart style.</li>
                            <li className='text-sm text-gray-600'>Click [Add Visualization] to add a visual chart.</li>
                        </ul>
                        <p><img src={img_16} alt="img_16.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <p><img src={img_17} alt="img_17.png" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>4.2.4 Deleting a report</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Archive] to change the report status to archive (delete) status.</li>
                        </ul>
                        <p><img src={img_18} alt="img_18.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>5. Dashboards</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>5.1 Create a new dashboard</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>[Dashboards]-[Create]-Edit Dashboard</li>
                        </ul>
                        <p><img src={img_19} alt="img_19.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Add the newly generated Published report to the dashboard</li>
                        </ul>
                        <p><img src={img_20} alt="img_20.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click [Publish] Dashboard</li>
                        </ul>
                        <p><img src={img_21} alt="img_21.png" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>5.1.2 Share Dashboard</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>After clicking [Publish], you can share the dashboard</li>
                        </ul>
                        <p><img src={img_22} alt="img_22.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>5.2 Dashboards Prettify</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Select an existing dashboard</li>
                            <li><img src={img_22_1} alt="img_22_1.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></li>
                            <li className='text-sm text-gray-600'>Click to enter</li>
                            <li><img src={img_22_2} alt="img_22_2.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></li>
                            <li className='text-sm text-gray-600'>Select the template and click Apply</li>
                            <li><img src={img_22_3} alt="img_22_3.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></li>
                            <li className='text-sm text-gray-600'>Enter the beautification screen and wait for the AI automatic conversion to complete</li>
                            <li><img src={img_22_4} alt="img_22_4.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></li>
                            <li><img src={img_22_5} alt="img_22_5.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></li>
                            <li className='text-sm text-gray-600'>Conversion complete</li>
                            <li><img src={img_22_6} alt="img_22_6.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></li>
                            <li className='text-sm text-gray-600'>Click to view large screen</li>
                            <li><img src={img_22_7} alt="img_22_7.png" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', borderRadius: '5px' }} /></li>
                        </ul>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-2xl font-semibold text-gray-700'>6. Automatic Data Analysis</h2>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>6.1 Add Analysis Task</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Click on Automatic Data Analysis.</li>
                            <li className='text-sm text-gray-600'>Choose Automatic Data Analysis.</li>
                            <li className='text-sm text-gray-600'>Click on the dropdown.</li>
                            <li className='text-sm text-gray-600'>Select the data source.</li>
                        </ul>
                        <p><img src={img_23} alt="img_23.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>6.2 Confirm Required Tables for the Report</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>Select table remarks and field information.</li>
                            <li className='text-sm text-gray-600'>Choose the tables to be used in the report; multiple tables can be selected.</li>
                            <li className='text-sm text-gray-600'>Provide remarks for table fields.</li>
                            <li className='text-sm text-gray-600'>Submit.</li>
                        </ul>
                        <p><img src={img_25} alt="img_25.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} /></p>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <h2 className='text-lg font-semibold text-gray-700'>6.3 Wait for Report Completion</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                            <li className='text-sm text-gray-600'>In historical analysis, check the report status.</li>
                        </ul>
                        <p><img src={img_26} alt="img_26.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} />2. Automatically changes to generating.</p>
                        <p><img src={img_27} alt="img_27.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} />3. When the status changes to successful.</p>
                        <p><img src={img_28} alt="img_28.png" style={{ maxWidth: '100%', height: 'auto', marginBlock: '10px', borderRadius: '5px' }} />4. View the report details.</p>
                        <p><img src={img_29} alt="img_29.png" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', borderRadius: '5px' }} /></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;