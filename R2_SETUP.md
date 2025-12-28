# Cloudflare R2 Video Storage Setup

This guide explains how to set up Cloudflare R2 for storing and streaming videos in the Portfolio section.

## Overview

Videos are stored in Cloudflare R2 (S3-compatible object storage) and streamed using presigned URLs. This provides:
- Scalable video storage
- Fast global CDN delivery
- Secure access via presigned URLs
- Cost-effective storage

## Prerequisites

1. A Cloudflare account
2. R2 bucket created in Cloudflare dashboard
3. API tokens with R2 read permissions

## Setup Steps

### 1. Create R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** > **Create bucket**
3. Enter a bucket name (e.g., `arvind-videos`)
4. Choose a location (select closest to your users)
5. Click **Create bucket**

### 2. Upload Videos to R2

You can upload videos using:
- **Cloudflare Dashboard**: R2 > Your Bucket > Upload
- **R2 API**: Use AWS S3 CLI or SDK
- **Wrangler CLI**: Cloudflare's command-line tool

Example using AWS CLI (configured for R2):
```bash
aws s3 cp video.mp4 s3://your-bucket-name/video.mp4 \
  --endpoint-url https://your_account_id.r2.cloudflarestorage.com
```

### 3. Create API Tokens

1. Go to **R2** > **Manage R2 API Tokens**
2. Click **Create API Token**
3. Set permissions:
   - **Object Read**: Allow (for streaming videos)
   - **Object Write**: Allow (if uploading via API)
4. Save the **Access Key ID** and **Secret Access Key**

### 4. Get Your Account ID

1. Go to **R2** > **Overview**
2. Copy your **Account ID** (found in the URL or dashboard)

### 5. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
R2_ACCOUNT_ID=your_account_id_here
R2_BUCKET_NAME=your_bucket_name_here
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
```

**Important**: Never commit `.env.local` to version control!

### 6. Update Portfolio Videos

In `src/components/Portfolio.tsx`, update video URLs to use R2:

```typescript
{
  id: 1,
  title: 'King David',
  videoUrl: 'r2:Video-361.mp4', // Prefix with 'r2:' to indicate R2 storage
  views: '2.5M',
  aspectRatio: 'tall',
}
```

The `r2:` prefix tells the system to fetch a presigned URL from the API.

## How It Works

1. **Video Storage**: Videos are stored in R2 bucket
2. **URL Generation**: When a video with `r2:` prefix is loaded, the frontend calls `/api/video/[key]`
3. **Presigned URLs**: The API generates a temporary presigned URL (valid for 1 hour)
4. **Streaming**: The browser streams the video directly from R2 using the presigned URL

## Supported Video Formats

- MP4 (recommended)
- WebM
- MOV
- OGG

## Video URL Formats

The Portfolio component supports multiple video sources:

- **R2 Videos**: `r2:filename.mp4` - Fetches presigned URL from API
- **Local Videos**: `/video/filename.mp4` - Served from `public/video/` folder
- **YouTube**: `https://www.youtube.com/watch?v=VIDEO_ID`
- **Vimeo**: `https://vimeo.com/VIDEO_ID`
- **Google Drive**: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- **Direct URLs**: `https://example.com/video.mp4`

## API Endpoint

### GET `/api/video/[key]`

Generates a presigned URL for streaming a video from R2.

**Parameters:**
- `key` (path): The video filename/key in R2 (URL encoded)

**Response:**
```json
{
  "url": "https://presigned-url-from-r2.com/video.mp4?signature=..."
}
```

**Example:**
```bash
GET /api/video/Video-361.mp4
```

## Security Considerations

1. **Presigned URLs**: Expire after 1 hour for security
2. **Environment Variables**: Keep credentials secure, never commit to git
3. **Bucket Permissions**: Use least-privilege access (read-only for streaming)
4. **CORS**: Configure CORS in R2 if needed for direct access

## Troubleshooting

### Videos Not Loading

1. **Check Environment Variables**: Ensure all R2 credentials are set
2. **Verify Bucket Name**: Must match exactly (case-sensitive)
3. **Check Video Keys**: Ensure video keys in Portfolio match R2 object keys
4. **API Errors**: Check browser console and server logs

### CORS Issues

If you see CORS errors, configure CORS in R2:
1. Go to R2 > Your Bucket > Settings
2. Add CORS rule:
   ```json
   [
     {
       "AllowedOrigins": ["https://yourdomain.com"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

### Performance Optimization

1. **Video Compression**: Compress videos before uploading
2. **CDN**: R2 automatically uses Cloudflare's CDN
3. **Format**: Use MP4 with H.264 for best compatibility
4. **Presigned URL Caching**: URLs are cached client-side to reduce API calls

## Cost Considerations

Cloudflare R2 pricing (as of 2024):
- **Storage**: $0.015 per GB/month
- **Class A Operations** (writes): $4.50 per million
- **Class B Operations** (reads): $0.36 per million
- **Egress**: Free (unlike S3)

For video streaming, you'll primarily pay for:
- Storage (based on total video size)
- Class B operations (each video view = 1 read)

## Next Steps

1. Upload your videos to R2
2. Update Portfolio component with `r2:` prefixed URLs
3. Test video streaming
4. Monitor R2 usage in Cloudflare dashboard

## Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [R2 Pricing](https://developers.cloudflare.com/r2/pricing/)
- [AWS S3 SDK Documentation](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/)


