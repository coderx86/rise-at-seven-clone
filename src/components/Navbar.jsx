"use client";

import { useState, useEffect, useRef } from "react";
import { FiArrowUpRight, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const overlayRef = useRef(null);
  const backdropRef = useRef(null);
  const itemsRef = useRef([]);

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

  // GSAP animation for Mobile Overlay & Page Blur Backdrop
  useGSAP(() => {
    if (mobileMenuOpen) {
      gsap.killTweensOf([overlayRef.current, backdropRef.current, itemsRef.current]);
      
      // Ensure elements are visible before animating (reset yPercent, start from right)
      gsap.set(overlayRef.current, { display: "flex", yPercent: 0, xPercent: 100, opacity: 0 });
      gsap.set(backdropRef.current, { display: "block", opacity: 0 });
      
      // Animate full-page blur backdrop
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Animate menu card (slide from right to left)
      gsap.to(overlayRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      });

      // Slide items in slightly from right to left
      gsap.fromTo(
        itemsRef.current,
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    } else {
      gsap.killTweensOf([overlayRef.current, backdropRef.current, itemsRef.current]);
      
      // Close backdrop
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(backdropRef.current, { display: "none" });
        },
      });

      // Close menu card (slide out to right)
      gsap.to(overlayRef.current, {
        xPercent: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
        },
      });
    }
  }, [mobileMenuOpen]);

  const menuItems = [
    { name: "Services", hasDropdown: true },
    { name: "Industries", hasDropdown: true },
    { name: "International", hasDropdown: true },
    { name: "About", hasDropdown: true },
    { name: "Work", hasDropdown: false },
    { name: "Careers", hasDropdown: false },
    { name: "Blog & Resources", hasDropdown: true },
    { name: "Webinar", hasDropdown: false },
  ];

  return (
    <>
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
            onMouseEnter={(e) => handleMouseEnter(e, "12px")}
            onMouseLeave={(e) => handleMouseLeave(e, "24px")}
            className={`hidden sm:flex px-6 py-2.5 rounded-full font-semibold items-center justify-center transition-colors text-[15px] group overflow-hidden
              ${
                isScrolled
                  ? "bg-[#111827] text-white hover:bg-gray-800"
                  : "bg-white text-[#111827] hover:bg-gray-100"
              }
            `}
          >
            <div className="relative overflow-hidden">
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full flex items-center gap-x-1.5">
                <span>Get In Touch</span> <FiArrowUpRight className="text-lg" />
              </div>
              <div
                className={`transition-transform duration-300 ease-out absolute top-0 left-0 w-full h-full translate-y-full group-hover:translate-y-0 flex items-center gap-x-1.5
                  ${isScrolled ? "text-[#B2F5E1]" : "text-[#111827]"}
                `}
              >
                <span>Get In Touch</span> <FiArrowUpRight className="text-lg" />
              </div>
            </div>
          </Link>
          <button
            className={`lg:hidden text-3xl transition-colors ${isScrolled ? "text-[#111827]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Full screen backdrop with blur */}
      <div
        ref={backdropRef}
        style={{ display: "none" }}
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 bg-[#1e1e1e] backdrop-blur z-[110] cursor-pointer"
      />

      {/* Mobile Menu Overlay Card (GSAP-controlled) */}
      <div
        ref={overlayRef}
        style={{ display: "none" }}
        className="fixed inset-3 md:inset-4 bg-[#1E1C1A]/95 backdrop-blur-xl border border-white/5 rounded-[2rem] z-[120] p-6 md:p-8 flex flex-col justify-between text-white shadow-2xl overflow-hidden select-none"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <span className="font-semibold text-xl tracking-tight">Rise at Nine&reg;</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto my-6 flex flex-col">
          {menuItems.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => (itemsRef.current[index] = el)}
              className="flex justify-between items-center py-4 border-b border-white/5 group cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl md:text-3xl font-semibold tracking-tight">{item.name}</span>
              {item.hasDropdown && (
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <FiChevronDown className="text-lg" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div ref={(el) => (itemsRef.current[menuItems.length] = el)} className="mt-4">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 bg-white text-[#1C1A19] rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#B2F5E1] hover:text-[#111212] transition-colors duration-300 shadow-lg cursor-pointer"
          >
            Get In Touch <FiArrowUpRight className="text-xl" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
