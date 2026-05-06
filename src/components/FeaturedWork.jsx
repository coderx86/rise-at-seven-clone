"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight, FiSearch, FiTrendingUp } from "react-icons/fi";

const worksData = [
  {
    title: "SIXT",
    year: "[2023-2025]",
    category: "Car rental",
    color: "#cb7b3a",
    textColor: "#111212",
    image: "/Assets/featured-work/sixt-1.webp",
    hoverText: "An extra 3m clicks regionally through SEO",
    href: "https://riseatseven.com/work/sixt/",
  },
  {
    title: "Dojo - B2B",
    year: "[2021-2025]",
    category: "Card Machines",
    color: "#b2f5e1",
    textColor: "#111212",
    image: "/Assets/featured-work/dojo-go-product-shot-1.webp",
    hoverText: "A B2B success story for Dojo card machines",
    href: "https://riseatseven.com/work/dojo/",
  },
  {
    title: "Magnet Trade",
    year: "[2023-2024]",
    category: "Kitchens",
    color: "#d8c4fd",
    textColor: "#111212",
    image: "/Assets/featured-work/Screenshot-2026-02-07-at-17.01.43.webp",
    hoverText: "A full service SEO success story 170%+ increase",
    href: "https://riseatseven.com/work/magnet-trade-b2b/",
  },
  {
    title: "JD Sports",
    year: "[2025]",
    category: "Trainers",
    color: "#3a8ccb",
    textColor: "#111212",
    image: "/Assets/featured-work/maxresdefault_2025-10-22-141838_nmnu.webp",
    hoverText: "65% up YoY in clicks for JDSports FR, IT, ES",
    href: "https://riseatseven.com/work/jd-sports-/",
  },
  {
    title: "The North Face",
    year: "2025",
    category: "Apparel",
    color: "#E9942D",
    textColor: "#ffffff",
    image: "/Assets/featured-work/TNF.webp",
    hoverText: "+130% in organic traffic YoY for The North Face Spain",
    href: "https://riseatseven.com/work/the-north-face/",
  },
  {
    title: "SIXT",
    year: "[2023-2025]",
    category: "Car rental",
    color: "#cb7b3a",
    textColor: "#111212",
    image: "/Assets/featured-work/sixt-1.webp",
    hoverText: "An extra 3m clicks regionally through SEO",
    href: "https://riseatseven.com/work/sixt/",
  },
];

const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const rightColRef = useRef(null);
  const cursorRef = useRef(null);

  // Refs for direct GSAP manipulation (No React State needed!)
  const headingsWrapperRef = useRef(null);
  const headingItemsRef = useRef([]);
  const cardsRef = useRef([]);
  const hoverOverlaysRef = useRef([]);

  const mousePos = useRef({ x: -1000, y: -1000 });
  const activeIndexRef = useRef(0);
  const hoveredIndexRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Cursor & Menu styles
      gsap.set(cursorRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
      });
      updateActiveHeading(0); // Set first item as active initially

      // --- 1. Global Pointer Tracking ---
      const onGlobalMove = (e) => {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;

        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
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

      // --- 2. High-Performance Hover Checker (GSAP Ticker) ---
      const tickerHoverCheck = () => {
        let currentlyHovered = null;

        cardsRef.current.forEach((card, idx) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();

          const isInside =
            mousePos.current.x >= rect.left &&
            mousePos.current.x <= rect.right &&
            mousePos.current.y >= rect.top &&
            mousePos.current.y <= rect.bottom;

          if (isInside) {
            currentlyHovered = idx;
            const x = mousePos.current.x - rect.left;
            const y = mousePos.current.y - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          }
        });

        // Trigger animations only when hovered index changes
        if (currentlyHovered !== hoveredIndexRef.current) {
          const prevHovered = hoveredIndexRef.current;
          hoveredIndexRef.current = currentlyHovered;

          // Cursor Animation
          if (currentlyHovered !== null) {
            gsap.to(cursorRef.current, {
              scale: 1,
              opacity: 1,
              duration: 0.25,
              overwrite: "auto",
            });
          } else {
            gsap.to(cursorRef.current, {
              scale: 0,
              opacity: 0,
              duration: 0.25,
              overwrite: "auto",
            });
          }

          // Directly update clip-path on DOM elements for silky smooth transitions
          if (prevHovered !== null && hoverOverlaysRef.current[prevHovered]) {
            hoverOverlaysRef.current[prevHovered].style.clipPath =
              `circle(0px at var(--mouse-x) var(--mouse-y))`;
          }
          if (
            currentlyHovered !== null &&
            hoverOverlaysRef.current[currentlyHovered]
          ) {
            hoverOverlaysRef.current[currentlyHovered].style.clipPath =
              `circle(150% at var(--mouse-x) var(--mouse-y))`;
          }
        }
      };

      gsap.ticker.add(tickerHoverCheck);

      // --- 3. ScrollTrigger Logic ---
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to(rightColRef.current, {
          y: () => {
            const rightHeight = rightColRef.current.offsetHeight;
            return -(rightHeight - window.innerHeight + 120);
          },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: containerRef.current,
            pinType: "fixed",
            onUpdate: (self) => {
              const rawIndex = Math.round(
                self.progress * (worksData.length - 1),
              );
              const safeIndex = Math.min(
                Math.max(rawIndex, 0),
                worksData.length - 1,
              );

              // Only animate when the active index actually changes
              if (safeIndex !== activeIndexRef.current) {
                activeIndexRef.current = safeIndex;
                updateActiveHeading(safeIndex);
              }
            },
          },
        });
      });

      return () => {
        window.removeEventListener("pointermove", onGlobalMove);
        window.removeEventListener("pointerleave", onGlobalLeave);
        gsap.ticker.remove(tickerHoverCheck);
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  // --- Helper: Animate Left Headings Directly via GSAP ---
  const updateActiveHeading = (index) => {
    // Scroll the container
    if (headingsWrapperRef.current) {
      gsap.to(headingsWrapperRef.current, {
        y: -index * 96,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    // Update active/inactive styles (Translate Right & Opacity)
    headingItemsRef.current.forEach((item, idx) => {
      if (!item) return;
      if (idx === index) {
        gsap.to(item, {
          opacity: 1,
          x: 32,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        }); // x: 32 means translate-x-8
      } else {
        gsap.to(item, {
          opacity: 0.3,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-[100vh] lg:h-[300vh] pb-12 xl:pb-24 bg-[#EFEEEC]"
    >
      <div className="w-full px-4 md:px-7 h-full">
        <div
          ref={containerRef}
          className="w-full relative h-auto lg:h-[96vh] lg:top-[2vh] overflow-hidden bg-[#111212] rounded-3xl grid grid-cols-12 px-5 lg:px-10 py-8 lg:py-0 select-none"
        >
          {/* Left Column */}
          <div className="relative col-span-12 lg:col-span-6 h-full flex flex-col justify-between hidden lg:flex pt-16 lg:pt-24 lg:pb-32 z-10">
            <h2 className="text-[#B2F5E1] text-xs lg:text-sm uppercase tracking-widest font-semibold font-sans">
              Featured Work
            </h2>

            <div className="relative flex-1 overflow-hidden pr-5 mt-12 h-[400px]">
              <div className="absolute top-0 left-0 w-full h-32 z-20 pointer-events-none bg-gradient-to-b from-[#111212] to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none bg-gradient-to-t from-[#111212] to-transparent"></div>

              {/* Wrapper animated by GSAP */}
              <div
                ref={headingsWrapperRef}
                className="absolute top-[152px] left-0 w-full z-10"
              >
                {worksData.map((work, idx) => (
                  <div key={idx} className="h-24 w-full flex items-center">
                    <Link
                      ref={(el) => (headingItemsRef.current[idx] = el)}
                      href={work.href}
                      // Base classes only. GSAP handles opacity and transform
                      className="flex items-end gap-x-4 w-full opacity-30"
                    >
                      <h3 className="text-white text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-none whitespace-nowrap">
                        {work.title}
                      </h3>
                      <div className="text-white/80 text-xs lg:text-sm font-medium tracking-widest uppercase pb-1 lg:pb-2">
                        {work.year}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 pt-7 pb-14 h-full lg:overflow-visible relative z-20">
            <div className="mb-5 lg:hidden">
              <h2 className="text-white text-lg font-medium tracking-tight">
                Featured Work
              </h2>
            </div>

            <div ref={rightColRef} className="grid gap-y-6 lg:gap-y-8 w-full">
              {worksData.map((work, idx) => (
                <Link
                  key={idx}
                  href={work.href}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="grid group rounded-2xl overflow-hidden relative cursor-none shadow-xl"
                  style={{ "--mouse-x": "50%", "--mouse-y": "50%" }}
                >
                  <div className="col-start-1 row-start-1 relative w-full aspect-[4/3] transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={idx < 2}
                    />
                  </div>

                  <div className="col-start-1 row-start-1 p-4 lg:p-6 z-40 flex justify-end items-end">
                    <div className="shrink-0 inline-flex items-center rounded-full tracking-tight font-medium leading-none text-white bg-white/20 backdrop-blur-md text-sm gap-x-3 py-2.5 px-4">
                      <FiSearch className="text-sm" />
                      <div>{work.category}</div>
                      <FiTrendingUp className="text-sm" />
                    </div>
                  </div>

                  <div className="col-start-1 row-start-1 p-4 lg:hidden z-20 relative flex justify-start items-end transition-opacity duration-300 group-hover:opacity-0">
                    <div className="grid gap-y-1 relative z-30">
                      <div className="text-white text-xs font-medium">
                        {work.year}
                      </div>
                      <h3 className="text-white text-3xl font-medium tracking-tight">
                        {work.title}
                      </h3>
                    </div>
                    <div className="absolute w-full bottom-0 left-0 h-32 bg-gradient-to-t from-black/80 z-20"></div>
                  </div>

                  {/* Circular Mask Overlay */}
                  <div
                    ref={(el) => (hoverOverlaysRef.current[idx] = el)}
                    className="col-start-1 row-start-1 flex flex-col items-start justify-between z-30 p-6 lg:p-8 pointer-events-none"
                    style={{
                      backgroundColor: work.color,
                      color: work.textColor,
                      clipPath: "circle(0px at var(--mouse-x) var(--mouse-y))",
                      transition:
                        "clip-path 0.7s cubic-bezier(0.25, 1, 0.5, 1)", // Native smooth transition
                    }}
                  >
                    <div className="text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight leading-[1.1] w-[85%] pr-4">
                      {work.hoverText}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-[100px] h-[100px] rounded-full bg-[#B2F5E1] text-[#111212] z-[100] flex items-center justify-center select-none opacity-0 scale-0"
      >
        <FiArrowUpRight className="text-4xl font-bold" />
      </div>
    </section>
  );
};

export default FeaturedWork;
