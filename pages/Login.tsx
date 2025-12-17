import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Lock, Mail, AlertCircle, Loader2, ShieldCheck, ChevronRight } from 'lucide-react';

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
        setError(error.message || 'Verification failed. Please check credentials.');
      }
    } catch (err) {
      setError('Connection refused. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const useDemo = () => {
    setEmail('admin@kivo.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-corona-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-corona-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-corona-pink via-purple-600 to-corona-blue flex items-center justify-center shadow-2xl shadow-corona-pink/30 mx-auto mb-6">
            <span className="text-white font-black text-4xl tracking-tighter">K</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">KIVO <span className="text-corona-blue font-light">ADMIN</span></h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Restricted Access Terminal</p>
        </div>

        <div className="bg-[#191c24]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-corona-red/10 border border-corona-red/20 text-corona-red px-4 py-3 rounded-xl flex items-center text-sm animate-pulse">
                <AlertCircle size={18} className="mr-3 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Terminal</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-600 group-focus-within:text-corona-blue transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-[#2A3038] text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-corona-blue/50 focus:ring-4 focus:ring-corona-blue/5 transition-all placeholder-gray-700"
                  placeholder="admin@kivo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-600 group-focus-within:text-corona-blue transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-[#2A3038] text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-corona-blue/50 focus:ring-4 focus:ring-corona-blue/5 transition-all placeholder-gray-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-corona-blue to-purple-600 text-white font-bold py-4 rounded-2xl hover:shadow-[0_0_20px_rgba(0,144,231,0.3)] transition-all transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center text-lg"
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>Sign In <ChevronRight size={20} className="ml-2" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
             <p className="text-gray-500 text-[10px] mb-3 font-bold uppercase tracking-widest">Testing the portal?</p>
             <button 
                onClick={useDemo}
                className="text-corona-blue text-xs font-bold hover:underline bg-corona-blue/5 px-4 py-2 rounded-full border border-corona-blue/10"
             >
                Autofill Demo Credentials
             </button>
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center space-x-3 text-gray-600 opacity-50">
           <ShieldCheck size={16} />
           <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Grade Security</span>
        </div>
      </div>
    </div>
  );
};