import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/restaurant-interior.jpg";
import foodImage from "../assets/fried-rice.png";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="landing"
        className="relative bg-cover bg-center min-h-[450px] md:min-h-[600px] flex items-center justify-center px-4 md:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${bgImage})`,
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-8">
          <div className="text-center md:text-left space-y-4 max-w-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md leading-tight">
              Welcome to <span className="text-yellow-400">Our Restaurant</span>
            </h1>
            <p className="text-gray-200 text-base sm:text-lg md:text-xl">
              Experience delightful flavors crafted with love & served with a smile.
            </p>
            <Link
              to="/menu"
              className="mt-4 inline-block px-6 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 hover:scale-105 transition transform"
            >
              Explore Menu
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={foodImage}
              alt="Delicious Fried Rice"
              className="w-40 sm:w-52 md:w-64 animate-spin [animation-duration:8s]"
            />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 md:py-16 bg-white px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            About Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            At <span className="text-yellow-500 font-semibold">Our Restaurant</span>, we’re passionate about creating memorable dining experiences. Enjoy fresh ingredients, authentic recipes, and friendly service in a cozy atmosphere.
          </p>
          <Link
            to="/about"
            className="inline-block mt-4 px-6 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="py-12 md:py-16 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Featured Dishes
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((dish) => (
              <div
                key={dish}
                className="bg-white shadow hover:shadow-md rounded-lg p-4 transition"
              >
                <img
                  src={foodImage}
                  alt={`Dish ${dish}`}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                  Delicious Dish {dish}
                </h3>
                <p className="text-gray-500 text-sm">
                  A signature dish packed with flavor and freshness.
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/menu"
            className="inline-block mt-6 px-6 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-white px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Sarah L.",
                review:
                  "The food was incredible and the ambiance was perfect. Highly recommended!",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                stars: 5,
              },
              {
                name: "Michael B.",
                review:
                  "Our family dinner was unforgettable. Amazing service & flavors.",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
                stars: 4,
              },
              {
                name: "Emily R.",
                review:
                  "A cozy spot with delicious meals and friendly staff. Will definitely come back!",
                img: "https://randomuser.me/api/portraits/women/65.jpg",
                stars: 5,
              },
            ].map((customer, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={customer.img}
                  alt={customer.name}
                  className="w-16 h-16 mx-auto rounded-full mb-4"
                />
                <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                <div className="flex justify-center mt-1 mb-2">
                  {Array.from({ length: customer.stars }).map((_, index) => (
                    <svg
                      key={index}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{customer.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-yellow-400 px-4 md:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          Ready to Visit?
        </h2>
        <p className="text-black text-sm sm:text-base mt-2 max-w-lg mx-auto">
          Book your table today and let us serve you an unforgettable experience.
        </p>
        <Link
          to="/contact"
          className="inline-block mt-4 px-6 py-2 bg-black text-yellow-400 font-medium rounded hover:bg-gray-800 transition"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
