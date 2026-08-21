import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Marquee from '../components/UI/Marquee';
import Footer from '../components/Footer';
import SupportModal from '../components/UI/SupportModal';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { isLoggedIn, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Force redirect logged-in users to their dashboard
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-brutal-white text-brutal-black font-sans flex flex-col overflow-x-hidden selection:bg-brutal-yellow selection:text-brutal-black relative z-0">

      {/* Global Background Grid Pattern */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <Navbar />
      <SupportModal />

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Banner */}
      <Marquee
        text="SUPPORT THE DEVELOPER - HELP KEEP THIS SITE LIVE"
        href="https://buymeacoffee.com/abhinavkumarilango"
        speed={15}
      />

      {/* Main Landing Area */}
      <section className="w-full flex flex-col p-4 md:p-6 lg:p-8 relative z-10 mx-auto max-w-7xl">
        <div className="w-full border-8 border-brutal-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-brutal-white">

          {/* Blue Hero Box */}
          <div className="w-full bg-[#0014FF] py-12 px-4 flex flex-col items-center justify-center text-center relative overflow-hidden">

            {/* Top Badge */}
            <div className="bg-brutal-black text-brutal-yellow font-bold uppercase tracking-widest px-3 py-2 flex items-center gap-2 mb-8 shadow-brutal-sm text-xs sm:text-sm relative z-10">
              <div className="w-3 h-3 rounded-full border-2 border-brutal-yellow flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-brutal-yellow rounded-full"></div>
              </div>
              UPDATED FOR 2026-2030 BATCH
            </div>

            {/* Main Typography */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-[80px] uppercase leading-none text-white flex flex-col items-center justify-center tracking-tighter w-full max-w-4xl mx-auto space-y-1 relative z-10">
              <span className="w-full text-center">CALCULATE</span>
              <span className="w-full text-center">YOUR</span>
              <span className="bg-brutal-yellow text-brutal-black border-4 sm:border-8 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-1 my-2 transform -rotate-2 w-auto inline-block">
                CGPA
              </span>
              <span className="w-full text-center">INSTANTLY</span>
            </h1>

            {/* CTA Button */}
            <Link
              to="/calculator"
              className="mt-8 sm:mt-12 bg-[#FF003C] text-white border-4 sm:border-8 border-brutal-black px-8 sm:px-10 py-4 font-display font-black text-xl sm:text-2xl uppercase tracking-widest hover:-translate-y-2 hover:translate-x-2 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3 group relative z-10"
            >
              CALCULATE NOW
              <span className="text-xl sm:text-2xl group-hover:translate-x-2 transition-transform">&gt;</span>
            </Link>
          </div>

          {/* Bottom Features Strip */}
          <div className="w-full bg-brutal-white p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 border-t-8 border-brutal-black shrink-0">
            {[
              { text: "PTU & AFFILIATED" },
              { text: "UG & PG SUPPORT" },
              { text: "ACCURATE GRADING" }
            ].map((feature, idx) => (
              <div key={idx} className="flex-1 bg-brutal-yellow border-4 sm:border-8 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 border-brutal-black flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brutal-black rounded-full"></div>
                </div>
                <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm text-brutal-black whitespace-nowrap overflow-hidden text-ellipsis">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
