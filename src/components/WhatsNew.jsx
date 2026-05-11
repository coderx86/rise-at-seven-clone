"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

// Component for the staggered text animation
const AnimatedText = ({ text }) => (
  <span className="inline-flex mr-2 md:mr-3 pointer-events-none whitespace-nowrap">
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden relative pb-[0.2em] -mb-[0.2em]"
      >
        <span
          className="inline-block whatsnew-heading-char"
          style={{ opacity: 0, transform: "translateY(120%)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ))}
  </span>
);

// Component for the hoverable CTA button
const ExploreBtn = ({ onMouseEnter, onMouseLeave, className }) => (
  <Link
    href="/"
    className={`explore-btn group relative overflow-hidden cursor-pointer bg-white text-gray-900 flex items-center justify-center border border-transparent px-6 py-3 hover:bg-gray-50 ${className}`}
    style={{ borderRadius: "28px" }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="relative overflow-hidden h-6 w-52">
      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-6 flex items-center justify-center gap-x-2 font-medium">
        <span>Explore More Thoughts</span>
        <FiArrowUpRight className="text-sm mt-0.5" />
      </div>
      <div className="transition-transform duration-300 ease-out absolute inset-0 translate-y-6 group-hover:translate-y-0 flex items-center justify-center gap-x-2 font-medium">
        <span>Explore More Thoughts</span>
        <FiArrowUpRight className="text-sm mt-0.5" />
      </div>
    </div>
  </Link>
);

const newsData = [
  {
    id: 1,
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
    author: "Ray Saddiq",
    authorImage: "/Assets/whats-new/author1.jpg",
    readTime: "3 mins",
    image: "/Assets/whats-new/0B5A8145.jpg",
    href: "/",
  },
  {
    id: 2,
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
    author: "Ray Saddiq",
    authorImage: "/Assets/whats-new/author1.jpg",
    readTime: "2 mins",
    image: "/Assets/whats-new/WRAS-Manchester-01.png",
    href: "/",
  },
  {
    id: 3,
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    author: "Carrie Rose",
    authorImage: "/Assets/whats-new/author1.jpg",
    readTime: "2 mins",
    image: "/Assets/whats-new/0B5A7827.jpg",
    badge: "News",
    href: "/",
  },
];

const WhatsNew = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobileContainerRef = useRef(null);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const hoverOverlaysRef = useRef([]);
  const hoveredIndexRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMobileScroll = () => {
    if (!mobileContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = mobileContainerRef.current;
    if (scrollWidth - clientWidth === 0) return;
    const progress = scrollLeft / (scrollWidth - clientWidth);
    setScrollProgress(progress);
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // --- 1. Header Animation ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.to(".whatsnew-heading-char", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
      });

      tl.fromTo(
        ".whatsnew-heading-image",
        { width: 0, opacity: 0 },
        { width: "auto", opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8",
      );

      // --- 2. Custom Cursor & Hover Overlay Tracking (Desktop Only) ---
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray(".whatsnew-card");

        const onGlobalMove = (e) => {
          mousePos.current.x = e.clientX;
          mousePos.current.y = e.clientY;

          // Animate custom cursor position if it's active
          if (hoveredIndexRef.current !== null && cursorRef.current) {
            gsap.to(cursorRef.current, {
              x: e.clientX,
              y: e.clientY,
              duration: 0.1,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const onGlobalLeave = () => {
          hoveredIndexRef.current = null;
          if (cursorRef.current) {
            gsap.to(cursorRef.current, {
              scale: 0,
              opacity: 0,
              duration: 0.25,
              overwrite: "auto",
            });
          }
          hoverOverlaysRef.current.forEach((overlay) => {
            if (overlay) {
              overlay.style.clipPath = `circle(0px at var(--mouse-x) var(--mouse-y))`;
            }
          });
        };

        window.addEventListener("pointermove", onGlobalMove);
        window.addEventListener("pointerleave", onGlobalLeave);

        const tickerHoverCheck = () => {
          let currentlyHovered = null;

          cards.forEach((card, idx) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();

            const isInside =
              mousePos.current.x >= rect.left &&
              mousePos.current.x <= rect.right &&
              mousePos.current.y >= rect.top &&
              mousePos.current.y <= rect.bottom;

            if (isInside) {
              currentlyHovered = idx;
              // Calculate mouse position relative to the card
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
            if (cursorRef.current) {
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
            }

            // Directly update clip-path on DOM elements for the blur reveal
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

        return () => {
          window.removeEventListener("pointermove", onGlobalMove);
          window.removeEventListener("pointerleave", onGlobalLeave);
          gsap.ticker.remove(tickerHoverCheck);
        };
      });
    },
    { scope: containerRef },
  );

  const handleButtonEnter = (e) => {
    gsap.to(e.currentTarget, {
      borderRadius: "12px",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      borderRadius: "28px",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={containerRef}
      className="w-full pb-12 xl:pb-24 bg-[#EFEEEC] select-none"
    >
      <div className="w-full px-0 md:px-4 lg:px-7">
        {/* Header and CTA */}
        <div className="grid grid-cols-12 md:border-b md:border-black/10 md:pb-6 items-end mb-10 px-4 lg:px-0">
          <div className="col-span-12 md:col-span-9 flex items-end">
            <h2 className="flex flex-wrap items-center text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] text-gray-900 overflow-hidden relative">
              <AnimatedText text="What's" />
              <div className="whatsnew-heading-image inline-flex items-center justify-center mx-1 md:mx-3 overflow-hidden relative rounded-[15%] shadow-inner h-[4rem] sm:h-[4.5rem] md:h-[5.5rem] w-0">
                <div className="relative h-full aspect-square w-auto overflow-hidden">
                  <Image
                    src="/Assets/whats-new/FOS25-3380.jpg"
                    alt="What's new badge"
                    fill
                    className="object-cover"
                    draggable={false}
                    priority
                  />
                </div>
              </div>
              <AnimatedText text="New" />
            </h2>
          </div>

          <div className="col-span-12 md:col-span-3 items-center justify-end hidden md:flex">
            <ExploreBtn
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
            />
          </div>
        </div>

        {/* Cards Grid / Carousel */}
        <div className="w-full relative mt-5">
          <div
            ref={mobileContainerRef}
            onScroll={handleMobileScroll}
            className="w-full flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 lg:px-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-x-visible lg:snap-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {newsData.map((item, index) => (
              <Link
                href={item.href}
                key={item.id}
                className="w-[85vw] md:w-[45vw] lg:w-full flex-none snap-center flex flex-col items-start gap-y-5 group lg:cursor-none whatsnew-card relative"
              >
                <div className="w-full grid rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-square relative lg:rounded-3xl">
                  {/* Badge */}
                  {item.badge && (
                    <div className="col-start-1 row-start-1 z-30 p-4 lg:p-5 absolute top-0 left-0">
                      <div className="inline-flex items-center font-medium tracking-tight leading-none rounded-full text-sm px-4 py-2 text-white bg-white/20 backdrop-blur-md">
                        {item.badge}
                      </div>
                    </div>
                  )}

                  {/* Base Image (Clear) */}
                  <div className="col-start-1 row-start-1 w-full h-full relative z-10 transition-transform duration-700 ease-out group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Hover Overlay Image (Blurred) revealed by clip-path */}
                  <div
                    ref={(el) => (hoverOverlaysRef.current[index] = el)}
                    className="col-start-1 row-start-1 w-full h-full relative z-20 pointer-events-none transition-all duration-700 ease-out"
                    style={{
                      clipPath: "circle(0px at center)",
                    }}
                  >
                    <div className="w-full h-full scale-110 blur-xl relative bg-black/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Metadata */}
                <div className="flex flex-col items-start gap-y-3 lg:pr-6">
                  <div className="flex items-center gap-2 mt-1">
                    <div className="inline-flex items-center font-medium tracking-tight leading-none rounded-full text-sm gap-x-2 px-3 py-1.5 bg-white text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden -ml-1 relative">
                        {item.authorImage ? (
                          <Image
                            src={item.authorImage}
                            alt={item.author}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <FaUser className="text-gray-400 text-[10px]" />
                        )}
                      </div>
                      <span>{item.author}</span>
                    </div>
                    <div className="inline-flex items-center font-medium tracking-tight leading-none rounded-full text-sm gap-x-1.5 px-3 py-1.5 bg-white text-gray-600">
                      <FiClock />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-gray-900 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Progress Bar */}
          <div className="px-4 lg:hidden mt-2 mb-6">
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-black transition-transform duration-300 ease-out origin-left"
                style={{
                  width: "100%",
                  transform: `scaleX(${0.333333 + scrollProgress * 0.666667})`,
                }}
              />
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="flex w-full mt-6 px-4 md:hidden">
            <ExploreBtn
              className="w-full py-4"
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
            />
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[100] hidden lg:flex items-center justify-center rounded-full bg-[#B2F5E1] text-black"
        style={{
          width: "100px",
          height: "100px",
          top: "-40px",
          left: "-40px",
          scale: 0,
          opacity: 0,
        }}
      >
        <div className="text-4xl font-bold">
          <FiArrowUpRight />
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;
