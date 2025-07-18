import { useState, useEffect, useRef } from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const menuItems = [
    { name: 'Data Sources', path: '/data_sources' },
    { name: 'Account', path: '/data_sources/users' },
    { name: 'Groups', path: '/data_sources/groups' },
    { name: 'Alert setting', path: '/data_sources/destinations' },
    { name: 'Report Snippet', path: '/data_sources/query_snippets' },
    { name: 'Organization Settings', path: '/data_sources/settings/general' },
    { name: 'Account Setting', path: '/data_sources/users/me' },
    { name: 'CSV Data Source', path: '/data_sources/upload/excel' },
    { name: 'API Key', path: '/data_sources/settings/OpenKey' },
];

const SettingMenu = () => {
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const [visibleItems, setVisibleItems] = useState<typeof menuItems>([]);
    const [hiddenItems, setHiddenItems] = useState<typeof menuItems>([]);


    // Calculate which items fit in the available space
    const calculateVisibleItems = () => {
        if (!menuRef.current) return;

        const container = menuRef.current;
        const containerWidth = container.offsetWidth;
        const moreButtonWidth = 48; // Approximate width of the more button
        let totalWidth = 0;
        const visible: typeof menuItems = [];
        const hidden: typeof menuItems = [];

        // Create a test element to measure item widths
        const testElement = document.createElement('div');
        testElement.style.position = 'absolute';
        testElement.style.visibility = 'hidden';
        testElement.style.whiteSpace = 'nowrap';
        document.body.appendChild(testElement);

        for (const item of menuItems) {
            testElement.textContent = item.name;
            const itemWidth = testElement.offsetWidth + 32; // Add padding

            if (totalWidth + itemWidth + (hidden.length ? moreButtonWidth : 0) <= containerWidth) {
                visible.push(item);
                totalWidth += itemWidth;
            } else {
                hidden.push(item);
            }
        }

        document.body.removeChild(testElement);
        setVisibleItems(visible);
        setHiddenItems(hidden);
        // setMenuWidth(containerWidth);
    };

    useEffect(() => {
        calculateVisibleItems();
        window.addEventListener('resize', calculateVisibleItems);
        return () => window.removeEventListener('resize', calculateVisibleItems);
    }, []);

    const dropdownItems = hiddenItems.map(item => ({
        key: item.path,
        label: (
            <Link to={item.path} className="block">
                {item.name}
            </Link>
        ),
    }));

    return (
        <div className="w-full px-4 py-6">
            <h2 className="font-bold text-3xl text-black mb-4">Setting</h2>

            <div className={`bg-white`}>
                <div ref={menuRef} className="flex items-center w-full">
                    <div className="flex-1 flex items-center overflow-hidden">
                        <Menu
                            mode="horizontal"
                            selectedKeys={[location.pathname]}
                            style={{flex: 1, minWidth: 0, borderBottom: 'none'}}
                            overflowedIndicator={null} // Hide AntD's built-in overflow indicator
                        >
                            {visibleItems.map(item => (
                                <Menu.Item key={item.path}>
                                    <Link to={item.path}>{item.name}</Link>
                                </Menu.Item>
                            ))}
                        </Menu>

                        {hiddenItems.length > 0 && (
                            <Dropdown menu={{items: dropdownItems}} trigger={['click', 'hover']}>
                                <Button
                                    type="text"
                                    icon={<EllipsisOutlined/>}
                                    style={{marginLeft: 8}}
                                    className="flex-shrink-0"
                                />
                            </Dropdown>
                        )}

                    </div>

                </div>
                <div className={`m-5 pb-10`}>
                    <Outlet/>
                </div>
            </div>

        </div>
    );
};

export default SettingMenu;