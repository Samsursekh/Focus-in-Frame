import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../ui/SectionHeading';
import { Instagram, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Reel {
  id: number;
  thumbnail: string;
  views: string;
  title: string;
}

const REELS: Reel[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
    views: "128K",
    title: "The Rajarhat Grand"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
    views: "84K",
    title: "Cultural Essence"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=600",
    views: "210K",
    title: "Newtown Stories"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600",
    views: "95K",
    title: "Salt Lake Memories"
  }
];

export const InstagramShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal items on scroll
      gsap.from('.reel-card', {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-charcoal relative overflow-hidden" id="social">
      <div className="container max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading 
          title="Digital Shorts"
          subtitle="The Social Journal"
          align="center"
          className="mb-32"
        />

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {REELS.map((reel) => (
            <div 
              key={reel.id}
              className="reel-card group relative aspect-[9/16] overflow-hidden rounded-sm cursor-pointer border border-white/5"
            >
              {/* Thumbnail */}
              <img 
                src={`${reel.thumbnail}&w=600&q=70`} 
                alt={`Cinematic reel showing ${reel.title}`}
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                loading="lazy"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Bottom Info */}
              <div className="absolute bottom-10 left-10 right-10">
                <div className="h-[1px] w-8 bg-teal-accent mb-4 transition-transform duration-500 group-hover:scale-x-150 origin-left" />
                <h4 className="text-editorial text-2xl text-white mb-2 group-hover:italic transition-all">{reel.title}</h4>
                <span className="micro-label text-white/40">Visual Recap</span>
              </div>

              {/* Play symbol on hover center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-100">
                <div className="w-16 h-16 rounded-full border border-teal-accent/20 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-6 h-6 text-teal-accent fill-teal-accent ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Social CTA */}
        <div className="flex flex-col items-center text-center">
          <motion.a
            href="https://www.instagram.com/focusinframe.official/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col items-center gap-8"
            aria-label="Follow Focus in Frame on Instagram"
          >
            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center group-hover:border-teal-accent transition-colors duration-700">
              <Instagram className="w-8 h-8 text-white/20 group-hover:text-teal-accent transition-colors duration-700" />
            </div>
            <div className="flex flex-col items-center">
              <span className="micro-label text-white/40 mb-4 group-hover:text-teal-accent transition-colors">Join our Archive</span>
              <span className="text-editorial text-4xl text-white italic">@focusinframe</span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
