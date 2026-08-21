import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { COLLEGES, PTU_UG_BATCHES, AFFILIATED_BATCHES } from '../../data';
import { auth } from '../../services/auth';

export default function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    registerNumber: '',
    college: 'PTU',
    batch: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const batches = formData.college === 'PTU' ? PTU_UG_BATCHES : AFFILIATED_BATCHES;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.registerNumber || !formData.email || !formData.password || !formData.confirmPassword || !formData.batch) {
      setError('All fields are required.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await auth.signUp(
      formData.fullName,
      formData.registerNumber,
      formData.college,
      formData.batch,
      formData.email,
      formData.password
    );

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else if (data?.session) {
      // If Supabase returns a session immediately (Confirm Email is OFF), bypass OTP screen
      window.location.href = '/profile';
    } else {
      // If no session is returned, they need to verify their email via OTP
      onSuccess(formData.email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="bg-brutal-red text-white p-2 font-bold border-2 border-brutal-black shadow-brutal-sm uppercase tracking-widest text-sm">{error}</div>}

      <div>
        <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">Full Name</label>
        <input
          name="fullName" value={formData.fullName} onChange={handleChange}
          type="text" className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm text-sm"
          placeholder="John Doe"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 min-w-0 flex flex-col justify-end">
          <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">Register Number</label>
          <input
            name="registerNumber" value={formData.registerNumber} onChange={handleChange}
            type="text" className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm text-sm"
            placeholder="e.g. 21TE1234"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-end">
          <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">College</label>
          <select
            name="college" value={formData.college} onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, batch: '' })); }}
            className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm appearance-none text-sm text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {COLLEGES.map(c => (
              <option key={c.id} value={c.id}>{c.id} - {c.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">Batch</label>
        <select
          name="batch" value={formData.batch} onChange={handleChange}
          className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm appearance-none text-sm"
        >
          <option value="">SELECT BATCH</option>
          {batches.map(b => (
            <option key={b.id} value={b.id}>{b.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">Email</label>
        <input
          name="email" value={formData.email} onChange={handleChange}
          type="email" className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm text-sm"
          placeholder="student@pec.edu"
        />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1 flex items-center gap-1">
          <span className="text-sm"></span> Prefer college email
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 min-w-0 relative">
          <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">Password</label>
          <input
            name="password" value={formData.password} onChange={handleChange}
            type={showPassword ? "text" : "password"} className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm pr-10 text-sm"
            placeholder="••••••••"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[30px] text-brutal-black hover:text-brutal-red">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="flex-1 min-w-0 relative">
          <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">Confirm</label>
          <input
            name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"} className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm pr-10 text-sm"
            placeholder="••••••••"
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[30px] text-brutal-black hover:text-brutal-red">
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full py-3 bg-brutal-red text-white font-display font-black text-lg uppercase tracking-widest border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-brutal-red hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 mt-4"
      >
        {loading && <Loader2 size={20} className="animate-spin" />}
        Create Account &rarr;
      </button>
    </form>
  );
}
