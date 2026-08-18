import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1] / "api"))

import streamlit as st
from service import predict
from guidance import guidance

st.set_page_config(page_title="CareAI", page_icon="🏥", layout="wide")

st.title("🏥 CareAI")
st.caption("Explainable healthcare-assistance prototype for Bengal E-Summit")

st.warning(
    "DEMO ONLY — not a medical diagnosis, treatment recommendation, or emergency triage tool."
)

left, right = st.columns([1.15, 1])

with left:
    st.header("Patient symptoms")
    raw = st.text_area(
        "Enter symptoms separated by commas",
        "fever, headache, fatigue, body ache"
    )
    symptoms = [x.strip() for x in raw.split(",") if x.strip()]

    if st.button("Analyze", type="primary", use_container_width=True):
        try:
            result = predict(symptoms, top_k=3)
            st.session_state["result"] = result
            st.session_state["guidance"] = guidance(symptoms)
        except ValueError as e:
            st.error(str(e))

with right:
    st.header("AI result")
    if "result" in st.session_state:
        r = st.session_state["result"]
        g = st.session_state["guidance"]

        st.success(f"Top prototype prediction: {r['top_prediction']['condition']}")
        st.metric("Model probability", f"{r['top_prediction']['probability']*100:.1f}%")

        st.subheader("Alternatives")
        for item in r["alternatives"]:
            st.write(f"• {item['condition']}: {item['probability']*100:.1f}%")

        st.subheader("Explainability")
        st.info(r["explanation"])
        for item in r["important_selected_features"]:
            st.write(f"• {item['symptom'].replace('_',' ').title()} — model importance {item['importance']:.4f}")

        st.subheader("Safety layer")
        if g["level"] == "HIGH":
            st.error(g["message"])
        elif g["level"] == "MODERATE":
            st.warning(g["message"])
        else:
            st.success(g["message"])

        for action in g["actions"]:
            st.write("•", action)

        if r["unknown_symptoms"]:
            st.info("Unrecognized symptoms: " + ", ".join(r["unknown_symptoms"]))
    else:
        st.info("Enter symptoms and click Analyze.")

st.divider()
st.subheader("System architecture")
st.code("""
User
  ↓
Symptom Input
  ↓
Normalization + Multi-hot Encoding
  ↓
Random Forest Classifier
  ↓
Top-K Prediction
  ↓
Model-level Explanation
  ↓
Safety / Red-Flag Layer
  ↓
Guidance + Healthcare Resources
""")
