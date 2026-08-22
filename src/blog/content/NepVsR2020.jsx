import React from 'react';

export default function NepVsR2020() {
  return (
    <div className="text-lg leading-relaxed text-slate-800 font-medium">
      <p className="mb-6">
        In 2024, Puducherry Technological University (PTU) introduced the National Education Policy (NEP) framework for incoming B.Tech and M.Tech batches. This brought significant changes to the grading scale compared to the older R2020 regulation.
      </p>
      
      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">The R2020 Grading System</h2>
      <p className="mb-4">
        For students who joined between 2020 and 2023, the university follows the S-F grading system:
      </p>
      <ul className="list-disc pl-6 space-y-3 mb-8 marker:text-brutal-blue">
        <li><strong className="font-black text-black">S (Outstanding):</strong> 10 points</li>
        <li><strong className="font-black text-black">A (Excellent):</strong> 9 points</li>
        <li><strong className="font-black text-black">B (Very Good):</strong> 8 points</li>
        <li><strong className="font-black text-black">C (Good):</strong> 7 points</li>
        <li><strong className="font-black text-black">D (Above Average):</strong> 6 points</li>
        <li><strong className="font-black text-black">E (Pass):</strong> 5 points</li>
        <li><strong className="font-black text-black">F (Fail):</strong> 0 points</li>
      </ul>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">The NEP 2024 Grading System</h2>
      <p className="mb-4">
        For students joining in 2024 and beyond, the grading scale has been expanded to align with national standards:
      </p>
      <ul className="list-disc pl-6 space-y-3 mb-8 marker:text-brutal-red">
        <li><strong className="font-black text-black">O (Outstanding):</strong> 10 points</li>
        <li><strong className="font-black text-black">A+ (Excellent):</strong> 9 points</li>
        <li><strong className="font-black text-black">A (Very Good):</strong> 8 points</li>
        <li><strong className="font-black text-black">B+ (Good):</strong> 7 points</li>
        <li><strong className="font-black text-black">B (Above Average):</strong> 6 points</li>
        <li><strong className="font-black text-black">C (Average):</strong> 5 points</li>
        <li><strong className="font-black text-black">P (Pass):</strong> 4 points</li>
        <li><strong className="font-black text-black">F (Fail):</strong> 0 points</li>
      </ul>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">Key Differences and Impact on CGPA</h2>
      <p className="mb-6">
        The biggest change is the passing threshold. Under R2020, the lowest passing grade 'E' awarded 5 points. Under NEP 2024, the lowest passing grade 'P' awards only 4 points. This means just passing a subject under the new regulation will result in a lower SGPA than before. 
      </p>
      <p className="mb-6 p-6 bg-brutal-yellow border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black font-bold">
        Additionally, NEP 2024 introduces new credit structures, including mandatory courses like "Universal Human Values" which carry credits and directly impact your CGPA.
      </p>
    </div>
  );
}
