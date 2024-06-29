export interface SecurityHeaderResult {
    name: string;
    description: string;
    level: 'high' | 'medium' | 'low';
    remediation: string;
    present: boolean;
}

export interface ScanResults {
    sqlInjection: boolean;
    xss: boolean;
    directoryTraversal: boolean;
    openRedirect: boolean;
    securityHeaders: SecurityHeaderResult[];
}

export interface SecurityHR{
    name: string,
    level: string,
    desc : string,
    recommand: string,
    present: string,
}
