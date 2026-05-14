import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000",
    size: "tall",
    caption: "Midnight at Versailles"
  },
  {
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000",
    size: "square",
    caption: "The First Glance"
  },
  {
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000",
    size: "wide",
    caption: "Venetian Romance"
  },
  {
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000",
    size: "square",
    caption: "Golden Hour Vows"
  },
  {
    url: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=1000",
    size: "tall",
    caption: "Eternal Morning"
  },
  {
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1000",
    size: "wide",
    caption: "Santorini Soul"
  }
];

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax zoom effect for images
      gsap.utils.toArray<HTMLElement>('.gallery-img-wrapper img').forEach((img) => {
        gsap.to(img, {
          y: -50,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

      // Entry reveal with staggered animation
      gsap.from('.gallery-item', {
        opacity: 0,
        y: 100,
        rotateX: 10,
        stagger: {
          each: 0.1,
          from: "start"
        },
        duration: 2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-charcoal relative" id="gallery">
      <div className="container max-w-screen-2xl mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Captured Stillness"
          subtitle="The Library of Emotion"
          align="left"
          className="mb-24"
        />

        <div className="gallery-grid flex flex-col gap-32">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 gallery-item group overflow-hidden">
               <div className="gallery-img-wrapper aspect-[16/10] relative overflow-hidden">
                <img 
                  src={`${GALLERY_IMAGES[0].url}&w=1200&q=75`} 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]" 
                  alt="Atmospheric wide shot of the Rajarhat Grand wedding celebration" 
                  loading="lazy"
                />
                <div className="absolute bottom-8 left-8">
                  <span className="micro-label text-white/40">The Rajarhat Grand</span>
                </div>
               </div>
            </div>
            <div className="md:col-span-4 md:col-start-9 gallery-item group overflow-hidden">
               <div className="gallery-img-wrapper aspect-[3/4] relative overflow-hidden">
                <img 
                  src={`${GALLERY_IMAGES[1].url}&w=800&q=75`} 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]" 
                  alt="Candid moment - The first glance between bride and groom" 
                  loading="lazy"
                />
               </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-24">
             <div className="md:col-span-4 gallery-item group overflow-hidden">
               <h4 className="text-editorial text-3xl md:text-5xl text-white mb-8 italic">Architecture of <span className="text-teal-accent">Emotion</span></h4>
               <p className="font-sans text-sm text-ivory/30 max-w-xs mb-12 uppercase tracking-widest leading-loose">
                 Capturing the structural beauty of traditional Bengali rituals through a cinematic lens.
               </p>
               <div className="gallery-img-wrapper aspect-square relative overflow-hidden">
                <img 
                  src={`${GALLERY_IMAGES[3].url}&w=800&q=75`} 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]" 
                  alt="Poetic shot of traditional Bengali wedding rituals" 
                  loading="lazy"
                />
               </div>
            </div>
            <div className="md:col-span-7 md:col-start-6 gallery-item group overflow-hidden">
               <div className="gallery-img-wrapper aspect-[16/9] relative overflow-hidden">
                <img 
                  src={`${GALLERY_IMAGES[2].url}&w=1200&q=75`} 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]" 
                  alt="Cinematic landscape of the wedding venue at sunset" 
                  loading="lazy"
                />
               </div>
            </div>
          </div>
        </div>

        {/* Closing Narrative */}
        <div className="mt-32 flex flex-col items-center text-center max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-px h-24 bg-gradient-to-b from-white/10 to-gold/30 mb-12"
          />
          <h4 className="font-serif text-2xl text-white italic font-light mb-8 leading-relaxed">
            "We don't just take photographs. We archive the visual architectural of your legacy."
          </h4>
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/30">Founder's Note • 2024</span>
        </div>
      </div>
    </section>
  );
};

