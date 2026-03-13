import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Heart, 
  Activity, 
  Wind, 
  ChevronRight, 
  Info, 
  Menu, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HumanBody } from './components/HumanBody';
import { AIPanel } from './components/AIPanel';
import { BreathingGuide } from './components/BreathingGuide';
import { SelfCheckForm } from './components/SelfCheckForm';
import { PROBLEMS, MentalHealthProblem, ORGAN_DETAILS } from './constants';
import { cn } from './lib/utils';

export default function App() {
  const [view, setView] = useState<'landing' | 'explore' | 'check'>('landing');
  const [selectedProblem, setSelectedProblem] = useState<MentalHealthProblem>(PROBLEMS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-300 font-mono selection:bg-emerald-500/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView('landing')}
        >
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tighter text-white leading-none">PSYCHESOMA</span>
            <span className="text-[10px] tracking-[0.2em] text-emerald-500 font-bold">LAB // V1.0</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-slate-500">
          <button onClick={() => setView('landing')} className={cn("hover:text-emerald-400 transition-colors", view === 'landing' && "text-emerald-400 font-bold")}>[ 01 ] HOME</button>
          <button onClick={() => setView('explore')} className={cn("hover:text-emerald-400 transition-colors", view === 'explore' && "text-emerald-400 font-bold")}>[ 02 ] EXPLORE</button>
          <button onClick={() => setView('check')} className={cn("hover:text-emerald-400 transition-colors", view === 'check' && "text-emerald-400 font-bold")}>[ 03 ] DIAGNOSTIC</button>
        </div>

        <button 
          className="md:hidden p-2 text-slate-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-40 bg-black/95 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-xl font-bold tracking-widest text-emerald-500">
              <button onClick={() => { setView('landing'); setIsMenuOpen(false); }}>01 // HOME</button>
              <button onClick={() => { setView('explore'); setIsMenuOpen(false); }}>02 // EXPLORE</button>
              <button onClick={() => { setView('check'); setIsMenuOpen(false); }}>03 // DIAGNOSTIC</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-12">
        {view === 'landing' && (
          <LandingView onExplore={() => setView('explore')} />
        )}

        {view === 'explore' && (
          <ExploreView 
            selectedProblem={selectedProblem} 
            onSelectProblem={setSelectedProblem} 
          />
        )}

        {view === 'check' && (
          <div className="px-6">
            <SelfCheckForm />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-emerald-500" />
            <span className="font-bold tracking-tighter text-white">PSYCHESOMA LAB</span>
          </div>
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em]">SYSTEM STATUS: OPTIMAL // 2026</p>
          <div className="flex gap-6 text-slate-500 text-[10px] uppercase tracking-widest">
            <button className="hover:text-emerald-400 transition-colors">ENCRYPTION</button>
            <button className="hover:text-emerald-400 transition-colors">PROTOCOLS</button>
            <button className="hover:text-emerald-400 transition-colors">TERMINAL</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const LandingView = ({ onExplore }: { onExplore: () => void }) => (
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md text-[10px] uppercase tracking-[0.2em] mb-8">
        <Sparkles className="w-3 h-3" /> NEURAL INTERFACE ACTIVE
      </div>
      <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] mb-8 text-white tracking-tighter">
        DECODE THE <br />
        <span className="text-emerald-500">HUMAN MACHINE.</span>
      </h1>
      <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed font-mono">
        A technical diagnostic interface for exploring the physiological and hormonal impact of mental health conditions on the human body.
      </p>
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={onExplore}
          className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold uppercase tracking-[0.2em] text-xs hover:bg-emerald-500 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          INITIALIZE EXPLORATION <ArrowRight className="w-4 h-4" />
        </button>
        <button className="px-8 py-4 bg-transparent border border-white/10 text-slate-400 rounded-lg font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-all">
          VIEW PROTOCOLS
        </button>
      </div>
    </motion.div>

    <div className="h-[600px] relative">
      <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Suspense fallback={null}>
          <HumanBody hormoneColor="#10b981" />
        </Suspense>
      </Canvas>
      
      {/* Tech Overlays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-emerald-500/10 rounded-[2rem]">
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-500/30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-500/30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-emerald-500/30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-500/30" />
      </div>
    </div>
  </div>
);

const ExploreView = ({ 
  selectedProblem, 
  onSelectProblem 
}: { 
  selectedProblem: MentalHealthProblem, 
  onSelectProblem: (p: MentalHealthProblem) => void 
}) => {
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);

  const organInfo = (hoveredOrgan || activeOrgan) ? ORGAN_DETAILS[hoveredOrgan || activeOrgan || ""] : null;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar Selection */}
        <div className="lg:col-span-3 space-y-2">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-slate-600 mb-6 font-bold">// CONDITION_SELECT</h2>
          {PROBLEMS.map((problem) => (
            <button
              key={problem.id}
              onClick={() => {
                onSelectProblem(problem);
                setActiveOrgan(null);
              }}
              className={cn(
                "w-full text-left p-4 rounded-lg transition-all border flex items-center justify-between group",
                selectedProblem.id === problem.id 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                  : "bg-black/20 text-slate-500 border-white/5 hover:border-emerald-500/30"
              )}
            >
              <span className="font-bold tracking-tight uppercase text-xs">{problem.name}</span>
              <ChevronRight className={cn(
                "w-3 h-3 transition-transform",
                selectedProblem.id === problem.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
              )} />
            </button>
          ))}
        </div>

        {/* 3D Visualization Area */}
        <div className="lg:col-span-5 relative bg-black/40 rounded-2xl border border-white/5 shadow-2xl overflow-hidden min-h-[600px]">
          <div className="absolute top-6 left-6 z-10">
            <h3 className="text-xl font-bold text-white tracking-tighter uppercase">{selectedProblem.name}</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold">BIOMETRIC_VISUALIZATION // ACTIVE</p>
          </div>

          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={false} />
            <Suspense fallback={null}>
              <HumanBody 
                highlightedOrgans={selectedProblem.affectedOrgans}
                hormoneColor={selectedProblem.hormones[0]?.color}
                hormoneIntensity={selectedProblem.id === 'stress' ? 2 : 1}
                pulseSpeed={selectedProblem.id === 'anxiety' ? 2 : 1}
                onOrganHover={setHoveredOrgan}
                onOrganClick={setActiveOrgan}
              />
            </Suspense>
          </Canvas>

          {/* Organ Tooltip Overlay */}
          <AnimatePresence>
            {organInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                className="absolute top-24 right-6 left-6 md:left-auto md:w-72 bg-slate-900/90 backdrop-blur-2xl p-6 rounded-xl border border-emerald-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-20"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-white uppercase tracking-tight">{organInfo.name}</h4>
                  <button onClick={() => setActiveOrgan(null)} className="text-slate-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 font-bold mb-1">HORMONAL_IMPACT</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{organInfo.hormones}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 font-bold mb-1">PHYSIOLOGICAL_DATA</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{organInfo.impact}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
        </div>

        {/* AI Panel & Solutions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="h-[400px]">
            <AIPanel problemName={selectedProblem.name} />
          </div>
          
          <div className="bg-emerald-500/5 rounded-2xl p-6 border border-emerald-500/20">
            <h4 className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">
              <Wind className="w-4 h-4" /> REMEDIATION_PROTOCOL
            </h4>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">
              {selectedProblem.solutions[0].description}
            </p>
            {selectedProblem.solutions[0].type === 'breathing' && (
              <div className="invert brightness-200 opacity-80">
                <BreathingGuide />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Symptoms & Hormones Detail */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-bold mb-6">// HORMONAL_PROFILE</h3>
          <div className="space-y-6">
            {selectedProblem.hormones.map(hormone => (
              <div key={hormone.name} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full mt-1.5 shadow-[0_0_8px_currentColor]" style={{ backgroundColor: hormone.color, color: hormone.color }} />
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-white font-bold mb-1">{hormone.name}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{hormone.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-bold mb-6">// SYMPTOM_MANIFESTATIONS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedProblem.symptoms.map(symptom => (
              <div key={symptom} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 group hover:border-emerald-500/30 transition-colors">
                <Info className="w-3 h-3 text-emerald-500/50 group-hover:text-emerald-500" />
                <span className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-slate-200">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
