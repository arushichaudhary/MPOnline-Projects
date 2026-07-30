import json
import pickle

import pandas as pd
from flask import Flask, render_template, request

app = Flask(__name__)

with open("model/car_price_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("model/meta.json", "r") as f:
    meta = json.load(f)


def format_price(value):
    value = round(value)
    if value >= 100000:
        lakhs = value / 100000
        return f"₹{lakhs:.2f} Lakh"
    return f"₹{value:,}"


@app.route("/", methods=["GET"])
def home():
    return render_template(
        "index.html",
        companies=meta["companies"],
        company_models=meta["company_models"],
        fuel_types=meta["fuel_types"],
        owners=meta["owners"],
        transmissions=meta["transmissions"],
        year_min=meta["year_min"],
        year_max=meta["year_max"],
        prediction=None,
    )


@app.route("/predict", methods=["POST"])
def predict():
    try:
        company = request.form["company"]
        car_model = request.form["car_model"]
        year = int(request.form["year"])
        kms_driven = int(request.form["kms_driven"])
        fuel_type = request.form["fuel_type"]
        owner = request.form["owner"]
        transmission = request.form["transmission"]

        input_df = pd.DataFrame(
            [[company, car_model, year, kms_driven, fuel_type, owner, transmission]],
            columns=["company", "model", "year", "kms_driven", "fuel_type", "owner", "transmission"],
        )

        predicted_price = model.predict(input_df)[0]
        predicted_price = max(predicted_price, 20000)

        prediction = {
            "value": format_price(predicted_price),
            "raw": round(predicted_price),
            "company": company,
            "car_model": car_model,
            "year": year,
            "kms_driven": kms_driven,
            "fuel_type": fuel_type,
            "owner": owner,
            "transmission": transmission,
        }

        return render_template(
            "index.html",
            companies=meta["companies"],
            company_models=meta["company_models"],
            fuel_types=meta["fuel_types"],
            owners=meta["owners"],
            transmissions=meta["transmissions"],
            year_min=meta["year_min"],
            year_max=meta["year_max"],
            prediction=prediction,
            form=request.form,
        )

    except Exception as e:
        return render_template(
            "index.html",
            companies=meta["companies"],
            company_models=meta["company_models"],
            fuel_types=meta["fuel_types"],
            owners=meta["owners"],
            transmissions=meta["transmissions"],
            year_min=meta["year_min"],
            year_max=meta["year_max"],
            prediction=None,
            error=str(e),
        )


if __name__ == "__main__":
    app.run(debug=True)
