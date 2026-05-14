import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StoryIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Improved Storytelling Reveal: Text Opacity Scrub
      const paragraphs = gsap.utils.toArray<HTMLElement>('.reveal-text p');
      
      paragraphs.forEach((p) => {
        gsap.fromTo(p, 
          { opacity: 0.1, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            }
          }
        );
      });

      // Animated "Beyond the Surface" title
      gsap.from('.story-title-part', {
        y: 100,
        rotate: 5,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 90%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-32 md:py-64 bg-charcoal relative overflow-hidden border-b border-white/5"
    >
      <div className="container max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-40 flex flex-col items-center text-center">
          <div className="max-w-4xl">
            <span className="micro-label text-teal-accent mb-12 block">
              The Philosophy
            </span>
            <h2 
              ref={textRef}
              className="font-serif text-[clamp(2.5rem,10vw,8rem)] leading-[0.85] text-white font-light tracking-tighter"
            >
              <div className="overflow-hidden">
                <span className="story-title-part block text-editorial italic">Beyond the</span>
              </div>
              <div className="overflow-hidden -mt-[0.1em]">
                <span className="story-title-part block italic text-teal-accent">Surface.</span>
              </div>
            </h2>
          </div>
        </div>

        <div className="reveal-text max-w-4xl mx-auto flex flex-col gap-24 text-center items-center">
          <div className="max-w-2xl">
            <p className="text-editorial text-2xl md:text-5xl text-ivory/80 leading-[1.1] mb-12">
              True cinematography isn't found in the grand spectacle, but in the <span className="italic text-teal-accent">micro-moments</span>.
            </p>
            <div className="h-px w-24 bg-teal-accent/20 mx-auto mb-12" />
            <p className="font-sans text-sm md:text-lg text-ivory/40 leading-relaxed font-light tracking-wide">
              We operate with architectural precision and poetic motion, ensuring that your legacy is archived with the same elegance it was lived. Travel-ready for destination weddings across the globe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
