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
  
  const getPageFromHash = () => window.location.hash.replace('#/', '').replace('#', '') || 'dashboard';
  const [currentPage, setCurrentPage] = useState(getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
       <div className="h-screen bg-black flex items-center justify-center">
         <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-corona-pink to-corona-blue mb-4"></div>
            <div className="text-gray-500 text-sm tracking-widest uppercase">Loading Portal...</div>
         </div>
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