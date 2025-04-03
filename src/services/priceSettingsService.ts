import api from '@/utils/axios';

export const getPriceSettings = async () => {
    const response = await api.get('/getPriceSettings');
    return response.data.data;
};

export const deletePriceSetting = async (id: string) => {
    return await api.get(`/deletePriceSetting/${id}`);
};

export const addPriceSetting = async (data: { name: string; price: string; port: string; auction: string }) => {
    return await api.post('/addPriceSettings', data);
};
