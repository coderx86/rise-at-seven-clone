"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";

const servicesData = [
  {
    title: "Digital PR",
    href: "/",
    image: "/Assets/our-services/Our-services-1.jpg",
  },
  {
    title: "Organic Social & Content",
    href: "/",
    image: "/Assets/featured-work/TNF.webp",
  },
  {
    title: "Search & Growth Strategy",
    href: "/",
    image: "/Assets/featured-work/sixt-1.webp",
  },
  {
    title: "Content Experience",
    href: "/",
    image: "/Assets/featured-work/dojo-go-product-shot-1.webp",
  },
  {
    title: "Data & Insights",
    href: "/",
    image: "/Assets/featured-work/Screenshot-2025-07-04-at-12.50.54.png",
  },
  {
    title: "Onsite SEO",
    href: "/",
    image: "/Assets/featured-work/easter-breaks.webp",
  },
];

const AnimatedText = ({ text }) => (
  <span className="inline-flex mr-2 md:mr-4 pointer-events-none whitespace-nowrap">
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden relative pb-[0.4em] -mb-[0.3em]"
      >
        <span
          className="inline-block service-heading-char"
          style={{ opacity: 0, transform: "translateY(120%)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ))}
  </span>
);

const ViewAllBtn = ({ className, style, onMouseEnter, onMouseLeave }) => (
  <Link
    href="https://riseatseven.com/services/"
    className={`view-all-btn group relative overflow-hidden cursor-pointer bg-white text-gray-900 flex items-center justify-center ${className}`}
    style={{ borderRadius: "28px", ...style }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="relative overflow-hidden h-6 w-40">
      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-6 flex items-center justify-center gap-x-2 font-medium">
        <span>View All Services</span>
        <FiArrowUpRight className="text-sm mt-0.5" />
      </div>
      <div className="transition-transform duration-300 ease-out absolute inset-0 translate-y-6 group-hover:translate-y-0 flex items-center justify-center gap-x-2 font-medium">
        <span>View All Services</span>
        <FiArrowUpRight className="text-sm mt-0.5" />
      </div>
    </div>
  </Link>
);

const OurServices = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.to(".service-heading-char", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
      });

      tl.fromTo(
        ".service-heading-image",
        { width: 0, opacity: 0 },
        { width: "auto", opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8",
      );

      tl.fromTo(
        ".view-all-btn",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      );

      tl.fromTo(
        ".service-row",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  const handleItemEnter = (e) => {
    const target = e.currentTarget;
    const parent = target.closest(".grid");
    const bg = parent?.querySelector(".service-bg");
    const bgImg = parent?.querySelector(".service-bg-img");
    const arrow = target.querySelector(".service-arrow");
    const titleText = target.querySelector(".service-title-text");

    const ease = "power2.out";
    const duration = 0.4;

    if (bg) {
      gsap.to(bg, {
        opacity: 1,
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }

    if (bgImg) {
      gsap.to(bgImg, {
        scale: 1.05,
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }

    if (titleText) {
      gsap.to(titleText, {
        x: 80,
        color: "#ffffff",
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 40,
        y: 20,
        rotation: 0,
        opacity: 1,
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }
  };

  const handleItemLeave = (e) => {
    const target = e.currentTarget;
    const parent = target.closest(".grid");
    const bg = parent?.querySelector(".service-bg");
    const bgImg = parent?.querySelector(".service-bg-img");
    const arrow = target.querySelector(".service-arrow");
    const titleText = target.querySelector(".service-title-text");

    const ease = "power2.out";
    const duration = 0.4;

    if (bg) {
      gsap.to(bg, {
        opacity: 0,
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }

    if (bgImg) {
      gsap.to(bgImg, {
        scale: 1,
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }

    if (titleText) {
      gsap.to(titleText, {
        x: 0,
        color: "#111212",
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: -40,
        y: 40,
        rotation: -45,
        opacity: 0,
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    }
  };

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
      className="w-full pb-24 bg-[#EFEEEC] select-none"
    >
      <div className="w-full px-4 md:px-7">
        {/* Header */}
        <div className="grid grid-cols-12 md:border-b md:border-black/10 md:pb-6 items-end mb-10">
          <div className="col-span-12 md:col-span-8 flex items-end">
            <h2 className="flex flex-wrap items-center text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-medium tracking-tight leading-[0.9] text-gray-900 overflow-hidden">
              <AnimatedText text="Our" />
              <div className="service-heading-image inline-flex items-center justify-center mx-1 md:mx-3 overflow-hidden relative rounded-[15%] shadow-inner h-[3.8rem] sm:h-[4.5rem] md:h-[5.5rem] w-0">
                <div className="relative h-full aspect-square">
                  <Image
                    src="/Assets/our-services/IMG_5079.JPG"
                    alt="Our Services badge"
                    fill
                    className="object-cover"
                    draggable={false}
                    priority
                  />
                </div>
              </div>
              <AnimatedText text="Services" />
            </h2>
          </div>

          {/* Desktop CTA */}
          <div className="col-span-4 hidden md:flex justify-end">
            <ViewAllBtn
              style={{ padding: "14px 28px" }}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="pl-4 pr-0 md:px-10 grid grid-cols-12 gap-x-4 lg:gap-x-25">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`service-row col-span-12 md:col-span-6 relative border-black/10 ${
                index === 4
                  ? "border-b md:border-b-0"
                  : index === 5
                    ? "border-b-0"
                    : "border-b"
              }`}
            >
              <div className="grid grid-cols-1 relative">
                {/* Service Link */}
                <Link
                  href={service.href}
                  className="col-start-1 row-start-1 relative z-20 py-5 lg:py-7 flex items-center text-gray-900"
                  onMouseEnter={handleItemEnter}
                  onMouseLeave={handleItemLeave}
                >
                  <div
                    className="service-arrow absolute left-0 top-[2px] pointer-events-none pl-5"
                    style={{
                      transform: "translate(-40px, 40px) rotate(-45deg)",
                      opacity: 0,
                    }}
                  >
                    <h2 className="text-white text-3xl lg:text-6xl">
                      <FiArrowUpRight />
                    </h2>
                  </div>

                  <div className="service-title-text font-medium text-2xl lg:text-4xl xl:text-5xl tracking-tight leading-none text-gray-900">
                    {service.title}
                  </div>
                </Link>

                {/* Hover Background */}
                <div
                  className="service-bg col-start-1 row-start-1 rounded-full overflow-hidden bg-black pointer-events-none"
                  style={{ opacity: 0 }}
                >
                  <div className="w-full h-full opacity-60 relative">
                    <Image
                      src={service.image}
                      alt={`${service.title} background`}
                      fill
                      className="service-bg-img object-cover object-center"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="col-span-12 mt-8 md:hidden">
            <ViewAllBtn className="w-full py-4 px-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
