import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Tab } from '../../types';

interface SidebarItemProps {
  id: Tab;
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: (id: Tab) => void;
  collapsed: boolean;
  alert?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = React.memo(({ id, icon: Icon, label, active, onClick, collapsed, alert }) => {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`relative w-full flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 transition-all duration-300 group
        ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}`}
    >
      {active && <div className="absolute left-0 w-[2px] h-6 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
      <Icon size={20} className={`${active ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''} group-hover:scale-110 transition-transform`} />
      {!collapsed && <span className="ml-4 font-tech text-[11px] tracking-[0.15em] uppercase font-bold">{label}</span>}
      {alert && (
        <div className={`absolute ${collapsed ? 'top-2 right-4' : 'right-4'} w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse`} />
      )}
    </button>
  );
});
