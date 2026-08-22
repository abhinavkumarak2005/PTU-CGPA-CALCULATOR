import React, { Suspense, lazy } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { articles } from '../blog/articles';

// Lazy load article components
const HowToCalculate = lazy(() => import('../blog/content/HowToCalculate'));
const NepVsR2020 = lazy(() => import('../blog/content/NepVsR2020'));
const SgpaToPercentage = lazy(() => import('../blog/content/SgpaToPercentage'));
const ImproveCgpa = lazy(() => import('../blog/content/ImproveCgpa'));
const AffiliatedColleges = lazy(() => import('../blog/content/AffiliatedColleges'));

const componentMap = {
  HowToCalculate,
  NepVsR2020,
  SgpaToPercentage,
  ImproveCgpa,
  AffiliatedColleges
};

export default function BlogPage() {
  const { slug } = useParams();
  
  const article = articles.find(a => a.slug === slug);
  if (!article) return <Navigate to="/blog" replace />;
  
  const Component = componentMap[article.component];

  return (
    <div className="min-h-screen bg-brutal-white font-sans pt-40 pb-12 px-4 selection:bg-brutal-yellow selection:text-brutal-black relative z-0">
      <Helmet>
        <title>{article.title} - PTU CGPA</title>
        <meta name="description" content={article.description} />
      </Helmet>

      {/* Global Background Grid Pattern */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <Navbar />
      
      <div className="max-w-5xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-brutal-black font-black uppercase tracking-widest hover:text-brutal-red transition-colors mb-6 border-2 border-transparent hover:border-brutal-black px-2 py-1 bg-white hover:bg-brutal-yellow shadow-brutal-sm"
        >
          <ArrowLeft size={20} strokeWidth={3} /> Back to Blog
        </Link>
        
        <div className="bg-white border-4 sm:border-8 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-12 overflow-x-hidden">
          <header className="mb-8 sm:mb-10">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest mb-4 opacity-60">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-5xl font-black leading-tight border-b-4 sm:border-b-8 border-brutal-black pb-4 sm:pb-6 break-words">
              {article.title}
            </h1>
          </header>
          
          <Suspense fallback={<div className="font-bold text-xl uppercase animate-pulse">Loading article...</div>}>
            <Component />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
