import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Check, Copy } from 'lucide-react';

export default function DomainMigrationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if dismissed previously in session or permanently
    const hasSeenSession = sessionStorage.getItem('hasSeenDomainMigration_nov14');
    const hasSeenPermanent = localStorage.getItem('hasSeenDomainMigration_nov14');

    if (!hasSeenSession && !hasSeenPermanent) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = (dontShowAgain = false) => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenDomainMigration_nov14', 'true');
    if (dontShowAgain) {
      localStorage.setItem('hasSeenDomainMigration_nov14', 'true');
    }
  };

  const copyDomain = () => {
    navigator.clipboard.writeText('https://cgpa.ptuniv.edu.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => handleClose(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm sm:max-w-md bg-brutal-white border-4 sm:border-8 border-brutal-black shadow-[6px_6px_0px_0px_rgba(5,5,5,1)] sm:shadow-[10px_10px_0px_0px_rgba(5,5,5,1)] p-5 sm:p-7"
          >
            {/* Close Button */}
            <button
              onClick={() => handleClose(false)}
              aria-label="Close"
              className="absolute -top-3.5 -right-3.5 w-9 h-9 sm:w-10 sm:h-10 bg-brutal-yellow border-4 border-brutal-black flex items-center justify-center hover:bg-brutal-red hover:text-white transition-colors cursor-pointer shadow-brutal-sm z-10"
            >
              <X size={22} strokeWidth={3} />
            </button>

            {/* Content Container */}
            <div className="flex flex-col items-center text-center">
              
              {/* Badge Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brutal-yellow border-4 border-brutal-black flex items-center justify-center mb-3 sm:mb-4 transform -rotate-3 shadow-brutal-sm">
                <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-brutal-black" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-brutal-black mb-2">
                We're Moving!
              </h2>

              {/* Simple Clear Description */}
              <p className="font-bold text-sm sm:text-base text-slate-800 leading-snug mb-4">
                The website will be moving to our new official link from{' '}
                <span className="bg-brutal-black text-brutal-yellow px-1.5 py-0.5 whitespace-nowrap inline-block">
                  November 14th
                </span>:
              </p>

              {/* Clean Single Domain Box */}
              <div className="w-full bg-white border-4 border-brutal-black p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-brutal-sm mb-3">
                <span className="font-mono font-black text-sm sm:text-base text-brutal-black truncate">
                  cgpa.ptuniv.edu.in
                </span>
                <button
                  onClick={copyDomain}
                  className="bg-brutal-yellow hover:bg-brutal-black hover:text-white border-2 border-brutal-black px-2.5 py-1 text-xs font-black uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} strokeWidth={3} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} strokeWidth={2.5} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Short Note */}
              <p className="text-xs font-bold text-slate-500 mb-5 leading-normal">
                ⚠️ The new link is <strong className="text-brutal-red underline decoration-2">not live yet</strong>. Please continue using this site until November 14th.
              </p>

              {/* Single Clear Action Button */}
              <button
                onClick={() => handleClose(true)}
                className="w-full bg-brutal-yellow text-brutal-black py-3 px-6 border-4 border-brutal-black font-display font-black text-base sm:text-lg uppercase tracking-wider hover:bg-brutal-black hover:text-brutal-yellow hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-brutal transition-all shadow-brutal-sm cursor-pointer"
              >
                Got It
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
