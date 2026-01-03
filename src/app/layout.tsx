import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arvedit.com'),
  title: {
    default: "ArvEdit - Professional Video Editing Services | TikTok, Instagram Reels & YouTube Shorts",
    template: "%s | ArvEdit - Professional Video Editing"
  },
  description: "Professional video editing services specializing in algorithm-crushing short-form content for TikTok, Instagram Reels, and YouTube Shorts. Expert motion graphics, color grading, sound design, and post-production for content creators, businesses, and influencers. Transform your videos into viral-worthy content.",
  keywords: [
    "video editing services",
    "professional video editor",
    "TikTok video editing",
    "Instagram Reels editor",
    "YouTube Shorts editing",
    "short-form video content",
    "motion graphics designer",
    "color grading services",
    "sound design",
    "video post-production",
    "content creator video editor",
    "social media video editing",
    "viral video editing",
    "professional video production",
    "freelance video editor",
    "video editing agency",
    "cinematic video editing",
    "commercial video editing",
    "influencer video editor",
    "brand video content",
    "video editing for businesses",
    "affordable video editing",
    "fast video editing turnaround",
    "high-quality video editing"
  ],
  authors: [{ name: "ArvEdit Team" }],
  creator: "ArvEdit",
  publisher: "ArvEdit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arvedit.com',
    title: 'ArvEdit - Professional Video Editing Services for Content Creators',
    description: 'Transform your content with professional video editing services. Specializing in TikTok, Instagram Reels, YouTube Shorts, motion graphics, color grading, and post-production.',
    siteName: 'ArvEdit',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ArvEdit - Professional Video Editing Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArvEdit - Professional Video Editing Services',
    description: 'Expert video editing for TikTok, Instagram Reels, YouTube Shorts. Motion graphics, color grading, and post-production services.',
    images: ['/og-image.jpg'],
    creator: '@thearvedit',
  },
  alternates: {
    canonical: 'https://arvedit.com',
  },
  category: 'Video Editing Services',
  icons: {
    icon: '/icon.svg',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData type="organization" />
        <StructuredData type="service" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
