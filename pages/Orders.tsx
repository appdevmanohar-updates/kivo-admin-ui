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

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedOrder && riderName) {
      assignDelivery(selectedOrder.id, riderName);
      setSelectedOrder(null);
      setRiderName('');
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-10 h-10 border-4 border-corona-blue/20 border-t-corona-blue rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">Fetching Orders...</p>
            </div>
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
               placeholder="Search by ID, Name or Product..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-[#191c24] border border-[#2A3038] text-gray-300 py-3 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:border-corona-blue/50 focus:ring-1 focus:ring-corona-blue/50 transition-all placeholder-gray-600"
             />
          </div>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#191c24] text-gray-300 rounded-xl hover:bg-gray-800 transition-all border border-white/5 hover:border-white/10">
             <Filter size={18} />
             <span className="font-medium">Filters</span>
             <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="bg-[#191c24]/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
         <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-left">
               <thead className="bg-[#0f1015]/80 border-b border-[#2A3038]">
                 <tr>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Item Description</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Customer Details</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Purchase Date</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Value</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Status</th>
                   <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fulfillment</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {filteredOrders.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-6 py-24 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-600">
                                <PackageSearch size={64} className="mb-4 opacity-20" />
                                <h3 className="text-lg font-bold text-gray-400">No active orders found</h3>
                                <p className="text-sm">Try searching for a different ID or name.</p>
                            </div>
                        </td>
                    </tr>
                 ) : (
                    filteredOrders.map(order => (
                   <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors duration-200">
                     <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-[#0d0e12] border border-white/5 p-1 flex-shrink-0 overflow-hidden group-hover:border-corona-blue/30 transition-all">
                                <img src={order.imageUrl} alt="" className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <div>
                                <div className="font-bold text-corona-blue text-sm group-hover:text-white transition-colors">#{order.id.split('-')[1] || order.id}</div>
                                <div className="text-xs text-gray-500 font-medium truncate max-w-[160px]">{order.productName} • <span className="text-gray-400">{order.size}</span></div>
                            </div>
                        </div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-200">{order.customerName}</span>
                            <span className="text-xs text-gray-500 truncate max-w-[180px] mt-0.5">{order.address}</span>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-sm text-gray-400 whitespace-nowrap font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                     </td>
                     <td className="px-6 py-5 text-sm font-bold text-corona-yellow">
                        ₹{order.amount.toLocaleString()}
                     </td>
                     <td className="px-6 py-5 whitespace-nowrap">
                       <Badge status={order.status} />
                       {order.riderName && (
                           <div className="flex items-center mt-1.5 text-[10px] text-gray-400 font-medium">
                               <Truck size={12} className="mr-1.5 text-corona-blue" /> {order.riderName}
                           </div>
                       )}
                     </td>
                     <td className="px-6 py-5">
                        {order.status === 'pending' ? (
                            <Button 
                                size="sm" 
                                className="shadow-lg shadow-corona-blue/10"
                                onClick={() => setSelectedOrder(order)}
                            >
                                Assign Partner
                            </Button>
                        ) : (
                            <div className="text-xs text-corona-green font-bold flex items-center bg-corona-green/5 px-3 py-1.5 rounded-lg border border-corona-green/20 w-fit">
                                <CheckCircle size={14} className="mr-2" />
                                PROCESSED
                            </div>
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
            <div className="mb-8 p-5 bg-[#0d0e12] rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <MapPin size={48} />
                </div>
                <div className="flex items-center mb-4 text-gray-500 text-[10px] uppercase tracking-widest font-black">
                    <MapPin size={14} className="mr-2 text-corona-red" /> Destination Node
                </div>
                <p className="text-white text-base font-medium leading-relaxed">{selectedOrder?.address}</p>
                <div className="mt-4 flex items-center space-x-3 text-xs text-gray-500">
                    <span className="bg-white/5 px-2 py-1 rounded">Customer ID: CUST-{selectedOrder?.customerName.split(' ')[0].toUpperCase()}</span>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Logistics Partner</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-500 group-focus-within:text-corona-blue transition-colors" />
                    </div>
                    <select 
                        className="w-full bg-black border border-[#2A3038] text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-corona-blue/50 focus:ring-4 focus:ring-corona-blue/5 transition-all appearance-none cursor-pointer"
                        value={riderName}
                        onChange={(e) => setRiderName(e.target.value)}
                    >
                        <option value="">Select available partner...</option>
                        <option value="Vikram Singh">Vikram Singh • 4.8 ★ (Nearby)</option>
                        <option value="Rajesh Kumar">Rajesh Kumar • 4.5 ★ (Express)</option>
                        <option value="Amit Patel">Amit Patel • 4.9 ★ (Elite)</option>
                        <option value="FastTrack Agency">FastTrack Logistics • 4.2 ★</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" className="flex-1 py-4" onClick={() => setSelectedOrder(null)}>Dismiss</Button>
                <Button disabled={!riderName} className="flex-1 py-4 text-lg font-bold" onClick={handleAssign}>Initiate Delivery</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};