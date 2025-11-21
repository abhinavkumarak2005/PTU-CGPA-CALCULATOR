import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { 
  ChevronRight, ChevronLeft, RotateCcw, Download, 
  BookOpen, GraduationCap, Calculator, CheckCircle2,
  Monitor, Wifi, Zap, Wrench, Building2, Beaker, Cpu, Settings, Cog,
  User, Plus, Trash2, X, Link as LinkIcon, ExternalLink
} from 'lucide-react';
import { BATCHES, DEPARTMENTS, SYLLABUS, GRADING_SYSTEMS } from './data';
import InfoSection from './InfoSection';

// --- UI CONSTANTS ---
const BENTO_LINK = "https://bento.me/abhinavkumarilango";

// --- ICONS ---
const getDeptIcon = (id) => {
  const icons = {
    CSE: <Monitor className="w-8 h-8" />, IT: <Cpu className="w-8 h-8" />,
    ECE: <Wifi className="w-8 h-8" />, EEE: <Zap className="w-8 h-8" />,
    MECH: <Wrench className="w-8 h-8" />, CIVIL: <Building2 className="w-8 h-8" />,
    CHEM: <Beaker className="w-8 h-8" />, EIE: <Settings className="w-8 h-8" />,
    MT: <Cog className="w-8 h-8" />
  };
  return icons[id] || <BookOpen className="w-8 h-8" />;
};

// --- COMPONENTS ---
const AdPlaceholder = ({ className, label = "Advertisement" }) => (
  <div className={`bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-300 p-6 ${className}`}>
    <span className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">{label}</span>
    <div className="w-16 h-1.5 bg-gray-200 rounded-full mb-2"></div>
    <div className="w-10 h-1.5 bg-gray-200 rounded-full"></div>
  </div>
);

export default function PTUCGPACalculator() {
  // --- STATE ---
  const [step, setStep] = useState(0);
  const [batchData, setBatchData] = useState(null);
  const [dept, setDept] = useState(null);
  const [mode, setMode] = useState(null);
  const [targetSem, setTargetSem] = useState(null);
  const [currentSemLimit, setCurrentSemLimit] = useState(null);
  const [activeSemInput, setActiveSemInput] = useState(1);
  const [gradeData, setGradeData] = useState({});
  const [result, setResult] = useState(null);
  
  // Add Modal State
  const [customSyllabus, setCustomSyllabus] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', code: '', credits: '' });

  const resultRef = useRef(null);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 40 : -40, opacity: 0 })
  };

  // --- NAVIGATION WITH PHONE BACK BUTTON SUPPORT ---
  
  const nextStep = () => { 
    setDirection(1); 
    setStep(s => s + 1);
    // Push a new state to history so the phone back button has something to "pop"
    window.history.pushState({ step: step + 1 }, '');
  };

  const prevStep = () => { 
    setDirection(-1); 
    setStep(s => Math.max(0, s - 1)); 
  };

  // Listen for the Phone Back Button (popstate)
  useEffect(() => {
    const handlePopState = (event) => {
      // If user presses back, we go to previous step
      // We prevent default browser behavior of leaving the page if we are deep in the app
      if (step > 0) {
        prevStep();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step]); // Re-bind when step changes to keep logic fresh

  const reset = () => {
    setDirection(-1);
    setStep(0);
    setBatchData(null);
    setDept(null);
    setMode(null);
    setGradeData({});
    setResult(null);
    setActiveSemInput(1);
    setCustomSyllabus({});
    // Clear history clutter if needed, but simple reset is fine
  };

  // --- LOGIC ---
  const getSubjects = (sem) => {
    if (customSyllabus[sem]) return customSyllabus[sem];
    return SYLLABUS[batchData.regulation]?.[dept]?.[sem] || [];
  };

  const handleDeleteSubject = (index) => {
    const currentList = getSubjects(activeSemInput);
    const updatedList = [...currentList];
    updatedList.splice(index, 1);
    setCustomSyllabus({ ...customSyllabus, [activeSemInput]: updatedList });
  };

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.credits) return;
    const currentList = getSubjects(activeSemInput);
    const newSub = {
      name: newSubject.name,
      code: newSubject.code || `CUS-${Date.now().toString().slice(-4)}`,
      credits: parseFloat(newSubject.credits)
    };
    setCustomSyllabus({ ...customSyllabus, [activeSemInput]: [...currentList, newSub] });
    setNewSubject({ name: '', code: '', credits: '' });
    setShowAddModal(false);
  };

  const handleCalculate = () => {
    if (!batchData || !dept) return;
    const reg = batchData.regulation;
    const system = GRADING_SYSTEMS[reg];
    const startSem = mode === 'specific' ? targetSem : 1;
    const endSem = mode === 'specific' ? targetSem : currentSemLimit;

    let totalPoints = 0, totalCredits = 0, breakdown = [];

    for (let s = startSem; s <= endSem; s++) {
      const subjects = getSubjects(s);
      let semPoints = 0, semCredits = 0, semSubjects = [];

      subjects.forEach(sub => {
        const grade = gradeData[`sem${s}_${sub.code}`];
        if (grade) {
          const gp = system.points[grade];
          if (!system.excludeCredits.includes(grade)) {
            semPoints += (gp * sub.credits);
            semCredits += sub.credits;
          }
          semSubjects.push({ ...sub, grade, gp });
        }
      });

      if (semSubjects.length > 0) {
        const sgpa = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : "0.00";
        breakdown.push({ semester: s, sgpa, subjects: semSubjects });
        totalPoints += semPoints;
        totalCredits += semCredits;
      }
    }

    setResult({
      score: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00",
      breakdown,
      type: mode === 'specific' ? 'SGPA' : 'CGPA'
    });
    nextStep();
  };

  const handleDownload = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false,
        height: resultRef.current.scrollHeight + 20 
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `PTU_${result.type}_Result.png`;
      link.click();
    } catch (err) {
      console.error("Capture failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 flex flex-col overflow-x-hidden">
      
      {/* HEADER (Mobile) */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-slate-200 shadow-sm flex justify-between items-center">
        <button onClick={reset} className="flex items-center gap-2 outline-none">
           <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200"><GraduationCap size={20} /></div>
           <span className="font-bold text-xl text-slate-800 tracking-tight">PTU Calc</span>
        </button>
        <a href={BENTO_LINK} target="_blank" rel="noreferrer" className="text-xs font-bold bg-slate-100 border border-slate-200 px-4 py-2 rounded-full text-slate-600 uppercase tracking-wide">Credits</a>
      </div>

      {/* MOBILE AD (Top) */}
      <div className="lg:hidden px-4 mt-4">
        <AdPlaceholder className="bg-white border-slate-200 h-20" label="Ad Space (Mobile)" />
      </div>

      {/* MAIN LAYOUT */}
      <div className="w-full max-w-[1920px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 h-auto lg:h-screen mb-8">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-3 flex flex-col h-full">
          
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-4 cursor-pointer" onClick={reset}>
              <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 hover:scale-105 transition-transform">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 leading-none mb-1">PTU Calculator</h1>
                <p className="text-xs text-slate-400 font-medium tracking-wide">Puducherry Technological University</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              {step > 0 && step < 6 && (
                 <button onClick={() => { window.history.back(); }} className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all">
                   <ChevronLeft size={16} /> Back
                 </button>
              )}
              <a href={BENTO_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl hover:bg-slate-800 hover:shadow-2xl transition-all transform hover:-translate-y-0.5">
                <User size={14} /> Credits
              </a>
            </div>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white flex-1 relative overflow-hidden flex flex-col min-h-[70vh]">
            <AnimatePresence mode='wait' custom={direction}>
              
              {/* STEP 0: HERO */}
              {step === 0 && (
                <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="flex-1 flex flex-col">
                  <div className="bg-[#2563EB] p-10 lg:p-16 text-white text-center relative overflow-hidden flex-1 flex flex-col justify-center items-center rounded-t-[2.5rem]">
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px] opacity-40 translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-3xl">
                       <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-8 shadow-lg">
                         <CheckCircle2 size={14} className="text-blue-300"/> Updated for 2024 Regulations
                       </div>
                       <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight drop-shadow-sm">
                         Calculate Your <br/><span className="text-blue-200">CGPA</span> Instantly
                       </h1>
                       <button onClick={nextStep} className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-[#2563EB] rounded-3xl font-extrabold text-lg shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all">
                         Calculate Now <ChevronRight strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                  </div>
                  <div className="p-6 bg-white border-t border-slate-100">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {['Multi-Batch Support', 'Accurate Grading', 'Instant Results'].map((feat, i) => (
                          <div key={i} className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-slate-50 text-sm font-bold text-slate-600">
                            <CheckCircle2 size={18} className="text-blue-600" /> {feat}
                          </div>
                        ))}
                      </div>
                  </div>
                </motion.div>
              )}

              {/* STEPS 1-4 */}
              {step === 1 && (<motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-8 lg:p-16 h-full flex flex-col justify-center"><div className="max-w-5xl mx-auto w-full"><h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 tracking-tight">Select Batch</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{BATCHES.map((b) => (<button key={b.id} onClick={() => { setBatchData(b); nextStep(); }} className="group relative p-8 bg-white border-2 border-slate-100 rounded-[2rem] hover:border-blue-600 hover:shadow-xl transition-all text-left flex items-center gap-6"><div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm"><BookOpen size={32} /></div><div><h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">{b.label}</h3><p className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 inline-block px-2 py-1 rounded-lg">Regulation: {b.regulation}</p></div></button>))}</div></div></motion.div>)}
              {step === 2 && (<motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-8 lg:p-16 h-full flex flex-col justify-center"><div className="max-w-6xl mx-auto w-full"><h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 tracking-tight">Select Department</h2><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh]">{DEPARTMENTS.map((d) => (<button key={d.id} onClick={() => { setDept(d.id); nextStep(); }} className="flex items-center gap-5 p-5 rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-500 hover:shadow-lg transition-all group text-left"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${d.color} bg-opacity-10 shrink-0 group-hover:scale-110 transition-transform duration-300`}>{getDeptIcon(d.id)}</div><span className="font-bold text-base text-slate-700 group-hover:text-blue-700 leading-tight">{d.name}</span></button>))}</div></div></motion.div>)}
              {step === 3 && (<motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-8 lg:p-16 h-full flex flex-col justify-center items-center"><div className="max-w-4xl w-full"><h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900 tracking-tight">Calculation Mode</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><button onClick={() => { setMode('specific'); nextStep(); }} className="group p-10 bg-[#2563EB] text-white rounded-[2.5rem] shadow-xl shadow-blue-200 hover:scale-[1.02] transition-all text-left flex flex-col justify-between h-72 relative overflow-hidden border-4 border-transparent hover:border-white/20"><div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner mb-4"><BookOpen size={32} /></div><div><h3 className="text-3xl font-bold mb-2">Specific Semester</h3><p className="text-blue-100 text-base opacity-90 font-medium">Single semester only.</p></div></button><button onClick={() => { setMode('cumulative'); nextStep(); }} className="group p-10 bg-white border-2 border-slate-100 text-slate-800 rounded-[2.5rem] hover:border-purple-500 hover:shadow-xl transition-all text-left flex flex-col justify-between h-72 relative overflow-hidden"><div className="bg-purple-50 text-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm mb-4"><Calculator size={32} /></div><div><h3 className="text-3xl font-bold mb-2 group-hover:text-purple-700">Till Current Sem</h3><p className="text-slate-500 text-base font-medium">Cumulative CGPA.</p></div></button></div></div></motion.div>)}
              {step === 4 && (<motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-8 lg:p-16 h-full flex flex-col justify-center"><div className="max-w-3xl mx-auto w-full"><h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 text-center">{mode === 'specific' ? 'Select Semester' : 'Current Semester'}</h2><div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">{[1,2,3,4,5,6,7,8].map((sem) => (<button key={sem} onClick={() => { if (mode === 'specific') { setTargetSem(sem); setActiveSemInput(sem); } else { setCurrentSemLimit(sem); setActiveSemInput(1); } nextStep(); }} className="aspect-square rounded-[2rem] font-extrabold text-3xl bg-white border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-xl transition-all flex items-center justify-center text-slate-400">{sem}</button>))}</div></div></motion.div>)}
              
              {/* STEP 5: INPUT */}
              {step === 5 && (
                <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="flex flex-col h-full relative">
                  <div className="px-8 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20 flex justify-between items-center">
                    <div><h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Semester {activeSemInput}</h2><p className="text-slate-400 text-sm">Manage & Grade Subjects</p></div>
                    <div className="flex gap-3 items-center">{mode === 'cumulative' && <span className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">{Math.round((activeSemInput / currentSemLimit) * 100)}%</span>}</div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 custom-scrollbar bg-[#FAFAFA]">
                    {getSubjects(activeSemInput).map((sub, idx) => (
                      <div key={`${sub.code}-${idx}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-400 transition-all group relative">
                        <button onClick={() => handleDeleteSubject(idx)} className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-10 hover:bg-red-500 hover:text-white" title="Delete Subject"><Trash2 size={14} /></button>
                        <div className="flex-1 pl-2">
                          <p className="font-bold text-slate-800 text-base mb-1">{sub.name}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 inline-block px-2 py-1 rounded-md border border-slate-200">{sub.code} • {sub.credits} Cr</p>
                        </div>
                        <div className="relative w-32">
                          <select className="w-full bg-slate-50 border-2 border-slate-200 text-slate-900 text-base rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 block p-3 font-bold text-center outline-none cursor-pointer transition-all appearance-none hover:bg-white" value={gradeData[`sem${activeSemInput}_${sub.code}`] || ""} onChange={(e) => setGradeData({ ...gradeData, [`sem${activeSemInput}_${sub.code}`]: e.target.value })}>
                            <option value="">-</option>{GRADING_SYSTEMS[batchData.regulation].labels.map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setShowAddModal(true)} className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 font-bold flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all"><Plus size={20} /> Add Subject</button>
                  </div>
                  
                  {/* BOTTOM ACTION BAR */}
                  <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex gap-3">
                    {mode === 'cumulative' && activeSemInput > 1 && (
                      <button onClick={() => setActiveSemInput(s => s - 1)} className="px-6 py-5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all">
                        <ChevronLeft size={24}/>
                      </button>
                    )}
                    <button onClick={() => { if (mode === 'cumulative' && activeSemInput < currentSemLimit) { setActiveSemInput(s => s + 1); } else { handleCalculate(); } }} className="flex-1 bg-[#0F172A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3">
                      {mode === 'cumulative' && activeSemInput < currentSemLimit ? <>Next Semester <ChevronRight/></> : <>Calculate Result <Calculator/></>}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showAddModal && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
                          <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-slate-800">Add Subject</h3><button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button></div>
                          <div className="space-y-4">
                            <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Subject Name</label><input type="text" className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none mt-1" placeholder="e.g. Advanced Physics" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} /></div>
                            <div className="flex gap-4">
                              <div className="flex-1"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Code (Opt)</label><input type="text" className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none mt-1" placeholder="PHY101" value={newSubject.code} onChange={e => setNewSubject({...newSubject, code: e.target.value})} /></div>
                              <div className="w-1/3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Credits</label><input type="number" className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none mt-1" placeholder="3" value={newSubject.credits} onChange={e => setNewSubject({...newSubject, credits: e.target.value})} /></div>
                            </div>
                            <button onClick={handleAddSubject} disabled={!newSubject.name || !newSubject.credits} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mt-2">Add to List</button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
              
              {/* STEP 6: RESULT (Fixed Mobile Spacing) */}
              {step === 6 && result && (
                <motion.div 
                  key="step6" 
                  variants={slideVariants} 
                  initial="enter" 
                  animate="center" 
                  exit="exit" 
                  custom={direction} 
                  className="p-4 lg:p-10 h-full flex flex-col justify-center items-center text-center overflow-y-auto"
                >
                  <div ref={resultRef} id="capture-target" className="bg-white p-4 sm:p-8 rounded-[2.5rem] w-full max-w-2xl mx-auto shadow-none flex flex-col gap-6">
                    {/* Result Card */}
                    <div className={`relative w-full rounded-[2rem] flex flex-col items-center justify-start pt-10 pb-24 px-4 gap-4 ${parseFloat(result.score) >= 9 ? 'bg-gradient-to-br from-[#22C55E] to-[#16A34A]' : parseFloat(result.score) >= 7.5 ? 'bg-gradient-to-br from-[#F97316] to-[#EA580C]' : 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]'}`}>
                      <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                        <GraduationCap size={28} className="text-white drop-shadow-md" />
                      </div>
                      
                      <div className="flex flex-col items-center justify-center mt-2">
                        <h2 className="text-7xl sm:text-8xl font-black tracking-tighter drop-shadow-xl text-white leading-none mb-2">{result.score}</h2>
                        <p className="text-xl sm:text-2xl font-bold opacity-90 uppercase tracking-[0.3em] text-white">{result.type}</p>
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-auto bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl px-4 py-4 text-lg sm:text-xl font-bold shadow-xl text-white leading-tight flex items-center justify-center">
                        {parseFloat(result.score) >= 9 ? "Outstanding!" : "Great Effort!"}
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">PTU CGPA Calculator</h3>
                      <p className="text-slate-400 text-sm font-medium">Generated Result</p>
                    </div>
                  </div>

                  {/* Buttons - Stacked on Mobile, Row on Desktop */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mt-4 pb-6">
                    <button onClick={reset} className="w-full py-4 rounded-2xl border-2 border-slate-200 font-bold text-lg text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                      <RotateCcw size={20} /> Retry
                    </button>
                    <button onClick={handleDownload} className="w-full py-4 rounded-2xl bg-[#0F172A] text-white font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl">
                      <Download size={20} /> Save Image
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
          
          {/* MOBILE AD (Bottom) */}
          <div className="lg:hidden mt-6 mb-2">
             <AdPlaceholder className="bg-white border-slate-200 h-60" label="Ad Space (Mobile)" />
          </div>

          {/* MOBILE FOOTER (LEGAL LINKS) - NEW */}
          <div className="lg:hidden flex justify-center gap-6 pb-8 text-sm font-bold text-slate-400">
             <a href="/privacy.html" target="_blank" className="hover:text-blue-600 flex items-center gap-1"><ExternalLink size={12}/> Privacy Policy</a>
             <a href="/terms.html" target="_blank" className="hover:text-blue-600 flex items-center gap-1"><ExternalLink size={12}/> Terms of Use</a>
          </div>

        </div>

        {/* --- RIGHT SIDEBAR (Desktop) --- */}
        <div className="hidden lg:col-span-1 lg:flex flex-col gap-6 sticky top-6 h-[calc(100vh-3rem)]">
           <div className="flex-1 min-h-[250px]"><AdPlaceholder className="h-full bg-white shadow-sm border-2 border-slate-100 rounded-[2rem]" label="Ad Space" /></div>
           <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 shadow-sm">
             <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-lg">Quick Links</h3>
             <ul className="space-y-3 text-sm font-medium text-blue-800/80">
                <li><a href="/privacy.html" target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><ChevronRight size={14} /> Privacy Policy</a></li>
                <li><a href="/terms.html" target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><ChevronRight size={14} /> Terms of Use</a></li>
                <li><a href={BENTO_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><LinkIcon size={14} /> Contact Developer</a></li>
             </ul>
           </div>
           <div className="h-60"><AdPlaceholder className="h-full bg-white shadow-sm border-2 border-slate-100 rounded-[2rem]" label="Ad Space" /></div>
        </div>

      </div>

      {/* BLOG SECTION */}
      <section className="bg-[#F8FAFC] border-t border-slate-200 mt-auto">
        <InfoSection />
      </section>

    </div>
  );
}