// src/components/Calculator/StepCollege.jsx — Step 1 (Select College)
import React from 'react';
import { motion } from 'framer-motion';
import { School } from 'lucide-react';
import { COLLEGES } from '../../data';

export default function StepCollege({ slideVariants, direction, setCollege, setLevel, nextStep }) {
  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 p-4 lg:p-12 flex flex-col items-center overflow-y-auto custom-scrollbar"
    >
      <div className="w-full max-w-5xl flex flex-col items-center justify-center min-h-min py-8">
        <div className="inline-block bg-brutal-black text-brutal-yellow font-bold uppercase tracking-widest px-4 py-2 border-4 border-brutal-black mb-6">Step 1</div>
        <h2 className="font-display font-black text-4xl lg:text-6xl text-brutal-black mb-12 text-center uppercase tracking-tighter">
          Select College
        </h2>
        <div className="grid gap-6 w-full grid-cols-1 lg:grid-cols-3">
          {COLLEGES.map((col) => (
            <button
              key={col.id}
              onClick={() => {
                setCollege(col);
                if (col.type === 'simple') {
                  setLevel({ id: 'UG' });
                  nextStep(2);
                } else {
                  nextStep();
                }
              }}
              className="brutal-card group w-full p-8 flex flex-col items-center justify-center gap-6 min-h-[220px] text-center"
            >
              <div className="w-20 h-20 bg-brutal-white border-4 border-brutal-black flex items-center justify-center text-brutal-black group-hover:bg-brutal-yellow group-hover:scale-110 transition-all shadow-brutal shrink-0">
                <School size={40} strokeWidth={3} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold font-display uppercase tracking-tight text-brutal-black leading-tight group-hover:text-brutal-red transition-colors">{col.label}</h3>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
