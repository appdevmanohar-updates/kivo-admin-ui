import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Order, Seller, ProductStatus, OrderStatus } from '../types';
import { samplePendingProducts, sampleOrders, sampleSellers } from '../constants';

interface DataContextType {
  products: Product[];
  orders: Order[];
  sellers: Seller[];
  updateProductStatus: (id: string, status: ProductStatus) => void;
  bulkApproveProducts: (ids: string[]) => void;
  assignDelivery: (orderId: string, riderName: string) => void;
  toggleSellerStatus: (sellerId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(samplePendingProducts);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [sellers, setSellers] = useState<Seller[]>(sampleSellers);

  const updateProductStatus = (id: string, status: ProductStatus) => {
    // Update status logic changed to persist items with 'rejected' status for filtering
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const bulkApproveProducts = (ids: string[]) => {
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, status: 'in_stock' as ProductStatus } : p));
  };

  const assignDelivery = (orderId: string, riderName: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId 
        ? { ...o, status: 'out_for_delivery' as OrderStatus, riderName } 
        : o
    ));
  };

  const toggleSellerStatus = (sellerId: string) => {
    setSellers(prev => prev.map(s => 
      s.id === sellerId 
        ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } 
        : s
    ));
  };

  return (
    <DataContext.Provider value={{ 
      products, 
      orders, 
      sellers, 
      updateProductStatus, 
      bulkApproveProducts,
      assignDelivery,
      toggleSellerStatus 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};