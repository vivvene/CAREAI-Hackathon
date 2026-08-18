# CareAI — Your ML Engineer Job

## Your responsibility
1. Dataset: understand the symptom/condition data.
2. Preprocessing: normalize symptom names and convert symptoms to multi-hot binary features.
3. Training: train the Random Forest classifier.
4. Evaluation: report accuracy, macro precision, macro recall, macro F1, and inspect the confusion matrix.
5. Model artifact: keep artifacts/careai_model.joblib with its feature encoder.
6. Prediction: convert incoming symptoms using the same encoder and return top-k predictions.
7. API: expose the model through FastAPI at POST /predict.
8. Integration: give the backend/frontend team the API contract.

## Run locally (Windows)
Open a terminal in the project root:

```bash
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Train:
```bash
cd scripts
python train.py
cd ..
```

Evaluate:
```bash
python scripts/evaluate.py
```

Start API:
```bash
uvicorn api.main:app --reload
```

Open API docs:
http://127.0.0.1:8000/docs

Test:
```json
{
  "symptoms": ["fever", "headache", "fatigue", "body ache"],
  "top_k": 3
}
```

## API contract
GET /health
POST /predict

POST /predict request:
```json
{"symptoms":["fever","cough"],"top_k":3}
```

The response contains the top prediction, alternatives, recognized/unknown symptoms, model-level feature importance, and a safety disclaimer.

## Scientific limitation
The included dataset is synthetic and is only for a hackathon software prototype. The model is not clinically validated and must not be presented as a diagnostic system. Replace the demo dataset with a properly licensed, documented research/clinical dataset before making real-world claims.
