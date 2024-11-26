import React, { useState } from 'react';
import { X, Save, MapPin, Phone, Package, TrendingUp, Edit } from 'lucide-react';
import { useStores } from '../context/StoreContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

interface StoreDetailsProps {
  storeId: number;
  isOpen: boolean;
  onClose: () => void;
}

const StoreDetails = ({ storeId, isOpen, onClose }: StoreDetailsProps) => {
  const { getStoreById, updateStore } = useStores();
  const store = getStoreById(storeId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStore, setEditedStore] = useState(store);

  if (!store) return null;

  // Sample data for the chart - in a real app, this would come from your sales data
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
  ];

  const handleSave = async () => {
    try {
      await updateStore(storeId, editedStore!);
      setIsEditing(false);
      toast.success('Store updated successfully');
    } catch (error) {
      toast.error('Failed to update store');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-between items-start mb-6">
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedStore?.name}
                onChange={(e) => setEditedStore({ ...editedStore!, name: e.target.value })}
                className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{store.name}</h2>
            )}
            <div className="mt-1 flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedStore?.location}
                  onChange={(e) => setEditedStore({ ...editedStore!, location: e.target.value })}
                  className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                store.location
              )}
            </div>
          </div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Details
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-indigo-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Phone Models</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedStore?.phoneModels}
                    onChange={(e) => setEditedStore({ ...editedStore!, phoneModels: parseInt(e.target.value) })}
                    className="font-semibold text-gray-900 w-20 border rounded-md px-2 py-1"
                  />
                ) : (
                  <p className="font-semibold text-gray-900">{store.phoneModels}</p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Package className="w-5 h-5 text-indigo-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Inventory</p>
                <p className="font-semibold text-gray-900">{store.inventory}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-indigo-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Monthly Sales</p>
                <p className="font-semibold text-gray-900">${store.monthlySales}k</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Status</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Current Status:</span>
            {isEditing ? (
              <select
                value={editedStore?.status}
                onChange={(e) => setEditedStore({ ...editedStore!, status: e.target.value as 'active' | 'inactive' })}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            ) : (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {store.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;