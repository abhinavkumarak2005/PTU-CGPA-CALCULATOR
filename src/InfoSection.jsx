import React from 'react';
import { 
  BookOpen, AlertTriangle, Award, CheckCircle2, 
  HelpCircle, ChevronRight, TrendingUp, Target, Lightbulb, 
  ExternalLink, FileText, Link as LinkIcon 
} from 'lucide-react';

const BENTO_LINK = "https://bento.me/abhinavkumarilango";

export default function InfoSection() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 lg:p-0 flex flex-col gap-6 mb-12">
      
      {/* 1. HERO INTRO */}
      <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-slate-200/60 border border-white">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Official PTU CGPA Calculator
        </h1>
        
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm lg:text-base">
          <p className="mb-4">
            Welcome to the trusted academic tool for <strong>Puducherry Technological University (PTU)</strong>, <strong>WEC</strong>, and <strong>PKIET</strong>. 
            This platform handles the complex credit-weightage logic of both the <strong>R2020 Regulation</strong> and the new <strong>NEP 2024 Framework</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={20} />
            <div><h3 className="font-bold text-slate-900 text-sm">100% Accurate</h3><p className="text-xs text-slate-500 mt-1">Hard-coded with official syllabus credits.</p></div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={20} />
            <div><h3 className="font-bold text-slate-900 text-sm">Privacy Focused</h3><p className="text-xs text-slate-500 mt-1">Calculations happen on your device.</p></div>
          </div>
        </div>
      </div>

      {/* 2. STRATEGY SECTION */}
      <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-slate-200/60 border border-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0"><TrendingUp size={24} /></div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">How to Boost Your CGPA?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-3 mb-3">
              <Target className="text-orange-600" size={20}/>
              <h4 className="font-bold text-slate-800">The "Credit-Weight" Hack</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Not all subjects are equal. A <strong>4-Credit Subject</strong> (Maths/Core) impacts your CGPA <strong>twice as much</strong> as a 2-Credit Lab. 
              <br/><br/>
              <em>Strategy:</em> Prioritize high-credit subjects. Scoring an 'S' or 'O' grade there can lift your entire semester average by 0.2 to 0.4 points alone.
            </p>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="text-blue-600" size={20}/>
              <h4 className="font-bold text-slate-800">The "Internal Marks" Buffer</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Internals constitute 40% of your grade. Securing 35+/40 in internals means you only need average marks in the final exam to secure an 'A' grade.
              <br/><br/>
              <em>Strategy:</em> Never miss assignments. They build a safety buffer for your final grade.
            </p>
          </div>
        </div>
      </div>

      {/* 3. GRADING REFERENCE */}
      <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-slate-200/60 border border-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><Award size={24} /></div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Official Grading Scales</h2>
        </div>

        <div className="space-y-8">
          {/* R2024 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">R2024 Regulation (NEP)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              <GradeBox grade="O" label="Outstanding" pts="10" color="green" />
              <GradeBox grade="A+" label="Excellent" pts="9" color="emerald" />
              <GradeBox grade="A" label="Very Good" pts="8" color="teal" />
              <GradeBox grade="B+" label="Good" pts="7" color="blue" />
              <GradeBox grade="B" label="Above Avg" pts="6" color="indigo" />
              <GradeBox grade="C" label="Average" pts="5" color="violet" />
              <GradeBox grade="P" label="Pass" pts="4" color="yellow" />
              <GradeBox grade="F" label="Fail" pts="0" color="red" />
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* R2020 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">R2020 Regulation (Old)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              <GradeBox grade="S" label="Outstanding" pts="10" color="green" />
              <GradeBox grade="A" label="Excellent" pts="9" color="emerald" />
              <GradeBox grade="B" label="Very Good" pts="8" color="blue" />
              <GradeBox grade="C" label="Good" pts="7" color="indigo" />
              <GradeBox grade="D" label="Above Avg" pts="6" color="purple" />
              <GradeBox grade="E" label="Pass" pts="5" color="yellow" />
              <GradeBox grade="F" label="Fail" pts="0" color="red" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. FAQ Section */}
      <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-slate-200/60 border border-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0"><HelpCircle size={24} /></div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          <FAQItem question="How is CGPA calculated in PTU?">
            CGPA is calculated by dividing the sum of the credit points earned in all subjects by the total number of credits registered. You can use our tool to automatically multiply your grades by the official subject credits.
          </FAQItem>
          <FAQItem question="How to convert SGPA or CGPA to Percentage?">
            The official formula used by PTU and most engineering colleges is: <strong>Percentage = (CGPA - 0.5) × 10</strong>. For example, an 8.0 CGPA equals 75%.
          </FAQItem>
          <FAQItem question="What is the difference between R2020 and NEP 2024 grading?">
            R2020 uses the S-F grading scale (S=10, A=9, B=8, C=7, D=6, E=5, F=0). The new NEP 2024 system uses the O-F scale (O=10, A+=9, A=8, B+=7, B=6, C=5, P=4, F=0). Passing marks award fewer points in NEP 2024.
          </FAQItem>
          <FAQItem question="Does 'W' (Withdrawal) affect my CGPA?">
            No. 'W' credits are <strong>excluded</strong> from the denominator. However, 'F' (Fail) and 'Z' (Absent) count as 0 points and ARE included in the denominator, lowering your CGPA.
          </FAQItem>
          <FAQItem question="Can WEC and PKIET students use this calculator?">
            Yes! PTU affiliated colleges like Women's Engineering College (WEC) and PKIET Karaikal follow the exact same syllabus and grading rules. Simply select your college on the first step.
          </FAQItem>
          <FAQItem question="How are Lateral Entry (LE) students calculated?">
            Lateral Entry students join directly in the 3rd semester (2nd year). Their CGPA is calculated from the 3rd semester onwards, completely ignoring 1st year credits.
          </FAQItem>
          <FAQItem question="Does this support M.Tech, MBA, and MCA?">
            Yes, the calculator supports all PTU PG programs. M.Tech uses the MTECH_R2024 regulation, while MBA/MCA use the PG_R2020 regulation.
          </FAQItem>
          <FAQItem question="How to improve CGPA in PTU?">
            Focus heavily on 3-credit and 4-credit core subjects. Securing top grades ('O' or 'S') in these subjects impacts your overall average mathematically much more than securing top grades in 1-credit lab courses.
          </FAQItem>
        </div>
      </div>

      {/* Department Quick Links (SEO) */}
      <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-slate-200/60 border border-white">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Department Specific Calculators</h3>
        <p className="text-sm text-slate-600 mb-6">Quickly access calculations specific to your branch of engineering:</p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 cursor-default hover:bg-slate-200">PTU CSE CGPA</span>
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 cursor-default hover:bg-slate-200">PTU IT CGPA</span>
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 cursor-default hover:bg-slate-200">PTU ECE CGPA</span>
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 cursor-default hover:bg-slate-200">PTU EEE & EIE CGPA</span>
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 cursor-default hover:bg-slate-200">PTU Mechanical CGPA</span>
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-bold border border-slate-200 cursor-default hover:bg-slate-200">PTU Civil CGPA</span>
        </div>
      </div>

      {/* 5. QUICK LINKS (Moved from Sidebar) */}
      <div className="bg-slate-50 rounded-[2rem] p-6 lg:p-10 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <LinkIcon size={20} className="text-slate-400"/> Quick Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/privacy.html" target="_blank" className="flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-bold text-sm text-slate-600 shadow-sm">
            <FileText size={16}/> Privacy Policy
          </a>
          <a href="/terms.html" target="_blank" className="flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-bold text-sm text-slate-600 shadow-sm">
            <FileText size={16}/> Terms of Use
          </a>
          <a href={BENTO_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-bold text-sm text-slate-600 shadow-sm">
            <ExternalLink size={16}/> Contact Dev
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-4 items-start p-4 opacity-70">
        <AlertTriangle size={18} className="text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong>Disclaimer:</strong> Tool not affiliated with PTU. Results are for estimation based on curriculum PDFs.
        </p>
      </div>

    </div>
  );
}

// Helper Components
const GradeBox = ({ grade, label, pts, color }) => {
  const colors = {
    green: "bg-green-50 border-green-100 text-green-700",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
    teal: "bg-teal-50 border-teal-100 text-teal-700",
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
    violet: "bg-violet-50 border-violet-100 text-violet-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-700",
    red: "bg-red-50 border-red-100 text-red-700",
  };
  
  return (
    <div className={`p-3 rounded-xl border text-center ${colors[color] || colors.blue}`}>
      <div className="text-xl font-black">{grade}</div>
      <div className="text-[10px] font-bold uppercase mt-1 opacity-80">{label}</div>
      <div className="text-xs font-bold mt-1">{pts} Pts</div>
    </div>
  );
};

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