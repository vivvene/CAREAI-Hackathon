import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import Button from "../components/button";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const patientData = location.state?.patientData;

  // If someone opens /report directly
  // without completing an assessment
  if (!result) {
    return (
      <div className="app">
        <Navbar />

        <main className="report-page">
          <section className="report-empty">
            <div className="empty-icon">✦</div>

            <span className="report-tag">
              CAREAI
            </span>

            <h1>No Report Available</h1>

            <p>
              Complete a health assessment first to
              generate your personalized report.
            </p>

            <Button
              onClick={() => navigate("/assessment")}
            >
              Start Assessment →
            </Button>
          </section>
        </main>
      </div>
    );
  }

  // =========================
  // DATA FROM BACKEND / MOCK
  // =========================

  const prediction =
    result.prediction?.condition ||
    result.top_prediction?.condition ||
    result.prediction ||
    "Not available";

  const probability =
    result.prediction?.probability ??
    result.top_prediction?.probability;

  const risk =
    result.riskLevel ||
    result.risk ||
    "UNKNOWN";

  const explanation =
    result.explanation ||
    "No explanation available.";

  const alternatives =
    result.alternatives || [];

  const symptoms =
    result.recognizedSymptoms ||
    result.recognized_symptoms ||
    patientData?.symptoms ||
    [];

  const guidance =
    result.guidance || {};

  const actions =
    guidance.actions || [];

  const disclaimer =
    result.disclaimer ||
    "Prototype only. Not a medical diagnosis or emergency triage system.";

  const redFlags =
    result.redFlags || [];
  const formatSymptom = (symptom) => {
  if (!symptom) return "";

  return symptom
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
};

  // =========================
  // RISK CLASS
  // =========================

  const riskClass =
    risk.toLowerCase() === "high"
      ? "risk-high"
      : risk.toLowerCase() === "moderate"
      ? "risk-moderate"
      : "risk-low";


  return (
    <div className="app">
      <Navbar />

      <main className="report-page">

        {/* ==================================
            REPORT HEADER
        ================================== */}

        <section className="report-header">

          <div className="report-header-top">

            <div>
              <span className="report-tag">
                ✦ CAREAI
              </span>

              <p className="report-label">
                HEALTH ASSESSMENT REPORT
              </p>
            </div>

            <div className="report-status">
              ✓ Assessment Complete
            </div>

          </div>

          <h1>
            Your Health
            <br />
            <span>Assessment Report</span>
          </h1>

          <p>
            Here's a summary of the information and
            results from your CAREAI assessment.
          </p>

        </section>


        {/* ==================================
            MAIN REPORT
        ================================== */}

        <div className="report-container">


          {/* ==================================
              PATIENT INFORMATION
          ================================== */}

          <section className="report-section patient-report-section">

            <div className="report-section-heading">

              <div className="report-section-icon">
                👤
              </div>

              <div>
                <h2>Patient Information</h2>

                <p>
                  Information provided during your
                  assessment.
                </p>
              </div>

            </div>


            <div className="report-info-grid">

              <div className="report-info-item">

                <span>Full Name</span>

                <strong>
                  {patientData?.name ||
                    "Not provided"}
                </strong>

              </div>


              <div className="report-info-item">

                <span>Age</span>

                <strong>
                  {patientData?.age ||
                    "Not provided"}
                </strong>

              </div>


              <div className="report-info-item">

                <span>Gender</span>

                <strong>
                  {patientData?.gender
                    ? patientData.gender
                        .charAt(0)
                        .toUpperCase() +
                      patientData.gender.slice(1)
                    : "Not provided"}
                </strong>

              </div>


              <div className="report-info-item">

                <span>Symptom Duration</span>

                <strong>
                  {patientData?.duration
                    ? `${patientData.duration} day${
                        patientData.duration === 1
                          ? ""
                          : "s"
                      }`
                    : "Not provided"}
                </strong>

              </div>

            </div>

          </section>


          {/* ==================================
              ASSESSMENT RESULT
          ================================== */}

          <section className="report-section result-highlight">

            <div className="report-section-heading">

              <div className="report-section-icon">
                ✦
              </div>

              <div>
                <h2>Assessment Result</h2>

                <p>
                  Based on the symptoms provided.
                </p>
              </div>

            </div>


            <div className="main-result">

              <div className="condition-result">

                <span>
                  POSSIBLE CONDITION
                </span>

                <h3>
                  {prediction}
                </h3>

                {probability !== undefined && (
                  <p>
                    Model confidence:{" "}
                    <strong>
                      {(Number(probability) * 100).toFixed(1)}%
                    </strong>
                  </p>
                )}

              </div>


              <div className={`risk-badge ${riskClass}`}>

                <span>RISK LEVEL</span>

                <strong>
                  {risk}
                </strong>

              </div>

            </div>

          </section>


          {/* ==================================
              SYMPTOMS
          ================================== */}

          <section className="report-section">

            <div className="report-section-heading">

              <div className="report-section-icon">
                🔎
              </div>

              <div>
                <h2>Symptoms Reported</h2>

                <p>
                  Symptoms selected during your
                  assessment.
                </p>
              </div>

            </div>


            {symptoms.length > 0 ? (

              <div className="report-symptoms">

                {symptoms.map((symptom, index) => (

                  <div
                    className="report-symptom-pill"
                    key={index}
                  >
                    <span>✓</span>
                    {formatSymptom(symptom)}
                    </div>

                ))}

              </div>

            ) : (

              <p className="report-muted">
                No symptoms recorded.
              </p>

            )}

          </section>


          {/* ==================================
              ALTERNATIVES
          ================================== */}

          {alternatives.length > 0 && (

            <section className="report-section">

              <div className="report-section-heading">

                <div className="report-section-icon">
                  ◇
                </div>

                <div>
                  <h2>Other Possibilities</h2>

                  <p>
                    Other conditions considered by
                    the model.
                  </p>
                </div>

              </div>


              <div className="report-alternatives">

                {alternatives.map(
                  (item, index) => (

                    <div
                      className="alternative-row"
                      key={index}
                    >

                      <span>
                        {item.condition}
                      </span>

                      <strong>
                        {(
                          Number(item.probability) * 100
                        ).toFixed(1)}
                        %
                      </strong>

                    </div>

                  )
                )}

              </div>

            </section>

          )}


          {/* ==================================
              EXPLANATION
          ================================== */}

          <section className="report-section">

            <div className="report-section-heading">

              <div className="report-section-icon">
                💡
              </div>

              <div>
                <h2>Explanation</h2>

                <p>
                  Understanding your assessment result.
                </p>
              </div>

            </div>


            <div className="report-text-box">

              <p className="report-text">
                {explanation}
              </p>

            </div>

          </section>


          {/* ==================================
              GUIDANCE
          ================================== */}

          <section className="report-section guidance-section">

            <div className="report-section-heading">

              <div className="report-section-icon">
                ♡
              </div>

              <div>
                <h2>Personalized Guidance</h2>

                <p>
                  Helpful next steps based on your
                  assessment.
                </p>
              </div>

            </div>


            <div className="guidance-message">

              <p>
                {guidance.message ||
                  "No additional guidance available."}
              </p>

            </div>


            {actions.length > 0 && (

              <div className="report-actions">

                {actions.map(
                  (action, index) => (

                    <div
                      className="report-action"
                      key={index}
                    >

                      <span className="action-check">
                        ✓
                      </span>

                      <span>
                        {action}
                      </span>

                    </div>

                  )
                )}

              </div>

            )}

          </section>


          {/* ==================================
              RED FLAGS
          ================================== */}

          {redFlags.length > 0 && (

            <section className="report-warning">

              <div className="warning-icon">
                ⚠
              </div>

              <div>

                <h3>
                  Important Warning
                </h3>

                <p>
                  Please pay attention to the following
                  warning signs:
                </p>

                <ul>

                  {redFlags.map(
                    (flag, index) => (
                      <li key={index}>
                        {flag}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </section>

          )}


          {/* ==================================
              DISCLAIMER
          ================================== */}

          <section className="report-disclaimer">

            <div className="disclaimer-icon">
              !
            </div>

            <div>

              <strong>
                Important Notice
              </strong>

              <p>
                {disclaimer}
              </p>

            </div>

          </section>


          {/* ==================================
              ACTION BUTTONS
          ================================== */}

          <div className="report-buttons">

            <Button
              onClick={() =>
                navigate("/assessment")
              }
            >
              ← New Assessment
            </Button>


            <Button
              onClick={() =>
                navigate("/results", {
                  state: {
                    result,
                    patientData,
                  },
                })
              }
            >
              Back to Results
            </Button>

          </div>


          <p className="report-footer">
            CAREAI • AI-assisted health guidance
          </p>

        </div>

      </main>
    </div>
  );
}

export default Report;