import { useState, useEffect } from 'react';
import { SystemStats } from '../types';

export function useSystemStats(totalJunkFound: string) {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [cpuHistory, setCpuHistory] = useState<number[]>(new Array(20).fill(0));
  const [ramHistory, setRamHistory] = useState<number[]>(new Array(20).fill(0));
  const [systemHealth, setSystemHealth] = useState(100);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await window.electronAPI.getSystemStats();
        if (data.success) {
          setStats(data);
          setCpuHistory(prev => [...prev.slice(1), data.cpu.usage]);
          setRamHistory(prev => [...prev.slice(1), data.ram.usage]);
          
          // Smarter Health logic
          const avgUsage = (data.cpu.usage + data.ram.usage + data.disk.usage) / 3;
          const junkPenalty = Math.floor(parseFloat(totalJunkFound) * 2) || 0;
          setSystemHealth(Math.min(100, Math.max(10, 100 - Math.floor(avgUsage) - junkPenalty)));
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, [totalJunkFound]);

  return { stats, cpuHistory, ramHistory, systemHealth };
}
