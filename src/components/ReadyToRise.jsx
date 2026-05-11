import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ReadyToRise = () => {
  const triggerRef = useRef(null);
  const headingRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const trigger = triggerRef.current;
    const heading = headingRef.current;
    const chars = charsRef.current;

    if (!trigger || !heading || !chars.length) return;

    // Use matchMedia to restrict animation and pinning to desktop only
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getStartX = () => window.innerWidth;
      const getEndX = () => -2000;

      // Set initial position immediately to prevent flash
      gsap.set(heading, { x: getStartX() });

      // Pin + horizontal scroll
      gsap.to(heading, {
        x: () => getEndX(),
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: '+=500',
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh(self) {
            // Recalculate x on resize so position stays correct mid-scroll
            const x = getStartX() + (getEndX() - getStartX()) * self.progress;
            gsap.set(heading, { x });
          },
        },
      });

      // S-Curve ticker logic
      const ZONE_RIGHT = 0.9;
      const ZONE_LEFT = 0.5;
      const MAX_Y = -70; // % offset upward when flying
      const MAX_ROT = 10; // deg tilt when flying

      const smoothstep = (t) => {
        const c = Math.max(0, Math.min(1, t));
        return c * c * (3 - 2 * c);
      };

      const tickerFunc = () => {
        const W = window.innerWidth;

        chars.forEach((char) => {
          if (!char) return;
          const rect = char.getBoundingClientRect();
          const centX = rect.left + rect.width * 0.5;
          const ratio = centX / W;

          let yPercent, rotation;

          if (ratio >= ZONE_RIGHT) {
            // Fully flying
            yPercent = MAX_Y;
            rotation = MAX_ROT;
          } else if (ratio <= ZONE_LEFT) {
            // Fully settled
            yPercent = 0;
            rotation = 0;
          } else {
            // Inside transition zone
            const t = (ratio - ZONE_LEFT) / (ZONE_RIGHT - ZONE_LEFT);
            const e = smoothstep(t);
            yPercent = MAX_Y * e;
            rotation = MAX_ROT * e;
          }

          gsap.set(char, { yPercent, rotation });
        });
      };

      gsap.ticker.add(tickerFunc);
      
      const handleResize = () => ScrollTrigger.refresh(true);
      window.addEventListener('resize', handleResize);

      // Cleanup ticker and listener
      return () => {
        gsap.ticker.remove(tickerFunc);
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => mm.revert(); // Reverts all GSAP animations when component unmounts
  }, []);

  const text = "Ready to Rise at Nine?";

  return (
    <div className="hidden lg:block bg-[#EFEEEC] text-black overflow-x-hidden font-sans">
      {/* TRIGGER SECTION */}
      <div ref={triggerRef} className="flex items-center overflow-hidden h-[60vh]">
        <div
          ref={headingRef}
          className="shrink-0 whitespace-nowrap font-semibold tracking-[-0.03em] leading-none text-black text-[30vw] lg:text-[16vw]"
          aria-label={text}
        >
          {text.split('').map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) charsRef.current[index] = el;
              }}
              // Tailwind replacements for the .char CSS block
              className="relative inline-block will-change-transform origin-bottom"
              aria-hidden="true"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ReadyToRise;