import React from 'react';
import { Link } from 'react-router-dom';

export default function SgpaToPercentage() {
  return (
    <div className="text-lg leading-relaxed text-slate-800 font-medium">
      <p className="mb-6">
        Whether you're applying for off-campus placements, higher studies abroad, or government exams, you'll often be asked for your "Percentage" instead of your CGPA or SGPA. Converting your PTU CGPA to a percentage is straightforward.
      </p>
      
      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">The Official Conversion Formula</h2>
      <p className="mb-6">
        Like most AICTE-approved institutions, Puducherry Technological University uses a standard formula to convert CGPA to percentage:
      </p>
      
      <div className="bg-slate-100 p-6 border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono font-bold text-xl md:text-2xl my-8 text-center bg-brutal-white text-brutal-black">
        Percentage = (CGPA - 0.5) × 10
      </div>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">Examples</h2>
      <ul className="list-disc pl-6 space-y-3 mb-8 marker:text-brutal-red">
        <li>If your CGPA is <strong className="font-black text-black">9.0</strong>: (9.0 - 0.5) × 10 = <strong className="font-black text-black text-xl">85%</strong></li>
        <li>If your CGPA is <strong className="font-black text-black">8.5</strong>: (8.5 - 0.5) × 10 = <strong className="font-black text-black text-xl">80%</strong></li>
        <li>If your CGPA is <strong className="font-black text-black">7.2</strong>: (7.2 - 0.5) × 10 = <strong className="font-black text-black text-xl">67%</strong></li>
        <li>If your CGPA is <strong className="font-black text-black">6.0</strong>: (6.0 - 0.5) × 10 = <strong className="font-black text-black text-xl">55%</strong></li>
      </ul>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">Is it just CGPA × 10?</h2>
      <p className="mb-6 p-6 bg-slate-100 border-4 border-brutal-black font-bold">
        Many students mistakenly assume that an 8.0 CGPA equals 80%. This is incorrect for PTU and most Indian engineering universities. The 0.5 deduction accounts for the grading scale curves. Always use the official (CGPA - 0.5) × 10 formula when filling out formal applications unless the specific company/university states otherwise.
      </p>
      
      <p className="mb-6">
        Don't know your CGPA yet? Use our <Link to="/calculator" className="text-brutal-blue font-bold hover:text-brutal-red underline decoration-4 underline-offset-4">Official Calculator</Link> to find out exactly where you stand.
      </p>
    </div>
  );
}
