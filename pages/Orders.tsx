import React, { useState } from 'react';
import { useData } from '../services/dataService';
import { Card, Badge, Button, Modal } from '../components/UI';
import { Order } from '../types';
import { Truck, MapPin, Calendar, Package, Search } from 'lucide-react';
import { format } from 'date-fns';

export const Orders: React.FC = () => {
  const { orders, assignDelivery } = useData();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [riderName, setRiderName] = useState('');

  const handleAssignClick = (order: Order) => {
    setSelectedOrder(order);
    setRiderName('');
  };

  const submitAssignment = () => {
    if (selectedOrder && riderName.trim()) {
      assignDelivery(selectedOrder.id, riderName);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Orders</h1>
          <p className="text-gray-400 mt-1">Manage customer orders and logistics.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Order ID, Customer..." 
            className="pl-10 pr-4 py-2.5 bg-black border border-[#2A3038] rounded-lg w-full md:w-80 focus:border-corona-blue focus:ring-1 focus:ring-corona-blue outline-none text-white placeholder-gray-600"
          />
        </div>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id} className="flex flex-col md:flex-row md:items-center p-0 overflow-hidden border border-[#2A3038] hover:border-corona-blue/50">
             {/* Left color bar based on status */}
             <div className={`h-2 md:h-auto md:w-1 self-stretch ${order.status === 'out_for_delivery' ? 'bg-corona-blue' : order.status === 'delivered' ? 'bg-corona-green' : 'bg-[#2A3038]'}`}></div>
             
             <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Product Info */}
                <div className="md:col-span-4 flex items-center space-x-4">
                   <div className="relative h-16 w-16 rounded-lg bg-[#0f1015] overflow-hidden border border-[#2A3038] shrink-0">
                      <img src={order.imageUrl} className="h-full w-full object-cover opacity-80" alt="Product" />
                   </div>
                   <div>
                      <p className="text-xs text-corona-blue font-medium mb-1">{order.id}</p>
                      <h4 className="font-bold text-white line-clamp-1">{order.productName}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">Size: <span className="font-medium text-gray-300">{order.size}</span></p>
                   </div>
                </div>

                {/* Customer Details */}
                <div className="md:col-span-3 space-y-1">
                   <div className="flex items-center text-gray-200 text-sm font-medium">
                      <UsersIcon className="w-4 h-4 mr-2 text-gray-500" />
                      {order.customerName}
                   </div>
                   <div className="flex items-start text-gray-500 text-xs leading-relaxed">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                      {order.address}
                   </div>
                </div>

                {/* Date & Price */}
                <div className="md:col-span-2 text-right md:text-left">
                   <div className="flex items-center text-gray-500 text-xs mb-1">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {format(new Date(order.createdAt), 'MMM dd, HH:mm')}
                   </div>
                   <p className="font-bold text-white">₹{order.amount.toLocaleString()}</p>
                </div>

                {/* Status & Action */}
                <div className="md:col-span-3 flex flex-col items-end space-y-3">
                   <Badge status={order.status} />
                   
                   {order.status === 'pending' && (
                     <Button 
                        size="sm" 
                        variant="primary" 
                        onClick={() => handleAssignClick(order)}
                        className="shadow-sm"
                      >
                        <Truck size={14} className="mr-2" /> Assign Delivery
                     </Button>
                   )}
                   {order.status === 'out_for_delivery' && (
                     <div className="text-xs text-right">
                       <span className="text-gray-500 block">Rider</span>
                       <span className="font-medium text-corona-blue">{order.riderName}</span>
                     </div>
                   )}
                </div>
             </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Assign Delivery Partner">
        <div className="p-6 bg-corona-card">
           <div className="bg-corona-blue/10 border border-corona-blue/20 p-4 rounded-lg flex items-start space-x-3 mb-6">
             <Package className="text-corona-blue mt-1" size={20} />
             <div>
               <p className="text-sm font-bold text-corona-blue">Order #{selectedOrder?.id}</p>
               <p className="text-sm text-gray-400 mt-1">{selectedOrder?.address}</p>
             </div>
           </div>

           <div className="space-y-4">
             <label className="block text-sm font-medium text-gray-300">Select Rider / Logistics Partner</label>
             <input 
               autoFocus
               type="text" 
               className="w-full px-4 py-2 bg-black border border-[#2A3038] rounded-lg focus:border-corona-blue focus:ring-1 focus:ring-corona-blue outline-none text-white placeholder-gray-600 transition-all"
               placeholder="Enter rider name (e.g. Vikram Singh)"
               value={riderName}
               onChange={(e) => setRiderName(e.target.value)}
             />
             <p className="text-xs text-gray-500">This will trigger a notification to the customer.</p>
           </div>

           <div className="mt-8 flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setSelectedOrder(null)}>Cancel</Button>
              <Button variant="primary" disabled={!riderName.trim()} onClick={submitAssignment}>Confirm Assignment</Button>
           </div>
        </div>
      </Modal>
    </div>
  );
};

const UsersIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);