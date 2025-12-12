import React from 'react';
import { useData } from '../services/dataService';
import { Card, Badge, Button } from '../components/UI';
import { Clock, ShoppingCart, Users, ChevronRight, CheckCircle, XCircle, TrendingUp, TrendingDown, Sparkles, ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

const StatCard: React.FC<{ title: string; value: number; icon: React.ElementType; color: string; trend?: string; trendUp?: boolean }> = ({ title, value, icon: Icon, color, trend, trendUp }) => {
    // Dynamic color mapping for Tailwind arbitrary values isn't ideal, so we map to specific classes or inline styles where needed.
    // Using inline styles for the specific glow colors to keep it simpler than large switch statements
    const glowColor = color === 'corona-red' ? '#fc424a' : color === 'corona-blue' ? '#0090e7' : '#00d25b';
    
    return (
      <div className="relative group bg-[#191c24]/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Background Glow */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-110" style={{ backgroundColor: glowColor }}></div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
            <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
            
            {trend && (
                <div className="mt-3 flex items-center">
                    <span className={clsx("flex items-center text-xs font-bold px-2 py-0.5 rounded-full border bg-opacity-10", 
                        trendUp ? "text-corona-green border-corona-green/20 bg-corona-green" : "text-corona-red border-corona-red/20 bg-corona-red"
                    )}>
                        {trendUp ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                        {trend}
                    </span>
                </div>
            )}
          </div>
          
          <div className={clsx("p-3 rounded-xl border border-white/5 shadow-inner", 
             color === 'corona-red' ? "bg-corona-red/10 text-corona-red" : 
             color === 'corona-blue' ? "bg-corona-blue/10 text-corona-blue" : 
             "bg-corona-green/10 text-corona-green"
          )}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    );
};

export const Dashboard: React.FC = () => {
  const { products, orders, sellers, updateProductStatus } = useData();

  const pendingProducts = products.filter(p => p.status === 'pending');
  const openOrders = orders.filter(o => o.status === 'pending');
  const activeSellers = sellers.filter(s => s.status === 'active');
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
  const approvalQueue = pendingProducts.slice(0, 3);

  // Date formatter
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <p className="text-corona-blue text-xs font-bold tracking-widest uppercase mb-1">{today}</p>
           <h1 className="text-3xl font-bold text-white tracking-wide">Dashboard</h1>
        </div>
        <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#191c24] border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-corona-blue/50 transition-all">
                <Sparkles size={16} className="text-corona-yellow" />
                <span>Customize</span>
            </button>
            <button className="bg-corona-blue text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-corona-blue/20 hover:shadow-corona-blue/40 transition-all">
                Generate Report
            </button>
        </div>
      </div>

      {/* Promotional Gradient Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-black/80 to-transparent"></div>
        
        <div className="relative p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between z-10">
           <div className="flex flex-col mb-6 sm:mb-0 max-w-2xl">
             <div className="flex items-center space-x-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-corona-pink text-white uppercase tracking-wider">New Season</span>
                <span className="h-px w-8 bg-white/30"></span>
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">Curating Elegance, <br/>Defining Style.</h2>
             <p className="text-gray-300 text-sm md:text-base max-w-lg leading-relaxed">"Fashion is not just what you wear, it's how you express your soul." Explore our latest guidelines for the upcoming Summer Collection.</p>
           </div>
           
           <button className="group relative px-6 py-3 bg-white text-black rounded-xl font-bold overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow">
             <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="relative flex items-center z-10">
                View Style Guide <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </span>
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Pending Approvals" 
            value={pendingProducts.length} 
            icon={Clock} 
            color="corona-red" 
            trend="Needs Attention"
            trendUp={false}
        />
        <StatCard 
            title="Open Orders" 
            value={openOrders.length} 
            icon={ShoppingCart} 
            color="corona-blue" 
            trend="+12.4% vs yesterday"
            trendUp={true}
        />
        <StatCard 
            title="Active Sellers" 
            value={activeSellers.length} 
            icon={Users} 
            color="corona-green" 
            trend="Stable Growth"
            trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders - Embedded Table Style */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-white">Transaction History</h2>
            <button className="text-xs text-corona-blue hover:text-white flex items-center transition-colors font-medium">
              VIEW ALL TRANSACTIONS <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="bg-[#191c24]/60 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-xl">
             <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-white/5 bg-white/[0.02]">
                   <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                   <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                   <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                   <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {recentOrders.map(order => (
                   <tr key={order.id} className="group hover:bg-white/[0.03] transition-colors duration-200">
                     <td className="px-6 py-4 font-medium text-corona-blue text-sm group-hover:text-white transition-colors">#{order.id.split('-')[1]}</td>
                     <td className="px-6 py-4 text-sm text-gray-300">
                       <div className="flex items-center space-x-3">
                         <div className="w-9 h-9 rounded-lg bg-[#2A3038] p-0.5 border border-white/10 overflow-hidden">
                            <img src={order.imageUrl} alt="" className="w-full h-full object-cover rounded-md" />
                         </div>
                         <span className="font-medium group-hover:text-white transition-colors">{order.productName}</span>
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

        {/* Quick Approvals - Floating Cards */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-white">Pending Requests</h2>
            <span className="text-xs text-gray-500 font-mono">{approvalQueue.length} PENDING</span>
          </div>
          
          <div className="space-y-4">
            {approvalQueue.length === 0 ? (
              <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed">
                 <div className="w-14 h-14 bg-[#2A3038] rounded-full flex items-center justify-center text-corona-green mb-4 shadow-lg shadow-corona-green/10">
                   <CheckCircle size={28} />
                 </div>
                 <p className="text-white font-medium">All caught up!</p>
                 <p className="text-gray-500 text-sm mt-1">No pending products.</p>
              </Card>
            ) : (
              approvalQueue.map((product, idx) => (
                <div 
                    key={product.id} 
                    className="bg-[#191c24] p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/40 group relative overflow-hidden"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                   {/* Card Highlight on Hover */}
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-corona-yellow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="flex space-x-4">
                     <div className="w-16 h-20 rounded-lg overflow-hidden bg-[#0d0e12] shrink-0 border border-white/5">
                        <img src={product.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-white truncate pr-2 group-hover:text-corona-yellow transition-colors">{product.title}</h3>
                          <span className="text-[10px] font-bold text-gray-600 border border-gray-800 px-1.5 py-0.5 rounded">{product.stock} left</span>
                       </div>
                       <p className="text-xs text-gray-500 mt-1 truncate">{product.fabric} • {product.fit}</p>
                       <p className="text-white font-bold text-sm mt-2">₹{product.price.toLocaleString()}</p>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3 pt-4 mt-2 border-t border-white/5">
                     <button 
                       className="flex items-center justify-center py-2 rounded-lg text-xs font-bold uppercase tracking-wide border border-corona-red/30 text-corona-red hover:bg-corona-red hover:text-white hover:border-corona-red transition-all"
                       onClick={() => updateProductStatus(product.id, 'rejected')}
                     >
                       <XCircle size={14} className="mr-2" /> Reject
                     </button>
                     <button 
                       className="flex items-center justify-center py-2 rounded-lg text-xs font-bold uppercase tracking-wide bg-corona-green/10 text-corona-green border border-transparent hover:bg-corona-green hover:text-white hover:shadow-lg hover:shadow-corona-green/20 transition-all"
                       onClick={() => updateProductStatus(product.id, 'in_stock')}
                     >
                       <CheckCircle size={14} className="mr-2" /> Approve
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