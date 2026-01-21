"use client";

import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartCount } = useCart();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Calculate Total
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: formData,
          orderItems: cart,
          totalAmount: totalAmount,
        }),
      });

      if (res.ok) {
        // Order success hone par localStorage clear kar sakte hain (Optional)
        localStorage.removeItem("deviSutraCart");
        alert("Order Placed Successfully! 🎉");
        router.push("/shop"); // Wapas shop par bhej dein
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (cartCount === 0) {
    return <div className="p-10 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link href="/cart" className="flex items-center gap-2 text-gray-500 mb-8">
        <ArrowLeft size={20} /> Back to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* === LEFT: Address Form === */}
        <div>
          <h2 className="text-2xl font-serif text-[#4A2F1B] mb-6">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                required
                name="fullName"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4A2F1B]"
                placeholder="e.g. Rohit Kumar"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                required
                name="phone"
                type="tel"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4A2F1B]"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                required
                name="address"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4A2F1B]"
                placeholder="House No, Street, Landmark"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  required
                  name="city"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4A2F1B]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  required
                  name="pincode"
                  type="number"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4A2F1B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A2F1B] text-white py-4 rounded-lg font-semibold hover:bg-[#C2A14D] transition mt-6 flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : "Place Order (COD)"}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
               Online Payment will be available soon. Currently accepting COD only.
            </p>
          </form>
        </div>

        {/* === RIGHT: Order Summary === */}
        <div className="bg-[#F5F1EA] p-8 rounded-xl h-fit">
          <h3 className="text-xl font-serif text-[#4A2F1B] mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">
                  {item.title} <span className="text-gray-400">x{item.quantity}</span>
                </span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E5DCC5] pt-4 flex justify-between font-bold text-lg text-[#4A2F1B]">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}