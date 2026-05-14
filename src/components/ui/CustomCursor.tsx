import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Use quickSetter for the fastest possible property updates
    const xCursor = gsap.quickSetter(cursor, 'x', 'px');
    const yCursor = gsap.quickSetter(cursor, 'y', 'px');
    const xFollower = gsap.quickSetter(follower, 'x', 'px');
    const yFollower = gsap.quickSetter(follower, 'y', 'px');

    const moveCursor = (e: MouseEvent) => {
      // Direct positioning for mouse pointer dot
      xCursor(e.clientX);
      yCursor(e.clientY);
      
      // Smooth following for the ring
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.cursor-pointer')) {
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
        gsap.to(follower, { 
          scale: 3, 
          backgroundColor: 'rgba(212, 175, 55, 0.15)', 
          borderColor: 'rgba(212, 175, 55, 0.5)',
          duration: 0.3 
        });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { 
          scale: 1, 
          backgroundColor: 'transparent', 
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3 
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-transform" 
      />
    </>
  );
};
