// src/pages/ProfilePage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/Profile/ProfileCard';
import SupportModal from '../components/UI/SupportModal';

export default function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth();

  useEffect(() => {
    // Refresh profile when page mounts to get latest data
    if (user && refreshProfile) {
      refreshProfile();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-[#F8FAFC]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (user && !profile) {
    return (
      <div className="min-h-[100dvh] bg-[#F8FAFC]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Profile Missing</h2>
          <p className="text-slate-500 max-w-md">
            Your account was created, but your profile data is missing. Please contact support or try recreating your account.
          </p>
        </div>
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="min-h-[100dvh] bg-brutal-white text-brutal-black font-sans selection:bg-brutal-yellow relative z-0">
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
      
      <main className="pt-32 pb-20 px-4 flex flex-col items-center relative z-10 w-full">
        <ProfileCard 
          user={user} 
          profile={profile} 
          onProfileUpdate={refreshProfile} 
        />
      </main>
    </div>
  );
}
