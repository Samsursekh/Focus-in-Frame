import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.035] mix-blend-overlay overflow-hidden">
      <div 
        className="absolute inset-0 w-[400%] h-[400%] -top-[150%] -left-[150%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-60 animate-noise" 
      />
    </div>
  );
};
