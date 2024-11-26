import React, { useState } from 'react';
import { UserPlus, Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useStores } from '../context/StoreContext';

const SellersManagement = () => {
  const { sellers, stores, addSeller, updateSellerStatus } = useStores();
  const [isAddingSeller, setIsAddingSeller] = useState(false);
  const [newSeller, setNewSeller] = useState({
    name: '',
    email: '',
    phone: '',
    storeId: '',
    role: 'junior' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSeller({
      ...newSeller,
      storeId: parseInt(newSeller.storeId)
    });
    setIsAddingSeller(false);
    setNewSeller({ name: '', email: '', phone: '', storeId: '', role: 'junior' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sellers Management</h1>
          <button
            onClick={() => setIsAddingSeller(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Seller
          </button>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map(seller => (
            <div key={seller.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{seller.name}</h3>
                  <p className="text-sm text-gray-500">{seller.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  seller.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {seller.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Store:</span>
                  <span className="ml-2 font-medium">
                    {stores.find(store => store.id === seller.storeId)?.name}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Sales:</span>
                  <span className="ml-2 font-medium">{seller.salesCount}</span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance</span>
                    <span>{seller.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${seller.performance}%` }}
                    />
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => updateSellerStatus(seller.id, 'active')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                      seller.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Active
                  </button>
                  <button
                    onClick={() => updateSellerStatus(seller.id, 'inactive')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                      seller.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4 inline mr-1" />
                    Inactive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Seller Modal */}
        {isAddingSeller && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Seller</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newSeller.name}
                    onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newSeller.email}
                    onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newSeller.phone}
                    onChange={(e) => setNewSeller({ ...newSeller, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store
                  </label>
                  <select
                    value={newSeller.storeId}
                    onChange={(e) => setNewSeller({ ...newSeller, storeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Store</option>
                    {stores.map(store => (
                      <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={newSeller.role}
                    onChange={(e) => setNewSeller({ ...newSeller, role: e.target.value as 'junior' | 'senior' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddingSeller(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                  >
                    Add Seller
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellersManagement;