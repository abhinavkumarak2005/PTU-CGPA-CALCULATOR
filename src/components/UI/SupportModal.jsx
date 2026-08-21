import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

export default function SupportModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the modal this session to avoid annoying them
    const hasSeenModal = sessionStorage.getItem('hasSeenSupportModal');
    if (!hasSeenModal) {
      // Show modal after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenSupportModal', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-brutal-white border-8 border-brutal-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute -top-4 -right-4 w-10 h-10 bg-brutal-yellow border-4 border-brutal-black flex items-center justify-center hover:bg-brutal-red hover:text-white transition-colors z-10"
        >
          <X size={24} strokeWidth={3} />
        </button>
        
        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-brutal-red border-4 border-brutal-black flex items-center justify-center mb-6 transform -rotate-6">
            <Heart size={32} className="text-white fill-current" strokeWidth={3} />
          </div>
          
          <h2 className="font-display font-black text-3xl uppercase tracking-widest mb-4">
            Support The Developer
          </h2>
          
          <p className="font-bold text-lg mb-8 max-w-sm">
            Help keep this site live! Your support pays for domain costs, hosting, and coffee for the developer.
          </p>
          
          <a 
            href="https://buymeacoffee.com/abhinavkumarilango" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full bg-brutal-blue text-white py-4 px-6 border-4 border-brutal-black font-display font-black text-xl uppercase tracking-widest hover:bg-white hover:text-brutal-blue hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3"
          >
            Donate Now <Heart size={20} className="fill-current" />
          </a>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-4 text-sm font-bold uppercase tracking-widest hover:text-brutal-red underline decoration-2 underline-offset-4"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
