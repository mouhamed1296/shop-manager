import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, Save } from 'lucide-react';
import { useStores } from '../context/StoreContext';
import Papa from 'papaparse';
import toast from 'react-hot-toast';

interface BulkInventoryUpdateProps {
  storeId: number;
  isOpen: boolean;
  onClose: () => void;
}

interface InventoryUpdate {
  model: string;
  brand: string;
  newStock: number;
  currentStock?: number;
  status?: 'valid' | 'error';
  error?: string;
}

const BulkInventoryUpdate = ({ storeId, isOpen, onClose }: BulkInventoryUpdateProps) => {
  const { getStoreById, updateStore } = useStores();
  const store = getStoreById(storeId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updates, setUpdates] = useState<InventoryUpdate[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const processed: InventoryUpdate[] = results.data
          .filter((row: any) => row.model && row.brand && row.newStock)
          .map((row: any) => ({
            model: row.model,
            brand: row.brand,
            newStock: parseInt(row.newStock),
            status: isNaN(parseInt(row.newStock)) ? 'error' : 'valid',
            error: isNaN(parseInt(row.newStock)) ? 'Invalid stock number' : undefined
          }));
        setUpdates(processed);
        toast.success(`Processed ${processed.length} items`);
      },
      error: () => {
        toast.error('Error processing file');
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      processFile(file);
    } else {
      toast.error('Please upload a CSV file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleBulkUpdate = async () => {
    try {
      // In a real app, you would send this to your backend
      const validUpdates = updates.filter(update => update.status === 'valid');
      
      if (validUpdates.length === 0) {
        toast.error('No valid updates to process');
        return;
      }

      // Update store inventory
      const totalNewStock = validUpdates.reduce((sum, item) => sum + item.newStock, 0);
      await updateStore(storeId, {
        ...store!,
        inventory: totalNewStock
      });

      toast.success('Inventory updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update inventory');
    }
  };

  const downloadTemplate = () => {
    const template = 'model,brand,newStock\niPhone 14 Pro,Apple,100\nSamsung Galaxy S23,Samsung,50';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_update_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bulk Inventory Update</h2>

        <div className="mb-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-500'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop your CSV file here, or</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".csv"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              browse to upload
            </button>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={downloadTemplate}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Download Template
            </button>
            <p className="text-sm text-gray-500">
              Maximum file size: 5MB
            </p>
          </div>
        </div>

        {updates.length > 0 && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Changes</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {updates.map((update, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{update.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{update.brand}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{update.newStock}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {update.status === 'error' ? (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span className="text-sm">{update.error}</span>
                            </div>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Valid
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkUpdate}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Inventory
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BulkInventoryUpdate;