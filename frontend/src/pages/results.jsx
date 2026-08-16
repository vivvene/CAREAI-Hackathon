function Results() {

  const result = {
    prediction: "Influenza",
    confidence: 82,
    risk: "Moderate",
    explanation:
      "Your reported symptoms may be consistent with influenza-like illness. Consider resting, staying hydrated, and monitoring your symptoms."
  };

  return (

    <main className="results-page">

      <div className="results-header">

        <p className="eyebrow">
          ASSESSMENT RESULT
        </p>

        <h1>
          Your health assessment
        </h1>

        <p>
          This result is an AI-assisted assessment and
          should not be considered a medical diagnosis.
        </p>

      </div>


      <section className="result-grid">

        <div className="result-main">

          <div className="prediction-card">

            <span className="result-label">
              POSSIBLE CONDITION
            </span>

            <h2>
              {result.prediction}
            </h2>

            <p>
              Confidence: {result.confidence}%
            </p>

          </div>


          <div className="ai-card">

            <div className="ai-title">
              <span>🤖</span>
              <h2>AI Explanation</h2>
            </div>

            <p>
              {result.explanation}
            </p>

          </div>

        </div>


        <div className="risk-card">

          <span className="result-label">
            RISK LEVEL
          </span>

          <div className="risk-circle">
            {result.risk}
          </div>

          <p>
            Please consult a healthcare professional
            if your symptoms worsen or persist.
          </p>

        </div>

      </section>


      <div className="result-actions">

        <a
          href="/report"
          className="primary-button"
        >
          View Health Report →
        </a>

        <a
          href="/assessment"
          className="secondary-button"
        >
          New Assessment
        </a>

      </div>

    </main>

  );
}

export default Results;