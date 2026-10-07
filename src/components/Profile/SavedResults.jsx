import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { toPng } from 'html-to-image';
import { Trash2, Calculator, Plus, Loader2, ArrowRight, X, Download, Eye, Edit2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { resultsApi } from '../../services/results';
import { SYLLABUS, GRADING_SYSTEMS } from '../../data';
import { motion, AnimatePresence } from 'framer-motion';

export default function SavedResults({ userId }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [downloadingItem, setDownloadingItem] = useState(null);
  const [viewingResult, setViewingResult] = useState(null);
  const downloadRef = React.useRef(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, [userId]);

  const loadResults = async () => {
    setLoading(true);
    const { data } = await resultsApi.getResults(userId);
    if (data) setResults(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await resultsApi.deleteResult(id);
    setResults(results.filter(r => r.id !== id));
    setDeletingId(null);
  };

  const triggerDownload = async (item) => {
    setDownloadingItem(item);
    setTimeout(async () => {
      if (!downloadRef.current) return;
      try {
        const watermark = document.getElementById('cgpa-watermark-saved');
        if (watermark) watermark.style.display = 'block';

        const dataUrl = await toPng(downloadRef.current, { 
          backgroundColor: '#FFD500', 
          pixelRatio: 3, 
          style: { margin: '0' }
        });
        
        if (watermark) watermark.style.display = 'none';

        const link = document.createElement('a');
        link.download = `PTU_${item.type}_${item.batch || 'result'}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to capture image", err);
      }
      setDownloadingItem(null);
    }, 150);
  };

  const handleEdit = (res) => {
    // Navigate to calculator and pre-fill data
    navigate('/calculator', { 
      state: { 
        resume: true,
        college: res.college,
        batch: res.batch,
        dept: res.dept,
        entryType: res.entry_type,
        startSem: res.semester,
        targetSemLimit: res.semester,
        initialGrades: res.grade_data
      } 
    });
  };

  const calculateTotalCGPA = () => {
    if (!results || results.length === 0) return 0;
    
    let totalPoints = 0;
    let totalCredits = 0;

    results.forEach(res => {
      const system = GRADING_SYSTEMS[res.regulation || 'R2020'];
      if (!system) return;
      
      const deptId = res.dept || 'CSE';
      const sem = res.semester;
      const gradeData = res.grade_data || {};
      const subjects = gradeData._customSyllabus?.[sem] || SYLLABUS[res.regulation || 'R2020']?.[deptId]?.[sem] || [];
      
      subjects.forEach((sub, idx) => {
        const grade = gradeData[`${sem}_${sub.code}_${idx}`];
        if (grade) {
          const gp = system.points[grade];
          if (gp !== undefined && !system.excludeCredits.includes(grade)) {
            totalPoints += gp * sub.credits;
            totalCredits += sub.credits;
          }
        }
      });
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  const overallCGPA = calculateTotalCGPA();
  const maxSavedSem = results.length > 0 ? Math.max(...results.map(r => r.semester)) : 0;
  const savedSemesters = results.map(r => r.semester).sort((a,b) => a-b);
  const isLateral = results.some(r => r.entry_type === 'lateral');
  const baseSem = isLateral ? 3 : 1;
  
  let firstMissing = null;
  let missingBefore = [];
  if (results.length > 0) {
    for (let i = baseSem; i <= maxSavedSem; i++) {
      if (!savedSemesters.includes(i)) {
        if (!firstMissing) firstMissing = i;
        missingBefore.push(i);
      }
    }
  }

  const suggestedStart = firstMissing ? firstMissing : maxSavedSem + 1;
  const [targetSem, setTargetSem] = useState(suggestedStart);

  useEffect(() => {
    setTargetSem(suggestedStart);
  }, [suggestedStart]);

  const handleResumeCalculation = () => {
    // We base the config off the latest saved result or the one just before the missing one
    let configRes = results.find(r => r.semester === maxSavedSem);
    if (firstMissing) {
      configRes = results.find(r => r.semester === (firstMissing - 1)) || configRes;
    }
    
    let combinedGradeData = {};
    results.forEach(r => {
      combinedGradeData = { ...combinedGradeData, ...(r.grade_data || {}) };
    });

    navigate('/calculator', {
      state: {
        resume: true,
        college: configRes.college,
        batch: configRes.batch,
        regulation: configRes.regulation,
        dept: configRes.dept,
        entryType: configRes.entry_type || 'regular',
        initialGrades: combinedGradeData,
        targetSemLimit: targetSem,
        startSem: suggestedStart
      }
    });
  };

  return (
    <div className="w-full max-w-5xl mt-8">
      {results.length > 0 && !loading && (
        <div className="bg-brutal-blue border-4 border-brutal-black shadow-brutal p-8 mb-12 flex flex-col sm:flex-row items-center justify-between text-white relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-brutal-yellow rotate-45 border-4 border-brutal-black z-0 opacity-20"></div>
          
          <div className="flex flex-col items-center sm:items-start z-10 mb-6 sm:mb-0">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white/80 mb-2">Overall CGPA</h2>
            <div className="text-7xl font-display font-black tracking-tighter leading-none bg-brutal-black px-4 py-2 border-2 border-white">
              {overallCGPA}
            </div>
          </div>
          
          <div className="z-10 w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => triggerDownload({ type: 'CGPA', score: overallCGPA, college: results[0]?.college || 'PTU', dept: results[0]?.dept || 'CSE', batch: results[0]?.batch || '2024', sem: 'Cumulative' })}
              className="w-full sm:w-auto bg-brutal-white text-brutal-black border-4 border-brutal-black shadow-brutal-sm px-6 py-5 font-bold uppercase tracking-widest hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal transition-all flex items-center justify-center gap-3"
              title="Download CGPA Image"
            >
              {downloadingItem?.type === 'CGPA' ? <Loader2 className="animate-spin" size={24} /> : <Download size={24} strokeWidth={3} />}
            </button>
            {maxSavedSem < 8 ? (
              <button 
                onClick={() => setShowPrompt(true)}
                className="w-full sm:w-auto bg-brutal-yellow text-brutal-black border-4 border-brutal-black shadow-brutal-sm px-8 py-5 font-display font-black text-xl lg:text-2xl uppercase tracking-widest hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal transition-all flex items-center justify-center gap-3"
              >
                Calculate Next <ArrowRight strokeWidth={3} />
              </button>
            ) : (
              <div className="bg-brutal-white text-brutal-black px-6 py-3 font-bold uppercase border-4 border-brutal-black">
                All 8 Semesters Saved!
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b-4 border-brutal-black">
        <h2 className="text-2xl sm:text-4xl font-display font-black text-brutal-black uppercase tracking-tighter flex items-center gap-2 sm:gap-4">
          <Calculator className="text-brutal-blue" size={36} strokeWidth={3} /> 
          Saved Semesters
        </h2>
        {results.length > 0 && maxSavedSem === 0 && (
          <Link to="/calculator" className="mt-4 sm:mt-0 font-bold uppercase tracking-widest text-brutal-blue hover:text-brutal-red hover:underline flex items-center gap-2">
            <Plus size={20} strokeWidth={3} /> Calculate New
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12 text-brutal-black">
          <Loader2 size={48} className="animate-spin" strokeWidth={3} />
        </div>
      ) : results.length === 0 ? (
        <div className="bg-brutal-white border-4 border-brutal-black shadow-brutal p-12 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-brutal-yellow border-4 border-brutal-black shadow-brutal-sm flex items-center justify-center mb-6">
            <Calculator size={32} strokeWidth={3} />
          </div>
          <h3 className="font-display font-black text-3xl uppercase mb-3">No saved results yet</h3>
          <p className="font-bold text-lg mb-8 max-w-md mx-auto">Calculate your CGPA and save it here to track your academic progress over time.</p>
          <Link to="/calculator" className="bg-brutal-blue text-white border-4 border-brutal-black shadow-brutal-sm px-8 py-4 font-display font-black text-2xl uppercase tracking-widest hover:-translate-y-2 hover:translate-x-2 transition-transform flex items-center gap-3">
            Calculate CGPA
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {results.map(res => (
            <div key={res.id} className="bg-white border-4 border-brutal-black shadow-brutal p-4 sm:p-6 flex flex-col hover:-translate-y-1 transition-all relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-0">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-brutal-black uppercase tracking-tighter mb-1">Sem {res.semester}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500 bg-slate-100 border-2 border-brutal-black px-2 py-0.5 inline-block">{res.college} • {res.dept}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center my-4 py-6 bg-brutal-white border-4 border-brutal-black text-brutal-black">
                <div className="text-6xl font-display font-black tracking-tighter leading-none">
                  {Number(res.sgpa).toFixed(2)}
                </div>
                <p className="text-sm font-bold uppercase tracking-widest mt-2 border-t-2 border-brutal-black pt-1">SGPA SCORE</p>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row justify-between items-center pt-4 border-t-4 border-dashed border-brutal-black gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 w-full text-center sm:text-left">
                  {new Date(res.calculated_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
                  <button onClick={() => setViewingResult(res)} className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-yellow transition-colors" title="View Subjects">
                    <Eye size={18} strokeWidth={3} />
                  </button>
                  <button onClick={() => handleEdit(res)} className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-blue hover:text-white transition-colors" title="Edit Semester">
                    <Edit2 size={18} strokeWidth={3} />
                  </button>
                  <button onClick={() => triggerDownload({ type: 'SGPA', score: Number(res.sgpa).toFixed(2), college: res.college, dept: res.dept, batch: res.batch || '2024', sem: `Sem ${res.semester}` })} disabled={downloadingItem !== null} className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-[#FFD500] transition-colors" title="Download Image">
                    {downloadingItem?.sem === `Sem ${res.semester}` ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} strokeWidth={3} />}
                  </button>
                  <button onClick={() => handleDelete(res.id)} disabled={deletingId === res.id} className="w-10 h-10 border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-red hover:text-white transition-colors" title="Delete Result">
                    {deletingId === res.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} strokeWidth={3} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Brutalist Prompt Modal */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-brutal-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-brutal-white border-4 border-brutal-black p-6 md:p-8 w-full max-w-md shadow-brutal">
              <div className="flex justify-between items-center mb-8 border-b-4 border-brutal-black pb-4">
                <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-brutal-black">Calculate Next</h3>
                <button onClick={() => setShowPrompt(false)} className="p-1 border-4 border-transparent hover:border-brutal-black hover:bg-brutal-black hover:text-white transition-colors"><X size={24} strokeWidth={3} /></button>
              </div>
              
              <div className="space-y-6">
                {missingBefore.length > 0 && (
                  <div className="bg-brutal-yellow border-4 border-brutal-black p-4 text-center">
                    <p className="font-bold uppercase tracking-widest text-brutal-black mb-1 text-sm">Missing {missingBefore.length > 1 ? 'Semesters' : 'Semester'}</p>
                    <p className="font-black text-lg">
                      {missingBefore.length === 1 
                        ? `Semester ${missingBefore[0]} is missing!` 
                        : `Semesters ${missingBefore.join(', ')} are missing before Semester ${maxSavedSem}.`
                      } We will start from Semester {firstMissing}.
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="text-base font-black text-brutal-black uppercase tracking-widest block mb-4 text-center leading-loose">
                    Calculate <span className="bg-brutal-red text-white px-2 py-1 border-2 border-brutal-black mx-1 inline-block -rotate-2 shadow-brutal-sm">UP TO</span> which semester?
                  </label>
                  <select 
                    className="w-full p-4 bg-brutal-yellow border-4 border-brutal-black font-display font-black text-3xl text-center text-brutal-black focus:bg-brutal-blue focus:text-white outline-none transition-colors appearance-none cursor-pointer"
                    value={targetSem}
                    onChange={(e) => setTargetSem(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 8 - suggestedStart + 1 }).map((_, i) => (
                      <option key={suggestedStart + i} value={suggestedStart + i}>Semester {suggestedStart + i}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={handleResumeCalculation}
                  className="w-full py-5 bg-brutal-blue text-white font-display font-black text-xl uppercase tracking-widest hover:bg-brutal-red transition-colors border-4 border-brutal-black"
                >
                  Proceed <ArrowRight className="inline-block ml-2" size={20} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Subjects Modal */}
      {createPortal(
        <AnimatePresence>
          {viewingResult && (
            <div className="fixed inset-0 bg-brutal-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-brutal-white w-full max-w-2xl border-4 border-brutal-black shadow-brutal flex flex-col max-h-[90vh]"
              >
                <div className="p-4 sm:p-6 border-b-4 border-brutal-black bg-brutal-yellow flex justify-between items-center sticky top-0 z-10 shrink-0">
                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tighter">Sem {viewingResult.semester} Subjects</h3>
                    <p className="font-bold text-xs uppercase tracking-widest mt-1">SGPA: {Number(viewingResult.sgpa).toFixed(2)}</p>
                  </div>
                  <button onClick={() => setViewingResult(null)} className="w-10 h-10 bg-white border-2 border-brutal-black flex items-center justify-center hover:bg-brutal-red hover:text-white transition-colors">
                    <X size={24} strokeWidth={3} />
                  </button>
                </div>
                
                <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-50">
                  <div className="space-y-3">
                    {(() => {
                      const gradeData = viewingResult.grade_data || {};
                      const subjects = gradeData._customSyllabus?.[viewingResult.semester] || SYLLABUS[viewingResult.regulation || 'R2020']?.[viewingResult.dept || 'CSE']?.[viewingResult.semester] || [];
                      const system = GRADING_SYSTEMS[viewingResult.regulation || 'R2020'];
                      
                      const list = subjects.map((sub, idx) => {
                        const grade = gradeData[`${viewingResult.semester}_${sub.code}_${idx}`];
                        if (!grade) return null;
                        return (
                          <div key={idx} className="flex flex-row items-center justify-between p-3 sm:p-4 bg-white border-4 border-brutal-black shadow-brutal-sm gap-2 sm:gap-4">
                            <div className="flex-1 min-w-0 pr-2">
                              <p className="font-bold uppercase tracking-tight text-brutal-black text-xs sm:text-base leading-tight break-words">{sub.name}</p>
                              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{sub.code} • {sub.credits} CR</p>
                            </div>
                            <div className="w-12 sm:w-16 shrink-0 bg-brutal-black text-white py-1.5 sm:py-2 text-center font-black text-lg sm:text-xl border-2 border-brutal-black">
                              {grade}
                            </div>
                          </div>
                        );
                      }).filter(Boolean);
                      
                      if (list.length === 0) {
                        return (
                          <div className="p-8 text-center border-4 border-dashed border-slate-300">
                            <p className="font-bold text-slate-500 uppercase tracking-widest">No subjects found.</p>
                          </div>
                        );
                      }
                      return list;
                    })()}
                  </div>
                </div>
                <div className="p-4 sm:p-6 border-t-4 border-brutal-black bg-white shrink-0">
                  <button 
                    onClick={() => {
                      const res = viewingResult;
                      setViewingResult(null);
                      handleEdit(res);
                    }}
                    className="w-full bg-brutal-blue text-white border-4 border-brutal-black px-4 sm:px-6 py-4 font-bold uppercase tracking-widest hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 size={20} strokeWidth={3} />
                    Edit This Semester
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* HIDDEN RESULT CARD FOR DOWNLOADING */}
      <div style={{ position: 'fixed', left: '-9999px', top: '-9999px' }}>
        {downloadingItem && (
          <div ref={downloadRef} className="p-6 md:p-10 flex justify-center w-[500px]">
            <div className="relative bg-brutal-white border-4 border-brutal-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-12 w-full flex flex-col items-center">
              <div className="absolute -top-3 -left-3 w-12 h-6 bg-brutal-red rotate-[-45deg] border-2 border-brutal-black z-10" />
              <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-brutal-blue rotate-[-45deg] border-2 border-brutal-black z-10" />
              <div className="uppercase font-bold tracking-widest text-slate-500 mb-2 border-b-2 border-brutal-black pb-1 text-center text-sm">
                {downloadingItem.college || 'College'} • {downloadingItem.dept || 'Department'}
              </div>
              <div className="text-7xl font-display font-black text-brutal-black mt-4 mb-8 text-center leading-none">
                {downloadingItem.score}
              </div>
              <div className="bg-brutal-black text-white px-6 py-2 uppercase font-bold tracking-widest border-2 border-transparent text-base mb-2">
                FINAL {downloadingItem.type}
              </div>
              <div className="mt-8 pt-4 border-t-4 border-brutal-black border-dashed w-full flex justify-between text-sm font-bold uppercase">
                <span>Batch: {downloadingItem.batch ? `${downloadingItem.batch}-${(parseInt(downloadingItem.batch) + 4).toString().slice(-2)}` : ''}</span>
                <span>{downloadingItem.sem}</span>
              </div>
              <div id="cgpa-watermark-saved" style={{ display: 'none' }} className="mt-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-60 text-center w-full">
                Calculated with PTU CGPA
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
