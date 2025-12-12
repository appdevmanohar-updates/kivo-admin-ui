import React, { useState } from 'react';
import { DataProvider } from './services/dataService';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Sellers } from './pages/Sellers';

// Simple Router implementation based on state, since react-router-dom wasn't strictly required
// but the prompt mentions "Router" in context of structure.
// I will use simple conditional rendering for spa-like feel without URL changes if not needed,
// but let's sync with hash for reload persistence.

const AppContent: React.FC = () => {
  // Simple hash router logic
  const getPageFromHash = () => window.location.hash.replace('#/', '') || 'dashboard';
  const [currentPage, setCurrentPage] = useState(getPageFromHash());

  React.useEffect(() => {
    const handleHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string) => {
    window.location.hash = `/${page}`;
  };

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
    <Layout currentPage={currentPage} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
