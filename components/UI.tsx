import React from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

// --- Card ---
// Updated to have a premium glass-like feel with subtle borders and shadows
export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, onClick }) => (
  <div 
    onClick={onClick} 
    className={clsx(
      "relative bg-[#191c24]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 group overflow-hidden", 
      className
    )}
  >
    {/* Subtle gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    <div className="relative z-10">
        {children}
    </div>
  </div>
);

// --- Badge ---
// Added a glow effect using text-shadow/box-shadow simulation via Tailwind
export const Badge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    pending: "text-corona-yellow border-corona-yellow/30 bg-corona-yellow/5 shadow-[0_0_10px_-4px_#ffab00]",
    in_stock: "text-corona-green border-corona-green/30 bg-corona-green/5 shadow-[0_0_10px_-4px_#00d25b]",
    approved: "text-corona-green border-corona-green/30 bg-corona-green/5 shadow-[0_0_10px_-4px_#00d25b]",
    out_for_delivery: "text-corona-blue border-corona-blue/30 bg-corona-blue/5 shadow-[0_0_10px_-4px_#0090e7]",
    delivered: "text-corona-green border-corona-green/30 bg-corona-green/5 shadow-[0_0_10px_-4px_#00d25b]",
    cancelled: "text-corona-red border-corona-red/30 bg-corona-red/5 shadow-[0_0_10px_-4px_#fc424a]",
    rejected: "text-corona-red border-corona-red/30 bg-corona-red/5 shadow-[0_0_10px_-4px_#fc424a]",
    active: "text-corona-green border-corona-green/30 bg-corona-green/5 shadow-[0_0_10px_-4px_#00d25b]",
    suspended: "text-corona-red border-corona-red/30 bg-corona-red/5 shadow-[0_0_10px_-4px_#fc424a]",
  };

  const label = status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <span className={clsx("px-2.5 py-1 rounded border text-[11px] uppercase tracking-wider font-bold whitespace-nowrap backdrop-blur-sm", styles[status] || "text-gray-400 border-gray-600")}>
      {label}
    </span>
  );
};

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-corona-blue to-[#007bb5] text-white hover:shadow-lg hover:shadow-corona-blue/25 border border-transparent",
    success: "bg-gradient-to-r from-corona-green to-[#00a347] text-white hover:shadow-lg hover:shadow-corona-green/25 border border-transparent",
    secondary: "bg-[#2A3038]/50 text-gray-300 border border-white/5 hover:bg-[#2A3038] hover:text-white hover:border-white/10",
    danger: "bg-gradient-to-r from-corona-red to-[#d4353d] text-white hover:shadow-lg hover:shadow-corona-red/25 border border-transparent",
    outline: "bg-transparent text-corona-yellow border border-corona-yellow/50 hover:bg-corona-yellow/10 hover:border-corona-yellow hover:shadow-[0_0_15px_-5px_#ffab00]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button className={clsx(baseStyle, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};

// --- Modal ---
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode, title?: string }> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-[#191c24] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
        {/* Modal Header Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-corona-pink via-corona-blue to-corona-green"></div>
        
        <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#191c24]/50 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-corona-red hover:border-transparent border border-transparent hover:shadow-[0_0_10px_#fc424a]">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};