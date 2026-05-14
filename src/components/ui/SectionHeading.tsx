import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  align = 'center',
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const words = title.split(' ');

  return (
    <div className={cn('flex flex-col mb-16 px-4 md:px-0', alignmentClasses[align], className)}>
      {subtitle && (
        <div className="overflow-hidden mb-4">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="block font-sans text-[clamp(8px,1.5vw,11px)] uppercase tracking-[0.5em] text-[#00C4CC]"
          >
            {subtitle}
          </motion.span>
        </div>
      )}
      
      <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] text-white font-light tracking-tight italic leading-[0.95] flex flex-wrap gap-x-[0.2em] relative justify-inherit">
        <span className="sr-only">{title}</span>
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block py-1">
            <motion.span
              initial={{ y: '100%', rotate: 5 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.5, 
                ease: [0.77, 0, 0.175, 1],
                delay: i * 0.08
              }}
              className={cn("inline-block", i % 2 === 1 && "text-teal-accent")}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
        className="h-[1px] w-24 bg-teal-accent/20 mt-12 origin-left"
      />
    </div>
  );
};
