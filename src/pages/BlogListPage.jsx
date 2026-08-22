import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import { articles } from '../blog/articles';

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-brutal-white font-sans pt-40 pb-12 px-4 selection:bg-brutal-yellow selection:text-brutal-black relative z-0">
      <Helmet>
        <title>Blog - PTU CGPA Calculator</title>
        <meta name="description" content="Read articles about PTU grading systems, CGPA calculation, SGPA to percentage formulas, and tips to improve your grades." />
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
      
      <div className="max-w-4xl mx-auto border-4 sm:border-8 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-4 sm:p-12">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-widest mb-8 sm:mb-12 border-b-4 sm:border-b-8 border-brutal-black pb-4 sm:pb-6 inline-block">
          PTU Student Blog
        </h1>
        
        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="group border-4 border-brutal-black p-4 sm:p-6 hover:-translate-y-2 hover:translate-x-2 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-brutal-yellow relative">
              <Link to={`/blog/${article.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">Read {article.title}</span>
              </Link>
              
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-black mb-3 leading-tight group-hover:underline decoration-4 underline-offset-4 break-words">
                {article.title}
              </h2>
              
              <p className="font-bold text-slate-700 leading-relaxed mb-6 line-clamp-2">
                {article.description}
              </p>
              
              <div className="inline-flex items-center gap-2 font-display font-black uppercase tracking-widest text-brutal-blue group-hover:text-brutal-black">
                Read Article <span className="text-xl">&rarr;</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
