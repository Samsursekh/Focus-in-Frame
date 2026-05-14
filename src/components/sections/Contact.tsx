import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from('.contact-image', {
        scale: 1.2,
        filter: 'grayscale(1) brightness(0.2)',
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      // Form items reveal
      gsap.from('.form-reveal', {
        opacity: 0,
        x: 40,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.contact-form-side',
          start: 'top 70%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const phoneToSubmit = formData.phone.startsWith('+') ? formData.phone : `+91${formData.phone}`;
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, phone: phoneToSubmit }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', date: '', location: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-charcoal flex flex-col lg:flex-row overflow-hidden" 
      id="contact"
    >
      {/* Left: Cinematic Image Side */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200" 
          alt="Bengali Wedding Traditions"
          className="contact-image w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-charcoal lg:to-transparent" />
        
        {/* Floating Details */}
        <div className="absolute bottom-12 left-12 right-12 z-10 hidden md:block">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-8 group">
              <div className="w-14 h-14 rounded-full border border-theme-accent/10 flex items-center justify-center group-hover:border-teal-accent transition-all duration-700 bg-black/20 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-teal-accent" />
              </div>
              <div>
                <span className="micro-label text-white/40 block mb-1">Studio</span>
                <span className="text-editorial text-xl text-white">Rajarhat, Kolkata</span>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-14 h-14 rounded-full border border-theme-accent/10 flex items-center justify-center group-hover:border-teal-accent transition-all duration-700 bg-black/20 backdrop-blur-md">
                <Mail className="w-4 h-4 text-teal-accent" />
              </div>
              <div>
                <span className="micro-label text-white/40 block mb-1">Connect</span>
                <span className="text-editorial text-xl text-white">hello@focusinframe.com</span>
              </div>
            </div>
            <div className="flex items-center gap-8 group">
              <div className="w-14 h-14 rounded-full border border-theme-accent/10 flex items-center justify-center group-hover:border-teal-accent transition-all duration-700 bg-black/20 backdrop-blur-md">
                <Phone className="w-4 h-4 text-teal-accent" />
              </div>
              <div>
                <span className="micro-label text-white/40 block mb-1">Call</span>
                <span className="text-editorial text-xl text-white">+91 96411 04478</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Premium Form Side */}
      <div className="contact-form-side w-full lg:w-1/2 p-8 md:p-24 lg:p-40 flex flex-col justify-center relative bg-charcoal">
        <div className="max-w-xl mx-auto lg:mx-0 w-full">
          <div className="form-reveal overflow-hidden mb-6">
            <span className="micro-label text-teal-accent">Inquiry</span>
          </div>
          <h2 className="form-reveal text-editorial text-[clamp(2.5rem,6vw,5.5rem)] text-white mb-16 leading-[0.95]">
            Let's create something <br />
            <span className="italic text-teal-accent opacity-90">unforgettable.</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="form-reveal relative group">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className="w-full bg-transparent border-b border-white/5 py-6 font-sans text-lg text-white focus:outline-none focus:border-teal-accent transition-all peer"
                required
              />
              <label className="absolute left-0 top-6 micro-label text-white/20 transition-all peer-focus:-top-6 peer-focus:text-teal-accent peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-teal-accent cursor-text">
                Your Full Name
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="form-reveal relative group">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-white/5 py-6 font-sans text-lg text-white focus:outline-none focus:border-teal-accent transition-all peer"
                  required
                />
                <label className="absolute left-0 top-6 micro-label text-white/20 transition-all peer-focus:-top-6 peer-focus:text-teal-accent peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-teal-accent cursor-text">
                  Email Address
                </label>
              </div>
              <div className="form-reveal relative group">
                <input 
                   type="tel" 
                   name="phone"
                   value={formData.phone}
                   onChange={handleChange}
                   placeholder=" "
                   className="w-full bg-transparent border-b border-white/5 py-6 font-sans text-lg text-white focus:outline-none focus:border-teal-accent transition-all peer"
                   required
                />
                <label className="absolute left-0 top-6 micro-label text-white/20 transition-all peer-focus:-top-6 peer-focus:text-teal-accent peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-teal-accent cursor-text">
                  Mobile Number
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="form-reveal relative group">
                <input 
                  type="text" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-white/5 py-6 font-sans text-lg text-white focus:outline-none focus:border-teal-accent transition-all peer"
                />
                <label className="absolute left-0 top-6 micro-label text-white/20 transition-all peer-focus:-top-6 peer-focus:text-teal-accent peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-teal-accent cursor-text">
                  Event Date
                </label>
              </div>
              <div className="form-reveal relative group">
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent border-b border-white/5 py-6 font-sans text-lg text-white focus:outline-none focus:border-teal-accent transition-all peer"
                />
                <label className="absolute left-0 top-6 micro-label text-white/20 transition-all peer-focus:-top-6 peer-focus:text-teal-accent peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-teal-accent cursor-text">
                  Event Location
                </label>
              </div>
            </div>

            <div className="form-reveal relative group">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows={3}
                className="w-full bg-transparent border-b border-white/5 py-6 font-sans text-lg text-white focus:outline-none focus:border-teal-accent transition-all peer resize-none"
              />
              <label className="absolute left-0 top-6 micro-label text-white/20 transition-all peer-focus:-top-6 peer-focus:text-teal-accent peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-teal-accent cursor-text">
                Your Story & Vision
              </label>
            </div>

            <div className="form-reveal flex flex-col md:flex-row items-center gap-12 pt-12">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                className={cn(
                  "w-full md:w-auto micro-label tracking-[0.4em] px-14 py-7 rounded-sm transition-all duration-700",
                  status === 'loading' ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-teal-accent text-charcoal hover:bg-white"
                )}
              >
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </motion.button>
              
              <div className="flex flex-col gap-2">
                {status === 'success' && (
                  <span className="micro-label text-teal-accent">Message archived successfully.</span>
                )}
                {status === 'error' && (
                  <span className="micro-label text-red-400">Failed to send. Please try again.</span>
                )}
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-white/5" />
                  <span className="micro-label text-white/20">Studio Hours • 10 — 18</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
