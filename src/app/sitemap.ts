import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arvedit.com';
  
  // Define all your routes
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/pricing',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}

