const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true
        },

        gender: {
            type: String,
            required: true,
            trim: true
        },

        symptoms: {
            type: [String],
            required: true
        },

        prediction: {
            type: String,
            default: ""
        },

        probability: {
            type: Number,
            default: null
        },

        riskLevel: {
            type: String,
            default: "Pending"
        },

        redFlags: {
            type: [String],
            default: []
        },

        explanation: {
            type: String,
            default: ""
        },

        alternatives: {
            type: Array,
            default: []
        },

        guidance: {
            type: Object,
            default: null
        },

        importantFeatures: {
            type: Array,
            default: []
        },

        recognizedSymptoms: {
            type: [String],
            default: []
        },

        unknownSymptoms: {
            type: [String],
            default: []
        },

        disclaimer: {
            type: String,
            default: "Prototype only. Not a medical diagnosis or emergency triage system."
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Patient", patientSchema);