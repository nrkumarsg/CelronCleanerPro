import React from 'react';
import { ShieldCheck, CheckCircle2, RotateCcw, X, AlertCircle } from 'lucide-react';

interface ResultModalProps {
  show: boolean;
  data: { title: string, subtitle: string, type: 'scan' | 'clean' };
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ show, data, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-lg bg-black/80 border border-white/10 p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="relative space-y-6">
          <div className="flex justify-center">
            <div className="p-6 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 animate-bounce">
              {data.type === 'scan' ? <ShieldCheck size={48} /> : <CheckCircle2 size={48} />}
            </div>
          </div>
          <h2 className="text-3xl font-tech font-bold text-white uppercase tracking-widest">{data.title}</h2>
          <p className="text-white/40 text-xs font-tech uppercase leading-relaxed max-w-sm mx-auto">{data.subtitle}</p>
          <button onClick={onClose} className="btn-primary w-full py-4 text-xs font-tech font-bold uppercase tracking-[0.2em] active:scale-95 transition-all">
            Dismiss Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, onConfirm, onCancel, title, subtitle }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-md bg-black/80 border border-white/10 p-10 text-center relative shadow-[0_0_50px_rgba(34,211,238,0.2)]">
        <div className="absolute top-6 right-6 text-white/20 hover:text-white cursor-pointer transition-colors" onClick={onCancel}>
           <X size={20} />
        </div>
        <div className="relative space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400">
              <RotateCcw size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-tech font-bold text-white uppercase tracking-widest">{title || 'INITIATE PURGE?'}</h2>
          <p className="text-white/40 text-[10px] font-tech uppercase leading-relaxed max-w-xs mx-auto">
            {subtitle || 'This procedure will permanently scrub the selected sectors. Are you sure you want to proceed with this industrial cleaning cycle?'}
          </p>
          <div className="grid grid-cols-2 gap-4">
             <button onClick={onCancel} className="btn-secondary py-3 text-[10px] font-tech font-bold uppercase tracking-widest">Abort</button>
             <button onClick={onConfirm} className="btn-primary py-3 text-[10px] font-tech font-bold uppercase tracking-widest">Execute</button>
          </div>
        </div>
      </div>
    </div>
  );
};
