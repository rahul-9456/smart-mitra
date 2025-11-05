"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const { data } = await axios.get("/api/wishlist");
    setItems(data.items);
  };

  const deleteItem = async (id) => {
    await axios.delete("/api/wishlist", { data: { id } });
    fetchWishlist();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist ❤️</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow">
            <img src={item.thumbnail} alt={item.title} className="h-40 w-full object-contain" />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-500">{item.price}</p>
            <p className="text-sm text-gray-400">{item.source}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => window.open(item.link, "_blank")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                View
              </button>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
