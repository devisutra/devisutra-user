# Review System - Architecture & Design Documentation

## System Overview

The Review System is a multi-tier architecture designed to handle product reviews with admin moderation. The system ensures data integrity, security, and scalability across frontend and backend services.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER FRONTEND (Next.js)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           ReviewSection Component                     │   │
│  │  - Rating selection (1-5 stars)                       │   │
│  │  - Comment input with validation                      │   │
│  │  - Image upload preview (max 5)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │     API Client Layer (lib/api-client.ts)             │   │
│  │  - reviewsAPI.create()                               │   │
│  │  - reviewsAPI.getByProduct()                         │   │
│  │  - Centralized error handling                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Image Upload Service (lib/imageUpload.ts)          │   │
│  │  - uploadImageToCloudinary()                         │   │
│  │  - uploadImagesToCloudinary()                        │   │
│  │  - File validation (size, type)                      │   │
│  │  - Cloudinary credentials from env                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ↓                              ↓
         │                              │
    [Cloudinary]              [Backend API Server]
    (Image CDN)               ┌──────────────────────────────┐
                              │   Express.js + TypeScript    │
                              │                              │
                              │  Routes (routes/reviews.ts)  │
                              │  ├─ POST /api/reviews        │
                              │  ├─ GET /api/reviews         │
                              │  ├─ GET /api/reviews/:id     │
                              │  └─ GET /api/admin/reviews   │
                              │                              │
                              │  Models (models/Review.ts)   │
                              │  ├─ productId                │
                              │  ├─ rating (1-5)             │
                              │  ├─ comment                  │
                              │  ├─ customerName             │
                              │  ├─ images[] (URLs)          │
                              │  ├─ isApproved: false        │
                              │  └─ isActive: true           │
                              │                              │
                              │  Middleware (auth)           │
                              │  - authenticate              │
                              │  - validate request          │
                              └──────────────────────────────┘
                                        ↓
                              [MongoDB Database]
                              ┌──────────────────────┐
                              │  reviews collection  │
                              │  - Indexed by        │
                              │    productId         │
                              │    createdAt         │
                              │    rating            │
                              └──────────────────────┘
                                        ↓
┌─────────────────────────────────────────────────────────────┐
│              ADMIN FRONTEND (Next.js)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │       Admin Reviews Page (app/reviews/page.tsx)      │   │
│  │  - Filter tabs (All / Pending / Approved)            │   │
│  │  - Review details display                            │   │
│  │  - Approve / Reject / Delete actions                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │     Admin API Client (lib/api-client.ts)             │   │
│  │  - reviewsAPI.getAll()                               │   │
│  │  - reviewsAPI.approve()                              │   │
│  │  - reviewsAPI.reject()                               │   │
│  │  - reviewsAPI.delete()                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
             ↓
    [Admin API Routes]
    POST /api/admin/reviews/approve/:id
    PUT /api/admin/reviews/reject/:id
    DELETE /api/admin/reviews/:id
```

## Component Architecture

### 1. **Frontend - ReviewSection Component**
**Location**: `devisutra-user/components/shared/ReviewSection.tsx`

**Responsibilities**:
- Display existing reviews with ratings and comments
- Render review submission form
- Handle image selection and preview
- Trigger image upload and review submission
- Display success/error messages

**Key Features**:
- Star rating input (1-5)
- Text validation (min 10 characters)
- Image preview before upload (max 5 images)
- Loading states during submission
- Graceful error handling

### 2. **API Client Layer**
**Location**: `devisutra-user/lib/api-client.ts`

**Purpose**: Centralized API communication with validation and error handling

**Methods**:
```typescript
reviewsAPI.getByProduct(productId: string)
  ↓ Returns: {reviews[], averageRating, totalReviews}

reviewsAPI.create(reviewData: ReviewData)
  ↓ Returns: Created review object
  ↓ Validates: rating (1-5), comment (10+ chars), required fields

reviewsAPI.getById(reviewId: string)
  ↓ Returns: Review object with full details
```

**Key Benefits**:
- Single source of truth for API endpoints
- Centralized error handling
- Request/response interceptors
- Automatic JWT token attachment

### 3. **Image Upload Service**
**Location**: `devisutra-user/lib/imageUpload.ts`

**Responsible for**:
- Validating image files (type, size)
- Uploading to Cloudinary CDN
- Handling upload errors gracefully
- Supporting batch uploads (up to 5 images)

**Validation Rules**:
- **File Types**: JPEG, PNG, WebP, GIF
- **Max Size**: 5MB per image
- **Max Count**: 5 images per review

**Environment Variables** (from `.env.local`):
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=desdizloo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=devisutra_products
```

### 4. **Backend - Express API**
**Location**: `devisutra-api/src/routes/reviews.routes.ts`

**Endpoints**:

#### **GET /api/reviews**
- Retrieve approved reviews for a product
- Query params: `productId` (required)
- Returns: `{reviews[], averageRating, totalReviews}`
- Filter: Only `isApproved: true` reviews

#### **POST /api/reviews**
- Submit a new review
- Body: `{productId, rating, comment, customerName, images[]}`
- Returns: Created review with `isApproved: false`
- Validation: Checks product exists

#### **GET /api/reviews/:id**
- Get single review details
- Returns: Full review object

### 5. **Database - MongoDB**
**Model**: `Review.ts`

**Schema**:
```typescript
{
  productId: ObjectId (required),
  rating: Number (1-5),
  comment: String (required),
  customerName: String (required),
  images: [String] // Cloudinary URLs,
  userId?: ObjectId,
  isVerified: Boolean (default: false),
  isVerifiedPurchase: Boolean (default: false),
  isApproved: Boolean (default: false), // Admin approval flag
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
```typescript
{ productId: 1, createdAt: -1 }  // For fetching reviews by product
{ userId: 1 }                     // For user profile reviews
{ rating: -1 }                    // For sorting by rating
```

## Data Flow

### Review Submission Flow

```
1. User fills review form in ReviewSection
   ├─ Rating: 1-5 stars
   ├─ Name: Customer name
   ├─ Comment: Min 10 characters
   └─ Images: Optional, max 5

2. Form validation (client-side)
   ├─ Check required fields
   ├─ Validate comment length
   └─ Validate image files

3. Image Upload (if images selected)
   ├─ uploadImagesToCloudinary()
   ├─ Get secure URLs from Cloudinary
   └─ Handle upload errors gracefully

4. API Call via reviewsAPI.create()
   ├─ Send to POST /api/reviews
   ├─ Include image URLs
   └─ Server validates request

5. Backend Processing
   ├─ Verify product exists
   ├─ Validate review data
   ├─ Save with isApproved: false
   └─ Return created review

6. User Feedback
   ├─ Success message
   ├─ Reset form
   └─ Note about admin approval
```

### Review Approval Flow

```
1. Admin views pending reviews
   ├─ Admin dashboard
   ├─ Filter by status (Pending/Approved)
   └─ Display review details with image previews

2. Admin action
   ├─ Approve → isApproved: true
   ├─ Reject → isApproved: false (marked)
   └─ Delete → Remove review

3. Review visibility
   ├─ Approved → Visible on product page
   ├─ Rejected → Hidden from public
   └─ Deleted → Removed from database
```

## Security Considerations

### 1. **Authentication & Authorization**
- API endpoints require JWT token from localStorage
- Admin endpoints check admin role
- CORS configured for allowed origins

### 2. **Data Validation**
- Server-side validation of all inputs
- Rating range check: 1-5 only
- Comment length validation
- Product ID verification

### 3. **Image Security**
- File type whitelist: JPEG, PNG, WebP, GIF
- File size limit: 5MB
- Stored on Cloudinary CDN
- No local file storage

### 4. **Environment Variables**
All sensitive credentials from `.env.local`:
```
NEXT_PUBLIC_API_URL          → Backend API URL
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME    → Cloudinary account
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET → Unsigned preset
```

### 5. **Rate Limiting**
- Consider implementing per-user rate limit
- Prevent review spam

## Error Handling Strategy

### Frontend Error Handling
```typescript
// User feedback
if (imageError) {
  alert(`Error: ${error.message}\nContinue without images?`)
}

if (apiError) {
  alert(`Error: ${error.message}`)
}
```

### Backend Error Handling
```typescript
// Validation errors
400 Bad Request → Missing/invalid fields

// Not found
404 Not Found → Product doesn't exist

// Server errors
500 Internal Server Error → Database/server issues
```

## Performance Optimizations

### 1. **Image Optimization**
- Lazy load image previews
- Cloudinary handles image compression
- CDN delivers optimized formats

### 2. **API Optimization**
- Pagination for review lists
- Index on `productId` for faster queries
- Caching of average ratings

### 3. **Component Optimization**
- Memoize expensive calculations
- Lazy load ReviewSection component
- Conditional rendering of form

## Testing Strategy

### Unit Tests
```typescript
// imageUpload.ts
- Validate image file validation
- Mock Cloudinary API responses
- Test error handling

// api-client.ts
- Test API method responses
- Mock axios interceptors
- Test error scenarios
```

### Integration Tests
```
- Submit review → Verify in database
- Upload images → Verify on Cloudinary
- Approve review → Verify visibility on product page
```

### E2E Tests
```
1. User submits review with images
2. Admin approves review
3. User sees approved review on product page
4. Other users can see the review
```

## Scalability Considerations

### Current Architecture
- Single API server
- MongoDB for persistence
- Cloudinary for images

### Future Improvements
- **Caching**: Redis for cached review data
- **Search**: Elasticsearch for review search
- **Notifications**: Email/SMS when review approved
- **Pagination**: Implement cursor-based pagination
- **Moderation**: AI-based content moderation
- **Analytics**: Track review submission patterns

## Environment Configuration

### `.env.local` (User Frontend)
```
# API Configuration
NEXT_PUBLIC_API_URL=https://devisutra-api.onrender.com

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=desdizloo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=devisutra_products
```

### `.env` (Backend API)
```
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret
```

## Deployment Checklist

- [ ] Cloudinary account configured
- [ ] Upload preset created (unsigned mode)
- [ ] Environment variables set in `.env.local`
- [ ] Backend API deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Test review submission end-to-end
- [ ] Verify image uploads to Cloudinary
- [ ] Test admin review approval
- [ ] Verify approved reviews visible on product page

## Monitoring & Logging

### Frontend
- Browser console logs for errors
- API response interceptor logs
- Image upload progress tracking

### Backend
- Express middleware logs
- MongoDB query logs
- Error stack traces

## Conclusion

This review system architecture provides:
✅ Secure credential management via environment variables
✅ Clean separation of concerns (API client, image service, components)
✅ Robust error handling at each layer
✅ Scalable design for future enhancements
✅ Good UX with validation and feedback
✅ Admin moderation workflow for content control
