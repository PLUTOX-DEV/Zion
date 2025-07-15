import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const apiUrl  = import.meta.env.VITE_API_BASE || "https://zion-bn.onrender.com";


export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/menu`);
      setMenuItems(res.data);
    } catch (err) {
      toast.error("Failed to load menu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return "/placeholder.jpg";
    return imgUrl;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menuItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />

      <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
            Our <span className="text-yellow-500">Menu</span>
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <FaSpinner className="animate-spin text-5xl text-yellow-500" />
            </div>
          ) : menuItems.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No menu items available. Check back later!
            </p>
          ) : (
            <>
              <div
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in"
                style={{
                  animation: "fadeIn 1s ease-in-out",
                }}
              >
                {currentItems.map((item, index) => (
                  <Link
                    key={item._id}
                    to={`/menu/${item._id}`}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 opacity-0 animate-slide-up"
                    style={{
                      animation: `slideUp 0.6s ease forwards ${index * 0.1}s`,
                    }}
                  >
                    <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                      <img
                        src={getImageUrl(item.imgUrl)}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.jpg";
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <h2 className="text-xl font-bold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-yellow-500 font-bold text-lg">
                        &#8358;{parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 space-x-2">
                  <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? "bg-yellow-400 text-black"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
}
