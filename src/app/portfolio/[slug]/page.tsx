'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProjectBySlug, projects } from '@/data/projects';
import VideoCarousel from '@/components/VideoCarousel';
import { notFound } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { themeClasses } = useTheme();

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasVideos = project.videos && project.videos.length > 0;

  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      <Header />

      <main className="pt-20 sm:pt-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/portfolio"
            className={`inline-flex items-center gap-2 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} transition-colors group`}
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Work</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="container mx-auto px-4 sm:px-6 pb-8">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${themeClasses.textPrimary} mb-4`}>
            {project.title}
          </h1>
          {project.description && (
            <p className={`text-lg sm:text-xl ${themeClasses.textSecondary} max-w-3xl`}>
              {project.description}
            </p>
          )}
        </div>

        {/* Project Cover Image */}
        <div className="w-full mb-12">
          <div className="relative w-full aspect-[21/9] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Video Carousel Section */}
        <div className="container mx-auto px-4 sm:px-6 py-12">
          {hasVideos && (
            <h2 className={`text-2xl sm:text-3xl font-bold ${themeClasses.textPrimary} mb-8 text-center`}>
              {project.videos.length === 1 ? 'Watch the Video' : 'Watch the Videos'}
            </h2>
          )}
          <VideoCarousel videos={project.videos} />
        </div>

        {/* Navigation to Other Projects */}
        <div className="container mx-auto px-4 sm:px-6 py-12 border-t border-gray-800">
          <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-8`}>
            More Work
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((otherProject) => (
                <Link
                  key={otherProject.id}
                  href={`/portfolio/${otherProject.slug}`}
                  className="group relative aspect-video overflow-hidden rounded-lg"
                >
                  <img
                    src={otherProject.image}
                    alt={otherProject.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {otherProject.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
