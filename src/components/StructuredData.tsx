import Script from 'next/script';

interface StructuredDataProps {
  type?: 'organization' | 'service' | 'article' | 'breadcrumb' | 'faq';
  data?: any;
}

export default function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ArvEdit',
          url: 'https://arvedit.com',
          logo: 'https://arvedit.com/icon.svg',
          description: 'Professional video editing services specializing in short-form content for TikTok, Instagram Reels, and YouTube Shorts. Expert motion graphics, color grading, and post-production.',
          email: 'thearvedit@gmail.com',
          sameAs: [
            'https://www.instagram.com/thearvedit',
            'https://www.youtube.com/@thearvedit'
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'US'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'thearvedit@gmail.com',
            contactType: 'Customer Service',
            availableLanguage: ['English']
          },
          areaServed: 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Video Editing Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Video Editing',
                  description: 'Professional video editing for social media content, commercials, and digital marketing'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Motion Graphics',
                  description: 'Custom motion graphics and animation for engaging video content'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Color Grading',
                  description: 'Professional color grading and correction services'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Sound Design',
                  description: 'Audio editing, mixing, and sound design services'
                }
              }
            ]
          }
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Video Editing Services',
          provider: {
            '@type': 'Organization',
            name: 'ArvEdit',
            url: 'https://arvedit.com'
          },
          areaServed: 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Video Editing Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'TikTok Video Editing',
                  description: 'Professional editing for TikTok videos optimized for maximum engagement and virality'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Instagram Reels Editing',
                  description: 'Expert editing for Instagram Reels with trending effects and transitions'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'YouTube Shorts Editing',
                  description: 'High-quality editing for YouTube Shorts to boost views and subscribers'
                }
              }
            ]
          }
        };

      case 'faq':
        return data || {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What video editing services do you offer?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We offer comprehensive video editing services including short-form content editing for TikTok, Instagram Reels, and YouTube Shorts, motion graphics, color grading, sound design, and complete post-production services.'
              }
            },
            {
              '@type': 'Question',
              name: 'How long does video editing take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Turnaround time depends on the project complexity and length. Short-form videos (TikTok, Reels, Shorts) typically take 24-48 hours, while longer projects may take 3-7 days. Rush services are available.'
              }
            },
            {
              '@type': 'Question',
              name: 'Do you edit videos for social media platforms?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! We specialize in editing videos for all major social media platforms including TikTok, Instagram Reels, YouTube Shorts, Facebook, and LinkedIn. We optimize each video for the specific platform\'s requirements and best practices.'
              }
            },
            {
              '@type': 'Question',
              name: 'What makes your video editing services different?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We focus on creating algorithm-friendly content that maximizes engagement and reach. Our editors understand social media trends, platform algorithms, and what makes videos go viral. We combine technical expertise with creative storytelling.'
              }
            }
          ]
        };

      case 'breadcrumb':
        return data;

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

