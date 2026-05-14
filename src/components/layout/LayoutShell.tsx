import React from 'react';
import { Navbar } from './Navbar';
import { ContactFooter } from './ContactFooter';
import { SmoothScroll } from './SmoothScroll';

interface LayoutShellProps {
  children: React.ReactNode;
}

export const LayoutShell: React.FC<LayoutShellProps> = ({ children }) => {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen selection:bg-gold selection:text-charcoal bg-charcoal">
        {/* Background Atmosphere Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-white/[0.03] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-white/[0.02] to-transparent" />
        </div>

        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <ContactFooter />
      </div>
    </SmoothScroll>
  );
};
