export interface Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
  director: string;
  cast: string[];
  description: string;
  rating: number; // average rating out of 10
  runtime: number; // in minutes
  posterColor: string; // Tailwinds peach-sorbet/glass gradient classes
  backdropColor: string; // Warm colors
  popularity: number; // rating count or popularity index
}

export interface UserRating {
  movieId: number;
  rating: number; // 1 to 5 stars
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  avatarColor: string;
  ratings: UserRating[];
}

export interface Recommendation {
  movie: Movie;
  score: number; // 0 to 5 or percentage matching
  reason: string;
  type: 'collaborative' | 'content' | 'ai';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
