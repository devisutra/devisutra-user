# Security Best Practices - Review System

## Overview
This document outlines the security architecture and best practices implemented in the review system.

## 1. Environment Variables Management

### Public vs Private Credentials

#### ✅ Safe to Expose (NEXT_PUBLIC_*)
These are publicly accessible and cannot compromise the system:
```env
NEXT_PUBLIC_API_URL=https://devisutra-api.onrender.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=desdizloo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=devisutra_products
```

**Why safe?**
- API URL is already public (users connect to it)
- Cloudinary cloud name is just an identifier
- Upload preset is unsigned (no secret key required)

#### ❌ Never Expose (No NEXT_PUBLIC_*)
These must NEVER be in frontend code:
```env
# Backend API
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://user:pass@host/db

# Cloudinary
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Payment Gateway
RAZORPAY_SECRET_KEY=xxx

# Admin credentials
ADMIN_PASSWORD=xxx
```

### Environment Variable Files

```
devisutra-user/
├─ .env.local (GITIGNORED - local development)
├─ .env.production (GITIGNORED - production secrets)
└─ .env.example (✓ Tracked in git - for reference)
```

**Never commit**:
- `.env.local`
- `.env.production`
- `.env` files with secrets

## 2. File Upload Security

### Client-Side Validation
```typescript
// lib/imageUpload.ts
const validateImageFile = (file: File): void => {
  // 1. Size validation
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error('Image size must be less than 5MB');
  }

  // 2. Type validation
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPEG, PNG, WebP, and GIF images are allowed');
  }
};
```

### Server-Side Validation
```typescript
// API receives URL from Cloudinary - no raw file uploads
// Additional validation can be added:
- Check URL is from Cloudinary CDN
- Validate image dimensions
- Scan for malicious content (optional: ImageAI)
```

### Cloudinary Security
- Images stored on Cloudinary's secure CDN
- No local file storage (no server disk space needed)
- Automatic virus scanning available
- HTTPS delivery by default

## 3. API Security

### Authentication
```typescript
// All API calls include JWT token via interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Authorization
- User reviews: `POST /api/reviews` (any authenticated user)
- Admin reviews: `GET /api/admin/reviews` (admin only)
- Backend verifies admin role before returning data

### Request Validation
```typescript
// Every request is validated
POST /api/reviews {
  productId: string (required),
  rating: number (1-5 only),
  comment: string (min 10 chars),
  customerName: string (required),
  images: string[] (Cloudinary URLs only)
}
```

### Error Responses
```typescript
// Never expose sensitive information
❌ Bad: "Database connection failed: mongodb://user:pass@host/db"
✅ Good: "Failed to process request"

❌ Bad: "Validation error in field 'customerName'"
✅ Good: "Invalid input provided"
```

## 4. Data Protection

### In Transit
- HTTPS/TLS for all API calls
- Encrypted connections to Cloudinary
- No plain HTTP anywhere

### At Rest
```typescript
// MongoDB encryption
- Database requires authentication
- Connection string has credentials
- Never hardcoded - loaded from env

// Review Data
- Stores user names and comments
- Images stored on Cloudinary (external)
- PII handled carefully
```

### Data Retention
- Reviews stored indefinitely (with admin approval)
- Deleted reviews removed from database
- Images can be deleted from Cloudinary

## 5. XSS & Injection Prevention

### SQL Injection
```typescript
// Using MongoDB ODM (Mongoose) - protected
✅ Safe: Review.findById(userId)
❌ Vulnerable: Direct SQL queries

// Using parameterized queries if needed
✅ Safe: user.find({ email: userEmail })
```

### XSS (Cross-Site Scripting)
```typescript
// React sanitizes by default
✅ Safe: <p>{review.comment}</p>  // React escapes HTML

// Never use dangerous methods
❌ Dangerous: dangerouslySetInnerHTML
❌ Dangerous: innerHTML = userInput
```

### CSRF (Cross-Site Request Forgery)
- Axios includes credentials by default
- API validates origin/referer headers
- SameSite cookie flags enabled

## 6. Access Control

### Role-Based Access
```typescript
// User can only:
- Read approved reviews
- Submit their own reviews
- See their own review status

// Admin can:
- View all reviews (pending/approved/rejected)
- Approve/reject reviews
- Delete reviews
- See admin dashboard

// Backend enforces:
app.use('/api/admin', authenticateAdmin);
// 401 if user token
// 403 if user not admin
```

### Frontend Guards
```typescript
// Only show review form if user is authenticated
if (localStorage.getItem('authToken')) {
  // Show review form
}

// Admin routes protected in Next.js
app/admin/layout.tsx
├─ Redirect to login if not authenticated
└─ Verify admin role
```

## 7. Third-Party Service Security

### Cloudinary
- Unsigned uploads (no API key exposed)
- Folder isolation: `reviews/` folder
- CDN delivery (can't access server directly)

### MongoDB Atlas
- IP whitelist configured
- Network access restricted
- Credentials in environment variables

### Vercel Deployment
- Environment secrets stored securely
- Not exposed in build logs
- Encrypted at rest

## 8. Code Security Best Practices

### Secrets Management
```typescript
// ✅ Correct
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ❌ Wrong - hardcoded secret
const API_KEY = 'sk-1234567890abcdef';

// ❌ Wrong - password in code
const password = 'admin123';
```

### Dependency Security
```bash
# Check for vulnerabilities
npm audit

# Update dependencies safely
npm update

# Lock versions in package-lock.json
```

### Input Validation
```typescript
// Always validate on both client and server
// Client: User feedback
// Server: Security enforcement

// Rating validation
if (rating < 1 || rating > 5) {
  throw new Error('Invalid rating');
}

// Comment length
if (comment.length < 10) {
  throw new Error('Comment too short');
}

// Product ID verification
const product = await Product.findById(productId);
if (!product) {
  throw new Error('Product not found');
}
```

## 9. Deployment Security

### Vercel
- [ ] Set environment variables in project settings
- [ ] Enable branch protection rules
- [ ] Use GitHub OAuth for deployments
- [ ] Review deployment logs for secrets

### Render (API)
- [ ] Environment variables set in dashboard
- [ ] Database credentials hidden
- [ ] API keys not exposed
- [ ] HTTPS enforced

## 10. Security Checklist

### Development
- [ ] No hardcoded secrets
- [ ] Use `.env.local` for local development
- [ ] Git ignores `.env*` files
- [ ] Dependencies scanned for vulnerabilities
- [ ] Input validation on all forms

### Before Production
- [ ] All environment variables configured
- [ ] Database backups enabled
- [ ] HTTPS enforced everywhere
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Error messages sanitized

### In Production
- [ ] Monitor error logs
- [ ] Check API rate limits
- [ ] Review user submissions
- [ ] Scan for malicious content
- [ ] Regular security audits
- [ ] Update dependencies regularly

## 11. Incident Response

### If Credentials Leaked
1. Rotate immediately
2. Revoke old tokens
3. Update environment variables
4. Redeploy services
5. Monitor for suspicious activity

### If Database Compromised
1. Verify actual breach
2. Reset user passwords
3. Notify users
4. Review access logs
5. Implement additional security

## 12. Monitoring & Logging

### What to Monitor
```typescript
// API errors
console.error('Error creating review:', error);

// Image upload failures
console.error('Cloudinary upload error:', errorData);

// Invalid data
console.warn('Invalid rating provided:', rating);
```

### What NOT to Log
```typescript
❌ User credentials
❌ API keys
❌ Database passwords
❌ JWT tokens
❌ Sensitive user data
```

## 13. Security Recommendations

### Short Term (Implement Now)
1. ✅ Environment variable validation
2. ✅ Input sanitization
3. ✅ HTTPS enforcement
4. ✅ API authentication/authorization

### Medium Term (Next Sprint)
1. Rate limiting on API endpoints
2. Captcha for review submission
3. Content moderation (AI-based)
4. Review spam detection

### Long Term (Future)
1. Two-factor authentication for admins
2. Encrypted database fields
3. Audit logging for all admin actions
4. Security headers (CSP, X-Frame-Options)

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Cloudinary Security](https://cloudinary.com/documentation/security)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security](https://react.dev/learn/security)
