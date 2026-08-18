from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
from api.service import predict

app = FastAPI(
    title="CareAI API",
    version="1.0.0",
    description="Hackathon prototype API for symptom-pattern prediction."
)

class PredictRequest(BaseModel):
    symptoms: List[str] = Field(min_length=1)
    top_k: int = Field(default=3, ge=1, le=5)

class PredictResponse(BaseModel):
    recognized_symptoms: List[str]
    unknown_symptoms: List[str]
    top_prediction: dict
    alternatives: List[dict]
    explanation: str
    important_selected_features: List[dict]
    disclaimer: str

@app.get("/health")
def health():
    return {"status": "ok", "service": "CareAI"}

@app.post("/predict", response_model=PredictResponse)
def predict_endpoint(request: PredictRequest):
    try:
        return predict(request.symptoms, request.top_k)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
