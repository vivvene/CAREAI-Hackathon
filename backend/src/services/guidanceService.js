const HIGH_ALERTS = new Set([
    "severe_breathlessness",
    "unconsciousness",
    "seizure",
    "heavy_bleeding",
    "blue_lips"
]);

const MODERATE_ALERTS = new Set([
    "persistent_vomiting",
    "severe_headache",
    "dizziness",
    "reduced_urination"
]);

const normalizeSymptom = (symptom) => {
    return String(symptom)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
};

const getGuidance = (symptoms = []) => {
    const normalizedSymptoms = symptoms.map(normalizeSymptom);

    const highFlags = normalizedSymptoms.filter((symptom) =>
        HIGH_ALERTS.has(symptom)
    );

    const moderateFlags = normalizedSymptoms.filter((symptom) =>
        MODERATE_ALERTS.has(symptom)
    );

    if (highFlags.length > 0) {
        return {
            riskLevel: "HIGH",
            redFlags: highFlags,
            message:
                "Potential red-flag symptom detected. Do not rely on this prototype; seek urgent professional medical evaluation.",
            actions: [
                "Contact appropriate local emergency or medical services if the situation is urgent."
            ]
        };
    }

    if (moderateFlags.length > 0) {
        return {
            riskLevel: "MODERATE",
            redFlags: moderateFlags,
            message:
                "A symptom requiring additional attention may be present.",
            actions: [
                "Consider professional medical advice.",
                "Monitor for worsening symptoms."
            ]
        };
    }

    return {
        riskLevel: "LOW",
        redFlags: [],
        message:
            "No prototype red-flag symptom was detected.",
        actions: [
            "This does not rule out illness.",
            "Monitor symptoms and consult a qualified professional if concerned."
        ]
    };
};

module.exports = {
    getGuidance
};