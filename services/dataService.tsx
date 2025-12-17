import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, Seller, ProductStatus, OrderStatus, SellerStatus } from '../types';
import { supabase } from '../lib/supabase';
import { samplePendingProducts, sampleOrders, sampleSellers } from '../constants';

interface DataContextType {
  products: Product[];
  orders: Order[];
  sellers: Seller[];
  updateProductStatus: (id: string, status: ProductStatus) => void;
  bulkApproveProducts: (ids: string[]) => void;
  assignDelivery: (orderId: string, riderName: string) => void;
  toggleSellerStatus: (sellerId: string) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(samplePendingProducts);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [sellers, setSellers] = useState<Seller[]>(sampleSellers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Set a safety timeout to ensure loading state doesn't get stuck
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 3000);

      try {
        const [productsRes, ordersRes, sellersRes] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('orders').select('*'),
          supabase.from('sellers').select('*')
        ]);

        if (productsRes.data && productsRes.data.length > 0) {
          const mappedProducts: Product[] = productsRes.data.map((p: any) => ({
            id: p.id,
            title: p.title,
            fabric: p.fabric,
            fit: p.fit,
            price: p.price,
            sizes: p.sizes || [],
            stock: p.stock,
            imageUrl: p.image_url,
            status: p.status as ProductStatus,
            sku: p.sku
          }));
          setProducts(mappedProducts);
        }

        if (ordersRes.data && ordersRes.data.length > 0) {
          const mappedOrders: Order[] = ordersRes.data.map((o: any) => ({
            id: o.id,
            productName: o.product_name,
            size: o.size,
            customerName: o.customer_name,
            address: o.address,
            createdAt: o.created_at,
            amount: o.amount,
            status: o.status as OrderStatus,
            riderName: o.rider_name,
            imageUrl: o.image_url
          }));
          setOrders(mappedOrders);
        } else {
          // Explicitly keep sample data if remote data is empty
          console.log('No remote orders found, keeping sample data.');
          setOrders(sampleOrders);
        }

        if (sellersRes.data && sellersRes.data.length > 0) {
          const mappedSellers: Seller[] = sellersRes.data.map((s: any) => ({
            id: s.id,
            name: s.name,
            shopName: s.shop_name,
            email: s.email,
            acceptanceRate: s.acceptance_rate,
            status: s.status as SellerStatus,
            joinedAt: s.joined_at
          }));
          setSellers(mappedSellers);
        }
      } catch (error) {
        console.warn('Supabase fetch failed or connection refused, using local data.', error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateProductStatus = async (id: string, status: ProductStatus) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    try {
      await supabase.from('products').update({ status }).eq('id', id);
    } catch (err) {
      console.error('Failed to sync product status:', err);
    }
  };

  const bulkApproveProducts = async (ids: string[]) => {
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, status: 'in_stock' as ProductStatus } : p));
    try {
      await supabase.from('products').update({ status: 'in_stock' }).in('id', ids);
    } catch (err) {
      console.error('Failed to sync bulk approval:', err);
    }
  };

  const assignDelivery = async (orderId: string, riderName: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: 'out_for_delivery' as OrderStatus, riderName } : o
    ));
    try {
      await supabase.from('orders').update({ rider_name: riderName, status: 'out_for_delivery' }).eq('id', orderId);
    } catch (err) {
      console.error('Failed to sync delivery assignment:', err);
    }
  };

  const toggleSellerStatus = async (sellerId: string) => {
    const seller = sellers.find(s => s.id === sellerId);
    if (!seller) return;
    const newStatus: SellerStatus = seller.status === 'active' ? 'suspended' : 'active';
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, status: newStatus } : s));
    try {
      await supabase.from('sellers').update({ status: newStatus }).eq('id', sellerId);
    } catch (err) {
      console.error('Failed to sync seller status:', err);
    }
  };

  return (
    <DataContext.Provider value={{ 
      products, 
      orders, 
      sellers, 
      updateProductStatus, 
      bulkApproveProducts,
      assignDelivery,
      toggleSellerStatus,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
