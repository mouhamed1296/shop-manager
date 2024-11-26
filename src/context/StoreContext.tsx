import React, { createContext, useContext, ReactNode, useState } from 'react';

interface Store {
  id: number;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  phoneModels: number;
  inventory: number;
  monthlySales: number;
}

interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  storeId: number;
  role: 'senior' | 'junior';
  salesCount: number;
  performance: number;
  status: 'active' | 'inactive';
}

interface Sale {
  id: number;
  storeId: number;
  sellerId: number;
  type: 'sale' | 'exchange';
  phoneModel: string;
  price: number;
  date: Date;
  tradeInDetails?: {
    model: string;
    imei: string;
    condition: string;
    value: number;
    defects: string[];
    notes: string;
  };
}

interface TotalStats {
  totalStores: number;
  monthlyRevenue: number;
  totalInventory: number;
}

interface StoreContextType {
  stores: Store[];
  sellers: Seller[];
  sales: Sale[];
  totalStats: TotalStats;
  addStore: (store: Omit<Store, 'id' | 'status' | 'monthlySales'>) => Promise<void>;
  updateStore: (id: number, store: Store) => Promise<void>;
  deleteStore: (id: number) => Promise<void>;
  addSeller: (seller: Omit<Seller, 'id' | 'salesCount' | 'performance' | 'status'>) => void;
  updateSellerStatus: (id: number, status: 'active' | 'inactive') => void;
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  getStoreById: (id: number) => Store | undefined;
  getSellerById: (id: number) => Seller | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialStores: Store[] = [
  {
    id: 1,
    name: "Downtown Electronics",
    location: "123 Main St, New York",
    status: "active",
    phoneModels: 24,
    inventory: 156,
    monthlySales: 45.2
  },
  {
    id: 2,
    name: "Tech Haven",
    location: "456 Market St, San Francisco",
    status: "active",
    phoneModels: 18,
    inventory: 98,
    monthlySales: 32.8
  }
];

const initialSellers: Seller[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-0123",
    storeId: 1,
    role: "senior",
    salesCount: 145,
    performance: 92,
    status: "active"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-0124",
    storeId: 1,
    role: "junior",
    salesCount: 89,
    performance: 85,
    status: "active"
  }
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [sales, setSales] = useState<Sale[]>([]);

  const totalStats: TotalStats = {
    totalStores: stores.length,
    monthlyRevenue: stores.reduce((sum, store) => sum + store.monthlySales, 0),
    totalInventory: stores.reduce((sum, store) => sum + store.inventory, 0)
  };

  const addStore = async (newStore: Omit<Store, 'id' | 'status' | 'monthlySales'>) => {
    const store: Store = {
      ...newStore,
      id: stores.length + 1,
      status: 'active',
      monthlySales: 0
    };
    setStores([...stores, store]);
  };

  const updateStore = async (id: number, updatedStore: Store) => {
    setStores(stores.map(store => 
      store.id === id ? updatedStore : store
    ));
  };

  const deleteStore = async (id: number) => {
    setStores(stores.filter(store => store.id !== id));
  };

  const addSeller = (newSeller: Omit<Seller, 'id' | 'salesCount' | 'performance' | 'status'>) => {
    const seller: Seller = {
      ...newSeller,
      id: sellers.length + 1,
      salesCount: 0,
      performance: 100,
      status: 'active'
    };
    setSellers([...sellers, seller]);
  };

  const updateSellerStatus = (id: number, status: 'active' | 'inactive') => {
    setSellers(sellers.map(seller => 
      seller.id === id ? { ...seller, status } : seller
    ));
  };

  const addSale = (saleData: Omit<Sale, 'id' | 'date'>) => {
    const sale: Sale = {
      ...saleData,
      id: sales.length + 1,
      date: new Date()
    };
    setSales([...sales, sale]);

    // Update seller stats
    setSellers(sellers.map(seller => {
      if (seller.id === saleData.sellerId) {
        return {
          ...seller,
          salesCount: seller.salesCount + 1,
          performance: Math.min(100, seller.performance + 1)
        };
      }
      return seller;
    }));

    // Update store stats
    setStores(stores.map(store => {
      if (store.id === saleData.storeId) {
        return {
          ...store,
          inventory: store.inventory - 1,
          monthlySales: store.monthlySales + (saleData.price / 1000) // Convert to k
        };
      }
      return store;
    }));
  };

  const getStoreById = (id: number) => stores.find(store => store.id === id);
  const getSellerById = (id: number) => sellers.find(seller => seller.id === id);

  return (
    <StoreContext.Provider value={{ 
      stores, 
      sellers, 
      sales, 
      totalStats, 
      addStore,
      updateStore,
      deleteStore,
      addSeller,
      updateSellerStatus,
      addSale,
      getStoreById,
      getSellerById
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStores() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStores must be used within a StoreProvider');
  }
  return context;
}