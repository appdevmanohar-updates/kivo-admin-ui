export type ProductStatus = 'pending' | 'in_stock' | 'rejected';

export interface Product {
  id: string;
  title: string;
  fabric: string;
  fit: string;
  price: number;
  sizes: string[];
  stock: number;
  imageUrl: string;
  status: ProductStatus;
  sku: string;
}

export type OrderStatus = 'pending' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  productName: string;
  size: string;
  customerName: string;
  address: string;
  createdAt: string;
  amount: number;
  status: OrderStatus;
  riderName?: string;
  imageUrl: string;
}

export type SellerStatus = 'active' | 'suspended';

export interface Seller {
  id: string;
  name: string;
  shopName: string;
  email: string;
  acceptanceRate: number; // percentage
  status: SellerStatus;
  joinedAt: string;
}
