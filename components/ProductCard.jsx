import axios from "axios";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);

  const addToWishlist = async () => {
    try {
      await axios.post("/api/wishlist", {
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        source: product.source,
        link: product.link,
      });
      setAdded(true);
      alert("Added to wishlist ❤️");
    } catch (err) {
      console.error("Wishlist Error:", err);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-contain" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-500">{product.price}</p>
      <p className="text-sm text-gray-400">{product.source}</p>

      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => window.open(product.link, "_blank")}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          View Product
        </button>

        <button
          onClick={addToWishlist}
          disabled={added}
          className={`px-3 py-1 rounded ${
            added ? "bg-red-400" : "bg-red-500 hover:bg-red-600"
          } text-white`}
        >
          {added ? "❤️ Added" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
