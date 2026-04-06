import React from 'react';
import { HelpCircle, Info, ChevronRight, Check } from 'lucide-react';

export const HelpManual: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white mb-2 uppercase">Operator Manual</h1>
          <p className="text-white/30 text-xs font-tech tracking-wider uppercase">Industrial System Maintenance & Feature Documentation</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="glass-card bg-black/20 border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
               <h3 className="text-xs font-tech text-white/50 tracking-[0.2em] uppercase font-bold">Standard Operating Procedures</h3>
            </div>
            <div className="p-8 space-y-8">
               <div className="space-y-4">
                  <h4 className="text-sm font-tech font-bold text-white uppercase tracking-widest flex items-center">
                    <ChevronRight size={16} className="text-cyan-400 mr-2" />
                    System Scrubbing Loop
                  </h4>
                  <p className="text-[10px] text-white/40 leading-relaxed font-tech uppercase">
                    The Kernel Scrubber identifies and purges temporary session data. For optimal industrial performance, it is recommended to run a deep scan once every 7 operating cycles. Critical system files are automatically shielded from deletion.
                  </p>
               </div>

               <div className="space-y-4">
                  <h4 className="text-sm font-tech font-bold text-white uppercase tracking-widest flex items-center">
                    <ChevronRight size={16} className="text-cyan-400 mr-2" />
                    Memory Page Zeroing
                  </h4>
                  <p className="text-[10px] text-white/40 leading-relaxed font-tech uppercase">
                    The Cache Engine utilizes the Windows kernel .NET API to force thread-level RAM release. This process effectively 'zeros out' standby memory pages, making high-performance physical RAM available for active industrial workflows.
                  </p>
               </div>

               <div className="space-y-4">
                  <h4 className="text-sm font-tech font-bold text-white uppercase tracking-widest flex items-center">
                    <ChevronRight size={16} className="text-cyan-400 mr-2" />
                    Privacy Vault Protocols
                  </h4>
                  <p className="text-[10px] text-white/40 leading-relaxed font-tech uppercase">
                    Our scrubbers perform low-level deletion on browser artifacts and Windows history. Unlike standard deletion, these protocols ensure that local session footprints are neutralized to secure corporate intelligence and data privacy.
                  </p>
               </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-between">
             <div className="flex items-center space-x-4">
                <div className="p-3 bg-cyan-500/20 rounded-full text-cyan-400">
                   <Info size={24} />
                </div>
                <div>
                   <h4 className="text-xs font-tech font-bold text-white uppercase tracking-widest uppercase">System Integrity Guaranteed</h4>
                   <p className="text-[9px] text-cyan-200/50 uppercase font-tech">CEL-RON CLEANER is verified and signed for industrial deployment.</p>
                </div>
             </div>
             <div className="flex items-center space-x-2 bg-black/40 px-4 py-2 border border-white/5 rounded-full">
                <Check size={14} className="text-green-400" />
                <span className="text-[10px] font-tech font-bold text-white uppercase">Secure Build</span>
             </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
           <div className="glass-card p-8 bg-white/[0.02] border border-white/5">
              <h4 className="text-xs font-tech text-white/50 uppercase tracking-widest mb-6 font-bold">Project Intelligence</h4>
              <div className="space-y-6">
                 <div>
                    <div className="text-[9px] text-white/20 uppercase font-bold mb-1 uppercase font-bold">Primary Development Node</div>
                    <div className="text-xs text-white font-tech tracking-widest uppercase">Celron Tech Enterprises</div>
                 </div>
                 <div>
                    <div className="text-[9px] text-white/20 uppercase font-bold mb-1 uppercase font-bold">Lead System Architect</div>
                    <div className="text-xs text-cyan-400 font-tech tracking-widest uppercase">Supersenior Inspector Node</div>
                 </div>
                 <div>
                    <div className="text-[9px] text-white/20 uppercase font-bold mb-1 uppercase font-bold">Kernel Deployment Site</div>
                    <div className="text-xs text-white font-tech tracking-widest uppercase">Industrial-V1-Dell-VIP</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
