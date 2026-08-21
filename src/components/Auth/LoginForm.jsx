import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { auth } from '../../services/auth';

export default function LoginForm({ onForgotPassword }) {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    const { error: loginError } = await auth.logIn(formData.identifier, formData.password);

    setLoading(false);

    if (loginError) {
      setError(loginError.message);
    } else {
      window.location.href = '/profile';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-brutal-red text-white p-2 font-bold border-2 border-brutal-black shadow-brutal-sm uppercase tracking-widest text-sm">{error}</div>}

      <div>
        <label className="block text-xs font-display font-black uppercase tracking-widest text-brutal-black mb-1">Email</label>
        <input
          name="identifier" value={formData.identifier} onChange={handleChange}
          type="text" className="w-full p-2.5 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold shadow-brutal-sm text-sm"
          placeholder="example@domain.com"
        />
      </div>

      <div className="relative">
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

      <div className="flex justify-end pt-1">
        <button type="button" onClick={onForgotPassword} className="text-[10px] font-bold uppercase tracking-widest text-brutal-black hover:text-brutal-red underline decoration-2 underline-offset-4">Forgot Password?</button>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full py-3 bg-brutal-blue text-white font-display font-black text-lg uppercase tracking-widest border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-brutal-blue hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 mt-4"
      >
        {loading && <Loader2 size={20} className="animate-spin" />}
        Login &rarr;
      </button>
    </form>
  );
}
