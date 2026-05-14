import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Hook to create a magnetic attraction effect on an element
 */
export const useMagnetic = () => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    let rect = element.getBoundingClientRect();
    
    const updateRect = () => {
      rect = element.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = rect;
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const isInside = distance < width * 1.5; // Slightly larger for better feel

      if (isInside) {
        gsap.to(element, {
          x: deltaX * 0.35,
          y: deltaY * 0.35,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else if (gsap.getProperty(element, 'x') !== 0) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  return magneticRef;
};
