"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productsAPI } from "@/lib/api-client";

interface Product {
  _id: string;
  title: string;
  images: string[];
  price: number;
  category: string;
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 4 products
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await productsAPI.getAll({ limit: 4 });
        const data = response.data || [];
        
        // Get latest 4 products with images
        const productsWithImages = (Array.isArray(data) ? data : [])
          .filter((product: Product) => product.images && product.images.length > 0)
          .slice(0, 4);
        
        setProducts(productsWithImages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLatestProducts();
  }, []);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (products.length === 0) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, products]);

  const handlePrev = () => {
    if (isTransitioning || products.length === 0) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning || products.length === 0) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="bg-[#E5DCC5] px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-linear-to-r from-[#F5F1EA] to-[#E5DCC5] rounded-2xl overflow-hidden shadow-lg h-75 md:h-100 lg:h-125 flex items-center justify-center">
            <div className="text-[#4A2F1B] text-xl">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no products
  if (products.length === 0) {
    return (
      <section className="bg-[#E5DCC5] px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-linear-to-r from-[#F5F1EA] to-[#E5DCC5] rounded-2xl overflow-hidden shadow-lg h-75 md:h-100 lg:h-125 flex items-center justify-center">
            <div className="text-[#4A2F1B] text-xl">No products available</div>
          </div>
        </div>
      </section>
    );
  }

  const currentProduct = products[activeIndex];

  return (
    <section className="bg-[#E5DCC5] px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <Link href={`/products/${currentProduct._id}`}>
          <div className="relative bg-linear-to-r from-[#F5F1EA] to-[#E5DCC5] rounded-2xl overflow-hidden shadow-lg h-75 md:h-100 lg:h-125 cursor-pointer group">
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePrev();
              }}
              disabled={isTransitioning}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition z-20 disabled:opacity-50"
            >
              <ChevronLeft size={28} className="text-[#4A2F1B]" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              disabled={isTransitioning}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition z-20 disabled:opacity-50"
            >
              <ChevronRight size={28} className="text-[#4A2F1B]" />
            </button>

            {/* Main Image */}
            <div className="absolute inset-0">
              <Image
                src={currentProduct.images[0]}
                alt={currentProduct.title}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                  isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
                }`}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                unoptimized
              />
            </div>

            {/* Product Info Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6 group-hover:from-black/70 transition">
              <div className="text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{currentProduct.title}</h2>
                <p className="text-lg font-semibold">₹{currentProduct.price}</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === activeIndex ? "bg-[#4A2F1B] w-8" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
