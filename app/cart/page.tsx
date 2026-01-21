"use client";

import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();

  // Total Price Calculation
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-[#4A2F1B] mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you have not found anything yet.
        </p>
        <Link
          href="/shop"
          className="bg-[#4A2F1B] text-white px-8 py-3 rounded-lg hover:bg-[#C2A14D] transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif text-[#4A2F1B] mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* === LEFT: Cart Items List === */}
        <div className="flex-1 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white p-4 rounded-xl border border-[#E5DCC5] items-center"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-[#4A2F1B]">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-[#F5F1EA] px-3 py-2 rounded-lg">
                {/* Minus Button - Decreases Quantity */}
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="p-1 hover:text-[#C2A14D] transition"
                  title="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                {/* Quantity Display */}
                <span className="text-sm font-bold text-[#4A2F1B] px-2 min-w-[3ch] text-center">
                  {item.quantity}
                </span>

                {/* Plus Button - Increases Quantity */}
                <button
                  onClick={() => addToCart(item)}
                  className="p-1 hover:text-[#C2A14D] transition"
                  title="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Price & Remove */}
              <div className="text-right">
                <p className="font-bold text-[#4A2F1B] mb-2">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* === RIGHT: Order Summary === */}
        <div className="w-full lg:w-96 h-fit bg-white p-6 rounded-xl border border-[#E5DCC5] sticky top-24">
          <h2 className="text-xl font-serif text-[#4A2F1B] mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6 border-b border-[#E5DCC5] pb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold text-[#4A2F1B] mb-8">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-[#4A2F1B] text-white py-4 rounded-lg font-semibold hover:bg-[#C2A14D] transition flex items-center justify-center gap-2"
          >
            Proceed to Checkout <ArrowRight size={20} />
          </Link>

          <p className="text-xs text-center text-gray-400 mt-4">
            Secure Checkout powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
