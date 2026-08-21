// src/components/Calculator/CalculatorWizard.jsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, GraduationCap } from 'lucide-react';

import { useCalculator } from '../../hooks/useCalculator';

import StepHero       from './StepHero';
import StepCollege    from './StepCollege';
import StepLevel      from './StepLevel';
import StepBatch      from './StepBatch';
import StepDept       from './StepDept';
import StepAdmission  from './StepAdmission';
import StepMode       from './StepMode';
import StepSemester   from './StepSemester';
import StepGradeInput from './StepGradeInput';
import StepResult     from './StepResult';

export default function CalculatorWizard() {
  const calc = useCalculator();

  return (
    <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
      {/* MINIMALIST HEADER FOR NAVIGATION ONLY */}
      <div className="flex justify-between items-center mb-4 px-2">
        {calc.step > 1 ? (
          <button
            onClick={calc.handleManualBack}
            className="flex items-center gap-2 font-bold uppercase tracking-widest hover:text-brutal-blue transition-colors"
          >
            <ChevronLeft size={24} strokeWidth={3} /> BACK
          </button>
        ) : (
          <div /> // Spacer
        )}
        <button
          onClick={calc.reset}
          className="font-bold uppercase tracking-widest hover:text-brutal-red transition-colors text-sm border-b-2 border-transparent hover:border-brutal-red"
        >
          Reset
        </button>
      </div>

      {/* MAIN WIZARD CARD (The Double-Bezel Architecture) */}
      <div className="brutal-card flex-1 relative overflow-hidden flex flex-col h-full mb-8 bg-brutal-yellow">
        <div className="absolute inset-0 bg-brutal-white m-2 sm:m-4 border-4 border-brutal-black flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar">
          <AnimatePresence mode="wait" custom={calc.direction}>
            {calc.step === 0 && <StepHero key="step0" {...calc} />}
            {calc.step === 1 && <StepCollege key="step1" {...calc} />}
            {calc.step === 2 && <StepLevel key="step2" {...calc} />}
            {calc.step === 3 && <StepBatch key="step3" {...calc} />}
            {calc.step === 4 && <StepDept key="step4" {...calc} />}
            {calc.step === 5 && <StepAdmission key="step5" {...calc} />}
            {calc.step === 6 && <StepMode key="step6" {...calc} />}
            {calc.step === 7 && <StepSemester key="step7" {...calc} />}
            {calc.step === 8 && <StepGradeInput key="step8" {...calc} />}
            {calc.step === 9 && <StepResult key="step9" {...calc} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
