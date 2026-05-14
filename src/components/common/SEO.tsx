import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Best Wedding Photographer in Kolkata | Focus in Frame | Traditional Bengali Weddings",
  description = "Focus in Frame is Kolkata's premier wedding photography studio. Specialists in traditional Bengali weddings and luxury pre-wedding photography in Rajarhat, Newtown and across Kolkata.",
  canonical = "https://ais-pre-lvetaspiwfwpj5bgqho3qr-455834083054.asia-east1.run.app/",
  ogImage = "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=1200",
}) => {
  const siteName = "Focus in Frame";
  const keywords = "wedding photographer in kolkata, best wedding photography in kolkata, bengali wedding photography kolkata, traditional wedding photography kolkata, elegant wedding photography kolkata, pre wedding photography kolkata, wedding photography packages kolkata, wedding videography kolkata, traditional bengali wedding photographer, rajarhat wedding photographer, newtown wedding photography";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Focus in Frame",
    "alternateName": "Focus in Frame Wedding Photography & Videography Kolkata",
    "image": ogImage,
    "description": description,
    "@id": canonical,
    "url": canonical,
    "telephone": "+91-9641104478",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rajarhat Main Road",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "postalCode": "700135",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.6105,
      "longitude": 88.4718
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://instagram.com/focusinframe"
    ],
    "priceRange": "₹₹₹"
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Performance Preloads */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="image" href="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=75&w=1600" fetchPriority="high" />
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;700&display=swap" as="style" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Security & Accessibility */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#111111" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
