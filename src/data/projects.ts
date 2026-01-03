export interface Video {
  url: string;      // Video URL (Instagram, TikTok, or YouTube)
  title?: string;   // Optional title for the video
  image?: string;   // Thumbnail image for the video
  platform?: 'instagram' | 'tiktok' | 'youtube'; // Platform type
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  image: string;
  videos: Video[];  // Array of videos instead of single instagramUrl
  description?: string;
  aspectRatio: 'tall' | 'wide' | 'square';
}

export const projects: Project[] = [
  {
    id: 1,
    slug: '99tobeat',
    title: '99toBeat',
    image: '/images/99tobeat-1.webp',
    videos: [
      { 
        url: 'https://www.instagram.com/reel/DS2htxLjAsb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 
        title: "Will Wise's Inspiring Journey",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png',
        platform: 'instagram'
      },
      { 
        url: 'https://www.tiktok.com/@itsmaedayyy/video/7574616268028775693?is_from_webapp=1&sender_device=pc&web_id=7563894297130124830', 
        title: 'Mae’s Resilient Story',
        image: 'https://p16-va-tiktok.ibyteimg.com/obj/musically-maliva-obj/ac973ad6cb37c828a97a4b21f7c44fb9.jpeg',
        platform: 'tiktok'
      },
      { 
        url: 'https://www.instagram.com/reel/DSYXis9CY07/?igsh=dTZsY2ZuNDM4YnFz', 
        title: "Kara Lee Entrepreneurial's Journey",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png',
        platform: 'instagram'
      },
      { 
        url: 'https://www.tiktok.com/@arvind11117/video/7580993942854831373?is_from_webapp=1&sender_device=pc&web_id=7563894297130124830', 
        title: 'Twerking Challenge',
        image: 'https://p16-va-tiktok.ibyteimg.com/obj/musically-maliva-obj/ac973ad6cb37c828a97a4b21f7c44fb9.jpeg',
        platform: 'tiktok'
      },
      { 
        url: 'https://www.instagram.com/reel/DRQrEf0jO9Z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 
        title: "James and Arvind's adventure",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png',
        platform: 'instagram'
      },
    ],
    description: 'Dance competition series featuring incredible performances.',
    aspectRatio: 'wide',
  },
  {
    id: 2,
    slug: 'slamball',
    title: 'Slamball',
    image: '/images/slamball+cover.webp',
    videos: [
      {
        url: 'https://www.youtube.com/watch?v=1cIEtTEQMWo',
        title: 'Slamball Legends',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1200px-YouTube_full-color_icon_%282017%29.svg.png',
        platform: 'youtube'
      },
    ],
    description: 'High-flying basketball action with trampolines.',
    aspectRatio: 'wide',
  },
  {
    id: 4,
    slug: 'hercules-candy',
    title: 'Hercules Candy',
    image: '/images/candy+cover.webp',
    videos: [
      {
        url: 'https://www.youtube.com/watch?v=3k-owSfVldU&t=1407s',
        title: 'Hercules Candy',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1200px-YouTube_full-color_icon_%282017%29.svg.png',
        platform: 'youtube'
      },
    ],
    description: 'Sweet treats and candy-making content.',
    aspectRatio: 'wide',
  },
  {
    id: 6,
    slug: 'alvarez-marsal',
    title: 'Alvarez & Marsal',
    image: '/images/anm+cover.webp',
    videos: [
      {
        url: 'https://www.youtube.com/watch?v=5mXHuK0kiGs&t=17s',
        title: 'Alvarez and Marsal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1200px-YouTube_full-color_icon_%282017%29.svg.png',
        platform: 'youtube'
      },
    ],
    description: 'Corporate and professional video content.',
    aspectRatio: 'wide',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
