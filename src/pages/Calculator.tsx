import React, { useEffect, useState } from 'react';
import {  Spin, message, Button } from 'antd';
import { useNavigate } from 'react-router';
import api from '@/utils/axios';
import AuctionForm from '@/components/AuctionForm';
import PriceDisplay from '@/components/PriceDisplay';
import Logo  from "@/assets/images/logo.png"

interface PriceSetting {
    id: string;
    auction: string;
    name: string;
    port: string;
    price: string;
}

const Calculator: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<PriceSetting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedAuction, setSelectedAuction] = useState<string | undefined>(undefined);
    const [filteredNames, setFilteredNames] = useState<string[]>([]);
    const [selectedName, setSelectedName] = useState<string | undefined>(undefined);
    const [filteredPorts, setFilteredPorts] = useState<string[]>([]);
    const [selectedPort, setSelectedPort] = useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string | null>(null);


    useEffect(() => {
      document.title = 'AzadLogistics'; // Set the page title
    }, []);
  

    useEffect(() => {
        fetchPriceSettings();
    }, []);

    const fetchPriceSettings = async () => {
        try {
            setLoading(true);
            const response = await api.get('/getPriceSettings');
            setData(response.data.data);
        } catch (error) {
            message.error('Məlumatları yükləmək mümkün olmadı.');
        } finally {
            setLoading(false);
        }
    };

    const handleAuctionChange = (value: string | undefined) => {
        setSelectedAuction(value || undefined);
        setSelectedName(undefined);
        setSelectedPort(undefined);
        setPrice(null);

        if (value) {
            const names = data
                .filter((item) => item.auction === value)
                .map((item) => item.name)
                .filter((value, index, self) => self.indexOf(value) === index);
            setFilteredNames(names);
            setFilteredPorts([]);
        } else {
            setFilteredNames([]);
            setFilteredPorts([]);
        }
    };

    const handleNameChange = (value: string | undefined) => {
        setSelectedName(value || undefined);
        setSelectedPort(undefined);
        setPrice(null);

        if (value) {
            const ports = data
                .filter((item) => item.name === value)
                .map((item) => item.port)
                .filter((value, index, self) => self.indexOf(value) === index);
            setFilteredPorts(ports);
        } else {
            setFilteredPorts([]);
        }
    };

    const handlePortChange = (value: string | undefined) => {
        setSelectedPort(value || undefined);

        if (value) {
            const selectedItem = data.find(
                (item) => item.auction === selectedAuction && item.name === selectedName && item.port === value
            );
            setPrice(selectedItem?.price || null);
        } else {
            setPrice(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <div className="w-full max-w-md space-y-4 p-4 bg-white rounded-lg shadow-md ">
                      <div className='flex flex-col items-center pt-3'>

                           <img src={Logo} alt='logo' width={200} />
                      </div>
                         
                        <AuctionForm
                            data={data}
                            selectedAuction={selectedAuction}
                            filteredNames={filteredNames}
                            selectedName={selectedName}
                            filteredPorts={filteredPorts}
                            selectedPort={selectedPort}
                            onAuctionChange={handleAuctionChange}
                            onNameChange={handleNameChange}
                            onPortChange={handlePortChange}
                        />
                        <PriceDisplay price={price} />
                    </div>
                    <Button
                        type="link"
                        className="w-full mt-4"
                        onClick={() => navigate('/admin')}
                    >
                        Admin Panelinə keç
                    </Button>
                </>
            )}
        </div>
    );
};

export default Calculator;
