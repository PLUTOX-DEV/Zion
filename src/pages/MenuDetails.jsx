import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://zion-d1ks.onrender.com";

// WhatsApp number in international format (without +)
const WHATSAPP_NUMBER = "2348053882970";

export default function MenuDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItem();
  }, [id]);

  const fetchMenuItem = async () => {
    setLoading(true);
    try {
      const url = `${API_BASE}/api/menu/${id}`;
      const res = await axios.get(url);
      if (!res.data || !res.data._id) {
        throw new Error("Invalid item");
      }
      setItem(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Menu item not found");
      navigate("/menu");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (item) {
      const message = encodeURIComponent(
        `Hi, I’d like to order *${item.name}*.`
      );
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return "/placeholder.jpg";
    if (imgUrl.startsWith("http")) {
      return imgUrl;
    }
    if (imgUrl.startsWith("/uploads")) {
      return `${API_BASE}${imgUrl}`;
    }
    return `${API_BASE}/uploads/${imgUrl}`;
  };

  return (
    <>
      <Navbar />

      <section className="py-12 px-4 md:px-8 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-4xl text-yellow-500" />
            </div>
          ) : !item ? (
            <p className="text-center text-red-500 font-medium">
              Item not found.
            </p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <img
                  src={getImageUrl(item.imgUrl)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.jpg";
                  }}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">
                  {item.name}
                </h1>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-yellow-500 text-2xl font-bold">
                  &#8358;{parseFloat(item.price).toFixed(2)}
                </p>
                <button
                  onClick={handleBuyNow}
                  className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded font-medium text-white shadow"
                >
                  Order on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
