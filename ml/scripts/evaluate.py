import json
from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import ConfusionMatrixDisplay

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "artifacts"

metrics = json.loads((ART/"metrics.json").read_text())
report = json.loads((ART/"classification_report.json").read_text())
cm = np.load(ART/"confusion_matrix.npy")
classes = json.loads((ART/"class_names.json").read_text())

print("\n=== CAREAI MODEL EVALUATION ===")
for k in ["accuracy","precision_macro","recall_macro","f1_macro","f1_weighted"]:
    print(f"{k:20s}: {metrics[k]:.4f}")

fi = pd.read_csv(ART/"feature_importance.csv").head(15)
plt.figure(figsize=(10,6))
plt.barh(fi["symptom"][::-1], fi["importance"][::-1])
plt.title("Top Model Features")
plt.xlabel("Random Forest feature importance")
plt.tight_layout()
plt.savefig(ART/"feature_importance.png", dpi=160)
plt.close()

fig, ax = plt.subplots(figsize=(12,10))
ConfusionMatrixDisplay(cm, display_labels=classes).plot(ax=ax, xticks_rotation=90, cmap="Blues", colorbar=False)
plt.title("CareAI Confusion Matrix")
plt.tight_layout()
plt.savefig(ART/"confusion_matrix.png", dpi=160)
plt.close()

print(f"\nSaved plots to: {ART}")
