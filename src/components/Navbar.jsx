// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, User, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CreditsModal from './UI/CreditsModal';
import { auth } from '../services/auth';

export default function Navbar() {
  const { isLoggedIn, profile } = useAuth();
  const [showCredits, setShowCredits] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-center fixed top-6 z-[60] px-4 pointer-events-none">
        <div className="w-full max-w-6xl bg-brutal-white border-4 border-brutal-black shadow-brutal pointer-events-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-3 outline-none group hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 bg-brutal-red border-2 border-brutal-black flex items-center justify-center text-white">
              <GraduationCap size={24} strokeWidth={3} />
            </div>
            <span className="font-display font-black text-xl tracking-tighter uppercase">PTU CGPA*</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/blog"
              className="font-bold uppercase tracking-wider text-sm hover:bg-brutal-yellow px-4 py-2 border-2 border-transparent hover:border-brutal-black transition-all"
            >
              Blog
            </a>
            <button
              onClick={() => setShowCredits(true)}
              className="font-bold uppercase tracking-wider text-sm hover:bg-brutal-yellow px-4 py-2 border-2 border-transparent hover:border-brutal-black transition-all"
            >
              Credits
            </button>
            <a 
              href="https://buymeacoffee.com/abhinavkumarilango" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:-translate-y-1 hover:shadow-brutal-sm transition-all"
            >
              <img 
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                alt="Buy Me A Coffee" 
                className="h-9 border-2 border-brutal-black object-contain bg-brutal-yellow" 
              />
            </a>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/calculator"
                  className="font-bold uppercase tracking-wider text-sm hover:bg-brutal-yellow px-4 py-2 border-2 border-transparent hover:border-brutal-black transition-all"
                >
                  Calci
                </Link>
                <Link
                  to="/profile"
                  className="font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-brutal-yellow px-4 py-2 border-2 border-transparent hover:border-brutal-black transition-all"
                >
                  <User size={18} strokeWidth={3} />
                  <span>{profile?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={async () => await auth.logOut()}
                  className="font-bold uppercase tracking-wider text-sm bg-brutal-black text-white px-4 py-2 border-2 border-brutal-black hover:bg-brutal-red hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="font-bold uppercase tracking-wider text-sm bg-brutal-yellow border-2 border-brutal-black px-6 py-2 flex items-center gap-2 shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95"
              >
                <LogIn size={18} strokeWidth={3} /> LOGIN
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-brutal-black bg-brutal-yellow relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-brutal-blue z-[55] flex flex-col items-center justify-center gap-8 border-x-4 border-brutal-black">
          <Link to="/" onClick={() => setMenuOpen(false)} className="font-display font-black text-5xl text-white hover:text-brutal-yellow transition-colors uppercase">Home</Link>
          <button onClick={() => { setShowCredits(true); setMenuOpen(false); }} className="font-display font-black text-5xl text-white hover:text-brutal-yellow transition-colors uppercase">Credits</button>
          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="font-display font-black text-5xl text-white hover:text-brutal-yellow transition-colors uppercase">Profile</Link>
              <button onClick={async () => { await auth.logOut(); setMenuOpen(false); }} className="font-display font-black text-5xl text-white hover:text-brutal-yellow transition-colors uppercase">Logout</button>
            </>
          ) : (
             <Link to="/auth" onClick={() => setMenuOpen(false)} className="font-display font-black text-5xl text-white hover:text-brutal-yellow transition-colors uppercase">Login</Link>
          )}
        </div>
      )}
      
      <CreditsModal isOpen={showCredits} onClose={() => setShowCredits(false)} />
    </>
  );
}
