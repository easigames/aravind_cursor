import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client for Cloudflare R2
// R2 is S3-compatible, so we use the S3 client
const s3Client = new S3Client({
  region: 'auto', // R2 uses 'auto' as the region
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

/**
 * Get video metadata (size, content type, etc.)
 * Essential for Range request support
 */
export async function getVideoMetadata(key: string): Promise<{
  contentLength: number;
  contentType: string;
  etag?: string;
  lastModified?: Date;
} | null> {
  if (!BUCKET_NAME) {
    throw new Error('R2_BUCKET_NAME environment variable is not set');
  }

  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    
    const response = await s3Client.send(command);
    
    return {
      contentLength: response.ContentLength || 0,
      contentType: response.ContentType || 'video/mp4',
      etag: response.ETag,
      lastModified: response.LastModified,
    };
  } catch (error) {
    console.error('Error getting video metadata:', error);
    return null;
  }
}

/**
 * Stream video from R2 with Range request support
 * This is the professional way to handle video streaming
 */
export async function streamVideo(
  key: string,
  range?: string | null
): Promise<{
  body: ReadableStream | null;
  contentLength: number;
  contentType: string;
  contentRange?: string;
  status: number;
  etag?: string;
} | null> {
  if (!BUCKET_NAME) {
    throw new Error('R2_BUCKET_NAME environment variable is not set');
  }

  try {
    // First get the total size
    const metadata = await getVideoMetadata(key);
    if (!metadata) {
      return null;
    }

    const { contentLength: totalSize, contentType, etag } = metadata;

    // Parse range header if present
    let start = 0;
    let end = totalSize - 1;
    let status = 200;
    let contentRange: string | undefined;

    if (range) {
      const match = range.match(/bytes=(\d*)-(\d*)/);
      if (match) {
        start = match[1] ? parseInt(match[1], 10) : 0;
        end = match[2] ? parseInt(match[2], 10) : totalSize - 1;
        
        // Clamp end to file size
        end = Math.min(end, totalSize - 1);
        
        status = 206; // Partial Content
        contentRange = `bytes ${start}-${end}/${totalSize}`;
      }
    }

    const chunkSize = end - start + 1;

    // Fetch the requested range from R2
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Range: `bytes=${start}-${end}`,
    });

    const response = await s3Client.send(command);

    return {
      body: response.Body?.transformToWebStream() || null,
      contentLength: chunkSize,
      contentType,
      contentRange,
      status,
      etag,
    };
  } catch (error) {
    console.error('Error streaming video:', error);
    return null;
  }
}

/**
 * Generate a presigned URL for streaming a video from R2
 * Use this for CDN-cached access when you don't need Range requests server-side
 * @param key - The object key (path) in R2 bucket
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 * @returns Presigned URL for streaming the video
 */
export async function getR2VideoUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  if (!BUCKET_NAME) {
    throw new Error('R2_BUCKET_NAME environment variable is not set');
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating R2 presigned URL:', error);
    throw error;
  }
}

/**
 * Get the public URL for an R2 object (if using public bucket or custom domain)
 * This is the fastest option if you have a public bucket with Cloudflare CDN
 * @param key - The object key (path) in R2 bucket
 * @returns Public URL for the object
 */
export function getR2PublicUrl(key: string): string {
  const publicUrl = process.env.R2_PUBLIC_URL;
  
  // If custom public URL is set (e.g., custom domain), use it
  if (publicUrl) {
    return `${publicUrl}/${key}`;
  }
  
  // Otherwise, fallback to presigned URL approach
  throw new Error('R2_PUBLIC_URL not configured. Set up a custom domain for your R2 bucket for fastest access.');
}

/**
 * Check if a video key exists in R2
 * @param key - The object key to check
 * @returns True if the object exists
 */
export async function checkR2VideoExists(key: string): Promise<boolean> {
  if (!BUCKET_NAME) {
    return false;
  }

  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    
    await s3Client.send(command);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get MIME type from file extension
 */
export function getVideoMimeType(key: string): string {
  const ext = key.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    mkv: 'video/x-matroska',
  };
  return mimeTypes[ext || ''] || 'video/mp4';
}
