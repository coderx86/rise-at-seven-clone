"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";

const DrivingDemand = () => {
  const handleMouseEnter = (e, targetRadius) => {
    gsap.to(e.currentTarget, {
      borderRadius: targetRadius,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (e, targetRadius) => {
    gsap.to(e.currentTarget, {
      borderRadius: targetRadius,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section className="w-full py-16 md:py-20 xl:py-28 bg-[#EFEEEC] overflow-hidden">
      <div className="w-full px-4 md:px-7">
        <div className="w-full flex justify-between items-start flex-col-reverse md:flex-row gap-x-5 gap-y-12 md:gap-y-0">
          
          {/* Mobile Buttons Overlay (shows at bottom on mobile due to flex-col-reverse) */}
          <div className="flex flex-wrap gap-4 w-full md:hidden">
            
            {/* Our Story Button (Mobile) */}
            <Link
              href="https://riseatseven.com/about/"
              className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tight capitalize font-medium overflow-hidden cursor-pointer text-base px-6 py-4 bg-white text-gray-900"
              style={{ borderRadius: "24px" }}
              onMouseEnter={(e) => handleMouseEnter(e, "12px")}
              onMouseLeave={(e) => handleMouseLeave(e, "24px")}
            >
              <div className="relative overflow-hidden h-6 w-full flex justify-center bg-transparent">
                <div className="transition-transform duration-300 ease-out group-hover:-translate-y-6 flex items-center justify-center gap-x-2">
                  <span>Our Story</span>
                  <FiArrowUpRight className="text-sm mt-0.5" />
                </div>
                <div className="transition-transform duration-300 ease-out absolute top-0 translate-y-6 group-hover:translate-y-0 flex items-center justify-center gap-x-2">
                  <span>Our Story</span>
                  <FiArrowUpRight className="text-sm mt-0.5" />
                </div>
              </div>
            </Link>

            {/* Our Services Button (Mobile) */}
            <Link
              href="https://riseatseven.com/services/"
              className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tight capitalize font-medium overflow-hidden cursor-pointer text-base px-6 py-4 bg-transparent text-gray-900"
              style={{ borderRadius: "24px" }}
              onMouseEnter={(e) => handleMouseEnter(e, "12px")}
              onMouseLeave={(e) => handleMouseLeave(e, "24px")}
            >
              <div className="relative overflow-hidden h-6 w-full flex justify-center bg-transparent">
                <div className="transition-transform duration-300 ease-out group-hover:-translate-y-6 flex items-center justify-center gap-x-2">
                  <span>Our Services</span>
                  <FiArrowUpRight className="text-sm mt-0.5" />
                </div>
                <div className="transition-transform duration-300 ease-out absolute top-0 translate-y-6 group-hover:translate-y-0 flex items-center justify-center gap-x-2">
                  <span>Our Services</span>
                  <FiArrowUpRight className="text-sm mt-0.5" />
                </div>
              </div>
            </Link>

          </div>

          {/* Left Element: Description Paragraph */}
          <div className="w-full md:mt-2 md:mb-0 max-w-sm xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
            <p className="inline-flex flex-wrap text-balance relative text-left justify-start text-gray-800 text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-medium tracking-tight leading-relaxed md:leading-normal">
              A global team of search-first content marketers engineering semantic relevancy &amp; category signals for both the internet and people
            </p>
          </div>

          {/* Right Element: Heading & Desktop Buttons */}
          <div className="mr-12 lg:mr-20 w-full grid max-w-[24rem] md:max-w-[40rem] xl:max-w-xl 2xl:max-w-[42rem] 3xl:max-w-[52rem] gap-y-6 md:gap-y-10">
            
            {/* Headings with inline visual badge */}
            <h2 className=" inline-flex flex-wrap text-balance relative text-left justify-start text-gray-900 text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-medium tracking-tight leading-[0.95] md:leading-[0.9]">
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Driving</span>
                <span>Demand</span>
                <span>&amp;</span>
                <span>Discovery</span>
                <span className="inline-flex shrink-0 bg-black/5 relative overflow-hidden rounded-[15%] w-[60px] h-[60px] shadow-inner group cursor-pointer transition-transform duration-500 hover:scale-105">
                  <Image
                    src="/Assets/driving-demand.jpg"
                    alt="Driving Demand badge"
                    fill
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                    priority
                  />
                </span>
              </span>
            </h2>

            {/* Action Buttons (Desktop Only) */}
            <div className="flex-wrap gap-4 hidden md:flex">
              
              {/* Our Story Button (Desktop) */}
              <Link
                href="/"
                className="group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tight capitalize font-medium overflow-hidden cursor-pointer text-base px-7 py-3.5 bg-white text-gray-900"
                style={{ borderRadius: "28px" }}
                onMouseEnter={(e) => handleMouseEnter(e, "12px")}
                onMouseLeave={(e) => handleMouseLeave(e, "28px")}
              >
                <div className="relative overflow-hidden h-6 w-24 bg-transparent">
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-6 flex items-center justify-center gap-x-2">
                    <span>Our Story</span>
                    <FiArrowUpRight className="text-sm mt-0.5" />
                  </div>
                  <div className="transition-transform duration-300 ease-out absolute top-0 translate-y-6 group-hover:translate-y-0 flex items-center justify-center gap-x-2">
                    <span>Our Story</span>
                    <FiArrowUpRight className="text-sm mt-0.5" />
                  </div>
                </div>
              </Link>

              {/* Our Services Button (Desktop) */}
              <Link
                href="/"
                className="group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tight capitalize font-medium overflow-hidden border border-transparent cursor-pointer text-base px-6 py-3.5 transition-all duration-300 bg-transparent text-gray-900"
              >
                <div className="relative overflow-hidden h-6">
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-6 flex items-center justify-center gap-x-2">
                    <span>Our Services</span>
                    <FiArrowUpRight className="text-sm mt-0.5" />
                  </div>
                  <div className="transition-transform duration-300 ease-out absolute top-0 translate-y-6 group-hover:translate-y-0 flex items-center justify-center gap-x-2">
                    <span>Our Services</span>
                    <FiArrowUpRight className="text-sm mt-0.5" />
                  </div>
                </div>
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DrivingDemand;
