import React from 'react';
import { Trash2, AlertCircle, Play, RotateCcw, CheckCircle2 } from 'lucide-react';
import { ScanTask } from '../../types';

interface JunkScrubberProps {
  isScanning: boolean;
  scanProgress: number;
  status: string;
  totalJunkFound: string;
  scanTasks: ScanTask[];
  onTaskToggle: (id: string) => void;
  onScan: () => void;
  onClean: () => void;
  logs: string[];
}

export const JunkScrubber: React.FC<JunkScrubberProps> = ({ isScanning, scanProgress, status, totalJunkFound, scanTasks, onTaskToggle, onScan, onClean, logs }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white mb-2 uppercase">Kernel Scrubber</h1>
          <p className="text-white/30 text-xs font-tech tracking-wider uppercase">System Cache Discovery & Directory Sanitization</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Task List */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
          <div className="px-2 pb-2 flex justify-between items-end">
            <h3 className="text-xs font-tech text-white/50 tracking-[0.2em] mb-1 uppercase font-bold">Maintenance Scripts</h3>
            <span className="text-[10px] text-white/20 font-tech uppercase">{scanTasks.length} LOADED</span>
          </div>
          <div className="space-y-3">
            {scanTasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => !isScanning && onTaskToggle(task.id)}
                className={`glass-card p-4 bg-white/[0.02] border transition-all cursor-pointer group flex items-center justify-between
                  ${task.enabled ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-white/5 opacity-50 hover:opacity-80'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${task.enabled ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/20'}`}>
                    {task.critical ? <AlertCircle size={18} /> : <Trash2 size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-tech font-bold text-white uppercase tracking-wider">{task.name}</h4>
                    <p className="text-[10px] text-white/30 font-tech">{task.description}</p>
                  </div>
                </div>
                {task.isPro && <span className="text-[8px] font-tech bg-purple-500/20 text-purple-400 px-2 py-1 rounded border border-purple-500/30 uppercase font-bold">PRO UNIT</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Console & Control */}
        <div className="col-span-12 lg:col-span-5 flex flex-col space-y-6">
          <div className="glass-card flex-1 bg-black/40 border border-white/5 p-6 font-mono text-[10px] space-y-3 flex flex-col min-h-[400px]">
             <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-2">
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                   <span className="text-cyan-400/70 font-tech tracking-widest uppercase">Kernel Diagnostics</span>
                </div>
                <span className="text-white/20 font-tech">NODE::ACTIVE</span>
             </div>
             
             {/* Progress Engine */}
             <div className="mb-6 space-y-2">
                <div className="flex justify-between text-[10px] font-tech text-white/40 uppercase tracking-widest">
                   <span>{status}</span>
                   <span>{scanProgress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                </div>
             </div>

             <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                {logs.map((log, idx) => (
                   <div key={idx} className="flex space-x-3 text-white/50 animate-in fade-in slide-in-from-left-2 transition-all">
                      <span className="text-cyan-400/30">[{idx}]</span>
                      <span className="break-all tracking-tight leading-relaxed">{log}</span>
                   </div>
                ))}
                {logs.length === 0 && <div className="text-white/10 italic text-[11px] font-tech uppercase text-center mt-12 py-12 border border-dashed border-white/5 rounded-xl">Awaiting Operator Command...</div>}
             </div>

             <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                   <span className="text-[10px] font-tech text-white/40 uppercase tracking-widest uppercase font-bold">Discoverable Junk</span>
                   <span className="text-xl font-tech text-white font-bold tracking-tighter">{totalJunkFound}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={onScan} disabled={isScanning} className="btn-secondary py-4 text-xs font-tech font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
                    <RotateCcw size={14} className={isScanning ? 'animate-spin' : ''} />
                    <span>Run Scan</span>
                  </button>
                  <button onClick={onClean} disabled={isScanning} className="btn-primary py-4 text-xs font-tech font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
                    <Play size={14} />
                    <span>Scrub Now</span>
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
