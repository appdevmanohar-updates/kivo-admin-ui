import React from 'react';
import { useData } from '../services/dataService';
import { Card, Badge, Button } from '../components/UI';
import { Clock, ShoppingCart, Users, ChevronRight, CheckCircle, XCircle, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: number; icon: React.ElementType; color: string; trend?: string; trendUp?: boolean }> = ({ title, value, icon: Icon, color, trend, trendUp }) => (
  <Card className="flex items-center justify-between relative overflow-hidden h-full">
    <div className="z-10">
      <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
      <div className="flex items-end space-x-3">
         <h3 className="text-2xl font-bold text-white">{value}</h3>
         {trend && (
            <span className={`text-xs font-medium flex items-center mb-1.5 ${trendUp ? 'text-corona-green' : 'text-corona-red'}`}>
                {trendUp ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
                {trend}
            </span>
         )}
      </div>
    </div>
    <div className={`p-3 rounded-lg bg-${color}/10 text-${color} z-10`}>
      <Icon size={24} style={{ color: color === 'corona-red' ? '#fc424a' : color === 'corona-blue' ? '#0090e7' : '#00d25b' }} />
    </div>
    {/* Decorative glow */}
    <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-${color}/10 rounded-full blur-2xl`}></div>
  </Card>
);

export const Dashboard: React.FC = () => {
  const { products, orders, sellers, updateProductStatus } = useData();

  const pendingProducts = products.filter(p => p.status === 'pending');
  const openOrders = orders.filter(o => o.status === 'pending');
  const activeSellers = sellers.filter(s => s.status === 'active');
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
  const approvalQueue = pendingProducts.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Promotional Gradient Banner (Matches Reference) */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-corona-red opacity-90"></div>
        <div className="relative p-8 flex flex-col sm:flex-row items-center justify-between z-10">
           <div className="flex flex-col mb-4 sm:mb-0">
             <h2 className="text-2xl font-bold text-white mb-2">Curating Elegance, Defining Style.</h2>
             <p className="text-white/80 max-w-xl">"Fashion is not just what you wear, it's how you express your soul." At KIVO, we champion sustainable luxury and authentic craftsmanship.</p>
           </div>
           <button className="bg-white text-pink-600 px-6 py-2 rounded-lg font-bold shadow-xl hover:bg-gray-100 transition-colors flex items-center">
             <Sparkles size={18} className="mr-2" /> View Style Guide
           </button>
           
           {/* Decorative Background Circles */}
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
           <div className="absolute bottom-0 left-20 w-24 h-24 bg-purple-900/30 rounded-full blur-xl"></div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of your store performance.</p>
      </div>

      {/* Stats Grid - Now with RED, BLUE, GREEN mix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Red Card: Pending (Implies Action/Alert) */}
        <StatCard 
            title="Pending Approvals" 
            value={pendingProducts.length} 
            icon={Clock} 
            color="corona-red" 
            trend="-2.4% (delayed)"
            trendUp={false}
        />
        
        {/* Blue Card: Orders */}
        <StatCard 
            title="Open Orders" 
            value={openOrders.length} 
            icon={ShoppingCart} 
            color="corona-blue" 
            trend="+12.4% today"
            trendUp={true}
        />

        {/* Green Card: Active Sellers */}
        <StatCard 
            title="Active Sellers" 
            value={activeSellers.length} 
            icon={Users} 
            color="corona-green" 
            trend="Stable"
            trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Transaction History</h2>
            <button className="text-sm text-gray-400 hover:text-white flex items-center transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="bg-corona-card rounded-xl border border-[#2A3038] overflow-hidden">
             <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-[#0f1015] border-b border-[#2A3038]">
                 <tr>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order ID</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Item</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                   <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#2A3038]">
                 {recentOrders.map(order => (
                   <tr key={order.id} className="hover:bg-[#2A3038]/50 transition-colors">
                     <td className="px-6 py-4 font-medium text-gray-300 text-sm">#{order.id.split('-')[1]}</td>
                     <td className="px-6 py-4 text-sm text-gray-300">
                       <div className="flex items-center space-x-3">
                         <img src={order.imageUrl} alt="" className="w-8 h-8 rounded bg-[#2A3038] object-cover" />
                         <span>{order.productName}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-sm text-gray-400">{order.customerName}</td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <Badge status={order.status} />
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             </div>
          </div>
        </div>

        {/* Quick Approvals */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white">Pending Requests</h2>
          <div className="space-y-4">
            {approvalQueue.length === 0 ? (
              <Card className="flex flex-col items-center justify-center py-12 text-center bg-corona-card border border-[#2A3038]">
                 <div className="w-12 h-12 bg-[#2A3038] rounded-full flex items-center justify-center text-corona-green mb-3">
                   <CheckCircle size={24} />
                 </div>
                 <p className="text-white font-medium">All caught up!</p>
                 <p className="text-gray-500 text-sm">No pending products.</p>
              </Card>
            ) : (
              approvalQueue.map(product => (
                <div key={product.id} className="bg-corona-card p-4 rounded-xl border border-[#2A3038] flex flex-col space-y-3">
                   <div className="flex space-x-4">
                     <img src={product.imageUrl} className="w-16 h-20 rounded-lg object-cover bg-[#2A3038]" />
                     <div className="flex-1">
                       <h3 className="font-semibold text-white line-clamp-1">{product.title}</h3>
                       <p className="text-xs text-gray-400 mt-1">{product.fabric} • {product.fit}</p>
                       <p className="text-corona-yellow font-bold text-sm mt-1">₹{product.price.toLocaleString()}</p>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3 pt-2">
                     <button 
                       className="flex items-center justify-center py-2 rounded-lg text-sm font-medium border border-corona-red text-corona-red hover:bg-corona-red hover:text-white transition-all"
                       onClick={() => updateProductStatus(product.id, 'rejected')}
                     >
                       <XCircle size={16} className="mr-2" /> Reject
                     </button>
                     <button 
                       className="flex items-center justify-center py-2 rounded-lg text-sm font-medium bg-corona-green/10 text-corona-green border border-transparent hover:bg-corona-green hover:text-white transition-all"
                       onClick={() => updateProductStatus(product.id, 'in_stock')}
                     >
                       <CheckCircle size={16} className="mr-2" /> Approve
                     </button>
                   </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};