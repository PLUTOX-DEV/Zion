import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import aboutImage from "../assets/restaurant-interior.jpg";

export default function About() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About <span className="text-yellow-500">Our Restaurant</span>
        </h1>

        <div
          className={`flex flex-col md:flex-row items-center gap-8 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={aboutImage}
            alt="About Our Restaurant"
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-[400px]"
          />

          <div className="md:w-1/2 text-gray-700 text-lg leading-relaxed space-y-6">
            <p>
              Established in 2020, Our Restaurant is committed to bringing you the freshest ingredients combined with authentic recipes and modern flair.
            </p>
            <p>
              Our chefs are passionate about creating dishes that excite your taste buds and make every visit memorable.
            </p>
            <p>
              We value great service, warm hospitality, and an atmosphere where you can relax and enjoy every bite.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
