// src/components/Calculator/StepBatch.jsx — Step 3 (Batch/Course)
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function StepBatch({ slideVariants, direction, level, getCurrentBatches, setBatchData, nextStep }) {
  const isPGLevel = level?.id === 'PG';

  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 p-4 lg:p-12 flex flex-col items-center overflow-y-auto custom-scrollbar"
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-min py-8">
        <div className="inline-block bg-brutal-black text-brutal-yellow font-bold uppercase tracking-widest px-4 py-2 border-4 border-brutal-black mb-6">Step {isPGLevel ? '2' : '3'}</div>
        <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-6xl text-brutal-black mb-6 lg:mb-12 text-center uppercase tracking-tighter shrink-0 w-full">
          {isPGLevel ? 'Select PG Course' : 'Select Batch'}
        </h2>
        <div className="grid gap-6 lg:gap-8 w-full grid-cols-1 md:grid-cols-2">
          {getCurrentBatches().map((b) => (
            <button
              key={b.id}
              onClick={() => { setBatchData(b); nextStep(); }}
              className="brutal-card group w-full p-4 lg:p-8 text-left flex items-center gap-4 lg:gap-6 min-h-[100px] lg:min-h-[140px]"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-brutal-white border-4 border-brutal-black flex items-center justify-center text-brutal-black group-hover:bg-brutal-blue group-hover:text-white transition-all shadow-brutal shrink-0">
                <BookOpen size={32} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold font-display uppercase tracking-tight text-brutal-black mb-2 group-hover:text-brutal-red transition-colors">
                  {b.label}
                </h3>
                <p className="text-xs font-bold text-white bg-brutal-black px-3 py-1 inline-block uppercase tracking-widest border-2 border-brutal-black">
                  REG: {b.regulation}
                </p>
              </div>
              <ArrowRight className="text-brutal-black w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" strokeWidth={3} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
