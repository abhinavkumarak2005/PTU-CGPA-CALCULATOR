// src/pages/BlogPage.jsx
// Placeholder — full blog renderer built in Phase 5b
// Renders the correct article based on :slug URL param

import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogPage() {
  const { slug } = useParams();
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Blog Article</h1>
        <p className="text-slate-400 text-sm mb-2">
          Slug: <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">{slug}</code>
        </p>
        <p className="text-slate-400 text-sm mb-6">Blog articles coming in Phase 5</p>
        <Link to="/" className="text-blue-600 font-bold text-sm hover:underline">
          ← Back to Calculator
        </Link>
      </div>
    </div>
  );
}
