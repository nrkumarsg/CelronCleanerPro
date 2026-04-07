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
  X,
  Mail,
  Phone,
  Globe,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logoImg from './assets/logo_seal.png';
import flyerImg from './assets/flyer.png';
import flyerDetailedImg from './assets/flyer_detailed.png';
import voucherImg from './assets/voucher.png';
import voucherPremiumImg from './assets/voucher_premium.png';
import voucherFinalImg from './assets/voucher_final.png';
import cardFrontImg from './assets/card_front.png';
import cardBackImg from './assets/card_back.png';

const MOCK_STATS = [
  { label: 'CPU Usage', value: '12%', icon: Cpu, color: 'text-cyan-400' },
  { label: 'RAM Available', value: '24 GB', icon: Activity, color: 'text-purple-400' },
  { label: 'Junk Detected', value: '4.2 GB', icon: Trash2, color: 'text-yellow-400' },
  { label: 'System Health', value: 'Optimal', icon: Shield, color: 'text-green-400' },
];

const BRAND_ASSETS = [
  { id: 'final_voucher', title: 'Enterprise Pro Voucher', image: voucherFinalImg, description: 'Absolute final USD $80 printable license with Oil Stamped Seal.' },
  { id: 'premium_voucher', title: 'Shield Edition Voucher', image: voucherPremiumImg, description: 'Hybrid traditional-modern $80 printable license.' },
  { id: 'flyer', title: 'Corporate Flyer', image: flyerImg, description: 'Service overview and industrial capabilities.' },
  { id: 'flyer_detailed', title: 'Services & Support', image: flyerDetailedImg, description: 'Full list of electrical & instrumentation services.' },
  { id: 'card_front', title: 'Business Card (Front)', image: cardFrontImg, description: 'Official corporate contact and identity.' },
  { id: 'card_back', title: 'Business Card (Back)', image: cardBackImg, description: 'Electrical and instrumentation supply registry.' },
];

const ONBOARDING_STEPS = [
  { step: 1, title: 'Switch to your PC', description: 'Open your web browser on a Windows computer.' },
  { step: 2, title: 'Visit this Site', description: 'Enter this URL: celron-cleaner-pro.vercel.app' },
  { step: 3, title: 'Download & Install', description: 'Click "Download for Windows" and run the installer.' },
  { step: 4, title: 'Activate Pro', description: 'Go to "Activation" and enter your voucher code: CELRON-PRO-2026' },
];

const FEATURES = [
  {
    id: 'junk',
    title: 'Kernel Junk Scrubber',
    description: 'Deep-level detection of temporary files, cache, and system residue that standard cleaners miss.',
    icon: Trash2,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    details: 'Utilizes recursive measuring engines to locate dormant cache in SysTemp, Windows Cache, and Prefetch buffers. Frees up disk space while maintaining system stability.'
  },
  {
    id: 'memory',
    title: 'Smart Memory Optimizer',
    description: 'Instantly trim bloated process working sets to reclaim RAM without closing your apps.',
    icon: Zap,
    gradient: 'from-purple-500/20 to-pink-500/20',
    details: 'Invokes the TrimWorkingSet() method via the .NET System.Diagnostics namespace. Strategically reduces the physical memory footprint of background applications.'
  },
  {
    id: 'privacy',
    title: 'Privacy Vault Scrub',
    description: 'Securely wipe activity logs across Explorer, clipboard, and all major browsers with one click.',
    icon: Lock,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    details: 'Deep-cleans the Windows Explorer activity history, clipboard data, and browser caches. Implements military-grade security protocols for forensic eradication.'
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [viewingAsset, setViewingAsset] = useState<any>(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  const DOWNLOAD_URL = "https://drive.google.com/file/d/17vYj-b1tTQqBGQ-PIno_uBJcDamv-RWh/view?usp=sharing";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans antialiased overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2%_2%,rgba(34,211,238,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_98%_98%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* Mobile-Guided Navigation Banner */}
      <AnimatePresence>
        {isMobile && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full bg-cyan-500 text-black py-3 px-6 z-[60] flex items-center justify-between shadow-2xl"
          >
            <div className="flex items-center space-x-2 font-bold text-sm">
               <Shield className="w-4 h-4" />
               <span>Switch to PC to Download - Use Voucher Code</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-black/60 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-6'} ${isMobile ? 'translate-y-12' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <img src={logoImg} className="w-12 h-12 object-contain" alt="Logo" />
             <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Celron Cleaner</span>
                <span className="text-[10px] text-cyan-400 font-tech tracking-widest uppercase italic">Cel-ron Enterprises Pte Ltd</span>
             </div>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/60">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#media" className="hover:text-cyan-400 transition-colors">Vouchers</a>
            <a href={DOWNLOAD_URL} className="px-5 py-2.5 bg-white text-black rounded-full hover:bg-cyan-400 hover:text-black transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-cyan-500/20">
              Download Tool
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={`relative pt-44 pb-20 px-6 z-10 ${isMobile ? 'pt-60' : ''}`}>
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

            {isMobile ? (
              /* Mobile Guided Onboarding */
              <div className="max-w-md mx-auto bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl text-left mb-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 bg-cyan-500 text-black font-black text-[10px] rounded-bl-2xl">MOBILE GUIDE</div>
                 <h2 className="text-xl font-bold mb-6 flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-cyan-400" />
                    <span>Installation Guide</span>
                 </h2>
                 <div className="space-y-6">
                    {ONBOARDING_STEPS.map((s) => (
                       <div key={s.step} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center font-black shrink-0 text-sm italic">{s.step}</div>
                          <div>
                             <h3 className="font-bold text-sm block">{s.title}</h3>
                             <p className="text-white/40 text-xs mt-1">{s.description}</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <a 
                   href="whatsapp://send?text=Visit https://celron-cleaner-pro.vercel.app on your PC to download Celron Cleaner! Voucher: CELRON-PRO-2026" 
                   className="mt-8 w-full py-4 bg-green-500 text-black font-black rounded-2xl flex items-center justify-center space-x-3 hover:bg-green-400 transition-colors"
                 >
                    <ExternalLink className="w-5 h-5" />
                    <span>Send link to my PC</span>
                 </a>
              </div>
            ) : (
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 leading-relaxed">
                Industrial-grade system maintenance tools by **Cel-ron Enterprises**. Reclaim disk space, optimize RAM, and secure your privacy with a professional glassmorphic interface.
              </p>
            )}
            
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 ${isMobile ? 'hidden' : ''}`}>
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

          {/* Real-time Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto ${isMobile ? 'hidden' : ''}`}
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
                   View technical details <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Media Gallery & Vouchers */}
      <section id="media" className="py-20 z-10 relative bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">Corporate Catalog.</h2>
              <p className="text-white/40 text-lg">Official service flyer and premium $80 vouchers for exclusive enterprise clients.</p>
            </div>
            <div className="flex items-center space-x-2 text-cyan-400 font-tech uppercase tracking-widest text-xs px-4 py-2 bg-cyan-400/5 border border-cyan-400/10 rounded-full">
              <Shield className="w-4 h-4" />
              <span>Verified Brand Assets</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_ASSETS.map((asset) => (
              <motion.div 
                key={asset.id}
                whileHover={{ y: -10 }}
                onClick={() => setViewingAsset(asset)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] md:aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-cyan-400/50 transition-all shadow-2xl">
                   <img 
                    src={asset.image} 
                    alt={asset.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                   <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold">{asset.title}</h4>
                        <ExternalLink className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-white/40">{asset.description}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Registry Preview */}
      <section id="book" className="py-20 z-10 relative border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            <Database className="w-16 h-16 text-cyan-400 mb-8 opacity-20" />
            <h2 className="text-4xl font-bold mb-6">The Developer Registry.</h2>
            <p className="text-white/40 max-w-2xl mb-12">
               Celron Cleaner is built on transparent, high-integrity logic. Explore technical variables and logic versioning in the official manual.
            </p>
            <div className="w-full max-w-4xl p-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-[2rem]">
               <div className="bg-black/80 backdrop-blur-xl p-10 rounded-[1.9rem] border border-white/5">
                  <h3 className="font-tech text-cyan-400 text-xs tracking-widest uppercase mb-6 text-left">Internal LOGIC_VERSION_1.0</h3>
                  <div className="grid md:grid-cols-2 gap-10 text-left">
                     <div className="space-y-4">
                        <h4 className="font-bold flex items-center space-x-2"><Info className="w-4 h-4 text-cyan-400" /> <span>Variable Registry</span></h4>
                        <p className="text-xs text-white/30 leading-relaxed uppercase">Mapping system constants including INITIAL_SCAN_TASKS and VOUCHER_CODES.</p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="font-bold flex items-center space-x-2"><Activity className="w-4 h-4 text-purple-400" /> <span>Memory Engine</span></h4>
                        <p className="text-xs text-white/30 leading-relaxed uppercase">Direct interaction with local system services for low-latency optimization.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-32 z-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Get in Touch.</h2>
                <p className="text-white/40 text-lg max-w-md leading-relaxed">
                  Connect with our Singapore headquarters for industrial maintenance systems, technical support, or enterprise licensing.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors group">
                  <div className="p-3 bg-cyan-400/10 rounded-xl text-cyan-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white/40 text-xs font-tech uppercase tracking-widest mb-1">Headquarters</h4>
                    <p className="font-bold">10, Jln. Besar, #03-05, Singapore 208787</p>
                    <p className="text-xs text-white/20 mt-1 uppercase font-tech">Reg No: CR.NO.201436227C</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <a href="tel:+6581962270" className="flex items-center space-x-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors group">
                    <div className="p-3 bg-cyan-400/10 rounded-xl text-cyan-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white/40 text-xs font-tech uppercase tracking-widest mb-1">Phone</h4>
                      <p className="font-bold">+65 81962270</p>
                    </div>
                  </a>

                  <a href="mailto:sales@celron.net" className="flex items-center space-x-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-colors group">
                    <div className="p-3 bg-purple-400/10 rounded-xl text-purple-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white/40 text-xs font-tech uppercase tracking-widest mb-1">Email</h4>
                      <p className="font-bold">sales@celron.net</p>
                    </div>
                  </a>
                </div>

                <a href="https://www.celron.shop" target="_blank" rel="noreferrer" className="flex items-center space-x-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors group">
                  <div className="p-3 bg-cyan-400/10 rounded-xl text-cyan-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white/40 text-xs font-tech uppercase tracking-widest mb-1">Official Website</h4>
                    <p className="font-bold">www.celron.shop</p>
                  </div>
                </a>
              </div>

              <div className="pt-6">
                 <a 
                  href="https://wa.me/6581962270" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center space-x-4 px-8 py-4 bg-[#25D366] text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(37,211,102,0.3)]"
                 >
                   <MessageSquare className="w-6 h-6" />
                   <span>Start WhatsApp Chat</span>
                 </a>
              </div>
            </div>

            {/* Right: Interactive Business Cards */}
            <div className="flex flex-col items-center">
               <div className="relative w-full max-w-md aspect-[1.75/1] perspective-1000 group cursor-pointer" 
                    onMouseEnter={() => setCardFlipped(true)}
                    onMouseLeave={() => setCardFlipped(false)}
                    onClick={() => setCardFlipped(!cardFlipped)}
               >
                  <motion.div 
                    className="relative w-full h-full duration-700 preserve-3d"
                    animate={{ rotateY: cardFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="w-full h-full bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                        <img src={cardFrontImg} alt="Business Card Front" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className="w-full h-full bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                        <img src={cardBackImg} alt="Business Card Back" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Flip Hint */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white/20 text-[10px] uppercase tracking-widest font-tech font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Hover or Tap to flip business card</span>
                  </div>
               </div>

               {/* QR Hub Hub */}
               <div className="mt-20 w-48 h-48 p-4 bg-white rounded-3xl shadow-2xl relative">
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-cyan-500 text-black text-[10px] font-black rounded-lg shadow-lg">SCAN ME</div>
                  <img 
                    src={cardFrontImg} 
                    className="w-full h-full object-contain opacity-10 absolute inset-0 grayscale p-10" 
                    alt="B-Card Ghost"
                  />
                  {/* Since I don't have a separate QR image, I'll use a placeholder representing the WhatsApp QR on the card */}
                  <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-black/10 rounded-xl relative z-10">
                    <MessageSquare className="w-12 h-12 text-black/20" />
                  </div>
               </div>
               <p className="mt-6 text-[10px] text-white/30 uppercase tracking-widest font-tech font-bold">WhatsApp Direct Access Hub</p>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Lightbox Modal */}
      <AnimatePresence>
        {viewingAsset && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingAsset(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
            >
              <button 
                onClick={() => setViewingAsset(null)}
                className="absolute -top-16 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[160]"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="w-full max-h-[70vh] overflow-auto rounded-[2.5rem] bg-black shadow-[0_0_100px_rgba(34,211,238,0.2)] scrollbar-hide border border-white/10">
                 <img 
                  src={viewingAsset.image} 
                  alt={viewingAsset.title} 
                  className="w-full h-auto block" 
                 />
              </div>
              <div className="mt-8 text-center text-white/40 font-medium">
                  Viewing: <span className="text-white">{viewingAsset.title}</span> — {viewingAsset.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feature Technical Modal */}
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
                  className="px-8 py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform"
                 >
                   Understood
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/6581962270?text=Hello%20Celron%20Support,%20I%20am%20interested%20in%20Celron%20Cleaner%20Pro." 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[110] p-4 bg-[#25D366] text-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="flex items-center space-x-3">
          <div className="md:max-w-0 md:group-hover:max-w-xs overflow-hidden transition-all duration-500 whitespace-nowrap font-bold text-sm">
             Contact Support
          </div>
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.347.223-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.435 5.633 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </div>
      </a>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <img src={logoImg} className="w-10 h-10 object-contain grayscale opacity-30" alt="Logo" />
            <div className="flex flex-col">
               <span className="text-[10px] font-tech text-white/30 uppercase tracking-[0.3em]">Celron Engineering Unit</span>
               <span className="text-[9px] font-tech text-white/20 uppercase tracking-widest mt-1">SGP Deployment Hub | V1.0.0</span>
            </div>
          </div>
          <div className="flex items-center space-x-8 text-xs font-medium text-white/30 uppercase tracking-widest leading-none">
            <a 
               href="https://wa.me/6581962270?text=Hello%20Celron%20Support,%20I%20want%20to%20order%20the%20Pro%20Edition." 
               target="_blank" 
               rel="noreferrer" 
               className="text-green-400 border-b border-green-400/20 pb-1 hover:text-white hover:border-white transition-all flex items-center"
            >
               Order Pro via WhatsApp
            </a>
            <span className="flex items-center"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" /> v1.0.0 Stable</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Security Manual</a>
          </div>
        </div>
        <div className="text-center mt-12 text-[10px] text-white/10 font-tech uppercase tracking-[0.5em] px-6">
          © 2026 Cel-ron Enterprises Pte Ltd, Singapore. All Rights Reserved. <br className="md:hidden" /> High-Performance Industrial Maintenance Utility.
        </div>
      </footer>
    </div>
  );
}
