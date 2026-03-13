import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Heart, Activity, Moon, User, Send, Loader2 } from 'lucide-react';
import { getSelfCheckAnalysis } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export const SelfCheckForm: React.FC = () => {
  const [formData, setFormData] = useState({
    sleepHours: 7,
    stressLevel: 5,
    studyLoad: 5,
    mood: 'neutral'
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const analysis = await getSelfCheckAnalysis(formData);
    setResult(analysis || null);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-black/40 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md text-[10px] uppercase tracking-[0.2em] mb-6">
            <Activity className="w-3 h-3" /> DIAGNOSTIC_INTERFACE
          </div>
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tighter uppercase">Self-Check</h2>
          <p className="text-slate-500 mb-8 text-xs uppercase tracking-wider leading-relaxed">
            Input biometric and behavioral data to generate a physiological impact analysis.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                <Moon className="w-4 h-4 text-emerald-500/50" /> SLEEP_DURATION
              </label>
              <input 
                type="range" min="0" max="12" step="0.5"
                value={formData.sleepHours}
                onChange={(e) => setFormData({...formData, sleepHours: parseFloat(e.target.value)})}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-600 tracking-widest">
                <span>0.0H</span>
                <span className="text-emerald-500">{formData.sleepHours.toFixed(1)}H</span>
                <span>12.0H</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                <Activity className="w-4 h-4 text-emerald-500/50" /> STRESS_INDEX
              </label>
              <input 
                type="range" min="1" max="10"
                value={formData.stressLevel}
                onChange={(e) => setFormData({...formData, stressLevel: parseInt(e.target.value)})}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-600 tracking-widest">
                <span>LOW</span>
                <span className="text-emerald-500">{formData.stressLevel}</span>
                <span>CRITICAL</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                <Brain className="w-4 h-4 text-emerald-500/50" /> COGNITIVE_LOAD
              </label>
              <input 
                type="range" min="1" max="10"
                value={formData.studyLoad}
                onChange={(e) => setFormData({...formData, studyLoad: parseInt(e.target.value)})}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-600 tracking-widest">
                <span>MINIMAL</span>
                <span className="text-emerald-500">{formData.studyLoad}</span>
                <span>MAXIMUM</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                <User className="w-4 h-4 text-emerald-500/50" /> AFFECTIVE_STATE
              </label>
              <select 
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 uppercase tracking-widest focus:border-emerald-500/50 outline-none transition-all appearance-none"
              >
                <option value="happy">Energetic / High Valence</option>
                <option value="neutral">Balanced / Baseline</option>
                <option value="sad">Depressed / Low Valence</option>
                <option value="anxious">Hyper-Arousal / Anxious</option>
                <option value="tired">Exhaustion / Burnout</option>
              </select>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white rounded-lg font-bold uppercase tracking-[0.2em] text-xs hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              RUN_ANALYSIS_PROTOCOL
            </button>
          </form>
        </div>

        <div className="bg-black/40 rounded-xl p-8 border border-white/5 min-h-[500px] relative overflow-hidden">
          {/* Tech background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          {result ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-bold">
                <Activity className="w-3 h-3" /> ANALYSIS_REPORT // GENERATED
              </div>
              <div className="prose prose-invert prose-sm max-w-none text-slate-400 font-mono leading-relaxed">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center relative z-10">
              <div className="w-16 h-16 border-2 border-dashed border-slate-800 rounded-full flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                <Activity className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold">AWAITING_DATA_INPUT</p>
              <p className="text-[9px] uppercase tracking-widest mt-2 opacity-50">SYSTEM READY FOR BIOMETRIC PROCESSING</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
