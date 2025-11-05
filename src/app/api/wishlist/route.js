import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  title: String,
  link: String,
  price: String,
  source: String,
  thumbnail: String,
  rating: String,
  delivery: String,
});

const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);

export async function GET() {
  await connectDB();
  const items = await Wishlist.find();
  return NextResponse.json(items);
}

export async function POST(req) {
  const data = await req.json();
  await connectDB();
  const newItem = await Wishlist.create(data);
  return NextResponse.json(newItem);
}

export async function DELETE(req) {
  const { id } = await req.json();
  await connectDB();
  await Wishlist.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
