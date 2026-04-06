import React from 'react';
import { Activity, Play, Zap, Info } from 'lucide-react';
import { MemoryProcess } from '../../types';

interface MemoryOptimizerProps {
  isOptimizingRAM: boolean;
  onOptimize: () => void;
  processes: MemoryProcess[];
}

export const MemoryOptimizer: React.FC<MemoryOptimizerProps> = ({ isOptimizingRAM, onOptimize, processes }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white mb-2 uppercase">Cache Engine</h1>
          <p className="text-white/30 text-xs font-tech tracking-wider uppercase">Active Memory Page Zeroing & Thread Optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card p-8 bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
            <div className="relative">
              <Activity className="text-purple-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-tech font-bold text-white mb-4 uppercase">Instant Reclaim</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-8 font-tech">
                Forces background applications to release their physical RAM working set back to the Windows kernel.
              </p>
              <button 
                onClick={onOptimize}
                disabled={isOptimizingRAM}
                className="w-full btn-primary py-4 flex items-center justify-center space-x-3 group relative overflow-hidden disabled:opacity-30"
              >
                {isOptimizingRAM ? (
                  <Zap className="animate-spin text-white" size={18} />
                ) : (
                  <Play size={18} className="text-white group-hover:scale-125 transition-transform" />
                )}
                <span className="font-tech text-xs tracking-[0.2em] font-bold uppercase">
                  {isOptimizingRAM ? 'Optimizing...' : 'Zero Out Cache'}
                </span>
              </button>
            </div>
          </div>
          
          <div className="glass-card p-6 bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-start space-x-4">
              <Info className="text-purple-400 shrink-0" size={18} />
              <p className="text-[10px] text-purple-200/50 font-tech leading-relaxed uppercase">
                Zeroing memory is safe. It tells the OS to move idle application data to the standby list, making more room for active tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="glass-card bg-black/20 border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <h3 className="text-xs font-tech text-white/50 tracking-[0.2em] uppercase font-bold">Top Memory Consumer Threads</h3>
              <span className="text-[10px] text-cyan-400/50 font-tech uppercase animate-pulse">Live Telemetry</span>
            </div>
            <div className="divide-y divide-white/5">
              {processes.map((proc, idx) => (
                <div key={idx} className="px-6 py-4 flex justify-between items-center group hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className="text-white/10 font-tech text-xs">0{idx + 1}</span>
                    <span className="text-white/70 font-tech text-sm group-hover:text-cyan-400 transition-colors uppercase font-bold">{proc.Name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className="h-full bg-purple-500 shadow-[0_0_8px_#a855f7] transition-all duration-1000" 
                        style={{ width: `${Math.min(100, (proc.MemoryMB / 1024) * 100)}%` }} 
                      />
                    </div>
                    <span className="text-purple-400 font-tech text-xs font-bold">{proc.MemoryMB.toFixed(0)} MB</span>
                  </div>
                </div>
              ))}
              {processes.length === 0 && (
                <div className="p-12 text-center text-white/20 font-tech italic text-sm uppercase">
                  Awaiting Kernel Thread Data...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
