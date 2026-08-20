const Patient = require("../models/patient");
const { predictSymptoms } = require("../services/mlService");
const { getGuidance } = require("../services/guidanceService");

const predictPatient = async (req, res) => {
    try {
const { name, age, gender, duration, symptoms } = req.body;        // -----------------------------
        // VALIDATION
        // -----------------------------
        if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
        success: false,
        message: "Patient name is required"
    });
}
        if (age === undefined || age === null) {
            return res.status(400).json({
                success: false,
                message: "Age is required"
            });
        }

        if (typeof age !== "number" || age < 0 || age > 120) {
            return res.status(400).json({
                success: false,
                message: "Age must be a valid number between 0 and 120"
            });
        }

        if (!gender || typeof gender !== "string") {
            return res.status(400).json({
                success: false,
                message: "Gender is required"
            });
        }
        if (duration === undefined || duration === null) {
        return res.status(400).json({
        success: false,
        message: "Duration is required"
    });
}

        if (typeof duration !== "number" || duration < 1 || duration > 365) {
        return res.status(400).json({
        success: false,
        message: "Duration must be a valid number between 1 and 365 days"
    });
}

        if (!Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one symptom is required"
            });
        }

        if (!symptoms.every((symptom) => typeof symptom === "string")) {
            return res.status(400).json({
                success: false,
                message: "Symptoms must be provided as text values"
            });
        }

        // -----------------------------
        // ML PREDICTION
        // -----------------------------

        const mlResult = await predictSymptoms(symptoms);

        const prediction = mlResult.top_prediction;

        // -----------------------------
        // SAFETY / RED FLAGS
        // -----------------------------

        const guidance = getGuidance(symptoms);

        // -----------------------------
        // SAVE TO MONGODB
        // -----------------------------

            const patient = await Patient.create({
            name: name.trim(),

           age,

           gender: gender.trim(),

           duration,

           symptoms,

            prediction: prediction?.condition || "Unknown",

            probability: prediction?.probability ?? null,

            riskLevel: guidance.riskLevel,

            redFlags: guidance.redFlags || [],

            explanation: mlResult.explanation || "",

            alternatives: mlResult.alternatives || [],

            guidance: {
                message: guidance.message,
                actions: guidance.actions || []
            },

            recognizedSymptoms:
                mlResult.recognized_symptoms || [],

            unknownSymptoms:
                mlResult.unknown_symptoms || [],

            importantFeatures:
                mlResult.important_selected_features || [],

            disclaimer:
                mlResult.disclaimer ||
                "Prototype only. Not a medical diagnosis or emergency triage system."
        });

        // -----------------------------
        // RESPONSE TO FRONTEND
        // -----------------------------

        return res.status(200).json({
            success: true,

            patientId: patient._id,
            patient: {
            id: patient._id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            duration: patient.duration
        },

            prediction:
                mlResult.top_prediction || null,

            alternatives:
                mlResult.alternatives || [],

            recognizedSymptoms:
                mlResult.recognized_symptoms || [],

            unknownSymptoms:
                mlResult.unknown_symptoms || [],

            riskLevel:
                guidance.riskLevel,

            redFlags:
                guidance.redFlags || [],

            guidance: {
                message: guidance.message,
                actions: guidance.actions || []
            },

            explanation:
                mlResult.explanation || "",

            importantFeatures:
                mlResult.important_selected_features || [],

            disclaimer:
                mlResult.disclaimer ||
                "Prototype only. Not a medical diagnosis or emergency triage system."
        });

    } catch (error) {
        console.error(
            "Prediction controller error:",
            error
        );

        // ML service unavailable
        if (
            error.message ===
            "ML prediction service unavailable"
        ) {
            return res.status(503).json({
                success: false,
                message:
                    "Prediction service is currently unavailable"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to process prediction"
        });
    }
};

module.exports = {
    predictPatient
};