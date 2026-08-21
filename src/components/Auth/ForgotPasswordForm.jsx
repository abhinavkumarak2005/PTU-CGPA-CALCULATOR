import React, { useState } from 'react';
import { Loader2, ArrowLeft, EyeOff, Eye } from 'lucide-react';
import { auth } from '../../services/auth';

export default function ForgotPasswordForm({ onBack }) {
  const [step, setStep] = useState('request_otp'); // 'request_otp' | 'verify_otp' | 'reset_password'
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Step 1
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setLoading(true);
    setError('');
    const { error: resetError } = await auth.resetPasswordRequest(email);
    setLoading(false);

    if (resetError) {
      setError(resetError.message);
    } else {
      setSuccess(`OTP sent to ${email}`);
      setStep('verify_otp');
    }
  };

  // Step 2
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const token = otp.join('');
    if (token.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');
    const { error: verifyError } = await auth.verifyRecoveryOTP(email, token);
    setLoading(false);

    if (verifyError) {
      setError(verifyError.message);
    } else {
      setSuccess('OTP Verified! You can now reset your password.');
      setStep('reset_password');
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // Step 3
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwords.new.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');
    const { error: updateError } = await auth.updatePassword(passwords.new);
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess('Password updated successfully! Logging you in...');
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <button onClick={onBack} className="text-sm font-bold uppercase tracking-widest text-brutal-black hover:text-brutal-red flex items-center gap-2 mb-4 border-2 border-transparent hover:border-brutal-black px-2 py-1 hover:bg-brutal-yellow transition-colors w-max">
        <ArrowLeft size={16} strokeWidth={3} /> Back to Login
      </button>

      {error && <div className="bg-brutal-red text-white p-3 font-bold border-4 border-brutal-black shadow-brutal-sm uppercase tracking-widest text-sm">{error}</div>}
      {success && <div className="bg-brutal-green text-brutal-black p-3 font-bold border-4 border-brutal-black shadow-brutal-sm uppercase tracking-widest text-sm">{success}</div>}

      {step === 'request_otp' && (
        <form onSubmit={handleRequestOTP} className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-display font-black text-3xl uppercase tracking-widest text-brutal-black">Forgot Password?</h3>
            <p className="font-bold text-sm text-brutal-black uppercase tracking-wider">Enter your registered email address and we'll send you a 6-digit code to reset your password.</p>
          </div>
          <div>
            <label className="block text-sm font-display font-black uppercase tracking-widest text-brutal-black mb-2">Email Address</label>
            <input 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              type="email" className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm" 
              placeholder="student@pec.edu" 
            />
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-brutal-blue text-white font-display font-black text-xl uppercase tracking-widest border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-brutal-blue hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3"
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            Send OTP &rarr;
          </button>
        </form>
      )}

      {step === 'verify_otp' && (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-display font-black text-3xl uppercase tracking-widest text-brutal-black">Verify OTP</h3>
            <p className="font-bold text-sm text-brutal-black uppercase tracking-wider">Enter the 6-digit code sent to <span className="bg-brutal-yellow px-1 border-2 border-brutal-black inline-block">{email}</span></p>
          </div>
          
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 border-4 border-brutal-black bg-white text-center font-display font-black text-2xl focus:bg-brutal-yellow focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            ))}
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-brutal-blue text-white font-display font-black text-xl uppercase tracking-widest border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-brutal-blue hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3"
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            Verify &rarr;
          </button>
        </form>
      )}

      {step === 'reset_password' && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-display font-black text-3xl uppercase tracking-widest text-brutal-black">Set New Password</h3>
            <p className="font-bold text-sm text-brutal-black uppercase tracking-wider">Please enter a new password for your account.</p>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-display font-black uppercase tracking-widest text-brutal-black mb-2">New Password</label>
            <input 
              value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} 
              type={showPassword ? "text" : "password"} className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm pr-12" 
              placeholder="••••••••" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[44px] text-brutal-black hover:text-brutal-red">
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-display font-black uppercase tracking-widest text-brutal-black mb-2">Confirm New Password</label>
            <input 
              value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} 
              type={showPassword ? "text" : "password"} className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm pr-12" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-brutal-yellow text-brutal-black font-display font-black text-xl uppercase tracking-widest border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brutal-black hover:text-white hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 mt-4"
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
