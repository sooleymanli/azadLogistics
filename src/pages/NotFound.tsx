import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen">
            <Result
                status="404"
                title="404"
                subTitle="Üzr istəyirik, axtardığınız səhifə tapılmadı."
                extra={
                    <Button type="primary" onClick={() => navigate('/')}>
                        Ana səhifəyə qayıt
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;
