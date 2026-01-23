# Cloudinary Setup Guide for Review System

## Step 1: Create Cloudinary Account
1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

## Step 2: Get Your Cloud Name
1. Login to [Cloudinary Console](https://console.cloudinary.com/)
2. In the top-right, you'll see your **Cloud Name**
3. Copy it (e.g., `desdizloo`)

## Step 3: Create Upload Preset
Follow these steps to create an unsigned upload preset:

### Method: Via Cloudinary Console
1. Go to **Settings** (gear icon in sidebar)
2. Click **Upload** tab
3. Scroll down to **Upload Presets** section
4. Click **Add upload preset**

### Configure the Preset:
- **Preset name**: `devisutra_products`
- **Signing mode**: Select **Unsigned** ✓
- **Folder**: `reviews` (optional, for organization)
- **Resource type**: Image
- **Type**: Upload
- Click **Save**

## Step 4: Update Environment Variables

Your `.env.local` already has:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=desdizloo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=devisutra_products
```

**No changes needed if you're using these values.**

## Step 5: Test the Upload

1. Start your dev server:
   ```bash
   cd devisutra-user
   npm run dev
   ```

2. Go to any product page (e.g., http://localhost:3000/products/[productId])

3. Click "Write a Review"

4. Select an image and upload

5. You should see the image appear in the preview

## Troubleshooting

### Error: "Invalid upload preset"
- ✅ Check preset name is exactly `devisutra_products`
- ✅ Verify preset is in **Unsigned** mode
- ✅ Ensure preset is saved in Cloudinary console

### Error: "400 Bad Request"
- ✅ Verify CLOUDINARY_CLOUD_NAME is correct
- ✅ Check upload preset exists and is accessible
- ✅ Ensure file is a valid image format

### Image upload succeeds but not visible on product page
- ✅ Check MongoDB has the image URL stored
- ✅ Verify Cloudinary URL is accessible (try in browser)
- ✅ Check browser console for any fetch errors

### Credentials Exposed in Code?
❌ **NO** - All credentials are in `.env.local`:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Public, safe to expose
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` - Public, safe to expose (unsigned mode)
- Never store API keys or secrets in frontend code

## Security Notes

### Why Unsigned Uploads?
- Signed uploads require backend secret key
- Unsigned uploads are secure for public use
- User can only upload to specified preset folder
- File validation happens on Cloudinary

### File Validation
The system validates:
- File type: JPEG, PNG, WebP, GIF only
- File size: 5MB maximum
- Max 5 files per review

### Data Flow
```
User selects image in browser
        ↓
JavaScript validates file
        ↓
Upload to Cloudinary (unsigned)
        ↓
Get secure URL from Cloudinary
        ↓
Send URL + review data to backend API
        ↓
Backend saves review with image URL
        ↓
Admin approves review
        ↓
Review visible on product page with images from Cloudinary CDN
```

## Production Deployment

When deploying to production (Vercel):

1. **Cloudinary Credentials**: Already public, no security risk
2. **Environment Variables**: Set in Vercel project settings:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=desdizloo
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=devisutra_products
   ```
3. **API URL**: Already set to production Render API

## Optional Cloudinary Features

### Image Transformations
Cloudinary allows real-time image transformation:
```typescript
// Example: Auto-crop to square, optimize quality
https://res.cloudinary.com/desdizloo/image/upload/
  c_fill,w_200,h_200,q_auto/reviews/image.jpg
```

### Folder Organization
All review images are in `reviews/` folder by default:
```
desdizloo/
  └─ reviews/
      ├─ abc123.jpg
      ├─ def456.jpg
      └─ ...
```

### Analytics
Track upload statistics in Cloudinary dashboard:
- Usage statistics
- Bandwidth usage
- Transformation statistics

## Next Steps

✅ Create Cloudinary account
✅ Create `devisutra_products` unsigned preset
✅ Test upload on local dev server
✅ Deploy to production
✅ Monitor uploads in Cloudinary dashboard

## Questions?

Check Cloudinary documentation: https://cloudinary.com/documentation
