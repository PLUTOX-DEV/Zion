import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://zion-d1ks.onrender.com";

export default function MenuDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItem();
  }, [id]);

  const fetchMenuItem = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/menu/${id}`);
      if (!res.data || !res.data._id) {
        throw new Error("Invalid data");
      }
      setItem(res.data);
    } catch (err) {
      toast.error("Menu item not found");
      navigate("/menu");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (item) {
      toast.success(`You have ordered: ${item.name}`);
    }
  };

  return (
    <>
      <Navbar />

      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
          {loading ? (
            <p className="text-center text-gray-500 italic">Loading...</p>
          ) : !item ? (
            <p className="text-center text-gray-500 italic">
              Item not found.
            </p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-full md:w-1/2 h-64 object-cover rounded"
              />
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-800">
                  {item.name}
                </h1>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-yellow-500 font-bold text-xl">
                  ${parseFloat(item.price).toFixed(2)}
                </p>

                <button
                  onClick={handleBuyNow}
                  disabled={loading}
                  className={`mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
