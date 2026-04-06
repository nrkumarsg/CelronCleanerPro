import React from 'react';
import { Lock, Unlock, ShieldAlert, Zap, ShieldPlus } from 'lucide-react';
import { PrivacySettings } from '../../types';

interface PrivacyGuardProps {
  isWiping: boolean;
  settings: PrivacySettings;
  onSettingToggle: (key: keyof PrivacySettings) => void;
  onWipe: () => void;
}

export const PrivacyGuard: React.FC<PrivacyGuardProps> = ({ isWiping, settings, onSettingToggle, onWipe }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white mb-2 uppercase">Privacy Vault</h1>
          <p className="text-white/30 text-xs font-tech tracking-wider uppercase">Deep Footprint Scrubbing & Activity Log Sanitization</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div 
              onClick={() => onSettingToggle('explorer')}
              className={`glass-card p-8 bg-white/[0.02] border transition-all cursor-pointer group flex flex-col justify-between
                ${settings.explorer ? 'border-cyan-500/30' : 'border-white/5 opacity-50 hover:opacity-100'}`}
            >
              <Lock className={`mb-6 ${settings.explorer ? 'text-cyan-400' : 'text-white/20'} group-hover:scale-110 transition-transform`} size={32} />
              <div>
                <h3 className="text-lg font-tech font-bold text-white uppercase tracking-wider mb-2">Windows Explorer</h3>
                <p className="text-[10px] text-white/30 font-tech uppercase leading-relaxed">Recent files, Run history, Jump lists</p>
              </div>
            </div>
            
            <div 
              onClick={() => onSettingToggle('clipboard')}
              className={`glass-card p-8 bg-white/[0.02] border transition-all cursor-pointer group flex flex-col justify-between
                ${settings.clipboard ? 'border-cyan-500/30' : 'border-white/5 opacity-50 hover:opacity-100'}`}
            >
              <Zap className={`mb-6 ${settings.clipboard ? 'text-cyan-400' : 'text-white/20'} group-hover:scale-110 transition-transform`} size={32} />
              <div>
                <h3 className="text-lg font-tech font-bold text-white uppercase tracking-wider mb-2">System Clipboard</h3>
                <p className="text-[10px] text-white/30 font-tech uppercase leading-relaxed">Memory copies, text, image captures</p>
              </div>
            </div>

            <div 
              onClick={() => onSettingToggle('browsers')}
              className={`glass-card p-8 bg-white/[0.02] border transition-all cursor-pointer group flex flex-col justify-between col-span-1 sm:col-span-2
                ${settings.browsers ? 'border-purple-500/30' : 'border-white/5 opacity-50 hover:opacity-100'}`}
            >
               <div className="flex justify-between items-start">
                  <ShieldPlus className={`mb-6 ${settings.browsers ? 'text-purple-400' : 'text-white/20'} group-hover:scale-110 transition-transform`} size={32} />
                  <span className="text-[10px] font-tech text-purple-400/50 bg-purple-400/10 px-2 py-1 border border-purple-400/20 uppercase tracking-widest font-bold">Recommended</span>
               </div>
               <div>
                  <h3 className="text-lg font-tech font-bold text-white uppercase tracking-wider mb-2">Universal Browser Footprints</h3>
                  <p className="text-[10px] text-white/30 font-tech uppercase leading-relaxed">Cookies, Cache, Session state across all installed browsers (Chrome, Edge, Firefox, Brave, Vivaldi, Opera)</p>
               </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-card p-8 bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50" />
            <div className="relative text-center">
              <ShieldAlert className="text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-xl font-tech font-bold text-white mb-4 uppercase">Total Footprint Zeroing</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-8 font-tech uppercase font-bold">
                Permanently overwrites local tracking artifacts across the system kernel.
              </p>
              <button 
                onClick={onWipe}
                disabled={isWiping}
                className="w-full btn-primary py-4 flex items-center justify-center space-x-3 group active:scale-95 transition-all disabled:opacity-30"
              >
                {isWiping ? (
                   <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full" />
                ) : (
                   <Unlock size={18} className="text-white group-hover:scale-110 transition-transform" />
                )}
                <span className="font-tech text-xs tracking-[0.2em] font-bold uppercase">{isWiping ? 'SCRUBBING...' : 'INITIATE SECURE WIPE'}</span>
              </button>
            </div>
          </div>
          
          <div className="glass-card p-6 bg-cyan-500/5 border border-cyan-500/20">
            <h4 className="text-[10px] font-tech text-cyan-400 uppercase tracking-widest mb-3 font-bold">Privacy Protocol</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-[9px] text-white/40 font-tech uppercase">
                <div className="w-1 h-1 rounded-full bg-cyan-400" />
                <span>Zero-Latency Disk Sanitization</span>
              </li>
              <li className="flex items-center space-x-2 text-[9px] text-white/40 font-tech uppercase">
                <div className="w-1 h-1 rounded-full bg-cyan-400" />
                <span>Encrypted Path Traversal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
