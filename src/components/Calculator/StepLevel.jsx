// src/components/Calculator/StepLevel.jsx — Step 2 (UG / PG)
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Library } from 'lucide-react';
import { PTU_LEVELS } from '../../data';

export default function StepLevel({ slideVariants, direction, setLevel, nextStep }) {
  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 p-4 lg:p-12 flex flex-col items-center overflow-y-auto custom-scrollbar"
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-min py-8">
        <div className="inline-block bg-brutal-black text-brutal-yellow font-bold uppercase tracking-widest px-4 py-2 border-4 border-brutal-black mb-6">Step 2</div>
        <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-6xl text-brutal-black mb-6 lg:mb-12 text-center uppercase tracking-tighter shrink-0 w-full">
          Program Level
        </h2>
        <div className="grid gap-6 lg:gap-8 w-full grid-cols-1 md:grid-cols-2">
          {PTU_LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => { setLevel(lvl); nextStep(); }}
              className="brutal-card group w-full p-4 lg:p-12 flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 lg:gap-6 min-h-[100px] md:min-h-[200px] text-left md:text-center"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brutal-white border-4 border-brutal-black flex items-center justify-center text-brutal-black group-hover:bg-brutal-red group-hover:text-white transition-all shadow-brutal shrink-0">
                {lvl.id === 'UG' ? (
                  <GraduationCap size={32} className="lg:w-10 lg:h-10" strokeWidth={3} />
                ) : (
                  <Library size={32} className="lg:w-10 lg:h-10" strokeWidth={3} />
                )}
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display uppercase tracking-tight text-brutal-black flex-1">{lvl.label}</h3>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
