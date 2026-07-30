import React from 'react';
import { Star, Film, Sparkles, User, Clock } from 'lucide-react';
import { Movie, UserRating } from '../types';

interface MovieCardProps {
  key?: any;
  movie: Movie;
  userRating: number | undefined;
  onRateMovie: (movieId: number, rating: number) => void;
  onSelectMovie: (movie: Movie) => void;
}

export default function MovieCard({
  movie,
  userRating,
  onRateMovie,
  onSelectMovie,
}: MovieCardProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-3xl backdrop-blur-md bg-white/70 border border-orange-100/40 shadow-sm hover:shadow-xl hover:shadow-orange-950/5 hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Decorative backdrop/light blob matching the poster color */}
      <div className={`absolute -inset-px rounded-3xl bg-gradient-to-tr ${movie.posterColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />

      {/* Main Content */}
      <div className="cursor-pointer" onClick={() => onSelectMovie(movie)}>
        {/* Artistic Gradient Cover Image representing the movie */}
        <div className={`w-full aspect-[16/10] rounded-2xl bg-gradient-to-tr ${movie.posterColor} p-4 flex flex-col justify-between shadow-inner relative overflow-hidden mb-4 group-hover:scale-[1.01] transition-transform duration-300`}>
          {/* Decorative cinematic scanlines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
          
          <div className="flex justify-between items-start z-10">
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wide uppercase bg-white/80 backdrop-blur-sm rounded-full text-[#3B1E30] shadow-sm">
              {movie.year}
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold bg-[#3B1E30]/90 backdrop-blur-sm rounded-full text-white shadow-sm">
              <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="z-10 mt-auto">
            <h3 className="text-lg font-bold font-serif text-[#3B1E30] leading-snug tracking-tight drop-shadow-sm group-hover:text-[#9E4A2A] transition-colors duration-200">
              {movie.title}
            </h3>
            <p className="text-[10px] font-mono text-[#7A5A6C] mt-0.5">
              Dir: {movie.director}
            </p>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-orange-50/70 border border-orange-100/40 text-[#9E4A2A]"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Synopsis teaser */}
        <p className="text-xs text-[#7A5A6C] line-clamp-2 leading-relaxed mb-4">
          {movie.description}
        </p>
      </div>

      {/* Footer - Rating System */}
      <div className="pt-3 border-t border-orange-50/50 flex items-center justify-between">
        <span className="text-[10px] font-mono font-medium tracking-wide uppercase text-[#7A5A6C]">
          Your Rating
        </span>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= (hoverRating !== null ? hoverRating : (userRating || 0));
            return (
              <button
                key={star}
                type="button"
                onClick={() => onRateMovie(movie.id, star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                className="p-0.5 focus:outline-none focus:scale-125 hover:scale-125 active:scale-95 transition-transform duration-200"
              >
                <Star
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isFilled
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-[#E8D9CE] fill-none'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export function MovieModal({
  movie,
  userRating,
  onRateMovie,
  onClose,
}: {
  movie: Movie;
  userRating: number | undefined;
  onRateMovie: (movieId: number, rating: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3B1E30]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#FCF7F4] border border-orange-100/60 shadow-2xl p-6 md:p-8 animate-scale-up z-10 overflow-hidden">
        {/* Artistic backdrop decoration */}
        <div className={`absolute top-0 right-0 w-72 h-72 rounded-full bg-gradient-to-bl ${movie.posterColor} opacity-15 blur-3xl -z-10`} />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Visual gradient representations */}
          <div className={`w-full md:w-48 aspect-[3/4] md:aspect-auto md:h-64 rounded-2xl bg-gradient-to-tr ${movie.posterColor} p-5 flex flex-col justify-between shadow-md relative overflow-hidden shrink-0`}>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:100%_4px] opacity-25" />
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wide uppercase bg-white/95 rounded-full text-[#3B1E30] self-start shadow-sm">
              {movie.year}
            </span>
            <div className="mt-auto">
              <span className="text-[10px] font-mono text-[#3B1E30]/75 uppercase tracking-wider block font-medium">Director</span>
              <span className="font-serif font-bold text-[#3B1E30] leading-tight block">{movie.director}</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#3B1E30] tracking-tight leading-none">
                  {movie.title}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#FFE6D9] text-[#9E4A2A] hover:bg-[#FFD4C2] flex items-center justify-center font-bold text-sm transition-colors duration-200 shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#3B1E30] text-white text-[10px] font-mono">
                  <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <span>{movie.rating.toFixed(1)} TMDB</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/80 border border-orange-100 text-[10px] font-mono text-[#7A5A6C]">
                  <Clock className="w-3 h-3" />
                  <span>{movie.runtime} min</span>
                </div>
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-orange-50/70 border border-orange-100/40 text-[#9E4A2A]"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Cast */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A5A6C] block mb-1">Starring</span>
                <p className="text-xs text-[#3B1E30] font-medium">{movie.cast.join(', ')}</p>
              </div>

              {/* Synopsis */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A5A6C] block mb-1">Palate Synopsis</span>
                <p className="text-xs text-[#7A5A6C] leading-relaxed font-serif">
                  {movie.description}
                </p>
              </div>
            </div>

            {/* Rating control inside Modal */}
            <div className="pt-4 border-t border-orange-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#7A5A6C] block">Your taste rating</span>
                <p className="text-xs font-semibold text-[#3B1E30] mt-0.5">
                  {userRating ? `${userRating} Stars / Rated` : 'Not rated yet'}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-white/80 border border-orange-100 p-1.5 rounded-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => onRateMovie(movie.id, star)}
                    className="p-1 focus:outline-none hover:scale-125 transition-transform duration-200"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= (userRating || 0)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-[#E8D9CE] fill-none'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
