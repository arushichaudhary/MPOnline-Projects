# CineSorbet Movie Recommendation System

Deployed seamlessly onto **Render** or **Vercel** in seconds!

## Render Deployment Instructions:
1. Create a Web Service on Render.
2. Connect your GitHub repository or upload the extracted ZIP.
3. Configure settings:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Add environment variables in Render's dashboard:
   - `GEMINI_API_KEY`: (Your Google AI Studio Gemini API Key)
   - `NODE_ENV`: `production`
   - `PORT`: `3000`

Enjoy CineSorbet!
