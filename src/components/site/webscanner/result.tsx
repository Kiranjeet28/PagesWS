"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loading from "@/components/loading";
import React from "react";
import ErrorPage from "@/components/error";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { LinkPreview } from "@/components/UI/Componets/link-preview";
import { ScanResults } from "@/type/result";
import SecurityHeaderResult from "@/components/HeaderResult";
import { Highlight } from "@/components/UI/Componets/hero-highlight";

function Result() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  const [results, setResults] = useState<ScanResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const mode = "high";

  const handleResult = async () => {
    window.scrollBy({
      top: window.innerHeight, // 100vh equivalent
      behavior: "smooth", // Optional for smooth scrolling
    });
  };
  const handleRoute = async () => {
    try {
      await route.push("/webscanner");
    } catch (error) {
      console.log(error);
    }
  };
  const handleScan = useCallback( async () => {
    if (!url) {
      setError("URL is missing in the query parameters.");
      setErrorStatus(true);
      return;
    }

    setLoading(true);
    setResults(null);
    setErrorStatus(false); // Reset error state before the request

    try {
      const response = await axios.post("/api/webscanner", { url, mode });
      setResults(response.data);
    } catch (error: any) {
      // Catch specifically AxiosError for more details
      setErrorStatus(true);

      // Handle different error scenarios based on status code or error message:
      if (error.response?.status === 500) {
        setError(
          "Internal Server Error: An unexpected error occurred on the server. Please try again later."
        );
      } else if (error.response?.data?.message) {
        // Check for message in response data
        setError(error.response.data.message);
      } else if (error.message.includes("Network Error")) {
        // Handle network errors
        setError(
          "Network Error: Failed to connect to the server. Please check your internet connection."
        );
      } else {
        setError(
          "An error occurred while scanning the website. Please try again later."
        ); // Generic error message
      }

      console.error("Error scanning website:", error); // Log the complete error for debugging
    } finally {
      setLoading(false);
    }
  },[url,mode])


  useEffect(() => {
    if (url) {
      handleScan();
    }
  }, [url,handleScan]);

  return (
    <div className="p-8 pt-1 bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-700 text-white rounded-lg shadow-lg">
      {loading && <Loading />}
      {results && (
        <div className="flex flex-col">
          {/* upper div */}
          <div className=" rounded-3xl bg-white/20 p-5 px-5 py-5 m-10 pt-10 text-left text-white/90 shadow-2xl backdrop-blur-sm aos-init aos-animate flex flex-col items-center justify-center mx-3 md:mx-24">
            <h1 className="md:text-7xl text-2xl font-mono font-bold text-white mb-4 text-center md:mt-20 mt-5">
              Scan Results
            </h1>
            <p className="text-bold text-lg md:text-2xl bg-blend-soft-light mb-5">
              Vulnerable&#9989; or Not &#10060;{" "}
            </p>
            <div className="flex flex-row justify-evenly w-[70vw] ">
              <div className="relative text-[15px] md:text-[30px]  font-semibold self-start text-black bg-gray-100 p-6  border-blue-300 rounded-lg ">
                <p className=" mb-2">
                  SQL Injection:{" "}
                  {results.sqlInjection ? (
                    <span> &#9989;</span>
                  ) : (
                    <span>&#10060;</span>
                  )}
                </p>
                <p className=" mb-2">
                  XSS:{" "}
                  {results.xss ? <span> &#9989;</span> : <span>&#10060;</span>}
                </p>
                <p className=" mb-2">
                  Directory Traversal:{" "}
                  {results.directoryTraversal ? (
                    <span> &#9989;</span>
                  ) : (
                    <span>&#10060;</span>
                  )}
                </p>
                <p className=" mb-2">
                  Open Redirect:{" "}
                  {results.openRedirect ? (
                    <span> &#9989;</span>
                  ) : (
                    <span>&#10060;</span>
                  )}
                </p>
              </div>
              <Image
                src="https://www.voltsec-io.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F22.1bf87156.png&w=640&q=75"
                height={300}
                width={300}
                className="animate-bounce mt-10 md:mt-0 mb-3 md:h-[41vh] md:w-[45vh] h-[15vh] w-[15vh] "
                alt="Image of Result"
              />
            </div>
            <div className="flex flex-row justify-evenly items-stretch">
              <Button
                text={"See result"}
                onClick={() => {
                  handleResult();
                }}
                disabled={""}
                className="ml-4 text-2xl"
              />
              <LinkPreview
                url="https://www.voltsec-io.com/"
                className="font-bold"
              >
                <Button
                  text={"Vist Volsec.io"}
                  onClick={""}
                  disabled={""}
                  className="ml-4 text-2xl "
                />
              </LinkPreview>
              <Button
                text={"Scan other Website"}
                onClick={() => {
                  handleRoute();
                }}
                disabled={""}
                className="ml-4 text-2xl"
              />
            </div>
          </div>

          {mode === "high" && (
            <div className="mt-4">
              <Highlight className="text-black text-3xl ml-4 font-bold mb-4 dark:text-white">
                Security Headers
              </Highlight>
              <h3 className="text-xl font-bold text-white mb-2"></h3>
              <div className="bg-white/30 text-white shadow-2xl  p-3 md:px-7 md:p-5 rounded-lg mx-[6vw] mb-2">
                <ul className=" flex flex-row justify-between items-center font-bold">
                  <li className="w-[45vw] text-left ml-9">Name</li>
                  <li className="w-[45vw] text-center">Level</li>
                  <li className="w-[45vw] text-right mr-14">
                    <span className="">Status</span>
                  </li>
                </ul>
              </div>
              <ul className="list-disc list-inside text-white">
                {results.securityHeaders.length > 0 ? (
                  results.securityHeaders.map((header, index) => (
                    <li key={index} className="mb-2 list-none">
                      <SecurityHeaderResult
                        name={header.name}
                        desc={header.description}
                        level={header.level}
                        recommand={header.remediation}
                        present={header.present ? "Present" : "Missing"}
                      />
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
      {errorStatus && (
        <div className="">
          <ErrorPage error={error} />
        </div>
      )}
    </div>
  )
}

export default Result;