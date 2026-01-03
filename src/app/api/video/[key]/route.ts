import { NextRequest, NextResponse } from 'next/server';
import { streamVideo, getR2VideoUrl, getVideoMetadata, getVideoMimeType } from '@/lib/r2';

/**
 * Professional Video Streaming API
 * 
 * Supports two modes:
 * 1. Direct streaming with Range requests (default) - Best for video playback
 * 2. Presigned URL redirect - Best for CDN caching (add ?redirect=1)
 * 
 * Usage: 
 *   /api/video/video-filename.mp4          - Direct stream with Range support
 *   /api/video/video-filename.mp4?redirect=1 - Redirect to presigned URL
 *   /api/video/video-filename.mp4?url=1    - Return presigned URL as JSON
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    
    if (!key) {
      return NextResponse.json(
        { error: 'Video key is required' },
        { status: 400 }
      );
    }

    // Decode the key in case it's URL encoded
    const decodedKey = decodeURIComponent(key);
    const searchParams = request.nextUrl.searchParams;
    
    // Mode 1: Return presigned URL as JSON (for backwards compatibility)
    if (searchParams.get('url') === '1') {
      const videoUrl = await getR2VideoUrl(decodedKey, 3600);
      return NextResponse.json({ url: videoUrl }, {
        headers: {
          'Cache-Control': 'private, max-age=3500', // Cache just under expiry
        }
      });
    }
    
    // Mode 2: Redirect to presigned URL (best CDN performance)
    if (searchParams.get('redirect') === '1') {
      const videoUrl = await getR2VideoUrl(decodedKey, 3600);
      return NextResponse.redirect(videoUrl, {
        status: 302,
        headers: {
          'Cache-Control': 'private, max-age=3500',
        }
      });
    }
    
    // Mode 3: Direct streaming with Range support (default - professional player experience)
    const rangeHeader = request.headers.get('range');
    
    // Stream the video with Range support (pass null if no range header for full stream)
    // Add timeout protection
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 25000)
    );
    
    const streamResult = await Promise.race([
      streamVideo(decodedKey, rangeHeader),
      timeoutPromise
    ]).catch((error) => {
      console.error('Video streaming error:', error);
      return null;
    });
    
    if (!streamResult || !streamResult.body) {
      return NextResponse.json(
        { error: 'Video not found or streaming failed' },
        { status: 404 }
      );
    }
    
    const headers: HeadersInit = {
      'Accept-Ranges': 'bytes',
      'Content-Length': streamResult.contentLength.toString(),
      'Content-Type': streamResult.contentType || getVideoMimeType(decodedKey),
      'Cache-Control': 'public, max-age=31536000, immutable',
      ...(streamResult.contentRange && { 'Content-Range': streamResult.contentRange }),
      ...(streamResult.etag && { 'ETag': streamResult.etag }),
    };
    
    return new NextResponse(streamResult.body, {
      status: streamResult.status,
      headers,
    });
    
  } catch (error) {
    console.error('Error in video streaming:', error);
    
    return NextResponse.json(
      { error: 'Failed to stream video' },
      { status: 500 }
    );
  }
}

/**
 * Handle HEAD requests for video metadata
 * Important for video players to determine file size and Range support
 */
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    
    if (!key) {
      return new NextResponse(null, { status: 400 });
    }

    const decodedKey = decodeURIComponent(key);
    const metadata = await getVideoMetadata(decodedKey);
    
    if (!metadata) {
      return new NextResponse(null, { status: 404 });
    }
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Length': metadata.contentLength.toString(),
        'Content-Type': metadata.contentType || getVideoMimeType(decodedKey),
        'Cache-Control': 'public, max-age=31536000, immutable',
        ...(metadata.etag && { 'ETag': metadata.etag }),
      }
    });
  } catch (error) {
    console.error('Error in HEAD request:', error);
    return new NextResponse(null, { status: 500 });
  }
}
