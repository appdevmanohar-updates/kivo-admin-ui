import React, { useState } from 'react';
import { useData } from '../services/dataService';
import { Card, Badge, Button, Modal } from '../components/UI';
import { Order } from '../types';
import { Search, Truck, MapPin, User, Filter, ChevronDown, CheckCircle } from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders, assignDelivery } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [riderName, setRiderName] = useState('');

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedOrder && riderName) {
      assignDelivery(selectedOrder.id, riderName);
      setSelectedOrder(null);
      setRiderName('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Orders Management</h1>
          <p className="text-gray-400 mt-1">Track and manage customer orders.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
             <input 
               type="text" 
               placeholder="Search Order ID or Name" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-black border border-[#2A3038] text-gray-300 py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:border-corona-blue focus:ring-1 focus:ring-corona-blue transition-all"
             />
          </div>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#2A3038] text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-600">
             <Filter size={16} />
             <span>Filter</span>
             <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="bg-corona-card rounded-xl border border-[#2A3038] overflow-hidden">
         <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-[#0f1015] border-b border-[#2A3038]">
                 <tr>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order Details</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#2A3038]">
                 {filteredOrders.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No orders found matching your search.</td>
                    </tr>
                 ) : (
                    filteredOrders.map(order => (
                   <tr key={order.id} className="hover:bg-[#2A3038]/50 transition-colors">
                     <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded bg-[#2A3038] flex-shrink-0 overflow-hidden">
                                <img src={order.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="font-medium text-white text-sm">{order.id}</div>
                                <div className="text-xs text-gray-500 truncate max-w-[150px]">{order.productName} ({order.size})</div>
                            </div>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-300">{order.customerName}</span>
                            <span className="text-xs text-gray-500 truncate max-w-[150px]">{order.address}</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                     </td>
                     <td className="px-6 py-4 text-sm font-medium text-corona-yellow">
                        ₹{order.amount.toLocaleString()}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <Badge status={order.status} />
                       {order.riderName && (
                           <div className="flex items-center mt-1 text-[10px] text-gray-500">
                               <Truck size={10} className="mr-1" /> {order.riderName}
                           </div>
                       )}
                     </td>
                     <td className="px-6 py-4">
                        {order.status === 'pending' ? (
                            <Button size="sm" onClick={() => setSelectedOrder(order)}>
                                Assign Rider
                            </Button>
                        ) : (
                            <span className="text-xs text-gray-500 flex items-center">
                                <CheckCircle size={12} className="mr-1" />
                                Updated
                            </span>
                        )}
                     </td>
                   </tr>
                 )))}
               </tbody>
             </table>
         </div>
      </div>

      {/* Assign Rider Modal */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Assign Delivery Partner">
         <div className="p-6">
            <div className="mb-6 p-4 bg-[#0f1015] rounded-lg border border-[#2A3038]">
                <div className="flex items-center mb-3 text-gray-400 text-sm uppercase tracking-wide font-semibold">
                    <MapPin size={14} className="mr-2" /> Delivery Location
                </div>
                <p className="text-white text-sm leading-relaxed">{selectedOrder?.address}</p>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">Select Rider</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <select 
                        className="w-full bg-black border border-[#2A3038] text-white py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:border-corona-blue focus:ring-1 focus:ring-corona-blue appearance-none"
                        value={riderName}
                        onChange={(e) => setRiderName(e.target.value)}
                    >
                        <option value="">Choose a rider...</option>
                        <option value="Vikram Singh">Vikram Singh (4.8 ★)</option>
                        <option value="Rajesh Kumar">Rajesh Kumar (4.5 ★)</option>
                        <option value="Amit Patel">Amit Patel (4.9 ★)</option>
                        <option value="FastTrack Logistics">FastTrack Logistics (Agency)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setSelectedOrder(null)}>Cancel</Button>
                <Button disabled={!riderName} onClick={handleAssign}>Confirm Assignment</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};