export interface Store {
  id: number;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  phoneModels: number;
  inventory: number;
  monthlySales: number;
}

export interface Seller {
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

export interface Sale {
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