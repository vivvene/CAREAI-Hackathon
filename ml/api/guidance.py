HIGH_ALERTS = {
    "severe_breathlessness",
    "unconsciousness",
    "seizure",
    "heavy_bleeding",
    "blue_lips"
}
MODERATE_ALERTS = {
    "persistent_vomiting",
    "severe_headache",
    "dizziness",
    "reduced_urination"
}

def guidance(symptoms):
    s = set(x.strip().lower().replace(" ", "_") for x in symptoms)

    if s & HIGH_ALERTS:
        return {
            "level": "HIGH",
            "message": "Potential red-flag symptom detected. Do not rely on the prototype; seek urgent professional medical evaluation.",
            "actions": ["Contact appropriate local emergency/medical services if the situation is urgent."]
        }

    if s & MODERATE_ALERTS:
        return {
            "level": "MODERATE",
            "message": "A symptom requiring additional attention may be present.",
            "actions": ["Consider professional medical advice.", "Monitor for worsening symptoms."]
        }

    return {
        "level": "LOW",
        "message": "No prototype red-flag symptom was detected.",
        "actions": ["This does not rule out illness.", "Monitor symptoms and consult a qualified professional if concerned."]
    }
