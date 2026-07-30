# MP Online Projects

A collection of machine learning, deep learning, and reinforcement
learning projects covering classical ML, CNNs, RL agents, recommendation
systems, and full-stack AI app deployment — completed as part of the
MP Online course/program.

Each project lives in its own folder with a dedicated `README.md`
containing full details (dataset, architecture, how to run, and
results).

## Projects

| # | Project | Type | Key Result | Folder |
|---|---|---|---|---|
| 1 | [Adult Census Income Classification](./Adult-Census-Income-Classification) | Classical ML (classification) | Random Forest — 85.7% accuracy, 0.912 ROC-AUC | `Adult-Census-Income-Classification/` |
| 2 | [CIFAR-10 Image Classification](./Cifar-10-Image-Classification-CNN) | Deep Learning (CNN) | ~80% test accuracy | `Cifar-10-Image-Classification-CNN/` |
| 3 | [Face Recognition on LFW](./Face-Recognition-Using-CNN) | Deep Learning (CNN) | 90% accuracy (closed-set recognition) | `Face-Recognition-Using-CNN/` |
| 4 | [Brain Tumor Detection from MRI](./Cancer-Detection-using-MRI-images) | Deep Learning (CNN) | 88% test accuracy (4-class) | `Cancer-Detection-using-MRI-images/` |
| 5 | [CartPole RL Agent](./cartpole-and-lunarlander/cartpole-rl) | Reinforcement Learning (DQN) | Solved (avg reward 475+/500) | `cartpole-and-lunarlander/cartpole-rl/` |
| 6 | [LunarLander RL Agent](./cartpole-and-lunarlander/lunarlander/lunarlander-rl) | Reinforcement Learning (DQN) | Solved (avg reward 200+) | `cartpole-and-lunarlander/lunarlander/lunarlander-rl/` |
| 7 | [CineSorbet Movie Recommender](./cinesorbet) | Recommendation System + LLM | Content/collaborative filtering + Gemini AI matchmaker | `cinesorbet/` |
| 8 | [Car Price Predictor — End-to-End Render Deployment](./Car-Price-Prediction/car_price_predictor) | Classical ML + Full-Stack Deployment | Random Forest — R² 0.978, MAE ≈ ₹16.8k | `Car-Price-Prediction/car_price_predictor/` |
| 9 | [RAG Chatbot (Capstone Project)](./Rag-Chatbot-Capstone-Project) | Generative AI (RAG) | FAISS + sentence-transformers + Gemini, deployed on Render | `Rag-Chatbot-Capstone-Project/` |

## Project Summaries

**1. Adult Census Income Classification** — Predicts whether an
individual earns above $50K/year from census data, comparing Logistic
Regression, Decision Tree, Random Forest, KNN, and SVM.

**2. CIFAR-10 Image Classification** — A CNN trained from scratch (no
pretrained backbone or augmentation) to classify 32x32 images into 10
object categories.

**3. Face Recognition (LFW)** — A CNN trained to identify individuals
(closed-set classification) from the Labeled Faces in the Wild dataset,
using batch norm and data augmentation to compensate for limited
images per person.

**4. Brain Tumor Detection from MRI** — A CNN that classifies brain MRI
scans into glioma, meningioma, pituitary tumor, or no tumor.

**5 & 6. CartPole & LunarLander RL Agents** — Deep Q-Network (DQN)
agents implemented from scratch in PyTorch (replay buffer, target
network, epsilon-greedy exploration), trained to solve two classic
Gymnasium control environments.

**7. CineSorbet** — A React/TypeScript movie recommendation web app
combining content-based and collaborative filtering with a server-side
Gemini AI "sommelier" for conversational film matchmaking.

**8. Car Price Predictor** — A Random Forest regression model wrapped in
a Flask app, packaged with `render.yaml`/`Procfile`/`gunicorn` for a full
end-to-end deployment on Render — the focus is the complete pipeline
from model to live web service, not just the model itself.

**9. RAG Chatbot (Capstone Project)** — A Retrieval-Augmented Generation
chatbot that answers questions about a university using its own
document knowledge base: chunking → sentence-transformer embeddings →
FAISS retrieval → Gemini-generated answers, with a Streamlit UI and
Render deployment.

## Tech Stack Overview

| Category | Tools/Libraries |
|---|---|
| Classical ML | scikit-learn, pandas, NumPy |
| Deep Learning | PyTorch, torchvision |
| Reinforcement Learning | Gymnasium, PyTorch (DQN from scratch) |
| Generative AI / RAG | sentence-transformers, FAISS, Gemini API, LangChain-style pipeline |
| Web/App Deployment | Flask, Streamlit, React, Express, Render, Vercel |
| Visualization | Matplotlib, Seaborn |

## Repository Structure

```
MPOnline-Projects/
├── Adult-Census-Income-Classification/
├── Cifar-10-Image-Classification-CNN/
├── Face-Recognition-Using-CNN/
├── Cancer-Detection-using-MRI-images/
├── cartpole-and-lunarlander/
│   ├── cartpole-rl/
│   └── lunarlander/
│       └── lunarlander-rl/
├── cinesorbet/
├── Car-Price-Prediction/
│   └── car_price_predictor/
└── Rag-Chatbot-Capstone-Project/
```

## How to Use This Repo

Each folder is a self-contained project with its own `README.md`,
`requirements.txt` (or `package.json`), and setup/run instructions.
Navigate into any project folder and follow its README to reproduce
results, retrain models, or run the app locally.

```bash
git clone https://github.com/arushichaudhary/MPOnline-Projects.git
cd MPOnline-Projects/<project-folder>
# follow that project's README
```

## Author

Arushi Chaudhary
