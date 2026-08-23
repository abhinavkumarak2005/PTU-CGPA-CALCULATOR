// src/hooks/useCalculator.js
// All calculator state and logic extracted from PTUCGPACalculator.jsx
// Import this hook in CalculatorWizard.jsx

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import {
  PTU_UG_BATCHES, PTU_PG_COURSES, AFFILIATED_BATCHES,
  UG_DEPARTMENTS, PKIET_DEPARTMENTS, WEC_DEPARTMENTS,
  MTECH_PARENTS, MTECH_DEPARTMENTS, MCA_DEPARTMENTS, MBA_DEPARTMENTS, MSC_DEPARTMENTS,
  SYLLABUS, GRADING_SYSTEMS, COLLEGES
} from '../data';

export function useCalculator() {
  const location = useLocation();
  const resumeState = location.state;

  const [step, setStep]                         = useState(0);
  const [college, setCollege]                   = useState(null);
  const [level, setLevel]                       = useState(null);
  const [batchData, setBatchData]               = useState(null);
  const [deptData, setDeptData]                 = useState(null);
  const [entryType, setEntryType]               = useState('regular');
  const [mtechParentDept, setMtechParentDept]   = useState(null);
  const [mode, setMode]                         = useState(null);
  const [targetSem, setTargetSem]               = useState(null);
  const [currentSemLimit, setCurrentSemLimit]   = useState(null);
  const [activeSemInput, setActiveSemInput]     = useState(1);
  const [gradeData, setGradeData]               = useState({});
  const [result, setResult]                     = useState(null);
  const [customSyllabus, setCustomSyllabus]     = useState({});
  const [showAddModal, setShowAddModal]         = useState(false);
  const [newSubject, setNewSubject]             = useState({ name: '', code: '', credits: '' });

  const resultRef  = useRef(null);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter:  (d) => ({ x: d > 0 ?  40 : -40, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit:   (d) => ({ zIndex: 0, x: d < 0 ?  40 : -40, opacity: 0 }),
  };

  // ── Navigation ──────────────────────────────────────────────────────────────
  const nextStep = (jump = 1) => {
    setDirection(1);
    setStep(s => s + jump);
    window.history.pushState({ step: step + jump }, '');
  };

  const handleManualBack = () => {
    setDirection(-1);
    if (mtechParentDept)                             { setMtechParentDept(null); return; }
    if (step === 3 && college?.type === 'simple')    { setStep(1); return; }
    if (step === 6 && isPG())                        { setStep(4); return; }
    if (step > 0) setStep(s => s - 1);
  };

  useEffect(() => {
    if (resumeState?.resume) {
      const col = COLLEGES.find(c => c.id === resumeState.college) || COLLEGES[0];
      setCollege(col);
      
      const batchList = col.id === 'PTU' ? [...PTU_UG_BATCHES, ...PTU_PG_COURSES] : AFFILIATED_BATCHES;
      const bat = batchList.find(b => b.id === resumeState.batch) || batchList[0];
      setBatchData(bat);
      
      const allDepts = [...UG_DEPARTMENTS, ...PKIET_DEPARTMENTS, ...WEC_DEPARTMENTS, ...MTECH_DEPARTMENTS];
      const dep = allDepts.find(d => d.id === resumeState.dept);
      setDeptData(dep || { id: resumeState.dept, name: resumeState.dept });

      setEntryType(resumeState.entryType);
      setMode('cumulative');
      setGradeData(resumeState.initialGrades || {});
      if (resumeState.initialGrades?._customSyllabus) {
        setCustomSyllabus(resumeState.initialGrades._customSyllabus);
      }
      setCurrentSemLimit(resumeState.targetSemLimit);
      setActiveSemInput(resumeState.startSem);
      setStep(8);
      
      window.history.replaceState({}, '');
    }
  }, [resumeState]);

  useEffect(() => {
    const handlePopState = () => handleManualBack();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step, mtechParentDept, college]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setDirection(-1); setStep(0); setCollege(null); setLevel(null);
    setBatchData(null); setDeptData(null); setMtechParentDept(null);
    setEntryType('regular'); setMode(null); setGradeData({}); setResult(null);
    setActiveSemInput(1); setCustomSyllabus({});
  };

  // ── Computed helpers ─────────────────────────────────────────────────────────
  const isPG = () => {
    if (level?.id === 'PG') return true;
    if (['MTECH','MCA','MBA','MSC'].includes(batchData?.id)) return true;
    return false;
  };

  const getCurrentBatches = () => {
    if (college?.id === 'PTU') return level?.id === 'UG' ? PTU_UG_BATCHES : PTU_PG_COURSES;
    return AFFILIATED_BATCHES;
  };

  const getCurrentDepartments = () => {
    if (batchData?.id === 'MTECH' && !mtechParentDept) return MTECH_PARENTS;
    if (batchData?.id === 'MTECH' && mtechParentDept)
      return MTECH_DEPARTMENTS.filter(d => d.parentId === mtechParentDept.id);
    if (batchData?.deptList === 'MCA_DEPARTMENTS')  return MCA_DEPARTMENTS;
    if (batchData?.deptList === 'MBA_DEPARTMENTS')  return MBA_DEPARTMENTS;
    if (batchData?.deptList === 'MSC_DEPARTMENTS')  return MSC_DEPARTMENTS;
    if (college?.deptList === 'PKIET_DEPARTMENTS')  return PKIET_DEPARTMENTS;
    if (college?.deptList === 'WEC_DEPARTMENTS')    return WEC_DEPARTMENTS;
    return UG_DEPARTMENTS;
  };

  const getSubjects = (sem) =>
    customSyllabus[sem] ||
    SYLLABUS[batchData?.regulation || 'R2020']?.[deptData?.id || 'CSE']?.[sem] ||
    [];

  const getGradingSystem = () =>
    GRADING_SYSTEMS[batchData?.regulation || 'R2020'] || GRADING_SYSTEMS['R2020'];

  const getResultTheme = (score) => {
    const s = parseFloat(score);
    if (s >= 9.0) return { bg: 'bg-[#22C55E]', shadow: 'shadow-green-200',  text: 'Outstanding!',   icon: 'text-green-100'  };
    if (s >= 7.5) return { bg: 'bg-[#2563EB]', shadow: 'shadow-blue-200',   text: 'Excellent Work!', icon: 'text-blue-100'   };
    if (s >= 6.0) return { bg: 'bg-[#F97316]', shadow: 'shadow-orange-200', text: 'Good Job!',       icon: 'text-orange-100' };
    return           { bg: 'bg-[#EF4444]', shadow: 'shadow-red-200',    text: 'Keep Pushing!',  icon: 'text-red-100'    };
  };

  // ── Calculation ──────────────────────────────────────────────────────────────
  const handleCalculate = () => {
    const system   = getGradingSystem();
    const startSem = mode === 'specific' ? targetSem : (entryType === 'lateral' ? 3 : 1);
    const endSem   = mode === 'specific' ? targetSem : currentSemLimit;
    let totalPoints = 0, totalCredits = 0, breakdown = [];

    for (let s = startSem; s <= endSem; s++) {
      const subjects = getSubjects(s);
      let semPoints = 0, semCredits = 0, semSubjects = [];
      subjects.forEach((sub, idx) => {
        const grade = gradeData[`${s}_${sub.code}_${idx}`];
        if (grade) {
          const gp = system.points[grade];
          if (!system.excludeCredits.includes(grade)) {
            semPoints  += gp * sub.credits;
            semCredits += sub.credits;
          }
          semSubjects.push({ ...sub, grade, gp });
        }
      });
      if (semSubjects.length > 0) {
        const sgpa = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : '0.00';
        breakdown.push({ semester: s, sgpa, subjects: semSubjects });
        totalPoints  += semPoints;
        totalCredits += semCredits;
      }
    }
    setResult({
      score:     totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00',
      breakdown,
      type:      mode === 'specific' ? 'SGPA' : 'CGPA',
    });
    nextStep();
  };

  // ── Subject management ────────────────────────────────────────────────────────
  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.credits) return;
    const currentList = getSubjects(activeSemInput);
    const newSub = {
      name:    newSubject.name,
      code:    newSubject.code || `CUS-${Date.now().toString().slice(-4)}`,
      credits: parseFloat(newSubject.credits),
    };
    setCustomSyllabus({ ...customSyllabus, [activeSemInput]: [...currentList, newSub] });
    setNewSubject({ name: '', code: '', credits: '' });
    setShowAddModal(false);
  };

  const handleDeleteSubject = (index) => {
    const updated = [...getSubjects(activeSemInput)];
    updated.splice(index, 1);
    setCustomSyllabus({ ...customSyllabus, [activeSemInput]: updated });
  };

  // ── Download ─────────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, {
      scale: 2, backgroundColor: '#ffffff', useCORS: true,
    });
    const link = document.createElement('a');
    link.href     = canvas.toDataURL('image/png');
    link.download = 'PTU_Result.png';
    link.click();
  };

  return {
    // State
    step, college, level, batchData, deptData, entryType, mtechParentDept,
    mode, targetSem, currentSemLimit, activeSemInput, gradeData, result,
    customSyllabus, showAddModal, newSubject,
    // Setters
    setCollege, setLevel, setBatchData, setDeptData, setEntryType,
    setMtechParentDept, setMode, setTargetSem, setCurrentSemLimit,
    setActiveSemInput, setGradeData, setShowAddModal, setNewSubject,
    // Computed
    isPG, getCurrentBatches, getCurrentDepartments, getSubjects, getGradingSystem, getResultTheme,
    // Handlers
    nextStep, handleManualBack, reset,
    handleCalculate, handleAddSubject, handleDeleteSubject, handleDownload,
    // Animation
    slideVariants, direction, resultRef,
  };
}
