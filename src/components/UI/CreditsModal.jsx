import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Instagram, Linkedin } from 'lucide-react';

export default function CreditsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-brutal-blue/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-brutal-white w-full max-w-2xl border-4 border-brutal-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brutal-yellow border-b-4 border-brutal-black px-6 py-4 flex justify-between items-center">
              <h2 className="font-display font-black text-3xl uppercase tracking-tighter flex items-center gap-3">
                <Heart size={32} className="text-brutal-red fill-brutal-red" strokeWidth={3} />
                Credits
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white border-4 border-brutal-black flex items-center justify-center hover:bg-brutal-red hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="font-bold text-xl mb-8 leading-relaxed max-w-xl">
                This project is proudly built and maintained by <span className="bg-brutal-black text-white px-2 py-0.5 uppercase tracking-widest font-black">Abhinavkumar Ilango</span>.
              </p>

              <div className="flex flex-col gap-4">
                <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-2 border-b-4 border-brutal-black pb-2 inline-block">
                  Connect
                </h3>

                {/* Abhinav */}
                <div className="group bg-white border-4 border-brutal-black shadow-brutal-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:-translate-y-1 hover:shadow-brutal transition-all gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brutal-blue border-2 border-brutal-black flex items-center justify-center text-white font-black text-lg">AI</div>
                    <div>
                      <h4 className="font-display font-black text-xl uppercase tracking-widest">I ABHINAVKUMAR</h4>
                      <p className="font-bold text-sm text-slate-500 uppercase">Lead Developer</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href="https://www.instagram.com/abhinavkumarilango?igsi=emR4c2V1OTNja2Nh" target="_blank" rel="noreferrer" className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-yellow transition-colors">
                      <Instagram size={20} strokeWidth={3} />
                    </a>
                    <a href="https://www.linkedin.com/in/abhinavkumar-ilango-828a241a9" target="_blank" rel="noreferrer" className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-blue hover:text-white transition-colors">
                      <Linkedin size={20} strokeWidth={3} />
                    </a>
                  </div>
                </div>

                {/* Viknesh */}
                <div className="group bg-white border-4 border-brutal-black shadow-brutal-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:-translate-y-1 hover:shadow-brutal transition-all gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brutal-red border-2 border-brutal-black flex items-center justify-center text-white font-black text-lg">VR</div>
                    <div>
                      <h4 className="font-display font-black text-xl uppercase tracking-widest">VIKNESH RS</h4>
                      <p className="font-bold text-sm text-slate-500 uppercase">Supporting Developer</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href="https://www.instagram.com/vikneshh__?igsi=MTF6Y3A1NzJwam9maQ==" target="_blank" rel="noreferrer" className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-yellow transition-colors">
                      <Instagram size={20} strokeWidth={3} />
                    </a>
                    <a href="https://www.linkedin.com/in/viknesh-rs2546" target="_blank" rel="noreferrer" className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-blue hover:text-white transition-colors">
                      <Linkedin size={20} strokeWidth={3} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-4 border-dashed border-brutal-black text-center">
                <p className="font-bold uppercase tracking-widest text-sm text-slate-500">
                  © {new Date().getFullYear()} PTU CGPA Calculator
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
