"""
Model Training Script for Alternative Credit Scoring Engine
Trains a Gradient Boosting Classifier on alternative data signals.
"""
import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score

def main():
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, "data", "alternative_credit_data.csv")
    model_dir = os.path.dirname(os.path.abspath(__file__))

    print("Loading data...")
    df = pd.read_csv(data_path)
    print(f"  Loaded {len(df)} records with {len(df.columns)} columns")

    # Separate features and target
    target_col = "CREDIT_WORTHY"
    X = df.drop(columns=[target_col])
    y = df[target_col]

    # Encode categorical columns
    categorical_cols = ["GENDER", "LOCATION_TYPE", "DEVICE_TYPE", "ROLE"]
    label_encoders = {}
    for col in categorical_cols:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        label_encoders[col] = le
        print(f"  Encoded {col}: {list(le.classes_)}")

    feature_columns = list(X.columns)

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"\n  Train: {len(X_train)} | Test: {len(X_test)}")

    # Train model
    print("\nTraining Gradient Boosting Classifier...")
    model = GradientBoostingClassifier(
        n_estimators=200,
        max_depth=5,
        learning_rate=0.1,
        min_samples_split=5,
        min_samples_leaf=3,
        subsample=0.8,
        random_state=42
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n  Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    # Feature importances
    importances = pd.Series(model.feature_importances_, index=feature_columns)
    importances = importances.sort_values(ascending=False)
    print("\nTop 10 Feature Importances:")
    for feat, imp in importances.head(10).items():
        print(f"  {feat}: {imp:.4f}")

    # Save artifacts
    joblib.dump(model, os.path.join(model_dir, "credit_scoring_model.pkl"))
    joblib.dump(label_encoders, os.path.join(model_dir, "label_encoders.pkl"))
    joblib.dump(feature_columns, os.path.join(model_dir, "feature_columns.pkl"))

    # Save training data defaults (means/modes) for missing feature imputation
    defaults = {}
    for col in feature_columns:
        if col in categorical_cols:
            defaults[col] = int(X[col].mode()[0])
        else:
            defaults[col] = float(X[col].mean())
    joblib.dump(defaults, os.path.join(model_dir, "feature_defaults.pkl"))

    print(f"\nModel artifacts saved to {model_dir}/")
    print("  - credit_scoring_model.pkl")
    print("  - label_encoders.pkl")
    print("  - feature_columns.pkl")
    print("  - feature_defaults.pkl")


if __name__ == "__main__":
    main()
