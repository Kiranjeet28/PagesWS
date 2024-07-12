"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Images from "@/components/image";
import ImageOfAI from "../../../../public/imageOfAI.png";
import { userEmail, UserWebLink } from "@/Schema/EmailLink";
import { UserEmail, UserWebLink as UserWebLinkType } from "@/type/Main";
import { ApiResponse } from "@/type/ApiResponse";
import axios, { AxiosError } from "axios";
import Button from "@/components/button";

export default function Webscanner() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Please, Check your Email & URL"
  );
  const [email, setEmail] = useState<UserEmail>("");
  const [url, setUrl] = useState<UserWebLinkType>("");
  const router = useRouter();

  const handleScan = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post<ApiResponse>("/api/PostEmailAPI", { email, url });
      // Validate URL and Email
      UserWebLink.parse(url);
      userEmail.parse(email);

      const queryParams =  new URLSearchParams();
       queryParams.append("url", url);
      await router.push(`Webscanner/Result?${queryParams.toString()}`);
    } catch (error: any) {
      
      console.error("%c ", error, "color: red; font-size: 10px;");
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      console.log(errorMessage);
      setError(true);

      // Handle Zod error messages
      if (error.errors) {
        const errorMessages = error.errors
          .map((err: any) => err.message)
          .join(", ");
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setError(false);
      setErrorMessage("");
    }
  };

  return (
    <div className=" bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-700  ">
      <section
        className="relative flex min-h-screen flex-row flex-wrap items-center justify-center overflow-hidden
			 bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-700 p-5 md:p-0"
      >
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="mx-auto flex h-full w-full flex-row flex-wrap items-center justify-between rounded-3xl bg-white p-0 shadow-2xl bg-white/20 md:max-w-3xl md:p-10"
        >
          <Images
            src="https://www.voltsec-io.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.7f2dc77e.png&w=640&q=75"
            classes="right-0 md:right-0  md:top-10 top-5 "
            text="Expert Security Support"
            TextClasses="md:right-[1vw] top-5 right-0 md:top-[9vh]"
            time={2000}
            loading={loading}
          />

          <Images
            src="https://www.voltsec-io.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.3ef1074c.png&w=640&q=75"
            classes="bottom-10 right-0 md:bottom-10 md:right-0 "
            text="Voltsec.io Scanners"
            TextClasses=" right-10 md:bottom-[44vh] md:right-[1vw]"
            time={3000}
            loading={loading}
          />

          <Images
            src="https://www.voltsec-io.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F16.5edaeb50.png&w=640&q=75"
            classes="md:left-10 -left-5 md:top-10 top-5 "
            text="Voltsec.io Pentest"
            TextClasses="left-10 top-[8vh]"
            time={4000}
            loading={loading}
          />
          <Images
            src={ImageOfAI}
            classes="md:bottom-[10vh] md:left-10  bottom-10 left-0"
            text="AI powered"
            TextClasses="md:bottom-[38vh] md:left-10  bottom-10 left-10"
            time={5000}
            loading={loading}
          />

          <div className="flex flex-col items-start p-[10px]">
            <h1 className=" md:mb-14  mb-8 font-sans text-center text-white md:text-4xl text-3xl font-bold">
              Website Vulnerability Scanner
            </h1>
            <div className="font-mono text-white w-30 font-bold">
              Let VoltSec.io identify vulnerabilities in your website code. Our
              scanner helps keep your website safe from cyberattacks.
            </div>
            <div className="md:mt-14 mt-7 flex items-center justify-center flex-col w-full">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className=" md:w-[45vw] px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 rounded-xl  "
                placeholder="Enter Scope"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" md:w-[45vw] lg:w-[45vw] px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 mt-5 rounded-xl "
                placeholder="Enter Your Email to Verify"
              />

              {error && <>{errorMessage}</>}
              <Button
                text={loading ? "Scanning..." : "Scan "}
                disabled={loading}
                onClick={handleScan}
                className={""}
              />
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
}
