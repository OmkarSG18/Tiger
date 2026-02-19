"""
Synthetic Data Generator for Alternative Credit Scoring Engine
Generates ~400 records across 8 underbanked roles with realistic behavioral patterns.
"""
import pandas as pd
import numpy as np
import os

np.random.seed(42)

ROLES = [
    "Street Vendor",
    "Domestic Worker",
    "Freelancer",
    "Migrant Worker",
    "Kirana Store Owner",
    "Gig Worker",
    "College Student",
    "Rural Farmer"
]

# Role-specific parameter distributions
ROLE_PARAMS = {
    "Street Vendor": {
        "income": (8000, 25000),
        "upi_txn": (40, 120),
        "upi_avg": (50, 300),
        "utility_paid": (3, 6),
        "utility_reg": (0.4, 0.8),
        "mobile_recharge": (2, 8),
        "rent": (2000, 6000),
        "savings": (1000, 30000),
        "loan_repay": (0.0, 0.7),
        "digital_fp": (10, 50),
        "social_media": (0, 30),
        "education": [0, 1, 1, 1, 2],
        "employment_stability": (0.2, 0.6),
        "family_size": (3, 7),
        "age": (22, 55),
        "device": ["basic", "basic", "smartphone", "smartphone"],
        "location": ["urban", "urban", "semi-urban"],
        "bank_age": (0, 5),
        "fin_products": (0, 2),
        "insurance": [0, 0, 0, 1],
        "remittance": (0, 3),
        "govt_subsidy": [0, 0, 1],
        "ecommerce": (0, 15),
        "peer_lending": (0.0, 0.5),
        "app_usage": (0.5, 3.0),
        "creditworthy_bias": 0.55,
    },
    "Domestic Worker": {
        "income": (5000, 18000),
        "upi_txn": (5, 30),
        "upi_avg": (100, 500),
        "utility_paid": (4, 6),
        "utility_reg": (0.6, 0.95),
        "mobile_recharge": (1, 4),
        "rent": (1500, 5000),
        "savings": (500, 20000),
        "loan_repay": (0.0, 0.6),
        "digital_fp": (5, 25),
        "social_media": (0, 15),
        "education": [0, 0, 1, 1],
        "employment_stability": (0.5, 0.9),
        "family_size": (3, 6),
        "age": (25, 55),
        "device": ["basic", "basic", "smartphone"],
        "location": ["urban", "urban", "semi-urban"],
        "bank_age": (0, 8),
        "fin_products": (0, 1),
        "insurance": [0, 0, 0, 1],
        "remittance": (0, 2),
        "govt_subsidy": [0, 1, 1],
        "ecommerce": (0, 5),
        "peer_lending": (0.0, 0.4),
        "app_usage": (0.2, 1.5),
        "creditworthy_bias": 0.50,
    },
    "Freelancer": {
        "income": (15000, 80000),
        "upi_txn": (20, 80),
        "upi_avg": (200, 2000),
        "utility_paid": (4, 6),
        "utility_reg": (0.5, 0.9),
        "mobile_recharge": (1, 4),
        "rent": (5000, 20000),
        "savings": (5000, 100000),
        "loan_repay": (0.2, 0.9),
        "digital_fp": (40, 90),
        "social_media": (30, 80),
        "education": [2, 2, 3, 3, 3],
        "employment_stability": (0.3, 0.7),
        "family_size": (1, 4),
        "age": (22, 40),
        "device": ["smartphone", "smartphone", "smartphone"],
        "location": ["urban", "urban", "semi-urban"],
        "bank_age": (1, 10),
        "fin_products": (1, 4),
        "insurance": [0, 1, 1],
        "remittance": (0, 2),
        "govt_subsidy": [0, 0, 0],
        "ecommerce": (10, 60),
        "peer_lending": (0.2, 0.8),
        "app_usage": (2.0, 8.0),
        "creditworthy_bias": 0.70,
    },
    "Migrant Worker": {
        "income": (7000, 20000),
        "upi_txn": (5, 25),
        "upi_avg": (100, 800),
        "utility_paid": (2, 5),
        "utility_reg": (0.3, 0.7),
        "mobile_recharge": (3, 10),
        "rent": (1000, 4000),
        "savings": (500, 15000),
        "loan_repay": (0.0, 0.5),
        "digital_fp": (5, 30),
        "social_media": (5, 25),
        "education": [0, 0, 1, 1],
        "employment_stability": (0.1, 0.5),
        "family_size": (4, 8),
        "age": (20, 50),
        "device": ["basic", "smartphone", "smartphone"],
        "location": ["urban", "semi-urban", "rural"],
        "bank_age": (0, 3),
        "fin_products": (0, 1),
        "insurance": [0, 0, 0],
        "remittance": (4, 12),
        "govt_subsidy": [0, 0, 1],
        "ecommerce": (0, 10),
        "peer_lending": (0.0, 0.3),
        "app_usage": (0.5, 2.5),
        "creditworthy_bias": 0.45,
    },
    "Kirana Store Owner": {
        "income": (15000, 50000),
        "upi_txn": (50, 200),
        "upi_avg": (100, 1000),
        "utility_paid": (5, 6),
        "utility_reg": (0.7, 0.98),
        "mobile_recharge": (1, 4),
        "rent": (3000, 12000),
        "savings": (10000, 80000),
        "loan_repay": (0.3, 0.9),
        "digital_fp": (20, 60),
        "social_media": (5, 30),
        "education": [1, 1, 2, 2],
        "employment_stability": (0.6, 0.95),
        "family_size": (3, 6),
        "age": (28, 55),
        "device": ["smartphone", "smartphone"],
        "location": ["urban", "semi-urban", "semi-urban"],
        "bank_age": (2, 15),
        "fin_products": (1, 3),
        "insurance": [0, 1, 1],
        "remittance": (0, 2),
        "govt_subsidy": [0, 0, 1],
        "ecommerce": (5, 30),
        "peer_lending": (0.3, 0.7),
        "app_usage": (1.0, 4.0),
        "creditworthy_bias": 0.72,
    },
    "Gig Worker": {
        "income": (10000, 35000),
        "upi_txn": (30, 100),
        "upi_avg": (100, 600),
        "utility_paid": (3, 6),
        "utility_reg": (0.4, 0.8),
        "mobile_recharge": (2, 6),
        "rent": (3000, 10000),
        "savings": (2000, 30000),
        "loan_repay": (0.1, 0.7),
        "digital_fp": (30, 70),
        "social_media": (20, 60),
        "education": [1, 2, 2, 3],
        "employment_stability": (0.2, 0.5),
        "family_size": (1, 4),
        "age": (20, 35),
        "device": ["smartphone", "smartphone"],
        "location": ["urban", "urban", "semi-urban"],
        "bank_age": (0, 5),
        "fin_products": (0, 2),
        "insurance": [0, 0, 1],
        "remittance": (0, 3),
        "govt_subsidy": [0, 0, 0],
        "ecommerce": (10, 40),
        "peer_lending": (0.1, 0.6),
        "app_usage": (3.0, 8.0),
        "creditworthy_bias": 0.58,
    },
    "College Student": {
        "income": (0, 10000),
        "upi_txn": (15, 60),
        "upi_avg": (50, 300),
        "utility_paid": (1, 4),
        "utility_reg": (0.3, 0.7),
        "mobile_recharge": (2, 6),
        "rent": (2000, 8000),
        "savings": (0, 15000),
        "loan_repay": (0.0, 0.3),
        "digital_fp": (50, 95),
        "social_media": (40, 90),
        "education": [2, 3, 3],
        "employment_stability": (0.0, 0.3),
        "family_size": (1, 2),
        "age": (18, 25),
        "device": ["smartphone", "smartphone"],
        "location": ["urban", "urban", "semi-urban"],
        "bank_age": (0, 3),
        "fin_products": (0, 1),
        "insurance": [0, 0, 1],
        "remittance": (0, 1),
        "govt_subsidy": [0, 0, 1],
        "ecommerce": (15, 50),
        "peer_lending": (0.0, 0.4),
        "app_usage": (3.0, 10.0),
        "creditworthy_bias": 0.40,
    },
    "Rural Farmer": {
        "income": (5000, 25000),
        "upi_txn": (2, 20),
        "upi_avg": (200, 2000),
        "utility_paid": (2, 5),
        "utility_reg": (0.3, 0.7),
        "mobile_recharge": (1, 4),
        "rent": (0, 2000),
        "savings": (2000, 40000),
        "loan_repay": (0.1, 0.7),
        "digital_fp": (2, 20),
        "social_media": (0, 15),
        "education": [0, 0, 1, 1],
        "employment_stability": (0.3, 0.7),
        "family_size": (4, 8),
        "age": (25, 60),
        "device": ["basic", "basic", "smartphone"],
        "location": ["rural", "rural", "semi-urban"],
        "bank_age": (1, 10),
        "fin_products": (0, 2),
        "insurance": [0, 0, 1, 1],
        "remittance": (0, 2),
        "govt_subsidy": [1, 1, 1, 0],
        "ecommerce": (0, 5),
        "peer_lending": (0.1, 0.5),
        "app_usage": (0.2, 2.0),
        "creditworthy_bias": 0.52,
    },
}


def generate_role_data(role, n=50):
    """Generate n synthetic records for a given role."""
    p = ROLE_PARAMS[role]
    records = []
    for _ in range(n):
        income = int(np.random.uniform(*p["income"]))
        savings = int(np.random.uniform(*p["savings"]))
        upi_txn = int(np.random.uniform(*p["upi_txn"]))
        utility_reg = round(np.random.uniform(*p["utility_reg"]), 2)
        loan_repay = round(np.random.uniform(*p["loan_repay"]), 2)
        employment_stab = round(np.random.uniform(*p["employment_stability"]), 2)

        # Creditworthiness is a weighted function of key signals + randomness
        score = (
            0.20 * min(income / 50000, 1) +
            0.15 * utility_reg +
            0.15 * loan_repay +
            0.15 * employment_stab +
            0.10 * min(savings / 50000, 1) +
            0.10 * min(upi_txn / 100, 1) +
            0.15 * np.random.uniform(0, 1)
        )
        creditworthy = 1 if score >= (1 - p["creditworthy_bias"]) else 0

        record = {
            "INCOME": income,
            "UPI_TRANSACTIONS": upi_txn,
            "UPI_AVG_AMOUNT": int(np.random.uniform(*p["upi_avg"])),
            "UTILITY_BILLS_PAID": int(np.random.uniform(*p["utility_paid"])),
            "UTILITY_REGULARITY": utility_reg,
            "MOBILE_RECHARGE_FREQ": int(np.random.uniform(*p["mobile_recharge"])),
            "RENT_PAYMENT": int(np.random.uniform(*p["rent"])),
            "SAVINGS_BALANCE": savings,
            "LOAN_REPAYMENT_HISTORY": loan_repay,
            "DIGITAL_FOOTPRINT": int(np.random.uniform(*p["digital_fp"])),
            "SOCIAL_MEDIA_ACTIVITY": int(np.random.uniform(*p["social_media"])),
            "EDUCATION_LEVEL": np.random.choice(p["education"]),
            "EMPLOYMENT_STABILITY": employment_stab,
            "FAMILY_SIZE": int(np.random.uniform(*p["family_size"])),
            "AGE": int(np.random.uniform(*p["age"])),
            "GENDER": np.random.choice(["M", "F"]),
            "LOCATION_TYPE": np.random.choice(p["location"]),
            "DEVICE_TYPE": np.random.choice(p["device"]),
            "APP_USAGE_HOURS": round(np.random.uniform(*p["app_usage"]), 1),
            "BANK_ACCOUNT_AGE": round(np.random.uniform(*p["bank_age"]), 1),
            "NUM_FINANCIAL_PRODUCTS": int(np.random.uniform(*p["fin_products"])),
            "INSURANCE_STATUS": np.random.choice(p["insurance"]),
            "REMITTANCE_FREQUENCY": int(np.random.uniform(*p["remittance"])),
            "GOVT_SUBSIDY_RECIPIENT": np.random.choice(p["govt_subsidy"]),
            "E_COMMERCE_ACTIVITY": int(np.random.uniform(*p["ecommerce"])),
            "PEER_LENDING_SCORE": round(np.random.uniform(*p["peer_lending"]), 2),
            "ROLE": role,
            "CREDIT_WORTHY": creditworthy,
        }
        records.append(record)
    return records


def main():
    all_records = []
    for role in ROLES:
        records = generate_role_data(role, n=50)
        all_records.extend(records)
        worthy = sum(r["CREDIT_WORTHY"] for r in records)
        print(f"  {role}: {len(records)} records, {worthy} creditworthy ({worthy*2}%)")

    df = pd.DataFrame(all_records)
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)

    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "alternative_credit_data.csv")
    df.to_csv(out_path, index=False)
    print(f"\nGenerated {len(df)} records -> {out_path}")
    print(f"Columns: {list(df.columns)}")
    print(f"Credit worthy distribution:\n{df['CREDIT_WORTHY'].value_counts()}")


if __name__ == "__main__":
    main()
