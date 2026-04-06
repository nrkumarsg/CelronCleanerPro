import React from 'react';

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string;
  type: 'graph' | 'bar' | 'dot';
  history?: number[];
  color: 'cyan' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = React.memo(({ title, subtitle, value, type, history, color }) => {
  const colorHex = color === 'cyan' ? '#22d3ee' : '#a855f7';
  
  const points = history 
    ? history.map((val, i) => `${(i * 100) / (history.length - 1)},${20 - (val * 20) / 100}`).join(' ')
    : "0,15 100,15";

  return (
    <div className="glass-card p-6 relative flex flex-col justify-between h-40 bg-black/20 border border-white/5 group hover:border-white/20 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xs font-tech text-white/50 tracking-[0.2em] mb-1 uppercase font-bold">{title}</h3>
          <p className="text-[10px] text-white/30 tracking-tight font-tech">{subtitle}</p>
        </div>
        <span className="text-3xl font-tech font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-transform">
          {value}
        </span>
      </div>
      <div className="mt-6 flex-1 flex items-end">
        {type === 'graph' && (
           <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
             <polyline fill="none" stroke={colorHex} strokeWidth="2" points={points} className="transition-all duration-700 ease-in-out" />
           </svg>
        )}
        {type === 'bar' && (
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full shadow-[0_0_15px_#a855f7] transition-all duration-700" 
              style={{ width: value, background: `linear-gradient(90deg, #8b5cf6, #a855f7)` }} 
            />
          </div>
        )}
        {type === 'dot' && (
          <div className="w-full h-10 flex items-center relative">
            <div className="w-full h-[2px] bg-white/5 absolute rounded-full" />
            <div className="h-[2px] bg-cyan-400 absolute shadow-[0_0_10px_#22d3ee]" style={{ width: value }} />
            <div 
              className="w-3 h-3 rounded-full bg-cyan-400 absolute border border-white/40 shadow-[0_0_15px_#22d3ee]" 
              style={{ left: value, transform: 'translateX(-50%)' }} 
            />
          </div>
        )}
      </div>
    </div>
  );
});
