"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchBar({ setProducts, setLoading }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const res = await axios.post("/api/search", { query });
    setProducts(res.data.products);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <input
        type="text"
        placeholder="Search for products..."
        className="border p-2 w-80 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
      >
        Search
      </button>
    </div>
  );
}
