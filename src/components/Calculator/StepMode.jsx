// src/components/Calculator/StepMode.jsx — Step 6 (Calculation Mode)
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calculator } from 'lucide-react';

export default function StepMode({ slideVariants, direction, setMode, nextStep }) {
  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 p-4 lg:p-12 flex flex-col items-center overflow-y-auto custom-scrollbar"
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-min py-8">
        <div className="inline-block bg-brutal-black text-brutal-yellow font-bold uppercase tracking-widest px-4 py-2 border-4 border-brutal-black mb-6">Step 6</div>
        <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-6xl text-brutal-black mb-6 lg:mb-12 text-center uppercase tracking-tighter shrink-0 w-full">
          Calculation Mode
        </h2>
        <div className="grid gap-6 lg:gap-8 w-full grid-cols-1 md:grid-cols-2">
          <button
            onClick={() => { setMode('specific'); nextStep(); }}
            className="brutal-card group w-full p-6 lg:p-12 text-left md:text-center flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 lg:gap-6 min-h-[120px] md:min-h-[220px]"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white border-4 border-brutal-black text-brutal-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-brutal-sm">
              <BookOpen size={32} className="lg:w-10 lg:h-10" strokeWidth={3} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display uppercase tracking-tight text-brutal-black mb-2">Specific Sem</h3>
              <p className="font-sans font-bold text-[10px] sm:text-sm bg-brutal-black text-white px-2 sm:px-3 py-1 inline-block uppercase tracking-widest border-2 border-brutal-black">Single calc</p>
            </div>
          </button>

          <button
            onClick={() => { setMode('cumulative'); nextStep(); }}
            className="brutal-card group w-full p-6 lg:p-12 text-left md:text-center flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 lg:gap-6 min-h-[120px] md:min-h-[220px]"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white text-brutal-black border-4 border-brutal-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-brutal-sm">
              <Calculator size={32} className="lg:w-10 lg:h-10" strokeWidth={3} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display uppercase tracking-tight text-brutal-black mb-2">Cumulative CGPA</h3>
              <p className="font-sans font-bold text-[10px] sm:text-sm bg-brutal-black text-white px-2 sm:px-3 py-1 inline-block uppercase tracking-widest border-2 border-brutal-black">Up to current sem</p>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
