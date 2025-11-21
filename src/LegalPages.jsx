import React from 'react';
import { X, Mail, ExternalLink } from 'lucide-react';

const PageLayout = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div className="bg-white w-full max-w-3xl min-h-[50vh] max-h-[90vh] rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col relative">
      
      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X size={24} className="text-slate-500" />
        </button>
      </div>

      {/* Content (Scrollable) */}
      <div className="p-8 lg:p-12 overflow-y-auto custom-scrollbar text-slate-600 space-y-6 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = ({ onClose }) => (
  <PageLayout title="Privacy Policy" onClose={onClose}>
    <p><strong>Last Updated: November 2025</strong></p>
    
    <h3 className="text-lg font-bold text-slate-900">1. Introduction</h3>
    <p>Welcome to PTU CGPA Calculator ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This policy explains how we handle your data when you visit our website.</p>

    <h3 className="text-lg font-bold text-slate-900">2. Data We Collect</h3>
    <p>We prioritize your privacy. We <strong>do not</strong> collect, store, or transmit any personal academic data (such as your grades, subject choices, or calculated CGPA) to any server. All calculations happen locally within your browser using JavaScript.</p>

    <h3 className="text-lg font-bold text-slate-900">3. Cookies and Third-Party Services</h3>
    <p>We use third-party vendors, including Google, to serve ads on our website:</p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Google AdSense:</strong> Google uses cookies (such as the DoubleClick cookie) to serve ads based on your prior visits to our website or other websites on the internet.</li>
      <li>You may opt-out of the use of the DoubleClick cookie for interest-based advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">Google Ad Settings</a>.</li>
    </ul>

    <h3 className="text-lg font-bold text-slate-900">4. Local Storage</h3>
    <p>Our website may use your browser's "Local Storage" to temporarily remember your batch or department selection for a better user experience. You can clear this at any time by clearing your browser cache.</p>
  </PageLayout>
);

export const TermsOfUse = ({ onClose }) => (
  <PageLayout title="Terms of Use" onClose={onClose}>
    <h3 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h3>
    <p>By accessing and using the PTU CGPA Calculator, you accept and agree to be bound by the terms and provision of this agreement.</p>

    <h3 className="text-lg font-bold text-slate-900">2. Disclaimer of Accuracy</h3>
    <p>This tool is an <strong>unofficial</strong> resource developed for the convenience of Puducherry Technological University (PTU) students. While we strive to keep the syllabus and credit points updated according to the latest PTU regulations (NEP 2024 and R2020), we cannot guarantee 100% accuracy due to potential curriculum changes.</p>
    <p className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-800 font-medium">
      Always verify your final results with the official Grade Sheet issued by the Controller of Examinations, PTU. We are not liable for any discrepancies or academic decisions made based on this tool.
    </p>

    <h3 className="text-lg font-bold text-slate-900">3. Intellectual Property</h3>
    <p>The code, design, and logic of this calculator are the intellectual property of the developer. The syllabus data is public information belonging to the University.</p>
  </PageLayout>
);

export const ContactDeveloper = ({ onClose }) => (
  <PageLayout title="Contact Developer" onClose={onClose}>
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
        <Mail size={32} className="text-slate-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-slate-900">Have feedback or found a bug?</h3>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          If you noticed a missing subject, incorrect credit point, or have a feature request, please reach out.
        </p>
      </div>

      <a 
        href="https://bento.me/abhinavkumarilango" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 hover:-translate-y-1"
      >
        Visit Developer Profile <ExternalLink size={18} />
      </a>
      
      <p className="text-xs text-slate-400">
        You will be redirected to Bento.me
      </p>
    </div>
  </PageLayout>
);