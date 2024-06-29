"use client";

// import { Session } from "next-auth";
// import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./site/Logo";

const HomeHeader = () => {
  const style = {
    activeClasses:
      "text-gray-100 px-5 py-1 rounded-3xl hover:text-white border font-semibold text-base",
    inactiveClasses:
      "text-base py-1 px-5 font-semibold text-gray-100 h-6 hover:text-white focus:text-white",
    classes: "text-base transition-colors hover:text-blue-600",
  };
  const routerLink = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div lang="en" className="fixed z-50 w-screen px-5 backdrop-blur-sm">
      {/* //Desktop Nav Bar */}
      <>
        <div className="flex h-16 items-center justify-between">
          <div className="">
            <div className="flex h-16 items-center justify-start ">
              <Logo />
            </div>
          </div>
          <div className="-my-2 md:hidden">
            <button
              type="button"
              aria-label="menu"
              name="Menu"
              className="inline-flex items-center justify-center rounded-xl p-2 text-gray-200 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-white"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open menu</span>

              <svg
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden h-8 space-x-1 md:flex">
            {/* <Link href='/'>
              <button
                name='home'
                aria-label='home'
                className={`${style.classes} ${
                  routerLink === '/' ? style.activeClasses : style.inactiveClasses
                } focus:${style.activeClasses.split(' ').join(' focus:')}`}
              >
                Home
              </button>
            </Link> */}
            
            <Link href="https://www.voltsec-io.com/blog">
              <button
                name="Blog"
                className={`${style.classes} ${
                  routerLink === "/blog"
                    ? style.activeClasses
                    : style.inactiveClasses
                } focus:${style.activeClasses.split(" ").join(" focus:")}`}
              >
                Blogs
              </button>
            </Link>
            <Link href="https://www.voltsec-io.com/home/pricing">
              <button
                name="pricing"
                className={`${style.classes} ${
                  routerLink === "https://www.voltsec-io.com/home/pricing"
                    ? style.activeClasses
                    : style.inactiveClasses
                } focus:${style.activeClasses.split(" ").join(" focus:")}`}
              >
                Pricing
              </button>
            </Link>
            <Link href="https://www.voltsec-io.com/account">
              <button
                name="Account"
                className={`${style.classes} ${
                  routerLink === "/account"
                    ? style.activeClasses
                    : style.inactiveClasses
                } focus:${style.activeClasses.split(" ").join(" focus:")}`}
              >
                Account
              </button>
            </Link>
            <Link href="https://www.voltsec-io.com/home/contact">
              <button
                name="Contact"
                className={`${style.classes} ${
                  routerLink === "/home/contact"
                    ? style.activeClasses
                    : style.inactiveClasses
                } focus:${style.activeClasses.split(" ").join(" focus:")}`}
              >
                Speak To Sales
              </button>
            </Link>
          </nav>
          
        </div>
      </>
      <div
        className={
          open
            ? "absolute inset-x-0 top-0 block origin-top-right scale-100 transform p-2 opacity-100 transition duration-200 ease-out md:hidden"
            : "absolute inset-x-0 top-0 hidden origin-top-right scale-95 transform p-2 opacity-0 transition md:hidden"
        }
      >
        {/* // Mobile Bar */}
        <div className="z-10 rounded-lg border-2 border-gray-700 shadow-lg dark:bg-gray-800 dark:text-white ">
          <div className="mx-7 mt-5 flex items-center justify-between">
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-start lg:w-0 lg:flex-1"
            >
              <Logo />
            </div>

            <div className="mr-2">
              <button
                name="close menu"
                className="inline-flex items-center justify-center rounded-xl bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Close menu</span>
                {/* Heroicon name: outline/x */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-6 px-5 py-6 ">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 border-b-2 border-t-2 border-gray-600 pb-5 pt-5">
              <div className=" col-span-2 grid grid-cols-2 gap-x-8 gap-y-5 border-b-2 border-gray-600 pb-5 pl-2">
                <Link href="/home/pentest">
                  <button
                    name="Services"
                    onClick={() => setOpen(!open)}
                    className={`${style.classes} ${
                      routerLink === "/home/pentest"
                        ? style.activeClasses
                        : style.inactiveClasses
                    } focus:${style.activeClasses.split(" ").join(" focus:")}`}
                  >
                    Services
                  </button>
                </Link>
                {/* <Link href="/home/Blog">
									<a
										onClick={() => setOpen(!open)}
										className={`${style.classes} ${
											router.pathname === "/Blog" ||
											new URL(router.query.callbackUrl, "http://localhost:3000")
												.pathname == "/Blog"
												? style.activeClasses
												: style.inactiveClasses
										} focus:${style.activeClasses.split(" ").join(" focus:")}`}
									>
										Blog
									</a>
								</Link> */}
                <Link href="/home/pricing">
                  <button
                    name="pricing"
                    onClick={() => setOpen(!open)}
                    className={`${style.classes} ${
                      routerLink === "/home/pricing"
                        ? style.activeClasses
                        : style.inactiveClasses
                    } focus:${style.activeClasses.split(" ").join(" focus:")}`}
                  >
                    pricing
                  </button>
                </Link>
                <Link href="/account">
                  <button
                    name="Account"
                    onClick={() => setOpen(!open)}
                    className={`${style.classes} ${
                      routerLink === "/account"
                        ? style.activeClasses
                        : style.inactiveClasses
                    } focus:${style.activeClasses.split(" ").join(" focus:")}`}
                  >
                    Account
                  </button>
                </Link>
                {/* <Link href="/home/Team">
   <button
    onClick={() => setOpen(!open)}
    className={`${style.classes} ${
     routerLink === '/home/Team' 
    ? style.activeClasses
    : style.inactiveClasses
    } focus:${style.activeClasses.split(' ').join(' focus:')}`}>
    Team
   </button>
   </Link> */}
                <Link href="/home/contact">
                  <button
                    name="Contact"
                    onClick={() => setOpen(!open)}
                    className={`${style.classes} ${
                      routerLink === "/home/contact"
                        ? style.activeClasses
                        : style.inactiveClasses
                    } focus:${style.activeClasses.split(" ").join(" focus:")}`}
                  >
                    Contact us
                  </button>
                </Link>
              </div>
              <Link href="/home/pentest/web">
                <li
                  onClick={() => setOpen(!open)}
                  className="m-2 block rounded-xl text-black hover:text-blue-500"
                >
                  Web Pentest
                </li>
              </Link>
              <Link href="/home/pentest/cloud">
                <li
                  onClick={() => setOpen(!open)}
                  className="m-2 block rounded-xl text-black hover:text-blue-500"
                >
                  Cloud Pentest
                </li>
              </Link>{" "}
              <Link href="/home/pentest/network">
                <li
                  onClick={() => setOpen(!open)}
                  className="m-2 block rounded-xl text-black hover:text-blue-500"
                >
                  Network Pentest
                </li>
              </Link>
              <Link href="/home/pentest/mobile">
                <li
                  onClick={() => setOpen(!open)}
                  className="m-2 block rounded-xl text-black hover:text-blue-500"
                >
                  Mobile Pentest
                </li>
              </Link>
            </ul>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
