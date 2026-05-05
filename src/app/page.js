"use client";

import HeroSection from "@/components/HeroSection";
import BrandingSection from "@/components/BrandingSection";
import DrivingDemand from "@/components/DrivingDemand";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Home() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".page-revealer",
        { clipPath: "circle(0% at 50% 100%)" },
        {
          clipPath: "circle(150% at 50% 100%)",
          duration: 1.2,
          ease: "power3.inOut",
          clearProps: "clipPath",
        }
      );
    },
    { scope: container }
  );

  return (
    <main ref={container} className="w-full min-h-screen bg-[#B2F5E1] font-sans relative overflow-x-hidden">
      <div className="page-revealer w-full min-h-screen bg-[#EFEEEC] flex flex-col">
        <HeroSection />
        <BrandingSection />
        <DrivingDemand />
      </div>
    </main>
  );
}
