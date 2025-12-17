import React, { useState, useMemo } from 'react';
import { useData } from '../services/dataService';
import { Badge, Button, Modal } from '../components/UI';
import { Product, ProductStatus } from '../types';
import { Eye, Check, X, Tag, Filter, ChevronDown, CheckCheck } from 'lucide-react';
import { clsx } from 'clsx';

export const Products: React.FC = () => {
  const { products, updateProductStatus, bulkApproveProducts } = useData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('pending');
  const [fabricFilter, setFabricFilter] = useState<string>('all');

  const uniqueFabrics = useMemo<string[]>(() => {
    const fabrics = new Set<string>(products.map(p => p.fabric));
    return Array.from(fabrics).sort();
  }, [products]);

  const displayProducts = useMemo<Product[]>(() => {
    return products.filter(p => {
      const matchesStatus = statusFilter === 'all' ? true : p.status === statusFilter;
      const matchesFabric = fabricFilter === 'all' ? true : p.fabric === fabricFilter;
      return matchesStatus && matchesFabric;
    });
  }, [products, statusFilter, fabricFilter]);

  const getStatusCount = (status: ProductStatus) => {
    return products.filter(p => {
        const matchesFabric = fabricFilter === 'all' ? true : p.fabric === fabricFilter;
        return p.status === status && matchesFabric;
    }).length;
  };

  const pendingCount = getStatusCount('pending');

  const handleApprove = (id: string) => {
    updateProductStatus(id, 'in_stock');
    if (selectedProduct?.id === id) setSelectedProduct(null);
  };

  const handleReject = (id: string) => {
    updateProductStatus(id, 'rejected');
    if (selectedProduct?.id === id) setSelectedProduct(null);
  };

  const handleApproveAll = () => {
    const idsToApprove = displayProducts.filter(p => p.status === 'pending').map(p => p.id);
    if (idsToApprove.length > 0) {
        if(window.confirm(`Are you sure you want to approve ${idsToApprove.length} products?`)) {
            bulkApproveProducts(idsToApprove);
        }
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">Products Review</h1>
            <p className="text-gray-400 mt-1">Manage and approve seller inventory.</p>
          </div>
          
          <div className="flex flex-col xl:flex-row gap-3 items-start xl:items-center">
             {pendingCount > 0 && statusFilter === 'pending' && (
                <button 
                    onClick={handleApproveAll}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-corona-green to-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-corona-green/20 hover:shadow-corona-green/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    <CheckCheck size={18} />
                    <span>Approve {pendingCount} Pending</span>
                </button>
             )}

             <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                 <div className="relative group w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-gray-400 group-hover:text-corona-blue transition-colors" />
                    </div>
                    <select 
                      value={fabricFilter}
                      onChange={(e) => setFabricFilter(e.target.value)}
                      className="appearance-none bg-black border border-[#2A3038] text-gray-300 py-2 pl-9 pr-10 rounded-lg text-sm focus:outline-none focus:border-corona-blue focus:ring-1 focus:ring-corona-blue cursor-pointer transition-all w-full sm:w-auto"
                    >
                        <option value="all">All Fabrics</option>
                        {uniqueFabrics.map((f: string) => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                 </div>

                 <div className="bg-black border border-[#2A3038] rounded-lg p-1 flex space-x-1 overflow-x-auto w-full sm:w-auto">
                    {(['all', 'pending', 'in_stock', 'rejected'] as const).map((tab) => {
                      const labels: Record<string, string> = {
                        all: 'All',
                        pending: 'Pending',
                        in_stock: 'Approved',
                        rejected: 'Rejected'
                      };
                      
                      const count = tab === 'pending' ? getStatusCount('pending') : 0;
                      const isActive = statusFilter === tab;

                      return (
                        <button
                          key={tab}
                          onClick={() => setStatusFilter(tab)}
                          className={clsx(
                              "relative px-3 py-1 text-sm font-medium rounded-md transition-all whitespace-nowrap flex items-center space-x-2",
                              isActive 
                                  ? "bg-corona-blue text-white shadow-md shadow-corona-blue/20" 
                                  : "text-gray-500 hover:bg-[#2A3038] hover:text-gray-300"
                          )}
                        >
                          <span>{labels[tab]}</span>
                          {tab === 'pending' && count > 0 && (
                            <span className={clsx(
                              "ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[18px]",
                              isActive 
                                ? "bg-white text-corona-blue" 
                                : "bg-corona-blue/20 text-corona-blue border border-corona-blue/30"
                            )}>
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                 </div>
             </div>
          </div>
       </div>

       {displayProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-corona-card rounded-xl border border-dashed border-[#2A3038]">
             <Tag className="text-[#2A3038] mb-4" size={48} />
             <h3 className="text-lg font-medium text-white">No products found</h3>
             <p className="text-gray-500">Try adjusting your filters.</p>
             <button 
                onClick={() => { setStatusFilter('all'); setFabricFilter('all'); }} 
                className="mt-4 text-corona-blue font-medium hover:underline"
             >
                Clear Filters
             </button>
          </div>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {displayProducts.map((product: Product) => (
             <div key={product.id} className="group relative bg-corona-card rounded-xl border border-[#2A3038] overflow-hidden hover:border-gray-600 transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-black/50">
                <div className="absolute top-3 left-3 z-10">
                   <Badge status={product.status} />
                </div>
                <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded border border-gray-700">
                   {product.stock} Units
                </div>
                
                <div className="aspect-[4/5] relative overflow-hidden bg-[#0f1015]">
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors z-0"></div>
                   <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                   
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Button variant="primary" onClick={() => setSelectedProduct(product)} className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Eye size={16} className="mr-2" /> Quick View
                      </Button>
                   </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                   <h3 className="font-bold text-white truncate" title={product.title}>{product.title}</h3>
                   <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">{product.fabric} • {product.fit}</p>
                   </div>
                   
                   <div className="mt-3 mb-4 flex flex-wrap gap-1">
                      {product.sizes.map((size: string) => (
                        <span key={size} className="text-[10px] px-1.5 py-0.5 border border-[#2A3038] rounded text-gray-400 bg-[#0f1015]">{size}</span>
                      ))}
                   </div>
                   
                   <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#2A3038]">
                      <span className="text-lg font-bold text-corona-yellow">₹{product.price.toLocaleString()}</span>
                      
                      {product.status === 'pending' ? (
                        <div className="flex space-x-2">
                            <button onClick={() => handleReject(product.id)} className="p-2 text-corona-red hover:bg-corona-red/10 rounded-full transition-colors" title="Reject">
                            <X size={18} />
                            </button>
                            <button onClick={() => handleApprove(product.id)} className="p-2 text-corona-green hover:bg-corona-green/10 rounded-full transition-colors" title="Approve">
                            <Check size={18} />
                            </button>
                        </div>
                      ) : (
                         <span className={clsx("text-xs font-bold uppercase", product.status === 'in_stock' ? "text-corona-green" : "text-corona-red")}>
                             {product.status === 'in_stock' ? 'Approved' : 'Rejected'}
                         </span>
                      )}
                   </div>
                </div>
             </div>
           ))}
         </div>
       )}

       <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title="Product Review">
         {selectedProduct && (
           <div className="flex flex-col md:flex-row h-full">
             <div className="md:w-1/2 bg-[#0f1015] h-64 md:h-auto md:min-h-[400px] shrink-0">
                <img src={selectedProduct.imageUrl} className="w-full h-full object-cover opacity-90" alt="Detail" />
             </div>
             <div className="md:w-1/2 p-6 md:p-8 flex flex-col bg-corona-card">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedProduct.title}</h2>
                      <p className="text-gray-500 text-sm mt-1">SKU: {selectedProduct.sku}</p>
                    </div>
                    <Badge status={selectedProduct.status} />
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-[#0f1015] p-3 rounded-lg border border-[#2A3038]">
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
                          <p className="text-xl font-bold text-corona-yellow mt-1">₹{selectedProduct.price.toLocaleString()}</p>
                       </div>
                       <div className="bg-[#0f1015] p-3 rounded-lg border border-[#2A3038]">
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Total Stock</p>
                          <p className="text-xl font-bold text-white mt-1">{selectedProduct.stock}</p>
                       </div>
                    </div>

                    <div className="border-t border-b border-[#2A3038] py-4 space-y-2">
                       <div className="flex justify-between">
                          <span className="text-gray-400">Fabric</span>
                          <span className="font-medium text-white">{selectedProduct.fabric}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-gray-400">Fit</span>
                          <span className="font-medium text-white">{selectedProduct.fit}</span>
                       </div>
                    </div>

                    <div>
                       <p className="text-sm font-medium text-white mb-2">Available Sizes</p>
                       <div className="flex flex-wrap gap-2">
                          {selectedProduct.sizes.map((size: string) => (
                             <div key={size} className="w-12 h-12 rounded-lg border border-[#2A3038] flex flex-col items-center justify-center bg-[#0f1015]">
                                <span className="font-bold text-white text-sm">{size}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>

                {selectedProduct.status === 'pending' && (
                    <div className="mt-8 pt-6 border-t border-[#2A3038] flex space-x-4">
                    <Button variant="danger" className="flex-1 bg-transparent border border-corona-red text-corona-red hover:bg-corona-red hover:text-white" onClick={() => handleReject(selectedProduct.id)}>
                        Reject
                    </Button>
                    <Button variant="success" className="flex-1" onClick={() => handleApprove(selectedProduct.id)}>
                        Approve Product
                    </Button>
                    </div>
                )}
             </div>
           </div>
         )}
       </Modal>
    </div>
  );
};