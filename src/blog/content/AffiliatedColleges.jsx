import React from 'react';

export default function AffiliatedColleges() {
  return (
    <div className="text-lg leading-relaxed text-slate-800 font-medium">
      <p className="mb-6">
        Puducherry Technological University (formerly PEC) is the affiliating university for several engineering colleges in the Union Territory, most notably <strong className="font-black text-black">Women's Engineering College (WEC)</strong> and <strong className="font-black text-black">Perunthalaivar Kamarajar Institute of Engineering and Technology (PKIET)</strong> in Karaikal.
      </p>
      
      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">Do Affiliated Colleges Follow the Same Syllabus?</h2>
      <p className="mb-6 p-6 bg-slate-100 border-4 border-brutal-black font-bold">
        Yes. If you are a B.Tech student at WEC or PKIET, your academic regulations, syllabus, and grading system are strictly dictated by PTU. You take the same semester examinations as PTU students (though the question papers might differ occasionally depending on the regulation), and your final degree is awarded by PTU.
      </p>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">The R2020 and NEP 2024 Regulations</h2>
      <p className="mb-6">
        Just like the main campus, affiliated colleges have transitioned to the <strong className="font-black text-black">NEP 2024</strong> framework for batches starting from 2024. Older batches (2020 to 2023) will continue to graduate under the <strong className="font-black text-black">R2020</strong> regulation.
      </p>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">How to Calculate Your CGPA</h2>
      <p className="mb-4">
        Since the credit weightages and grading scales are identical, students from WEC and PKIET can use our official PTU CGPA Calculator without any issues. Simply select your respective college (WEC or PKIET) during Step 1 of the calculator to load your specific departments.
      </p>
      
      <ul className="list-disc pl-6 space-y-3 mb-8 marker:text-brutal-blue">
        <li><strong className="font-black text-black">WEC Departments:</strong> CSE, ECE, ISE, EEE, Architectural Assistantship.</li>
        <li><strong className="font-black text-black">PKIET Departments:</strong> CSE, ECE, IT, Petrochemical, Biomedical, Agriculture.</li>
      </ul>
      
      <p className="mb-6 bg-brutal-yellow p-6 border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-black">
        By selecting your specific college, the calculator ensures that only your relevant departments and subjects are loaded, preventing any confusion with PTU-exclusive courses.
      </p>
    </div>
  );
}
