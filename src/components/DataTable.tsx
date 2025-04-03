import React, { useState } from 'react';
import { Table, Tooltip, Popconfirm, Button, TableColumnType } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useSnackbar } from 'notistack';
import { deletePriceSetting } from '@/services/priceSettingsService'; 

interface PriceSetting {
    id: string;
    auction: string;
    name: string;
    port: string;
    price: string;
}

interface DataTableProps {
    data: PriceSetting[] | undefined;
    fetchPriceSettings: () => void;
    searchText: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, fetchPriceSettings, searchText }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deletePriceSetting(id); 
            enqueueSnackbar('Məlumat uğurla silindi.', { variant: 'success' });
            fetchPriceSettings();
        } catch (error) {
            enqueueSnackbar('Məlumatı silmək mümkün olmadı.', { variant: 'error' });
        } finally {
            setDeletingId(null);
        }
    };

    const columns: TableColumnType<PriceSetting>[] = [
        {
            title: 'Hərrac',
            dataIndex: 'auction',
            key: 'auction',
            minWidth: 100,
            sorter: (a: PriceSetting, b: PriceSetting) => (a.auction || '').localeCompare(b.auction || ''),
            render: (text: string) => (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text || ''}
                />
            ),
        },
        {
            title: 'Ad',
            dataIndex: 'name',
            key: 'name',
            minWidth:100,
            sorter: (a: PriceSetting, b: PriceSetting) => (a.name || '').localeCompare(b.name || ''),
            render: (text: string) => (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text || ''}
                />
            ),
        },
        {
            title: 'Liman',
            dataIndex: 'port',
            key: 'port',
            minWidth:100,
            sorter: (a: PriceSetting, b: PriceSetting) => (a.port || '').localeCompare(b.port || ''),
            render: (text: string) => (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text || ''}
                />
            ),
        },
        {
            title: 'Qiymət',
            dataIndex: 'price',
            key: 'price',
            minWidth:100,
            sorter: (a: PriceSetting, b: PriceSetting) => {
                const priceA = parseFloat(a.price) || 0;
                const priceB = parseFloat(b.price) || 0;
                return priceA - priceB;
            },
            render: (text: string) => (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text || ''}
                />
            ),
        },
        {
            key: 'actions',
            align: 'right' as const,
            render: (_: any, record: PriceSetting) => (
                <Popconfirm
                    title="Bu məlumatı silmək istədiyinizə əminsiniz?"
                    onConfirm={() => handleDelete(record.id)}
                    okButtonProps={{ loading: deletingId === record.id }}
                    okText="Bəli, Sil"
                    cancelText="Xeyr"
                    placement="bottomRight"
                >
                    <Tooltip title="Sil" placement="left">
                        <Button danger type="text" shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Table
            dataSource={data?.reverse()}
            columns={columns}
            rowKey="id"
            pagination={{ position: ['bottomLeft'] }}
            scroll={{ x: 'max-content', y: 'calc(100vh - 410px)' }}
            tableLayout='auto'
        />
    );
};

export default DataTable;
