function RiskBadge({ risk }) {
  const riskLevel = risk?.toLowerCase();

  return (
    <div className={`risk-badge ${riskLevel || "unknown"}`}>
      {risk || "Unknown Risk"}
    </div>
  );
}

export default RiskBadge;