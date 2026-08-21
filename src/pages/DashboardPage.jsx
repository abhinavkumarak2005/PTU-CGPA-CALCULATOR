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
      <div className="min-h-screen bg-brutal-white text-brutal-black font-sans selection:bg-brutal-yellow">
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-white text-brutal-black font-sans selection:bg-brutal-yellow relative z-0 flex flex-col">
      <Navbar />
      
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
        <div className="w-full bg-brutal-blue text-white border-4 border-brutal-black p-8 md:p-12 shadow-brutal flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Aesthetic brutalist shapes */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brutal-red border-4 border-brutal-black rotate-12 z-0" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brutal-yellow border-4 border-brutal-black -rotate-12 z-0" />
          
          <div className="relative z-10 text-center md:text-left flex-1">
            <h1 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
              Welcome back, {profile.name.split(' ')[0]}!
            </h1>
            <p className="text-xl font-bold font-sans">
              Track your academic progress and calculate new semesters instantly.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto flex-shrink-0">
            <Link 
              to="/calculator"
              className="w-full md:w-auto bg-brutal-yellow text-brutal-black border-4 border-brutal-black shadow-brutal-sm px-8 py-5 font-display font-black text-2xl uppercase tracking-widest hover:-translate-y-2 hover:translate-x-2 hover:shadow-brutal transition-all flex items-center justify-center gap-3 whitespace-nowrap"
            >
              <Calculator size={28} strokeWidth={3} />
              Calculate Now
              <ArrowRight size={28} strokeWidth={3} />
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
