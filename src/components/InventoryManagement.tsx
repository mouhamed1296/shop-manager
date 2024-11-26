import React, { useState } from 'react';
import { X, Plus, Minus, Save, Search, Package, AlertCircle } from 'lucide-react';
import { useStores } from '../context/StoreContext';
import toast from 'react-hot-toast';

interface InventoryManagementProps {
  storeId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface InventoryItem {
  id: number;
  model: string;
  brand: string;
  price: number;
  stock: number;
  minStock: number;
  category: string;
}

const InventoryManagement = ({ storeId, isOpen, onClose }: InventoryManagementProps) => {
  const { getStoreById, updateStore } = useStores();
  const store = getStoreById(storeId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Sample inventory data - in a real app, this would come from your backend
  const [inventory] = useState<InventoryItem[]>([
    { id: 1, model: 'iPhone 14 Pro', brand: 'Apple', price: 999, stock: 45, minStock: 10, category: 'Flagship' },
    { id: 2, model: 'Samsung Galaxy S23', brand: 'Samsung', price: 899, stock: 32, minStock: 8, category: 'Flagship' },
    { id: 3, model: 'Google Pixel 7', brand: 'Google', price: 599, stock: 28, minStock: 5, category: 'Mid-range' },
    { id: 4, model: 'OnePlus 11', brand: 'OnePlus', price: 699, stock: 15, minStock: 5, category: 'Flagship' },
    { id: 5, model: 'iPhone 13', brand: 'Apple', price: 699, stock: 50, minStock: 15, category: 'Mid-range' },
    { id: 6, model: 'Samsung Galaxy A53', brand: 'Samsung', price: 449, stock: 60, minStock: 20, category: 'Budget' },
  ]);

  const filteredInventory = inventory.filter(item =>
    item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockUpdate = async (item: InventoryItem, action: 'add' | 'remove') => {
    const newStock = action === 'add' ? item.stock + quantity : item.stock - quantity;
    if (newStock < 0) {
      toast.error('Cannot reduce stock below 0');
      return;
    }

    try {
      // Update the store's total inventory
      const inventoryDiff = action === 'add' ? quantity : -quantity;
      await updateStore(storeId, {
        ...store!,
        inventory: store!.inventory + inventoryDiff
      });

      // In a real app, you would also update the specific item's stock in your backend
      toast.success(`Successfully ${action === 'add' ? 'added' : 'removed'} ${quantity} units`);
    } catch (error) {
      toast.error('Failed to update inventory');
    }
  };

  if (!isOpen || !store) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h2>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Items</h3>
            <div className="space-y-3">
              {filteredInventory.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedItem?.id === item.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.model}</h4>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${item.price}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">Stock: {item.stock}</span>
                    </div>
                    {item.stock <= item.minStock && (
                      <span className="flex items-center text-xs text-amber-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Low Stock
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedItem && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Stock</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Selected Item</p>
                  <p className="text-lg font-medium text-gray-900">{selectedItem.model}</p>
                  <p className="text-sm text-gray-500">{selectedItem.brand}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Stock</p>
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900">{selectedItem.stock}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity to Update
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleStockUpdate(selectedItem, 'add')}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stock
                  </button>
                  <button
                    onClick={() => handleStockUpdate(selectedItem, 'remove')}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Remove Stock
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;