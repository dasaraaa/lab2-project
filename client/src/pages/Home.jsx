import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import foto from "../assets/images/foto.jpg";
import News from "../components/News";
import "../index.css";
import PopularResources from "./PopularResources";
import { Link } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      {/* Background Image */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={foto}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover animated-bg"
        />
        {/* Overlay Text */}
        <div className="relative z-10 px-6 pt-14 lg:px-8">
          <div className="w-full max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-left px-6 text-black">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Welcome to the UBT Inventory System!
              </h1>
              <p className="mt-6 text-lg leading-7">
                Easily manage and track all your equipment and supplies.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="/signup"
                  className="rounded-md bg-black hover:bg-white text-white px-3.5 py-2.5 text-sm font-semibold border border-black hover:text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a
                  href="/about"
                  className="rounded-md bg-white hover:bg-black text-black px-3.5 py-2.5 text-sm font-semibold border border-white hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <PopularResources />
        
        {/* View More Button */}
        <div className="flex justify-end mt-6">
          <Link to={"/inventory"}>
            <button
              type="button"
              className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm mb-4 mr-4 px-5 py-2.5 text-center inline-flex items-center"
            >
              <AiFillEye className="mr-2" />
              View More
            </button>
          </Link>
        </div>
      </div>

      <News />
      <Footer />
    </div>
  );
}
