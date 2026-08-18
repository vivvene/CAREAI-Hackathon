from pathlib import Path
import joblib
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
BUNDLE = joblib.load(ROOT / "artifacts" / "careai_model.joblib")
MODEL = BUNDLE["model"]
MLB = BUNDLE["mlb"]

def predict(symptoms, top_k=3):
    clean = []
    unknown = []
    vocabulary = set(MLB.classes_)

    for symptom in symptoms:
        s = str(symptom).strip().lower().replace(" ", "_")
        if not s:
            continue
        if s in vocabulary:
            clean.append(s)
        else:
            unknown.append(s)

    clean = sorted(set(clean))

    if not clean:
        raise ValueError("No recognized symptoms were supplied.")

    X = MLB.transform([clean])
    probabilities = MODEL.predict_proba(X)[0]
    order = np.argsort(probabilities)[::-1][:top_k]

    results = [
        {
            "condition": str(MODEL.classes_[i]),
            "probability": round(float(probabilities[i]), 4)
        }
        for i in order
    ]

    # Explanation is intentionally transparent rather than pretending to be a clinical explanation.
    feature_importance = MODEL.feature_importances_
    selected_indices = [list(MLB.classes_).index(s) for s in clean]
    selected = sorted(
        [{"symptom": clean[j], "importance": float(feature_importance[idx])}
         for j, idx in enumerate(selected_indices)],
        key=lambda x: x["importance"],
        reverse=True
    )

    return {
        "recognized_symptoms": clean,
        "unknown_symptoms": unknown,
        "top_prediction": results[0],
        "alternatives": results[1:],
        "explanation": (
            "The prediction is based on the overlap between the supplied symptom vector "
            "and patterns learned from the training dataset. Feature importance is a model-level "
            "indicator, not a medical causal explanation."
        ),
        "important_selected_features": selected[:5],
        "disclaimer": "Prototype only. Not a medical diagnosis or emergency triage system."
    }
