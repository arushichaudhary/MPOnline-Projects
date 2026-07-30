import { Movie, UserRating, Recommendation } from '../types';
import { MOVIES_DATA, SYNTHETIC_USERS } from '../data/movies';

// Helper to convert genre list to a binary vector based on standard GENRES
const ALL_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Drama',
  'Fantasy',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
];

function getGenreVector(genres: string[]): number[] {
  return ALL_GENRES.map((g) => (genres.includes(g) ? 1 : 0));
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Content-Based Recommendation Algorithm
 * Builds a user profile based on genres of highly-rated movies,
 * and recommends unrated movies matching that profile.
 */
export function recommendContentBased(userRatings: UserRating[]): Recommendation[] {
  if (userRatings.length === 0) {
    // If no ratings, return top-rated popular movies
    return MOVIES_DATA.slice(0, 5).map((m) => ({
      movie: m,
      score: 4.5,
      reason: 'Trending choice based on high global audience ratings.',
      type: 'content',
    }));
  }

  // 1. Build User Genre Profile vector
  const userGenreProfile = new Array(ALL_GENRES.length).fill(0);
  let totalWeight = 0;

  userRatings.forEach((ur) => {
    const movie = MOVIES_DATA.find((m) => m.id === ur.movieId);
    if (!movie) return;

    // Weight of rating: positive for 4-5 stars, zero or negative for 1-2 stars
    const weight = ur.rating - 2.5; // shift so 3 is neutral (0.5), 5 is high (2.5), 1 is negative (-1.5)
    const mVec = getGenreVector(movie.genres);

    for (let i = 0; i < ALL_GENRES.length; i++) {
      userGenreProfile[i] += mVec[i] * weight;
    }
    totalWeight += Math.abs(weight);
  });

  // Normalize user profile if needed
  if (totalWeight > 0) {
    for (let i = 0; i < userGenreProfile.length; i++) {
      userGenreProfile[i] /= totalWeight;
    }
  }

  // 2. Score unrated movies
  const ratedMovieIds = new Set(userRatings.map((r) => r.movieId));
  const recs: Recommendation[] = [];

  MOVIES_DATA.forEach((movie) => {
    if (ratedMovieIds.has(movie.id)) return;

    const movieVec = getGenreVector(movie.genres);
    const score = cosineSimilarity(userGenreProfile, movieVec);

    // Find the primary matching genre for the reason
    const matchingGenres = movie.genres.filter((g) => {
      const idx = ALL_GENRES.indexOf(g);
      return idx !== -1 && userGenreProfile[idx] > 0.1;
    });

    const genreReason = matchingGenres.length > 0
      ? `Matches your love for ${matchingGenres.slice(0, 2).join(' & ')}.`
      : `Broadly aligns with your cinematic tastes.`;

    recs.push({
      movie,
      score: Math.round((score * 100) * 10) / 10, // score percentage
      reason: `Content Match: ${genreReason} (Avg genre overlap of ${(score * 100).toFixed(0)}%)`,
      type: 'content',
    });
  });

  // Sort by score descending and take top 5
  return recs.sort((a, b) => b.score - a.score).slice(0, 5);
}

/**
 * User-Based Collaborative Filtering Algorithm
 * Computes Pearson/Cosine similarity between active user and synthetic database users,
 * then recommends movies highly rated by similar users.
 */
export function recommendCollaborative(userRatings: UserRating[]): Recommendation[] {
  if (userRatings.length < 2) {
    return MOVIES_DATA.slice(2, 7).map((m) => ({
      movie: m,
      score: 4.2,
      reason: 'Recommended for you because other film buffs rated this highly.',
      type: 'collaborative',
    }));
  }

  // Map user ratings to a convenient dictionary
  const userRatingMap: { [key: number]: number } = {};
  userRatings.forEach((r) => {
    userRatingMap[r.movieId] = r.rating;
  });

  const ratedMovieIds = new Set(userRatings.map((r) => r.movieId));

  // Compute similarities with other users
  const similarities: { userId: string; score: number }[] = [];

  SYNTHETIC_USERS.forEach((synUser) => {
    // Collect overlapping ratings to find similarity
    const commonMovies = synUser.ratings.filter((r) => ratedMovieIds.has(r.movieId));
    if (commonMovies.length === 0) return;

    // Build vectors of shared movies
    const vecA: number[] = [];
    const vecB: number[] = [];

    commonMovies.forEach((cm) => {
      vecA.push(userRatingMap[cm.movieId]);
      vecB.push(cm.rating);
    });

    // Compute Cosine similarity
    const score = cosineSimilarity(vecA, vecB);
    if (score > 0.4) {
      similarities.push({ userId: synUser.id, score });
    }
  });

  // If no similar users found, fallback to content based
  if (similarities.length === 0) {
    return recommendContentBased(userRatings).map((r) => ({
      ...r,
      type: 'collaborative',
      reason: `${r.reason} (Collaborative model fell back to content due to sparse overlapping reviews)`,
    }));
  }

  // Aggregate predicted ratings for unrated movies from similar users
  const predictions: { [movieId: number]: { sumWeightedRatings: number; sumWeights: number } } = {};

  similarities.forEach((sim) => {
    const otherUser = SYNTHETIC_USERS.find((su) => su.id === sim.userId);
    if (!otherUser) return;

    otherUser.ratings.forEach((or) => {
      // Only predict for movies the active user hasn't rated yet
      if (ratedMovieIds.has(or.movieId)) return;

      if (!predictions[or.movieId]) {
        predictions[or.movieId] = { sumWeightedRatings: 0, sumWeights: 0 };
      }

      // Weight the rating by user-to-user similarity
      predictions[or.movieId].sumWeightedRatings += or.rating * sim.score;
      predictions[or.movieId].sumWeights += sim.score;
    });
  });

  const recs: Recommendation[] = [];

  Object.keys(predictions).forEach((idStr) => {
    const movieId = parseInt(idStr, 10);
    const movie = MOVIES_DATA.find((m) => m.id === movieId);
    if (!movie) return;

    const pred = predictions[movieId];
    if (pred.sumWeights === 0) return;

    const predictedRating = pred.sumWeightedRatings / pred.sumWeights;

    recs.push({
      movie,
      score: Math.round(predictedRating * 20 * 10) / 10, // Scale 1-5 to 1-100%
      reason: `Collaborative Filtering: Users with similar ratings to yours loved this and gave it high ratings.`,
      type: 'collaborative',
    });
  });

  // Sort by score descending
  const finalRecs = recs.sort((a, b) => b.score - a.score).slice(0, 5);

  // If we don't have enough collaborative recs, fill up with content-based
  if (finalRecs.length < 4) {
    const contentRecs = recommendContentBased(userRatings);
    contentRecs.forEach((cr) => {
      if (finalRecs.length < 5 && !finalRecs.some((fr) => fr.movie.id === cr.movie.id)) {
        finalRecs.push({
          movie: cr.movie,
          score: cr.score,
          reason: `${cr.reason} (Added as a hybrid content-based recommendation)`,
          type: 'collaborative',
        });
      }
    });
  }

  return finalRecs;
}
