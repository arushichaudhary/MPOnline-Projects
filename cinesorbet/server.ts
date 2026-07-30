import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import AdmZip from 'adm-zip';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing. Please add it to Settings > Secrets in AI Studio.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

// 2. Gemini recommendation Matchmaker endpoint
app.post('/api/gemini/match', async (req, res) => {
  try {
    const { ratings, genres, prompt } = req.body;

    let gemini;
    try {
      gemini = getGeminiClient();
    } catch (err: any) {
      return res.status(400).json({
        error: 'Missing API Key',
        message: err.message || 'Gemini API key is not configured.',
      });
    }

    // Format ratings and genres for prompt context
    const ratingsContext = ratings && ratings.length > 0
      ? ratings.map((r: any) => `Movie ID ${r.movieId} rated ${r.rating}/5`).join(', ')
      : 'No movies rated yet';

    const genresContext = genres && genres.length > 0
      ? genres.join(', ')
      : 'No specific genres pre-selected';

    const systemInstruction = `You are CineSorbet's Film Sommelier, a warm, poetically articulate, and highly expert AI movie recommender.
Your purpose is to provide movie matches styled like a luxurious gourmet sorbet dessert flight—refreshing, colorful, and tailored to the exact mood specified by the user.
You must return exactly 3 movie recommendations as a JSON array matching the specified responseSchema.
You should try to map recommendations to our local database where appropriate, but feel free to recommend external movies if they fit the prompt much better.
For local database movies, set 'isLocalMovie' to true and match 'localMovieId' (1 to 25).
Make 'customReasoning' beautiful, cinematic, and descriptive (2-3 sentences), explaining why this particular recommendation cleanses their palate and matches their mood.`;

    const contents = `
The user has the following preferences:
- Preferred Genres: ${genresContext}
- Rated Movies History: ${ratingsContext}

Specific Mood request or query: "${prompt || 'Suggest three perfect movies for a lazy evening'}"

Suggest exactly 3 movies that correspond to this request.
`;

    const response = await gemini.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'The title of the recommended movie' },
              year: { type: Type.INTEGER, description: 'The release year of the movie' },
              genres: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Genres of the movie' },
              director: { type: Type.STRING, description: 'Director of the film' },
              description: { type: Type.STRING, description: 'A brief 1-sentence general synopsis of the movie' },
              matchPercentage: { type: Type.INTEGER, description: 'How closely this matches their mood out of 100' },
              customReasoning: { type: Type.STRING, description: 'Poetic, luxurious movie sommelier description (2-3 sentences) detailing why this fits the user' },
              isLocalMovie: { type: Type.BOOLEAN, description: 'True if it exists in the CineSorbet database (1 to 25)' },
              localMovieId: { type: Type.INTEGER, description: 'The ID of the movie in our dataset if isLocalMovie is true, else leave empty or omit' },
            },
            required: ['title', 'year', 'genres', 'director', 'description', 'matchPercentage', 'customReasoning', 'isLocalMovie'],
          },
        },
      },
    });

    const jsonText = response.text?.trim() || '[]';
    const parsedRecommendations = JSON.parse(jsonText);

    res.json({
      success: true,
      recommendations: parsedRecommendations,
    });
  } catch (error: any) {
    console.error('Gemini matchmaking error:', error);
    res.status(500).json({
      success: false,
      error: 'Matchmaking Failed',
      message: error.message || 'An error occurred while calling the Gemini API.',
    });
  }
});

// 3. Render-ready code bundle downloader (Downloads ZIP file of workspace)
app.get('/api/download-zip', (req, res) => {
  try {
    const zip = new AdmZip();
    const rootDir = process.cwd();

    // Recursive directory zipping
    const addDirectoryToZip = (localPath: string, zipPath: string) => {
      const items = fs.readdirSync(localPath);
      items.forEach((item) => {
        // Exclude directories/files that shouldn't go in the deployment ZIP
        if (
          item === 'node_modules' ||
          item === 'dist' ||
          item === '.git' ||
          item === '.aistudio' ||
          item.endsWith('.zip') ||
          item === '.env'
        ) {
          return;
        }

        const fullLocalPath = path.join(localPath, item);
        const fullZipPath = zipPath ? `${zipPath}/${item}` : item;
        const stat = fs.statSync(fullLocalPath);

        if (stat.isDirectory()) {
          addDirectoryToZip(fullLocalPath, fullZipPath);
        } else {
          zip.addLocalFile(fullLocalPath, zipPath);
        }
      });
    };

    // Add everything recursively
    addDirectoryToZip(rootDir, '');

    // Add a README with instructions for deploying on Render
    const readmeContent = `# CineSorbet Movie Recommendation System

Deployed seamlessly onto **Render** or **Vercel** in seconds!

## Render Deployment Instructions:
1. Create a Web Service on Render.
2. Connect your GitHub repository or upload the extracted ZIP.
3. Configure settings:
   - **Runtime**: Node
   - **Build Command**: \`npm install && npm run build\`
   - **Start Command**: \`npm run start\`
4. Add environment variables in Render's dashboard:
   - \`GEMINI_API_KEY\`: (Your Google AI Studio Gemini API Key)
   - \`NODE_ENV\`: \`production\`
   - \`PORT\`: \`3000\`

Enjoy CineSorbet!
`;
    zip.addFile('RENDER_DEPLOY_README.md', Buffer.from(readmeContent, 'utf-8'));

    const zipBuffer = zip.toBuffer();
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=cinesorbet_render_bundle.zip');
    res.send(zipBuffer);
  } catch (error: any) {
    console.error('Failed to generate deployable ZIP:', error);
    res.status(500).json({
      success: false,
      error: 'ZIP Generation Failed',
      message: error.message || 'Could not pack files into a zip download.',
    });
  }
});

// 4. Vite Dev/Production server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support single-page application fallback route
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineSorbet Server running on http://localhost:${PORT}`);
  });
}

startServer();
