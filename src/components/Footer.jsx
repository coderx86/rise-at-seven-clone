"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Fade in and slide up gradually when scrolling into view
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    },
    { scope: footerRef },
  );

  const socialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaXTwitter, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
    { icon: FaYoutube, href: "#" },
    { icon: FaTiktok, href: "#" },
    { icon: FaInstagram, href: "#" },
  ];

  return (
    <footer ref={footerRef} className="w-full relative z-30 px-2 pb-2">
      <div className="w-full bg-[#111212] rounded-[2rem] pt-12 md:pt-14 pb-6 px-4 md:px-8 lg:px-5 lg:pt-15 lg:pb-8 flex flex-col justify-between overflow-hidden">
        <div ref={contentRef} className="w-full">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
            {/* Left Column - Newsletter & Socials */}
            <div className="lg:col-span-5 flex flex-col gap-y-1 md:gap-y-6">
              <h2 className="text-white text-2xl md:text-3xl font-medium tracking-tight text-balance">
                Stay updated with Rise news
              </h2>
              <form
                className="relative w-full mt-2 md:mt-none"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full bg-[#2A2B2B] text-white placeholder-white/50 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-white/20 transition-all text-lg"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#B2F5E1] text-[#111212] rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 group"
                >
                  <FiArrowUpRight className="text-xl transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </form>
              <div className="flex flex-wrap gap-2 mt-2 md:mt-none">
                {socialLinks.map((Social, idx) => (
                  <a
                    key={idx}
                    href={Social.href}
                    className="inline-flex items-center gap-x-0 md:gap-x-2 bg-white text-[#111212] rounded-xl px-3 py-1.5 hover:rounded-md transition-all duration-300 group"
                  >
                    <Social.icon className="text-sm" />
                    <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Columns - Links */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-20 lg:ml-auto w-full md:w-auto">
              <div className="flex flex-col gap-y-1 md:gap-y-4 border-l border-white/20 pl-4">
                {[
                  "Services",
                  "Work",
                  "About",
                  "Culture",
                  "Meet The Risers",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="group inline-block text-white text-lg md:text-xl font-medium tracking-tight overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {item}
                      </div>
                      <div className="transition-transform duration-300 ease-out absolute top-0 left-0 w-full h-full translate-y-full group-hover:translate-y-0 text-[#B2F5E1]">
                        {item}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-y-1 md:gap-y-4 border-l border-white/20 pl-4">
                {[
                  "Testimonials",
                  "Blog & Resources",
                  "Webinars",
                  "Careers",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="group inline-block text-white text-lg md:text-xl font-medium tracking-tight overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {item}
                      </div>
                      <div className="transition-transform duration-300 ease-out absolute top-0 left-0 w-full h-full translate-y-full group-hover:translate-y-0 text-[#B2F5E1]">
                        {item}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-y-1 md:gap-y-4 border-l border-white/20 pl-4">
                {[
                  "Sheffield",
                  "Manchester",
                  "London",
                  "New York",
                  "Contact",
                ].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="group inline-block text-white text-lg md:text-xl font-medium tracking-tight overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {item}
                      </div>
                      <div className="transition-transform duration-300 ease-out absolute top-0 left-0 w-full h-full translate-y-full group-hover:translate-y-0 text-[#B2F5E1]">
                        {item}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Big Logo Text */}
          <div className="w-full mt-5 lg:mt-8 flex justify-center lg:justify-start">
            <h1 className="text-[12vw] lg:text-10xl tracking-tighter font-medium text-white w-full">
              Rise at Nine
              <sup className="text-[6vw] lg:text-[4vw] font-light">&reg;</sup>
            </h1>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col lg:flex-row justify-between items-start pt-5 md:pt-none lg:items-center gap-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/80 font-light text-xs md:text-sm">
              <span>&copy; 2025 Rise at Nine Ltd. All rights reserved</span>
              <Link href="#" className="hover:text-[#B2F5E1] transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden md:inline-block w-1 h-1 bg-white/50 rounded-full"></span>
              <Link href="#" className="hover:text-[#B2F5E1] transition-colors">
                Terms & conditions
              </Link>
            </div>
            <div className="text-white/80 font-light text-xs md:text-sm">
              <Link
                href="https://www.purno-dewan.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B2F5E1] transition-colors"
              >
                Website MadeBy @coderx86
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
