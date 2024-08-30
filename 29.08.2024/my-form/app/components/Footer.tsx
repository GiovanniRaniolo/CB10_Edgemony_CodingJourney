"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-blue-600 p-2 text-white shadow transition hover:bg-blue-500 sm:p-3 lg:p-4"
            href="#MainContent"
            onClick={() => {
              const mainContent = document.getElementById("MainContent");
              if (mainContent) {
                mainContent.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="sr-only">Back to top</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-blue-600 lg:justify-start">
              <svg
                className="h-8"
                viewBox="0 0 118 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Your SVG logo path goes here */}
              </svg>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-6 flex justify-center gap-6 lg:justify-start">
              {/* Social Media Icons or Links */}
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                {/* Twitter Icon */}
              </a>
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                {/* LinkedIn Icon */}
              </a>
            </div>
          </div>

          <nav className="mt-12 lg:mt-0" aria-labelledby="footer-navigation">
            <h2 className="sr-only" id="footer-navigation">
              Footer Navigation
            </h2>

            <ul className="flex flex-wrap justify-center gap-6 lg:justify-end md:gap-8 lg:gap-12">
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  History
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75"
                  href="/"
                >
                  Services
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2023. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
