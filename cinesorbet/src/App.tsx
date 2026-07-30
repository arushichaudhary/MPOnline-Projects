import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  Layers,
  Compass,
  MessageSquare,
  Trash2,
  ListFilter,
  Check,
  RefreshCw,
  Info
} from 'lucide-react';

// Data & Utils
import { MOVIES_DATA, PERSONAS, GENRES } from './data/movies';
import { recommendContentBased, recommendCollaborative } from './utils/recommender';
import { Movie, UserRating, Persona } from './types';

// Components
import Header from './components/Header';
import MovieCard, { MovieModal } from './components/MovieCard';
import PalateResults from './components/PalateResults';
import AISommelier from './components/AISommelier';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'explore' | 'palate' | 'sommelier'>('explore');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // User Rating State - Pre-seeded with 2 initial ratings so recommendation engines work out-of-the-box!
  const [userRatings, setUserRatings] = useState<UserRating[]>([
    { movieId: 1, rating: 5 },  // Inception
    { movieId: 3, rating: 4 },  // Spirited Away
  ]);

  // Modal State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Handle rating a movie
  const handleRateMovie = (movieId: number, rating: number) => {
    setUserRatings((prev) => {
      const existingIdx = prev.findIndex((r) => r.movieId === movieId);
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = { movieId, rating };
        return updated;
      } else {
        return [...prev, { movieId, rating }];
      }
    });
  };

  // Inject a Preset Persona's rating history to explore recommendations
  const handleInjectPersona = (persona: Persona) => {
    setUserRatings(persona.ratings);
    setSelectedGenre('All');
    setSearchQuery('');
  };

  // Reset all ratings
  const handleResetRatings = () => {
    setUserRatings([]);
  };

  // Filter movies based on user search and genre tabs
  const filteredMovies = useMemo(() => {
    return MOVIES_DATA.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.cast.some((actor) => actor.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesGenre = selectedGenre === 'All' || movie.genres.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  // Compute recommendations in real-time based on active ratings
  const collaborativeRecommendations = useMemo(() => {
    return recommendCollaborative(userRatings);
  }, [userRatings]);

  const contentRecommendations = useMemo(() => {
    return recommendContentBased(userRatings);
  }, [userRatings]);

  // Helper to find rating of a specific movie
  const getMovieUserRating = (movieId: number) => {
    return userRatings.find((r) => r.movieId === movieId)?.rating;
  };

  // Helper to select movie by title from recommendations
  const handleSelectMovieByTitle = (title: string) => {
    const movie = MOVIES_DATA.find((m) => m.title.toLowerCase() === title.toLowerCase());
    if (movie) {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF7F4] text-[#3B1E30] selection:bg-[#FFE6D9] selection:text-[#9E4A2A] pb-20 font-sans relative overflow-x-hidden">
      
      {/* Absolute top decorative sorbet light patterns */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-100/50 to-pink-100/50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FFE6D9]/40 to-[#EAE2F3]/40 blur-[100px] -z-10 pointer-events-none" />

      {/* Header component */}
      <Header />

      {/* Subheader / Tabs controller */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl backdrop-blur-md bg-white/50 border border-orange-100/60 shadow-md">
          
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                activeTab === 'explore'
                  ? 'bg-[#3B1E30] text-white shadow-sm'
                  : 'bg-white/60 hover:bg-[#FFE6D9]/40 text-[#7A5A6C]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Explore & Rate ({MOVIES_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('palate')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                activeTab === 'palate'
                  ? 'bg-[#3B1E30] text-white shadow-sm'
                  : 'bg-white/60 hover:bg-[#FFE6D9]/40 text-[#7A5A6C]'
              }`}
            >
              <Layers className="w-4 h-4" />
              My Recommendations
              {userRatings.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-orange-100 text-[#9E4A2A] text-[9px] font-mono">
                  {userRatings.length} rated
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('sommelier')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                activeTab === 'sommelier'
                  ? 'bg-[#3B1E30] text-white shadow-sm'
                  : 'bg-white/60 hover:bg-[#FFE6D9]/40 text-[#7A5A6C]'
              }`}
            >
              <Compass className="w-4 h-4" />
              AI Film Sommelier
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[8px] font-bold uppercase tracking-wider">
                Live
              </span>
            </button>
          </div>

          {/* Quick Stats Summary */}
          <div className="flex items-center gap-4 text-xs font-medium text-[#7A5A6C]">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/40 border border-orange-50/50 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>Taste Map: {userRatings.length} / 25 rated</span>
            </div>
            {userRatings.length > 0 && (
              <button
                onClick={handleResetRatings}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold px-2 py-1 rounded-xl hover:bg-red-50/50 transition-all text-[11px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset Profile
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Tab Screen Area */}
      {activeTab === 'explore' && (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main explore card list (Span 3) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Filter controls */}
            <div className="p-5 rounded-3xl backdrop-blur-md bg-white/50 border border-orange-100/60 shadow-md">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
                
                {/* Search */}
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search films by title, director, or cast..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-orange-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#FFD4C2] text-[#3B1E30]"
                  />
                </div>

                {/* Genre Tabs scrolling list */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  <span className="text-xs font-mono text-[#7A5A6C] flex items-center gap-1 mr-1 shrink-0">
                    <ListFilter className="w-3.5 h-3.5" />
                    Genre:
                  </span>
                  {['All', ...GENRES].map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                        selectedGenre === genre
                          ? 'bg-[#FFE6D9] text-[#9E4A2A] border border-[#FFD4C2]'
                          : 'bg-white hover:bg-[#FFE6D9]/30 text-[#7A5A6C] border border-orange-50/50'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Movie Card Grid */}
            {filteredMovies.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white/40 border border-orange-100/30 flex flex-col items-center justify-center min-h-[300px]">
                <Info className="w-8 h-8 text-[#7A5A6C] mb-2" />
                <h3 className="text-base font-bold text-[#3B1E30]">No Cine-palate matches found</h3>
                <p className="text-xs text-[#7A5A6C] mt-1 max-w-sm">
                  Try adjusting your search queries or genre filters to find matching sorbet-colored films.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    userRating={getMovieUserRating(movie.id)}
                    onRateMovie={handleRateMovie}
                    onSelectMovie={setSelectedMovie}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Right Sidebar - Persona Injector (Span 1) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Persona Preset box */}
            <div className="p-6 rounded-3xl backdrop-blur-md bg-white/50 border border-orange-100/60 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#9E4A2A]" />
                <h3 className="text-xs font-mono uppercase tracking-wide font-bold text-[#3B1E30]">Test Personas</h3>
              </div>
              <p className="text-xs text-[#7A5A6C] mb-4 leading-relaxed">
                Inject pre-configured review vectors modeled from classic MovieLens audiences to test instant collaborative filtration:
              </p>
              
              <div className="space-y-3">
                {PERSONAS.map((persona) => {
                  // Check if active profile matches this persona
                  const isActive = JSON.stringify(userRatings) === JSON.stringify(persona.ratings);
                  
                  return (
                    <div
                      key={persona.id}
                      onClick={() => handleInjectPersona(persona)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-br from-[#FFE6D9] to-white border-[#FFD4C2] shadow-sm scale-[1.02]'
                          : 'bg-white hover:bg-[#FFE6D9]/20 border-orange-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${persona.avatarColor.split(' ')[0]}`} />
                          <h4 className="text-xs font-bold text-[#3B1E30]">{persona.name}</h4>
                        </div>
                        {isActive && <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />}
                      </div>
                      <p className="text-[11px] text-[#7A5A6C] mt-1 leading-relaxed">
                        {persona.description}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-orange-50/30 flex justify-between text-[9px] font-mono text-[#7A5A6C]">
                        <span>Seeded: {persona.ratings.length} ratings</span>
                        <span className="text-[#9E4A2A] font-semibold hover:underline">Apply profile →</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Quick Algorithm Explanation panel */}
            <div className="p-6 rounded-3xl backdrop-blur-md bg-white/40 border border-orange-100/40">
              <h4 className="text-xs font-bold text-[#3B1E30] uppercase tracking-wide mb-2">Did you know?</h4>
              <p className="text-[11px] text-[#7A5A6C] leading-relaxed">
                CineSorbet uses a **hybrid recommendation model**. It maps user behavior via item-based overlap cosine models while utilizing generative AI to compose bespoke narrative explanations.
              </p>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'palate' && (
        <PalateResults
          collaborativeRecs={collaborativeRecommendations}
          contentRecs={contentRecommendations}
          onSelectMovie={setSelectedMovie}
          userRatingsCount={userRatings.length}
        />
      )}

      {activeTab === 'sommelier' && (
        <AISommelier
          userRatings={userRatings}
          selectedGenres={selectedGenre === 'All' ? [] : [selectedGenre]}
          onSelectMovieByTitle={handleSelectMovieByTitle}
        />
      )}

      {/* Floating Movie Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          userRating={getMovieUserRating(selectedMovie.id)}
          onRateMovie={handleRateMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

    </div>
  );
}
