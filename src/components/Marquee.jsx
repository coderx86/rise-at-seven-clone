"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Marquee = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  // Tracks global mouse position (from your working logic)
  const mousePos = useRef({ x: -1000, y: -1000 });
  const isHoveredRef = useRef(false);

  // Base set of marquee items for the layout
  const baseItems = [
    { type: "text", content: "Connecting Consumers" },
    { type: "image", src: "/Assets/marquee/IMG_5023.jpg", alt: "Team Photo 1" },
    { type: "text", content: "Connecting Consumers" },
    { type: "image", src: "/Assets/marquee/Screenshot-2025-06-25-at-14.49.00.png", alt: "Team Photo 2" },
  ];

  // We render exactly two sets of items to guarantee perfect half-width seamless wrapping
  const doubleItems = [...baseItems, ...baseItems];

  // 1. Marquee continuous scrolling effect
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let updateMarqueeFn;
    let scrollTriggerInstance;

    const timer = setTimeout(() => {
      const totalWidth = track.scrollWidth;
      const singleSetWidth = totalWidth / 2;

      let currentX = 0;
      const baseSpeed = -0.8; 

      updateMarqueeFn = () => {
        currentX += baseSpeed;
        currentX = gsap.utils.wrap(-singleSetWidth, 0, currentX);
        gsap.set(track, { x: currentX });
      };

      gsap.ticker.add(updateMarqueeFn);

      scrollTriggerInstance = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          // Scale velocity effect based on scrolling speed
          currentX -= velocity * 0.008; 
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (updateMarqueeFn) {
        gsap.ticker.remove(updateMarqueeFn);
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, []);

  // 2. Custom cursor follow logic (Ticker based, handles scrolling perfectly)
  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    // Initialize Cursor style
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
    });

    // Global Pointer Tracking
    const onGlobalMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onGlobalLeave = () => {
      mousePos.current.x = -1000;
      mousePos.current.y = -1000;
    };

    window.addEventListener("pointermove", onGlobalMove);
    window.addEventListener("pointerleave", onGlobalLeave);

    // High-Performance Hover Checker (GSAP Ticker)
    const tickerHoverCheck = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInside =
        mousePos.current.x >= rect.left &&
        mousePos.current.x <= rect.right &&
        mousePos.current.y >= rect.top &&
        mousePos.current.y <= rect.bottom;

      // Only trigger animation if the state actually changes
      if (isInside !== isHoveredRef.current) {
        isHoveredRef.current = isInside;

        if (isInside) {
          gsap.to(cursor, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "back.out(1.5)", // Bounce effect on entry
            overwrite: "auto",
          });
        } else {
          gsap.to(cursor, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      }
    };

    gsap.ticker.add(tickerHoverCheck);

    return () => {
      window.removeEventListener("pointermove", onGlobalMove);
      window.removeEventListener("pointerleave", onGlobalLeave);
      gsap.ticker.remove(tickerHoverCheck);
    };
  }, []);

  return (
    <Link 
      href="/"
      ref={sectionRef}
      className="block w-full py-8 bg-[#EFEEEC] overflow-hidden relative cursor-none select-none"
    >
      {/* Custom Mouse Follower Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] bg-[#B2F5E1] text-black text-xs md:text-sm font-semibold px-5 py-2.5 md:px-7 md:py-3.5 rounded-full flex items-center gap-2 whitespace-nowrap shadow-2xl"
        style={{ left: 0, top: 0, willChange: "transform" }}
      >
        <span>Send Us Your Brief</span>
        <span className="text-[10px] md:text-xs font-bold">↗</span>
      </div>

      <div className="relative w-full">
        <div 
          ref={trackRef} 
          className="flex items-center whitespace-nowrap gap-6 md:gap-12"
          style={{ willChange: "transform" }}
        >
          {doubleItems.map((item, idx) => {
            if (item.type === "text") {
              return (
                <span
                  key={idx}
                  className="text-6xl md:text-8xl lg:text-[15vw] font-medium text-gray-900 tracking-tighter leading-none"
                >
                  {item.content}
                </span>
              );
            }

            if (item.type === "image") {
              return (
                <div
                  key={idx}
                  className="relative w-20 h-20 md:w-50 md:h-50 rounded-2xl md:rounded-[32px] overflow-hidden flex-shrink-0 shadow-md mx-2 md:mx-4"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 144px, (max-width: 1200px) 224px, 20vw"
                    className="object-cover"
                    draggable={false}
                    priority={idx < 4}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </Link>
  );
};

export default Marquee;