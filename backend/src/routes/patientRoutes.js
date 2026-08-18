const express = require("express");

const {
    getPatients,
    getPatientById
} = require("../controllers/patientController");

const router = express.Router();

// Get all patient/analysis history
router.get("/", getPatients);

// Get one patient's complete report
router.get("/:id", getPatientById);

module.exports = router;