"use client";

import { useState } from "react";
import { FiArrowUpRight, FiMenu } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-5 md:px-10 py-5 md:py-6 flex justify-between items-center bg-transparent pointer-events-auto">
      <Link
        href="/"
        className="text-white font-extrabold text-xl md:text-md hover:opacity-80 transition-opacity"
      >
        Rise at Nine
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-6 text-white font-medium tracking-tight text-[15px]">
        <div className="group relative flex items-center gap-1 cursor-pointer hover:text-white/80 transition-colors">
          Services <span className="text-xs font-light">+</span>
        </div>
        <div className="group relative flex items-center gap-1 cursor-pointer hover:text-white/80 transition-colors">
          Industries <span className="text-xs font-light">+</span>
        </div>
        <div className="group relative flex items-center gap-1 cursor-pointer hover:text-white/80 transition-colors">
          International <span className="text-xs font-light">+</span>
        </div>
        <div className="group relative flex items-center gap-1 cursor-pointer hover:text-white/80 transition-colors">
          About <span className="text-xs font-light">+</span>
        </div>
        <Link
          href="/work"
          className="hover:text-white/80 transition-colors flex items-center"
        >
          Work{" "}
          <span className="bg-[#B2F5E1] text-[#111827] text-[10px] font-bold rounded-full px-1.5 ml-1 mb-2">
            25
          </span>
        </Link>
        <Link href="/careers" className="hover:text-white/80 transition-colors">
          Careers
        </Link>
        <Link href="/blog" className="hover:text-white/80 transition-colors">
          Blog
        </Link>
        <Link href="/webinar" className="hover:text-white/80 transition-colors">
          Webinar
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/contact"
          className="hidden sm:flex bg-white text-[#111827] px-6 py-2.5 rounded-full font-semibold items-center gap-1.5 hover:bg-gray-100 transition-colors text-[15px]"
        >
          Get In Touch <FiArrowUpRight className="text-lg" />
        </Link>
        <button
          className="lg:hidden text-white text-3xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
