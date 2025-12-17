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
      
      // Safety timeout to prevent infinite loading screens
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2500);

      try {
        const [productsRes, ordersRes, sellersRes] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('orders').select('*'),
          supabase.from('sellers').select('*')
        ]);

        if (productsRes.data && productsRes.data.length > 0) {
          const mappedProducts: Product[] = productsRes.data.map((p: any) => ({
            id: p.id || '',
            title: p.title || 'Untitled',
            fabric: p.fabric || 'N/A',
            fit: p.fit || 'N/A',
            price: p.price || 0,
            sizes: p.sizes || [],
            stock: p.stock || 0,
            imageUrl: p.image_url || '',
            status: (p.status as ProductStatus) || 'pending',
            sku: p.sku || ''
          }));
          setProducts(mappedProducts);
        }

        if (ordersRes.data && ordersRes.data.length > 0) {
          const mappedOrders: Order[] = ordersRes.data.map((o: any) => ({
            id: o.id || '',
            productName: o.product_name || 'Unknown Product',
            size: o.size || '-',
            customerName: o.customer_name || 'Guest',
            address: o.address || '',
            createdAt: o.created_at || new Date().toISOString(),
            amount: o.amount || 0,
            status: (o.status as OrderStatus) || 'pending',
            riderName: o.rider_name,
            imageUrl: o.image_url || ''
          }));
          setOrders(mappedOrders);
        } else if (orders.length === 0) {
          // If remote is empty and we don't have local data yet, ensure sample is used
          setOrders(sampleOrders);
        }

        if (sellersRes.data && sellersRes.data.length > 0) {
          const mappedSellers: Seller[] = sellersRes.data.map((s: any) => ({
            id: s.id || '',
            name: s.name || 'Unknown',
            shopName: s.shop_name || 'Unnamed Shop',
            email: s.email || '',
            acceptanceRate: s.acceptance_rate || 0,
            status: (s.status as SellerStatus) || 'active',
            joinedAt: s.joined_at || new Date().toISOString()
          }));
          setSellers(mappedSellers);
        }
      } catch (error) {
        console.warn('Data sync failed, continuing with cached/sample data.', error);
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