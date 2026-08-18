import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function Home() {
  return (
    <div className="app">

      <Navbar />

      <main className="home-page">

        {/* HERO SECTION */}
        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">
              ✦ AI-ASSISTED HEALTH GUIDANCE
            </div>

            <h1>
              Understand your symptoms.
              <br />
              <span>Take the next step.</span>
            </h1>

            <p>
              CAREAI helps you assess your symptoms,
              understand potential health risks, and
              find appropriate healthcare guidance.
            </p>

            <Link
              to="/assessment"
              className="hero-button"
            >
              Start Health Assessment
              <span>→</span>
            </Link>

          </div>

          <div className="hero-visual">

            <div className="health-orb">
              <span>✚</span>
            </div>

            <div className="floating-card card-one">
              <span>✓</span>
              AI Analysis
            </div>

            <div className="floating-card card-two">
              <span>♥</span>
              Health Guidance
            </div>

          </div>

        </section>


        {/* FEATURES */}
        <section className="features">

          <div className="section-intro">
            <p className="eyebrow">
              HOW CAREAI WORKS
            </p>

            <h2>
              Smart health assessment,
              <br />
              simplified.
            </h2>
          </div>


          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">
                🔎
              </div>

              <h3>
                Symptom Assessment
              </h3>

              <p>
                Enter your symptoms and basic
                health information.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">
                🤖
              </div>

              <h3>
                AI Guidance
              </h3>

              <p>
                Receive an easy-to-understand
                explanation of your result.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">
                🏥
              </div>

              <h3>
                Healthcare Support
              </h3>

              <p>
                Find appropriate healthcare
                resources when needed.
              </p>
            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="home-cta">

          <div>
            <p className="eyebrow">
              READY TO BEGIN?
            </p>

            <h2>
              Let's understand
              what you're experiencing.
            </h2>
          </div>

          <Link
            to="/assessment"
            className="cta-button"
          >
            Begin Assessment →
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Home;