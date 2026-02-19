"""
Flask REST API for Alternative Credit Scoring Engine (CredAlt)
Serves ML predictions and financial goal planning.
"""
import os
import json
import math
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="webapp", static_url_path="")
CORS(app)

# ── Load Model Artifacts ──────────────────────────────────────────────
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model")

model = joblib.load(os.path.join(MODEL_DIR, "credit_scoring_model.pkl"))
label_encoders = joblib.load(os.path.join(MODEL_DIR, "label_encoders.pkl"))
feature_columns = joblib.load(os.path.join(MODEL_DIR, "feature_columns.pkl"))
feature_defaults = joblib.load(os.path.join(MODEL_DIR, "feature_defaults.pkl"))

print(f"[CredAlt] Model loaded with {len(feature_columns)} features")

# ── Feature category mapping for score breakdown ──────────────────────
FEATURE_CATEGORIES = {
    "Payment Behavior": ["UPI_TRANSACTIONS", "UPI_AVG_AMOUNT", "LOAN_REPAYMENT_HISTORY"],
    "Utility & Rent": ["UTILITY_BILLS_PAID", "UTILITY_REGULARITY", "RENT_PAYMENT"],
    "Financial Health": ["INCOME", "SAVINGS_BALANCE", "NUM_FINANCIAL_PRODUCTS", "INSURANCE_STATUS"],
    "Digital Presence": ["DIGITAL_FOOTPRINT", "SOCIAL_MEDIA_ACTIVITY", "APP_USAGE_HOURS", "E_COMMERCE_ACTIVITY"],
    "Stability": ["EMPLOYMENT_STABILITY", "BANK_ACCOUNT_AGE", "AGE", "FAMILY_SIZE"],
    "Community & Support": ["REMITTANCE_FREQUENCY", "GOVT_SUBSIDY_RECIPIENT", "PEER_LENDING_SCORE", "MOBILE_RECHARGE_FREQ"],
}

# Feature importances from trained model
feature_importances = dict(zip(feature_columns, model.feature_importances_))


def compute_credit_score(probability):
    """Convert model probability to a 300-900 credit score."""
    return int(300 + probability * 600)


def get_risk_category(score):
    """Map score to risk category."""
    if score >= 750:
        return "Excellent"
    elif score >= 650:
        return "Good"
    elif score >= 550:
        return "Fair"
    else:
        return "Poor"


def get_contributing_factors(input_data):
    """Calculate category-level contribution scores."""
    factors = []
    for category, features in FEATURE_CATEGORIES.items():
        total_importance = 0
        feature_details = []
        for feat in features:
            if feat in feature_importances:
                imp = feature_importances[feat]
                total_importance += imp
                val = input_data.get(feat, feature_defaults.get(feat, 0))
                feature_details.append({
                    "name": feat.replace("_", " ").title(),
                    "value": val,
                    "importance": round(imp, 4)
                })
        # Normalize to 0-100
        score = min(100, int(total_importance * 500))
        factors.append({
            "category": category,
            "score": score,
            "features": feature_details
        })
    factors.sort(key=lambda x: x["score"], reverse=True)
    return factors


# ── Routes ────────────────────────────────────────────────────────────

@app.route("/")
def serve_index():
    return send_from_directory("webapp", "index.html")


@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory("webapp", path)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "model_features": len(feature_columns),
        "engine": "CredAlt v2.0"
    })


@app.route("/predict", methods=["POST"])
def predict():
    """Score a user profile using the ML model."""
    try:
        data = request.get_json(force=True)

        # Build feature vector with defaults
        input_data = {}
        for col in feature_columns:
            if col in data:
                val = data[col]
                # Handle categorical encoding
                if col in label_encoders:
                    le = label_encoders[col]
                    if val in le.classes_:
                        val = le.transform([val])[0]
                    else:
                        val = feature_defaults[col]
                input_data[col] = val
            else:
                input_data[col] = feature_defaults[col]

        # Create DataFrame for prediction
        df = pd.DataFrame([input_data], columns=feature_columns)
        probability = model.predict_proba(df)[0][1]  # P(creditworthy)
        credit_score = compute_credit_score(probability)
        risk_category = get_risk_category(credit_score)

        # Generate CIBIL comparison
        cibil_score = "NH"  # No History for underbanked
        if data.get("LOAN_REPAYMENT_HISTORY", 0) > 0.3:
            cibil_score = max(300, int(credit_score * 0.6 - 10))

        cibil_status = "No History"
        if isinstance(cibil_score, int):
            cibil_status = "Rejected" if cibil_score < 600 else "Marginal"

        factors = get_contributing_factors(data)

        return jsonify({
            "credit_score": credit_score,
            "probability": round(float(probability), 4),
            "risk_category": risk_category,
            "contributing_factors": factors,
            "cibil_comparison": {
                "cibil_score": cibil_score,
                "cibil_status": cibil_status,
                "credalt_score": credit_score,
                "credalt_status": "Approved" if credit_score >= 500 else "Review Required"
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/goal-plan", methods=["POST"])
def goal_plan():
    """Generate a financial goal roadmap."""
    try:
        data = request.get_json(force=True)

        goal = data.get("goal", "Buy a Car")
        target_amount = float(data.get("target_amount", 500000))
        timeline_months = int(data.get("timeline_months", 24))
        current_income = float(data.get("current_income", 20000))
        current_savings = float(data.get("current_savings", 10000))
        current_score = int(data.get("credit_score", 550))
        role = data.get("role", "General")

        remaining = max(0, target_amount - current_savings)
        monthly_savings_needed = remaining / max(timeline_months, 1)
        savings_ratio = monthly_savings_needed / max(current_income, 1)

        # Determine feasibility
        if savings_ratio > 0.5:
            feasibility = "Challenging"
            feasibility_note = "This goal requires saving over 50% of your income. Consider extending the timeline or exploring financing options."
        elif savings_ratio > 0.3:
            feasibility = "Moderate"
            feasibility_note = "Achievable with disciplined saving. A loan could ease the monthly burden."
        else:
            feasibility = "Achievable"
            feasibility_note = "Well within your reach with consistent saving!"

        # Score milestones
        target_score = 700 if target_amount > 300000 else 600
        score_gap = max(0, target_score - current_score)
        monthly_score_improvement = score_gap / max(timeline_months, 1)

        # Loan component
        loan_amount = max(0, remaining - (monthly_savings_needed * timeline_months * 0.5))
        emi = 0
        if loan_amount > 0 and timeline_months > 6:
            rate = 0.12 / 12  # 12% annual
            n = min(timeline_months, 60)
            emi = loan_amount * rate * (1 + rate)**n / ((1 + rate)**n - 1)

        # Build phases
        phase1_months = max(3, timeline_months // 4)
        phase2_months = max(3, timeline_months // 4)
        phase3_months = timeline_months - phase1_months - phase2_months

        phases = [
            {
                "name": "Build Foundation",
                "duration": f"{phase1_months} months",
                "icon": "🏗️",
                "tasks": [
                    "Open a savings account if you don't have one",
                    f"Start saving ₹{int(monthly_savings_needed * 0.7):,}/month",
                    "Set up auto-debit for utility bills",
                    "Begin building UPI transaction history"
                ],
                "target_score": current_score + int(score_gap * 0.3)
            },
            {
                "name": "Strengthen Credit",
                "duration": f"{phase2_months} months",
                "icon": "📈",
                "tasks": [
                    f"Increase savings to ₹{int(monthly_savings_needed):,}/month",
                    "Apply for a small personal loan or credit line",
                    "Maintain 100% bill payment regularity",
                    "Grow your digital financial footprint"
                ],
                "target_score": current_score + int(score_gap * 0.7)
            },
            {
                "name": "Achieve Goal",
                "duration": f"{phase3_months} months",
                "icon": "🎯",
                "tasks": [
                    f"Target savings balance: ₹{int(target_amount * 0.4):,}",
                    f"Apply for {goal} financing with improved score",
                    "Compare loan offers from multiple lenders",
                    "Complete your purchase! 🎉"
                ],
                "target_score": target_score
            }
        ]

        # Role-specific tips
        role_tips = {
            "Street Vendor": [
                "Use UPI for all customer payments to build transaction history",
                "Get a micro-enterprise loan to demonstrate repayment ability",
                "Register with local vendor associations for credibility"
            ],
            "Domestic Worker": [
                "Request salary via bank transfer instead of cash",
                "Save regularly using recurring deposits",
                "Get employer references for loan applications"
            ],
            "Freelancer": [
                "Maintain invoices and payment records digitally",
                "File income tax returns to prove earnings",
                "Use a dedicated business bank account"
            ],
            "Migrant Worker": [
                "Use formal remittance channels instead of cash",
                "Open a bank account in your current city",
                "Build local utility bill payment history"
            ],
            "Kirana Store Owner": [
                "Digitize inventory purchases via UPI/NEFT",
                "Apply for MUDRA loan to build repayment history",
                "Get GST registration for better credit access"
            ],
            "Gig Worker": [
                "Save screenshots of monthly earnings from apps",
                "Maintain consistent daily/weekly work hours",
                "Use gig platform lending programs"
            ],
            "College Student": [
                "Start with a student credit card",
                "Build savings habit with small monthly deposits",
                "Explore education-linked scholarship programs"
            ],
            "Rural Farmer": [
                "Enroll in Kisan Credit Card scheme",
                "Use cooperative society banking for transactions",
                "Document crop sales through formal channels"
            ],
        }

        tips = role_tips.get(role, [
            "Pay all bills on time consistently",
            "Increase your UPI and digital payment usage",
            "Build an emergency fund of 3 months' expenses"
        ])

        return jsonify({
            "goal": goal,
            "target_amount": target_amount,
            "timeline_months": timeline_months,
            "monthly_savings_needed": round(monthly_savings_needed, 0),
            "savings_ratio": round(savings_ratio * 100, 1),
            "feasibility": feasibility,
            "feasibility_note": feasibility_note,
            "current_score": current_score,
            "target_score": target_score,
            "estimated_emi": round(emi, 0) if emi > 0 else None,
            "loan_component": round(loan_amount, 0) if loan_amount > 0 else None,
            "phases": phases,
            "role_tips": tips
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
