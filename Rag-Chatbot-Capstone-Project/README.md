# University RAG Chatbot

A Retrieval-Augmented Generation (RAG) chatbot that answers questions about ABC University using its own knowledge base instead of relying only on the LLM's memory.

## How it works
1. The university document (`data/university.txt`) is loaded and split into chunks.
2. Each chunk is converted into an embedding using a sentence-transformers model.
3. The embeddings are stored in a FAISS vector database.
4. When a user asks a question, it is embedded and compared against the stored chunks to find the most relevant ones.
5. The retrieved chunks are inserted into a prompt and sent to an LLM to generate the final answer.

## Project Structure
```
RAG_Chatbot/
├── data/
│   └── university.txt
├── vector_db/          (created after running ingest.py)
├── ingest.py
├── rag_chatbot.py
├── app.py
├── requirements.txt
└── README.md
```

## Setup

1. Create and activate a virtual environment
```
python -m venv venv
venv\Scripts\activate      (Windows)
source venv/bin/activate   (Linux/Mac)
```

2. Install dependencies
```
pip install -r requirements.txt
```

3. (Optional) Set your Gemini API key to get actual generated answers instead of just the raw retrieved context. Get a free key at https://aistudio.google.com/apikey (no billing required).
```
set GEMINI_API_KEY=your_key_here       (Windows)
export GEMINI_API_KEY=your_key_here    (Linux/Mac)
```

## Usage

1. Build the vector database (run this once, or whenever you update `data/university.txt`)
```
python ingest.py
```

2. Chat from the terminal
```
python rag_chatbot.py
```

3. Or launch the web interface
```
streamlit run app.py
```

## Example
```
You: What is the hostel fee?
Bot: The hostel fee is Rs. 20,000 per semester.
```

## Notes
- If `GEMINI_API_KEY` is not set, the chatbot will show the retrieved context instead of a generated answer.
- Add more documents to `data/` and update `ingest.py` to build a larger knowledge base.
- The web interface uses a pastel color theme (soft lavender background, pink user bubbles, mint bot bubbles).

## Deploying on Render

1. Push this project to a GitHub repository (`vector_db/` and `venv/` are excluded via `.gitignore` since they're rebuilt on deploy).
2. On Render, create a new **Web Service** and connect your GitHub repo.
3. Set the following:
   - **Build Command:** `pip install -r requirements.txt && python ingest.py`
   - **Start Command:** (already set in the `Procfile`, Render picks it up automatically)
4. Under **Environment**, add an environment variable:
   - `GEMINI_API_KEY` = your Gemini key
5. Deploy. Render will build the vector database during the build step and start the Streamlit app using the `Procfile`.
6. Once deployed, Render gives you a public URL like `https://your-app-name.onrender.com`.
