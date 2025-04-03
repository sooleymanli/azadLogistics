import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import api from '../utils/axios';
import { useNavigate } from 'react-router';
import useSnackbar from '../utils/useSnackbar';
import Logo from '@/assets/images/logo.png';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
  }, []);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await api.post('/login', values);
      localStorage.setItem('accessToken', response.data.accessToken);
      showSnackbar('Uğurla daxil oldunuz!', { variant: 'success' });
      navigate('/admin'); 
    } catch (error: any) {
      if (error.response?.status === 400) {
        showSnackbar('İstifadəçi adı və ya şifrə yanlışdır', { variant: 'error' });
      } else {
        showSnackbar('Gözlənilməz xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToCalculator = () => {
    navigate('/'); 
  };

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-5 p-4 '>
      <div className="w-full max-w-md space-y-4 p-4 bg-white rounded-lg shadow-md ">
<div className='flex justify-center'>

      <img src={Logo} alt='Logo' width={200} />
</div>
      <Form onFinish={onFinish} layout="vertical" className='flex flex-col gap-2' >
        <Form.Item
          name="username"
          label="E-poçt"
          rules={[
            { required: true, message: 'Zəhmət olmasa e-poçtunuzu daxil edin!' },
            { type: 'email', message: 'Zəhmət olmasa düzgün e-poçt daxil edin!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Şifrə"
          rules={[{ required: true, message: 'Zəhmət olmasa şifrənizi daxil edin!' }]}
        >
          <Input.Password   />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block size='large'>
            Daxil ol
          </Button>
        </Form.Item>
      </Form>
      </div>
      <Button type="link" onClick={navigateToCalculator} size='large'>
        Kalkulyatora qayıt
      </Button>
    </div>
  );
};

export default Login;
