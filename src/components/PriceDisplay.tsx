import React from 'react';

interface PriceDisplayProps {
    price: string | null;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {
    if (!price) return null;

    return (
        <div className="text-center mt-4 bg-green-700 p-4 rounded-lg flex justify-center items-center animate-fade-in-out">
            <span className="text-white font-bold text-[24px]">{price} AZN</span>
        </div>
    );
};

export default PriceDisplay;
