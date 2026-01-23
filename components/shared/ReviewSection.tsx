"use client";

import { useState, useRef } from "react";
import { Star, ShieldCheck, Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { reviewsAPI } from "@/lib/api-client";
import { uploadImagesToCloudinary } from "@/lib/imageUpload";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  customerName: string;
  images?: string[];
  isVerifiedPurchase?: boolean;
  createdAt: string;
}

interface ReviewSectionProps {
  productId: string;
  initialReviews: Review[];
  initialAverageRating: number;
}

export default function ReviewSection({
  productId,
  initialReviews,
  initialAverageRating,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Form states
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 5) {
      alert("You can upload maximum 5 images");
      return;
    }

    setSelectedImages([...selectedImages, ...files]);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreview(newPreviews);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!comment.trim() || comment.trim().length < 10) {
      alert("Please write a review with at least 10 characters");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setLoading(true);

    try {
      // Upload images to Cloudinary if selected
      let uploadedImageUrls: string[] = [];
      if (selectedImages.length > 0) {
        setUploadingImages(true);
        try {
          uploadedImageUrls = await uploadImagesToCloudinary(selectedImages, 'reviews');
          setUploadingImages(false);
        } catch (imageError: any) {
          console.error("Image upload failed:", imageError);
          setUploadingImages(false);
          
          // Auto-continue without images instead of asking
          alert(`Note: Images could not be uploaded (${imageError.message}). Your review will be submitted without images.`);
          uploadedImageUrls = [];
          
          // Clear failed images from preview
          setSelectedImages([]);
          setImagePreview([]);
        }
      }

      // Submit review via API
      const reviewData = {
        productId,
        rating,
        comment: comment.trim(),
        customerName: customerName.trim(),
        images: uploadedImageUrls,
      };

      const result = await reviewsAPI.create(reviewData);

      if (result) {
        alert("✓ Review submitted successfully!\nIt will be visible after admin approval.");

        // Reset form
        setShowReviewForm(false);
        setRating(0);
        setComment("");
        setCustomerName("");
        setSelectedImages([]);
        setImagePreview([]);
      }
    } catch (error: any) {
      console.error("Error submitting review:", error);
      alert(`Error: ${error.message || "Failed to submit review. Please try again."}`);
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-serif text-[#4A2F1B]">
          Ratings & Reviews
        </h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="text-[#C2A14D] font-semibold text-sm hover:underline"
        >
          {showReviewForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Rating Summary */}
      <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#4A2F1B] mb-1">
            {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={
                  star <= Math.round(averageRating)
                    ? "fill-[#C2A14D] text-[#C2A14D]"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">{reviews.length} ratings</div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-[#F5F1EA] p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-[#4A2F1B] mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium text-[#4A2F1B] mb-2">
                Your Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-[#C2A14D] text-[#C2A14D]"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0 ? `${rating} out of 5` : "Select rating"}
                </span>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#4A2F1B] mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#C2A14D]"
                placeholder="Enter your name"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-[#4A2F1B] mb-2">
                Your Review * (Min. 10 characters)
              </label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#C2A14D]"
                placeholder="Share your experience with this product..."
              />
              <div className="text-xs text-gray-500 mt-1">
                {comment.length} characters
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-[#4A2F1B] mb-2">
                Upload Photos (Optional, Max 5)
              </label>
              <div className="text-xs text-gray-500 mb-2">
                Supported formats: JPEG, PNG, WebP, GIF (Max 5MB each)
              </div>
              <div className="flex flex-wrap gap-3">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {selectedImages.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-[#C2A14D] transition"
                  >
                    <Upload size={24} className="text-gray-400" />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4A2F1B] text-white py-3 rounded-lg font-semibold hover:bg-[#C2A14D] hover:text-[#4A2F1B] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  {uploadingImages ? "Uploading Images..." : "Submitting..."}
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                      {review.rating} <Star size={10} fill="white" />
                    </div>
                    <span className="font-semibold text-[#4A2F1B]">
                      {review.customerName}
                    </span>
                    {review.isVerifiedPurchase && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <ShieldCheck size={12} className="text-green-600" />{" "}
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {review.comment}
              </p>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {review.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:scale-105 transition"
                    >
                      <Image
                        src={image}
                        alt={`Customer photo ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}