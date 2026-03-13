import React from 'react';
import { motion } from 'motion/react';

export const BreathingGuide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
      <h3 className="text-2xl font-serif italic mb-8 text-slate-800">Box Breathing</h3>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div 
          className="absolute w-full h-full border-2 border-indigo-200 rounded-full"
          animate={{ scale: [1, 1.2, 1.2, 1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Expanding Lungs/Circle */}
        <motion.div
          className="w-32 h-32 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-400"
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeInOut"
          }}
        >
          <motion.span 
            className="text-indigo-700 font-medium"
            animate={{
              opacity: [1, 0, 1, 0, 1]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            <BreathingText />
          </motion.span>
        </motion.div>
      </div>
      
      <div className="mt-8 grid grid-cols-4 gap-4 text-xs font-mono uppercase tracking-widest text-slate-500">
        <div className="text-center">Inhale</div>
        <div className="text-center">Hold</div>
        <div className="text-center">Exhale</div>
        <div className="text-center">Hold</div>
      </div>
    </div>
  );
};

const BreathingText = () => {
  const [text, setText] = React.useState('Inhale');
  
  React.useEffect(() => {
    const sequence = ['Inhale', 'Hold', 'Exhale', 'Hold'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % 4;
      setText(sequence[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return <>{text}</>;
};
