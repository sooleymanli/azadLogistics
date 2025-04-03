import React, { useEffect, useState } from 'react';
import { Layout, Spin, ConfigProvider, Result, Input, Button, Breadcrumb, theme } from 'antd';
import { jwtDecode } from 'jwt-decode';
import api from '@/utils/axios';
import azLocale from 'antd/lib/locale/az_AZ';
import HeaderContent from '@/components/HeaderContent';
import DataTable from '@/components/DataTable';
import AddPriceSettingDrawer from '@/components/AddPriceSettingDrawer';

const { Header, Content } = Layout;

interface PriceSetting {
    id: string;
    auction: string;
    name: string;
    port: string;
    price: string;
}

const AdminPanel = () => {
    const token = localStorage.getItem('accessToken');
    const user = token ? jwtDecode<{ given_name: string }>(token) : null;

    const [data, setData] = useState<PriceSetting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        document.title = 'Admin Paneli';
        fetchPriceSettings();
    }, []);

    const fetchPriceSettings = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await api.get('/getPriceSettings');
            setData(response.data.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(searchText)
        )
    );

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding:0
                }}
            >
                <HeaderContent user={user} />
            </Header>
            <Content className='px-2 md:px-5'>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item>Hərraclar</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <div className="flex justify-between items-center mb-5">
                            <h2 className='text-[24px]'>Hərraclar</h2>
                        <Button type="primary" onClick={() => setDrawerVisible(true)}>
                            Yeni əlavə et
                        </Button>
                    </div>
                    <Input.Search
                        placeholder="Axtarış..."
                        onChange={handleSearch}
                        className="mb-5"
                        allowClear
                    />
                    {error ? (
                        <Result
                            status="error"
                            title="Məlumat yüklənən zaman xəta baş verdi"
                            subTitle="Zəhmət olmasa, bir az sonra yenidən cəhd edin."
                        />
                    ) : (
                        <ConfigProvider locale={azLocale}>
                            <Spin spinning={loading}>
                                <DataTable
                                    data={filteredData}
                                    fetchPriceSettings={fetchPriceSettings}
                                    searchText={searchText}
                                />
                            </Spin>
                        </ConfigProvider>
                    )}
                    <AddPriceSettingDrawer
                        visible={drawerVisible}
                        onClose={() => setDrawerVisible(false)}
                        onSuccess={() => {
                            setDrawerVisible(false);
                            fetchPriceSettings();
                        }}
                    />
                </div>
            </Content>
         
        </Layout>
    );
};

export default AdminPanel;
