import { Product, Order, Seller } from './types';

export const samplePendingProducts: Product[] = [
  {
    id: 'P001',
    title: 'Royal Silk Banarasi Saree',
    fabric: 'Pure Silk',
    fit: 'Drape',
    price: 18500,
    sizes: ['Free Size'],
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1610189012906-4783382c52e4?q=80&w=600&auto=format&fit=crop',
    status: 'pending',
    sku: 'KIVO-SILK-001'
  },
  {
    id: 'P002',
    title: 'Midnight Velvet Blazer',
    fabric: 'Italian Velvet',
    fit: 'Slim Tailored',
    price: 12499,
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    status: 'pending',
    sku: 'KIVO-VEL-002'
  },
  {
    id: 'P003',
    title: 'Bohemian Floral Maxi',
    fabric: 'Chiffon',
    fit: 'Flowing',
    price: 4800,
    sizes: ['XS', 'S', 'M'],
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
    status: 'pending',
    sku: 'KIVO-BOHO-003'
  },
  {
    id: 'P004',
    title: 'Minimalist Linen Set',
    fabric: 'Organic Linen',
    fit: 'Relaxed',
    price: 6500,
    sizes: ['M', 'L', 'XL'],
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    status: 'pending',
    sku: 'KIVO-LIN-004'
  },
  {
    id: 'P005',
    title: 'Urban Street Jacket',
    fabric: 'Denim & Leather',
    fit: 'Oversized',
    price: 8900,
    sizes: ['S', 'M', 'L'],
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1551488852-080175923fab?q=80&w=600&auto=format&fit=crop',
    status: 'in_stock', 
    sku: 'KIVO-URB-005'
  },
  {
    id: 'P006',
    title: 'Emerald Evening Gown',
    fabric: 'Satin',
    fit: 'Bodycon',
    price: 15000,
    sizes: ['S', 'M'],
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
    status: 'pending',
    sku: 'KIVO-EVE-006'
  },
  {
    id: 'P007',
    title: 'Handcrafted Leather Tote',
    fabric: 'Full Grain Leather',
    fit: 'One Size',
    price: 22000,
    sizes: ['One Size'],
    stock: 3,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
    status: 'pending',
    sku: 'KIVO-ACC-007'
  }
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-7782',
    productName: 'Royal Silk Banarasi Saree',
    size: 'Free Size',
    customerName: 'Ananya Gupta',
    address: '12, Palm Grove, Mumbai, MH',
    createdAt: '2023-10-25T10:30:00',
    amount: 18500,
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1610189012906-4783382c52e4?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'ORD-7783',
    productName: 'Urban Street Jacket',
    size: 'L',
    customerName: 'Rahul Verma',
    address: '4B, Green Park, Delhi, DL',
    createdAt: '2023-10-25T11:15:00',
    amount: 8900,
    status: 'out_for_delivery',
    riderName: 'Vikram Singh',
    imageUrl: 'https://images.unsplash.com/photo-1551488852-080175923fab?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'ORD-7784',
    productName: 'Bohemian Floral Maxi',
    size: 'M',
    customerName: 'Priya Sharma',
    address: '88, Lake View, Bangalore, KA',
    createdAt: '2023-10-25T12:00:00',
    amount: 4800,
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=200&auto=format&fit=crop'
  }
];

export const sampleSellers: Seller[] = [
  {
    id: 'S001',
    name: 'Ethnic Weaves Ltd.',
    shopName: 'The Silk Route',
    email: 'contact@ethnicweaves.com',
    acceptanceRate: 98,
    status: 'active',
    joinedAt: '2023-01-15'
  },
  {
    id: 'S002',
    name: 'Urban Threads',
    shopName: 'Urban Mode',
    email: 'hello@urbanthreads.io',
    acceptanceRate: 85,
    status: 'active',
    joinedAt: '2023-03-22'
  },
  {
    id: 'S003',
    name: 'Jaipur Block Prints',
    shopName: 'Rajasthan Colors',
    email: 'info@jaipurblocks.net',
    acceptanceRate: 62,
    status: 'suspended',
    joinedAt: '2023-05-10'
  }
];