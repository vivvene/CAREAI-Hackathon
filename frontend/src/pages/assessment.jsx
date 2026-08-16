import { useState } from "react";

function Assessment() {

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const symptoms = [
    "Fever",
    "Cough",
    "Headache",
    "Fatigue",
    "Nausea",
    "Vomiting",
    "Body Ache",
    "Sore Throat"
  ];

  const handleSymptomChange = (symptom) => {

    if (selectedSymptoms.includes(symptom)) {

      setSelectedSymptoms(
        selectedSymptoms.filter(item => item !== symptom)
      );

    } else {

      setSelectedSymptoms([
        ...selectedSymptoms,
        symptom
      ]);

    }

  };

  return (

    <main className="assessment-page">

      <div className="assessment-header">

        <p className="eyebrow">
          HEALTH ASSESSMENT
        </p>

        <h1>
          Tell us how you're feeling
        </h1>

        <p>
          Select the symptoms you're currently experiencing.
        </p>

      </div>


      <section className="patient-section">

        <h2>Patient Information</h2>

        <div className="input-grid">

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter your age"
            />
          </div>

        </div>

      </section>


      <section className="symptoms-section">

        <h2>Select Symptoms</h2>

        <div className="symptom-grid">

          {symptoms.map((symptom) => (

            <button
              key={symptom}
              className={
                selectedSymptoms.includes(symptom)
                  ? "symptom selected"
                  : "symptom"
              }
              onClick={() => handleSymptomChange(symptom)}
            >

              <span>
                {selectedSymptoms.includes(symptom) ? "✓" : "+"}
              </span>

              {symptom}

            </button>

          ))}

        </div>

      </section>


      <div className="assessment-action">

        <a
          href="/results"
          className="primary-button"
        >
          Assess My Health →
        </a>

      </div>

    </main>

  );
}

export default Assessment;