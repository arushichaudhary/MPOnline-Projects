"""
train_model.py
Trains a car price prediction model and saves it to model/car_price_model.pkl
Run this once before starting the Flask app (already run before deployment,
the .pkl file is included in the project).
"""

import pandas as pd
import pickle
import json

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error

data = pd.read_csv("car_data.csv")

X = data[["company", "model", "year", "kms_driven", "fuel_type", "owner", "transmission"]]
y = data["price"]

categorical_features = ["company", "model", "fuel_type", "owner", "transmission"]
numeric_features = ["year", "kms_driven"]

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ],
    remainder="passthrough",
)

model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("regressor", RandomForestRegressor(n_estimators=80, max_depth=12, random_state=42)),
    ]
)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)

model.fit(X_train, y_train)

pred = model.predict(X_test)
print("R2 score :", round(r2_score(y_test, pred), 4))
print("MAE      :", round(mean_absolute_error(y_test, pred), 2))

with open("model/car_price_model.pkl", "wb") as f:
    pickle.dump(model, f)

# Save company -> models mapping + year range so the frontend dropdowns
# always stay in sync with what the model was trained on.
company_models = (
    data.groupby("company")["model"].unique().apply(lambda x: sorted(x.tolist())).to_dict()
)

meta = {
    "companies": sorted(company_models.keys()),
    "company_models": company_models,
    "fuel_types": sorted(data["fuel_type"].unique().tolist()),
    "owners": sorted(data["owner"].unique().tolist()),
    "transmissions": sorted(data["transmission"].unique().tolist()),
    "year_min": int(data["year"].min()),
    "year_max": 2025,
}

with open("model/meta.json", "w") as f:
    json.dump(meta, f, indent=2)

print("Saved model/car_price_model.pkl and model/meta.json")
