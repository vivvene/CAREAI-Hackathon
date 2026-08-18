import React from "react";

function SymptomCard({ symptom, selected, onClick }) {
  return (
    <div
      className={`symptom-card ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <div className="symptom-icon">
        {symptom.icon}
      </div>

      <h3>{symptom.name}</h3>
    </div>
  );
}

export default SymptomCard;