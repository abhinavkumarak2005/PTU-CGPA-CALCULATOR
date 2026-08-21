// src/components/Calculator/StepSemester.jsx — Step 7 (Select Semester)
import React from 'react';
import { motion } from 'framer-motion';

export default function StepSemester({
  slideVariants, direction, entryType, isPG, mode,
  setTargetSem, setActiveSemInput, setCurrentSemLimit, nextStep
}) {
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]
    .filter(s => entryType === 'lateral' ? s >= 3 : true)
    .slice(0, isPG() ? 4 : 8);

  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 p-4 lg:p-12 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center">
        <div className="inline-block bg-brutal-black text-brutal-yellow font-bold uppercase tracking-widest px-4 py-2 border-4 border-brutal-black mb-6">Step 7</div>
        <h2 className="font-display font-black text-4xl lg:text-6xl text-brutal-black mb-12 text-center uppercase tracking-tighter shrink-0">
          Target Semester
        </h2>
        <div className="grid gap-4 lg:gap-8 w-full grid-cols-2 sm:grid-cols-4">
          {semesters.map(sem => (
            <button
              key={sem}
              onClick={() => {
                if (mode === 'specific') {
                  setTargetSem(sem);
                  setActiveSemInput(sem);
                } else {
                  setCurrentSemLimit(sem);
                  setActiveSemInput(entryType === 'lateral' ? 3 : 1);
                }
                nextStep();
              }}
              className="w-full aspect-square border-4 border-brutal-black bg-brutal-white font-display font-black text-6xl lg:text-7xl hover:bg-brutal-red hover:text-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal transition-all flex items-center justify-center text-brutal-black"
            >
              {sem}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
