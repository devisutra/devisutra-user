import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  priority?: boolean;
}

export default function ProductCard({ id, title, price, category, image, priority = false }: ProductProps) {
  return (
    <Link href={`/products/${id}`} className="block group bg-white rounded-xl overflow-hidden border border-[#E5DCC5] hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-[#F5F1EA]/90 text-[#4A2F1B] text-[10px] px-2 py-1 uppercase tracking-wider font-semibold rounded-sm">
          {category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-serif text-[#4A2F1B] truncate">{title}</h3>
        <div className="flex justify-between items-center mt-3">
          <p className="text-[#C2A14D] font-bold">₹{price}</p>
          
          {/* Add to Cart Button (UI Only) */}
          <button className="bg-[#4A2F1B] text-white p-2 rounded-full hover:bg-[#C2A14D] transition">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
