"use client";

import { useState, useEffect } from "react";
import { FiArrowUpRight, FiMenu } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 120);

      if (currentScrollY < 80) {
        setIsHidden(false);
      } else {
        if (currentScrollY > lastScrollY) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-[100] flex justify-between items-center transition-all duration-500 pointer-events-auto
        ${isHidden ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"}
        ${
          isScrolled
            ? "top-0 lg:top-4 left-0 lg:left-2 xl:left-4 right-0 lg:right-2 xl:right-4 w-full lg:w-auto rounded-none lg:rounded-full px-5 lg:px-8 py-3 lg:py-2 bg-[#f2f2f2]/95 backdrop-blur-md shadow-lg border border-black/5"
            : "top-11 left-0 right-0 w-full px-5 md:px-10 py-5 md:py-6 bg-transparent border-transparent"
        }
      `}
    >
      <Link
        href="/"
        className={`font-extrabold text-xl md:text-md transition-opacity hover:opacity-80 ${isScrolled ? "text-[#111827]" : "text-white"}`}
      >
        Rise at Nine
      </Link>

      {/* Desktop Nav */}
      <nav
        className={`hidden lg:flex items-center gap-6 font-medium tracking-tight text-[15px] ${isScrolled ? "text-[#111827]" : "text-white"}`}
      >
        <div className="group relative flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
          Services <span className="text-xs font-light">+</span>
        </div>
        <div className="group relative flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
          Industries <span className="text-xs font-light">+</span>
        </div>
        <div className="group relative flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
          International <span className="text-xs font-light">+</span>
        </div>
        <div className="group relative flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
          About <span className="text-xs font-light">+</span>
        </div>
        <Link
          href="/work"
          className="hover:opacity-70 transition-opacity flex items-center"
        >
          Work{" "}
          <span className="bg-[#B2F5E1] text-[#111827] text-[10px] font-bold rounded-full px-1.5 ml-1 mb-2">
            25
          </span>
        </Link>
        <Link href="/careers" className="hover:opacity-70 transition-opacity">
          Careers
        </Link>
        <Link href="/blog" className="hover:opacity-70 transition-opacity">
          Blog
        </Link>
        <Link href="/webinar" className="hover:opacity-70 transition-opacity">
          Webinar
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/contact"
          className={`hidden sm:flex px-6 py-2.5 rounded-full font-semibold items-center gap-1.5 transition-colors text-[15px]
            ${
              isScrolled
                ? "bg-[#111827] text-white hover:bg-gray-800"
                : "bg-white text-[#111827] hover:bg-gray-100"
            }
          `}
        >
          Get In Touch <FiArrowUpRight className="text-lg" />
        </Link>
        <button
          className={`lg:hidden text-3xl transition-colors ${isScrolled ? "text-[#111827]" : "text-white"}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
