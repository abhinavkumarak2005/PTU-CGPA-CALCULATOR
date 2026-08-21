import React, { useState } from 'react';
import { User, Mail, GraduationCap, Building2, Check, Loader2, Save, X, Eye, EyeOff, Lock } from 'lucide-react';
import { auth } from '../../services/auth';

export default function ProfileCard({ user, profile, onProfileUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    college: profile?.college || '',
    batch: profile?.batch || ''
  });

  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await auth.updateProfile(user.id, formData);
    setLoading(false);
    if (!error) {
      setIsEditing(false);
      if (onProfileUpdate) onProfileUpdate();
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (passwords.new.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await auth.updatePassword(passwords.new);
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess('Password updated successfully!');
      setTimeout(() => {
        setIsResettingPassword(false);
        setPasswords({ new: '', confirm: '' });
        setSuccess('');
      }, 2000);
    }
  };

  if (!profile) return null;

  return (
    <div className="bg-brutal-white w-full max-w-3xl border-4 border-brutal-black shadow-brutal p-8 relative mt-8">
      {/* Decorative Tapes */}
      <div className="absolute -top-4 -left-4 w-16 h-8 bg-brutal-red rotate-[-15deg] border-2 border-brutal-black z-10" />
      <div className="absolute -bottom-4 -right-4 w-16 h-8 bg-brutal-blue rotate-[-15deg] border-2 border-brutal-black z-10" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 border-b-4 border-brutal-black pb-6 border-dashed">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-brutal-yellow border-4 border-brutal-black flex items-center justify-center shadow-brutal-sm">
            <User size={40} className="text-brutal-black" strokeWidth={3} />
          </div>
          <div>
            <h1 className="font-display font-black text-4xl uppercase tracking-tighter mb-1">{profile.name}</h1>
            <p className="font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 border-2 border-brutal-black inline-block">
              {profile.register_no}
            </p>
          </div>
        </div>
        {!isEditing && !isResettingPassword && (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-brutal-black text-white px-6 py-3 font-display font-black uppercase tracking-widest hover:bg-brutal-red transition-colors border-2 border-brutal-black shadow-brutal-sm hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal"
            >
              Edit Profile
            </button>
            <button 
              onClick={() => setIsResettingPassword(true)}
              className="bg-white text-brutal-black px-6 py-3 font-display font-black uppercase tracking-widest hover:bg-brutal-yellow transition-colors border-2 border-brutal-black shadow-brutal-sm hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-brutal-white p-6 border-4 border-brutal-black shadow-brutal-sm">
          <div>
            <label className="block font-display font-black uppercase mb-2">Full Name</label>
            <input 
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              type="text" className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold" 
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block font-display font-black uppercase mb-2">College</label>
              <select 
                value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})}
                className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold appearance-none cursor-pointer"
              >
                <option value="PTU">PTU</option>
                <option value="WEC">WEC</option>
                <option value="PKIET">PKIET</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-display font-black uppercase mb-2">Batch</label>
              <input 
                value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})}
                type="text" className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold" 
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button 
              type="submit" disabled={loading}
              className="flex-1 py-4 bg-brutal-blue text-white font-display font-black uppercase tracking-widest border-4 border-brutal-black hover:bg-white hover:text-brutal-blue transition-colors flex items-center justify-center gap-2 shadow-brutal-sm hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} strokeWidth={3} />}
              Save Changes
            </button>
            <button 
              type="button" onClick={() => setIsEditing(false)}
              className="px-6 py-4 bg-white text-brutal-black font-display font-black uppercase tracking-widest border-4 border-brutal-black hover:bg-brutal-red hover:text-white transition-colors shadow-brutal-sm hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>
        </form>
      ) : isResettingPassword ? (
        <form onSubmit={handleResetPassword} className="space-y-6 max-w-xl mx-auto bg-brutal-white p-6 border-4 border-brutal-black shadow-brutal-sm">
          <div className="flex items-center gap-3 mb-6 border-b-4 border-brutal-black pb-4">
            <Lock size={28} strokeWidth={3} className="text-brutal-red" />
            <h2 className="font-display font-black text-2xl uppercase tracking-tighter">Reset Password</h2>
          </div>

          {error && <div className="bg-red-100 text-red-600 p-3 font-bold border-2 border-brutal-black">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 font-bold border-2 border-brutal-black">{success}</div>}

          <div className="space-y-4">
            <div className="relative">
              <label className="block font-display font-black uppercase mb-2">New Password</label>
              <input 
                value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                type={showPassword ? "text" : "password"} 
                className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold pr-12" 
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[44px] text-brutal-black hover:text-brutal-red">
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            
            <div className="relative">
              <label className="block font-display font-black uppercase mb-2">Confirm New Password</label>
              <input 
                value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                type={showPassword ? "text" : "password"} 
                className="w-full p-4 border-4 border-brutal-black bg-white focus:outline-none focus:bg-brutal-yellow transition-colors font-bold pr-12" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" disabled={loading}
              className="flex-1 py-4 bg-brutal-blue text-white font-display font-black uppercase tracking-widest border-4 border-brutal-black hover:bg-white hover:text-brutal-blue transition-colors flex items-center justify-center gap-2 shadow-brutal-sm hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} strokeWidth={3} />}
              Update Password
            </button>
            <button 
              type="button" onClick={() => { setIsResettingPassword(false); setError(''); setSuccess(''); }}
              className="px-6 py-4 bg-white text-brutal-black font-display font-black uppercase tracking-widest border-4 border-brutal-black hover:bg-brutal-red hover:text-white transition-colors shadow-brutal-sm hover:-translate-y-1 hover:translate-x-1 hover:shadow-brutal"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-5 bg-white border-4 border-brutal-black shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all">
            <Mail className="text-brutal-blue" size={28} strokeWidth={3} />
            <div className="overflow-hidden">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Email</p>
              <p className="text-sm font-bold truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-white border-4 border-brutal-black shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all">
            <Building2 className="text-brutal-red" size={28} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">College</p>
              <p className="font-display font-black text-xl uppercase">{profile.college}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-white border-4 border-brutal-black shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all">
            <GraduationCap className="text-brutal-yellow" size={28} strokeWidth={3} />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Batch</p>
              <p className="font-display font-black text-xl">{profile.batch}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
