export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-teal-600 text-white">
      <h1 className="text-xl font-semibold">ShopMitra</h1>
      <div className="flex gap-6">
        <a href="/" className="hover:underline">Home</a>
        <a href="/wishlist" className="hover:underline">Wishlist</a>
      </div>
    </nav>
  );
}
