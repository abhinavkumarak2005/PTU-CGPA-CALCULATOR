// src/components/Calculator/StepResult.jsx — Step 9 (Result view)
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, RotateCcw, Share2, Save, Loader2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { resultsApi } from '../../services/results';

export default function StepResult({
  result,
  reset,
  college,
  level,
  batchData,
  deptData,
  mode,
  targetSem,
  currentSemLimit,
  gradeData
}) {
  const resultRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const { isLoggedIn, user, profile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isCGPA = mode === 'cumulative';
  const label = isCGPA ? 'CGPA' : 'SGPA';

  const downloadImage = async () => {
    if (!resultRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(resultRef.current, { backgroundColor: '#FFD700' });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `PTU_${label}_${batch}_${dept}.png`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error("Failed to capture image", err);
    }
    setDownloading(false);
  };

  const handleSaveResult = async () => {
    if (!isLoggedIn || !user) return;
    setSaving(true);
    
    const payload = {
      college: college?.id || 'PTU',
      batch: batchData?.id || '2024',
      regulation: batchData?.regulation || 'R2020',
      dept: deptData?.id || 'CSE',
      entryType: 'regular',
      semester: parseInt(targetSem || currentSemLimit || 1, 10),
      sgpa: parseFloat(result.score),
      gradeData: gradeData
    };

    const { error } = await resultsApi.saveResult(user.id, payload);
    setSaving(false);
    if (!error) {
      setSaved(true);
    }
  };

  return (
    <motion.div
      variants={{
        enter: { scale: 0.9, opacity: 0 },
        center: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 }
      }}
      initial="enter"
      animate="center"
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 overflow-y-auto custom-scrollbar py-8"
    >
      {/* Save Prompt for Guests */}
      {!isLoggedIn && (
        <div className="absolute top-[-40px] w-full max-w-sm bg-brutal-blue text-white px-4 py-2 border-2 border-brutal-black text-center text-sm font-bold shadow-brutal-sm">
          Want to save this? <Link to="/auth" className="underline hover:text-brutal-yellow">Log in</Link>
        </div>
      )}

      <div 
        ref={resultRef}
        className="relative bg-brutal-white border-4 border-brutal-black shadow-brutal p-8 md:p-12 max-w-md w-full flex flex-col items-center"
      >
        {/* Aesthetic Corner Tapes */}
        <div className="absolute -top-3 -left-3 w-12 h-6 bg-brutal-red rotate-[-45deg] border-2 border-brutal-black z-10" />
        <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-brutal-blue rotate-[-45deg] border-2 border-brutal-black z-10" />

        <div className="uppercase font-bold tracking-widest text-slate-500 mb-2 border-b-2 border-brutal-black pb-1">
          {college?.id || 'College'} • {deptData?.name || 'Department'}
        </div>
        
        <div className="text-8xl md:text-9xl font-display font-black text-brutal-black tracking-tighter my-4">
          {result.score}
        </div>
        
        <div className="bg-brutal-black text-white px-6 py-2 uppercase font-bold tracking-widest border-2 border-transparent">
          FINAL {label}
        </div>

        <div className="mt-8 pt-4 border-t-4 border-brutal-black border-dashed w-full flex justify-between text-sm font-bold uppercase">
          <span>Batch: {batchData?.id || ''}</span>
          <span>{isCGPA ? 'Cumulative' : `Sem ${targetSem || currentSemLimit}`}</span>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-md gap-3">
        <div className="flex gap-3 w-full">
          <button 
            onClick={downloadImage}
            disabled={downloading}
            className="flex-1 bg-brutal-yellow border-2 border-brutal-black shadow-brutal-sm px-6 py-4 font-bold uppercase hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center justify-center gap-2"
          >
            {downloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} strokeWidth={3} />}
            <span>Download</span>
          </button>
          
          <button 
            className="bg-brutal-white border-2 border-brutal-black shadow-brutal-sm px-6 py-4 font-bold uppercase hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center justify-center"
          >
            <Share2 size={20} strokeWidth={3} />
          </button>
        </div>

        {isLoggedIn && (
          <button 
            onClick={handleSaveResult}
            disabled={saving || saved}
            className={`w-full border-2 border-brutal-black shadow-brutal-sm px-6 py-4 font-bold uppercase transition-all flex items-center justify-center gap-2 ${saved ? 'bg-green-400 text-black' : 'bg-brutal-blue text-white hover:-translate-y-1 hover:shadow-brutal'}`}
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : saved ? <Check size={20} strokeWidth={3} /> : <Save size={20} strokeWidth={3} />}
            <span>{saved ? 'Saved to Profile' : 'Save to Profile'}</span>
          </button>
        )}

        <button 
          onClick={reset}
          className="w-full bg-brutal-red text-white border-2 border-brutal-black shadow-brutal-sm px-6 py-4 font-bold uppercase hover:-translate-y-1 hover:shadow-brutal transition-all flex items-center justify-center gap-2 mt-2"
        >
          <RotateCcw size={20} strokeWidth={3} />
          <span>Calculate Another</span>
        </button>
      </div>
    </motion.div>
  );
}
