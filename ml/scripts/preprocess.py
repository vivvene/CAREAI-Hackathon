import re
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer

def normalize_symptom(s: str) -> str:
    s = str(s).strip().lower()
    s = re.sub(r"[^a-z0-9_ ]+", "", s)
    s = s.replace(" ", "_")
    return s

def parse_symptoms(value):
    if isinstance(value, list):
        raw = value
    else:
        raw = str(value).split("|")
    return sorted(set(normalize_symptom(x) for x in raw if str(x).strip()))

def load_and_prepare(path):
    df = pd.read_csv(path)

    required = {"age","gender","duration_days","severity","symptoms","condition"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    df = df.drop_duplicates().dropna(subset=["symptoms","condition"]).copy()
    df["age"] = pd.to_numeric(df["age"], errors="coerce").fillna(df["age"].median())
    df["duration_days"] = pd.to_numeric(df["duration_days"], errors="coerce").fillna(1)
    df["symptom_list"] = df["symptoms"].apply(parse_symptoms)

    # The baseline model intentionally uses symptoms only.
    # Demographics are retained for dataset documentation and future fairness work.
    mlb = MultiLabelBinarizer()
    X = mlb.fit_transform(df["symptom_list"])
    y = df["condition"].astype(str)

    return df, X, y, mlb

def vectorize_user_symptoms(symptoms, mlb):
    clean = [normalize_symptom(x) for x in symptoms]
    known = [x for x in clean if x in set(mlb.classes_)]
    unknown = [x for x in clean if x not in set(mlb.classes_)]
    X = mlb.transform([known])
    return X, known, unknown
