import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Navbar />

      <section
        className={`py-12 md:py-16 px-4 md:px-8 max-w-3xl mx-auto transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center animate-fade-in">
          Get in <span className="text-yellow-500">Touch</span>
        </h1>

        <p className="text-center text-gray-600 mb-10 animate-fade-in delay-200">
          We’d love to hear from you! Contact us anytime via email or phone and we’ll respond as soon as possible.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 bg-white p-8 rounded shadow-md animate-slide-up">
          <a
            href="mailto:oyewusie22@gmail.com"
            className="flex-1 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
          >
            <FaEnvelope className="text-yellow-500 text-4xl animate-pulse" />
            <p className="text-gray-800 text-lg font-medium underline">
              oyewusie22@gmail.com
            </p>
          </a>

          <a
            href="tel:+234805882970"
            className="flex-1 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
          >
            <FaPhoneAlt className="text-yellow-500 text-4xl animate-pulse" />
            <p className="text-gray-800 text-lg font-medium underline">
              080-5882-970
            </p>
          </a>
        </div>
      </section>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease forwards;
          }

          .animate-fade-in.delay-200 {
            animation-delay: 0.2s;
          }

          @keyframes slide-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-slide-up {
            animation: slide-up 0.8s ease-out forwards;
            animation-delay: 0.4s;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }

          .animate-pulse {
            animation: pulse 2s infinite;
          }
        `}
      </style>
    </>
  );
}
