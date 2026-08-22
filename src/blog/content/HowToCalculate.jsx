import React from 'react';
import { Link } from 'react-router-dom';

export default function HowToCalculate() {
  return (
    <div className="text-lg leading-relaxed text-slate-800 font-medium">
      <p className="mb-6">
        Calculating your Cumulative Grade Point Average (CGPA) at Puducherry Technological University (PTU) can seem complicated at first, but it follows a standard credit-based formula used by most engineering universities in India.
      </p>
      
      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">1. The Basic Formula</h2>
      <p className="mb-6">
        Your CGPA is determined by the total credit points you've earned divided by the total credits you've registered for. The formula is:
      </p>
      <div className="bg-slate-100 p-6 border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono font-bold text-sm md:text-base overflow-x-auto my-8">
        CGPA = Σ (Course Credit × Grade Points) / Σ (Course Credits)
      </div>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">2. Understanding Grade Points</h2>
      <p className="mb-6">
        Your grade points depend on your batch's regulation. If you are in the <strong className="font-black text-black">NEP 2024</strong> batch (2024-2028 onwards), the grades are O (10), A+ (9), A (8), B+ (7), B (6), C (5), P (4), and F (0).
      </p>
      <p className="mb-6">
        If you are under the <strong className="font-black text-black">R2020</strong> regulation, the grades are S (10), A (9), B (8), C (7), D (6), E (5), and F (0).
      </p>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">3. Example Calculation</h2>
      <p className="mb-4">
        Let's say you have 3 subjects in your first semester:
      </p>
      <ul className="list-disc pl-6 space-y-3 mb-8 marker:text-brutal-red">
        <li><strong className="font-black text-black">Mathematics (4 Credits):</strong> You got an 'A' grade (8 points). Credit points = 4 × 8 = 32.</li>
        <li><strong className="font-black text-black">Physics (3 Credits):</strong> You got a 'B' grade (6 points). Credit points = 3 × 6 = 18.</li>
        <li><strong className="font-black text-black">Physics Lab (1.5 Credits):</strong> You got an 'O' grade (10 points). Credit points = 1.5 × 10 = 15.</li>
      </ul>
      <p className="mb-8 p-6 bg-brutal-yellow border-4 border-brutal-black font-bold">
        Total Credits = 4 + 3 + 1.5 = 8.5 <br/>
        Total Credit Points = 32 + 18 + 15 = 65 <br/>
        <span className="text-xl block mt-2">SGPA = 65 / 8.5 = 7.64</span>
      </p>

      <h2 className="text-2xl font-black uppercase font-display mt-12 mb-6 text-brutal-black border-l-8 border-brutal-yellow pl-4">The Easy Way</h2>
      <p className="mb-6">
        Instead of doing this manually, you can use our official <Link to="/calculator" className="text-brutal-blue font-bold hover:text-brutal-red underline decoration-4 underline-offset-4">PTU CGPA Calculator</Link> to get your exact CGPA instantly without doing any math. It already has all the subjects and credits hardcoded for every department.
      </p>
    </div>
  );
}
