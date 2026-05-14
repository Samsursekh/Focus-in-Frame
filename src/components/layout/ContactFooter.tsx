import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const ContactFooter = memo(() => {
  return (
    <footer className="bg-charcoal pt-48 pb-16 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-40">
          {/* Left: Brand Identity */}
          <div className="max-w-md">
            <h2 className="text-editorial text-3xl text-white italic mb-10">Focus in Frame</h2>
            <p className="text-ivory/30 font-sans text-sm leading-relaxed tracking-wide mb-6">
              Focus in Frame is Kolkata's premier wedding photography and videography studio. Archiving the timeless traditions of Bengali weddings across Rajarhat, Newtown, and beyond.
            </p>
            <div className="sr-only">
              Providing pre wedding photography in kolkata, traditional bengali wedding photography, and elegant wedding photography in Newtown. Our wedding photography packages in kolkata are curated for elegance and storytelling.
            </div>
          </div>

          {/* Right: Contact & Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-20 w-full lg:w-auto">
            <div className="flex flex-col gap-8">
              <span className="micro-label text-teal-accent">Connect</span>
              <div className="flex flex-col gap-4">
                <a href="#" className="micro-label text-white/30 hover:text-teal-accent transition-colors">Instagram</a>
                <a href="#" className="micro-label text-white/30 hover:text-teal-accent transition-colors">Vimeo</a>
                <a href="#" className="micro-label text-white/30 hover:text-teal-accent transition-colors">Pinterest</a>
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <span className="micro-label text-teal-accent">Archives</span>
              <div className="flex flex-col gap-4">
                <a href="#hero" className="micro-label text-white/30 hover:text-teal-accent transition-colors">Studio</a>
                <a href="#portfolio" className="micro-label text-white/30 hover:text-teal-accent transition-colors">Portfolio</a>
                <a href="#gallery" className="micro-label text-white/30 hover:text-teal-accent transition-colors">Visuals</a>
              </div>
            </div>

            <div className="flex flex-col gap-8 col-span-2 lg:col-span-1">
              <span className="micro-label text-teal-accent">Headquarters</span>
              <div className="flex flex-col gap-2">
                <p className="micro-label text-white/20">Rajarhat Main Road</p>
                <p className="micro-label text-white/20">Newtown, Kolkata</p>
                <p className="micro-label text-white/40 mt-2">+91 96411 04478</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-white/10">
          <p className="micro-label">© 2026 Focus in Frame Photography • Cinematic Archives</p>
          
          <div className="flex items-center gap-16">
            <a href="#" className="micro-label hover:text-white transition-colors">Privacy</a>
            <a href="#" className="micro-label hover:text-white transition-colors">Terms</a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-4 micro-label text-white/20 hover:text-white transition-colors group"
              aria-label="Back to top"
            >
              Back to Surface
              <ArrowUpRight className="w-3 h-3 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});
