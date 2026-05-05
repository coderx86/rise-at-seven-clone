"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AnnouncementSection = () => {
  const container = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!container.current) return;

    const tl = gsap.timeline({ paused: true });
    
    tl.to(contentRef.current, {
      y: "-50%",
      duration: 0.2,
      ease: "power2.inOut",
    });

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    container.current.addEventListener("mouseenter", onEnter);
    container.current.addEventListener("mouseleave", onLeave);

    return () => {
      container.current?.removeEventListener("mouseenter", onEnter);
      container.current?.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: container });

  return (
    <div 
      ref={container}
      className="bg-[#B2F5E1] mt-2 mx-2 h-9 overflow-hidden rounded-full relative z-50 cursor-pointer"
    >
      <div ref={contentRef} className="w-full h-[200%] flex flex-col">
        {/* First Announcement */}
        <div className="h-1/2 w-full flex justify-center items-center px-2">
          <Link
            href="/"
            className="text-black text-xs md:text-sm font-semibold flex items-center justify-center gap-2 text-center tracking-tight"
          >
            <span>🚨</span>
            The Category Leaderboard - Live Now
          </Link>
        </div>
        
        {/* Second Announcement */}
        <div className="h-1/2 w-full flex justify-center items-center px-2">
          <Link
            href="/"
            className="text-black text-xs md:text-sm font-semibold flex items-center justify-center gap-2 text-center tracking-tight"
          >
            <span>🚨</span>
            The Category Leaderboard - Live Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSection;

