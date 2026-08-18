import React from "react";

function RiskBadge({ risk }) {
  const riskClass = risk
    ? risk.toLowerCase()
    : "unknown";

  return (
    <span className={`risk-badge ${riskClass}`}>
      {risk || "Unknown"} Risk
    </span>
  );
}

export default RiskBadge;