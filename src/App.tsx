import './App.css';
import {Link, NavLink, Outlet, useLocation} from 'react-router-dom';
import {
    FaChartLine,
    FaCog,
    FaDesktop,
    FaGlobe,
    FaQuestionCircle,
    FaTachometerAlt
} from 'react-icons/fa';
import {type JSX, useState} from 'react';
import logo from "@/assets/logo.png";
import {LuMessageCircleMore} from "react-icons/lu";

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
    path: string;
    label: string;
    icon: JSX.Element;
    statusDot?: boolean;
}

function App() {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const location = useLocation();

    const navItems: NavItem[] = [
        {
            label: 'Data Copilot',
            icon: <LuMessageCircleMore size={30}/>,
            subMenu: [
                { path: '/', label: 'Dialogue' },
                { path: '/copilot/history', label: 'History Dialogue' }
            ]
        },
        { path: '/query', label: 'Query Builder', icon: <FaChartLine size={30} /> },
        { path: '/dashboards', label: 'Dashboards', icon: <FaTachometerAlt size={30} /> },
        { path: '/autopilot', label: 'Data Autopilot', icon: <FaDesktop size={30} /> }
    ];

    const bottomItems: BottomItem[] = [
        { path: '/help', label: 'Help', icon: <FaQuestionCircle size={30}/> },
        { path: '/settings', label: 'Setting', icon: <FaCog size={30} /> },
        { path: '/pending', label: 'Pending', icon: <FaGlobe size={30} />, statusDot: true }
    ];

    const isSubMenuActive = (subMenu: SubMenuItem[]) =>
        subMenu.some((sub) => location.pathname === sub.path);

    return (
        <div style={{ display: 'flex' }}>
            <div
                className="sidebar"
                style={{
                    width: '100px',
                    backgroundColor: '#001428',
                    height: '100vh',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <div className="top">
                    <Link to={'/'} className={`w-full flex justify-center items-center mb-5`}>
                        <div
                            className="logo"
                            style={{textAlign: 'center', }}
                        >
                            <img src={logo} alt="logo" style={{width: '40px'}}/>
                        </div>
                    </Link>

                    {navItems.map((item, idx) => {
                        if (item.subMenu) {
                            const isActive = isSubMenuActive(item.subMenu);
                            return (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setShowSubMenu(true)}
                                    onMouseLeave={() => setShowSubMenu(false)}
                                    style={{
                                        position: 'relative',
                                        borderLeft: isActive ? '4px solid white' : '4px solid transparent',
                                        backgroundColor: isActive ? '#01213d' : 'transparent'
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '15px 10px',
                                            color: 'white',
                                            textDecoration: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {item.icon}
                                        <span style={{ fontSize: '11px', marginTop: 4, textAlign: 'center' }}>
                      {item.label}
                    </span>
                                    </div>

                                    {showSubMenu && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: '100%',
                                                backgroundColor: '#01213d',
                                                padding: '10px',
                                                zIndex: 10,
                                                minWidth: '150px'
                                            }}
                                        >
                                            {item.subMenu.map((sub, subIdx) => (
                                                <NavLink
                                                    key={subIdx}
                                                    to={sub.path}
                                                    style={({ isActive }) => ({
                                                        display: 'block',
                                                        padding: '10px',
                                                        color: 'white',
                                                        textDecoration: 'none',
                                                        fontSize: '13px',
                                                        backgroundColor: isActive ? '#023256' : 'transparent'
                                                    })}
                                                >
                                                    {sub.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path!}
                                className={({ isActive }) =>
                                    `flex flex-col items-center px-2 py-4 text-white text-sm no-underline ${
                                        isActive ? 'border-l-4 border-white bg-[#01213d]' : ''
                                    }`
                                }
                            >
                                {item.icon}
                                <span style={{ fontSize: '11px', marginTop: 4, textAlign: 'center' }}>
                  {item.label}
                </span>
                            </NavLink>
                        );
                    })}
                </div>

                <div className="bottom">
                    {bottomItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '15px 10px',
                                color: 'white',
                                textDecoration: 'none'
                            }}
                        >
                            {item.icon}
                            <span style={{ fontSize: '11px', marginTop: 4, textAlign: 'center' }}>
                {item.label}
              </span>
                            {item.statusDot && (
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        backgroundColor: 'yellow',
                                        marginTop: 4
                                    }}
                                />
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="main" style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
