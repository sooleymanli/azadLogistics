import React from 'react';
import { Layout, Avatar, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import logo from '@/assets/images/logo.png';

const { Header } = Layout;

interface HeaderContentProps {
    user: { given_name: string } | null;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ user }) => {
    const navigate = useNavigate();

    const userInitials = user?.given_name
        ? user.given_name.split(' ').map((name) => name[0]).join('').toUpperCase()
        : 'U';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    };

    const items: MenuProps['items'] = [
        {
            key: 'calculator',
            label: 'Kalkulyatora keçid',
            onClick: () => navigate('/'),
        },
        {
            key: 'logout',
            danger: true,
            label: 'Çıxış',
            onClick: handleLogout,
        },
    ];

    return (
        <Header
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                padding: '0 24px',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ height: '32px', marginRight: '10px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="hidden lg:flex font-bold">{user?.given_name || 'İstifadəçi'}</span>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Space>
                            <Avatar style={{ backgroundColor: '#87d068' }}>{userInitials}</Avatar>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderContent;
