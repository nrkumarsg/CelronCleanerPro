import { useState, useEffect } from 'react';
import { MemoryProcess } from '../types';

export function useMemoryProcesses(activeTab: string) {
  const [memoryProcesses, setMemoryProcesses] = useState<MemoryProcess[]>([]);

  useEffect(() => {
    if (activeTab !== 'memory') return;
    
    const fetchMemoryProcesses = async () => {
      try {
        const result = await window.electronAPI.getTopMemoryProcesses();
        if (result.success) {
          setMemoryProcesses(result.processes);
        }
      } catch (err) {
        console.error('Failed to fetch memory processes', err);
      }
    };
    
    fetchMemoryProcesses();
    const interval = setInterval(fetchMemoryProcesses, 5000);
    return () => clearInterval(interval);
  }, [activeTab]);

  return { memoryProcesses, setMemoryProcesses };
}
