import { useState, useEffect } from 'react';
import { 
  Download, 
  Shield, 
  Zap, 
  Trash2, 
  ChevronRight, 
  CheckCircle2, 
  Activity,
  Cpu,
  Database,
  Lock,
  ExternalLink,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { CelronLogo } from './components/CelronLogo';
import { motion, AnimatePresence } from 'framer-motion';

// Official Branding
import logoImg from './assets/logo.png';

const MOCK_STATS = [
  { label: 'CPU Usage', value: '12%', icon: Cpu, color: 'text-cyan-400' },
  { label: 'RAM Available', value: '24 GB', icon: Activity, color: 'text-purple-400' },
  { label: 'Junk Detected', value: '4.2 GB', icon: Trash2, color: 'text-yellow-400' },
  { label: 'System Health', value: 'Optimal', icon: Shield, color: 'text-green-400' },
];

const FEATURES = [
  {
    id: 'junk',
    title: 'Kernel Junk Scrubber',
    description: 'Deep-level detection of temporary files, cache, and system residue that standard cleaners miss.',
    icon: Trash2,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    details: 'Utilizes recursive measuring engines to locate dormant cache in SysTemp, Prefetch, and DNS buffers. Frees up disk space while maintaining system stability through verified deletion protocols.'
  },
  {
    id: 'memory',
    title: 'Smart Memory Optimizer',
    description: 'Instantly trim bloated process working sets to reclaim RAM without closing your apps.',
    icon: Zap,
    gradient: 'from-purple-500/20 to-pink-500/20',
    details: 'Invokes the TrimWorkingSet() method via the .NET System.Diagnostics namespace. Strategically reduces the physical memory footprint of background applications without causing process termination.'
  },
  {
    id: 'privacy',
    title: 'Privacy Vault Scrub',
    description: 'Securely wipe activity logs across Explorer, clipboard, and all major browsers with one click.',
    icon: Lock,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    details: 'Deep-cleans the Windows Explorer activity history, clipboard data, and browser caches. Implements military-grade "write-zeros" concepts to ensure your forensic footprint is eradicated.'
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<typeof FEATURES[0] | null>(null);
  const DOWNLOAD_URL = "https://drive.google.com/file/d/17vYj-b1tTQqBGQ-PIno_uBJcDamv-RWh/view?usp=sharing";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans antialiased overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2%_2%,rgba(34,211,238,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_98%_98%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-black/60 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <img src={logoImg} className="w-12 h-12 object-contain" alt="Logo" />
             <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Celron Cleaner</span>
                <span className="text-[10px] text-cyan-400 font-tech tracking-widest uppercase">Celron Enterprises PTE LTD</span>
             </div>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/60">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#book" className="hover:text-cyan-400 transition-colors">Technical Book</a>
            <a href={DOWNLOAD_URL} className="px-5 py-2.5 bg-white text-black rounded-full hover:bg-cyan-400 hover:text-black transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-cyan-500/20">
              Download Tool
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-44 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              Next-Gen System Optimization
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Clean My PC <br /> 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">With Precision.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 leading-relaxed">
              Industrial-grade system maintenance tools by **Celron Enterprises**. Reclaim disk space, optimize RAM, and secure your privacy with a professional glassmorphic interface.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={DOWNLOAD_URL}
                className="group relative px-10 py-5 bg-cyan-500 text-black font-black rounded-2xl flex items-center space-x-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,211,238,0.3)] hover:shadow-cyan-500/50"
              >
                <Download className="w-6 h-6" />
                <span className="text-lg text-black font-bold">Download for Windows</span>
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {MOCK_STATS.map((stat, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col items-center text-center">
                <stat.icon className={`w-8 h-8 mb-3 ${stat.color}`} />
                <span className="text-2xl font-black">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* QR Section */}
      <section className="py-20 z-10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
           <div className="p-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-[3rem] backdrop-blur-2xl flex flex-col md:flex-row items-center gap-12 border-white/20 shadow-[0_50px_100px_-20px_rgba(34,211,238,0.1)]">
              <div className="flex-1 space-y-6">
                 <div className="w-16 h-16 bg-white p-3 rounded-2xl flex items-center justify-center shadow-2xl">
                    <img src={logoImg} alt="Celron Logo" className="w-full h-full object-contain" />
                 </div>
                 <h2 className="text-4xl font-bold tracking-tight leading-tight">Send to your PC <br /> instantly via QR.</h2>
                 <p className="text-white/40 text-lg">Scan this code from your mobile device to receive the download link directly on your target workstation.</p>
                 <div className="flex items-center space-x-4 text-cyan-400 font-bold p-4 bg-cyan-400/5 rounded-2xl w-fit border border-cyan-400/10">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Safe & Verified Deployment</span>
                 </div>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                 <div className="relative w-48 h-48 bg-white p-4 rounded-3xl shadow-2xl">
                    <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://drive.google.com/file/d/17vYj-b1tTQqBGQ-PIno_uBJcDamv-RWh/view?usp=sharing')] bg-cover bg-center" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold mb-4">Industrial Optimization.</h2>
             <p className="text-white/40">Clean, optimize, and secure with enterprise-grade precision.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <div key={i} className={`p-8 bg-gradient-to-br ${feature.gradient} border border-white/10 rounded-[2.5rem] hover:border-cyan-500 transition-all group backdrop-blur-sm relative overflow-hidden`}>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed mb-8">{feature.description}</p>
                <button 
                  onClick={() => setSelectedFeature(feature)}
                  className="flex items-center text-white/20 group-hover:text-cyan-400 transition-colors font-bold text-sm"
                >
                  Learn technical details <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Book Section */}
      <section id="book" className="py-20 z-10 relative border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <Database className="w-16 h-16 text-cyan-400 mb-8 opacity-20" />
            <h2 className="text-4xl font-bold mb-6 text-center">The Developer Registry.</h2>
            <p className="text-white/40 text-center max-w-2xl mb-12">
               Celron Cleaner is built on transparent, high-integrity logic. Explore our technical variables and architectural implementation details in the official manual.
            </p>
            <div className="w-full max-w-4xl p-1 px-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-[2rem]">
               <div className="bg-black/80 backdrop-blur-xl p-10 rounded-[1.9rem] border border-white/5">
                  <h3 className="font-tech text-cyan-400 text-xs tracking-widest uppercase mb-6">Internal LOGIC_VERSION_1.0</h3>
                  <div className="grid md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <h4 className="font-bold flex items-center space-x-2"><Info className="w-4 h-4 text-cyan-400" /> <span>Variable Registry</span></h4>
                        <p className="text-xs text-white/30 leading-relaxed">Mapping over 50 system constants including INITIAL_SCAN_TASKS and VOUCHER_CODES for Enterprise integration.</p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="font-bold flex items-center space-x-2"><Activity className="w-4 h-4 text-purple-400" /> <span>Memory Engine</span></h4>
                        <p className="text-xs text-white/30 leading-relaxed">Direct interaction with the Windows .NET TrimWorkingSet service for low-latency RAM reclamation.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Feature Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full text-white/40"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-4 mb-8">
                 <div className="p-4 bg-white/5 rounded-2xl">
                    <selectedFeature.icon className="w-8 h-8 text-cyan-400" />
                 </div>
                 <h2 className="text-3xl font-bold">{selectedFeature.title}</h2>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 mb-8">
                 <h3 className="text-xs font-tech text-cyan-400 uppercase tracking-widest mb-4">Technical Specification</h3>
                 <p className="text-white/60 leading-relaxed text-lg italic">
                    "{selectedFeature.details}"
                 </p>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2 text-xs text-white/20 font-tech uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Kernel Integrity Verified</span>
                 </div>
                 <button 
                  onClick={() => setSelectedFeature(null)}
                  className="px-8 py-3 bg-white text-black font-bold rounded-xl"
                 >
                   Understood
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <img src={logoImg} className="w-10 h-10 object-contain grayscale opacity-30" alt="Logo" />
            <span className="text-sm font-tech text-white/30 uppercase tracking-[0.3em]">Celron Engineering Unit</span>
          </div>
          <div className="flex items-center space-x-8 text-xs font-medium text-white/30 uppercase tracking-widest leading-none">
            <span className="flex items-center"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" /> v1.0.0 Stable</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Security Manual</a>
          </div>
        </div>
        <div className="text-center mt-12 text-[10px] text-white/10 font-tech uppercase tracking-[0.5em]">
          © 2026 Celron Enterprises PTE LTD. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
