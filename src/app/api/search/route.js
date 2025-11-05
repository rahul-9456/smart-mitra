import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const rating = searchParams.get("rating");

  const apiKey = process.env.SERP_API_KEY;

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_shopping",
        q: `${query} ${category}`,
        api_key: apiKey,
        gl: "in",
        hl: "en",
      },
    });

    const products = response.data.shopping_results?.map((item) => ({
      title: item.title,
      price: item.price,
      link: item.link,
      thumbnail: item.thumbnail,
      source: item.source,
      rating: item.rating,
      reviews: item.reviews,
      delivery: item.delivery,
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error("SerpAPI Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
