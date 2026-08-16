function Report() {

  return (

    <main className="report-page">

      <div className="report-header">

        <p className="eyebrow">
          HEALTH REPORT
        </p>

        <h1>
          Your Assessment Summary
        </h1>

        <p>
          A summary of the information provided during
          your health assessment.
        </p>

      </div>


      <section className="report-card">

        <div className="report-section">

          <h2>Patient Information</h2>

          <div className="report-grid">

            <div>
              <span>Name</span>
              <strong>Sample User</strong>
            </div>

            <div>
              <span>Age</span>
              <strong>19</strong>
            </div>

          </div>

        </div>


        <div className="report-section">

          <h2>Reported Symptoms</h2>

          <div className="symptom-tags">

            <span>Fever</span>
            <span>Cough</span>
            <span>Fatigue</span>

          </div>

        </div>


        <div className="report-section">

          <h2>Assessment</h2>

          <div className="assessment-summary">

            <div>
              <span>Possible Condition</span>
              <strong>Influenza</strong>
            </div>

            <div>
              <span>Risk Level</span>
              <strong>Moderate</strong>
            </div>

            <div>
              <span>Confidence</span>
              <strong>82%</strong>
            </div>

          </div>

        </div>


        <div className="report-warning">

          ⚠️ This report is for informational purposes
          only and does not constitute a medical diagnosis.

        </div>


        <button className="primary-button">
          Download Report
        </button>

      </section>

    </main>

  );
}

export default Report;