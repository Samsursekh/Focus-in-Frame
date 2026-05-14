import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ChevronDown, Play } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titlePart1Ref = useRef<HTMLSpanElement>(null);
  const titlePart2Ref = useRef<HTMLSpanElement>(null);
  const magneticTrigger = useMagnetic();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax that scales and moves vertically
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: '15%',
        scale: 1.15,
        filter: 'blur(10px) grayscale(0.8)',
      });

      // Layered Parallax for elements
      gsap.to('.hero-layer-1', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to('.hero-layer-2', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Cinematic Masking for Hero Text
      const tl = gsap.timeline({ delay: 1.5 });
      
      tl.from('.hero-meta-reveal', {
        opacity: 0,
        y: 30,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
      })
      .from('.hero-reveal-word', {
        y: '100%',
        rotate: 3,
        duration: 1.8,
        stagger: 0.08,
        ease: 'expo.out',
      }, '-=1.2');

      // Parallax for floating image
      gsap.to('.hero-floating-img', {
        y: -30,
        x: 10,
        rotate: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal"
      id="hero"
    >
      {/* Background Cinematic Video/Visual */}
      <div className="absolute inset-0 z-0 overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110 opacity-60 transition-transform duration-1000"
          poster="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=75&w=1600"
        >
          <source 
            src="https://player.vimeo.com/external/494951475.sd.mp4?s=1d322144f808f972b25128038753238612198083&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal z-10" />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-10" />
      </div>

      {/* Main Content Container */}
      <div className="container relative z-20 mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        
        {/* Luxury Meta Tag */}
        <div className="hero-meta-reveal flex items-center gap-6 mb-12 overflow-hidden">
          <div className="h-[1px] w-12 bg-teal-accent/30" />
          <span className="micro-label text-teal-accent">
            Cinematic Wedding Archive
          </span>
          <div className="h-[1px] w-12 bg-teal-accent/30" />
        </div>

        {/* Hero Title - Editorial Pattern */}
        <h1 className="relative flex flex-col items-center mb-16">
          <div className="overflow-hidden mb-2">
            <span className="hero-reveal-word block text-editorial text-[clamp(2.5rem,12vw,10rem)] text-white">
              Archiving the
            </span>
          </div>
          <div className="overflow-hidden -mt-[0.2em]">
             <div className="flex justify-center gap-[0.2em] flex-wrap text-editorial italic text-teal-accent text-[clamp(2.5rem,14vw,12rem)]">
              {['Focus', 'In', 'Frame'].map((word, i) => (
                <span key={i} className="hero-reveal-word block">{word}</span>
              ))}
            </div>
          </div>
        </h1>

        {/* Subtext and Description - Balanced Whitespace */}
        <div className="max-w-2xl mx-auto mb-20 hero-meta-reveal hero-layer-2 px-4">
          <p className="text-ivory/50 font-sans text-sm md:text-lg leading-relaxed tracking-wide font-light max-w-lg mx-auto">
            Storytellers of the unspoken. Documenting the intricate rituals and raw emotions of traditional Bengali celebrations across the globe.
          </p>
        </div>

        {/* Action Row */}
        <div className="flex flex-col md:flex-row items-center gap-12 hero-meta-reveal hero-layer-1">
          <div ref={magneticTrigger} className="relative group">
            <motion.button 
              className="bg-[#00C4CC] text-charcoal px-10 py-5 text-[11px] font-sans font-bold uppercase tracking-[0.3em] transition-all hover:bg-white hover:scale-105 duration-500"
              aria-label="Explore our curated portfolio"
            >
              Explore Portfolio
            </motion.button>
          </div>

          <button 
            className="group flex items-center gap-5"
            aria-label="Watch cinematic showreel"
          >
            <div className="relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00C4CC] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-[#00C4CC]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Play className="w-4 h-4 text-white fill-white group-hover:text-[#00C4CC] group-hover:fill-[#00C4CC] z-10 transition-colors ml-1" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[9px] uppercase tracking-widest text-white/40">Watch</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white font-medium">Chapter 2024</span>
            </div>
          </button>
        </div>
      </div>

      {/* Hero Stats (Floating Sidebar) */}
      <div className="hidden lg:flex absolute left-12 bottom-12 flex-col gap-10 items-start z-20 hero-meta-reveal">
        <div className="flex flex-col">
          <span className="text-2xl font-serif text-white font-light italic">150+</span>
          <span className="text-[8px] uppercase tracking-widest text-white/30">Bengali Weddings</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-serif text-white font-light italic">8+</span>
          <span className="text-[8px] uppercase tracking-widest text-white/30">Cities Archived</span>
        </div>
      </div>

      {/* Floating Gallery Peek */}
      <div className="hidden xl:block absolute right-12 bottom-24 hero-layer-1 z-20">
        <div className="hero-floating-img w-48 h-64 border border-white/10 rounded-sm overflow-hidden relative group cursor-pointer shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1567938637623-7b760dee6496?q=80&w=600&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
            alt="Cinematic close-up of traditional Bengali wedding jewelry" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 left-4 border-l border-[#00C4CC]/60 pl-3">
             <span className="block text-[8px] uppercase tracking-widest text-white/50">Latest Masterpiece</span>
             <span className="block text-xs font-serif italic text-white">Newtown, Kolkata</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.5em] text-white/60">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00C4CC]/80 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-[30%] bg-white shadow-[0_0_10px_white]"
          />
        </div>
      </motion.div>
    </section>
  );
};

