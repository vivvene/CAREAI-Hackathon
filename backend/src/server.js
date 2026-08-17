const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const predictRoutes = require("./routes/predictRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/patients", patientRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "CAREAI Backend is running!"
    });
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`CAREAI Backend running on port ${PORT}`);
});