import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { auth } from '../../services/auth';

export default function OTPVerify({ email, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const submitOTP = async (token) => {
    if (loading) return; // Prevent double submission
    if (token.length < 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    
    setLoading(true);
    const { error: otpError } = await auth.verifyOTP(email, token);
    setLoading(false);

    if (otpError) {
      setError(otpError.message);
    } else {
      window.location.href = '/dashboard'; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitOTP(otp.join(''));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      if (value !== '') {
        if (index < 5) {
          inputRefs.current[index + 1].focus();
        } else if (index === 5 && newOtp.every(d => d !== '')) {
          submitOTP(newOtp.join(''));
        }
      }
    }
  };

  const handleResend = async () => {
    if (timer === 0) {
      setError('');
      setLoading(true);
      const { error: resendError } = await auth.resendOTP(email);
      setLoading(false);
      if (resendError) {
        setError(resendError.message);
      } else {
        setTimer(60);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display font-black text-3xl uppercase tracking-widest text-brutal-black">Verify your email</h2>
        <p className="text-brutal-black font-bold text-sm mt-3 uppercase tracking-wider">
          Please check your email. We've sent a 6-digit verification code to<br />
          <span className="bg-brutal-yellow border-2 border-brutal-black px-2 inline-block mt-2">{email}</span>
        </p>
      </div>

      {error && <div className="bg-brutal-red text-white p-3 font-bold border-4 border-brutal-black shadow-brutal-sm uppercase tracking-widest text-sm text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-1 sm:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 sm:w-14 sm:h-16 text-center font-display font-black text-xl sm:text-2xl border-2 sm:border-4 border-brutal-black bg-white focus:bg-brutal-yellow focus:outline-none transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
          ))}
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full py-4 bg-brutal-blue text-white font-display font-black text-xl uppercase tracking-widest border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-brutal-blue hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3"
        >
          {loading && <Loader2 size={24} className="animate-spin" />}
          Verify Email &rarr;
        </button>

      </form>

      <div className="text-center space-y-4 pt-4 border-t-4 border-brutal-black">
        <p className="text-sm font-bold uppercase tracking-widest text-brutal-black">
          Didn't receive the code?{' '}
          <button 
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className={`${timer > 0 ? 'text-slate-400' : 'text-brutal-red hover:underline decoration-2 underline-offset-4'}`}
          >
            {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
          </button>
        </p>
        
        <button type="button" onClick={onBack} className="text-sm font-bold uppercase tracking-widest text-brutal-black hover:text-brutal-blue hover:underline decoration-2 underline-offset-4">
          &larr; Back to Sign Up
        </button>
      </div>
    </div>
  );
}
