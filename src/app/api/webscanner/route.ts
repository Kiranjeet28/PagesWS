// app/api/scan/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { scanWebsite, ScanResults } from '../../../lib/webscanner';

// Function to validate URL format
const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url, mode } = body;

        if (!url || !mode) {
            return NextResponse.json({ error: 'URL and mode are required' }, { status: 400 });
        }

        if (!isValidUrl(url)) {
            return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
        }

        const results: ScanResults = await scanWebsite(url, mode);
        return NextResponse.json(results, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({
            error : true , 
            message : "Website access forbidden "
        },{
            status: 403
        })
    }
}
