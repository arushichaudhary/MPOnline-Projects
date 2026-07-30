import { Movie, Persona } from '../types';

export const GENRES = [
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

export const MOVIES_DATA: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    runtime: 148,
    posterColor: 'from-orange-200 via-rose-200 to-purple-200',
    backdropColor: 'from-orange-100/40 via-rose-100/40 to-purple-100/40',
    popularity: 95,
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    rating: 8.7,
    runtime: 169,
    posterColor: 'from-indigo-200 via-rose-200 to-orange-200',
    backdropColor: 'from-indigo-100/30 via-rose-100/30 to-orange-100/30',
    popularity: 98,
  },
  {
    id: 3,
    title: 'Spirited Away',
    year: 2001,
    genres: ['Animation', 'Adventure', 'Fantasy'],
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    rating: 8.6,
    runtime: 125,
    posterColor: 'from-rose-100 via-amber-200 to-teal-100',
    backdropColor: 'from-rose-50/40 via-amber-50/40 to-teal-50/40',
    popularity: 92,
  },
  {
    id: 4,
    title: 'The Dark Knight',
    year: 2008,
    genres: ['Action', 'Drama', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    rating: 9.0,
    runtime: 152,
    posterColor: 'from-purple-300 via-pink-200 to-orange-200',
    backdropColor: 'from-purple-100/30 via-pink-100/30 to-orange-100/30',
    popularity: 100,
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    year: 1994,
    genres: ['Thriller', 'Drama'],
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 8.9,
    runtime: 154,
    posterColor: 'from-amber-200 via-orange-300 to-rose-200',
    backdropColor: 'from-amber-100/30 via-orange-100/30 to-rose-100/30',
    popularity: 94,
  },
  {
    id: 6,
    title: 'La La Land',
    year: 2016,
    genres: ['Romance', 'Drama', 'Comedy'],
    director: 'Damien Chazelle',
    cast: ['Ryan Gosling', 'Emma Stone', 'Rosemarie DeWitt'],
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    rating: 8.0,
    runtime: 128,
    posterColor: 'from-rose-200 via-purple-200 to-amber-200',
    backdropColor: 'from-rose-100/40 via-purple-100/40 to-amber-100/40',
    popularity: 89,
  },
  {
    id: 7,
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
    genres: ['Romance', 'Drama', 'Sci-Fi'],
    director: 'Michel Gondry',
    cast: ['Jim Carrey', 'Kate Winslet', 'Kirsten Dunst'],
    description: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories forever.',
    rating: 8.3,
    runtime: 108,
    posterColor: 'from-teal-100 via-rose-200 to-purple-200',
    backdropColor: 'from-teal-50/40 via-rose-100/40 to-purple-100/40',
    popularity: 87,
  },
  {
    id: 8,
    title: 'Parasite',
    year: 2019,
    genres: ['Thriller', 'Drama', 'Comedy'],
    director: 'Bong Joon Ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    rating: 8.5,
    runtime: 132,
    posterColor: 'from-emerald-200 via-teal-100 to-rose-200',
    backdropColor: 'from-emerald-100/30 via-teal-50/30 to-rose-100/30',
    popularity: 96,
  },
  {
    id: 9,
    title: 'Amélie',
    year: 2001,
    genres: ['Romance', 'Comedy'],
    director: 'Jean-Pierre Jeunet',
    cast: ['Audrey Tautou', 'Mathieu Kassovitz', 'Rufus'],
    description: 'Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.',
    rating: 8.3,
    runtime: 122,
    posterColor: 'from-amber-100 via-rose-200 to-orange-100',
    backdropColor: 'from-amber-50/40 via-rose-50/40 to-orange-50/40',
    popularity: 85,
  },
  {
    id: 10,
    title: 'Whiplash',
    year: 2014,
    genres: ['Drama', 'Thriller'],
    director: 'Damien Chazelle',
    cast: ['Miles Teller', 'J.K. Simmons', 'Paul Reiser'],
    description: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    rating: 8.5,
    runtime: 106,
    posterColor: 'from-orange-300 via-rose-300 to-purple-300',
    backdropColor: 'from-orange-100/30 via-rose-100/30 to-purple-100/30',
    popularity: 91,
  },
  {
    id: 11,
    title: 'Your Name.',
    year: 2016,
    genres: ['Animation', 'Drama', 'Fantasy', 'Romance'],
    director: 'Makoto Shinkai',
    cast: ['Ryunosuke Kamiki', 'Mone Kamishiraishi', 'Ryo Narita'],
    description: 'Two strangers find themselves linked in a bizarre way. When a connection is formed, will distance be the only thing to keep them apart?',
    rating: 8.4,
    runtime: 106,
    posterColor: 'from-indigo-100 via-pink-200 to-orange-100',
    backdropColor: 'from-indigo-50/40 via-pink-50/40 to-orange-50/40',
    popularity: 90,
  },
  {
    id: 12,
    title: 'The Matrix',
    year: 1999,
    genres: ['Sci-Fi', 'Action'],
    director: 'Lana Wachowski',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    rating: 8.7,
    runtime: 136,
    posterColor: 'from-teal-200 via-slate-200 to-rose-200',
    backdropColor: 'from-teal-100/30 via-slate-100/30 to-rose-100/30',
    popularity: 97,
  },
  {
    id: 13,
    title: 'WALL·E',
    year: 2008,
    genres: ['Animation', 'Adventure', 'Sci-Fi'],
    director: 'Andrew Stanton',
    cast: ['Ben Burtt', 'Elissa Knight', 'Jeff Garlin'],
    description: 'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
    rating: 8.4,
    runtime: 98,
    posterColor: 'from-amber-100 via-rose-100 to-teal-100',
    backdropColor: 'from-amber-50/40 via-rose-50/40 to-teal-50/40',
    popularity: 88,
  },
  {
    id: 14,
    title: 'Knives Out',
    year: 2019,
    genres: ['Mystery', 'Comedy', 'Thriller'],
    director: 'Rian Johnson',
    cast: ['Daniel Craig', 'Chris Evans', 'Ana de Armas'],
    description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    rating: 7.9,
    runtime: 130,
    posterColor: 'from-orange-200 via-purple-100 to-amber-200',
    backdropColor: 'from-orange-100/30 via-purple-50/30 to-amber-100/30',
    popularity: 93,
  },
  {
    id: 15,
    title: 'Before Sunrise',
    year: 1995,
    genres: ['Romance', 'Drama'],
    director: 'Richard Linklater',
    cast: ['Ethan Hawke', 'Julie Delpy', 'Andrea Eckert'],
    description: 'A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna. However, both know that this will probably be their only night together.',
    rating: 8.1,
    runtime: 101,
    posterColor: 'from-rose-200 via-amber-100 to-rose-100',
    backdropColor: 'from-rose-100/40 via-amber-50/40 to-rose-50/40',
    popularity: 82,
  },
  {
    id: 16,
    title: 'The Grand Budapest Hotel',
    year: 2014,
    genres: ['Comedy', 'Drama'],
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric'],
    description: 'A writer relates his adventures at a renowned European resort hotel between the first and second World Wars with a concierge who is wrongly accused of murder.',
    rating: 8.1,
    runtime: 99,
    posterColor: 'from-pink-200 via-orange-100 to-pink-300',
    backdropColor: 'from-pink-100/40 via-orange-50/40 to-pink-200/40',
    popularity: 89,
  },
  {
    id: 17,
    title: 'Gladiator',
    year: 2000,
    genres: ['Action', 'Adventure', 'Drama'],
    director: 'Ridley Scott',
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
    description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    rating: 8.5,
    runtime: 155,
    posterColor: 'from-orange-300 via-amber-200 to-rose-200',
    backdropColor: 'from-orange-100/30 via-amber-100/30 to-rose-100/30',
    popularity: 95,
  },
  {
    id: 18,
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    genres: ['Animation', 'Action', 'Adventure', 'Sci-Fi'],
    director: 'Bob Persichetti',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld'],
    description: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
    rating: 8.4,
    runtime: 117,
    posterColor: 'from-purple-200 via-rose-300 to-amber-100',
    backdropColor: 'from-purple-100/30 via-rose-100/30 to-amber-50/30',
    popularity: 94,
  },
  {
    id: 19,
    title: 'The Lion King',
    year: 1994,
    genres: ['Animation', 'Adventure', 'Drama'],
    director: 'Roger Allers',
    cast: ['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'],
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    rating: 8.5,
    runtime: 88,
    posterColor: 'from-amber-200 via-orange-200 to-rose-100',
    backdropColor: 'from-amber-100/40 via-orange-100/40 to-rose-50/40',
    popularity: 93,
  },
  {
    id: 20,
    title: 'Spider-Man: Across the Spider-Verse',
    year: 2023,
    genres: ['Animation', 'Action', 'Adventure', 'Sci-Fi'],
    director: 'Joaquim Dos Santos',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac'],
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.',
    rating: 8.6,
    runtime: 140,
    posterColor: 'from-purple-300 via-pink-200 to-indigo-200',
    backdropColor: 'from-purple-100/30 via-pink-100/30 to-indigo-100/30',
    popularity: 96,
  },
  {
    id: 21,
    title: 'About Time',
    year: 2013,
    genres: ['Romance', 'Drama', 'Fantasy', 'Comedy'],
    director: 'Richard Curtis',
    cast: ['Domhnall Gleeson', 'Rachel McAdams', 'Bill Nighy'],
    description: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.',
    rating: 7.8,
    runtime: 123,
    posterColor: 'from-rose-100 via-orange-100 to-pink-200',
    backdropColor: 'from-rose-50/40 via-orange-50/40 to-pink-100/40',
    popularity: 84,
  },
  {
    id: 22,
    title: 'The Truman Show',
    year: 1998,
    genres: ['Drama', 'Comedy'],
    director: 'Peter Weir',
    cast: ['Jim Carrey', 'Laura Linney', 'Noah Emmerich'],
    description: 'An insurance salesman discovers his whole life is actually a reality TV show.',
    rating: 8.1,
    runtime: 103,
    posterColor: 'from-sky-100 via-rose-100 to-amber-100',
    backdropColor: 'from-sky-50/40 via-rose-50/40 to-amber-50/40',
    popularity: 89,
  },
  {
    id: 23,
    title: 'Perfect Blue',
    year: 1997,
    genres: ['Animation', 'Mystery', 'Thriller'],
    director: 'Satoshi Kon',
    cast: ['Junko Iwao', 'Rica Matsumoto', 'Shinpachi Tsuji'],
    description: 'A retired pop singer turned actress\'s sense of reality starts to slip when she is stalked by an obsessed fan and seemingly a ghost of her past.',
    rating: 8.0,
    runtime: 81,
    posterColor: 'from-rose-300 via-purple-300 to-rose-400',
    backdropColor: 'from-rose-100/40 via-purple-100/40 to-rose-200/40',
    popularity: 80,
  },
  {
    id: 24,
    title: 'Shutter Island',
    year: 2010,
    genres: ['Mystery', 'Thriller'],
    director: 'Martin Scorsese',
    cast: ['Leonardo DiCaprio', 'Emily Mortimer', 'Mark Ruffalo'],
    description: 'In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',
    rating: 8.2,
    runtime: 138,
    posterColor: 'from-slate-300 via-rose-200 to-orange-200',
    backdropColor: 'from-slate-100/30 via-rose-100/30 to-orange-100/30',
    popularity: 94,
  },
  {
    id: 25,
    title: 'Howl\'s Moving Castle',
    year: 2004,
    genres: ['Animation', 'Adventure', 'Fantasy'],
    director: 'Hayao Miyazaki',
    cast: ['Chieko Baisho', 'Takuya Kimura', 'Akihiro Miwa'],
    description: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.',
    rating: 8.2,
    runtime: 119,
    posterColor: 'from-teal-100 via-orange-100 to-rose-200',
    backdropColor: 'from-teal-50/40 via-orange-50/40 to-rose-100/40',
    popularity: 91,
  }
];

export const PERSONAS: Persona[] = [
  {
    id: 'sci_fi',
    name: 'Sci-Fi Visionary',
    description: 'Prefers mind-bending futuristic theories, wormholes, and virtual realities.',
    avatarColor: 'bg-indigo-100 text-indigo-700',
    ratings: [
      { movieId: 1, rating: 5 }, // Inception
      { movieId: 2, rating: 5 }, // Interstellar
      { movieId: 12, rating: 5 }, // The Matrix
      { movieId: 13, rating: 4 }, // WALL-E
      { movieId: 6, rating: 2 }, // La La Land (dislikes light romance)
      { movieId: 15, rating: 2 }, // Before Sunrise
    ],
  },
  {
    id: 'hopeless_romantic',
    name: 'Romantic Dreamer',
    description: 'Loves heartfelt connection, warm comedy, sweeping melodies, and nostalgia.',
    avatarColor: 'bg-rose-100 text-rose-700',
    ratings: [
      { movieId: 6, rating: 5 }, // La La Land
      { movieId: 7, rating: 4 }, // Eternal Sunshine
      { movieId: 9, rating: 5 }, // Amelie
      { movieId: 15, rating: 5 }, // Before Sunrise
      { movieId: 21, rating: 5 }, // About Time
      { movieId: 4, rating: 2 }, // The Dark Knight (too dark)
      { movieId: 5, rating: 1 }, // Pulp Fiction (too violent)
    ],
  },
  {
    id: 'animation_enthusiast',
    name: 'Anime & Whimsy Fan',
    description: 'Captivated by animated fantasy, visual artwork, and epic soundtracks.',
    avatarColor: 'bg-teal-100 text-teal-700',
    ratings: [
      { movieId: 3, rating: 5 }, // Spirited Away
      { movieId: 11, rating: 5 }, // Your Name.
      { movieId: 13, rating: 4 }, // WALL-E
      { movieId: 18, rating: 5 }, // Spider-Man: Into the Spider-Verse
      { movieId: 19, rating: 4 }, // The Lion King
      { movieId: 20, rating: 5 }, // Spider-Man: Across the Spider-Verse
      { movieId: 25, rating: 5 }, // Howl's Moving Castle
      { movieId: 5, rating: 2 }, // Pulp Fiction
    ],
  },
  {
    id: 'thrill_seeker',
    name: 'Suspense Aficionado',
    description: 'Craves high-intensity action, intricate mysteries, and psychological puzzles.',
    avatarColor: 'bg-orange-100 text-orange-700',
    ratings: [
      { movieId: 1, rating: 5 }, // Inception
      { movieId: 4, rating: 5 }, // The Dark Knight
      { movieId: 5, rating: 5 }, // Pulp Fiction
      { movieId: 8, rating: 4 }, // Parasite
      { movieId: 10, rating: 5 }, // Whiplash
      { movieId: 23, rating: 4 }, // Perfect Blue
      { movieId: 24, rating: 5 }, // Shutter Island
      { movieId: 9, rating: 2 }, // Amelie (too slow)
    ],
  }
];

// Preseeded system ratings to run real Collaborative Filtering matrix recommendations
export const SYNTHETIC_USERS = [
  {
    id: 'user_a',
    ratings: [
      { movieId: 1, rating: 5 }, { movieId: 2, rating: 4 }, { movieId: 12, rating: 5 },
      { movieId: 3, rating: 2 }, { movieId: 6, rating: 1 }, { movieId: 15, rating: 2 }
    ]
  },
  {
    id: 'user_b',
    ratings: [
      { movieId: 6, rating: 5 }, { movieId: 15, rating: 5 }, { movieId: 21, rating: 5 },
      { movieId: 9, rating: 4 }, { movieId: 7, rating: 4 }, { movieId: 1, rating: 2 }
    ]
  },
  {
    id: 'user_c',
    ratings: [
      { movieId: 3, rating: 5 }, { movieId: 11, rating: 5 }, { movieId: 25, rating: 5 },
      { movieId: 18, rating: 4 }, { movieId: 19, rating: 5 }, { movieId: 8, rating: 3 }
    ]
  },
  {
    id: 'user_d',
    ratings: [
      { movieId: 4, rating: 5 }, { movieId: 5, rating: 5 }, { movieId: 24, rating: 5 },
      { movieId: 10, rating: 4 }, { movieId: 8, rating: 5 }, { movieId: 21, rating: 2 }
    ]
  },
  {
    id: 'user_e',
    ratings: [
      { movieId: 1, rating: 4 }, { movieId: 2, rating: 5 }, { movieId: 13, rating: 4 },
      { movieId: 18, rating: 4 }, { movieId: 12, rating: 4 }, { movieId: 9, rating: 3 }
    ]
  },
  {
    id: 'user_f',
    ratings: [
      { movieId: 6, rating: 4 }, { movieId: 9, rating: 5 }, { movieId: 16, rating: 5 },
      { movieId: 15, rating: 4 }, { movieId: 3, rating: 4 }, { movieId: 4, rating: 1 }
    ]
  },
  {
    id: 'user_g',
    ratings: [
      { movieId: 8, rating: 5 }, { movieId: 5, rating: 4 }, { movieId: 14, rating: 5 },
      { movieId: 24, rating: 4 }, { movieId: 1, rating: 4 }, { movieId: 6, rating: 3 }
    ]
  }
];
