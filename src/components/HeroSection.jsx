import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="w-full min-h-[100dvh] pt-32 pb-24 px-4 flex flex-col items-center justify-center relative bg-brutal-white overflow-hidden z-0">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-8 z-10 relative">
        
        {/* Left Side: Typography */}
        <div className="w-full xl:w-1/2 flex flex-col gap-6 z-20">
          <div className="flex flex-col">
            <div className="inline-block px-4 py-1 bg-brutal-black text-brutal-yellow font-bold uppercase tracking-[0.2em] text-xs border-2 border-brutal-black w-max mb-6">
              CGPA Calculator
            </div>
            <h1 className="font-display font-black text-[40px] sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[85px] leading-[0.9] tracking-tighter uppercase mb-6 relative z-30 pointer-events-none">
              We <br/> Calculate <br/>
              <span className="bg-brutal-red text-white px-2 mt-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Bold</span> <br/> Grades.
            </h1>
            <p className="font-sans text-lg sm:text-xl md:text-2xl font-medium max-w-md border-l-4 border-brutal-black pl-4 bg-white/50 backdrop-blur-sm">
              A brutally simple, high-end tool to calculate your semester and cumulative GPA without the hassle.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 relative z-40">
            <Link to="/calculator" className="w-full sm:w-max bg-brutal-yellow text-brutal-black border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-4 font-display font-black text-xl uppercase tracking-widest hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3">
              Calculate Now &rarr;
            </Link>
          </div>
        </div>

        {/* Right Side: Sample Grade Card */}
        <div className="w-full xl:w-1/2 flex items-center justify-center xl:justify-end relative h-auto md:h-[500px] z-30 hover:z-10 mt-12 xl:mt-0 px-4 xl:translate-x-8 group transition-all duration-300">
          
          <div className="relative w-full max-w-lg bg-white border-4 border-brutal-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 rotate-3 group-hover:rotate-0 sm:group-hover:blur-[2px] transition-all duration-300">
            {/* Tape decorations */}
            <div className="absolute -top-4 -left-4 w-16 h-8 bg-brutal-blue rotate-[-15deg] border-2 border-brutal-black z-10" />
            <div className="absolute -bottom-4 -right-4 w-16 h-8 bg-brutal-yellow rotate-[-15deg] border-2 border-brutal-black z-10" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-4 border-brutal-black pb-4 mb-6 gap-2">
              <h3 className="font-display font-black text-2xl uppercase tracking-widest">Semester 3</h3>
              <span className="bg-brutal-black text-white px-3 py-1 font-bold uppercase text-xs tracking-widest shadow-brutal-sm">B.Tech IT</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b-2 border-dashed border-slate-300 pb-2">
                <span className="font-bold uppercase tracking-widest text-sm">Data Structures</span>
                <span className="bg-green-400 font-black px-3 py-1 border-2 border-brutal-black text-sm">S</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-dashed border-slate-300 pb-2">
                <span className="font-bold uppercase tracking-widest text-sm">Computer Networks</span>
                <span className="bg-brutal-yellow font-black px-3 py-1 border-2 border-brutal-black text-sm">A</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-dashed border-slate-300 pb-2">
                <span className="font-bold uppercase tracking-widest text-sm">Operating Systems</span>
                <span className="bg-blue-400 font-black px-3 py-1 border-2 border-brutal-black text-sm">A</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-brutal-red text-white p-4 border-4 border-brutal-black flex flex-col items-center justify-center shadow-brutal-sm">
                <span className="text-xs font-bold uppercase tracking-widest mb-1 opacity-90">SGPA</span>
                <span className="font-display font-black text-3xl md:text-4xl">8.92</span>
              </div>
              <div className="flex-1 bg-brutal-yellow text-brutal-black p-4 border-4 border-brutal-black flex flex-col items-center justify-center shadow-brutal-sm">
                <span className="text-xs font-bold uppercase tracking-widest mb-1 opacity-90">CGPA</span>
                <span className="font-display font-black text-3xl md:text-4xl">8.75</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
