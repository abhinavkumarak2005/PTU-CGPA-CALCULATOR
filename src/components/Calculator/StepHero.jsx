// src/components/Calculator/StepHero.jsx — Step 0 (Landing / Hero)
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function StepHero({ slideVariants, direction, nextStep }) {
  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 flex flex-col items-center custom-scrollbar overflow-y-auto"
    >
      {/* Brutalist Hero Section */}
      <div className="w-full min-h-[400px] flex-1 bg-brutal-blue border-b-4 border-brutal-black p-8 lg:p-12 text-white text-center relative flex flex-col justify-center items-center">
        <div className="relative z-10 w-full max-w-4xl py-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 py-2 px-5 bg-brutal-black text-brutal-yellow border-2 border-brutal-black font-bold tracking-widest uppercase mb-8 shadow-brutal">
            <CheckCircle2 size={16} strokeWidth={3} /> Updated for 2024-25
          </div>
          <h1 className="font-display font-black text-5xl lg:text-7xl mb-8 leading-none tracking-tighter uppercase">
            Calculate Your <br /><span className="bg-brutal-yellow text-brutal-black px-4 inline-block mt-2 border-4 border-brutal-black shadow-brutal">CGPA</span> Instantly
          </h1>
          <button
            id="hero-calculate-btn"
            onClick={() => nextStep()}
            className="brutal-button bg-brutal-red text-white text-xl mt-4 group"
          >
            Calculate Now <ChevronRight strokeWidth={4} className="group-hover:translate-x-2 transition-transform ml-2" />
          </button>
        </div>
      </div>
      {/* Feature Pills */}
      <div className="w-full p-6 bg-brutal-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {['PTU & Affiliated', 'UG & PG Support', 'Accurate Grading'].map((feat, i) => (
            <div key={i} className="flex items-center justify-center gap-3 py-4 px-6 border-4 border-brutal-black bg-brutal-yellow font-bold text-brutal-black uppercase tracking-wider shadow-brutal-sm">
              <CheckCircle2 size={24} strokeWidth={3} /> {feat}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
