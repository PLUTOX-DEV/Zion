import React from "react";
import Navbar from "../components/Navbar";
import bgImage from "../assets/restaurant-interior.jpg";
import foodImage from "../assets/fried-rice.jpg";

export default function Home() {
  return (
    <>
      <Navbar />
      <section
        id="landing"
        className="relative bg-cover bg-center h-[400px] md:h-[500px] w-full flex items-center justify-center px-6 md:px-16"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Optional: subtle overlay */}
        <div className="absolute inset-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
          {/* Left: Text */}
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow">
              Welcome to Our Restaurant
            </h1>
            <p className="text-white text-lg md:text-xl max-w-md">
              Enjoy delicious meals crafted with care and served with love.
            </p>
            <button className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition">
              Explore Menu
            </button>
          </div>

          {/* Right: Rice Image */}
          <div className="mt-6 md:mt-0 md:ml-8">
            <img
              src={foodImage}
              alt="Delicious Fried Rice"
              className="w-48 md:w-72 animate-spin"
              style={{
                animationDuration: "8s", // slow spin
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
