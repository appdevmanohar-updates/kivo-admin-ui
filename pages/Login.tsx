import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Lock, Mail, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await login(email, password);
      if (error) {
        setError(error.message || 'Invalid login credentials');
      }
    } catch (err) {
      setError('An unexpected connection error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-corona-blue/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-corona-pink/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-corona-pink via-purple-600 to-corona-blue flex items-center justify-center shadow-2xl shadow-corona-pink/30 mx-auto mb-6 transform hover:rotate-6 transition-transform cursor-pointer">
            <span className="text-white font-black text-4xl tracking-tighter">K</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Admin Portal</h1>
          <p className="text-gray-500 text-sm">Authorized access for KIVO Luxury Fashion</p>
        </div>

        <div className="bg-[#191c24]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-corona-red/10 border border-corona-red/20 text-corona-red px-4 py-3 rounded-xl flex items-center text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="mr-3 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500 group-focus-within:text-corona-blue transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-[#2A3038] text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-corona-blue/50 focus:ring-4 focus:ring-corona-blue/5 transition-all placeholder-gray-600"
                  placeholder="admin@kivo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500 group-focus-within:text-corona-blue transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-[#2A3038] text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-corona-blue/50 focus:ring-4 focus:ring-corona-blue/5 transition-all placeholder-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-corona-blue to-purple-600 text-white font-bold py-4 rounded-2xl hover:shadow-[0_0_20px_rgba(0,144,231,0.3)] transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-lg"
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                "Authenticate"
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center space-x-2 text-gray-600">
             <ShieldCheck size={14} />
             <span className="text-[10px] uppercase font-bold tracking-widest">End-to-End Secure Link</span>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-gray-600 font-medium">
          Forgot credentials? Contact <a href="#" className="text-corona-blue hover:underline">IT Security</a>
        </p>
      </div>
    </div>
  );
};