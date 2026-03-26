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
  UG_DEPARTMENTS, PKIET_DEPARTMENTS, WEC_DEPARTMENTS, MTECH_PARENTS, MTECH_DEPARTMENTS, MCA_DEPARTMENTS, MBA_DEPARTMENTS, MSC_DEPARTMENTS,
  SYLLABUS, GRADING_SYSTEMS 
} from './data';
import InfoSection from './InfoSection';
import AdComponent from './AdComponent';

const BENTO_ABHINAV = "https://bento.me/abhinavkumarilango";
const BENTO_VIKNESH = "https://bento.me/vikneshhrs";

const getDeptIcon = (id) => {
  const size = 32;
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

  const handleManualBack = () => {
    setDirection(-1);
    if (mtechParentDept) { setMtechParentDept(null); return; }
    if (step === 3 && college?.type === 'simple') { setStep(1); return; }
    if (step === 6 && isPG()) { setStep(4); return; }
    if (step > 0) setStep(s => s - 1);
  };

  useEffect(() => {
    const handlePopState = () => handleManualBack();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step, mtechParentDept, college]);

  const reset = () => {
    setDirection(-1); setStep(0); setCollege(null); setLevel(null);
    setBatchData(null); setDeptData(null); setMtechParentDept(null);
    setEntryType('regular'); setMode(null); setGradeData({}); setResult(null);
    setActiveSemInput(1); setCustomSyllabus({});
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
    if (batchData?.id === 'MTECH' && mtechParentDept) return MTECH_DEPARTMENTS.filter(d => d.parentId === mtechParentDept.id);
    if (batchData?.deptList === 'MCA_DEPARTMENTS') return MCA_DEPARTMENTS;
    if (batchData?.deptList === 'MBA_DEPARTMENTS') return MBA_DEPARTMENTS;
    if (batchData?.deptList === 'MSC_DEPARTMENTS') return MSC_DEPARTMENTS;
    if (college?.deptList === 'PKIET_DEPARTMENTS') return PKIET_DEPARTMENTS;
    if (college?.deptList === 'WEC_DEPARTMENTS') return WEC_DEPARTMENTS;
    return UG_DEPARTMENTS;
  };

  const getSubjects = (sem) => customSyllabus[sem] || SYLLABUS[batchData?.regulation || 'R2020']?.[deptData?.id || 'CSE']?.[sem] || [];
  const getGradingSystem = () => GRADING_SYSTEMS[batchData?.regulation || 'R2020'] || GRADING_SYSTEMS['R2020'];

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
    const updatedList = [...getSubjects(activeSemInput)];
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

  const getResultTheme = (score) => {
    const s = parseFloat(score);
    if (s >= 9.0) return { bg: 'bg-[#22C55E]', shadow: 'shadow-green-200', text: 'Outstanding!', icon: 'text-green-100' }; // Green
    if (s >= 7.5) return { bg: 'bg-[#2563EB]', shadow: 'shadow-blue-200', text: 'Excellent Work!', icon: 'text-blue-100' }; // Blue
    if (s >= 6.0) return { bg: 'bg-[#F97316]', shadow: 'shadow-orange-200', text: 'Good Job!', icon: 'text-orange-100' }; // Orange
    return { bg: 'bg-[#EF4444]', shadow: 'shadow-red-200', text: 'Keep Pushing!', icon: 'text-red-100' }; // Red
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col overflow-x-hidden">
      
      {/* CREDITS MODAL */}
      <AnimatePresence>
        {showCreditsModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative">
                <button onClick={() => setShowCreditsModal(false)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"><X size={24}/></button>
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">Developed By</h3>
                <div className="flex flex-col gap-4">
                   <a href={BENTO_ABHINAV} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">AI</div>
                      <div><h4 className="font-extrabold text-blue-900 text-lg">I ABHINAVKUMAR</h4><p className="text-xs text-blue-500 font-bold uppercase tracking-wider">Lead Developer</p></div>
                   </a>
                   <a href={BENTO_VIKNESH} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 bg-purple-50 rounded-2xl border border-purple-100 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">VR</div>
                      <div><h4 className="font-extrabold text-purple-900 text-lg">VIKNESH RS</h4><p className="text-xs text-purple-500 font-bold uppercase tracking-wider">UI/UX Designer</p></div>
                   </a>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE HEADER */}
      <div className="lg:hidden bg-white/95 backdrop-blur-md p-4 sticky top-0 z-50 flex justify-between items-center h-16 shadow-sm border-b border-slate-100">
        <button onClick={reset} className="flex items-center gap-2 outline-none">
           <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm"><GraduationCap size={20} /></div>
           <span className="font-bold text-lg text-slate-900 tracking-tight">PTU CGPA</span>
        </button>
        <div className="flex gap-3">
            {step > 0 && <button onClick={handleManualBack} className="flex items-center justify-center w-8 h-8 bg-slate-50 text-slate-500 rounded-full border border-slate-200"><ChevronLeft size={18}/></button>}
            <button onClick={() => setShowCreditsModal(true)} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full uppercase tracking-wider border border-slate-200">CREDITS</button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 flex-1 flex flex-col">
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-4 cursor-pointer" onClick={reset}>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 hover:scale-105 transition-transform"><GraduationCap size={28} /></div>
            <div><h1 className="text-2xl font-bold text-slate-800 leading-none mb-1">PTU Calculator</h1><p className="text-xs text-slate-400 font-medium tracking-wide">Puducherry Technological University</p></div>
          </div>
          <div className="flex gap-4">
            {step > 0 && (<button onClick={handleManualBack} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"><ChevronLeft size={18} /> Back</button>)}
            <button onClick={() => setShowCreditsModal(true)} className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-xl hover:bg-slate-800 hover:shadow-2xl transition-all transform hover:-translate-y-0.5"><User size={16} /> Credits</button>
          </div>
        </div>

        {/* MAIN CARD - FIXED CENTERING */}
        <div className="bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-white flex-1 relative overflow-hidden flex flex-col min-h-[calc(100vh-6rem)] lg:min-h-[700px] mb-8">
          <AnimatePresence mode='wait' custom={direction}>
            
            {/* STEP 0: HERO - Centered */}
            {step === 0 && (
              <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="absolute inset-0 flex flex-col justify-center items-center">
                <div className="w-full h-full bg-[#2563EB] p-8 lg:p-20 text-white text-center relative overflow-hidden flex flex-col justify-center items-center rounded-t-[2rem] lg:rounded-t-[3rem]">
                  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-40 translate-x-1/2 translate-y-1/2"></div>
                  <div className="relative z-10 max-w-4xl py-6 flex flex-col items-center">
                      <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-8 shadow-lg"><CheckCircle2 size={14} className="text-blue-300"/> Updated for 2024-25</div>
                      <h1 className="text-4xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight drop-shadow-sm">Calculate Your <br/><span className="text-blue-200">CGPA</span> Instantly</h1>
                      <button onClick={() => nextStep()} className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-[#2563EB] rounded-3xl font-extrabold text-xl shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all">Calculate Now <ChevronRight strokeWidth={3} className="group-hover:translate-x-1 transition-transform" /></button>
                  </div>
                </div>
                <div className="w-full p-6 bg-white border-t border-slate-100"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">{['PTU & Affiliated', 'UG & PG Support', 'Accurate Grading'].map((feat, i) => (<div key={i} className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-slate-50 text-base font-bold text-slate-600"><CheckCircle2 size={20} className="text-blue-600" /> {feat}</div>))}</div></div>
              </motion.div>
            )}

            {/* SELECTION STEPS: ABSOLUTE INSET-0 FOR PERFECT CENTERING */}
            {[1, 2, 3, 4, 5, 6, 7].includes(step) && (
              <motion.div key={`step${step}`} variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="absolute inset-0 p-4 lg:p-12 flex flex-col justify-center items-center overflow-y-auto custom-scrollbar">
                <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-min">
                  
                  {/* Title */}
                  <h2 className="text-2xl lg:text-5xl font-bold text-slate-900 mb-8 text-center shrink-0">
                      {step===1 && "Select Your College"}
                      {step===2 && "Select Program Level"}
                      {step===3 && (level?.id==='PG' ? "Select PG Course" : "Select Batch")}
                      {step===4 && (batchData?.id==='MTECH' && !mtechParentDept ? "Select Parent Dept" : "Select Specialization")}
                      {step===5 && "Select Admission Type"}
                      {step===6 && "Calculation Mode"}
                      {step===7 && "Select Semester"}
                  </h2>

                  {/* Buttons Grid - Restored BIG UI */}
                  <div className={`
                    grid gap-4 lg:gap-8 w-full
                    ${step===1 ? 'grid-cols-1 lg:grid-cols-3' : ''}
                    ${step===2 || step===3 || step===5 || step===6 ? 'grid-cols-1 md:grid-cols-2' : ''}
                    ${step===4 ? (getCurrentDepartments().length<=2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3') : ''}
                    ${step===7 ? 'grid-cols-2 sm:grid-cols-4' : ''}
                  `}>
                    
                    {/* 1. COLLEGE */}
                    {step===1 && COLLEGES.map(col => (
                        <button key={col.id} onClick={() => { setCollege(col); if(col.type==='simple'){setLevel({id:'UG'}); nextStep(2);} else nextStep(); }} 
                          className="group w-full p-8 lg:p-10 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl transition-all flex flex-col items-center justify-center gap-6 min-h-[180px] text-center"
                        >
                            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm shrink-0"><School size={40} className="lg:w-12 lg:h-12"/></div>
                            <h3 className="text-xl lg:text-3xl font-bold text-slate-800 leading-tight">{col.label}</h3>
                        </button>
                    ))}

                    {/* 2. LEVEL */}
                    {step===2 && PTU_LEVELS.map(lvl => (
                        <button key={lvl.id} onClick={() => { setLevel(lvl); nextStep(); }} className="group w-full p-8 lg:p-12 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl transition-all flex flex-col items-center justify-center gap-6 min-h-[180px] text-center">
                            <div className="w-16 h-16 lg:w-28 lg:h-28 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm shrink-0">{lvl.id==='UG' ? <GraduationCap size={36} className="lg:w-14 lg:h-14"/> : <Library size={36} className="lg:w-14 lg:h-14"/>}</div>
                            <h3 className="text-xl lg:text-4xl font-bold text-slate-800">{lvl.label}</h3>
                        </button>
                    ))}

                    {/* 3. BATCH */}
                    {step===3 && getCurrentBatches().map(b => (
                        <button key={b.id} onClick={() => { setBatchData(b); nextStep(); }} className="group relative p-6 lg:p-10 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl transition-all text-left flex items-center gap-6 min-h-[120px]">
                            <div className="w-14 h-14 lg:w-20 lg:h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm shrink-0"><BookOpen size={28} className="lg:w-10 lg:h-10"/></div>
                            <div><h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-700">{b.label}</h3><p className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-md inline-block group-hover:bg-blue-50 group-hover:text-blue-600">Reg: {b.regulation}</p></div>
                            <ArrowRight className="ml-auto text-blue-600 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"/>
                        </button>
                    ))}

                    {/* 4. DEPARTMENT */}
                    {step===4 && getCurrentDepartments().map(d => (
                        <button key={d.id} onClick={() => { if(batchData?.id==='MTECH' && !mtechParentDept){setMtechParentDept(d); window.history.pushState({mtechSub:true},'');} else {setDeptData(d); isPG()?nextStep(2):nextStep();} }} className="flex items-center gap-6 p-6 lg:p-8 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-blue-600 hover:shadow-2xl transition-all group min-h-[100px]">
                            <div className={`w-14 h-14 lg:w-20 lg:h-20 rounded-3xl flex items-center justify-center ${d.color||'bg-blue-100 text-blue-600'} shadow-sm group-hover:scale-110 transition-transform shrink-0`}>{getDeptIcon(d.id)}</div>
                            <span className="font-bold text-lg lg:text-xl text-slate-800 group-hover:text-blue-700 leading-tight text-left">{d.name}</span>
                        </button>
                    ))}

                    {/* 5. ADMISSION */}
                    {step===5 && (
                        <>
                        <button onClick={() => { setEntryType('regular'); nextStep(); }} className="group w-full p-8 lg:p-12 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl transition-all text-center flex flex-col items-center justify-center gap-4 min-h-[180px]">
                            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center shrink-0"><Users size={32} className="lg:w-10 lg:h-10"/></div>
                            <div><h3 className="text-xl lg:text-4xl font-bold mb-2 text-slate-800">Regular Entry</h3><p className="text-slate-500 text-sm lg:text-xl">Joined in 1st Year</p></div>
                        </button>
                        <button onClick={() => { setEntryType('lateral'); nextStep(); }} className="group w-full p-8 lg:p-12 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-purple-500 hover:shadow-2xl transition-all text-center flex flex-col items-center justify-center gap-4 min-h-[180px]">
                            <div className="bg-purple-100 text-purple-600 w-16 h-16 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center shrink-0"><UserPlus size={32} className="lg:w-10 lg:h-10"/></div>
                            <div><h3 className="text-xl lg:text-4xl font-bold mb-2">Lateral Entry</h3><p className="text-slate-500 text-sm lg:text-xl">Joined in 2nd Year</p></div>
                        </button>
                        </>
                    )}

                    {/* 6. MODE */}
                    {step===6 && (
                        <>
                        <button onClick={() => { setMode('specific'); nextStep(); }} className="group w-full p-8 lg:p-12 bg-[#2563EB] text-white rounded-[2.5rem] shadow-xl hover:scale-[1.01] transition-all text-center flex flex-col items-center justify-center gap-4 min-h-[200px] border-4 border-transparent hover:border-white/20">
                            <div className="bg-white/20 w-16 h-16 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center shrink-0"><BookOpen size={32} className="lg:w-10 lg:h-10"/></div>
                            <div><h3 className="text-xl lg:text-4xl font-bold mb-2">Specific Semester</h3><p className="text-blue-100 opacity-90 text-sm lg:text-xl">Single semester calculation</p></div>
                        </button>
                        <button onClick={() => { setMode('cumulative'); nextStep(); }} className="group w-full p-8 lg:p-12 bg-white border-2 border-slate-100 text-slate-800 rounded-[2.5rem] hover:border-purple-500 hover:shadow-2xl transition-all text-center flex flex-col items-center justify-center gap-4 min-h-[200px]">
                            <div className="bg-purple-50 text-purple-600 w-16 h-16 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center shrink-0"><Calculator size={32} className="lg:w-10 lg:h-10"/></div>
                            <div><h3 className="text-xl lg:text-4xl font-bold mb-2">Cumulative CGPA</h3><p className="text-slate-500 text-sm lg:text-xl">Up to current semester</p></div>
                        </button>
                        </>
                    )}

                    {/* 7. SEMESTER */}
                    {step===7 && [1,2,3,4,5,6,7,8].filter(s => entryType==='lateral'?s>=3:true).slice(0,isPG()?4:8).map(sem => (
                        <button key={sem} onClick={() => { if(mode==='specific'){setTargetSem(sem); setActiveSemInput(sem);} else {setCurrentSemLimit(sem); setActiveSemInput(entryType==='lateral'?3:1);} nextStep(); }} className="w-full aspect-square rounded-[2.5rem] font-extrabold text-5xl lg:text-6xl bg-white border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-2xl transition-all flex items-center justify-center text-slate-400 shadow-sm">
                            {sem}
                        </button>
                    ))}

                  </div>
                </div>
              </motion.div>
            )}
            
            {/* STEP 8: INPUT */}
            {step === 8 && (
              <motion.div key="step8" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="absolute inset-0 flex flex-col h-full relative">
                <div className="px-6 py-4 lg:py-6 border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20 flex justify-between items-center">
                  <div><h2 className="text-lg lg:text-3xl font-bold text-slate-900">Semester {activeSemInput}</h2><p className="text-slate-400 text-xs lg:text-sm">Manage & Grade Subjects</p></div>
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
            
            {/* STEP 9: RESULT (Center Card with Dynamic Colors) */}
            {step === 9 && result && (
              <motion.div key="step9" variants={slideVariants} initial="enter" animate="center" exit="exit" custom={direction} className="absolute inset-0 p-4 lg:p-10 flex flex-col justify-center items-center text-center">
                <div ref={resultRef} id="capture-target" className="bg-white p-4 sm:p-8 rounded-[2.5rem] w-full max-w-xl mx-auto shadow-none flex flex-col gap-6">
                  {/* Dynamic Color Card */}
                  <div className={`relative w-full rounded-[2rem] flex flex-col items-center justify-start pt-14 pb-20 px-4 gap-4 ${getResultTheme(result.score).bg}`}>
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner"><GraduationCap size={32} className="text-white drop-shadow-md" /></div>
                    <div className="flex flex-col items-center justify-center mt-2">
                      <h2 className="text-8xl font-black tracking-tighter drop-shadow-xl text-white leading-none mb-2">{result.score}</h2>
                      <p className="text-2xl font-bold opacity-90 uppercase tracking-[0.3em] text-white">{result.type}</p>
                    </div>
                    {/* Dynamic Message */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-4 text-xl font-bold shadow-xl text-white leading-tight flex items-center justify-center">
                        {getResultTheme(result.score).text}
                    </div>
                  </div>
                  <div className="text-center mt-6"><h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">PTU CGPA Calculator</h3><p className="text-slate-400 text-sm font-medium">Generated Result</p></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mt-4 pb-6"><button onClick={reset} className="w-full py-4 rounded-2xl border-2 border-slate-200 font-bold text-lg text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"><RotateCcw size={20} /> Retry</button><button onClick={handleDownload} className="w-full py-4 rounded-2xl bg-[#0F172A] text-white font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"><Download size={20} /> Save Image</button></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* MOBILE BOTTOM AD SPACE */}
        <div className="lg:hidden w-full flex justify-center py-4">
           <AdComponent dataAdSlot="1442630094" /> 
        </div>

        {/* FOOTER */}
        <footer className="text-center py-6 text-slate-400 text-sm font-medium">© 2025 All Rights Reserved by Team DeCo</footer>
      </div>
      
      {/* FULL WIDTH INFO SECTION */}
      <section className="bg-[#F8FAFC] border-t border-slate-200 mt-auto w-full">
        <InfoSection />
        <div className="hidden lg:block text-center py-8 text-slate-400 text-sm font-medium">© 2025 All Rights Reserved by Team DeCo</div>
      </section>
    </div>
  );
}