"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { productsAPI } from "@/lib/api-client";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { Filter } from "lucide-react";
import ProductSkeleton from "@/components/shared/ProductSkeleton";
import InfiniteScrollLoader from "@/components/shared/InfiniteScrollLoader";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  createdAt: string;
}

const PRODUCTS_PER_PAGE = 10;

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") || "All";
  
  // Categories list
  const categories = [
    "All",
    "Bags",
    "Thaila",
    "Clothes",
    "Rubber",
    "Accessories",
  ];

  /**
   * Fetch function for infinite scroll
   * Memoized to prevent unnecessary re-renders
   */
  const fetchProducts = useCallback(
    async (page: number) => {
      try {
        const filters: any = {
          page,
          limit: PRODUCTS_PER_PAGE,
        };
        
        if (categoryFilter !== "All") {
          filters.category = categoryFilter;
        }

        const response = await productsAPI.getAll(filters);
        
        return {
          data: response.data || [],
          hasMore: response.pagination?.hasMore || false,
          totalItems: response.pagination?.totalItems || 0,
        };
      } catch (error) {
        console.error("Failed to load products:", error);
        throw error;
      }
    },
    [categoryFilter]
  );

  // Initialize infinite scroll hook
  const {
    items: products,
    loading,
    loadingMore,
    hasMore,
    error,
    reset,
    observerRef,
  } = useInfiniteScroll<Product>({
    fetchFunction: fetchProducts,
    initialPage: 1,
    threshold: 300, // Trigger 300px before bottom
  });

  /**
   * Reset pagination when category changes
   */
  useEffect(() => {
    reset();
  }, [categoryFilter, reset]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif text-[#4A2F1B]">Our Collection</h1>
        <p className="text-gray-500 mt-2">Handcrafted with love, strictly for you.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* === FILTERS === */}
        {/* Mobile: Horizontal Scrollable */}
        <div className="md:hidden">
          <div className="flex items-center gap-2 mb-3 text-[#4A2F1B] font-semibold text-sm">
            <Filter size={16} /> Filters
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  categoryFilter === cat
                    ? "bg-[#4A2F1B] text-white shadow-md" // Active Style
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#C2A14D] hover:text-[#4A2F1B]" // Inactive Style
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Left Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          {/* Filters */}
          <div className="bg-white p-6 rounded-xl border border-[#E5DCC5] sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-[#4A2F1B] font-bold pb-2 border-b border-[#E5DCC5]">
              <Filter size={18} /> Filters
            </div>
            
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      categoryFilter === cat
                        ? "bg-[#4A2F1B] text-white font-medium"
                        : "text-gray-600 hover:bg-[#F5F1EA] hover:text-[#4A2F1B]"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* === RIGHT SIDE (PRODUCT GRID) === */}
        <main className="flex-1">
          {/* Error State */}
          {error && (
            <div className="text-center py-10 bg-red-50 rounded-xl border border-red-200">
              <p className="text-red-600 text-lg font-medium">{error}</p>
              <button
                onClick={reset}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Initial Loading State */}
          {loading && (
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {products.map((product: Product, index: number) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group"
                    >
                      <Link href={`/products/${product._id}`}>
                        <div className="relative w-full aspect-square bg-gray-100">
                          <Image
                            src={product.images[0] || "/placeholder.jpg"}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition duration-300"
                            priority={index < 4}
                          />
                          {/* Stock Badge */}
                          {product.stock <= 0 && (
                            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                              Out of Stock
                            </div>
                          )}
                          {product.stock > 0 && product.stock <= 5 && (
                            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                              Only {product.stock} left
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <span className="text-[#C2A14D] text-xs font-semibold uppercase">
                          {product.category}
                        </span>
                        <h3 className="text-sm md:text-base font-medium text-[#4A2F1B] mb-2 mt-1">
                          {product.title}
                        </h3>
                        <p className="text-lg font-bold text-[#4A2F1B] mb-2">
                          ₹{product.price}
                        </p>

                        {/* Stock Status */}
                        <div className="mb-3">
                          {product.stock > 5 ? (
                            <span className="text-green-600 text-xs font-medium">
                              In Stock ({product.stock} available)
                            </span>
                          ) : product.stock > 0 ? (
                            <span className="text-orange-600 text-xs font-medium">
                              Low Stock ({product.stock} left)
                            </span>
                          ) : (
                            <span className="text-red-600 text-xs font-medium">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        <button
                          className={`w-full py-2.5 rounded-md text-sm font-medium transition ${
                            product.stock > 0
                              ? "bg-[#C2A14D] text-white hover:bg-[#A08939]"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={product.stock <= 0}
                        >
                          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Infinite Scroll Loader */}
                  {loadingMore && <InfiniteScrollLoader />}

                  {/* Sentinel Element for Intersection Observer */}
                  {hasMore && !loadingMore && (
                    <div ref={observerRef} className="col-span-2 h-10" />
                  )}

                  {/* End Message */}
                  {!hasMore && products.length > 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      <p className="text-sm font-medium">
                        You have reached the end of our collection
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // No products found
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">
                    No products found in{" "}
                    <span className="font-bold text-[#4A2F1B]">
                      {categoryFilter}
                    </span>{" "}
                    category.
                  </p>
                  <Link
                    href="/shop"
                    className="text-[#C2A14D] hover:underline mt-2 inline-block"
                  >
                    Clear Filters
                  </Link>
                </div>
              )}
            </>
          )}
        </main>

      </div>
    </div>
  );
}