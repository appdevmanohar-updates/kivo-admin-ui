import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut, Bell, Search, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ElementType, 
  label: string, 
  isActive: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={clsx(
      "w-full flex items-center space-x-4 px-6 py-4 transition-all duration-300 text-sm font-medium border-l-[3px] group relative overflow-hidden mb-1",
      isActive 
        ? "border-corona-pink text-white" 
        : "border-transparent text-gray-500 hover:text-gray-200 hover:bg-white/5"
    )}
  >
    {isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-corona-pink/15 to-transparent z-0"></div>
    )}
    <div className={clsx("relative z-10 p-2 rounded-lg transition-all duration-300", 
      isActive ? "text-corona-pink bg-corona-pink/10 shadow-[0_0_10px_-5px_#e91e63]" : "text-gray-500 group-hover:text-white"
    )}>
       <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
    </div>
    <span className={clsx("relative z-10 tracking-wide transition-all", isActive ? "font-semibold translate-x-1" : "")}>{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans selection:bg-corona-pink selection:text-white">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-40 md:hidden backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside className={clsx(
        "fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0e12] flex flex-col shadow-2xl shadow-black border-r border-white/5 transform transition-transform duration-300 ease-out md:translate-x-0 md:static md:inset-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-24 flex items-center justify-between px-8 bg-gradient-to-b from-[#15171e] to-transparent">
          <div className="flex items-center space-x-3 text-white group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-corona-pink via-purple-600 to-corona-blue flex items-center justify-center shadow-lg shadow-corona-pink/20 shrink-0 group-hover:shadow-corona-pink/40 transition-all">
              <span className="text-white font-black text-xl tracking-tighter">K</span>
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-bold tracking-wider text-white leading-none">KIVO</span>
               <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold group-hover:text-corona-blue transition-colors">Admin Portal</span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white"><X size={24} /></button>
        </div>

        <nav className="flex-1 mt-8 space-y-2 overflow-y-auto px-0">
          <p className="px-8 mb-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Main Menu</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive={currentPage === 'dashboard'} onClick={() => handleNavigate('dashboard')} />
          <SidebarItem icon={ShoppingBag} label="Products" isActive={currentPage === 'products'} onClick={() => handleNavigate('products')} />
          <SidebarItem icon={Package} label="Orders" isActive={currentPage === 'orders'} onClick={() => handleNavigate('orders')} />
          <SidebarItem icon={Users} label="Sellers" isActive={currentPage === 'sellers'} onClick={() => handleNavigate('sellers')} />
        </nav>

        <div className="p-6 border-t border-white/5 bg-gradient-to-t from-[#15171e] to-transparent">
          <button 
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-white bg-white/5 hover:bg-corona-red/10 hover:border-corona-red/30 transition-all rounded-xl border border-white/5 group"
            onClick={logout}
          >
            <LogOut size={18} className="text-gray-400 group-hover:text-corona-red transition-colors" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-black">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-corona-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-corona-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

        <header className="h-20 bg-[#0d0e12]/70 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-10 z-20 sticky top-0 transition-all">
          <div className="flex items-center space-x-6 flex-1">
             <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(true)}><Menu size={24} /></button>
             <div className="relative w-full max-w-[240px] group hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 group-hover:text-corona-blue transition-colors" size={18} />
                <input type="text" placeholder="Type to search..." className="w-full pl-10 pr-4 py-2.5 bg-[#191c24] border border-white/5 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-corona-blue/50 focus:bg-[#191c24] focus:ring-1 focus:ring-corona-blue/50 transition-all placeholder-gray-600" />
             </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-corona-red rounded-full border-2 border-[#191c24] animate-pulse shadow-[0_0_8px_#fc424a]"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-white/10">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-white">{user?.email || 'Admin'}</p>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide">ADMINISTRATOR</p>
              </div>
              <div className="relative group cursor-pointer">
                 <div className="h-11 w-11 rounded-full p-[2px] bg-gradient-to-tr from-corona-pink to-corona-blue group-hover:shadow-[0_0_15px_-3px_rgba(233,30,99,0.5)] transition-shadow">
                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="h-full w-full object-cover rounded-full border-2 border-[#0d0e12]" />
                 </div>
                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-corona-green border-2 border-[#0d0e12] rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};