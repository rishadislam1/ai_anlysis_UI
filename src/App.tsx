import './App.css';
import {
    Link,
    NavLink,
    Outlet,
    useLocation,
} from 'react-router-dom';
import {
    FaChartLine,
    FaCog,
    FaDesktop,
    FaGlobe,
    FaQuestionCircle,
    FaTachometerAlt,
} from 'react-icons/fa';
import { type JSX, useState, useEffect } from 'react';
import { Drawer } from 'antd'; // Import Drawer from antd
import logo from '@/assets/images/logo.png';
import { LuMessageCircleMore } from 'react-icons/lu';
import HelpPage from "@/Pages/Help/HelpPage.tsx";

interface SubMenuItem {
    path: string;
    label: string;
}

interface NavItem {
    label: string;
    icon: JSX.Element;
    path?: string;
    subMenu?: SubMenuItem[];
}

interface BottomItem {
    path?: string;
    label: string;
    icon: JSX.Element;
    statusDot?: boolean;
    subMenu?: SubMenuItem[];
}



function App() {
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [isMobileSidebarVisible, setMobileSidebarVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isHelpDrawerVisible, setHelpDrawerVisible] = useState(false); // State for drawer

    const location = useLocation();

    // Handlers for the help drawer
    const showHelpDrawer = () => {
        setHelpDrawerVisible(true);
    };

    const closeHelpDrawer = () => {
        setHelpDrawerVisible(false);
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setMobileSidebarVisible(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Close mobile sidebar on route change
        setMobileSidebarVisible(false);
    }, [location.pathname]);

    const navItems: NavItem[] = [
        {
            label: 'Data Copilot',
            icon: <LuMessageCircleMore size={30} />,
            subMenu: [
                { path: '/', label: 'Dialogue' },
                { path: '/copilot/history', label: 'History Dialogue' },
            ],
        },
        {
            label: 'Query Builder',
            icon: <FaChartLine size={30} />,
            subMenu: [
                { path: '/report-route', label: 'Report Generation' },
                { path: '/queries', label: 'Report List' },
            ],
        },
        {
            label: 'Dashboards',
            icon: <FaTachometerAlt size={30} />,
            subMenu: [
                { path: '/dashboards', label: 'Dashboards' },
                { path: '/dashboards_prettify', label: 'Dashboards Prettify' },
            ],
        },
        {
            label: 'Data Autopilot',
            icon: <FaDesktop size={30} />,
            subMenu: [
                { path: '/autopilot', label: 'Data Autopilot' },
                { path: '/autopilot_list', label: 'History Autopilot' },
            ],
        },
    ];

    const bottomItems: BottomItem[] = [
        // STEP 1: Remove 'path' from the Help item
        { label: 'Help', icon: <FaQuestionCircle size={30} /> },
        { path: '/data_sources', label: 'Setting', icon: <FaCog size={30} /> },
        {
            label: 'Pending',
            icon: <FaGlobe size={30} />,
            statusDot: true,
            subMenu: [
                { path: '/data_sources/users/me', label: 'Account Setting' },
                { path: '/admin/status', label: 'System Status' },
                { path: '/logout', label: 'Logout' },
                { path: '', label: 'Version: 2.0.3 (dev)' },
            ],
        },
    ];

    const isSubMenuActive = (subMenu: SubMenuItem[]) =>
        subMenu.some((sub) => location.pathname === sub.path);

    const handleSubMenuToggle = (label: string) => {
        setActiveSubMenu(activeSubMenu === label ? null : label);
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    onClick={() => setMobileSidebarVisible(!isMobileSidebarVisible)}
                    style={{
                        position: 'fixed',
                        top: 20,
                        left: 20,
                        zIndex: 1100,
                        background: '#001428',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                    }}
                >
                    ☰
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`sidebar ${
                    isMobile
                        ? isMobileSidebarVisible
                            ? 'mobile-visible'
                            : 'mobile-hidden'
                        : ''
                }`}
                style={{
                    width: '100px',
                    backgroundColor: '#001428',
                    height: '100vh',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    transition: 'transform 0.3s ease',
                    zIndex: 1000,
                }}
            >
                <div className="top mt-6">
                    <Link
                        to="/"
                        className="w-full flex justify-center items-center mb-5"
                        aria-label="Home"
                    >
                        <div className="logo" style={{ textAlign: 'center' }}>
                            <img src={logo} alt="Logo" style={{ width: '40px' }} />
                        </div>
                    </Link>

                    {navItems.map((item) => {
                        const isActive = item.subMenu
                            ? isSubMenuActive(item.subMenu)
                            : location.pathname === item.path;
                        return (
                            <div
                                key={item.label}
                                onMouseEnter={() => handleSubMenuToggle(item.label)}
                                onMouseLeave={() => handleSubMenuToggle(item.label)}
                                style={{
                                    position: 'relative',
                                    borderLeft: isActive
                                        ? '4px solid white'
                                        : '4px solid transparent',
                                    backgroundColor: isActive ? '#01213d' : 'transparent',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '15px 10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSubMenuToggle(item.label)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSubMenuToggle(item.label)
                                    }
                                >
                                    {item.icon}
                                    <span
                                        style={{
                                            fontSize: '11px',
                                            marginTop: 4,
                                            textAlign: 'center',
                                        }}
                                    >
                    {item.label}
                  </span>
                                </div>

                                {item.subMenu && activeSubMenu === item.label && (
                                    <div
                                        className="submenu"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: '100%',
                                            backgroundColor: '#01213d',
                                            padding: '10px',
                                            zIndex: 10,
                                            minWidth: '150px',
                                        }}
                                    >
                                        {item.subMenu.map((sub) => (
                                            <NavLink
                                                key={sub.path}
                                                to={sub.path}
                                                style={({ isActive }) => ({
                                                    display: 'block',
                                                    padding: '10px',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    fontSize: '13px',
                                                    backgroundColor: isActive
                                                        ? '#023256'
                                                        : 'transparent',
                                                })}
                                            >
                                                {sub.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="bottom">
                    {bottomItems.map((item) => {
                        const isActive = item.subMenu
                            ? isSubMenuActive(item.subMenu)
                            : location.pathname === item.path;

                        // STEP 2: Conditionally render a div for Help and a Link for others
                        const commonContent = (
                            <>
                                {item.icon}
                                <span
                                    style={{
                                        fontSize: '11px',
                                        marginTop: 4,
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.label}
                                </span>
                                {item.statusDot && (
                                    <span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: 'yellow',
                                            marginTop: 4,
                                        }}
                                    />
                                )}
                            </>
                        );

                        const commonWrapperStyle = {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '15px 10px',
                            color: 'white',
                            textDecoration: 'none',
                            cursor: 'pointer',
                        };

                        return (
                            <div
                                key={item.label}
                                onMouseEnter={() => item.subMenu && handleSubMenuToggle(item.label)}
                                onMouseLeave={() => item.subMenu && handleSubMenuToggle(item.label)}
                                style={{
                                    position: 'relative',
                                    borderLeft: isActive
                                        ? '4px solid white'
                                        : '4px solid transparent',
                                    backgroundColor: isActive ? '#01213d' : 'transparent',
                                }}
                            >
                                {item.label === 'Help' ? (
                                    <div
                                        style={commonWrapperStyle}
                                        onClick={showHelpDrawer}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && showHelpDrawer()}
                                    >
                                        {commonContent}
                                    </div>
                                ) : (
                                    <Link
                                        to={`${item.path || '#'}`}
                                        style={{
                                            ...commonWrapperStyle,
                                            cursor: item.subMenu || item.path ? 'pointer' : 'default',
                                        }}
                                        onClick={() => item.subMenu && handleSubMenuToggle(item.label)}
                                    >
                                        {commonContent}
                                    </Link>
                                )}

                                {item.subMenu && activeSubMenu === item.label && (
                                    <div
                                        className="submenu"
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '100%',
                                            backgroundColor: '#01213d',
                                            padding: '10px',
                                            zIndex: 10,
                                            minWidth: '150px',
                                        }}
                                    >
                                        {item.subMenu.map((sub) => (
                                            <NavLink
                                                key={sub.path || sub.label}
                                                to={sub.path}
                                                style={({ isActive }) => ({
                                                    display: 'block',
                                                    padding: '10px',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    fontSize: '13px',
                                                    backgroundColor:
                                                        isActive && sub.path
                                                            ? '#023256'
                                                            : 'transparent',
                                                    cursor: sub.path ? 'pointer' : 'default',
                                                })}
                                                onClick={
                                                    sub.path ? undefined : (e) => e.preventDefault()
                                                }
                                            >
                                                {sub.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* STEP 3: Add the Drawer component */}
            <Drawer

                placement="right"
                onClose={closeHelpDrawer}
                open={isHelpDrawerVisible}
                width={'50%'}
            >
                <HelpPage/>
            </Drawer>

            {/* Main Content */}
            <div
                className="main"
                style={{
                    flex: 1,
                    padding: '20px',
                    marginLeft: isMobile ? 0 : '100px',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default App;