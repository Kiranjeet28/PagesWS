"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

export default function Home() {
    const [loading, setLoading] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    // const [mode, setMode] = useState<string>('High');    const mode = "high"
    const router = useRouter()

    const handleScan = async (event: any) => {
        try {
            setLoading(true);
            event.preventDefault();
            // Prepare the data to send to the server
            const queryParams = new URLSearchParams();
            queryParams.append('url', url);
            router.push(`/Result?${queryParams.toString()}`);
        } catch (error) {
            console.log("%c ", error, "color: red; font-size : 10px;")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className=" flex p-10 flex-col  md:flex-row bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-700  md:p-24">

            <div className="flex flex-col items-start">
                <h1 className=" mb-14 font-sans text-center text-white text-4xl font-bold" >Website Vulnerability Scanner</h1>
                <div className='font-mono text-white w-30 font-bold' >
                    Let VoltSec.io identify vulnerabilities in your website's code. Our scanner helps keep your website safe from cyberattacks.
                </div>
                <div className='m-14'>

                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className=" w-[38vw] px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='URL' />

                    <button onClick={handleScan} disabled={loading} className={` w-[12vw] px-4 py-2 bg-green-500 text-white-500 text-bold font-[20px] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}>
                        {loading ? 'Scanning...' : 'Scan '}
                    </button>

                </div>

            </div>
            <div>
                <Image
                    src="https://www.voltsec-io.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.3ef1074c.png&w=1080&q=75"
                    width={500}
                    height={500}
                    alt="Voltsec "
                    className="animate-bounce "
                />
            </div>

        </div>

        //     {/* <div className="mb-4">
        //     <label className="block text-gray-700 font-medium mb-2">
        //         Mode:
        //         <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        //             <option value="high">High</option>
        //             <option value="balance">Balance</option>
        //             <option value="low">Low</option>
        //         </select>
        //     </label>
        // </div> */}
    );
}