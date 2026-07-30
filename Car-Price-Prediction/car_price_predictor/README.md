# Car Price Prediction — End-to-End Render Deployment

An end-to-end machine learning web app: a Random Forest model predicts the
resale price of a used car from its company, model, year, kilometers
driven, fuel type, ownership, and transmission — served through a Flask
web app and deployed live on Render.

This project focuses on the **full pipeline**, not just the model: data →
training → serialized model → Flask backend → HTML frontend → deployment
config (`render.yaml`, `Procfile`, `gunicorn`).

## Dataset

- `car_data.csv` — 2,880 used car listings across 10 companies (Ford,
  Honda, Hyundai, Mahindra, Maruti, Renault, Skoda, Tata, Toyota,
  Volkswagen) and their respective models, generated via
  `generate_data.py`.
- Features: `company`, `model`, `year`, `kms_driven`, `fuel_type`,
  `owner`, `transmission`
- Target: `price` (INR)

## Model

- **Pipeline:** `ColumnTransformer` (One-Hot Encoding on categorical
  features) → `RandomForestRegressor` (`n_estimators=80`, `max_depth=12`)
- **Train/test split:** 85/15
- Trained model is serialized to `model/car_price_model.pkl`;
  `model/meta.json` stores the dropdown options (companies, models per
  company, fuel types, owners, transmissions, year range) so the frontend
  always stays in sync with what the model was trained on.

## Results

| Metric | Value |
|---|---|
| R² score | **0.978** |
| MAE | **≈ ₹16,792** |

(Test set price range: ₹35,000 – ₹10,24,900, mean ≈ ₹2,22,000 — so an MAE
of ~₹16.8k represents a fairly tight error band relative to the price
spread.)

## Project Structure

```
car_price_predictor/
├── app.py                 # Flask app (routes: / and /predict)
├── train_model.py          # Trains the model, saves .pkl + meta.json
├── generate_data.py         # Generates the synthetic car_data.csv
├── car_data.csv
├── model/
│   ├── car_price_model.pkl
│   └── meta.json
├── templates/
│   └── index.html
├── static/
│   └── style.css
├── requirements.txt
├── render.yaml             # Render deployment config
├── Procfile                # gunicorn start command
└── .gitignore
```

## How to Run Locally

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. (Optional) Retrain the model — a trained `.pkl` is already included:
   ```bash
   python train_model.py
   ```
3. Start the Flask app:
   ```bash
   python app.py
   ```
4. Open `http://127.0.0.1:5000` and fill in the car details to get a
   predicted price.

## Deploying on Render

This repo is already configured for Render via `render.yaml` and
`Procfile`:

1. Push the project to a GitHub repository.
2. On Render, create a new **Web Service** from `render.yaml` (Render
   auto-detects it), or set manually:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Plan:** Free
3. Deploy. Render builds the environment and serves the Flask app behind
   `gunicorn`, giving a public URL like
   `https://car-price-predictor.onrender.com`.

## Notes

- Prices are synthetic/generated for demo purposes — not real market
  data — so predictions should be treated as a proof of concept for the
  deployment pipeline rather than real valuations.
