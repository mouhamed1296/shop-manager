import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { useStores } from '../context/StoreContext';
import { generateReport, downloadReport } from '../utils/reportGenerator';
import toast from 'react-hot-toast';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerateReportModal = ({ isOpen, onClose }: GenerateReportModalProps) => {
  const { stores, sales, sellers } = useStores();
  const [selectedStore, setSelectedStore] = useState('');

  const handleGenerateReport = () => {
    try {
      const storeId = parseInt(selectedStore);
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
      onClose();
    } catch (error) {
      toast.error('Failed to generate report');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate Store Report</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Store
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Store</option>
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateReport}
              disabled={!selectedStore}
              className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportModal;