import React, { useState } from 'react';
import { ShoppingBag, TrendingUp, Package, AlertCircle, FileText, Plus } from 'lucide-react';
import { useStores } from '../context/StoreContext';
import AddInventoryModal from './AddInventoryModal';
import GenerateReportModal from './GenerateReportModal';
import toast from 'react-hot-toast';

const StoreStats = () => {
  const { totalStats } = useStores();
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
      
      <div className="space-y-4">
        <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
          <ShoppingBag className="w-12 h-12 text-indigo-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Total Stores</p>
            <p className="text-2xl font-bold text-gray-900">{totalStats.totalStores}</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-green-50 rounded-lg">
          <TrendingUp className="w-12 h-12 text-green-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${totalStats.monthlyRevenue}k</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <Package className="w-12 h-12 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Total Inventory</p>
            <p className="text-2xl font-bold text-gray-900">{totalStats.totalInventory}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </button>
          <button 
            onClick={() => setIsAddInventoryOpen(true)}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Inventory Item
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-start">
        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div className="ml-3">
          <h4 className="text-sm font-medium text-yellow-800">Low Stock Alert</h4>
          <p className="text-sm text-yellow-700 mt-1">
            3 stores have items below minimum stock level
          </p>
        </div>
      </div>

      <AddInventoryModal
        isOpen={isAddInventoryOpen}
        onClose={() => setIsAddInventoryOpen(false)}
      />

      <GenerateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default StoreStats;