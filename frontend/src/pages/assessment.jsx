import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import Button from "../components/button";
import SymptomCard from "../components/symptomcard";
import symptoms from "../data/symptoms";

function Assessment() {
  // Patient information
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");

  // Selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // UI states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const navigate = useNavigate();

  // Select / unselect symptoms
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((current) => {
      if (current.includes(symptom.name)) {
        return current.filter((item) => item !== symptom.name);
      }

      return [...current, symptom.name];
    });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!age || Number(age) <= 0) {
      newErrors.age = "Please enter a valid age.";
    }

    if (!gender) {
      newErrors.gender = "Please select your gender.";
    }

    if (selectedSymptoms.length === 0) {
      newErrors.symptoms = "Please select at least one symptom.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit assessment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const patientData = {
      name: name.trim(),
      age: Number(age),
      gender,
      symptoms: selectedSymptoms,
      duration: duration ? Number(duration) : undefined,
    };

    setApiError(false);
    setLoading(true);

    try {
      // Send assessment data to the backend
      const response = await fetch(
        "http://localhost:5000/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );

      // Handle unsuccessful HTTP responses
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({}));

        throw new Error(
          errorData.message || "Assessment request failed"
        );
      }

      // Get the real prediction returned by the backend
      const result = await response.json();

      console.log("Backend result:", result);

      // Send the result to the Results page
      navigate("/results", {
        state: {
          result,
          patientData,
        },
      });
    } catch (error) {
      console.error("Assessment error:", error);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="assessment-page">

        {/* PAGE HEADER */}
        <div className="assessment-header">

          <div className="assessment-badge">
            ✦ CAREAI HEALTH ASSESSMENT
          </div>

          <h1>
            Let's understand
            <br />
            <span>what you're experiencing.</span>
          </h1>

          <p>
            Tell us a little about yourself and the symptoms
            you're experiencing. We'll help you understand
            what they may indicate.
          </p>

        </div>


        {/* MAIN FORM CARD */}
        <div className="assessment-container">

          <form
            className="assessment-card"
            onSubmit={handleSubmit}
          >

            {/* =========================
                PERSONAL INFORMATION
            ========================== */}

            <section className="form-section">

              <div className="section-heading">

                <div className="section-number">
                  01
                </div>

                <div>
                  <h2>About you</h2>

                  <p>
                    Basic information about the person
                    being assessed.
                  </p>
                </div>

              </div>


              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                {errors.name && (
                  <p className="field-error">
                    {errors.name}
                  </p>
                )}

              </div>


              {/* AGE + GENDER */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="age">
                    Age
                  </label>

                  <input
                    id="age"
                    type="number"
                    min="1"
                    className="form-input"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) =>
                      setAge(e.target.value)
                    }
                  />

                  {errors.age && (
                    <p className="field-error">
                      {errors.age}
                    </p>
                  )}

                </div>


                <div className="form-group">

                  <label htmlFor="gender">
                    Gender
                  </label>

                  <select
                    id="gender"
                    className="form-input"
                    value={gender}
                    onChange={(e) =>
                      setGender(e.target.value)
                    }
                  >

                    <option value="">
                      Select gender
                    </option>

                    <option value="female">
                      Female
                    </option>

                    <option value="male">
                      Male
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                  {errors.gender && (
                    <p className="field-error">
                      {errors.gender}
                    </p>
                  )}

                </div>

              </div>

            </section>


            {/* DIVIDER */}

            <div className="form-divider"></div>


            {/* =========================
                SYMPTOMS
            ========================== */}

            <section className="form-section symptom-section">

              <div className="section-heading">

                <div className="section-number">
                  02
                </div>

                <div>
                  <h2>
                    What are you experiencing?
                  </h2>

                  <p>
                    Select all symptoms that you're
                    currently experiencing.
                  </p>
                </div>

              </div>


              <div className="symptom-grid">

                {symptoms.map((symptom) => (

                  <SymptomCard
                    key={symptom.id}
                    symptom={symptom}
                    selected={selectedSymptoms.includes(
                      symptom.name
                    )}
                    onClick={() =>
                      toggleSymptom(symptom)
                    }
                  />

                ))}

              </div>


              {errors.symptoms && (
                <p className="field-error symptom-error">
                  {errors.symptoms}
                </p>
              )}

            </section>


            {/* DIVIDER */}

            <div className="form-divider"></div>


            {/* =========================
                DURATION
            ========================== */}

            <section className="form-section">

              <div className="section-heading">

                <div className="section-number">
                  03
                </div>

                <div>
                  <h2>
                    How long have you felt this way?
                  </h2>

                  <p>
                    This helps provide better context for
                    your assessment.
                  </p>
                </div>

              </div>


              <div className="form-group duration-group">

                <label htmlFor="duration">
                  Duration of symptoms
                </label>

                <div className="duration-input">

                  <input
                    id="duration"
                    type="number"
                    min="0"
                    className="form-input"
                    placeholder="Enter number of days"
                    value={duration}
                    onChange={(e) =>
                      setDuration(e.target.value)
                    }
                  />

                  <span>
                    days
                  </span>

                </div>

              </div>

            </section>


            {/* =========================
                API ERROR
            ========================== */}

            {apiError && !loading && (

              <div className="error-box">

                <strong>
                  Something went wrong.
                </strong>

                <p>
                  We couldn't complete the assessment.
                  Please check that the backend is running
                  and try again.
                </p>

                <Button
                  type="button"
                  onClick={() =>
                    setApiError(false)
                  }
                >
                  Try Again
                </Button>

              </div>

            )}


            {/* =========================
                SUBMIT
            ========================== */}

            {!apiError && (

              <div className="assessment-submit">

                {loading ? (

                  <div className="loading-state">

                    <div className="loading-spinner"></div>

                    <div>

                      <strong>
                        Analyzing your symptoms...
                      </strong>

                      <p>
                        Please wait while CAREAI
                        processes your assessment.
                      </p>

                    </div>

                  </div>

                ) : (

                  <>

                    <Button type="submit">
                      ANALYZE MY HEALTH →
                    </Button>

                    <p className="privacy-note">
                      Your information is used only for
                      this health assessment.
                    </p>

                  </>

                )}

              </div>

            )}

          </form>

        </div>

      </main>

    </div>
  );
}

export default Assessment;