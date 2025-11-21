import React from 'react';
import { BookOpen, Calculator, Award, AlertTriangle } from 'lucide-react';

export default function InfoSection() {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN ARTICLE AREA (Left Side) */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Intro Card */}
          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-white">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Understanding PTU's Grading System
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Puducherry Technological University (PTU) has recently updated its academic regulations to align with the National Education Policy (NEP). Whether you are a fresher in the 2024-28 batch or a final-year student, knowing how your Grade Point Average (GPA) is calculated is crucial for academic planning.
            </p>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start">
              <div className="bg-blue-600 text-white p-2 rounded-lg mt-1"><BookOpen size={20} /></div>
              <div>
                <h4 className="font-bold text-blue-900 text-lg">New 2024 Regulations (NEP)</h4>
                <p className="text-blue-800 mt-1 text-sm opacity-80">
                  The new system introduces "Absolute Grading" with letter grades <strong>O, A+, A, B+, B, C</strong>. 
                  Crucially, a grade of <strong>'W' (Withdrawal)</strong> is now excluded from the total credit calculation, protecting your CGPA if you drop a course legitimately.
                </p>
              </div>
            </div>
          </div>

          {/* Grid for Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* SGPA vs CGPA */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">SGPA vs. CGPA</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2.5 shrink-0"></span>
                  <span><strong>SGPA (Semester GPA):</strong> Calculated based on the credits and grades obtained in a <em>single specific semester</em>.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2.5 shrink-0"></span>
                  <span><strong>CGPA (Cumulative GPA):</strong> The weighted average of <em>all semesters</em> completed so far. It is not just an average of your SGPAs; it accounts for the total credit weightage of every subject.</span>
                </li>
              </ul>
            </div>

            {/* Grading Scale */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Grading Scale Differences</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Batches 2024 & 2025</span>
                  <p className="font-medium text-slate-700 mt-1">Uses <strong>O (10), A+ (9), A (8)</strong> scale. F is Fail (0 pts).</p>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Batches 2022 & 2023</span>
                  <p className="font-medium text-slate-700 mt-1">Uses <strong>S (10), A (9), B (8)</strong> scale. Z denotes Absent.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Disclaimer (Mandatory for AdSense) */}
          <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200 flex gap-4 items-start opacity-75">
            <AlertTriangle className="text-slate-500 mt-1 shrink-0" />
            <div className="text-sm text-slate-500 leading-relaxed">
              <strong>Disclaimer:</strong> This tool is an unofficial calculator developed for the convenience of PTU students. 
              While we strive for 100% accuracy based on the latest curriculum PDFs, please refer to your official Grade Sheet issued by the Controller of Examinations for your final legal results. 
              We are not affiliated with Puducherry Technological University.
            </div>
          </div>

        </div>

        {/* SIDEBAR (Ads Only) - Right Side */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Ad Spot 1 (Replaced the Quick Links) */}
          <div className="bg-gray-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] h-[300px] flex flex-col items-center justify-center text-slate-300">
             <span className="text-xs font-bold tracking-widest uppercase mb-2">Advertisement</span>
             <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
          </div>
          
          {/* Ad Spot 2 (Sticky Skyscraper) */}
          <div className="sticky top-8">
             <div className="bg-gray-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] h-[600px] flex flex-col items-center justify-center text-slate-300">
               <span className="text-xs font-bold tracking-widest uppercase mb-2">Advertisement</span>
               <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}