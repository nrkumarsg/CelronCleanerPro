import { useState, useEffect } from 'react';
import { 
  Trash2, 
  Settings as SettingsIcon, 
  LayoutDashboard, 
  X, 
  Minus, 
  Square,
  Activity,
  Zap,
  Lock,
  Minus as MinusIcon,
  HelpCircle,
  Clock
} from 'lucide-react';
import { CelronLogo } from './components/CelronLogo';
import { Tab } from './types';
import { INITIAL_SCAN_TASKS, DEFAULT_USER_PREFS, DEFAULT_PRIVACY_SETTINGS, VOUCHER_CODES } from './config/constants';

// UI Components
import { SidebarItem } from './components/UI/SidebarItem';
import { ResultModal, ConfirmModal } from './components/UI/Modals';

// Feature Components
import { Dashboard } from './components/Dashboard/Dashboard';
import { MemoryOptimizer } from './components/Cleaner/MemoryOptimizer';
import { JunkScrubber } from './components/Cleaner/JunkScrubber';
import { PrivacyGuard } from './components/Cleaner/PrivacyGuard';
import { Settings } from './components/Settings/Settings';
import { Activation } from './components/Settings/Activation';
import { HelpManual } from './components/Help/HelpManual';

// Custom Hooks
import { useSystemStats } from './hooks/useSystemStats';
import { useMemoryProcesses } from './hooks/useMemoryProcesses';
import { useScanner } from './hooks/useScanner';
import { usePrivacy } from './hooks/usePrivacy';
import { useSettings } from './hooks/useSettings';

// Define the API type for TypeScript
declare global {
  interface Window {
    electronAPI: {
      runCommand: (command: string) => Promise<{ success: boolean, stdout?: string, stderr?: string, error?: string }>,
      getSystemStats: () => Promise<any>,
      getPathSize: (path: string) => Promise<{ success: boolean, bytes: number, mb: number }>,
      getTopMemoryProcesses: () => Promise<{ success: boolean, processes: any[] }>,
      clearPrivacyData: (type: 'explorer' | 'clipboard' | 'browsers') => Promise<{ success: boolean }>,
      trimMemory: () => Promise<{ success: boolean }>,
      windowControls: (action: 'minimize' | 'maximize' | 'close') => void,
      onUpdate: (callback: (message: string) => void) => void,
    }
  }
}

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalData, setModalData] = useState<{ title: string, subtitle: string, type: 'scan' | 'clean' }>({ title: '', subtitle: '', type: 'scan' });
  
  // Licensing State
  const [isPro, setIsPro] = useState(() => localStorage.getItem('celron_pro_active') === 'true');
  const [voucherCode, setVoucherCode] = useState('');
  const [activationMsg, setActivationMsg] = useState('');

  // Feature Hooks
  const { userPrefs, setUserPrefs } = useSettings(DEFAULT_USER_PREFS);
  const { scanTasks, setScanTasks, isScanning, scanProgress, status, logs, totalJunkFound, handleScan, handleClean, addLog } = useScanner(INITIAL_SCAN_TASKS, userPrefs);
  const { stats, cpuHistory, ramHistory, systemHealth } = useSystemStats(totalJunkFound);
  const { memoryProcesses } = useMemoryProcesses(activeTab);
  const { privacySettings, setPrivacySettings, isWiping, handleWipe } = usePrivacy(DEFAULT_PRIVACY_SETTINGS, addLog);

  // Auto-scan on Startup
  useEffect(() => {
    if (userPrefs.autoScan) {
      const timer = setTimeout(() => handleScan(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Window Controls
  const handleWindowControl = (action: 'minimize' | 'maximize' | 'close') => {
    window.electronAPI.windowControls(action);
  };

  // Licensing Logic
  const handleActivate = () => {
    if (VOUCHER_CODES.includes(voucherCode.toUpperCase())) {
      setIsPro(true);
      localStorage.setItem('celron_pro_active', 'true');
      setActivationMsg('✓ VOUCHER VALID: Kernel Enterprise Unlocked.');
    } else {
      setActivationMsg('✗ ACCESS DENIED: Invalid Deployment Voucher.');
    }
  };

  // Optimization Triggers
  const triggerRAMOptimization = async () => {
    await window.electronAPI.trimMemory();
    addLog('✓ Memory working set trimmed successfully.');
  };

  const handleCleanTrigger = () => {
     const downloadsEnabled = scanTasks.find(t => t.id === 'downloads')?.enabled;
     if (downloadsEnabled) {
        setModalData({
           title: 'DOWNLOADS WARNING',
           subtitle: 'The Downloads folder often contains personal documents. Are you sure you want to proceed with permanent deletion?',
           type: 'clean'
        });
        setShowConfirmModal(true);
     } else {
        setShowConfirmModal(true);
     }
  };

  const executeClean = async () => {
    setShowConfirmModal(false);
    const result = await handleClean(scanTasks);
    if (result) {
       setModalData(result);
       setShowResultModal(true);
    }
  };

  const executeManualScan = async () => {
    const result = await handleScan();
    if (result) {
       setModalData(result);
       setShowResultModal(true);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden font-tech antialiased">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2%_2%,rgba(34,211,238,0.08),transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_98%_98%,rgba(168,85,247,0.08),transparent_40%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Industrial Hardware Sidebar */}
      <aside className={`relative z-20 border-r border-white/5 transition-all duration-500 ease-in-out flex flex-col bg-black/40 backdrop-blur-xl ${collapsed ? 'w-20' : 'w-72'}`}>
        <div className="p-8 flex items-center mb-8">
           <div className="scale-75 origin-left"><CelronLogo /></div>
        </div>
        
        <nav className="flex-1 space-y-2 px-3">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Command Center" active={activeTab === 'dashboard'} onClick={setActiveTab} collapsed={collapsed} />
          <SidebarItem id="memory" icon={Activity} label="Cache Engine" active={activeTab === 'memory'} onClick={setActiveTab} collapsed={collapsed} />
          <SidebarItem id="junk" icon={Trash2} label="Kernel Scrubber" active={activeTab === 'junk'} onClick={setActiveTab} collapsed={collapsed} alert={systemHealth < 80} />
          <SidebarItem id="privacy" icon={Lock} label="Privacy Vault" active={activeTab === 'privacy'} onClick={setActiveTab} collapsed={collapsed} />
        </nav>

        <div className="p-3 border-t border-white/5 space-y-2 mb-4">
           <SidebarItem id="activation" icon={Zap} label={isPro ? "Enterprise Pro" : "Free Unit"} active={activeTab === 'activation'} onClick={setActiveTab} collapsed={collapsed} />
           <SidebarItem id="settings" icon={SettingsIcon} label="Configuration" active={activeTab === 'settings'} onClick={setActiveTab} collapsed={collapsed} />
           <SidebarItem id="help" icon={HelpCircle} label="Operator Manual" active={activeTab === 'help'} onClick={setActiveTab} collapsed={collapsed} />
        </div>
      </aside>

      {/* Main Terminal View */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Hardware Title Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/20 backdrop-blur-md">
           <div className="flex items-center space-x-6">
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40"
              >
                <div className="w-5 h-[1px] bg-current mb-1" />
                <div className="w-3 h-[1px] bg-current mb-1" />
                <div className="w-5 h-[1px] bg-current" />
              </button>
              <div className="h-6 w-[1px] bg-white/5" />
              <div className="flex flex-col">
                 <span className="text-[10px] text-white/30 font-tech uppercase tracking-[0.2em] mb-1">State Indicator</span>
                 <div className="flex items-center space-x-3">
                   <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse ${systemHealth > 80 ? 'text-cyan-400' : 'text-yellow-500'}`} />
                   <span className={`text-xs font-tech font-bold uppercase tracking-widest ${systemHealth > 80 ? 'text-cyan-400' : 'text-yellow-500'}`}>
                     {systemHealth > 80 ? 'Secure' : 'Alert: Optimization Required'}
                   </span>
                 </div>
              </div>
           </div>

           {/* Window Controls */}
           <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 px-4 py-2 bg-white/5 rounded-lg border border-white/5 mr-4">
                 <span className="text-[10px] text-white/30 font-tech uppercase">License:</span>
                 <span className={`text-[10px] font-tech font-bold uppercase ${isPro ? 'text-cyan-400' : 'text-white/40'}`}>
                    {isPro ? 'ENTERPRISE-PRO' : 'PUBLIC-BETA'}
                 </span>
              </div>
              <button onClick={() => handleWindowControl('minimize')} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
                <Minus size={16} />
              </button>
              <button onClick={() => handleWindowControl('maximize')} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white">
                <Square size={14} />
              </button>
              <button onClick={() => handleWindowControl('close')} className="w-8 h-8 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-white/40">
                <X size={18} />
              </button>
           </div>
        </header>

        {/* Dynamic Content Switching */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-12 relative">
           <div className="max-w-6xl mx-auto pb-24">
              {activeTab === 'dashboard' && <Dashboard stats={stats} cpuHistory={cpuHistory} ramHistory={ramHistory} systemHealth={systemHealth} />}
              {activeTab === 'memory' && <MemoryOptimizer isOptimizingRAM={false} onOptimize={triggerRAMOptimization} processes={memoryProcesses} />}
              {activeTab === 'junk' && <JunkScrubber 
                                          isScanning={isScanning} 
                                          scanProgress={scanProgress} 
                                          status={status} 
                                          totalJunkFound={totalJunkFound} 
                                          scanTasks={scanTasks} 
                                          onTaskToggle={(id) => setScanTasks(prev => prev.map(t => t.id === id ? {...t, enabled: !t.enabled} : t))}
                                          onScan={executeManualScan}
                                          onClean={handleCleanTrigger}
                                          logs={logs}
                                        />}
              {activeTab === 'privacy' && <PrivacyGuard 
                                          isWiping={isWiping} 
                                          settings={privacySettings} 
                                          onSettingToggle={(key) => setPrivacySettings(prev => ({...prev, [key]: !prev[key]}))}
                                          onWipe={async () => {
                                             const res = await handleWipe();
                                             if (res) { setModalData(res); setShowResultModal(true); }
                                          }}
                                        />}
              {activeTab === 'settings' && <Settings prefs={userPrefs} onToggle={(key) => setUserPrefs(prev => ({...prev, [key]: !prev[key]}))} />}
              {activeTab === 'activation' && <Activation 
                                              isPro={isPro} 
                                              voucherCode={voucherCode} 
                                              onVoucherChange={setVoucherCode} 
                                              onActivate={handleActivate} 
                                              message={activationMsg} 
                                            />}
              {activeTab === 'help' && <HelpManual />}
           </div>
        </div>

        {/* Global Footer Banner */}
        <footer className="h-12 border-t border-white/5 bg-black/40 backdrop-blur-md px-10 flex items-center justify-between pointer-events-none">
           <div className="flex items-center space-x-4">
              <span className="text-[10px] text-white/20 font-tech uppercase tracking-widest leading-none">Celron Engineering Unit V1.0.0</span>
              <div className="w-[1px] h-3 bg-white/5" />
              <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                 <span className="text-[9px] text-cyan-400/50 font-tech uppercase">Secure Kernel Link Active</span>
              </div>
           </div>
           <div className="flex items-center space-x-2 text-[9px] text-white/20 font-tech uppercase">
              <span>Environment: Production-Stable</span>
              <span className="mx-2">|</span>
              <span>Encrypted Diagnostics On</span>
           </div>
        </footer>
      </main>

      {/* Global Modals */}
      <ResultModal show={showResultModal} data={modalData} onClose={() => setShowResultModal(false)} />
      <ConfirmModal show={showConfirmModal} onConfirm={executeClean} onCancel={() => setShowConfirmModal(false)} title={modalData.type === 'clean' ? modalData.title : undefined} subtitle={modalData.type === 'clean' ? modalData.subtitle : undefined} />
    </div>
  );
}
