import React, { useState } from 'react';
import { Drawer, Form, Input, InputNumber, Button } from 'antd';
import { useSnackbar } from 'notistack';
import api from '@/utils/axios';

interface AddPriceSettingDrawerProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddPriceSettingDrawer: React.FC<AddPriceSettingDrawerProps> = ({ visible, onClose, onSuccess }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [adding, setAdding] = useState<boolean>(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values: { name: string; price: number; port: string; auction: string }) => {
        setAdding(true);
        try {
            await api.post('/addPriceSettings', {
                name: values.name,
                price: `${values.price}`,
                port: values.port,
                auction: values.auction,
            });
            enqueueSnackbar('Məlumat uğurla əlavə edildi.', { variant: 'success' });
            form.resetFields();
            onSuccess();
        } catch (error) {
            enqueueSnackbar('Məlumatı əlavə etmək mümkün olmadı.', { variant: 'error' });
        } finally {
            setAdding(false);
        }
    };

    return (
        <Drawer
            title="Yeni məlumat əlavə et"
            placement="right"
            onClose={onClose}
            open={visible}
            width={400}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} className='flex flex-col gap-2'>
                <Form.Item
                    label="Hərrac"
                    name="auction"
                    rules={[{ required: true, message: 'Hərrac daxil edilməlidir.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ad"
                    name="name"
                    rules={[{ required: true, message: 'Ad daxil edilməlidir.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Liman"
                    name="port"
                    rules={[{ required: true, message: 'Liman daxil edilməlidir.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Qiymət"
                    name="price"
                    rules={[{ required: true, message: 'Qiymət daxil edilməlidir.' }]}
                >
                    <InputNumber min={0} className="w-full" addonAfter="₼" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={adding} block>
                        Əlavə et
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default AddPriceSettingDrawer;
