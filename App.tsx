import React, { useState, useEffect } from 'react';
import { DataProvider } from './services/dataService';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Sellers } from './pages/Sellers';
import { Login } from './pages/Login';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || 'dashboard';
  };
  
  const [currentPage, setCurrentPage] = useState(getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Strict route protection
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && currentPage !== 'login') {
        window.location.hash = '/login';
      } else if (isAuthenticated && currentPage === 'login') {
        window.location.hash = '/dashboard';
      }
    }
  }, [isAuthenticated, currentPage, loading]);

  const navigate = (page: string) => {
    window.location.hash = `/${page}`;
  };

  if (loading) {
     return (
       <div className="h-screen bg-black flex flex-col items-center justify-center">
         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-corona-pink to-corona-blue animate-pulse mb-6 flex items-center justify-center shadow-2xl shadow-corona-pink/20">
            <span className="text-white font-black text-2xl">K</span>
         </div>
         <div className="flex flex-col items-center space-y-2">
            <div className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">Initializing Portal</div>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-corona-blue w-1/3 animate-[loading_1.5s_infinite_ease-in-out]"></div>
            </div>
         </div>
         <style>{`
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(300%); }
            }
         `}</style>
       </div>
     );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'orders': return <Orders />;
      case 'sellers': return <Sellers />;
      default: return <Dashboard />;
    }
  };

  return (
    <DataProvider>
      <Layout currentPage={currentPage} onNavigate={navigate}>
        {renderPage()}
      </Layout>
    </DataProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;