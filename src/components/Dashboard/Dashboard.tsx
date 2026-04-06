import React from 'react';
import { Activity, ShieldCheck, Zap, HardDrive, Cpu } from 'lucide-react';
import { StatCard } from '../UI/StatCard';
import { SystemStats } from '../../types';

interface DashboardProps {
  stats: SystemStats | null;
  cpuHistory: number[];
  ramHistory: number[];
  systemHealth: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, cpuHistory, ramHistory, systemHealth }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-tech font-bold tracking-tighter text-white mb-2 uppercase">Command Center</h1>
          <p className="text-white/30 text-xs font-tech tracking-wider uppercase">System Telemetry & Real-Time Engine Diagnostics</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/20 font-tech uppercase mb-1">Engine Active</div>
          <div className="flex items-center space-x-2 text-cyan-400 font-tech text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="tracking-widest uppercase">Kernel Node: 0x2A4F</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Health Scanner */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center glass-card p-12 bg-white/[0.02] relative group overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 opacity-50" />
          
          <div className="relative w-64 h-64 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Ring */}
              <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
              {/* Progress Ring */}
              <circle 
                cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={2 * Math.PI * 110} 
                strokeDashoffset={2 * Math.PI * 110 * (1 - systemHealth / 100)} 
                strokeLinecap="round" 
                className={`${systemHealth > 70 ? 'text-cyan-400' : systemHealth > 40 ? 'text-yellow-400' : 'text-red-500'} transition-all duration-1000 ease-out drop-shadow-[0_0_15px_currentColor]`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-tech font-bold text-white mb-1 group-hover:scale-110 transition-transform">{systemHealth}%</span>
              <span className="text-[10px] text-white/40 font-tech tracking-[0.2em] uppercase font-bold">Health Score</span>
            </div>
          </div>

          <div className="relative text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
              <ShieldCheck className={systemHealth > 70 ? 'text-cyan-400' : 'text-yellow-400'} size={20} />
              <span className="text-xs font-tech text-white/70 uppercase tracking-widest font-bold">
                {systemHealth > 90 ? 'System Guard: Optimal' : systemHealth > 70 ? 'System Guard: Protected' : 'Attention Required'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-6">
          <StatCard 
            title="CPU Usage" 
            subtitle={stats?.cpu.model || "Initializing Engine..."} 
            value={`${stats?.cpu.usage ?? 0}%`} 
            type="graph" 
            history={cpuHistory}
            color="cyan" 
          />
          <StatCard 
            title="RAM Optimization" 
            subtitle={`${stats?.ram.used ?? 0} GB / ${stats?.ram.total ?? 0} GB`} 
            value={`${stats?.ram.usage ?? 0}%`} 
            type="bar" 
            history={ramHistory}
            color="purple" 
          />
          <StatCard 
            title="Disk Integrity" 
            subtitle={`${stats?.disk.name || "Default Drive"} - ${stats?.disk.fileSystem || "NTFS"}`} 
            value={`${stats?.disk.usage ?? 0}%`} 
            type="dot" 
            color="cyan" 
          />
          <div className="glass-card p-6 flex flex-col justify-center bg-white/[0.02] border border-white/5 space-y-4">
            <div className="flex items-center space-x-4">
              <Activity className="text-cyan-400" size={24} />
              <div>
                <div className="text-[10px] text-white/30 font-tech uppercase tracking-widest">Engine Uptime</div>
                <div className="text-lg font-tech text-white font-bold">{stats?.uptime ?? 0} HOURS</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Zap className="text-purple-400" size={24} />
              <div>
                <div className="text-[10px] text-white/30 font-tech uppercase tracking-widest">Node Name</div>
                <div className="text-lg font-tech text-white font-bold">{stats?.os.hostname || "CELRON-NODE"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
