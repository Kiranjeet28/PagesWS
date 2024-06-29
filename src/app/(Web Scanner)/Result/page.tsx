'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import React from 'react';

interface SecurityHeaderResult {
    name: string;
    description: string;
    level: 'high' | 'medium' | 'low';
    remediation: string;
    present: boolean;
}

interface ScanResults {
    sqlInjection: boolean;
    xss: boolean;
    directoryTraversal: boolean;
    openRedirect: boolean;
    securityHeaders: SecurityHeaderResult[];
}

function Result() {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');
    
    const [results, setResults] = useState<ScanResults | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    const mode = 'high';

    const handleScan = async () => {
        if (!url) {
            setError('URL is missing in the query parameters.');
            setErrorStatus(true);
            return;
        }

        setLoading(true);
        setResults(null);
        setErrorStatus(false); // Reset error state before the request
      
        try {
            const response = await axios.post('/api/webscanner', { url, mode });
            setResults(response.data);
        } catch (error: any) { // Catch specifically AxiosError for more details
            setErrorStatus(true);
      
            // Handle different error scenarios based on status code or error message:
            if (error.response?.status === 500) {
                setError('Internal Server Error: An unexpected error occurred on the server. Please try again later.');
            } else if (error.response?.data?.message) { // Check for message in response data
                setError(error.response.data.message);
            } else if (error.message.includes('Network Error')) { // Handle network errors
                setError('Network Error: Failed to connect to the server. Please check your internet connection.');
            } else {
                setError('An error occurred while scanning the website. Please try again later.'); // Generic error message
            }
      
            console.error('Error scanning website:', error); // Log the complete error for debugging
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url) {
            handleScan();
        }
    }, [url]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {results && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Scan Results</h2>
                    <p className="text-gray-700 mb-2">SQL Injection: {results.sqlInjection ? 'Vulnerable' : 'Not Vulnerable'}</p>
                    <p className="text-gray-700 mb-2">XSS: {results.xss ? 'Vulnerable' : 'Not Vulnerable'}</p>
                    <p className="text-gray-700 mb-2">Directory Traversal: {results.directoryTraversal ? 'Vulnerable' : 'Not Vulnerable'}</p>
                    <p className="text-gray-700 mb-2">Open Redirect: {results.openRedirect ? 'Vulnerable' : 'Not Vulnerable'}</p>
                    {mode === 'high' && (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-blue-600 mb-2">Security Headers</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {results.securityHeaders.length > 0 ? (
                                    results.securityHeaders.map((header, index) => (
                                        <li key={index}>
                                            <p><strong>{header.name}</strong></p>
                                            <p>Description: {header.description}</p>
                                            <p>Level: {header.level}</p>
                                            <p>Remediation: {header.remediation}</p>
                                            <p>Status: {header.present ? 'Present' : 'Missing'}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>None</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {errorStatus && <div className="text-red-500">{error}</div>}
        </div>
    );
}

export default Result;
