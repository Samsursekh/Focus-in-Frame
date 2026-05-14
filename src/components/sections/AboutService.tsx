import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export const AboutService: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal parity parallax
      gsap.to(imageRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal animation
      const elements = gsap.utils.toArray('.story-reveal');
      gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative py-40 md:py-60 bg-charcoal overflow-hidden" 
      id="about"
    >
      <div className="container max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          
          {/* Visual Side */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1">
            <div className="relative">
              <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden rounded-sm group">
                <img 
                  src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=1200" 
                  alt="Traditional Bengali Bride"
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000"
                />
                {/* Floating Meta */}
                <div className="absolute top-10 right-10 flex flex-col items-end text-white/40 mix-blend-difference">
                  <span className="text-[clamp(8px,1.2vw,10px)] uppercase tracking-[0.4em] mb-1">Authentic Traditions</span>
                  <span className="font-serif text-[clamp(12px,1.5vw,14px)] italic">Purely Bengali</span>
                </div>
              </div>
              
              {/* Abstract decorative frame */}
              <div className="absolute -inset-8 border border-white/5 rounded-sm pointer-events-none -z-10 translate-x-12 translate-y-12 hidden md:block" />
            </div>
          </div>

          {/* Story Side */}
          <div ref={storyRef} className="w-full lg:w-7/12 order-1 lg:order-2">
            <div className="max-w-2xl px-4 lg:px-0">
              <div className="story-reveal overflow-hidden mb-8">
                <span className="micro-label text-teal-accent">The Philosophy</span>
              </div>
              
              <h2 className="story-reveal text-editorial text-[clamp(2.5rem,7vw,5.5rem)] text-white mb-16 leading-[0.95]">
                We don't take photographs. <br />
                <span className="italic text-teal-accent">We archive history</span> in motion.
              </h2>
              
              <div className="story-reveal flex flex-col gap-12">
                <p className="text-editorial text-xl md:text-3xl text-ivory/80 leading-relaxed font-light">
                  Focus in Frame is deeply rooted in the rich cultural fabric of Kolkata. We have spent the last decade documenting the intricate rituals of traditional Bengali weddings.
                </p>
                <p className="font-sans text-sm md:text-lg text-ivory/40 leading-relaxed font-light tracking-wide">
                  From the vibrant 'Gaye Holud' to the soul-stirring 'Saat Paak', our philosophy is to capture the "Focus" in every "Frame". We believe every wedding in Newtown or South Kolkata deserves an editorial cinematic approach that respects ritual and emotion.
                </p>
              </div>

              {/* Founder Signature Area */}
              <div className="story-reveal mt-24 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
                <div>
                  <h4 className="text-editorial text-3xl text-white italic mb-3">Focus in Frame</h4>
                  <span className="micro-label text-white/20">Founding Studio • Kolkata</span>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full border border-teal-accent/20 flex items-center justify-center p-6 grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer text-center group">
                    <span className="text-[7px] uppercase tracking-widest leading-relaxed group-hover:text-teal-accent transition-colors">Voted #1 Visual Art Studio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
