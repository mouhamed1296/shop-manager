import React, { useState } from 'react';
import { MapPin, Phone, Package, TrendingUp, Edit, Trash2, FileText } from 'lucide-react';
import { useStores } from '../context/StoreContext';
import toast from 'react-hot-toast';
import StoreDetails from './StoreDetails';
import InventoryManagement from './InventoryManagement';
import { generateReport, downloadReport } from '../utils/reportGenerator';

interface StoreListProps {
  searchQuery: string;
}

const StoreList = ({ searchQuery }: StoreListProps) => {
  const { stores, deleteStore, updateStore, sales, sellers } = useStores();
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (storeId: number) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStore(storeId);
        toast.success('Store deleted successfully');
      } catch (error) {
        toast.error('Failed to delete store');
      }
    }
  };

  const handleStatusToggle = async (store: any) => {
    try {
      await updateStore(store.id, {
        ...store,
        status: store.status === 'active' ? 'inactive' : 'active'
      });
      toast.success(`Store ${store.status === 'active' ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update store status');
    }
  };

  const generateStoreReport = (storeId: number) => {
    const store = stores.find(s => s.id === storeId);
    if (!store) return;

    const storeSales = sales.filter(s => s.storeId === storeId);
    const storeSellers = sellers.filter(s => s.storeId === storeId);

    const doc = generateReport(
      { stores: [store], sales: storeSales, sellers: storeSellers },
      {
        type: 'store',
        storeId,
        dateRange: {
          start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          end: new Date()
        }
      }
    );

    downloadReport(doc, `store_report_${store.name.toLowerCase().replace(/\s+/g, '_')}`);
    toast.success('Report generated successfully');
  };

  return (
    <div className="grid gap-6">
      {filteredStores.map((store) => (
        <div key={store.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {store.location}
              </div>
            </div>
            <button
              onClick={() => handleStatusToggle(store)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                store.status === 'active' 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {store.status}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-indigo-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Models</p>
                <p className="font-semibold">{store.phoneModels}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Package className="w-5 h-5 text-indigo-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">In Stock</p>
                <p className="font-semibold">{store.inventory}</p>
              </div>
            </div>
            <div className="flex items-center col-span-2 sm:col-span-1">
              <TrendingUp className="w-5 h-5 text-indigo-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Sales</p>
                <p className="font-semibold">${store.monthlySales}k</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button 
              onClick={() => {
                setSelectedStoreId(store.id);
                setIsDetailsOpen(true);
              }}
              className="flex-1 min-w-[120px] bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            >
              <Edit className="w-4 h-4 inline mr-2" />
              View Details
            </button>
            <button 
              onClick={() => {
                setSelectedStoreId(store.id);
                setIsInventoryOpen(true);
              }}
              className="flex-1 min-w-[120px] bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium"
            >
              <Package className="w-4 h-4 inline mr-2" />
              Manage Inventory
            </button>
            <button 
              onClick={() => generateStoreReport(store.id)}
              className="flex-1 min-w-[120px] bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Generate Report
            </button>
            <button
              onClick={() => handleDelete(store.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      {selectedStoreId && (
        <>
          <StoreDetails
            storeId={selectedStoreId}
            isOpen={isDetailsOpen}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedStoreId(null);
            }}
          />
          <InventoryManagement
            storeId={selectedStoreId}
            isOpen={isInventoryOpen}
            onClose={() => {
              setIsInventoryOpen(false);
              setSelectedStoreId(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default StoreList;