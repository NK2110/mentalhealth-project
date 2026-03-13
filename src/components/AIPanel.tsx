import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getMentalHealthExplanation } from '../services/gemini';

interface AIPanelProps {
  problemName: string;
}

export const AIPanel: React.FC<AIPanelProps> = ({ problemName }) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    setLoading(true);
    const text = await getMentalHealthExplanation(problemName);
    setExplanation(text || null);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchExplanation();
  }, [problemName]);

  return (
    <div className="bg-black/40 text-slate-300 p-6 rounded-2xl border border-white/5 shadow-2xl h-full flex flex-col overflow-hidden backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <h3 className="font-bold text-white uppercase tracking-tighter text-sm">NEURAL_ANALYSIS: {problemName}</h3>
        </div>
        <div className="text-[8px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded font-bold tracking-widest">
          LIVE_FEED
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500/50" />
              <div className="absolute inset-0 blur-lg bg-emerald-500/20 animate-pulse" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]">DECODING_PHYSIOLOGY...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={problemName}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="prose prose-invert prose-sm max-w-none text-slate-400 font-mono leading-relaxed"
            >
              <ReactMarkdown>{explanation || ""}</ReactMarkdown>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center text-[8px] text-slate-600 font-bold uppercase tracking-[0.2em]">
          <span>GEMINI_CORE_V1</span>
          <span>ENCRYPTED_LINK_ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
