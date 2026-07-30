"""
generate_data.py
Creates a synthetic (but realistic) used-car dataset and saves it as car_data.csv
"""

import random
import csv

random.seed(42)

cars = {
    "Maruti": {
        "models": ["Swift", "Baleno", "Alto", "WagonR", "Dzire", "Ertiga"],
        "base_price": 500000,
    },
    "Hyundai": {
        "models": ["i20", "Creta", "Verna", "Venue", "Grand i10", "Santro"],
        "base_price": 650000,
    },
    "Honda": {
        "models": ["City", "Amaze", "Jazz", "WR-V", "Civic"],
        "base_price": 750000,
    },
    "Toyota": {
        "models": ["Innova", "Fortuner", "Glanza", "Yaris", "Etios"],
        "base_price": 950000,
    },
    "Tata": {
        "models": ["Nexon", "Harrier", "Tiago", "Altroz", "Safari"],
        "base_price": 600000,
    },
    "Mahindra": {
        "models": ["XUV500", "Scorpio", "Bolero", "Thar", "XUV300"],
        "base_price": 700000,
    },
    "Ford": {
        "models": ["EcoSport", "Figo", "Endeavour", "Aspire"],
        "base_price": 680000,
    },
    "Volkswagen": {
        "models": ["Polo", "Vento", "Ameo", "Taigun"],
        "base_price": 720000,
    },
    "Skoda": {
        "models": ["Rapid", "Octavia", "Superb", "Kushaq"],
        "base_price": 850000,
    },
    "Renault": {
        "models": ["Kwid", "Duster", "Triber", "Kiger"],
        "base_price": 480000,
    },
}

fuel_types = ["Petrol", "Diesel", "CNG"]
fuel_multiplier = {"Petrol": 1.0, "Diesel": 1.08, "CNG": 0.92}

owner_types = ["First Owner", "Second Owner", "Third Owner"]
owner_multiplier = {"First Owner": 1.0, "Second Owner": 0.87, "Third Owner": 0.75}

transmission_types = ["Manual", "Automatic"]
transmission_multiplier = {"Manual": 1.0, "Automatic": 1.12}

rows = []

for company, info in cars.items():
    for model in info["models"]:
        for _ in range(60):  # 60 synthetic listings per model
            year = random.randint(2005, 2023)
            age = 2024 - year
            kms_driven = int(random.gauss(15000 * age + 5000, 8000))
            kms_driven = max(500, kms_driven)
            fuel = random.choice(fuel_types)
            owner = random.choices(owner_types, weights=[0.55, 0.3, 0.15])[0]
            transmission = random.choices(transmission_types, weights=[0.75, 0.25])[0]

            depreciation = max(0.15, 1 - 0.055 * age)
            km_penalty = max(0.55, 1 - (kms_driven / 300000))

            price = (
                info["base_price"]
                * depreciation
                * km_penalty
                * fuel_multiplier[fuel]
                * owner_multiplier[owner]
                * transmission_multiplier[transmission]
            )
            price *= random.uniform(0.92, 1.08)  # market noise
            price = max(35000, round(price, -2))

            rows.append(
                [company, model, year, kms_driven, fuel, owner, transmission, int(price)]
            )

with open("car_data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(
        ["company", "model", "year", "kms_driven", "fuel_type", "owner", "transmission", "price"]
    )
    writer.writerows(rows)

print(f"Generated {len(rows)} rows -> car_data.csv")
