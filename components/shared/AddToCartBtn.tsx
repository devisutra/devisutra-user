"use client";

import { useCart } from "@/lib/CartContext";
import { ShoppingBag } from "lucide-react";

interface AddToCartBtnProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  disabled?: boolean;
}

export default function AddToCartBtn({ product, disabled = false }: AddToCartBtnProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => !disabled && addToCart({ ...product, quantity: 1 })}
      disabled={disabled}
      className={`flex-1 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
        disabled
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-[#4A2F1B] text-white hover:bg-[#C2A14D]'
      }`}
    >
      <ShoppingBag size={20} /> {disabled ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );
}
