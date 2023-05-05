import React from 'react';
import { AppstoreOutlined, ExportOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';

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
    ]),

    getItem('Quản lý phim', 'list-movie', <AppstoreOutlined />),

    getItem('Quản lý phòng chiếu', 'list-room', <AppstoreOutlined />),

    getItem('Quản lý đánh giá', 'rate', <AppstoreOutlined />),
    getItem('Quản lý thể loại', 'category', <AppstoreOutlined />),
    getItem('Quản lý user', 'user', <AppstoreOutlined />),
    getItem('Thống kê', 'static', <AppstoreOutlined />),
];

function Sidebar() {
    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e: any) => {
        console.log(e.key);
        navigate(`/admin/${e.key}`);
    };

    return (
        <div className="menu-side-bar">
            <Menu
                onClick={onClick}
                style={{ width: 256, height: '100vh' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                theme="dark"
            />
            <div className="logout">
                <span className="d-inline-block text-light">
                    <ExportOutlined />
                    <span className="d-inline-block">Logout</span>
                </span>
            </div>
        </div>
    );
}

export default Sidebar;
