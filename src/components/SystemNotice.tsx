import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SystemNotice() {
  const [isVisible, setIsVisible] = useState(true);
  const { isDemo } = useAuth();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[200] bg-secondary text-background border-t border-[#d86b1c]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Info size={16} className="shrink-0" />
            <p className="text-xs sm:text-sm font-bold tracking-wider uppercase">
              SYSTEM_NOTICE: Demo mode. For full functional website system, visit <a href="https://vizionidigjital.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white transition-colors">vizionidigjital.com</a>
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-black/10 transition-colors rounded-full shrink-0"
            aria-label="Close notice"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
