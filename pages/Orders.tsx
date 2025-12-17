import React, { useState } from 'react';
import { useData } from '../services/dataService';
import { Card, Badge, Button, Modal } from '../components/UI';
import { Order } from '../types';
import { Search, Truck, MapPin, User, Filter, ChevronDown, CheckCircle, PackageSearch } from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders, assignDelivery, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [riderName, setRiderName] = useState('');

  // Search logic that handles empty strings correctly
  const filteredOrders = orders.filter(order => {
    const search = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(search) ||
      order.customerName.toLowerCase().includes(search) ||
      order.productName.toLowerCase().includes(search)
    );
  });

  const handleAssign = () => {
    if (selectedOrder && riderName) {
      assignDelivery(selectedOrder.id, riderName);
      setSelectedOrder(null);
      setRiderName('');
    }
  };

  // Only show full-screen loader if we have absolutely no data yet
  if (loading && orders.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-corona-blue border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold tracking-widest uppercase">Syncing Orders...</p>
        </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Orders Management</h1>
          <p className="text-gray-400 mt-1">Real-time logistics and fulfillment tracking.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
             <input 
               type="text" 
               placeholder="Search Orders..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-[#191c24] border border-[#2A3038] text-gray-300 py-3 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:border-corona-blue transition-all"
             />
          </div>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#191c24] text-gray-300 rounded-xl hover:bg-gray-800 transition-all border border-white/5">
             <Filter size={18} />
             <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-[#191c24]/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-[#0f1015] border-b border-[#2A3038]">
                 <tr>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Order Details</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Amount</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {filteredOrders.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-6 py-32 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-600">
                                <PackageSearch size={64} className="mb-4 opacity-20" />
                                <h3 className="text-xl font-bold text-gray-400">No orders found</h3>
                                <p className="text-sm">We couldn't find any orders matching your criteria.</p>
                            </div>
                        </td>
                    </tr>
                 ) : (
                    filteredOrders.map(order => (
                   <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                     <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                            <img src={order.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-900" />
                            <div>
                                <div className="font-bold text-corona-blue text-sm">#{order.id}</div>
                                <div className="text-xs text-gray-500">{order.productName}</div>
                            </div>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="text-sm font-bold text-gray-200">{order.customerName}</div>
                        <div className="text-[10px] text-gray-500 truncate max-w-[150px]">{order.address}</div>
                     </td>
                     <td className="px-6 py-5 text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                     </td>
                     <td className="px-6 py-5 text-sm font-bold text-corona-yellow">
                        ₹{order.amount.toLocaleString()}
                     </td>
                     <td className="px-6 py-5">
                       <Badge status={order.status} />
                       {order.riderName && <div className="text-[10px] text-gray-400 mt-1 flex items-center"><Truck size={10} className="mr-1" /> {order.riderName}</div>}
                     </td>
                     <td className="px-6 py-5">
                        {order.status === 'pending' ? (
                            <Button size="sm" onClick={() => setSelectedOrder(order)}>Assign Partner</Button>
                        ) : (
                            <span className="text-[10px] text-corona-green font-bold flex items-center"><CheckCircle size={14} className="mr-1" /> PROCESSED</span>
                        )}
                     </td>
                   </tr>
                 )))}
               </tbody>
             </table>
         </div>
      </div>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Fulfillment">
         <div className="p-6">
            <div className="mb-6 p-4 bg-[#0d0e12] rounded-xl border border-white/5">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Delivery Address</p>
                <p className="text-white text-sm">{selectedOrder?.address}</p>
            </div>

            <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Select Rider</label>
                <select 
                    className="w-full bg-black border border-[#2A3038] text-white py-4 px-4 rounded-xl focus:outline-none focus:border-corona-blue appearance-none"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                >
                    <option value="">Choose a delivery partner...</option>
                    <option value="Vikram Singh">Vikram Singh (Express)</option>
                    <option value="Rajesh Kumar">Rajesh Kumar (Standard)</option>
                    <option value="Amit Patel">Amit Patel (Luxury Delivery)</option>
                </select>
            </div>

            <div className="mt-8 flex space-x-4">
                <Button variant="secondary" className="flex-1" onClick={() => setSelectedOrder(null)}>Cancel</Button>
                <Button disabled={!riderName} className="flex-1" onClick={handleAssign}>Confirm Delivery</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};
