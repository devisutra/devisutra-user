'use client';

import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/shared/HeroCarousel";
import { useEffect, useState } from "react";
import { productsAPI } from "@/lib/api-client";
import type { Product } from "@/types";

export default function HomePage() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 10 });
      const productsArray = response.data || [];
      setRecentProducts(productsArray.slice(0, 10));
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white pb-20 md:pb-0">
      
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Categories Section */}
      <section className="py-6 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-4 md:gap-10 flex-wrap">
            {/* Category 1 */}
            <Link href="/shop?category=Bags" className="flex flex-col items-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#E5DCC5] rounded-full flex items-center justify-center mb-1.5 md:mb-2 group-hover:bg-[#C2A14D]/30 transition border-2 border-[#C2A14D]/20 relative overflow-hidden">
                <Image src="https://res.cloudinary.com/desdizloo/image/upload/v1768835582/knmzxumdjiuygtew6cre.jpg" alt="Tote Bags" fill className="object-cover" sizes="(max-width: 768px) 48px, 80px" />
              </div>
              <span className="text-[10px] md:text-sm font-medium text-[#4A2F1B]">Tote Bags</span>
            </Link>

            {/* Category 2 */}
            <Link href="/shop?category=Purses" className="flex flex-col items-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#E5DCC5] rounded-full flex items-center justify-center mb-1.5 md:mb-2 group-hover:bg-[#C2A14D]/30 transition border-2 border-[#C2A14D]/20 relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=100" alt="Purses" fill className="object-cover" sizes="(max-width: 768px) 48px, 80px" />
              </div>
              <span className="text-[10px] md:text-sm font-medium text-[#4A2F1B]">Purses</span>
            </Link>

            {/* Category 3 */}
            <Link href="/shop?category=Clothes" className="flex flex-col items-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#E5DCC5] rounded-full flex items-center justify-center mb-1.5 md:mb-2 group-hover:bg-[#C2A14D]/30 transition border-2 border-[#C2A14D]/20 relative overflow-hidden">
                <Image src="https://res.cloudinary.com/desdizloo/image/upload/v1768835327/bja0ly9iheswmwcuexix.jpg" alt="Kurtis" fill className="object-cover" sizes="(max-width: 768px) 48px, 80px" />
              </div>
              <span className="text-[10px] md:text-sm font-medium text-[#4A2F1B]">Kurtis</span>
            </Link>

            {/* Category 4 */}
            <Link href="/shop?category=Offers" className="flex flex-col items-center group">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-[#E5DCC5] rounded-full flex items-center justify-center mb-1.5 md:mb-2 group-hover:bg-[#C2A14D]/30 transition border-2 border-[#C2A14D]/20">
                <span className="text-xl md:text-3xl">🎁</span>
              </div>
              <span className="text-[10px] md:text-sm font-medium text-[#4A2F1B]">Offers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 px-4 bg-[#F5F1EA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4A2F1B] mb-8">Best Sellers</h2>
          
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : recentProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentProducts.map((product) => (
                <div 
                  key={product._id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group"
                >
                  <Link href={`/products/${product._id}`}>
                    <div className="relative w-full aspect-square bg-gray-100">
                      <Image 
                        src={product.images[0] || "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400"} 
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-medium text-[#4A2F1B] mb-2">
                      {product.title}
                    </h3>
                    <p className="text-lg font-bold text-[#4A2F1B] mb-3">₹{product.price}</p>
                    <button className="w-full bg-[#C2A14D] text-white py-2.5 rounded-md text-sm font-medium hover:bg-[#A08939] transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative w-full aspect-square bg-gray-100">
                    <Image 
                      src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400" 
                      alt="Embroidered Tote"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm md:text-base font-medium text-[#4A2F1B] mb-2">
                      Embroidered Tote
                    </h3>
                    <p className="text-lg font-bold text-[#4A2F1B] mb-3">₹1299</p>
                    <button className="w-full bg-[#C2A14D] text-white py-2.5 rounded-md text-sm font-medium hover:bg-[#A08939] transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}