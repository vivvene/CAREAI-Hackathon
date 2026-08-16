function SymptomCard({ symptom, selected, onToggle }) {
  return (
    <button
      type="button"
      className={`symptom-card ${selected ? "selected" : ""}`}
      onClick={() => onToggle(symptom.id)}
    >
      <div className="symptom-card-icon">
        {symptom.icon}
      </div>

      <div className="symptom-card-content">
        <h3>{symptom.name}</h3>
        <p>{symptom.description}</p>
      </div>

      <div className="symptom-card-check">
        {selected ? "✓" : "+"}
      </div>
    </button>
  );
}

export default SymptomCard;