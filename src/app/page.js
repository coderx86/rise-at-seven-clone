"use client";

import HeroSection from "@/components/HeroSection";
import BrandingSection from "@/components/BrandingSection";
import DrivingDemand from "@/components/DrivingDemand";
import FeaturedWork from "@/components/FeaturedWork";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import OurServices from "@/components/OurServices";
import Marquee from "@/components/Marquee";
import LegacySection from "@/components/LegacySection";
import WhatsNew from "@/components/WhatsNew";

// Saves position before unload, restores after hydration.
function useScrollRestoration() {
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollY");
    if (saved !== null) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(saved, 10));
      });
      sessionStorage.removeItem("scrollY");
    }

    const onBeforeUnload = () => {
      sessionStorage.setItem("scrollY", String(window.scrollY));
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);
}

export default function Home() {
  const container = useRef(null);
  const overlayRef = useRef(null);

  useScrollRestoration();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      // Animate the overlay mask: a transparent circle grows from bottom-center,
      // punching a hole in the solid overlay to reveal the content underneath.
      const proxy = { r: 0 };
      gsap.to(proxy, {
        r: 150,
        duration: 1.2,
        ease: "power3.inOut",
        onUpdate: () => {
          const mask = `radial-gradient(circle ${proxy.r}vmax at 50% 100%, transparent 100%, #000 100%)`;
          overlay.style.webkitMaskImage = mask;
          overlay.style.maskImage = mask;
        },
        onComplete: () => {
          overlay.style.display = "none";
        },
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="w-full min-h-screen bg-[#EFEEEC] font-sans relative overflow-x-hidden">
      <div className="w-full min-h-screen bg-[#EFEEEC] flex flex-col">
        <HeroSection />
        <BrandingSection />
        <DrivingDemand />
        <FeaturedWork />
        <OurServices />
        <Marquee />
        <LegacySection />
        <WhatsNew />
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none bg-[#B2F5E1]"
      />
    </main>
  );
}

