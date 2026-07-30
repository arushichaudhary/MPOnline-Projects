import React from 'react';
import { Sparkles, Film } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-10 max-w-7xl mx-auto px-4 pt-6 sm:pt-10 pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 rounded-3xl backdrop-blur-md bg-white/50 border border-orange-100/60 shadow-xl shadow-orange-950/5">
        
        {/* Brand Logo & Slogan */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FFD4C2] via-[#F4CFE6] to-[#DECFEF] flex items-center justify-center shadow-inner relative group cursor-pointer">
            <Film className="w-6 h-6 text-[#4A2035] group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-[#3B1E30] font-sans">
                Cine<span className="text-[#9E4A2A] font-serif italic font-semibold">Sorbet</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase font-semibold rounded-full bg-[#FFE6D9] text-[#9E4A2A] border border-[#FFD4C2]/50">
                v2.5
              </span>
            </div>
            <p className="text-xs text-[#7A5A6C] mt-0.5">
              Palate-Cleansing Movie Recommendation Engine & AI Sommelier
            </p>
          </div>
        </div>

        {/* Status indicator on the right */}
        <div className="flex items-center gap-2.5 text-xs font-semibold text-[#7A5A6C] bg-white/60 px-4 py-2 rounded-2xl border border-orange-100/40 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Cinematic Palette Engine Active</span>
        </div>
      </div>
    </header>
  );
}

