import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function About() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const aboutImage =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80";

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-yellow-50 to-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">
            About <span className="text-yellow-500">Our Restaurant</span>
          </h1>

          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            Discover our story, our passion, and what makes dining with us unforgettable.
          </p>

          <div
            className={`flex flex-col md:flex-row items-center gap-10 transition-all duration-700 ease-out ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="relative w-full md:w-1/2">
              <img
                src={aboutImage}
                alt="About Our Restaurant"
                className="rounded-xl shadow-xl object-cover max-h-[400px] w-full"
              />
              <div className="absolute bottom-4 right-4 bg-yellow-400 text-black px-3 py-1 text-sm font-semibold rounded shadow">
                Since 2024
              </div>
            </div>

            <div className="md:w-1/2 text-gray-700 text-lg leading-relaxed space-y-6">
              <p>
                At{" "}
                <span className="font-semibold text-yellow-500">
                  Our Restaurant
                </span>
                , we’ve been serving joy on a plate since 2024. Every dish is
                crafted with love, using the freshest local ingredients and
                recipes that blend tradition with innovation.
              </p>
              <p>
                Our chefs and staff are dedicated to giving you an experience
                worth savoring — warm hospitality, an inviting atmosphere, and
                flavors that linger.
              </p>
              <p>
                Whether it’s a casual lunch, a family dinner, or a
                celebration, you’re always welcome at our table.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
