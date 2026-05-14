"use client";

import { motion, AnimatePresence } from 'framer-motion';

import { useState, useEffect, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMagnetic } from '../../hooks/useMagnetic';

export const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const magneticButton = useMagnetic();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Portfolio', href: '#portfolio' },
    { title: 'Gallery', href: '#gallery' },
    { title: 'About', href: '#about' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700",
        scrolled ? "bg-charcoal/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-8 md:py-10"
      )}
    >
      <div className="container mx-auto px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-4 group" aria-label="Home">
          <div className="flex flex-col">
            <span className="text-editorial text-2xl text-white italic leading-none group-hover:text-teal-accent transition-colors">Focus In <span className="text-teal-accent">Frame</span></span>
            <span className="micro-label text-white/20 mt-1 hidden sm:block">Cinematic Wedding Archive</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 text-ivory">
          {navLinks.map((link) => (
            <a 
              key={link.title}
              href={link.href}
              className="micro-label hover:text-white transition-colors"
            >
              {link.title}
            </a>
          ))}
          <div ref={magneticButton}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-sm micro-label backdrop-blur-md hover:bg-white/10 transition-all text-white"
              aria-label="Make an inquiry"
            >
              Inquire
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-ivory p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-charcoal border-b border-ivory/5 py-16 px-12 flex flex-col items-center gap-10 md:hidden backdrop-blur-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.title}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-editorial text-4xl text-white italic"
              >
                {link.title}
              </a>
            ))}
            <button 
              className="w-full py-6 bg-teal-accent text-charcoal micro-label mt-8 rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});
