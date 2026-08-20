import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import Button from "../components/button";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;
  const patientData = location.state?.patientData;

  /* =====================================================
     NO RESULT
  ===================================================== */

  if (!result) {
    return (
      <div className="results-page">
        <Navbar />

        <main className="results-container">

          <section className="results-empty">

            <div className="results-empty-icon">
              ✦
            </div>

            <p className="eyebrow">
              CAREAI
            </p>

            <h1>
              No Assessment Found
            </h1>

            <p>
              Please complete a health assessment before
              viewing your results.
            </p>

            <Button
              onClick={() => navigate("/assessment")}
            >
              Start Assessment
            </Button>

          </section>

        </main>
      </div>
    );
  }


  /* =====================================================
     BACKEND RESPONSE
  ===================================================== */

  const prediction =
    result.prediction?.condition ||
    result.prediction ||
    result.top_prediction?.condition ||
    "Not available";

  const probability =
    result.prediction?.probability ??
    result.top_prediction?.probability;

  const risk =
    result.riskLevel ||
    result.risk ||
    result.guidance?.level ||
    "UNKNOWN";

  const explanation =
    result.explanation ||
    "No explanation available yet.";

  const alternatives =
    result.alternatives || [];

  const recognizedSymptoms =
    result.recognizedSymptoms ||
    result.recognized_symptoms ||
    patientData?.symptoms ||
    [];

  const unknownSymptoms =
    result.unknownSymptoms ||
    result.unknown_symptoms ||
    [];

  const guidance =
    result.guidance || {};

  const guidanceMessage =
    guidance.message ||
    "No additional guidance available.";

  const guidanceActions =
    guidance.actions || [];

  const importantFeatures =
    result.importantFeatures ||
    result.important_selected_features ||
    [];

  const disclaimer =
    result.disclaimer ||
    "Prototype only. Not a medical diagnosis or emergency triage system.";


  /* =====================================================
     HELPERS
  ===================================================== */

  const formatSymptom = (symptom) => {
    if (!symptom) return "";

    return symptom
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const getRiskClass = (value) => {
    const normalized =
      String(value).toLowerCase();

    if (normalized.includes("low")) {
      return "result-risk-low";
    }

    if (
      normalized.includes("moderate") ||
      normalized.includes("medium")
    ) {
      return "result-risk-moderate";
    }

    if (normalized.includes("high")) {
      return "result-risk-high";
    }

    return "result-risk-neutral";
  };


  return (
    <div className="results-page">

      <Navbar />

      <main className="results-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="results-header">

          <div className="results-header-badge">
            <span>✦</span>
            CAREAI ASSESSMENT
          </div>

          <h1>
            Your Health
            <span> Assessment</span>
          </h1>

          <p>
            Here is a summary of the results generated
            from your CAREAI assessment.
          </p>

          {patientData?.name && (
            <div className="results-patient">
              Assessment for{" "}
              <strong>
                {patientData.name}
              </strong>
            </div>
          )}

        </header>


        {/* =================================================
            MAIN RESULT
        ================================================= */}

        {/* =================================================
    MAIN RESULT
================================================= */}

<section className="result-card result-main-card">
  <div className="result-main-content">
    <div className="result-label">
      POSSIBLE CONDITION
    </div>

    <h2>{prediction}</h2>

    {probability !== undefined && (
      <div className="result-confidence">
        <span>Model probability</span>
        <strong>{(Number(probability) * 100).toFixed(1)}%</strong>
      </div>
    )}
  </div>

  <div className={`result-risk ${getRiskClass(risk)}`}>
    <span>ASSESSMENT</span>
    <strong>{String(risk).toUpperCase()}</strong>
    <small>RISK</small>
  </div>
</section>


        {/* =================================================
            OTHER POSSIBILITIES
        ================================================= */}

        {alternatives.length > 0 && (

          <section className="result-card">

            <div className="result-section-title">

              <div className="result-section-icon">
                ◇
              </div>

              <div>
                <h2>
                  Other Possibilities
                </h2>

                <p>
                  Conditions that were also considered
                  by the assessment model.
                </p>
              </div>

            </div>


            <div className="result-alternatives">

              {alternatives.map((item, index) => (

                <div
                  className="result-alternative"
                  key={index}
                >

                  <span>
                    {item.condition ||
                      "Unknown"}
                  </span>

                  <strong>
                    {item.probability !== undefined
                      ? `${(
                          Number(item.probability) * 100
                        ).toFixed(1)}%`
                      : "—"}
                  </strong>

                </div>

              ))}

            </div>

          </section>

        )}


        {/* =================================================
            RECOGNIZED SYMPTOMS
        ================================================= */}

        <section className="result-card">

          <div className="result-section-title">

            <div className="result-section-icon">
              ✓
            </div>

            <div>
              <h2>
                Recognized Symptoms
              </h2>

              <p>
                Symptoms identified from your assessment.
              </p>
            </div>

          </div>


          {recognizedSymptoms.length > 0 ? (

            <div className="result-symptoms">

              {recognizedSymptoms.map(
                (symptom, index) => (

                  <span
                    key={index}
                    className="result-symptom"
                  >
                    <span className="symptom-check">
                      ✓
                    </span>

                    {formatSymptom(symptom)}
                  </span>

                )
              )}

            </div>

          ) : (

            <p className="result-muted">
              No recognized symptoms were returned
              by the assessment.
            </p>

          )}


          {unknownSymptoms.length > 0 && (

            <div className="result-unknown">

              <strong>
                Some symptoms could not be recognized
              </strong>

              <p>
                {unknownSymptoms
                  .map(formatSymptom)
                  .join(", ")}
              </p>

            </div>

          )}

        </section>


        {/* =================================================
            EXPLANATION
        ================================================= */}

        <section className="result-card">

          <div className="result-section-title">

            <div className="result-section-icon">
              ✧
            </div>

            <div>
              <h2>
                Model Explanation
              </h2>

              <p>
                Why the assessment produced this result.
              </p>
            </div>

          </div>


          <div className="result-explanation">
            <p>
              {explanation}
            </p>
          </div>

        </section>


        {/* =================================================
            IMPORTANT FEATURES
        ================================================= */}

        {importantFeatures.length > 0 && (

          <section className="result-card">

            <div className="result-section-title">

              <div className="result-section-icon">
                ◉
              </div>

              <div>
                <h2>
                  Important Features
                </h2>

                <p>
                  Factors that contributed to the
                  model's assessment.
                </p>
              </div>

            </div>


            <div className="result-features">

              {importantFeatures.map(
                (item, index) => (

                  <div
                    key={index}
                    className="result-feature"
                  >

                    <span>
                      {formatSymptom(item.symptom)}
                    </span>

                    <strong>
                      {item.importance !== undefined
                        ? Number(item.importance).toFixed(4)
                        : "—"}
                    </strong>

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* =================================================
            SAFETY GUIDANCE
        ================================================= */}

        <section className="result-card result-guidance-card">

          <div className="result-section-title">

            <div className="result-section-icon">
              ♡
            </div>

            <div>
              <h2>
                Safety Guidance
              </h2>

              <p>
                General guidance based on your assessment.
              </p>
            </div>

          </div>


          <div
            className={`result-guidance-level ${getRiskClass(risk)}`}
          >
            {String(risk).toUpperCase()} RISK
          </div>


          <div className="result-guidance-message">
            <p>
              {guidanceMessage}
            </p>
          </div>


          {guidanceActions.length > 0 && (

            <div className="result-guidance-actions">

              {guidanceActions.map(
                (action, index) => (

                  <div
                    key={index}
                    className="result-guidance-action"
                  >

                    <span>
                      ✓
                    </span>

                    <p>
                      {action}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </section>


        {/* =================================================
            DISCLAIMER
        ================================================= */}

        <div className="results-disclaimer">

          <div className="results-disclaimer-icon">
            !
          </div>

          <div>

            <strong>
              Important
            </strong>

            <p>
              {disclaimer}
            </p>

          </div>

        </div>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="results-actions">

          <Button
            onClick={() =>
              navigate("/assessment")
            }
          >
            New Assessment
          </Button>

          <Button
            onClick={() =>
              navigate("/report", {
                state: {
                  result,
                  patientData,
                },
              })
            }
          >
            View Full Report
          </Button>

        </div>


        <p className="results-footer">
          CAREAI • Assessment summary
        </p>

      </main>

    </div>
  );
}

export default Results;