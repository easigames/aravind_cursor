export interface Video {
  url: string;      // Instagram URL
  title?: string;   // Optional title for the video
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
      // Add your Instagram post URLs here
      // { url: 'https://www.instagram.com/p/YOUR_POST_ID/', title: 'Episode 1' },
      // { url: 'https://www.instagram.com/reel/YOUR_REEL_ID/', title: 'Episode 2' },
    ],
    description: 'Dance competition series featuring incredible performances.',
    aspectRatio: 'wide',
  },
  {
    id: 2,
    slug: 'slamball',
    title: 'Slamball',
    image: '/images/slamball+cover.webp',
    videos: [],
    description: 'High-flying basketball action with trampolines.',
    aspectRatio: 'wide',
  },
  {
    id: 3,
    slug: 'wwe-raw',
    title: 'WWE Raw',
    image: '/images/raw+cover.webp',
    videos: [],
    description: 'Professional wrestling entertainment highlights.',
    aspectRatio: 'wide',
  },
  {
    id: 4,
    slug: 'hercules-candy',
    title: 'Hercules Candy',
    image: '/images/candy+cover.webp',
    videos: [],
    description: 'Sweet treats and candy-making content.',
    aspectRatio: 'wide',
  },
  {
    id: 5,
    slug: 'circular-path',
    title: 'Circular Path',
    image: '/images/circular+path.webp',
    videos: [],
    description: 'Creative journey through visual storytelling.',
    aspectRatio: 'wide',
  },
  {
    id: 6,
    slug: 'alvarez-marsal',
    title: 'Alvarez & Marsal',
    image: '/images/anm+cover.webp',
    videos: [],
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
