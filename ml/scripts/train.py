import json, sys
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    classification_report, confusion_matrix
)
from preprocess import load_and_prepare

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "demo_symptom_dataset.csv"
ART = ROOT / "artifacts"
ART.mkdir(exist_ok=True)

def main():
    df, X, y, mlb = load_and_prepare(DATA)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    model = RandomForestClassifier(
        n_estimators=400,
        max_depth=None,
        min_samples_leaf=2,
        class_weight="balanced_subsample",
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)

    pred = model.predict(X_test)
    proba = model.predict_proba(X_test)

    metrics = {
        "accuracy": float(accuracy_score(y_test, pred)),
        "precision_macro": float(precision_score(y_test, pred, average="macro", zero_division=0)),
        "recall_macro": float(recall_score(y_test, pred, average="macro", zero_division=0)),
        "f1_macro": float(f1_score(y_test, pred, average="macro", zero_division=0)),
        "f1_weighted": float(f1_score(y_test, pred, average="weighted", zero_division=0)),
        "n_rows": int(len(df)),
        "n_train": int(len(y_train)),
        "n_test": int(len(y_test)),
        "n_features": int(X.shape[1]),
        "n_classes": int(y.nunique()),
        "classes": sorted(y.unique().tolist())
    }

    report = classification_report(y_test, pred, output_dict=True, zero_division=0)
    cm = confusion_matrix(y_test, pred, labels=model.classes_)

    bundle = {
        "model": model,
        "mlb": mlb,
        "version": "careai-demo-v1"
    }
    joblib.dump(bundle, ART / "careai_model.joblib")

    (ART / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    (ART / "classification_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    np.save(ART / "confusion_matrix.npy", cm)
    (ART / "class_names.json").write_text(json.dumps(model.classes_.tolist(), indent=2), encoding="utf-8")

    # Feature importance
    fi = pd.DataFrame({
        "symptom": mlb.classes_,
        "importance": model.feature_importances_
    }).sort_values("importance", ascending=False)
    fi.to_csv(ART / "feature_importance.csv", index=False)

    print(json.dumps(metrics, indent=2))
    print("\nTop features:")
    print(fi.head(15).to_string(index=False))

if __name__ == "__main__":
    main()
