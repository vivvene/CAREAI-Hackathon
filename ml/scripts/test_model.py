import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1] / "api"))
from service import predict

cases = [
    ["fever", "cough", "headache", "fatigue"],
    ["sneezing", "runny nose", "itchy eyes"],
    ["nausea", "vomiting", "diarrhea"],
]

for symptoms in cases:
    print("\nINPUT:", symptoms)
    print(predict(symptoms))
