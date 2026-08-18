const Patient = require("../models/patient");

// GET /api/patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: patients.length,
            patients
        });

    } catch (error) {
        console.error("Get patients error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch patient history"
        });
    }
};


// GET /api/patients/:id
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient report not found"
            });
        }

        return res.status(200).json({
            success: true,
            patient
        });

    } catch (error) {
        console.error("Get patient error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch patient report"
        });
    }
};


module.exports = {
    getPatients,
    getPatientById
};