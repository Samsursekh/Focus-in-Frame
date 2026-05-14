import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  category: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Rajarhat Grand",
    location: "Rajarhat, Kolkata",
    image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=1200",
    category: "Traditional Bengali Wedding",
    year: "2024"
  },
  {
    id: 2,
    title: "Newtown Nikah",
    location: "Newtown, Kolkata",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
    category: "Bengali Wedding Archive",
    year: "2023"
  },
  {
    id: 3,
    title: "Howrah Bridge",
    location: "South Kolkata",
    image: "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Traditional Biye",
    year: "2024"
  },
  {
    id: 4,
    title: "The Victoria Pre-Wedding",
    location: "Kolkata, WB",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    category: "Masterpiece",
    year: "2023"
  },
  {
    id: 5,
    title: "Salt Lake Celebration",
    location: "Salt Lake, Kolkata",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200",
    category: "Reception Film",
    year: "2024"
  }
];

export const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const projects = gsap.utils.toArray('.project-card');
      
      // Horizontal Scroll Animation
      gsap.to(projects, {
        xPercent: -100 * (projects.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (projects.length - 1),
          end: () => `+=${triggerRef.current?.offsetWidth * 1.5}`,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-charcoal overflow-hidden">
      <div ref={triggerRef} className="h-[120vh] flex flex-col justify-center relative">
        
        {/* Section Header */}
        <div className="container max-w-screen-2xl mx-auto px-6 md:px-12 mb-20 relative z-10">
          <div className="max-w-3xl">
            <span className="micro-label text-teal-accent mb-8 block">Selected Archives</span>
            <h3 className="text-editorial text-[clamp(2.5rem,8vw,6rem)] text-white">
              Curated <span className="italic text-teal-accent">Chapters</span> of Tradition
            </h3>
          </div>
        </div>

        {/* Projects Horizontal Container */}
        <div className="flex flex-nowrap h-[60vh] md:h-[70vh] px-[10vw] relative z-10">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className={cn(
                "project-card flex-none w-[85vw] md:w-[50vw] lg:w-[40vw] h-full mr-24 md:mr-48 group relative rounded-sm overflow-hidden",
                index === PROJECTS.length - 1 && "mr-0"
              )}
            >
              {/* Image with subtle parallax reveal */}
              <div className="w-full h-full relative overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.2, filter: 'grayscale(1) brightness(0.5)' }}
                  animate={{ scale: 1, filter: 'grayscale(0.6) brightness(0.8)' }}
                  transition={{ duration: 1.5 }}
                  whileHover={{ scale: 1.02, filter: 'grayscale(0) brightness(1)' }}
                  src={`${project.image}&w=1000&q=70`} 
                  alt={`Cinematic shot from ${project.title} - ${project.category} at ${project.location}`}
                  className="w-full h-full object-cover transition-all duration-1000"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
              </div>

              {/* Project Info */}
              <div className="absolute bottom-12 left-12 right-12">
                <div className="overflow-hidden mb-4">
                  <span className="micro-label text-teal-accent block transition-transform duration-700 translate-y-full group-hover:translate-y-0">
                    {project.category}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-editorial text-4xl md:text-6xl text-white font-light group-hover:italic transition-all duration-700">
                    {project.title}
                  </h4>
                </div>
                
                <div className="mt-12 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                  <span className="micro-label text-white/20">{project.location} • {project.year}</span>
                  <div className="flex items-center gap-4 text-teal-accent cursor-pointer group/btn">
                    <span className="micro-label">View Film</span>
                    <div className="w-10 h-10 rounded-full border border-teal-accent/20 flex items-center justify-center group-hover/btn:bg-teal-accent group-hover/btn:text-charcoal transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

