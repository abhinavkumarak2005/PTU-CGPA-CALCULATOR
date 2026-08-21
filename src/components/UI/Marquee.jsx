import React from 'react';
import { motion } from 'framer-motion';

export default function Marquee({ text, speed = 20, href }) {
  // Duplicate the text multiple times to ensure continuous scrolling
  const marqueeText = Array(10).fill(text).join(' * ');

  const content = (
    <motion.div
      className="flex font-display font-bold uppercase text-2xl md:text-3xl tracking-widest cursor-pointer"
      animate={{ x: [0, -1035] }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration: speed,
      }}
    >
      <span className="pr-8">{marqueeText}</span>
      <span className="pr-8">{marqueeText}</span>
    </motion.div>
  );

  return (
    <div className="w-full overflow-hidden bg-brutal-black text-brutal-yellow py-4 border-y-4 border-brutal-black flex whitespace-nowrap relative z-10 hover:text-white transition-colors">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="w-full block">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
