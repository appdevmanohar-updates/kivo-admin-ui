import React, { useState } from 'react';
import { useData } from '../services/dataService';
import { Card, Badge, Button, Modal } from '../components/UI';
import { Seller } from '../types';
import { Store, Star, Mail, MoreHorizontal, User, Calendar, ShieldCheck } from 'lucide-react';

export const Sellers: React.FC = () => {
  const { sellers, toggleSellerStatus } = useData();
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">Sellers Directory</h1>
        <p className="text-gray-400 mt-1">Monitor seller performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map(seller => (
          <Card key={seller.id} className="relative overflow-visible border border-[#2A3038] bg-corona-card">
             <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-[#2A3038] border border-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                   <Store className="text-corona-yellow" size={24} />
                </div>
                <div className="flex flex-col items-end space-y-2">
                   <Badge status={seller.status} />
                   <button className="text-gray-500 hover:text-white">
                      <MoreHorizontal size={20} />
                   </button>
                </div>
             </div>

             <h3 className="text-lg font-bold text-white">{seller.shopName}</h3>
             <p className="text-sm text-gray-500 mb-4">{seller.name}</p>

             <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-300 bg-[#0f1015] p-2 rounded-lg border border-[#2A3038]">
                   <Mail size={16} className="mr-3 text-gray-500" />
                   <span className="truncate">{seller.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-300 bg-[#0f1015] p-2 rounded-lg border border-[#2A3038]">
                   <div className="flex items-center">
                     <Star size={16} className="mr-3 text-corona-yellow fill-corona-yellow" />
                     <span>Acceptance Rate</span>
                   </div>
                   <span className="font-bold text-white">{seller.acceptanceRate}%</span>
                </div>
             </div>

             <div className="flex space-x-3">
                <Button 
                    variant="secondary" 
                    className="flex-1 bg-[#2A3038] text-gray-300 hover:text-white"
                    onClick={() => setSelectedSeller(seller)}
                >
                    Profile
                </Button>
                <Button 
                  variant={seller.status === 'active' ? "danger" : "success"} 
                  className={`flex-1 ${seller.status === 'active' ? 'bg-transparent border border-corona-red text-corona-red hover:bg-corona-red hover:text-white' : ''}`}
                  onClick={() => toggleSellerStatus(seller.id)}
                >
                  {seller.status === 'active' ? 'Suspend' : 'Activate'}
                </Button>
             </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={!!selectedSeller} onClose={() => setSelectedSeller(null)} title="Seller Profile">
        {selectedSeller && (
            <div className="p-6">
                <div className="flex items-center space-x-5 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2A3038] to-[#15171e] border border-gray-600 flex items-center justify-center shadow-2xl">
                        <span className="text-3xl font-bold text-white">{selectedSeller.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{selectedSeller.shopName}</h2>
                        <div className="flex items-center mt-1 space-x-2">
                             <Badge status={selectedSeller.status} />
                             <span className="text-gray-500 text-xs px-2 py-0.5 border border-gray-700 rounded bg-[#0f1015]">ID: {selectedSeller.id}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-[#0f1015] border border-[#2A3038] hover:border-corona-blue/30 transition-colors">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Owner Details</span>
                        <div className="flex items-center mb-2">
                            <User size={16} className="text-corona-blue mr-2" />
                            <span className="text-white font-medium">{selectedSeller.name}</span>
                        </div>
                         <div className="flex items-center">
                            <Mail size={16} className="text-corona-blue mr-2" />
                            <span className="text-gray-300 text-sm truncate">{selectedSeller.email}</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0f1015] border border-[#2A3038] hover:border-corona-yellow/30 transition-colors">
                         <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Performance Stats</span>
                         <div className="flex justify-between items-end mb-2">
                            <span className="text-gray-400 text-sm">Acceptance Rate</span>
                            <span className="text-corona-yellow font-bold">{selectedSeller.acceptanceRate}%</span>
                         </div>
                         <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div className="bg-corona-yellow h-1.5 rounded-full" style={{ width: `${selectedSeller.acceptanceRate}%` }}></div>
                         </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-[#0f1015] border border-[#2A3038] hover:border-corona-green/30 transition-colors">
                         <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Account Age</span>
                         <div className="flex items-center">
                             <Calendar size={16} className="text-corona-green mr-2" />
                             <span className="text-white text-sm">Joined {new Date(selectedSeller.joinedAt).toLocaleDateString()}</span>
                         </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0f1015] border border-[#2A3038] hover:border-purple-500/30 transition-colors">
                         <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Verification</span>
                         <div className="flex items-center">
                             <ShieldCheck size={16} className="text-purple-500 mr-2" />
                             <span className="text-white text-sm">KYC Verified</span>
                         </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#2A3038]">
                    <Button variant="secondary" onClick={() => setSelectedSeller(null)}>Close</Button>
                </div>
            </div>
        )}
      </Modal>
    </div>
  );
};