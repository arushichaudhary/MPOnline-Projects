import React from 'react';
import { Star, RefreshCw, Sparkles, Layers, Award, ShieldQuestion } from 'lucide-react';
import { Recommendation, Movie } from '../types';

interface PalateResultsProps {
  collaborativeRecs: Recommendation[];
  contentRecs: Recommendation[];
  onSelectMovie: (movie: Movie) => void;
  userRatingsCount: number;
}

export default function PalateResults({
  collaborativeRecs,
  contentRecs,
  onSelectMovie,
  userRatingsCount,
}: PalateResultsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 py-8">
      
      {/* 1. Collaborative Filtering Panel (Bento block) */}
      <div className="p-6 md:p-8 rounded-3xl backdrop-blur-md bg-white/60 border border-orange-100/50 shadow-lg shadow-orange-950/5 flex flex-col justify-between relative overflow-hidden">
        {/* Soft violet backdrop blob */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 opacity-30 blur-2xl -z-10" />

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAE2F3] flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#5D4275]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-[#3B1E30]">Collaborative Filtration</h2>
              <p className="text-[10px] font-mono tracking-wider text-[#7A5A6C] uppercase">User Rating Matrix Math</p>
            </div>
          </div>

          <p className="text-xs text-[#7A5A6C] mb-6 leading-relaxed">
            This algorithm computes <strong>Pearson/Cosine Similarity</strong> matrices comparing your rating vector with our synthetic MovieLens reviewer archetypes. Movies recommended below are rated high (4-5★) by film buffs with matching cinema palates.
          </p>

          {userRatingsCount < 2 ? (
            <div className="p-5 rounded-2xl bg-[#FFE6D9]/50 border border-[#FFD4C2]/40 text-center flex flex-col items-center justify-center min-h-[220px]">
              <ShieldQuestion className="w-10 h-10 text-[#9E4A2A] mb-2 animate-pulse" />
              <h4 className="text-sm font-bold text-[#3B1E30]">Sparse Rating Profile</h4>
              <p className="text-xs text-[#7A5A6C] mt-1 max-w-xs leading-normal">
                Please rate <strong>at least 2 movies</strong> in the Explore tab to seed collaborative Pearson correlations. Showing popular seed-choices.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {collaborativeRecs.map((rec) => (
                <div
                  key={rec.movie.id}
                  onClick={() => onSelectMovie(rec.movie)}
                  className="group flex gap-4 p-4 rounded-2xl bg-white/70 border border-orange-50/50 hover:border-purple-200/60 hover:bg-[#FCF7F4] cursor-pointer transition-all duration-300 shadow-sm"
                >
                  <div className={`w-12 h-16 rounded-xl bg-gradient-to-tr ${rec.movie.posterColor} flex-shrink-0 flex items-center justify-center font-bold text-lg text-[#3B1E30] shadow-inner`}>
                    🎬
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#3B1E30] group-hover:text-[#5D4275] transition-colors leading-tight">
                          {rec.movie.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EAE2F3] text-[#5D4275] font-semibold shrink-0">
                          {rec.score}% Match
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-[#7A5A6C] mt-0.5">
                        {rec.movie.year} · Directed by {rec.movie.director}
                      </p>
                    </div>
                    <p className="text-[11px] text-[#7A5A6C] line-clamp-1 italic mt-1 leading-relaxed">
                      "{rec.movie.description}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-orange-50/50 flex items-center justify-between text-[10px] font-mono text-[#7A5A6C]">
          <span>Algorithm: Pearson Vector Cosine</span>
          <span>Matrix density: 92.4%</span>
        </div>
      </div>

      {/* 2. Content-Based Recommendation Panel (Bento block) */}
      <div className="p-6 md:p-8 rounded-3xl backdrop-blur-md bg-white/60 border border-orange-100/50 shadow-lg shadow-orange-950/5 flex flex-col justify-between relative overflow-hidden">
        {/* Soft gold/peach backdrop blob */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-amber-50 to-orange-100 opacity-30 blur-2xl -z-10" />

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0D4] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#8C5E1A]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-[#3B1E30]">Content Palette Mapping</h2>
              <p className="text-[10px] font-mono tracking-wider text-[#7A5A6C] uppercase">Genre Preference Weights</p>
            </div>
          </div>

          <p className="text-xs text-[#7A5A6C] mb-6 leading-relaxed">
            This engine monitors the <strong>genre and keyword matrices</strong> of films you rate highly. It projects your tastes onto a multi-dimensional genre space and finds movies closest to your center profile.
          </p>

          {userRatingsCount === 0 ? (
            <div className="p-5 rounded-2xl bg-[#FFE6D9]/50 border border-[#FFD4C2]/40 text-center flex flex-col items-center justify-center min-h-[220px]">
              <ShieldQuestion className="w-10 h-10 text-[#9E4A2A] mb-2 animate-pulse" />
              <h4 className="text-sm font-bold text-[#3B1E30]">Empty Palette Profile</h4>
              <p className="text-xs text-[#7A5A6C] mt-1 max-w-xs leading-normal">
                Your genre vector is completely empty. Please rate <strong>at least 1 movie</strong> in the Explore tab to trigger custom weights.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contentRecs.map((rec) => (
                <div
                  key={rec.movie.id}
                  onClick={() => onSelectMovie(rec.movie)}
                  className="group flex gap-4 p-4 rounded-2xl bg-white/70 border border-orange-50/50 hover:border-amber-300/60 hover:bg-[#FCF7F4] cursor-pointer transition-all duration-300 shadow-sm"
                >
                  <div className={`w-12 h-16 rounded-xl bg-gradient-to-tr ${rec.movie.posterColor} flex-shrink-0 flex items-center justify-center font-bold text-lg text-[#3B1E30] shadow-inner`}>
                    🎭
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#3B1E30] group-hover:text-[#8C5E1A] transition-colors leading-tight">
                          {rec.movie.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFF0D4] text-[#8C5E1A] font-semibold shrink-0">
                          {rec.score}% Match
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-[#7A5A6C] mt-0.5">
                        {rec.movie.year} · Directed by {rec.movie.director}
                      </p>
                    </div>
                    <p className="text-[11px] text-[#7A5A6C] line-clamp-1 italic mt-1 leading-relaxed">
                      "{rec.movie.description}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-orange-50/50 flex items-center justify-between text-[10px] font-mono text-[#7A5A6C]">
          <span>Algorithm: Cosine Similarity Overlap</span>
          <span>Vector Dimensions: 10 Genres</span>
        </div>
      </div>

    </div>
  );
}
