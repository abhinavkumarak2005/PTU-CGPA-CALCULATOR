import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignupForm from '../components/Auth/SignupForm';
import LoginForm from '../components/Auth/LoginForm';
import OTPVerify from '../components/Auth/OTPVerify';
import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [verificationEmail, setVerificationEmail] = useState(null);

  const slideVariants = {
    initial: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: (direction) => ({ x: direction > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.2 } })
  };

  const [direction, setDirection] = useState(0);

  const switchTab = (tab) => {
    setDirection(tab === 'login' ? -1 : 1);
    setActiveTab(tab);
  };

  const handleSignupSuccess = (email) => {
    setDirection(1);
    setVerificationEmail(email);
  };

  const handleBackToSignup = () => {
    setDirection(-1);
    setVerificationEmail(null);
  };

  return (
    <div className="min-h-[100dvh] bg-brutal-white flex flex-col items-center justify-center p-4 relative overflow-hidden z-0 font-sans selection:bg-brutal-yellow selection:text-brutal-black">
      
      {/* Background Grid Pattern purely via CSS */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-brutal-black font-black uppercase tracking-widest hover:text-brutal-red transition-colors mb-6 border-2 border-transparent hover:border-brutal-black px-2 py-1 bg-white hover:bg-brutal-yellow shadow-brutal-sm"
        >
          <ArrowLeft size={20} strokeWidth={3} /> Back to Home
        </Link>

        <div className="bg-white border-4 md:border-8 border-brutal-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
          
          {/* Tape decorations */}
          <div className="absolute -top-4 -left-4 w-16 h-8 bg-brutal-blue rotate-[-15deg] border-2 border-brutal-black z-20 hidden sm:block" />
          <div className="absolute -bottom-4 -right-4 w-16 h-8 bg-brutal-yellow rotate-[-15deg] border-2 border-brutal-black z-20 hidden sm:block" />

          {!verificationEmail && activeTab !== 'forgot-password' ? (
            <>
              {/* Tabs */}
              <div className="flex border-b-8 border-brutal-black relative bg-brutal-white">
                <button
                  className={`flex-1 py-5 text-lg font-display font-black uppercase tracking-wider transition-colors z-10 border-r-8 border-brutal-black ${activeTab === 'login' ? 'bg-brutal-yellow text-brutal-black' : 'bg-brutal-white text-brutal-black hover:bg-brutal-blue hover:text-white'}`}
                  onClick={() => switchTab('login')}
                >
                  Log In
                </button>
                <button
                  className={`flex-1 py-5 text-lg font-display font-black uppercase tracking-wider transition-colors z-10 ${activeTab === 'signup' ? 'bg-brutal-yellow text-brutal-black' : 'bg-brutal-white text-brutal-black hover:bg-brutal-blue hover:text-white'}`}
                  onClick={() => switchTab('signup')}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Area */}
              <div className="p-6 sm:p-8 overflow-hidden min-h-[400px] relative bg-white flex flex-col justify-center">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    {activeTab === 'login' ? (
                      <LoginForm onForgotPassword={() => setActiveTab('forgot-password')} />
                    ) : (
                      <SignupForm onSuccess={handleSignupSuccess} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : activeTab === 'forgot-password' ? (
            <div className="p-6 sm:p-8 overflow-hidden min-h-[400px] flex items-center bg-white">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key="forgot-password"
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full"
                >
                  <ForgotPasswordForm onBack={() => setActiveTab('login')} />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-6 sm:p-8 overflow-hidden min-h-[400px] flex items-center bg-white">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key="otp"
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full"
                >
                  <OTPVerify email={verificationEmail} onBack={handleBackToSignup} />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
