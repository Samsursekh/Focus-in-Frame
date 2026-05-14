import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const BookingCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const magneticTrigger = useMagnetic();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.to(bgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text Reveal
      gsap.from('.cta-reveal', {
        y: 60,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal"
      id="inquire"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 scale-125"
      >
        <img 
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000" 
          alt="Cinematic Wedding" 
          className="w-full h-full object-cover grayscale-[40%] brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal opacity-90" />
      </div>

      {/* Content */}
      <div className="container max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="cta-reveal mb-12">
            <span className="micro-label text-teal-accent px-6 py-3 border border-teal-accent/20 rounded-sm backdrop-blur-md">
              Limited 2024 Availability
            </span>
          </div>

          <h2 className="cta-reveal text-editorial text-[clamp(2.5rem,10vw,8rem)] text-white mb-16 leading-[0.9]">
            Archive Your <span className="italic text-teal-accent">Legacy</span> <br />
            Somewhere Extraordinary
          </h2>

          <div className="cta-reveal max-w-xl mb-20 px-4">
            <p className="font-sans text-sm md:text-lg text-ivory/40 leading-relaxed font-light tracking-wide">
              We only accept a limited number of commissions each year to ensure every story receives the architectural attention and poetic visual strategy it deserves.
            </p>
          </div>

          {/* Magnetic CTA Button */}
          <div ref={magneticTrigger} className="cta-reveal relative group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-teal-accent text-charcoal px-14 py-7 micro-label tracking-[0.4em] transition-all hover:bg-white duration-500 flex items-center gap-6 group rounded-sm"
            >
              Start Your Inquiry
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
              
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-teal-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          {/* Social Proof / Location */}
          <div className="cta-reveal mt-20 flex gap-8 items-center text-white/30">
            <span className="text-[9px] uppercase tracking-widest font-mono">Rajarhat</span>
            <div className="w-1 h-1 rounded-full bg-gold/40" />
            <span className="text-[9px] uppercase tracking-widest font-mono">Newtown</span>
            <div className="w-1 h-1 rounded-full bg-gold/40" />
            <span className="text-[9px] uppercase tracking-widest font-mono">South Kolkata</span>
            <div className="w-1 h-1 rounded-full bg-gold/40" />
            <span className="text-[9px] uppercase tracking-widest font-mono">Salt Lake</span>
          </div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-1/2 bottom-0 w-[1px] h-32 bg-gradient-to-t from-gold/50 to-transparent -translate-x-1/2" />
    </section>
  );
};
