const Patient = require("../models/patient");

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: patients.length,
            patients
        });

    } catch (error) {
        console.error("Get patients error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getPatients
};