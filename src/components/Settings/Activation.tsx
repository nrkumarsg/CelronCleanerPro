import React from 'react';
import { Key, Unlock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ActivationProps {
  isPro: boolean;
  voucherCode: string;
  onVoucherChange: (code: string) => void;
  onActivate: () => void;
  message: string;
}

export const Activation: React.FC<ActivationProps> = ({ isPro, voucherCode, onVoucherChange, onActivate, message }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white mb-2 uppercase">Licensing Kernel</h1>
          <p className="text-white/30 text-xs font-tech tracking-wider uppercase">Professional Unit Activation & Enterprise Entitlement</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-12 bg-white/[0.02] border border-white/5 relative overflow-hidden text-center">
           <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-50" />
           
           <div className="relative space-y-8">
             <div className="inline-flex p-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4 animate-pulse">
                {isPro ? <ShieldAlert size={48} /> : <Key size={48} />}
             </div>
             
             <div>
                <h2 className="text-2xl font-tech font-bold text-white uppercase tracking-widest mb-4">
                  {isPro ? 'Engine Fully Activated' : 'Activate Enterprise Unit'}
                </h2>
                <p className="text-white/40 text-[11px] font-tech uppercase leading-relaxed max-w-md mx-auto">
                  {isPro 
                    ? 'All high-level system maintenance scripts and industrial optimization modules have been unlocked for this workstation.' 
                    : 'Input your 16-character deployment voucher to unlock the full potential of the CEL-RON industrial maintenance suite.'}
                </p>
             </div>

             {!isPro && (
               <div className="space-y-6">
                 <input 
                   type="text" 
                   value={voucherCode}
                   onChange={(e) => onVoucherChange(e.target.value)}
                   placeholder="XXXX-XXXX-XXXX-XXXX"
                   className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-center font-tech text-white tracking-[0.3em] uppercase focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:opacity-20"
                 />
                 <button 
                   onClick={onActivate}
                   className="w-full btn-primary py-4 text-xs font-tech font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-3 active:scale-95 transition-all"
                 >
                   <Unlock size={18} />
                   <span>Initiate Activation Handshake</span>
                </button>
               </div>
             )}

             {message && (
               <div className={`p-4 rounded-xl border font-tech text-[10px] uppercase tracking-widest animate-in slide-in-from-top-2
                 ${isPro ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                 {message}
               </div>
             )}

             {isPro && (
                <div className="pt-8 grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[9px] text-white/20 uppercase font-bold mb-1">Status</div>
                      <div className="text-xs text-green-400 font-tech font-bold uppercase">Lifetime Active</div>
                   </div>
                   <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[9px] text-white/20 uppercase font-bold mb-1">Entitlement</div>
                      <div className="text-xs text-cyan-400 font-tech font-bold uppercase">Enterprise Pro</div>
                   </div>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};
