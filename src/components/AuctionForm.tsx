import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

interface AuctionFormProps {
    data: any[];
    selectedAuction: string | undefined;
    filteredNames: string[];
    selectedName: string | undefined;
    filteredPorts: string[];
    selectedPort: string | undefined;
    onAuctionChange: (value: string | undefined) => void;
    onNameChange: (value: string | undefined) => void;
    onPortChange: (value: string | undefined) => void;
}

const AuctionForm: React.FC<AuctionFormProps> = ({
    data,
    selectedAuction,
    filteredNames,
    selectedName,
    filteredPorts,
    selectedPort,
    onAuctionChange,
    onNameChange,
    onPortChange,
}) => {
    return (
        <Form layout="vertical" className="space-y-4">
            <Form.Item label="Hərrac">
                <Select
                    placeholder="Hərrac seçin"
                    className="w-full"
                    onChange={onAuctionChange}
                    value={selectedAuction}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.children as string | undefined)?.toLowerCase().includes(input.toLowerCase()) || false
                    }
                >
                    {data
                        .map((item) => item.auction)
                        .filter((value, index, self) => self.indexOf(value) === index)
                        .map((auction) => (
                            <Option key={auction} value={auction}>
                                {auction}
                            </Option>
                        ))}
                </Select>
            </Form.Item>
            <Form.Item label="Ad">
                <Select
                    placeholder="Ad seçin"
                    className="w-full"
                    onChange={onNameChange}
                    value={selectedName}
                    disabled={!filteredNames.length}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.children as string | undefined)?.toLowerCase().includes(input.toLowerCase()) || false
                    }
                >
                    {filteredNames.map((name) => (
                        <Option key={name} value={name}>
                            {name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Liman">
                <Select
                    placeholder="Liman seçin"
                    className="w-full"
                    onChange={onPortChange}
                    value={selectedPort}
                    disabled={!filteredPorts.length}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.children as string | undefined)?.toLowerCase().includes(input.toLowerCase()) || false
                    }
                >
                    {filteredPorts.map((port) => (
                        <Option key={port} value={port}>
                            {port}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default AuctionForm;
