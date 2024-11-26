import React, { useState } from 'react';
import { Phone, RefreshCw, DollarSign, Package, Search, AlertCircle } from 'lucide-react';
import { useStores } from '../context/StoreContext';

interface SaleItem {
  type: 'sale' | 'exchange';
  model: string;
  price: number;
  tradeInModel?: string;
  tradeInValue?: number;
  condition?: string;
  defects?: string[];
  notes?: string;
}

const SalesInterface = () => {
  const { stores } = useStores();
  const [selectedStore, setSelectedStore] = useState('');
  const [saleType, setSaleType] = useState<'sale' | 'exchange'>('sale');
  const [searchQuery, setSearchQuery] = useState('');
  const [tradeInDetails, setTradeInDetails] = useState({
    model: '',
    value: '',
    condition: 'good',
    defects: [] as string[],
    notes: '',
    imei: '',
  });

  const phoneModels = [
    { id: 1, name: 'iPhone 14 Pro', price: 999, stock: 45 },
    { id: 2, name: 'Samsung Galaxy S23', price: 899, stock: 32 },
    { id: 3, name: 'Google Pixel 7', price: 599, stock: 28 },
    { id: 4, name: 'OnePlus 11', price: 699, stock: 15 }
  ];

  const conditions = ['excellent', 'good', 'fair', 'poor'];
  const commonDefects = [
    'Screen Damage',
    'Battery Issues',
    'Camera Problems',
    'Button Malfunction',
    'Speaker Issues',
    'Charging Port Damage',
    'Water Damage',
    'Housing Damage'
  ];

  const handleDefectToggle = (defect: string) => {
    setTradeInDetails(prev => ({
      ...prev,
      defects: prev.defects.includes(defect)
        ? prev.defects.filter(d => d !== defect)
        : [...prev.defects, defect]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Sales Terminal</h1>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select Store</option>
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          </div>

          {/* Sale Type Toggle */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSaleType('sale')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                saleType === 'sale'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>New Sale</span>
            </button>
            <button
              onClick={() => setSaleType('exchange')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                saleType === 'exchange'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              <span>Exchange</span>
            </button>
          </div>

          {/* Search and Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search phones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              
              <div className="space-y-3">
                {phoneModels.map(phone => (
                  <div
                    key={phone.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-500 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Phone className="w-6 h-6 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">{phone.name}</h3>
                        <p className="text-sm text-gray-500">Stock: {phone.stock}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${phone.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sale Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sale Summary</h2>
              
              {saleType === 'exchange' && (
                <div className="mb-6 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                    <h3 className="font-medium text-blue-900">Trade-in Details</h3>
                    
                    {/* Basic Trade-in Info */}
                    <div className="space-y-2">
                      <select 
                        value={tradeInDetails.model}
                        onChange={(e) => setTradeInDetails(prev => ({ ...prev, model: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select trade-in model</option>
                        <option>iPhone 13 Pro</option>
                        <option>Samsung Galaxy S22</option>
                        <option>Google Pixel 6</option>
                      </select>

                      <input
                        type="text"
                        placeholder="IMEI Number"
                        value={tradeInDetails.imei}
                        onChange={(e) => setTradeInDetails(prev => ({ ...prev, imei: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />

                      <select
                        value={tradeInDetails.condition}
                        onChange={(e) => setTradeInDetails(prev => ({ ...prev, condition: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>
                            {condition.charAt(0).toUpperCase() + condition.slice(1)} Condition
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        placeholder="Trade-in value"
                        value={tradeInDetails.value}
                        onChange={(e) => setTradeInDetails(prev => ({ ...prev, value: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Defects Checklist */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Device Issues</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {commonDefects.map(defect => (
                          <label
                            key={defect}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={tradeInDetails.defects.includes(defect)}
                              onChange={() => handleDefectToggle(defect)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{defect}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Additional Notes</h4>
                      <textarea
                        value={tradeInDetails.notes}
                        onChange={(e) => setTradeInDetails(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Enter any additional details about the device's condition..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$0.00</span>
                </div>
                {saleType === 'exchange' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trade-in Value</span>
                    <span className="font-medium text-green-600">
                      -{tradeInDetails.value ? `$${tradeInDetails.value}` : '$0.00'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">$0.00</span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors flex items-center justify-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Complete {saleType === 'exchange' ? 'Exchange' : 'Sale'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInterface;