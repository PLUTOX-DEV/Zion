import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/menu`);
      setMenuItems(res.data);
    } catch (err) {
      toast.error("Failed to load menu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            Our <span className="text-yellow-500">Menu</span>
          </h1>

          {loading ? (
            <p className="text-center text-gray-500 italic">Loading menu...</p>
          ) : menuItems.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No menu items available. Check back later!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {menuItems.map((item) => (
                <Link
                  key={item._id}
                  to={`/menu/${item._id}`}
                  className="bg-white rounded-lg shadow hover:shadow-md transition hover:scale-[1.02]"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-yellow-500 font-bold">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
