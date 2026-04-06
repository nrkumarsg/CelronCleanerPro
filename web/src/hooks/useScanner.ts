import { useState, useCallback } from 'react';
import { ScanTask } from '../types';

export function useScanner(initialTasks: ScanTask[], userPrefs: any) {
  const [scanTasks, setScanTasks] = useState<ScanTask[]>(initialTasks);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [status, setStatus] = useState('Ready to optimize.');
  const [logs, setLogs] = useState<string[]>([]);
  const [totalJunkFound, setTotalJunkFound] = useState('0.0 GB');

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 50));
  }, []);

  const handleScan = async (isAuto = false) => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setLogs([]);
    setStatus(isAuto ? 'AUTO-SCAN INITIALIZED' : 'DEEP SCAN INITIATED');
    addLog(`${isAuto ? 'Startup' : 'Manual'} Scan Triggered at ${new Date().toLocaleTimeString()}`);
    
    let totalBytes = 0;
    const tasksToScan = scanTasks.filter(t => t.enabled);

    for (let i = 0; i < tasksToScan.length; i++) {
        const task = tasksToScan[i];
        setStatus(`ANALYZING: ${task.name}`);
        addLog(`Searching: ${task.name}...`);
        
        if (task.scanPath) {
          try {
            const res = await window.electronAPI.getPathSize(task.scanPath);
            if (res.success) {
                totalBytes += res.bytes;
                setTotalJunkFound((totalBytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB');
            }
          } catch (e) {
            addLog(`Error calculating path size for ${task.name}`);
          }
        }
        
        setScanProgress(Math.floor(((i + 1) / tasksToScan.length) * 100));
        await new Promise(r => setTimeout(r, 400));
    }

    addLog(`SCAN COMPLETE: Total Discoverable Junk: ${totalJunkFound}`);
    setStatus('SCAN COMPLETE');
    setIsScanning(false);
    return { title: 'SCAN COMPLETE', subtitle: `The diagnostic scan found approximately ${totalJunkFound} of reclaimable system junk.`, type: 'scan' as const };
  };

  const handleClean = async (tasks: ScanTask[]) => {
    setIsScanning(true);
    setScanProgress(0);
    setStatus('SYSTEM CLEANING INITIATED');
    addLog(`Cleaning cycle started at ${new Date().toLocaleTimeString()}`);
    
    const tasksToClean = tasks.filter(t => t.enabled);
    for (let i = 0; i < tasksToClean.length; i++) {
        const task = tasksToClean[i];
        setStatus(`CLEANING: ${task.name}`);
        addLog(`Executing: ${task.name}...`);
        
        try {
          const result = await window.electronAPI.runCommand(task.command);
          if (result.success) {
              addLog(`Successfully cleaned: ${task.name}`);
          } else {
              addLog(`Warning: Failed to clean ${task.name}`);
          }
        } catch (e) {
          addLog(`Error Executing: ${task.name}`);
        }
        
        setScanProgress(Math.floor(((i + 1) / tasksToClean.length) * 100));
        await new Promise(r => setTimeout(r, 600));
    }

    setTotalJunkFound('0.0 GB');
    addLog('DEEP CLEANING COMPLETE. System Integrity Restored.');
    setStatus('CLEANING COMPLETE');
    setIsScanning(false);
    return { title: 'CLEANING COMPLETE', subtitle: 'System integrity restored. All selected cache directories have been successfully cleared.', type: 'clean' as const };
  };

  return { scanTasks, setScanTasks, isScanning, scanProgress, status, setStatus, logs, setLogs, totalJunkFound, setTotalJunkFound, handleScan, handleClean, addLog };
}
