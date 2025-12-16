import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, Seller, ProductStatus, OrderStatus, SellerStatus } from '../types';
import { supabase } from '../lib/supabase';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, ordersRes, sellersRes] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('orders').select('*'),
          supabase.from('sellers').select('*')
        ]);

        if (productsRes.data) {
          // Map DB columns (snake_case) to Frontend types (camelCase)
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

        if (ordersRes.data) {
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
        }

        if (sellersRes.data) {
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
        console.error('Error fetching data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateProductStatus = async (id: string, status: ProductStatus) => {
    // Optimistic Update
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to update product status:', err);
      // Revert on failure could be implemented here
    }
  };

  const bulkApproveProducts = async (ids: string[]) => {
    // Optimistic Update
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, status: 'in_stock' as ProductStatus } : p));

    try {
      const { error } = await supabase
        .from('products')
        .update({ status: 'in_stock' })
        .in('id', ids);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to bulk approve products:', err);
    }
  };

  const assignDelivery = async (orderId: string, riderName: string) => {
    // Optimistic Update
    setOrders(prev => prev.map(o => 
      o.id === orderId 
        ? { ...o, status: 'out_for_delivery' as OrderStatus, riderName } 
        : o
    ));

    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          rider_name: riderName, 
          status: 'out_for_delivery' 
        })
        .eq('id', orderId);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to assign delivery:', err);
    }
  };

  const toggleSellerStatus = async (sellerId: string) => {
    const seller = sellers.find(s => s.id === sellerId);
    if (!seller) return;

    const newStatus: SellerStatus = seller.status === 'active' ? 'suspended' : 'active';

    // Optimistic Update
    setSellers(prev => prev.map(s => 
      s.id === sellerId 
        ? { ...s, status: newStatus } 
        : s
    ));

    try {
      const { error } = await supabase
        .from('sellers')
        .update({ status: newStatus })
        .eq('id', sellerId);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to toggle seller status:', err);
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
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};