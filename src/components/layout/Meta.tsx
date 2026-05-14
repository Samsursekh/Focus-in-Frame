import React from 'react';
import { siteConfig } from '../../config/seo';

/**
 * Metadata component for SEO optimization.
 * In a standard React app, this could be used with react-helmet or similar.
 */
export const Meta: React.FC = () => {
  return (
    <React.Fragment>
      {/* 
        This component centralizes metadata logic.
        In App Router (Next.js), this would be export const metadata = ...
      */}
      <title>{siteConfig.name}</title>
      <meta name="description" content={siteConfig.description} />
      <meta name="keywords" content={siteConfig.keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteConfig.name} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:image" content={siteConfig.ogImage} />
      <meta property="og:url" content={siteConfig.url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteConfig.name} />
      <meta name="twitter:description" content={siteConfig.description} />
      <meta name="twitter:image" content={siteConfig.ogImage} />
    </React.Fragment>
  );
};
