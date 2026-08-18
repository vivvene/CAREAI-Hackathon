const axios = require("axios");

const ML_API_URL = process.env.ML_API_URL || "http://127.0.0.1:8000";

const predictSymptoms = async (symptoms) => {
    try {
        const response = await axios.post(
            `${ML_API_URL}/predict`,
            {
                symptoms,
                top_k: 3
            },
            {
                timeout: 15000
            }
        );

        return response.data;

    } catch (error) {
        console.error(
            "ML API Error:",
            error.response?.data || error.message
        );

        throw new Error("ML prediction service unavailable");
    }
};

module.exports = {
    predictSymptoms
};