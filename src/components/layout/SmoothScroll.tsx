import React from 'react';
import { useLenis } from '../../hooks/useLenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that initializes the Lenis smooth scrolling engine.
 * Mimics Next.js provider pattern for scalable architecture.
 */
export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useLenis();

  return (
    <div className="smooth-scroll-wrapper">
      {children}
    </div>
  );
};
