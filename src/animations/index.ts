import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const transitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  ease: [0.77, 0, 0.175, 1],
};

export const staggeredEntrance = (selector: string, delay: number = 0) => {
  return gsap.fromTo(
    selector,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power4.out',
      delay,
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
      },
    }
  );
};
