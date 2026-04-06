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
                   <p className="text-[9px] text-cyan-200/50 uppercase font-tech">CELRON CLEANER V1.0.0 is verified and signed for industrial deployment.</p>
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
                    <div className="text-[9px] text-white/20 uppercase font-bold mb-1">Application Purpose</div>
                    <div className="text-[10px] text-white/60 font-tech leading-relaxed uppercase">
                       High-precision industrial system optimization utility for kernel-level junk scrubbing, RAM optimization, and privacy enforcement.
                    </div>
                 </div>
                 <div>
                    <div className="text-[9px] text-white/20 uppercase font-bold mb-1">Legal Ownership</div>
                    <div className="text-xs text-white font-tech tracking-widest uppercase">Cel-ron Enterprises Pte Ltd, Singapore</div>
                 </div>
                  <div>
                     <div className="text-[9px] text-white/20 uppercase font-bold mb-1">Lead System Architect</div>
                     <div className="text-xs text-cyan-400 font-tech tracking-widest uppercase">Development Node V1.0.0</div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5">
                     <div className="text-[9px] text-white/20 uppercase font-bold mb-3">Technical Support</div>
                     <a 
                        href="https://wa.me/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-all group"
                     >
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black">
                           <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.435 5.633 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] text-white font-tech uppercase">Direct Support</span>
                           <span className="text-[8px] text-green-400 font-tech uppercase group-hover:text-white transition-colors">Start WhatsApp Chat</span>
                        </div>
                     </a>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
