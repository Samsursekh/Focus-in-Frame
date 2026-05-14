import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  couple: string;
  location: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    couple: "Ananya & Rohan",
    location: "Rajarhat, Kolkata",
    text: "Focus in Frame didn't just capture our wedding; they captured the soul of our traditions. Every frame feels like a still from a cinematic masterpiece. Their level of professionalism and artistic vision is unmatched in Kolkata."
  },
  {
    id: 2,
    couple: "Fatima & Zayd",
    location: "Newtown, Kolkata",
    text: "The Nikah film they produced for us is our most cherished possession. They have an incredible ability to remain discreet while capturing the most intimate, raw emotions. It's truly a work of art."
  },
  {
    id: 3,
    couple: "Ishani & Deep",
    location: "South Kolkata",
    text: "The team brought an architectural precision to our traditional Biye photography. Their use of light and shadow is poetic. They turned our wedding memories into a timeless visual legacy."
  }
];

export const Testimonials: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-reveal', {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-play logic
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-charcoal relative overflow-hidden" id="testimonials">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <Quote className="w-[40vw] h-[40vw] text-white" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading 
          title="Kindred Spirits"
          subtitle="Word of Mouth"
          align="center"
          className="mb-24"
        />

        <div className="max-w-4xl mx-auto testimonial-reveal">
          <div className="relative min-h-[400px] flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                className="flex flex-col items-center"
              >
                <div className="mb-12">
                  <div className="w-12 h-[1px] bg-teal-accent/40 mx-auto" />
                </div>

                <blockquote className="text-editorial text-2xl md:text-5xl text-white italic leading-[1.2] mb-16 px-4">
                  "{TESTIMONIALS[index].text}"
                </blockquote>

                <div className="flex flex-col items-center">
                  <span className="micro-label text-teal-accent mb-4">
                    {TESTIMONIALS[index].couple}
                  </span>
                  <span className="micro-label text-white/20">
                    {TESTIMONIALS[index].location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Indicators */}
            <div className="flex gap-4 mt-20">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="group p-2 relative"
                  aria-label={`View testimonial ${i + 1} from ${TESTIMONIALS[i].couple}`}
                >
                  <div 
                    className={`h-px transition-all duration-700 ${
                      i === index ? 'w-12 bg-teal-accent shadow-[0_0_8px_rgba(0,196,204,0.5)]' : 'w-4 bg-white/10 group-hover:bg-white/30'
                    }`} 
                  />
                  {i === index && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute inset-0 flex items-center justify-center opacity-0"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
