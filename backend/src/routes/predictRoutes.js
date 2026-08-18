const express = require("express");

const router = express.Router();

const { predictPatient } = require("../controllers/predictController");

router.post("/", predictPatient);

module.exports = router;