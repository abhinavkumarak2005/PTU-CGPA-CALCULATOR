// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col items-center justify-center gap-2">
        <p className="text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} All Rights Reserved by Abhinavkumar Ilango
        </p>
        <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <a href="/privacy.html" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="/terms.html" className="hover:text-blue-500 transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
