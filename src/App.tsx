import React, { useState } from 'react';
import { Store, Plus, Search, DollarSign, Users, LogOut } from 'lucide-react';
import StoreList from './components/StoreList';
import StoreStats from './components/StoreStats';
import AddStoreModal from './components/AddStoreModal';
import SalesInterface from './components/SalesInterface';
import SellersManagement from './components/SellersManagement';
import SellerDashboard from './components/SellerDashboard';
import LoginPage from './components/LoginPage';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider, useAuth } from './context/AuthContext';

type View = 'stores' | 'sales' | 'sellers';

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('stores');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  if (user.role === 'seller') {
    return <SellerDashboard sellerId={user.id} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Store className="w-8 h-8" />
            <span className="text-xl font-bold">Gestionnaire de Magasin</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setCurrentView('sales')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'sales' 
                  ? 'bg-white text-indigo-600' 
                  : 'bg-indigo-500 hover:bg-indigo-400'
              }`}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Terminal de Vente
            </button>
            <button 
              onClick={() => setCurrentView('sellers')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'sellers' 
                  ? 'bg-white text-indigo-600' 
                  : 'bg-indigo-500 hover:bg-indigo-400'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Vendeurs
            </button>
            <button 
              onClick={() => setCurrentView('stores')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentView === 'stores' 
                  ? 'bg-white text-indigo-600' 
                  : 'bg-indigo-500 hover:bg-indigo-400'
              }`}
            >
              <Store className="w-5 h-5 mr-2" />
              Gérer les Magasins
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-400 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un Magasin
            </button>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400 transition-colors text-white"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {currentView === 'stores' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col gap-8">
            <div className="block lg:hidden">
              <StoreStats />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <h1 className="text-2xl font-bold text-gray-900">Vos Magasins</h1>
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Rechercher des magasins..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <StoreList searchQuery={searchQuery} />
              </div>
              
              <div className="hidden lg:block lg:col-span-4">
                <StoreStats />
              </div>
            </div>
          </div>
        </main>
      )}

      {currentView === 'sales' && <SalesInterface />}
      {currentView === 'sellers' && <SellersManagement />}

      <AddStoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;