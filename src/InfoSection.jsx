import React from 'react';
import { BookOpen, Calculator, AlertTriangle, Award, CheckCircle2, HelpCircle, ChevronRight, TrendingUp, Lightbulb, Target } from 'lucide-react';
import AdComponent from './AdComponent'; 

export default function InfoSection() {
  return (
    <div className="w-full max-w-[1920px] mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      
      {/* LEFT CONTENT (Rich Educational Content for AdSense) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        
        {/* 1. HERO INTRO: SEO & Context */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-200/60 border border-white">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Official PTU CGPA Calculator
          </h1>
          
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm lg:text-base">
            <p className="mb-4">
              Welcome to the most trusted academic tool for students of <strong>Puducherry Technological University (PTU)</strong>, <strong>Women's Engineering College (WEC)</strong>, and <strong>PKIET Karaikal</strong>. 
            </p>
            <p>
              This platform is engineered to handle the complex credit-weightage logic of both the <strong>R2020 Regulation</strong> and the new <strong>NEP 2024 Framework</strong>. Whether you are a B.Tech undergraduate or pursuing M.Tech/MBA, our algorithms ensure your GPA matches your official grade sheet exactly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={20} />
              <div><h3 className="font-bold text-slate-900 text-sm">100% Accurate Algorithms</h3><p className="text-xs text-slate-500 mt-1">Hard-coded with official syllabus credits.</p></div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={20} />
              <div><h3 className="font-bold text-slate-900 text-sm">Privacy Focused</h3><p className="text-xs text-slate-500 mt-1">No data is stored. Calculations are local.</p></div>
            </div>
          </div>
        </div>

        {/* 2. STRATEGY SECTION (High Value Content for AdSense) */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-200/60 border border-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0"><TrendingUp size={24} /></div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">How to Boost Your CGPA?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-3 mb-3">
                <Target className="text-orange-600" size={20}/>
                <h4 className="font-bold text-slate-800">The "Credit-Weight" Strategy</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Not all subjects are equal. A <strong>4-Credit Subject</strong> (like Maths or Core Engineering) impacts your CGPA <strong>twice as much</strong> as a 2-Credit Lab. 
                <br/><br/>
                <em>Tip:</em> If you have limited study time, prioritize the 4-Credit subjects. Securing an 'S' or 'O' grade there can lift your entire semester average by 0.2 to 0.4 points alone.
              </p>
            </div>

            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="text-blue-600" size={20}/>
                <h4 className="font-bold text-slate-800">The "Internal Marks" Buffer</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                In R2020 and NEP systems, internal assessment constitutes 40% of your grade. Securing 35+/40 in internals means you only need average marks in the final exam to secure an 'A' grade.
                <br/><br/>
                <em>Tip:</em> Never miss assignments or class tests. They are the easiest way to build a "safety buffer" for your final grade.
              </p>
            </div>
          </div>
        </div>

        {/* 3. GRADING REFERENCE */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-200/60 border border-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><Award size={24} /></div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Official Grading Scales</h2>
          </div>

          <div className="space-y-8">
            {/* R2024 (NEP) */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">1</span> 
                R2024 Regulation (NEP)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                <GradeCard grade="O" label="Outstanding" point="10" color="bg-green-50 text-green-700 border-green-100" />
                <GradeCard grade="A+" label="Excellent" point="9" color="bg-emerald-50 text-emerald-700 border-emerald-100" />
                <GradeCard grade="A" label="Very Good" point="8" color="bg-teal-50 text-teal-700 border-teal-100" />
                <GradeCard grade="B+" label="Good" point="7" color="bg-blue-50 text-blue-700 border-blue-100" />
                <GradeCard grade="B" label="Above Avg" point="6" color="bg-indigo-50 text-indigo-700 border-indigo-100" />
                <GradeCard grade="C" label="Average" point="5" color="bg-violet-50 text-violet-700 border-violet-100" />
                <GradeCard grade="P" label="Pass" point="4" color="bg-yellow-50 text-yellow-700 border-yellow-100" />
                <GradeCard grade="F" label="Fail" point="0" color="bg-red-50 text-red-700 border-red-100" />
              </div>
            </div>

            <div className="h-px bg-slate-100"></div>

            {/* R2020 (Old) */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">2</span> 
                R2020 Regulation (Old)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                <GradeCard grade="S" label="Outstanding" point="10" color="bg-green-50 text-green-700 border-green-100" />
                <GradeCard grade="A" label="Excellent" point="9" color="bg-emerald-50 text-emerald-700 border-emerald-100" />
                <GradeCard grade="B" label="Very Good" point="8" color="bg-blue-50 text-blue-700 border-blue-100" />
                <GradeCard grade="C" label="Good" point="7" color="bg-indigo-50 text-indigo-700 border-indigo-100" />
                <GradeCard grade="D" label="Above Avg" point="6" color="bg-purple-50 text-purple-700 border-purple-100" />
                <GradeCard grade="E" label="Pass" point="5" color="bg-yellow-50 text-yellow-700 border-yellow-100" />
                <GradeCard grade="F" label="Fail" point="0" color="bg-red-50 text-red-700 border-red-100" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. FAQ Section */}
        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-200/60 border border-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0"><HelpCircle size={24} /></div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            <FAQItem question="How is SGPA calculated?">
              SGPA (Semester Grade Point Average) is calculated by dividing the sum of credit points (Credit × Grade Point) by the sum of total credits. <br/>Formula: <code>SGPA = Σ(Ci × Gi) / ΣCi</code>
            </FAQItem>
            <FAQItem question="How to convert CGPA to Percentage?">
              According to PTU norms, the formula is: <strong>Percentage = (CGPA - 0.5) × 10</strong>. <br/>Example: If CGPA is 8.0, Percentage = (8.0 - 0.5) * 10 = 75%.
            </FAQItem>
            <FAQItem question="Does a 'W' (Withdrawal) grade affect my CGPA?">
              No. A 'W' grade indicates you withdrew from the course with permission. These credits are <strong>excluded</strong> from the CGPA calculation denominator entirely.
            </FAQItem>
            <FAQItem question="What happens if I fail (F Grade)?">
               An 'F' grade contributes 0 grade points but the credits are still counted in the denominator, drastically lowering your GPA. You must clear it in the next attempt.
            </FAQItem>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-50 rounded-[2rem] p-6 flex gap-4 items-start border border-slate-100 shadow-inner">
          <AlertTriangle size={20} className="text-slate-400 shrink-0 mt-1" />
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> This tool is an unofficial calculator developed for the convenience of PTU students. We strive for 100% accuracy based on official curriculum.
          </p>
        </div>


      </div>

      {/* RIGHT SIDEBAR (ADS - Desktop) */}
      <div className="hidden lg:flex lg:col-span-1 flex-col gap-6 sticky top-6 h-fit">
        <div className="min-h-[300px] rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/60 border border-white bg-white flex items-center justify-center">
           <AdComponent dataAdSlot="1442630094" /> 
        </div>
        <div className="min-h-[300px] rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/60 border border-white bg-white flex items-center justify-center">
           <AdComponent dataAdSlot="1442630094" />
        </div>
      </div>

    </div>
  );
}

// --- HELPER COMPONENTS ---

const GradeCard = ({ grade, label, point, color }) => (
  <div className={`p-2 rounded-xl border text-center ${color}`}>
    <div className="text-xl font-black">{grade}</div>
    <div className="text-[10px] font-bold uppercase mt-1 opacity-80">{label}</div>
    <div className="text-xs font-bold mt-1">{point} Pts</div>
  </div>
);

const FAQItem = ({ question, children }) => (
  <details className="group bg-slate-50 rounded-2xl p-4 open:bg-white open:shadow-md transition-all cursor-pointer border border-transparent open:border-slate-100">
    <summary className="font-bold text-slate-800 list-none flex justify-between items-center text-sm lg:text-base">
      {question}
      <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform"/>
    </summary>
    <p className="text-slate-600 text-sm mt-3 leading-relaxed pl-2 border-l-2 border-purple-200">
      {children}
    </p>
  </details>
);