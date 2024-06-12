import axios from 'axios';

export interface Vulnerability {
    name: string;
    description: string;
    level: string;
    remediation: string;
}

export interface ScanResults {
    sqlInjection: Vulnerability | null;
    xss: Vulnerability | null;
    csrf: Vulnerability | null;
    openRedirect: Vulnerability | null;
    directoryTraversal: Vulnerability | null;
    securityHeaders: Vulnerability[];
}

const sqlInjectionDetails: Vulnerability = {
    name: "SQL Injection",
    description: "SQL Injection vulnerabilities allow an attacker to interfere with the queries that an application makes to its database.",
    level: "High",
    remediation: "Use prepared statements and parameterized queries to prevent SQL injection attacks."
};

const xssDetails: Vulnerability = {
    name: "Cross-Site Scripting (XSS)",
    description: "XSS vulnerabilities allow an attacker to inject malicious scripts into web pages viewed by other users.",
    level: "Medium",
    remediation: "Escape user input and use Content Security Policy (CSP) to prevent XSS attacks."
};

const csrfDetails: Vulnerability = {
    name: "Cross-Site Request Forgery (CSRF)",
    description: "CSRF vulnerabilities allow an attacker to perform actions on behalf of an authenticated user without their consent.",
    level: "High",
    remediation: "Implement anti-CSRF tokens and ensure they are used in all state-changing operations."
};

const openRedirectDetails: Vulnerability = {
    name: "Open Redirect",
    description: "Open redirect vulnerabilities allow attackers to redirect users to untrusted websites.",
    level: "Low",
    remediation: "Avoid using user-controlled inputs in redirects and validate all redirect URLs."
};

const directoryTraversalDetails: Vulnerability = {
    name: "Directory Traversal",
    description: "Directory traversal vulnerabilities allow attackers to access files and directories outside the intended directory.",
    level: "High",
    remediation: "Validate and sanitize all user inputs, and use secure APIs to access the file system."
};

const securityHeadersDetails: Vulnerability[] = [
    {
        name: "Content-Security-Policy",
        description: "The Content-Security-Policy header helps prevent cross-site scripting (XSS) attacks.",
        level: "High",
        remediation: "Set a strict Content-Security-Policy header."
    },
    {
        name: "X-Content-Type-Options",
        description: "The X-Content-Type-Options header prevents MIME type sniffing.",
        level: "Medium",
        remediation: "Set the X-Content-Type-Options header to 'nosniff'."
    },
    {
        name: "X-Frame-Options",
        description: "The X-Frame-Options header protects against clickjacking attacks.",
        level: "Medium",
        remediation: "Set the X-Frame-Options header to 'DENY' or 'SAMEORIGIN'."
    },
    {
        name: "X-XSS-Protection",
        description: "The X-XSS-Protection header enables the cross-site scripting filter built into most browsers.",
        level: "Low",
        remediation: "Set the X-XSS-Protection header to '1; mode=block'."
    },
    {
        name: "Strict-Transport-Security",
        description: "The Strict-Transport-Security header enforces secure (HTTP over SSL/TLS) connections to the server.",
        level: "High",
        remediation: "Set the Strict-Transport-Security header to 'max-age=31536000; includeSubDomains'."
    },
    {
        name: "Referrer-Policy",
        description: "The Referrer-Policy header controls how much referrer information is included with requests.",
        level: "Low",
        remediation: "Set the Referrer-Policy header to 'no-referrer' or 'same-origin'."
    },
    {
        name: "Permissions-Policy",
        description: "The Permissions-Policy header controls which features and APIs can be used in the browser.",
        level: "Medium",
        remediation: "Set the Permissions-Policy header to restrict feature usage."
    }
];

export const checkSqlInjection = async (url: string): Promise<boolean> => {
    const sqlPayloads = [
        "'", "' OR '1'='1", "' OR '1'='1' --", '"', '" OR "1"="1', '" OR "1"="1" --',
        ' OR 1=1', ' OR 1=1 --', ' OR 1=1#', ' OR 1=1/*'
    ];
    for (const payload of sqlPayloads) {
        try {
            const response = await axios.get(url + encodeURIComponent(payload));
            if (/error|syntax|database|sql/i.test(response.data)) {
                return true;
            }
        } catch (error) {
            continue;
        }
    }
    return false;
};

export const checkXss = async (url: string): Promise<boolean> => {
    const xssPayloads = [
        "<script>alert('XSS')</script>", 
        "<img src='x' onerror='alert(1)'>", 
        "<svg onload='alert(1)'>"
    ];
    for (const payload of xssPayloads) {
        try {
            const response = await axios.get(url + encodeURIComponent(payload));
            if (new RegExp(payload.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).test(response.data)) {
                return true;
            }
        } catch (error) {
            continue;
        }
    }
    return false;
};

export const checkCsrf = async (url: string): Promise<boolean> => {
    try {
        const response = await axios.get(url, {withCredentials: true});
        const hasCsrfToken = /<input[^>]+name=["']?_csrf["']?/i.test(response.data) ||
                             /<meta[^>]+name=["']?_csrf["']?/i.test(response.data) ||
                             /<meta[^>]+name=["']?csrf-token["']?/i.test(response.data);
        return !hasCsrfToken;
    } catch (error) {
        console.error("Error checking for CSRF token:", error);
        return false;
    }
};


export const checkOpenRedirect = async (url: string): Promise<boolean> => {
    const openRedirectPayloads = [
        'http://evil.com', 'https://evil.com', '//evil.com'
    ];
    for (const payload of openRedirectPayloads) {
        try {
            const response = await axios.get(url + encodeURIComponent(payload));
            if (response.request.res.responseUrl.includes(payload)) {
                return true;
            }
        } catch (error) {
            continue;
        }
    }
    return false;
};

export const checkDirectoryTraversal = async (url: string): Promise<boolean> => {
    const traversalPayloads = [
        '../../../../etc/passwd', '..%2F..%2F..%2F..%2Fetc%2Fpasswd'
    ];
    for (const payload of traversalPayloads) {
        try {
            const response = await axios.get(url + encodeURIComponent(payload));
            if (/root:/.test(response.data)) {
                return true;
            }
        } catch (error) {
            continue;
        }
    }
    return false;
};

export const scanWebsite = async (url: string, mode: string): Promise<ScanResults> => {
    const results: ScanResults = {
        sqlInjection: null,
        xss: null,
        csrf: null,
        openRedirect: null,
        directoryTraversal: null,
        securityHeaders: []
    };

    if (['high', 'balance'].includes(mode)) {
        const sqlInjectionDetected = await checkSqlInjection(url);
        if (sqlInjectionDetected) {
            results.sqlInjection = sqlInjectionDetails;
        }

        const csrfDetected = await checkCsrf(url);
        if (csrfDetected) {
            results.csrf = csrfDetails;
        }

        const openRedirectDetected = await checkOpenRedirect(url);
        if (openRedirectDetected) {
            results.openRedirect = openRedirectDetails;
        }

        const directoryTraversalDetected = await checkDirectoryTraversal(url);
        if (directoryTraversalDetected) {
            results.directoryTraversal = directoryTraversalDetails;
        }
    }

    if (['high', 'balance', 'low'].includes(mode)) {
        const xssDetected = await checkXss(url);
        if (xssDetected) {
            results.xss = xssDetails;
        }
    }

    if (mode === 'high') {
        const response = await axios.get(url);
        results.securityHeaders = securityHeadersDetails.filter(header => {
            const headerValue = response.headers[header.name.toLowerCase()];
            return !headerValue || headerValue === '';
        });
    }

    return results;
};

// Additional utility functions and enhancements can be added here
