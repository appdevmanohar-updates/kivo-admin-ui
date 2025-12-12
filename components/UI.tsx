import React from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, onClick }) => (
  <div onClick={onClick} className={clsx("bg-corona-card rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-black/40", className)}>
    {children}
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ status: string }> = ({ status }) => {
  // Map statuses to Corona Neon colors
  // Style: Transparent bg with colored border and text
  const styles: Record<string, string> = {
    pending: "text-corona-yellow border-corona-yellow/30 bg-corona-yellow/10",
    in_stock: "text-corona-green border-corona-green/30 bg-corona-green/10",
    approved: "text-corona-green border-corona-green/30 bg-corona-green/10",
    out_for_delivery: "text-corona-blue border-corona-blue/30 bg-corona-blue/10",
    delivered: "text-corona-green border-corona-green/30 bg-corona-green/10",
    cancelled: "text-corona-red border-corona-red/30 bg-corona-red/10",
    rejected: "text-corona-red border-corona-red/30 bg-corona-red/10",
    active: "text-corona-green border-corona-green/30 bg-corona-green/10",
    suspended: "text-corona-red border-corona-red/30 bg-corona-red/10",
  };

  const label = status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <span className={clsx("px-3 py-1 rounded-md text-xs font-bold border whitespace-nowrap", styles[status] || "text-gray-400 border-gray-600")}>
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
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-corona-blue text-white hover:bg-opacity-80 shadow-lg shadow-corona-blue/20",
    success: "bg-corona-green text-white hover:bg-opacity-80 shadow-lg shadow-corona-green/20",
    secondary: "bg-[#2A3038] text-gray-300 border border-transparent hover:bg-gray-700 hover:text-white",
    danger: "bg-corona-red text-white hover:bg-opacity-80 shadow-lg shadow-corona-red/20",
    outline: "bg-transparent text-corona-yellow border border-corona-yellow hover:bg-corona-yellow hover:text-black"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-corona-card border border-[#2A3038] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-[#2A3038]">
          <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-[#2A3038] p-2 rounded-full hover:bg-corona-red hover:border-corona-red">
            <X size={20} />
          </button>
        </div>
        <div className="p-0">
          {children}
        </div>
      </div>
    </div>
  );
};