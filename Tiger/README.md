# 🐯 Tiger — CredAlt: Alternative Credit Scoring Engine

**CredAlt** is an AI-powered alternative credit scoring system designed to serve India's underbanked population — individuals who lack traditional credit histories (CIBIL scores). It uses **alternative data** such as UPI transactions, utility bill payments, digital footprint, and more to generate a fair and inclusive credit score.

---

## ✨ Features

- **ML-Based Credit Scoring** — Predicts creditworthiness using a trained Random Forest model on alternative financial data.
- **Score Range 300–900** — Mirrors the traditional credit score format for easy interpretation.
- **Role-Specific Profiles** — Supports diverse user roles including Street Vendor, Domestic Worker, Freelancer, Gig Worker, Kirana Store Owner, Migrant Worker, College Student, and Rural Farmer.
- **Contributing Factor Breakdown** — Shows category-level insights (Payment Behavior, Financial Health, Digital Presence, etc.).
- **CIBIL Comparison** — Side-by-side comparison of CredAlt score vs. traditional CIBIL score.
- **Financial Goal Planner** — Generates a phased roadmap with role-specific tips to achieve financial goals.
- **Multi-language Support** — Internationalization (i18n) built into the frontend.
- **Dashboard View** — Visual analytics and insights dashboard.

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| **Backend** | Python, Flask, Flask-CORS           |
| **ML**      | Scikit-learn (Random Forest), Joblib|
| **Data**    | Pandas, NumPy                       |
| **Frontend**| HTML, CSS, JavaScript               |

---

## 📁 Project Structure

```
Tiger/
├── app.py                    # Flask REST API server
├── README.md                 # Project documentation
├── requirements.txt          # Python dependencies
├── data/
│   ├── alternative_credit_data.csv   # Synthetic training dataset
│   └── generate_data.py              # Data generation script
├── model/
│   ├── credit_scoring_model.pkl      # Trained ML model
│   ├── feature_columns.pkl           # Feature column list
│   ├── feature_defaults.pkl          # Default feature values
│   ├── label_encoders.pkl            # Label encoders for categorical features
│   └── train_model.py               # Model training script
└── webapp/
    ├── index.html            # Main scoring page
    ├── dashboard.html        # Analytics dashboard
    ├── css/style.css         # Styles
    └── js/
        ├── app.js            # Main app logic
        ├── dashboard.js      # Dashboard logic
        ├── i18n.js           # Internationalization
        └── profiles.js       # User role profiles
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+

### Installation

```bash
# Clone the repository
git clone https://github.com/OmkarSG18/Tiger.git
cd Tiger

# Install dependencies
pip install -r requirements.txt
```

### Run the Application

```bash
python app.py
```

The app will start at **http://localhost:5000**

---

## 📡 API Endpoints

| Method | Endpoint      | Description                          |
|--------|---------------|--------------------------------------|
| GET    | `/`           | Serves the main web application      |
| GET    | `/health`     | Health check and model status        |
| POST   | `/predict`    | Score a user profile                 |
| POST   | `/goal-plan`  | Generate a financial goal roadmap    |

### Example — Predict Credit Score

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "UPI_TRANSACTIONS": 45,
    "UPI_AVG_AMOUNT": 1200,
    "UTILITY_BILLS_PAID": 10,
    "INCOME": 25000,
    "EMPLOYMENT_STABILITY": "Stable"
  }'
```

---

## 🤝 Who Is This For?

CredAlt is built for the **500M+ Indians** who are excluded from formal credit systems:

- 🛒 Street Vendors
- 🏠 Domestic Workers
- 💻 Freelancers
- 🚚 Migrant Workers
- 🏪 Kirana Store Owners
- 🛵 Gig Workers
- 🎓 College Students
- 🌾 Rural Farmers

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
