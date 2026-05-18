
export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type AttackStatus = 'pending' | 'firing' | 'blocked' | 'passed';
export type ActionType = 'ALLOW' | 'DENY' | 'LOG' | 'HUMAN_REVIEW';

export interface LobsterTrapResult {
  riskScore: number;
  intentCategory: string;
  severity: Severity;
  piiDetected: boolean;
  injectionDetected: boolean;
  exfiltrationPattern: boolean;
  credentialsExposed: boolean;
  intentMismatch: boolean;
  action: ActionType;
  declaredIntent: string;
  detectedIntent: string;
}

export interface Attack {
  id: string;
  attackType: string;
  attackMessage: string;
  intent: string;
  expectedVulnerability?: string;
  agentResponse?: string;
  status: AttackStatus;
  lobsterTrapResult?: LobsterTrapResult;
  analysis?: {
    explanation: string;
    dangerReason: string;
    fix: string;
    complianceImpact?: string;
  };
}

export interface Session {
  id: string;
  mode: 'mode2' | 'mode3';
  systemPrompt?: string;
  industry?: string;
  attacks: Attack[];
  overallRiskScore: number;
  totalAttacks: number;
  attacksBlocked: number;
  attacksPassed: number;
  createdAt: string;
}

export interface ForensicResult {
  index: number;
  userMessage: string;
  agentResponse: string | null;
  lobsterTrapResult: LobsterTrapResult;
  analysis?: {
    attackType: string;
    severity: Severity;
    forensicAnalysis: string;
    attackerIntent: string;
    agentFailure: string;
    recommendation: string;
    complianceNote?: string;
  };
}

export interface Mode3Audit {
  id: string;
  findings: ForensicResult[];
  summary?: {
    auditSummary: string;
    securityPosture: string;
    incidentCount: number;
    mostCriticalFinding: string;
    complianceRisk: string;
    remediationPriorities: string[];
    auditVerdict: string;
  };
}
