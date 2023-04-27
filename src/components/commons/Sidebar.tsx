import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Quản lý suất chiếu', 'sub1', <AppstoreOutlined />, [
        getItem('Lịch chiếu - Kiểu calendar', 'list-show'),
        getItem('Lịch chiếu - Kiểu danh sách', 'list-show-2'),
        getItem('Thêm mới ', 'add-show'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7ggrg'), getItem('Option 8', '8ghre')]),
    ]),

    getItem('Quản lý phim', 'sub2', <AppstoreOutlined />, [
        getItem('Thêm mới phim', 'add-movie'),
        getItem('Danh sách phim', 'list-movie'),
        getItem('Submenu', 'sub321', null, [getItem('Option 7', 'sub2sub1'), getItem('Option 8', 'sub2sub2')]),
    ]),

    getItem('Quản lý phòng chiếu', 'sub3214', <AppstoreOutlined />, [
        getItem('Thêm mới phòng chiếu', 'add-room'),
        getItem('Danh sách phòng chiếu', 'list-room'),
    ]),
];

function Sidebar() {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e: any) => {
        console.log(e.key);
        navigate(`/admin/${e.key}`);
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
}

export default Sidebar;
