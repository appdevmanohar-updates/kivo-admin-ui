import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

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
      } else {
        // Successful login will trigger auto-redirect in App.tsx via useAuth state change
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-corona-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-corona-pink/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-corona-pink via-purple-600 to-corona-blue flex items-center justify-center shadow-lg shadow-corona-pink/20 mx-auto mb-4">
            <span className="text-white font-black text-3xl tracking-tighter">K</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to access the KIVO Admin Portal</p>
        </div>

        <div className="relative bg-[#191c24]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-corona-red/10 border border-corona-red/20 text-corona-red px-4 py-3 rounded-lg flex items-center text-sm">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500 group-focus-within:text-corona-blue transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d0e12] border border-[#2A3038] text-white py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:border-corona-blue focus:ring-1 focus:ring-corona-blue transition-all placeholder-gray-600"
                  placeholder="admin@kivo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500 group-focus-within:text-corona-blue transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0d0e12] border border-[#2A3038] text-white py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:border-corona-blue focus:ring-1 focus:ring-corona-blue transition-all placeholder-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-corona-blue to-[#007bb5] text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-corona-blue/25 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Restricted Access. Authorized Personnel Only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};