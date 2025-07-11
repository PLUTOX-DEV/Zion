import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://zion-d1ks.onrender.com";

export default function Admin() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API_BASE}/api/menu`);
      if (Array.isArray(res.data)) {
        setMenuItems(res.data);
      } else {
        setMenuItems([]);
        toast.error("Invalid menu data received.");
      }
    } catch (error) {
      toast.error("Failed to load menu items: " + error.message);
      setMenuItems([]);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price || !imageFile) {
      toast.error("Please fill all fields and upload an image!");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("image", imageFile);

      await axios.post(`${API_BASE}/api/menu`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      toast.success("Menu item added successfully!");
      setForm({ name: "", description: "", price: "" });
      setImageFile(null);
      setUploadProgress(0);

      fetchMenuItems();
    } catch (error) {
      toast.error(
        "Failed to add item: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting item…");
    try {
      await axios.delete(`${API_BASE}/api/menu/${id}`);
      toast.dismiss(toastId);
      toast.success("Menu item deleted");
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(
        "Failed to delete item: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin <span className="text-yellow-500">Panel</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-4 mb-10"
        >
          <h2 className="text-xl font-semibold text-gray-700">
            Add New Menu Item
          </h2>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Dish Name"
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
          />
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (e.g. 12.99)"
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
          />
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Menu Item"}
          </button>
        </form>

        {/* Menu items */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Current Menu Items
        </h2>

        {fetching ? (
          <p className="text-gray-500 italic text-center animate-pulse">
            Loading menu items...
          </p>
        ) : menuItems.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No menu items yet. Add one above!
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-50 p-4 rounded shadow relative group"
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                <p className="text-yellow-500 font-bold">
                  ${parseFloat(item.price).toFixed(2)}
                </p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-lg opacity-0 group-hover:opacity-100 transition"
                  title="Delete item"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
