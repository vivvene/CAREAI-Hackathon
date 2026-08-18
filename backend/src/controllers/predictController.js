const Patient = require("../models/patient");
const { predictSymptoms } = require("../services/mlService");
const { getGuidance } = require("../services/guidanceService");

const predictPatient = async (req, res) => {
    try {
        const { age, gender, symptoms } = req.body;

        // -----------------------------
        // VALIDATION
        // -----------------------------

        if (age === undefined || age === null) {
            return res.status(400).json({
                success: false,
                message: "Age is required"
            });
        }

        if (!gender) {
            return res.status(400).json({
                success: false,
                message: "Gender is required"
            });
        }

        if (!Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one symptom is required"
            });
        }

        // -----------------------------
        // ML PREDICTION
        // -----------------------------

        const mlResult = await predictSymptoms(symptoms);

        const prediction = mlResult.top_prediction;

        // -----------------------------
        // SAFETY / RED-FLAG GUIDANCE
        // -----------------------------

        const guidance = getGuidance(symptoms);

        // -----------------------------
        // SAVE TO MONGODB
        // -----------------------------

        const patient = await Patient.create({
            age,
            gender,
            symptoms,

            prediction: prediction?.condition || "Unknown",

            probability: prediction?.probability ?? null,

            riskLevel: guidance.riskLevel,

            explanation: mlResult.explanation || "",

            alternatives: mlResult.alternatives || [],

            redFlags: guidance.redFlags || [],

            guidance: guidance.actions || []
        });

        // -----------------------------
        // RESPONSE TO FRONTEND
        // -----------------------------

        return res.status(200).json({
            success: true,

            patientId: patient._id,

            prediction: mlResult.top_prediction,

            alternatives: mlResult.alternatives || [],

            recognizedSymptoms: mlResult.recognized_symptoms || [],

            unknownSymptoms: mlResult.unknown_symptoms || [],

            riskLevel: guidance.riskLevel,

            redFlags: guidance.redFlags || [],

            guidance: {
                message: guidance.message,
                actions: guidance.actions || []
            },

            explanation: mlResult.explanation || "",

            importantFeatures:
                mlResult.important_selected_features || [],

            disclaimer:
                mlResult.disclaimer ||
                "Prototype only. Not a medical diagnosis or emergency triage system."
        });

    } catch (error) {
        console.error("Prediction controller error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    predictPatient
};