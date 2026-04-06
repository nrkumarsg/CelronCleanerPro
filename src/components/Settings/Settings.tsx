import React from 'react';
import { Settings as SettingsIcon, ShieldCheck, Clock, Lock, Menu } from 'lucide-react';
import { UserPrefs } from '../../types';

interface SettingsProps {
  prefs: UserPrefs;
  onToggle: (key: keyof UserPrefs) => void;
}

export const Settings: React.FC<SettingsProps> = ({ prefs, onToggle }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white mb-2 uppercase">Core Configuration</h1>
          <p className="text-white/30 text-xs font-tech tracking-wider uppercase">Kernel-Level Application Preferences & Automation</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="glass-card bg-black/20 border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
               <h3 className="text-xs font-tech text-white/50 tracking-[0.2em] uppercase font-bold">Automation Protocol</h3>
            </div>
            <div className="divide-y divide-white/5">
              <div className="px-6 py-6 flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                <div className="flex items-center space-x-6">
                  <Clock className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="text-sm font-tech font-bold text-white uppercase tracking-wider mb-1">Quick Scan on Launch</h4>
                    <p className="text-[10px] text-white/30 font-tech uppercase">Initiates an automatic system inventory when the engine starts.</p>
                  </div>
                </div>
                <div onClick={() => onToggle('autoScan')} className={`w-12 h-6 rounded-full cursor-pointer transition-all relative ${prefs.autoScan ? 'bg-cyan-500/40' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${prefs.autoScan ? 'right-1 bg-cyan-400' : 'left-1 bg-white/40'}`} />
                </div>
              </div>

              <div className="px-6 py-6 flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                <div className="flex items-center space-x-6">
                  <Menu className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="text-sm font-tech font-bold text-white uppercase tracking-wider mb-1">Minimize to System Tray</h4>
                    <p className="text-[10px] text-white/30 font-tech uppercase">Keeps the engine resident in memory for instant access from the taskbar.</p>
                  </div>
                </div>
                <div onClick={() => onToggle('minimizeToTray')} className={`w-12 h-6 rounded-full cursor-pointer transition-all relative ${prefs.minimizeToTray ? 'bg-cyan-500/40' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${prefs.minimizeToTray ? 'right-1 bg-cyan-400' : 'left-1 bg-white/40'}`} />
                </div>
              </div>

              <div className="px-6 py-6 flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                <div className="flex items-center space-x-6">
                  <ShieldCheck className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="text-sm font-tech font-bold text-white uppercase tracking-wider mb-1">Quiet Maintenance Mode</h4>
                    <p className="text-[10px] text-white/30 font-tech uppercase">Suppresses all system notifications and optimization result confirmation.</p>
                  </div>
                </div>
                <div onClick={() => onToggle('quietMode')} className={`w-12 h-6 rounded-full cursor-pointer transition-all relative ${prefs.quietMode ? 'bg-cyan-500/40' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${prefs.quietMode ? 'right-1 bg-cyan-400' : 'left-1 bg-white/40'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
           <div className="glass-card p-8 bg-green-500/5 border border-green-500/20">
              <h4 className="text-xs font-tech text-green-400 uppercase tracking-widest mb-4 font-bold">App Update Service</h4>
              <p className="text-[10px] text-white/40 leading-relaxed font-tech uppercase mb-6">
                CEL-RON CLEANER is currently running in its optimal version. Updates are verified daily via secure kernel handshake.
              </p>
              <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-center">
                 <span className="text-[10px] font-tech font-bold text-white tracking-widest uppercase">Version: 1.0.0-PRO</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
