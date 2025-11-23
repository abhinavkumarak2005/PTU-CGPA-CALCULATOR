import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { 
  ChevronRight, ChevronLeft, RotateCcw, Download, 
  BookOpen, GraduationCap, Calculator, CheckCircle2,
  Monitor, Wifi, Zap, Wrench, Building2, Beaker, Cpu, Settings, Cog,
  User, Plus, Trash2, X, Link as LinkIcon, ExternalLink,
  School, Library, Layers, ArrowRight, Users, UserPlus 
} from 'lucide-react';
import { 
  COLLEGES, PTU_LEVELS, PTU_UG_BATCHES, PTU_PG_COURSES, AFFILIATED_BATCHES,
  UG_DEPARTMENTS, AFFILIATED_DEPARTMENTS, MTECH_PARENTS, MTECH_DEPARTMENTS, MCA_DEPARTMENTS, MBA_DEPARTMENTS, MSC_DEPARTMENTS,
  SYLLABUS, GRADING_SYSTEMS 
} from './data';
import InfoSection from './InfoSection';
import AdComponent from './AdComponent';

const BENTO_LINK = "https://bento.me/abhinavkumarilango";
const VIKNESH_LINK = "https://bento.me/vikneshhrs";

const getDeptIcon = (id) => {
  const size = 36;
  if (!id) return <BookOpen size={size} />;
  if (id.includes('CSE')) return <Monitor size={size} />;
  if (id.includes('IT')) return <Cpu size={size} />;
  if (id.includes('ECE')) return <Wifi size={size} />;
  if (id.includes('EEE')) return <Zap size={size} />;
  if (id.includes('MECH')) return <Wrench size={size} />;
  if (id.includes('CIVIL')) return <Building2 size={size} />;
  if (id.includes('CHEM')) return <Beaker size={size} />;
  if (id.includes('EIE')) return <Settings size={size} />;
  if (id.includes('MT')) return <Cog size={size} />;
  if (id.includes('MCA')) return <Monitor size={size} />;
  if (id.includes('MBA')) return <BookOpen size={size} />;
  if (id.includes('MSC')) return <Beaker size={size} />;
  return <Layers size={size} />;
};

export default function PTUCGPACalculator() {
  // --- STATE ---
  const [step, setStep] = useState(0);
  const [college, setCollege] = useState(null);      
  const [level, setLevel] = useState(null);          
  const [batchData, setBatchData] = useState(null);  
  const [deptData, setDeptData] = useState(null);    
  const [entryType, setEntryType] = useState('regular');
  const [mtechParentDept, setMtechParentDept] = useState(null); 

  const [mode, setMode] = useState(null);            
  const [targetSem, setTargetSem] = useState(null);
  const [currentSemLimit, setCurrentSemLimit] = useState(null);
  const [activeSemInput, setActiveSemInput] = useState(1);
  const [gradeData, setGradeData] = useState({});
  const [result, setResult] = useState(null);
  
  const [customSyllabus, setCustomSyllabus] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false); 
  const [newSubject, setNewSubject] = useState({ name: '', code: '', credits: '' });

  const resultRef = useRef(null);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 40 : -40, opacity: 0 })
  };

  const nextStep = (jump = 1) => { 
    setDirection(1); 
    setStep(s => s + jump);
    window.history.pushState({ step: step + jump }, '');
  };

  const prevStep = () => { 
    setDirection(-1);
    if (step === 6 && isPG()) {
       setStep(4); 
    } else {
       setStep(s => Math.max(0, s - 1)); 
    }
  };

  const reset = () => {
    setDirection(-1);
    setStep(0);
    setCollege(null);
    setLevel(null);
    setBatchData(null);
    setDeptData(null);
    setMtechParentDept(null);
    setEntryType('regular');
    setMode(null);
    setGradeData({});
    setResult(null);
    setActiveSemInput(1);
    setCustomSyllabus({});
  };

  useEffect(() => {
    const handlePopState = () => {
      if (mtechParentDept) {
        setMtechParentDept(null);
      } else if (step === 3 && college?.type === 'simple') {
        setStep(1);
      } else if (step === 6 && isPG()) {
        setStep(4);
      } else if (step > 0) {
        setStep(s => s - 1);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step, mtechParentDept, college, level, batchData]);

  const handleManualBack = () => {
    if (mtechParentDept) {
      setMtechParentDept(null);
      return;
    }
    if (step === 3 && college?.type === 'simple') {
       setDirection(-1); setStep(1); return;
    }
    if (step === 6 && isPG()) {
      setDirection(-1); setStep(4); return;
    }
    window.history.back();
  };

  const isPG = () => {
    if (level?.id === 'PG') return true;
    if (batchData?.id === 'MTECH' || batchData?.id === 'MCA' || batchData?.id === 'MBA' || batchData?.id === 'MSC') return true;
    return false;
  };

  const getCurrentBatches = () => {
    if (college?.id === 'PTU') return level?.id === 'UG' ? PTU_UG_BATCHES : PTU_PG_COURSES;
    return AFFILIATED_BATCHES; 
  };

  const getCurrentDepartments = () => {
    if (batchData?.id === 'MTECH' && !mtechParentDept) return MTECH_PARENTS;
    if (batchData?.id === 'MTECH' && mtechParentDept) {
      return MTECH_DEPARTMENTS.filter(d => d.parentId === mtechParentDept.id);
    }
    if (batchData?.deptList === 'MCA_DEPARTMENTS') return MCA_DEPARTMENTS;
    if (batchData?.deptList === 'MBA_DEPARTMENTS') return MBA_DEPARTMENTS;
    if (batchData?.deptList === 'MSC_DEPARTMENTS') return MSC_DEPARTMENTS;
    if (college?.deptList === 'AFFILIATED_DEPARTMENTS') return AFFILIATED_DEPARTMENTS;
    return UG_DEPARTMENTS;
  };

  const getSubjects = (sem) => {
    if (customSyllabus[sem]) return customSyllabus[sem];
    const reg = batchData?.regulation || 'R2020';
    const deptId = deptData?.id || 'CSE'; 
    const courseSyllabus = SYLLABUS[reg]?.[deptId];
    return courseSyllabus?.[sem] || [];
  };

  const getGradingSystem = () => {
    const reg = batchData?.regulation || 'R2020';
    return GRADING_SYSTEMS[reg] || GRADING_SYSTEMS['R2020'];
  };

  const handleCalculate = () => {
    const system = getGradingSystem();
    const startSem = mode === 'specific' ? targetSem : (entryType === 'lateral' ? 3 : 1);
    const endSem = mode === 'specific' ? targetSem : currentSemLimit;
    let totalPoints = 0, totalCredits = 0, breakdown = [];

    for (let s = startSem; s <= endSem; s++) {
      const subjects = getSubjects(s);
      let semPoints = 0, semCredits = 0, semSubjects = [];
      subjects.forEach((sub, idx) => {
        const grade = gradeData[`${s}_${sub.code}_${idx}`];
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

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.credits) return;
    const currentList = getSubjects(activeSemInput);
    const newSub = { name: newSubject.name, code: `CUS-${Date.now().toString().slice(-4)}`, credits: parseFloat(newSubject.credits) };
    setCustomSyllabus({ ...customSyllabus, [activeSemInput]: [...currentList, newSub] });
    setNewSubject({ name: '', code: '', credits: '' });
    setShowAddModal(false);
  };

  const handleDeleteSubject = (index) => {
    const currentList = getSubjects(activeSemInput);
    const updatedList = [...currentList];
    updatedList.splice(index, 1);
    setCustomSyllabus({ ...customSyllabus, [activeSemInput]: updatedList });
  };

  const handleDownload = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `PTU_Result.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col overflow-x-hidden">
      
      {/* CREDITS MODAL */}
      <AnimatePresence>
        {showCreditsModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative">
                <button onClick={() => setShowCreditsModal(false)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"><X size={24}/></button>
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">Meet the Developers</h3>
                <div className="flex flex-col gap-4">
                   <a href={BENTO_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all group">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg group-hover:scale-110 transition-transform">AI</div>
                      <div><h4 className="font-bold text-slate-800">Abhinavkumar Ilango</h4><p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Lead Developer</p></div>
                      <ExternalLink size={16} className="ml-auto text-slate-300 group-hover:text-blue-500"/>
                   </a>
                   <a href={VIKNESH_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-purple-50 hover:border-purple-200 border-2 border-transparent transition-all group">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg group-hover:scale-110 transition-transform">VR</div>
                      <div><h4 className="font-bold text-slate-800">Viknesh RS</h4><p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">UI/UX Designer</p></div>
                      <ExternalLink size={16} className="ml-auto text-slate-300 group-hover:text-purple-500"/>
                   </a>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE HEADER */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-slate-200 shadow-sm flex justify-between items-center">
        <button onClick={reset} className="flex items-center gap-2 outline-none">
           <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200"><GraduationCap size={20} /></div>
           <span className="font-bold text-xl text-slate-800 tracking-tight">PTU CGPA</span>
        </button>
        <button onClick={() => setShowCreditsModal(true)} className="text-xs font-bold bg-slate-100 border border-slate-200 px-4 py-2 rounded-full text-slate-600 uppercase tracking-wide hover:bg-slate-200 transition-colors">Credits</button>
      </div>

      <div className="w-full max-w-[1920px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3 flex flex-col h-full">
          {/* DESKTOP HEADER */}
          <div className="hidden lg:flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-4 cursor-pointer" onClick={reset}>
              <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 hover:scale-105 transition-transform"><GraduationCap size={24} /></div>
              <div><h1 className="text-xl font-bold text-slate-800 leading-none mb-1">PTU Calculator</h1><p className="text-xs text-slate-400 font-medium tracking-wide">Puducherry Technological University</p></div>
            </div>
            <div className="flex gap-4">
              {step > 0 && (<button onClick={handleManualBack} className="flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"><ChevronLeft size={16} /> Back</button>)}
              <button onClick={() => setShowCreditsModal(true)} className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl hover:bg-slate-800 hover:shadow-2xl transition-all transform hover:-translate-y-0.5"><User size={14} /> Credits</button>
            </div>
          </div>

          {/* MAIN CARD - FORCED TO FILL SCREEN ON MOBILE */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white flex-1 relative overflow-hidden flex flex-col min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)]">
            <AnimatePresence mode='wait' custom={direction}>
              {/* HERO STEP */}
              {step === 0 && (
                <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="flex-1 flex flex-col">
                  <div className="bg-[#2563EB] p-8 lg:p-16 text-white text-center relative overflow-hidden flex-1 flex flex-col justify-center items-center rounded-t-[2.5rem]">
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px] opacity-40 translate-x-1/2 translate-y-1/2"></div>
                    <div className="relative z-10 max-w-3xl py-4">
                       <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg"><CheckCircle2 size={14} className="text-blue-300"/> Updated for 2024-25</div>
                       <h1 className="text-4xl lg:text-7xl font-extrabold mb-6 lg:mb-8 leading-tight tracking-tight drop-shadow-sm">Calculate Your <br/><span className="text-blue-200">CGPA</span> Instantly</h1>
                       <button onClick={() => nextStep()} className="group relative inline-flex items-center gap-4 px-8 py-4 lg:px-10 lg:py-5 bg-white text-[#2563EB] rounded-3xl font-extrabold text-lg shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all">Let's do it<ChevronRight strokeWidth={3} className="group-hover:translate-x-1 transition-transform" /></button>
                    </div>
                  </div>
                  <div className="p-6 bg-white border-t border-slate-100"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">{['PTU & Affiliated', 'UG & PG Support', 'Accurate Grading'].map((feat, i) => (<div key={i} className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-slate-50 text-sm font-bold text-slate-600"><CheckCircle2 size={18} className="text-blue-600" /> {feat}</div>))}</div></div>
                </motion.div>
              )}

              {/* STEP 1: COLLEGE */}
              {step === 1 && (
                <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-16 h-full flex flex-col justify-center">
                  <div className="max-w-5xl mx-auto w-full">
                    <h2 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-slate-900">Select Your College</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {COLLEGES.map((col) => (
                        <button key={col.id} onClick={() => { setCollege(col); if(col.type === 'simple') { setLevel({id:'UG'}); nextStep(2); } else nextStep(); }} 
                          className="group p-6 bg-white border-2 border-slate-100 rounded-[2rem] hover:border-blue-600 hover:shadow-xl transition-all flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 md:h-64"
                        >
                          <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm shrink-0"><School size={32} className="md:w-10 md:h-10" /></div>
                          <div className="text-left md:text-center">
                            <h3 className="text-lg md:text-2xl font-bold text-slate-800">{col.label}</h3>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LEVEL (PTU) */}
              {step === 2 && (
                <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-16 h-full flex flex-col justify-center">
                  <div className="max-w-4xl mx-auto w-full">
                    <h2 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-slate-900">Select Program Level</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PTU_LEVELS.map((lvl) => (
                        <button key={lvl.id} onClick={() => { setLevel(lvl); nextStep(); }} className="group p-6 bg-white border-2 border-slate-100 rounded-[2rem] hover:border-blue-600 hover:shadow-xl transition-all flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 md:h-64">
                          <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm shrink-0">{lvl.id === 'UG' ? <GraduationCap size={32} className="md:w-10 md:h-10" /> : <Library size={32} className="md:w-10 md:h-10" />}</div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800">{lvl.label}</h3>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: BATCH/COURSE */}
              {step === 3 && (
                <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-16 h-full flex flex-col justify-center">
                  <div className="max-w-5xl mx-auto w-full">
                    <h2 className="text-2xl lg:text-4xl font-bold mb-6 lg:mb-8 text-slate-900 text-center">{level?.id === 'PG' ? "Select PG Course" : "Select Batch"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getCurrentBatches().map((b) => (
                        <button key={b.id} onClick={() => { setBatchData(b); nextStep(); }} className="group relative p-6 bg-white border-2 border-slate-100 rounded-[2rem] hover:border-blue-600 hover:shadow-xl transition-all text-left flex items-center gap-4 md:gap-6 md:h-40">
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm shrink-0"><BookOpen size={28} className="md:w-8 md:h-8" /></div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-700">{b.label}</h3>
                            <p className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block group-hover:bg-blue-50 group-hover:text-blue-600">Reg: {b.regulation}</p>
                          </div>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight className="text-blue-600"/></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: DEPARTMENT SELECTION */}
              {step === 4 && (
                <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-16 h-full flex flex-col justify-center">
                  <div className="max-w-6xl mx-auto w-full">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-slate-900 text-center">
                      {batchData?.id === 'MTECH' && !mtechParentDept ? "Select Parent Department" : "Select Specialization / Department"}
                    </h2>
                    
                    <div className={`
                      ${getCurrentDepartments().length <= 2 ? 'flex flex-col sm:flex-row justify-center items-center' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} 
                      gap-4 mt-4 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh] w-full
                    `}>
                      {getCurrentDepartments().map((d) => (
                        <button key={d.id} 
                          onClick={() => { 
                            if (batchData?.id === 'MTECH' && !mtechParentDept) {
                              setMtechParentDept(d); 
                              window.history.pushState({ mtechSub: true }, '');
                            } else {
                              setDeptData(d); 
                              if (isPG()) {
                                nextStep(2);
                              } else {
                                nextStep();
                              }
                            }
                          }} 
                          className={`
                            flex items-center gap-4 p-6 rounded-[2rem] border-2 border-slate-100 bg-white hover:border-blue-600 hover:shadow-2xl transition-all group 
                            ${getCurrentDepartments().length <= 2 ? 'w-full sm:max-w-sm h-auto sm:h-56 flex-row sm:flex-col justify-start sm:justify-center text-left sm:text-center' : 'w-full flex-row md:flex-col justify-start md:justify-center text-left md:text-center md:h-56'}
                          `}
                        >
                          <div className={`w-14 h-14 md:w-20 md:h-20 rounded-3xl flex items-center justify-center ${d.color || 'bg-blue-100 text-blue-600'} shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                            {getDeptIcon(d.id)}
                          </div>
                          <span className="font-bold text-lg md:text-xl text-slate-800 group-hover:text-blue-700 leading-tight">{d.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: ENTRY TYPE (UG ONLY) */}
              {step === 5 && (
                <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-16 h-full flex flex-col justify-center items-center">
                  <div className="max-w-4xl w-full">
                    <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-slate-900">Select Admission Type</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <button onClick={() => { setEntryType('regular'); nextStep(); }} className="group p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-blue-600 hover:shadow-xl transition-all text-left h-auto md:h-64 flex flex-col justify-between">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><Users size={28} className="md:w-8 md:h-8"/></div>
                        <div><h3 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800">Regular Entry</h3><p className="text-slate-500 text-sm md:text-base">Joined in 1st Year (4 Years Course)</p></div>
                      </button>
                      <button onClick={() => { setEntryType('lateral'); nextStep(); }} className="group p-6 lg:p-8 bg-white border-2 border-slate-100 text-slate-800 rounded-[2.5rem] hover:border-purple-500 hover:shadow-xl transition-all text-left h-auto md:h-64 flex flex-col justify-between">
                        <div className="bg-purple-100 text-purple-600 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4"><UserPlus size={28} className="md:w-8 md:h-8"/></div>
                        <div><h3 className="text-2xl md:text-3xl font-bold mb-2">Lateral Entry</h3><p className="text-slate-500 text-sm md:text-base">Joined directly in 2nd Year (3 Years Course)</p></div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: MODE */}
              {step === 6 && (
                <motion.div key="step6" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-16 h-full flex flex-col justify-center items-center">
                  <div className="max-w-4xl w-full">
                    <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-slate-900">Calculation Mode</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <button onClick={() => { setMode('specific'); nextStep(); }} className="group p-6 lg:p-8 bg-[#2563EB] text-white rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-all text-left h-auto md:h-72 flex flex-col justify-between border-4 border-transparent hover:border-white/20">
                        <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={28} className="md:w-8 md:h-8"/></div>
                        <div><h3 className="text-2xl md:text-3xl font-bold mb-2">Specific Semester</h3><p className="text-blue-100 opacity-90 text-sm md:text-base">Calculate for a single semester.</p></div>
                      </button>
                      <button onClick={() => { setMode('cumulative'); nextStep(); }} className="group p-6 lg:p-8 bg-white border-2 border-slate-100 text-slate-800 rounded-[2.5rem] hover:border-purple-500 hover:shadow-xl transition-all text-left h-auto md:h-72 flex flex-col justify-between">
                        <div className="bg-purple-50 text-purple-600 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4"><Calculator size={28} className="md:w-8 md:h-8"/></div>
                        <div><h3 className="text-2xl md:text-3xl font-bold mb-2">Cumulative CGPA</h3><p className="text-slate-500 text-sm md:text-base">Calculate up to current semester.</p></div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 7: SEMESTER */}
              {step === 7 && (
                <motion.div key="step7" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-16 h-full flex flex-col justify-center">
                  <div className="max-w-3xl mx-auto w-full">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-slate-900 text-center">Select Semester</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                      {[1,2,3,4,5,6,7,8]
                        .filter(s => entryType === 'lateral' ? s >= 3 : true)
                        .slice(0, isPG() ? 4 : 8)
                        .map((sem) => (
                        <button key={sem} onClick={() => { if (mode === 'specific') { setTargetSem(sem); setActiveSemInput(sem); } else { setCurrentSemLimit(sem); setActiveSemInput(entryType === 'lateral' ? 3 : 1); } nextStep(); }} className="aspect-square rounded-[2rem] font-extrabold text-3xl bg-white border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-xl transition-all flex items-center justify-center text-slate-400">
                          {sem}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* STEP 8: INPUT */}
              {step === 8 && (
                <motion.div key="step8" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="flex flex-col h-full relative">
                  <div className="px-6 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20 flex justify-between items-center">
                    <div><h2 className="text-xl lg:text-3xl font-bold text-slate-900">Semester {activeSemInput}</h2><p className="text-slate-400 text-xs lg:text-sm">Manage & Grade Subjects</p></div>
                    <div className="flex gap-3 items-center">{mode === 'cumulative' && <span className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">{Math.round(((activeSemInput - (entryType==='lateral'?2:0)) / (currentSemLimit - (entryType==='lateral'?2:0))) * 100)}%</span>}</div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-4 custom-scrollbar bg-[#FAFAFA]">
                    {getSubjects(activeSemInput).length === 0 && (
                        <div className="text-center p-10 text-slate-400 bg-white rounded-2xl border-2 border-dashed border-slate-200"><p className="font-bold mb-1">No subjects pre-loaded.</p><p className="text-sm">Use "Add Subject" below.</p></div>
                    )}
                    {getSubjects(activeSemInput).map((sub, idx) => (
                      <div key={`${sub.code}-${idx}`} className="flex items-center gap-4 p-4 lg:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-400 transition-all group relative">
                        <button onClick={() => handleDeleteSubject(idx)} className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-10 hover:bg-red-500 hover:text-white"><Trash2 size={14} /></button>
                        <div className="flex-1 pl-2"><p className="font-bold text-slate-800 text-sm lg:text-base mb-1">{sub.name}</p><p className="text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 inline-block px-2 py-1 rounded-md border border-slate-200">{sub.code} • {sub.credits} Cr</p></div>
                        <div className="relative w-24 lg:w-32">
                          <select 
                            className="w-full bg-slate-50 border-2 border-slate-200 text-slate-900 text-base rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 block p-2 lg:p-3 font-bold text-center outline-none cursor-pointer transition-all appearance-none hover:bg-white" 
                            value={gradeData[`${activeSemInput}_${sub.code}_${idx}`] || ""} 
                            onChange={(e) => setGradeData({ ...gradeData, [`${activeSemInput}_${sub.code}_${idx}`]: e.target.value })}
                          >
                            <option value="">-</option>{getGradingSystem().labels.map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setShowAddModal(true)} className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 text-slate-400 font-bold flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all"><Plus size={20} /> Add Subject</button>
                  </div>
                  <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex gap-3">
                    {mode === 'cumulative' && activeSemInput > (entryType === 'lateral' ? 3 : 1) && <button onClick={() => setActiveSemInput(s => s - 1)} className="px-6 py-5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"><ChevronLeft size={24}/></button>}
                    <button onClick={() => { if (mode === 'cumulative' && activeSemInput < currentSemLimit) { setActiveSemInput(s => s + 1); } else { handleCalculate(); } }} className="flex-1 bg-[#0F172A] text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3">{mode === 'cumulative' && activeSemInput < currentSemLimit ? <>Next Semester <ChevronRight/></> : <>Calculate Result <Calculator/></>}</button>
                  </div>
                  <AnimatePresence>{showAddModal && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"><div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-slate-800">Add Subject</h3><button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button></div><div className="space-y-4"><div><label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Subject Name</label><input type="text" className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none mt-1" placeholder="e.g. Advanced Physics" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} /></div><div className="flex gap-4"><div className="flex-1"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Code (Opt)</label><input type="text" className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none mt-1" placeholder="PHY101" value={newSubject.code} onChange={e => setNewSubject({...newSubject, code: e.target.value})} /></div><div className="w-1/3"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Credits</label><input type="number" className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-800 focus:border-blue-500 outline-none mt-1" placeholder="3" value={newSubject.credits} onChange={e => setNewSubject({...newSubject, credits: e.target.value})} /></div></div><button onClick={handleAddSubject} disabled={!newSubject.name || !newSubject.credits} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mt-2">Add to List</button></div></motion.div></motion.div>)}</AnimatePresence>
                </motion.div>
              )}
              {/* RESULT STEP */}
              {step === 9 && result && (<motion.div key="step9" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="p-4 lg:p-10 h-full flex flex-col justify-center items-center text-center overflow-y-auto"><div ref={resultRef} id="capture-target" className="bg-white p-4 sm:p-8 rounded-[2.5rem] w-full max-w-2xl mx-auto shadow-none flex flex-col gap-6"><div className={`relative w-full rounded-[2rem] flex flex-col items-center justify-start pt-10 pb-24 px-4 gap-4 ${parseFloat(result.score) >= 9 ? 'bg-gradient-to-br from-[#22C55E] to-[#16A34A]' : parseFloat(result.score) >= 7.5 ? 'bg-gradient-to-br from-[#F97316] to-[#EA580C]' : 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]'}`}><div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner"><GraduationCap size={28} className="text-white drop-shadow-md" /></div><div className="flex flex-col items-center justify-center mt-2"><h2 className="text-7xl sm:text-8xl font-black tracking-tighter drop-shadow-xl text-white leading-none mb-2">{result.score}</h2><p className="text-xl sm:text-2xl font-bold opacity-90 uppercase tracking-[0.3em] text-white">{result.type}</p></div><div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-auto bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl px-4 py-4 text-lg sm:text-xl font-bold shadow-xl text-white leading-tight flex items-center justify-center">{parseFloat(result.score) >= 9 ? "Outstanding!" : "Great Effort!"}</div></div><div className="text-center mt-4"><h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">PTU CGPA Calculator</h3><p className="text-slate-400 text-sm font-medium">Generated Result</p></div></div><div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mt-4 pb-6"><button onClick={reset} className="w-full py-4 rounded-2xl border-2 border-slate-200 font-bold text-lg text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"><RotateCcw size={20} /> Retry</button><button onClick={handleDownload} className="w-full py-4 rounded-2xl bg-[#0F172A] text-white font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"><Download size={20} /> Save Image</button></div></motion.div>)}
            </AnimatePresence>
          </div>
          
          {/* MOBILE BOTTOM AD - Moved up closer to content */}
          <div className="lg:hidden mt-4 mb-4 w-full flex justify-center">
             <AdComponent dataAdSlot="1442630094" /> 
          </div>

          <div className="lg:hidden flex justify-center gap-6 pb-8 text-sm font-bold text-slate-400"><a href="/privacy.html" target="_blank" className="hover:text-blue-600 flex items-center gap-1"><ExternalLink size={12}/> Privacy Policy</a><a href="/terms.html" target="_blank" className="hover:text-blue-600 flex items-center gap-1"><ExternalLink size={12}/> Terms of Use</a></div>
          <footer className="text-center py-6 text-slate-400 text-sm font-medium lg:hidden">© 2025 All Rights Reserved by Team DeCo</footer>
        </div>
        <div className="hidden lg:col-span-1 lg:flex flex-col gap-6 sticky top-6 h-fit">
           <div className="min-h-[250px] rounded-[2rem] overflow-hidden shadow-sm border-2 border-slate-100 bg-white"><AdComponent dataAdSlot="1442630094" /></div>
           <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 shadow-sm"><h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-lg">Quick Links</h3><ul className="space-y-3 text-sm font-medium text-blue-800/80"><li><a href="/privacy.html" target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><ChevronRight size={14} /> Privacy Policy</a></li><li><a href="/terms.html" target="_blank" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><ChevronRight size={14} /> Terms of Use</a></li><li><a href={BENTO_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><LinkIcon size={14} /> Contact Developer</a></li></ul></div>
           <div className="min-h-[250px] rounded-[2rem] overflow-hidden shadow-sm border-2 border-slate-100 bg-white"><AdComponent dataAdSlot="1442630094" /></div>
        </div>
      </div>
      <section className="bg-[#F8FAFC] border-t border-slate-200 mt-auto"><InfoSection /></section>
    </div>
  );
}