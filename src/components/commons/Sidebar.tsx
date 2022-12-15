import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useNavigate} from "react-router-dom";

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
        getItem('Xem lịch chiếu', 'list-show'),
        getItem('Thêm mới ', 'add-show'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7ggrg'), getItem('Option 8', '8ghre')]),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 7', '7key'),
        getItem('Option 8', '8key'),
        getItem('Submenu', 'sub321', null, [getItem('Option 7', 'sub2sub1'), getItem('Option 8', 'sub2sub2')]),
    ]),

    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

function Sidebar() {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e: any) => {
        console.log(e.key)
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
};

export default Sidebar;
