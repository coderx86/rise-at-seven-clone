"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const logos = [
  { name: "Adidas", src: "/Assets/brand-logos/Adidas-Logo-768x432.png" },
  { name: "Emirates", src: "/Assets/brand-logos/Emirates-Logo-640x400.png" },
  { name: "Louis Vuitton", src: "/Assets/brand-logos/Louis-Vuitton-logo-768x432.png" },
  { name: "Nike", src: "/Assets/brand-logos/Nike-Logo-768x432.png" },
  { name: "Puma", src: "/Assets/brand-logos/Puma-logo-666x333.png" },
];

// Duplicate logos to ensure seamless continuous looping
const marqueeLogos = [...logos, ...logos, ...logos, ...logos, ...logos];

const BrandingSection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate width of one single set of logos
    const setWidth = track.scrollWidth / 5;

    // Smooth linear continuous animation moving right to left
    const tween = gsap.to(track, {
      x: -setWidth,
      duration: 15,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % setWidth),
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="w-full pt-6 xl:pt-12 bg-[#EFEEEC] relative overflow-hidden">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-y-2 w-full">
          
          {/* Label matching brand-marque.txt */}
          <div className="col-span-20 flex items-center md:col-span-4 lg:col-span-3 xl:col-span-2 py-4">
            <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-gray-900 text-sm/tight font-medium tracking-tight sm:max-w-32">
              The agency behind ...
            </h2>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full col-span-20 md:col-span-16 lg:col-span-17 xl:col-span-18">
            <div className="w-full relative overflow-hidden z-0">
              {/* Offset container to extend beyond screen edge for seamless look */}
              <div className="flex relative z-0 overflow-hidden w-[120vw] -ml-[10vw]">
                <div 
                  ref={trackRef} 
                  className="flex"
                  style={{ willChange: "transform" }}
                >
                  {marqueeLogos.map((logo, index) => (
                    <div 
                      key={index} 
                      className="w-20 py-5 relative lg:w-24 shrink-0"
                      style={{ marginRight: "4rem" }}
                    >
                      <div className="w-full h-full relative">
                        <div className="w-full h-full relative" style={{ aspectRatio: "20/9" }}>
                          <Image
                            src={logo.src}
                            alt={logo.name}
                            fill
                            className="w-full h-full object-contain absolute inset-0 filter brightness-0 opacity-80 hover:opacity-100 transition-all duration-300"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Layered Progressive Blur Overlay Left */}
            <div className="absolute top-0 bottom-0 left-0 w-20 md:w-50 z-10 pointer-events-none">
              {[0, 1, 2, 3, 4].map((index) => (
                <div 
                  key={index} 
                  className="absolute inset-0 backdrop-blur-[2px]"
                  style={{
                    maskImage: `linear-gradient(to right, black calc(${index} * (100% / 5)), transparent calc((${index} + 0.5) * (100% / 5)))`,
                    WebkitMaskImage: `linear-gradient(to right, black calc(${index} * (100% / 5)), transparent calc((${index} + 0.5) * (100% / 5)))`
                  }}
                />
              ))}
            </div>

            {/* Layered Progressive Blur Overlay Right */}
            <div className="absolute top-0 bottom-0 right-0 w-20 md:w-50 z-10 pointer-events-none">
              {[0, 1, 2, 3, 4].map((index) => (
                <div 
                  key={index} 
                  className="absolute inset-0 backdrop-blur-[2px]"
                  style={{
                    maskImage: `linear-gradient(to left, black calc(${index} * (100% / 5)), transparent calc((${index} + 0.5) * (100% / 5)))`,
                    WebkitMaskImage: `linear-gradient(to left, black calc(${index} * (100% / 5)), transparent calc((${index} + 0.5) * (100% / 5)))`
                  }}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandingSection;
