import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/restaurant-interior.jpg";
import foodImage from "../assets/fried-rice.png";
import { FaUtensils, FaStar, FaConciergeBell } from "react-icons/fa";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://zion-d1ks.onrender.com";
const PLACEHOLDER_IMG = "/placeholder.jpg"; // You can put a placeholder image in your public folder

export default function Home() {
  const [featuredDishes, setFeaturedDishes] = useState([]);

  useEffect(() => {
    fetchFeaturedDishes();
  }, []);

  const fetchFeaturedDishes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/menu`);
      const shuffled = res.data.sort(() => 0.5 - Math.random());
      setFeaturedDishes(shuffled.slice(0, 3)); // pick 3 random
    } catch (err) {
      console.error("Failed to fetch dishes:", err);
    }
  };

  const testimonials = [
    {
      name: "Sarah L.",
      review: "The food was incredible and the ambiance was perfect. Highly recommended!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
    },
    {
      name: "Michael B.",
      review: "Our family dinner was unforgettable. Amazing service & flavors.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 4,
    },
    {
      name: "Emily R.",
      review: "A cozy spot with delicious meals and friendly staff. Will definitely come back!",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      stars: 5,
    },
  ];

  // Helper to get the correct image URL with fallback and error handling
  const getDishImageUrl = (imgUrl) => {
    if (!imgUrl) return PLACEHOLDER_IMG;
    if (imgUrl.startsWith("http")) return imgUrl;
    if (imgUrl.startsWith("/uploads")) return `${API_BASE}${imgUrl}`;
    return `${API_BASE}/uploads/${imgUrl}`;
  };

  // On error, fallback to placeholder image
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMG;
  };

  return (
    <>
      <Navbar />

      <main className="scroll-smooth">

        {/* Hero */}
        <section
          id="landing"
          className="relative bg-cover bg-center min-h-[500px] md:min-h-[650px] flex items-center justify-center px-4 md:px-8"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${bgImage})`,
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-6xl">
            <div className="text-center md:text-left space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow leading-tight">
                Welcome to <span className="text-yellow-400">Abebi's Kitchen</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-lg">
                Taste the difference — fresh, flavorful, unforgettable.
              </p>

              <Link
                to="#featured"
                className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 hover:scale-105 transition"
              >
                <FaUtensils /> Explore Our Dishes
              </Link>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src={foodImage}
                alt="Delicious Dish"
                className="w-40 sm:w-52 md:w-64"
                style={{
                  animation: "spin 8s linear infinite",
                }}
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-20 bg-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              At{" "}
              <span className="text-yellow-500 font-semibold">
                Our Restaurant
              </span>
              , we’re passionate about creating memorable dining experiences.
              Enjoy fresh ingredients, authentic recipes, and friendly service
              in a cozy atmosphere.
            </p>
            <Link
              to="/about"
              className="inline-block mt-4 px-6 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Featured Dishes */}
        <section id="featured" className="py-20 bg-gray-50 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 animate-fade-in">
              Featured Dishes
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {featuredDishes.map((dish, i) => (
                <div
                  key={dish._id}
                  className="bg-white shadow hover:shadow-lg rounded-lg p-4 transition transform hover:scale-[1.03] opacity-0 animate-slide-up"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <img
                    src={getDishImageUrl(dish.imgUrl)}
                    alt={dish.name}
                    onError={handleImageError}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-700">
                    {dish.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{dish.description}</p>
                  <p className="text-yellow-600 font-bold mt-1">
                    ${parseFloat(dish.price).toFixed(2)}
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
        <section className="py-20 bg-white px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 animate-fade-in">
              What Our Customers Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {testimonials.map((customer, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition transform hover:scale-[1.02] opacity-0 animate-slide-up"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <img
                    src={customer.img}
                    alt={customer.name}
                    className="w-16 h-16 mx-auto rounded-full mb-4"
                  />
                  <h3 className="font-semibold text-gray-800">
                    {customer.name}
                  </h3>
                  <div className="flex justify-center mt-1 mb-2">
                    {Array.from({ length: customer.stars }).map((_, index) => (
                      <FaStar key={index} className="text-yellow-400 w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm">{customer.review}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-12 bg-yellow-400 px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-black">Ready to Visit?</h2>
          <p className="text-black text-base mt-2 max-w-lg mx-auto">
            Book your table today and let us serve you an unforgettable
            experience.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-4 px-6 py-2 bg-black text-yellow-400 font-medium rounded hover:bg-gray-800 transition"
          >
            <FaConciergeBell /> Contact Us
          </Link>
        </section>
      </main>

      {/* Animations */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease forwards;
          }
          .animate-slide-up {
            animation: slideUp 0.6s ease forwards;
          }
        `}
      </style>
    </>
  );
}
