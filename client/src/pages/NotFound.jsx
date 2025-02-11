import React from "react";
const array = [1, 2, 3, 4, 4, 3];
const NotFound = () => {
  return (
    <>
      {array.map((ele, i) => {
        return (
          <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex animate-pulse sm:justify-center">
                <div className="relative h-6 w-80 rounded-full bg-blue-400 px-3 py-1 text-sm leading-6 text-gray-600 ring-2 ring-blue-50 hover:ring-blue-400 ">
                  <a href="#" className="font-semibold">
                    <span className="absolute inset-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-pulse">
                  <div className="h-3.5 bg-gray-500 rounded-full dark:bg-gray-700 max-w-[640px] mb-3.5 mx-auto"></div>
                  <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                </h1>
                <div role="status" className="mt-3.5 space-y-2.5 animate-pulse">
                  <div className="flex justify-center items-center w-full space-x-2">
                    <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-32"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32"></div>
                    <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                  </div>
                  <div className="flex justify-center items-center w-full space-x-2">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <div className="flex justify-center items-center w-full space-x-2 ">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  </div>
                  <div className="flex items-center w-full space-x-2">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md animate-pulse w-40 h-8 bg-blue-200 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition:1s focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  ></a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    <div className="h-4 bg-blue-200 rounded-full dark:bg-blue-400 w-40 animate-pulse"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NotFound;
