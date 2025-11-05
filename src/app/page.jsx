"use client";
import { useState } from "react";
import axios from "axios";
import ChatBot from "../../components/ChatBot";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("laptop");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    const { data } = await axios.get("/api/search", {
      params: { query, category, minPrice, maxPrice, rating },
    });
    setProducts(data.products || []);
  };

  const addToWishlist = async (product) => {
    await axios.post("/api/wishlist", product);
    alert("Added to Wishlist ❤");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍 Product Finder</h1>

    
      <div className="my-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome to Smart Mitra</h2>
        <ChatBot />
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Product name" className="border p-2 rounded" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="laptop">Laptop</option>
          <option value="phone">Phone</option>
          <option value="headphones">Headphones</option>
        </select>
        <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min ₹" className="border p-2 rounded" />
        <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max ₹" className="border p-2 rounded" />
        <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Min Rating (1–5)" className="border p-2 rounded" />
      </div>

      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((p, i) => (
          <div key={i} className="border rounded-lg p-4 shadow">
            <img src={p.thumbnail} alt={p.title} className="w-full h-40 object-cover rounded" />
            <h2 className="font-semibold mt-2">{p.title}</h2>
            <p className="text-gray-600">{p.price}</p>
            <p>⭐ {p.rating || "N/A"}</p>
            <p className="text-sm">{p.source}</p>
            <div className="flex justify-between mt-2">
              <a href={p.link} target="_blank" className="text-blue-600 underline">View Product</a>
              <button onClick={() => addToWishlist(p)}>❤</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
