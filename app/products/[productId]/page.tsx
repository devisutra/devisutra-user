"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { productsAPI, reviewsAPI } from "@/lib/api-client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Truck, ShieldCheck, Star } from "lucide-react";
import AddToCartBtn from "@/components/shared/AddToCartBtn";
import ReviewSection from "@/components/shared/ReviewSection";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  stock: number;
  createdAt: string;
}

interface Review {
  _id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  isApproved?: boolean;
  isActive?: boolean;
  isVerifiedPurchase?: boolean;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.productId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product
        const productData = await productsAPI.getById(productId);
        setProduct(productData);

        // Fetch reviews for this product
        const reviewsData = await reviewsAPI.getByProduct(productId);
        const approvedReviews = Array.isArray(reviewsData) 
          ? reviewsData.filter((r: Review) => r.isApproved !== false && r.isActive !== false) 
          : [];
        setReviews(approvedReviews);

        // Calculate average rating
        const avgRating = approvedReviews.length > 0
          ? approvedReviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / approvedReviews.length
          : 0;
        setAverageRating(avgRating);

        // Fetch related products from same category
        const allProducts = await productsAPI.getAll({ category: productData.category });
        const related = Array.isArray(allProducts) 
          ? allProducts.filter((p: Product) => p._id !== productId).slice(0, 4)
          : [];
        setRelatedProducts(related);

      } catch (error) {
        console.error("Failed to load product:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-[#F5F1EA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A2F1B] mx-auto mb-4"></div>
          <p className="text-[#4A2F1B]">Loading product...</p>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="bg-[#F5F1EA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4A2F1B] mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-[#C2A14D] hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Get customer images from reviews
  const customerImages = reviews
    .filter((review: Review) => review.images && review.images.length > 0)
    .flatMap((review: Review) => review.images || [])
    .slice(0, 12);

  return (
    <div className="bg-[#F5F1EA] min-h-screen pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4A2F1B] mb-6 transition"
        >
          <ArrowLeft size={20} /> Back to Shop
        </Link>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 bg-white rounded-2xl p-4 md:p-8 shadow-sm">
          {/* === LEFT: Product Images === */}
          <div>
            {/* Main Image */}
            <div className="bg-gray-100 rounded-xl overflow-hidden border border-[#E5DCC5] relative w-full aspect-square mb-4">
              <Image
                src={product.images[0] || "/placeholder.jpg"}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img: string, idx: number) => (
                  <div key={idx} className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-[#C2A14D] transition">
                    <Image
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 15vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* === RIGHT: Product Info === */}
          <div className="flex flex-col">
            {/* Category & Brand */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#C2A14D] font-bold tracking-wider text-xs uppercase bg-[#F5F1EA] px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-gray-500 text-sm">Devi Sutra</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-serif text-[#4A2F1B] mb-3">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                {averageRating.toFixed(1)} <Star size={14} fill="white" />
              </div>
              <span className="text-gray-600 text-sm">
                ({reviews.length} ratings)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#4A2F1B]">₹{product.price}</span>
                <span className="text-xl text-gray-400 line-through">₹{Math.round(product.price * 1.5)}</span>
                <span className="text-green-600 font-semibold">33% off</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Stock Availability */}
            <div className="mb-6">
              {product.stock > 5 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="font-semibold">In Stock ({product.stock} available)</span>
                </div>
              ) : product.stock > 0 ? (
                <div className="flex items-center gap-2 text-orange-500">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="font-semibold">Low Stock ({product.stock} left)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#4A2F1B] mb-2">Product Details</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description || "Premium quality handcrafted product. Made with love and care by skilled artisans."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <AddToCartBtn
                product={{
                  id: product._id.toString(),
                  title: product.title,
                  price: product.price,
                  image: product.images[0] || "/placeholder.jpg",
                }}
                disabled={product.stock <= 0}
              />
              <button 
                disabled={product.stock <= 0}
                className={`flex-1 border-2 py-3 rounded-lg font-semibold transition ${
                  product.stock <= 0
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-[#4A2F1B] text-[#4A2F1B] hover:bg-[#F5F1EA]'
                }`}
              >
                {product.stock <= 0 ? 'Out of Stock' : 'Buy Now'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#E5DCC5] pt-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="text-[#C2A14D] shrink-0" size={24} />
                <span>Free Delivery across India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="text-[#C2A14D] shrink-0" size={24} />
                <span>Quality Checked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Images Section */}
        {customerImages.length > 0 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <h2 className="text-xl md:text-2xl font-serif text-[#4A2F1B] mb-6">Customer Photos</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {customerImages.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:scale-105 transition">
                  <Image
                    src={img}
                    alt={`Customer photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <ReviewSection 
          productId={product._id.toString()} 
          initialReviews={JSON.parse(JSON.stringify(reviews))}
          initialAverageRating={averageRating}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif text-[#4A2F1B] mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct: any) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct._id}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-[#C2A14D] transition">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={relatedProduct.images[0] || "/placeholder.jpg"}
                        alt={relatedProduct.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-[#4A2F1B] mb-1 truncate">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-base font-bold text-[#4A2F1B]">₹{relatedProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
