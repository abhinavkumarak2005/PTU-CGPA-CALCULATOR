// src/components/Calculator/StepGradeInput.jsx — Step 8 (Input Grades)
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calculator, Trash2, Plus, X } from 'lucide-react';

export default function StepGradeInput({
  slideVariants, direction, activeSemInput, mode, currentSemLimit, entryType,
  getSubjects, getGradingSystem, gradeData, setGradeData,
  setActiveSemInput, handleCalculate, handleDeleteSubject,
  showAddModal, setShowAddModal, newSubject, setNewSubject, handleAddSubject
}) {
  const subjects = getSubjects(activeSemInput);
  const startSem = entryType === 'lateral' ? 3 : 1;
  const progressPct = mode === 'cumulative'
    ? Math.round(((activeSemInput - startSem) / (currentSemLimit - startSem)) * 100) || 0
    : 100;

  return (
    <motion.div
      variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction}
      className="absolute inset-0 flex flex-col h-full relative"
    >
      <div className="px-4 lg:px-8 py-4 lg:py-6 border-b-4 border-brutal-black bg-brutal-yellow sticky top-0 z-20 flex justify-between items-center shadow-brutal-sm">
        <div>
          <h2 className="text-xl lg:text-3xl font-display font-black text-brutal-black uppercase tracking-tighter">Semester {activeSemInput}</h2>
          <p className="text-brutal-black font-bold text-xs lg:text-sm uppercase tracking-widest mt-1">Manage & Grade Subjects</p>
        </div>
        <div className="flex gap-3 items-center">
          {mode === 'cumulative' && (
            <span className="text-sm font-black text-white bg-brutal-black px-4 py-2 border-2 border-brutal-black">
              {progressPct}%
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-8 space-y-6 custom-scrollbar bg-brutal-white">
        {subjects.length === 0 && (
          <div className="text-center p-12 text-brutal-black bg-brutal-yellow border-4 border-brutal-black shadow-brutal">
            <p className="font-display font-black text-2xl uppercase mb-2">No subjects found.</p>
            <p className="font-bold text-sm uppercase tracking-widest">Use "Add Subject" below.</p>
          </div>
        )}

        {subjects.map((sub, idx) => (
          <div key={`${sub.code}-${idx}`} className="flex items-center gap-4 p-4 lg:p-6 bg-white border-4 border-brutal-black shadow-brutal hover:-translate-y-1 transition-transform group relative">
            <button
              onClick={() => handleDeleteSubject(idx)}
              className="absolute -top-3 -right-3 md:-top-auto md:-right-auto md:-left-4 lg:-left-6 md:top-1/2 md:-translate-y-1/2 w-10 h-10 bg-brutal-red text-white border-4 border-brutal-black flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-all shadow-brutal z-10 hover:scale-110"
            >
              <Trash2 size={20} strokeWidth={3} />
            </button>
            <div className="flex-1 pl-2">
              <p className="font-display font-bold uppercase tracking-tight text-brutal-black text-lg lg:text-xl mb-2">{sub.name}</p>
              <p className="text-xs font-bold text-white bg-brutal-black uppercase tracking-widest inline-block px-3 py-1 border-2 border-brutal-black">
                {sub.code} • {sub.credits} CR
              </p>
            </div>
            <div className="relative w-28 lg:w-36">
              <select
                className="w-full bg-brutal-white border-4 border-brutal-black text-brutal-black text-lg lg:text-xl rounded-none focus:bg-brutal-blue focus:text-white block p-3 lg:p-4 font-black font-display text-center outline-none cursor-pointer transition-colors appearance-none shadow-brutal-sm"
                value={gradeData[`${activeSemInput}_${sub.code}_${idx}`] || ""}
                onChange={(e) => setGradeData({ ...gradeData, [`${activeSemInput}_${sub.code}_${idx}`]: e.target.value })}
              >
                <option value="">-</option>
                {getGradingSystem().labels.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-6 border-4 border-dashed border-brutal-black text-brutal-black font-display font-black text-xl uppercase tracking-tight flex items-center justify-center gap-3 hover:bg-brutal-blue hover:text-white hover:border-solid transition-all"
        >
          <Plus size={28} strokeWidth={3} /> Add Subject
        </button>
      </div>

      <div className="p-6 lg:p-8 border-t-4 border-brutal-black bg-brutal-white sticky bottom-0 z-20 flex gap-4">
        {mode === 'cumulative' && activeSemInput > startSem && (
          <button
            onClick={() => setActiveSemInput(s => s - 1)}
            className="px-6 lg:px-8 py-5 border-4 border-brutal-black bg-white text-brutal-black font-bold hover:bg-brutal-black hover:text-white transition-colors shadow-brutal-sm flex items-center justify-center"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
        )}
        <button
          onClick={() => {
            if (mode === 'cumulative' && activeSemInput < currentSemLimit) {
              setActiveSemInput(s => s + 1);
            } else {
              handleCalculate();
            }
          }}
          className="flex-1 brutal-button bg-brutal-red text-white py-5 font-display font-black text-xl uppercase tracking-widest flex items-center justify-center gap-4 group"
        >
          {mode === 'cumulative' && activeSemInput < currentSemLimit ? (
            <>Next Semester <ChevronRight strokeWidth={4} className="group-hover:translate-x-1 transition-transform" /></>
          ) : (
            <>Calculate Result <Calculator strokeWidth={3} className="group-hover:rotate-12 transition-transform" /></>
          )}
        </button>
      </div>

      {/* Add Subject Brutalist Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brutal-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-brutal-yellow border-4 border-brutal-black p-6 lg:p-8 w-full max-w-md shadow-brutal">
              <div className="flex justify-between items-center mb-8 border-b-4 border-brutal-black pb-4">
                <h3 className="font-display font-black text-3xl uppercase tracking-tighter text-brutal-black">Add Subject</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 border-4 border-transparent hover:border-brutal-black hover:bg-brutal-black hover:text-white transition-colors"><X size={28} strokeWidth={3} /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-black text-brutal-black uppercase tracking-widest block mb-2">Subject Name</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-white border-4 border-brutal-black font-bold text-lg text-brutal-black focus:bg-brutal-blue focus:text-white outline-none transition-colors rounded-none placeholder:text-brutal-black/40"
                    placeholder="e.g. ADVANCED PHYSICS"
                    value={newSubject.name}
                    onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-black text-brutal-black uppercase tracking-widest block mb-2">Code (Opt)</label>
                    <input
                      type="text"
                      className="w-full p-4 bg-white border-4 border-brutal-black font-bold text-lg text-brutal-black focus:bg-brutal-blue focus:text-white outline-none transition-colors rounded-none placeholder:text-brutal-black/40"
                      placeholder="PHY101"
                      value={newSubject.code}
                      onChange={e => setNewSubject({ ...newSubject, code: e.target.value })}
                    />
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label className="text-sm font-black text-brutal-black uppercase tracking-widest block mb-2">Credits</label>
                    <input
                      type="number"
                      className="w-full p-4 bg-white border-4 border-brutal-black font-bold text-lg text-brutal-black focus:bg-brutal-blue focus:text-white outline-none transition-colors rounded-none placeholder:text-brutal-black/40"
                      placeholder="3"
                      value={newSubject.credits}
                      onChange={e => setNewSubject({ ...newSubject, credits: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddSubject}
                  disabled={!newSubject.name || !newSubject.credits}
                  className="w-full py-5 bg-brutal-black text-white font-display font-black text-xl uppercase tracking-widest hover:bg-brutal-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 border-4 border-brutal-black"
                >
                  Add to List
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
