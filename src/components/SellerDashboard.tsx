import React, { useState } from 'react';
import { Phone, Package, TrendingUp, DollarSign, Search, RefreshCw, History, LogOut } from 'lucide-react';
import { useStores } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

interface SellerDashboardProps {
  sellerId: number;
}

const SellerDashboard = ({ sellerId }: SellerDashboardProps) => {
  const { getSellerById, getStoreById, addSale, sales } = useStores();
  const { user, logout } = useAuth();
  const [saleType, setSaleType] = useState<'sale' | 'exchange'>('sale');
  const [selectedPhone, setSelectedPhone] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tradeInDetails, setTradeInDetails] = useState({
    model: '',
    imei: '',
    condition: 'good',
    value: '',
    defects: [] as string[],
    notes: ''
  });

  const seller = getSellerById(sellerId);
  const store = seller ? getStoreById(seller.storeId) : null;

  if (!seller || !store) {
    return <div>Error: Seller not found</div>;
  }

  const phoneModels = [
    { id: 1, name: 'iPhone 14 Pro', price: 999, stock: 45 },
    { id: 2, name: 'Samsung Galaxy S23', price: 899, stock: 32 },
    { id: 3, name: 'Google Pixel 7', price: 599, stock: 28 },
    { id: 4, name: 'OnePlus 11', price: 699, stock: 15 }
  ].filter(phone => 
    phone.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleSale = () => {
    if (!selectedPhone || !seller || !store) return;

    const saleData = {
      storeId: store.id,
      sellerId: seller.id,
      type: saleType,
      phoneModel: selectedPhone.name,
      price: selectedPhone.price,
      ...(saleType === 'exchange' && {
        tradeInDetails: {
          model: tradeInDetails.model,
          imei: tradeInDetails.imei,
          condition: tradeInDetails.condition,
          value: parseFloat(tradeInDetails.value),
          defects: tradeInDetails.defects,
          notes: tradeInDetails.notes
        }
      })
    };

    addSale(saleData);
    setSelectedPhone(null);
    setTradeInDetails({
      model: '',
      imei: '',
      condition: 'good',
      value: '',
      defects: [],
      notes: ''
    });
  };

  const sellerSales = sales.filter(sale => sale.sellerId === sellerId);

  const totalSales = sellerSales.reduce((sum, sale) => sum + sale.price, 0);
  const totalExchanges = sellerSales.filter(sale => sale.type === 'exchange').length;
  const averagePrice = totalSales / (sellerSales.length || 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {seller.name}</h1>
                <p className="mt-1 text-indigo-200">Store: {store.name}</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-indigo-200">Performance</p>
                  <div className="flex items-center mt-1">
                    <div className="w-32 bg-indigo-800 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full" 
                        style={{ width: `${seller.performance}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm">{seller.performance}%</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sales Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <DollarSign className="w-12 h-12 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">${totalSales.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <RefreshCw className="w-12 h-12 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Exchanges</p>
                <p className="text-2xl font-bold text-gray-900">{totalExchanges}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="w-12 h-12 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Sale</p>
                <p className="text-2xl font-bold text-gray-900">${averagePrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search phones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-3">
              {phoneModels.map(phone => (
                <div
                  key={phone.id}
                  onClick={() => setSelectedPhone(phone)}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPhone?.id === phone.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-500'
                  }`}
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

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sale Summary</h2>

            {saleType === 'exchange' && (
              <div className="mb-6 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                  <h3 className="font-medium text-blue-900">Trade-in Details</h3>
                  
                  <input
                    type="text"
                    placeholder="Trade-in Model"
                    value={tradeInDetails.model}
                    onChange={(e) => setTradeInDetails(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="text"
                    placeholder="IMEI Number"
                    value={tradeInDetails.imei}
                    onChange={(e) => setTradeInDetails(prev => ({ ...prev, imei: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <select
                    value={tradeInDetails.condition}
                    onChange={(e) => setTradeInDetails(prev => ({ ...prev, condition: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>
                        {condition.charAt(0).toUpperCase() + condition.slice(1)} Condition
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Trade-in Value"
                    value={tradeInDetails.value}
                    onChange={(e) => setTradeInDetails(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Device Issues</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {commonDefects.map(defect => (
                        <label key={defect} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={tradeInDetails.defects.includes(defect)}
                            onChange={() => {
                              setTradeInDetails(prev => ({
                                ...prev,
                                defects: prev.defects.includes(defect)
                                  ? prev.defects.filter(d => d !== defect)
                                  : [...prev.defects, defect]
                              }));
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{defect}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Additional notes about the trade-in device..."
                    value={tradeInDetails.notes}
                    onChange={(e) => setTradeInDetails(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              {selectedPhone && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">New Phone</span>
                    <span className="font-medium">${selectedPhone.price}</span>
                  </div>
                  {saleType === 'exchange' && tradeInDetails.value && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trade-in Value</span>
                      <span className="font-medium text-green-600">-${tradeInDetails.value}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">
                      ${((selectedPhone.price - (saleType === 'exchange' ? parseFloat(tradeInDetails.value) || 0 : 0)) * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      ${(
                        (selectedPhone.price - (saleType === 'exchange' ? parseFloat(tradeInDetails.value) || 0 : 0)) * 1.08
                      ).toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleSale}
              disabled={!selectedPhone || (saleType === 'exchange' && !tradeInDetails.model)}
              className={`w-full mt-6 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                selectedPhone && (!saleType === 'exchange' || tradeInDetails.model)
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Complete {saleType === 'exchange' ? 'Exchange' : 'Sale'}</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trade-in
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellerSales.map((sale, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sale.type === 'sale'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sale.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.phoneModel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${sale.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.tradeInDetails ? sale.tradeInDetails.model : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;