import React from 'react';

export default function ImproveCgpa() {
  return (
    <div className="text-lg leading-relaxed text-slate-800 font-medium">
      <p className="mb-6">
        Securing a high CGPA at PTU doesn't always mean studying 24/7. Often, it's about studying smart and understanding how the grading system mathematically works. Here are the top strategies to boost your grades.
      </p>
      
      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">1. The "Credit-Weight" Hack</h2>
      <p className="mb-6">
        In engineering, not all subjects are created equal. A Core subject like Data Structures or Engineering Mathematics usually carries <strong className="font-black text-black">4 credits</strong>, while a lab might carry <strong className="font-black text-black">1 or 1.5 credits</strong>.
      </p>
      <p className="mb-6 p-6 bg-brutal-yellow border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
        If you get an 'O' (10 points) in a 1.5-credit lab, you earn 15 points. But if you get an 'O' in a 4-credit theory subject, you earn 40 points! <br/><br/>
        <strong className="font-black uppercase text-xl block border-b-4 border-brutal-black pb-2 mb-2">Strategy:</strong> Prioritize your high-credit subjects. Dropping a grade in a 4-credit subject will heavily tank your SGPA, while dropping a grade in a 1-credit subject barely makes a dent.
      </p>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">2. Maximize Your Internals</h2>
      <p className="mb-4">
        Internal marks usually account for 40% of your total grade. If you secure 35+ out of 40 in your internals through assignments, attendance, and mid-terms, you only need an average score in the final 60-mark semester exam to secure an 'A' or 'A+' grade overall.
      </p>
      <p className="mb-6 font-bold text-brutal-red bg-slate-100 p-4 border-4 border-brutal-black">
        Never skip assignments or internal tests. They act as a massive safety net.
      </p>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">3. Don't Ignore the "Easy" Subjects</h2>
      <p className="mb-6">
        Subjects like Environmental Science, Universal Human Values, or Soft Skills are often ignored by students who focus entirely on coding or core engineering. However, these subjects are usually easy to score an 'O' or 'A+' in. Since they still carry 2 or 3 credits, bagging top grades in these subjects is a low-effort way to pull up your overall average.
      </p>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">4. Strategic Electives</h2>
      <p className="mb-6">
        In your later semesters (5th to 8th), you get to choose Professional and Open Electives. Always ask seniors which electives have historically had lenient grading or easier syllabus structures. A tough elective with strict grading can ruin an otherwise perfect semester.
      </p>
    </div>
  );
}
