export type SecurityRiskStatusLabel =
  | "minimal"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type SecurityRiskStatusColor = "success" | "warning" | "error";

type SecurityRiskStatus = {
  label: SecurityRiskStatusLabel;
  color: SecurityRiskStatusColor;
};


export const getSecurityRiskStatus = (
  securityRiskCoef: number,
): SecurityRiskStatus => {
  if (securityRiskCoef < 0.2) {
    return { label: "minimal", color: "success" };
  }

  if (securityRiskCoef < 0.4) {
    return { label: "low", color: "warning" };
  }

  if (securityRiskCoef < 0.7) {
    return { label: "medium", color: "warning" };
  }

  if (securityRiskCoef < 0.8) {
    return { label: "high", color: "error" };
  }

  return { label: "critical", color: "error" };
};