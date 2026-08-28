import React from 'react';
import Navbar from '../components/Navbar';
import CalculatorWizard from '../components/Calculator/CalculatorWizard';

export default function CalculatorPage() {
  return (
    <div className="min-h-[100dvh] bg-brutal-white text-brutal-black font-sans flex flex-col selection:bg-brutal-yellow selection:text-brutal-black">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-start pt-24 pb-12 px-4 relative z-0">
        {/* Background Grid Pattern purely via CSS */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none -z-10"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full flex-1 px-0 sm:px-4">
          {/* Fully isolated calculator container filling the page */}
          <div className="w-full mx-auto flex-1 flex flex-col h-full">
            <CalculatorWizard />
          </div>
        </div>
      </main>
    </div>
  );
}
