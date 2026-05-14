/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { useLenis } from './hooks/useLenis';
import { LayoutShell } from './components/layout/LayoutShell';
import { SEO } from './components/common/SEO';
import { Preloader } from './components/layout/Preloader';
import { CustomCursor } from './components/ui/CustomCursor';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { Hero } from './components/sections/Hero';

// Dynamic imports for production performance
const StoryIntro = lazy(() => import('./components/sections/StoryIntro').then(m => ({ default: m.StoryIntro })));
const Portfolio = lazy(() => import('./components/sections/Portfolio').then(m => ({ default: m.Portfolio })));
const Gallery = lazy(() => import('./components/sections/Gallery').then(m => ({ default: m.Gallery })));
const AboutService = lazy(() => import('./components/sections/AboutService').then(m => ({ default: m.AboutService })));
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })));
const InstagramShowcase = lazy(() => import('./components/sections/InstagramShowcase').then(m => ({ default: m.InstagramShowcase })));
const BookingCTA = lazy(() => import('./components/sections/BookingCTA').then(m => ({ default: m.BookingCTA })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

// Subtle loading fallback that matches the luxury aesthetic
const SectionLoading = () => (
  <div className="w-full py-32 flex items-center justify-center">
    <div className="w-12 h-[1px] bg-teal-accent/20 overflow-hidden relative">
      <motion.div 
        animate={{ x: [-48, 48] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-teal-accent"
      />
    </div>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter preloader delay for better performance metrics
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <div className="relative bg-charcoal min-h-screen selection:bg-gold/30 selection:text-white">
        <SEO />
        <CustomCursor />
        <NoiseOverlay />
        
        <AnimatePresence mode="wait">
          {isLoading && <Preloader key="loader" />}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        >
          <LayoutShell>
            {/* Main Page Layout mimicking Next.js page structure */}
            <div className="flex flex-col relative">
              {/* Subtle Global Background Elements */}
              <div className="bg-atmosphere">
                <div className="bg-atmosphere-top" />
                <div className="bg-atmosphere-bottom" />
              </div>

              <Hero />
              
              <Suspense fallback={<SectionLoading />}>
                <div className="section-spacing container mx-auto px-6 md:px-12 relative">
                  <div className="bg-aura" />
                  <StoryIntro />
                </div>

                <div className="divider-fine" />

                <div className="section-spacing">
                  <Portfolio />
                </div>

                <div className="divider-fine" />

                <div className="section-spacing">
                  <Gallery />
                </div>

                <div className="section-spacing bg-white/5 backdrop-blur-3xl">
                  <AboutService />
                </div>

                <div className="section-spacing">
                  <Testimonials />
                </div>

                <div className="divider-fine" />

                <div className="section-spacing">
                  <InstagramShowcase />
                </div>

                <BookingCTA />
                <Contact />
              </Suspense>
            </div>
          </LayoutShell>
        </motion.div>

        {/* Decorative Lateral Elements */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[8px] uppercase tracking-[0.5em] text-white/20 whitespace-nowrap z-40 hidden xl:block pointer-events-none">
          Preserving Traditional Legacies — Est. 2018
        </div>
        <div className="fixed right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[8px] uppercase tracking-[0.5em] text-white/20 whitespace-nowrap z-40 hidden xl:block pointer-events-none">
          Kolkata • Rajarhat • Newtown • Howrah
        </div>
      </div>
    </HelmetProvider>
  );
}
