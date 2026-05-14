import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Faster, smoother progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Jump progress faster at beginning, slow down near end
        const step = prev < 80 ? 5 : 2;
        return Math.min(100, prev + step);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.5 }}
      className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center pointer-events-none"
    >
      {/* Background Curtains for staggered exit */}
            <motion.div 
              initial={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.4 }}
              className="absolute inset-0 bg-teal-accent/5 z-[-1]"
            />
            
            <div className="flex flex-col items-center">
              <div className="overflow-hidden mb-8">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-editorial text-4xl md:text-7xl text-white tracking-tighter"
                >
                  FOCUS IN <span className="italic text-teal-accent opacity-90">FRAME</span>
                </motion.span>
              </div>

              <div className="relative w-64 h-px bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 bg-teal-accent origin-left"
                />
              </div>
              
              <div className="mt-10 overflow-hidden h-6">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  className="micro-label text-white/40"
                >
                  {progress < 10 && '0'}
                  {progress}% Loading Archive
                </motion.div>
              </div>
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 overflow-hidden h-8">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 }}
                className="block micro-label text-white/20"
              >
                Archiving Traditional Legacies
              </motion.span>
            </div>
    </motion.div>
  );
};
