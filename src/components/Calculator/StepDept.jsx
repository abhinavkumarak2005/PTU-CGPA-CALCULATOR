// src/components/Calculator/StepDept.jsx — Step 4 (Department)
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Monitor, Cpu, Wifi, Zap, Wrench, Building2, Beaker, Settings, Cog, Layers } from 'lucide-react';

const getDeptIcon = (id) => {
  const size = 32;
  if (!id) return <BookOpen size={size} strokeWidth={3} />;
  if (id.includes('CSE')) return <Monitor size={size} strokeWidth={3} />;
  if (id.includes('IT')) return <Cpu size={size} strokeWidth={3} />;
  if (id.includes('ECE')) return <Wifi size={size} strokeWidth={3} />;
  if (id.includes('EEE')) return <Zap size={size} strokeWidth={3} />;
  if (id.includes('MECH')) return <Wrench size={size} strokeWidth={3} />;
  if (id.includes('CIVIL')) return <Building2 size={size} strokeWidth={3} />;
  if (id.includes('CHEM')) return <Beaker size={size} strokeWidth={3} />;
  if (id.includes('EIE')) return <Settings size={size} strokeWidth={3} />;
  if (id.includes('MT')) return <Cog size={size} strokeWidth={3} />;
  if (id.includes('MCA')) return <Monitor size={size} strokeWidth={3} />;
  if (id.includes('MBA')) return <BookOpen size={size} strokeWidth={3} />;
  if (id.includes('MSC')) return <Beaker size={size} strokeWidth={3} />;
  return <Layers size={size} strokeWidth={3} />;
};

export default function StepDept({
  slideVariants, direction, batchData, mtechParentDept, isPG,
  getCurrentDepartments, setMtechParentDept, setDeptData, nextStep
}) {
  const depts = getCurrentDepartments();
  const isMtechParentSelect = batchData?.id === 'MTECH' && !mtechParentDept;

  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 p-4 lg:p-12 flex flex-col items-center overflow-y-auto custom-scrollbar"
    >
      <div className="w-full max-w-5xl flex flex-col items-center justify-center min-h-min py-8">
        <div className="inline-block bg-brutal-black text-brutal-yellow font-bold uppercase tracking-widest px-4 py-2 border-4 border-brutal-black mb-6">Step {batchData?.id === 'MTECH' ? '3a/3b' : '4'}</div>
        <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-6xl text-brutal-black mb-6 lg:mb-12 text-center uppercase tracking-tighter shrink-0 w-full px-2">
          {isMtechParentSelect ? 'Parent Dept' : 'Specialization'}
        </h2>
        <div className={`grid gap-4 lg:gap-6 w-full px-2 lg:px-0 ${depts.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {depts.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                if (batchData?.id === 'MTECH' && !mtechParentDept) {
                  setMtechParentDept(d);
                  window.history.pushState({ mtechSub: true }, '');
                } else {
                  setDeptData(d);
                  isPG() ? nextStep(2) : nextStep();
                }
              }}
              className="brutal-card group flex items-center gap-4 p-4 lg:p-6 min-h-[100px] lg:min-h-[120px] w-full"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-brutal-yellow border-4 border-brutal-black flex items-center justify-center text-brutal-black group-hover:scale-110 transition-transform shadow-brutal-sm shrink-0">
                {getDeptIcon(d.id)}
              </div>
              <span className="font-bold font-display uppercase tracking-tight text-lg text-brutal-black leading-tight text-left">
                {d.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
