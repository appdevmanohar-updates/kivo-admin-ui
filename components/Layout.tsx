import React from 'react';
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut, Bell, Search, Menu } from 'lucide-react';
import { clsx } from 'clsx';

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
      "w-full flex items-center space-x-4 px-6 py-4 transition-all duration-300 text-sm font-medium border-l-4 group relative overflow-hidden",
      isActive 
        ? "border-corona-pink text-white" // Pink border for active
        : "border-transparent text-gray-400 hover:text-white"
    )}
  >
    {/* Active Background Gradient Overlay */}
    {isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-corona-pink/20 to-transparent opacity-100 transition-opacity z-0"></div>
    )}
    
    {/* Hover Background */}
    {!isActive && (
       <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
    )}

    <div className={clsx("relative z-10 p-2 rounded-full transition-colors", 
      isActive ? "text-corona-pink" : "text-gray-500 group-hover:text-white"
    )}>
       <Icon size={18} />
    </div>
    <span className="relative z-10 tracking-wide">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">
      {/* Sidebar with Deep Gradient Background */}
      <aside className="w-64 bg-gradient-to-b from-[#191c24] via-[#15171e] to-black flex flex-col z-20 shadow-xl shadow-black/50 border-r border-[#2A3038]/50">
        <div className="h-20 flex items-center px-8 border-b border-[#2A3038]/50 bg-[#191c24]">
          <div className="flex items-center space-x-3 text-white">
            {/* Logo with Gradient Mix (Red/Pink to Blue) */}
            <div className="w-8 h-8 rounded bg-gradient-to-br from-corona-pink to-corona-blue flex items-center justify-center shadow-lg shadow-corona-pink/30">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold tracking-wider text-white">KIVO <span className="text-corona-pink text-sm align-top">Admin</span></span>
          </div>
        </div>

        <nav className="flex-1 mt-6 space-y-1 overflow-y-auto">
          <p className="px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Navigation</p>
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            isActive={currentPage === 'dashboard'} 
            onClick={() => onNavigate('dashboard')} 
          />
          <SidebarItem 
            icon={ShoppingBag} 
            label="Products" 
            isActive={currentPage === 'products'} 
            onClick={() => onNavigate('products')} 
          />
          <SidebarItem 
            icon={Package} 
            label="Orders" 
            isActive={currentPage === 'orders'} 
            onClick={() => onNavigate('orders')} 
          />
          <SidebarItem 
            icon={Users} 
            label="Sellers" 
            isActive={currentPage === 'sellers'} 
            onClick={() => onNavigate('sellers')} 
          />
        </nav>

        <div className="p-4 border-t border-[#2A3038]/50">
          <button 
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-white bg-gradient-to-r from-corona-red/10 to-transparent hover:from-corona-red/20 hover:shadow-lg hover:shadow-corona-red/10 transition-all rounded-lg group border border-corona-red/20"
            onClick={() => alert("Logging out...")}
          >
            <LogOut size={18} className="text-corona-red group-hover:text-white transition-colors" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-black">
        {/* Header */}
        <header className="h-20 bg-[#191c24] border-b border-[#2A3038] flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center space-x-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 bg-black border border-[#2A3038] rounded-lg text-sm text-gray-300 focus:outline-none focus:border-corona-pink focus:ring-1 focus:ring-corona-pink w-64 transition-all placeholder-gray-600"
                />
             </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              {/* Red Notification Dot for Contrast */}
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-corona-red rounded-full border-2 border-corona-card animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-[#2A3038]">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">Henry Klein</p>
                <p className="text-xs text-gray-500">Gold Member</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#2A3038] ring-2 ring-corona-card overflow-hidden">
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="h-full w-full object-cover opacity-90 hover:opacity-100" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-black">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};