function Home() {
  return (
    <main className="home">

      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            AI-ASSISTED HEALTH GUIDANCE
          </p>

          <h1>
            Understand your symptoms.
            <span> Take the next step.</span>
          </h1>

          <p className="hero-description">
            CAREAI helps you assess your symptoms,
            understand potential health risks, and find
            appropriate healthcare guidance.
          </p>

          <a href="/assessment" className="primary-button">
            Start Health Assessment →
          </a>

        </div>

        <div className="hero-card">

          <div className="health-icon">
            🩺
          </div>

          <h3>Smart Health Assessment</h3>

          <p>
            Symptom analysis, risk assessment and
            personalized guidance in one place.
          </p>

        </div>

      </section>

      <section className="features">

        <div className="feature-card">
          <span>🔍</span>
          <h3>Symptom Assessment</h3>
          <p>
            Enter your symptoms and basic health information.
          </p>
        </div>

        <div className="feature-card">
          <span>🤖</span>
          <h3>AI Guidance</h3>
          <p>
            Receive an easy-to-understand explanation of your result.
          </p>
        </div>

        <div className="feature-card">
          <span>🏥</span>
          <h3>Healthcare Support</h3>
          <p>
            Find appropriate healthcare resources when needed.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Home;