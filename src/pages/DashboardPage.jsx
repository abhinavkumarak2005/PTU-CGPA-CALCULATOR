import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import SavedResults from '../components/Profile/SavedResults';
import SupportModal from '../components/UI/SupportModal';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();

  if (loading || !user || !profile) {
    return (
      <div className="min-h-[100dvh] bg-brutal-white text-brutal-black font-sans selection:bg-brutal-yellow">
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-brutal-white text-brutal-black font-sans selection:bg-brutal-yellow relative z-0 flex flex-col">
      <Navbar />
      <SupportModal />

      {/* Background Grid Pattern purely via CSS */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <main className="flex-1 pt-32 pb-20 px-4 w-full max-w-5xl mx-auto flex flex-col items-center gap-12 relative z-10">

        {/* Welcome & CTA Section - Big Box */}
        <div className="w-full bg-brutal-blue text-white border-4 border-brutal-black p-8 md:p-12 shadow-brutal relative overflow-hidden flex flex-col gap-6 md:gap-8">
          {/* Aesthetic brutalist shapes */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brutal-red border-4 border-brutal-black rotate-12 z-0" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brutal-yellow border-4 border-brutal-black -rotate-12 z-0" />
          
          {/* Row 1: Full width Welcome message */}
          <div className="relative z-10 w-full text-center md:text-left min-w-0">
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter" title={`Welcome back, ${profile.name}!`}>
              <span className="sm:hidden">Welcome Back!</span>
              <span className="hidden sm:inline">Welcome back, {profile.name}!</span>
            </h1>
          </div>
          
          {/* Row 2: Subtext on left, Button on right */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 w-full text-center md:text-left">
            <p className="text-xl md:text-2xl font-bold font-sans flex-1">
              Track your academic progress and calculate new <span className="text-brutal-red uppercase font-black tracking-widest bg-white border-2 border-brutal-black px-2 py-0.5 inline-block -skew-x-6 relative z-10">semesters</span> instantly.
            </p>
            
            <Link 
              to="/calculator"
              className="w-full md:w-auto bg-brutal-yellow text-brutal-black border-4 border-brutal-black shadow-brutal-sm px-4 sm:px-8 py-5 font-display font-black text-lg sm:text-xl lg:text-2xl uppercase tracking-widest hover:-translate-y-2 hover:translate-x-2 hover:shadow-brutal transition-all flex items-center justify-center gap-2 sm:gap-3 whitespace-normal md:whitespace-nowrap flex-shrink-0 relative z-10"
            >
              <Calculator size={24} className="sm:w-7 sm:h-7" strokeWidth={3} />
              Calculate Now
              <ArrowRight size={24} className="sm:w-7 sm:h-7" strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* Saved Results Grid */}
        <div className="w-full">
          <SavedResults userId={user.id} />
        </div>

      </main>
    </div>
  );
}
