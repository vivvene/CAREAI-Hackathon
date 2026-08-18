# 2-Minute Technical Presentation

"Let me explain the engineering behind CareAI.

The user first provides a set of symptoms. We normalize those symptoms into a controlled vocabulary and transform them into a multi-hot feature vector. For example, fever=1, cough=1 and headache=1.

We then pass that vector to a Random Forest classifier. We use a stratified train-test split and evaluate the model with accuracy, macro precision, macro recall, macro F1 and a confusion matrix.

The important architectural decision is that prediction, explanation and safety are separate modules. The model predicts a learned symptom pattern. The explanation layer exposes model-level feature importance, while the safety layer checks for predefined red-flag inputs.

The trained model is serialized and exposed through FastAPI. This makes the ML layer independent of the frontend, so the same API could later support a mobile application or other clients.

For the hackathon prototype, our included dataset is synthetic and explicitly labeled as such. We are not claiming clinical validity. Our next research step is to replace the demonstration dataset with a properly licensed and documented clinical/research dataset and then perform stronger validation.

The goal is not to replace doctors. The goal is accessible, explainable and safety-aware healthcare assistance."
