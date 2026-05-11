"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const legacyData = [
  {
    id: 1,
    title: "Pioneers",
    desc1:
      "We’re dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    desc2:
      "We’re on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
    bgClass: "bg-black",
    textClass: "text-white",
    imgSrc: "/Assets/legacy/legacy-1.jpg",
    desktopRotation: 4,
  },
  {
    id: 2,
    title: "Award Winning",
    desc1:
      "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    desc2: "",
    bgClass: "bg-[#B2F5E1]", // Mint background
    textClass: "text-gray-900",
    imgSrc: "/Assets/legacy/legacy-2.jpg",
    desktopRotation: 8,
  },
  {
    id: 3,
    title: "Speed",
    desc1:
      "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We’ve created a service which takes ideas to result within 60 minutes.",
    desc2: "",
    bgClass: "bg-white",
    textClass: "text-gray-900",
    imgSrc: "/Assets/legacy/legacy-3.png",
    desktopRotation: 12,
  },
];

const LegacySection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Animation
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
            markers: false,
          },
        });

        // Cards fly away sequentially using a clean stagger!
        tl.to(
          cardsRef.current,
          {
            yPercent: -150,
            rotation: -40,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.4,
          },
          0
        );

        // Title text flies away
        tl.to(
          titleRef.current,
          {
            y: -150,
            opacity: 0,
            ease: "power2.inOut",
            duration: 1,
          },
          0.2,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMobileScroll = () => {
    if (!mobileContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = mobileContainerRef.current;
    if (scrollWidth - clientWidth === 0) return;
    const progress = scrollLeft / (scrollWidth - clientWidth);
    setScrollProgress(progress);
  };

  return (
    <section className="w-full py-0 lg:-mb-[100vh]">
      <div className="w-full px-0">
        {/* --- MOBILE VIEW --- */}
        <div className="w-full py-10 px-4 md:px-7 gap-y-3 md:gap-y-5 lg:hidden">
          <div className="flex justify-center mb-3">
            <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-gray-900 text-[2rem] leading-tight md:text-5xl font-medium tracking-tight">
              Legacy In The Making
            </h2>
          </div>

          {/* Horizontal scroll native snap equivalent to Swiper */}
          <div className="w-full relative mt-5">
            <div
              ref={mobileContainerRef}
              onScroll={handleMobileScroll}
              data-lenis-prevent="true"
              className="w-full flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
            >
              {legacyData.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-none snap-center flex"
                >
                  <div
                    className={`w-full h-full flex-col text-center rounded-2xl grid p-7 md:p-10 ${item.bgClass} ${item.textClass}`}
                  >
                    <div className="col-start-1 row-start-1 flex flex-col text-center gap-y-3 md:gap-y-5 items-center">
                      <div className="rounded-2xl overflow-hidden w-full aspect-[4/3] md:aspect-square relative">
                        <Image
                          src={item.imgSrc}
                          alt={item.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 224px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-y-4">
                        <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-none mt-2">
                          {item.title}
                        </h3>
                        <div className="w-full">
                          <p className="text-sm md:text-base font-medium leading-normal text-pretty mb-3">
                            {item.desc1}
                          </p>
                          {item.desc2 && (
                            <p className="text-sm md:text-base font-medium leading-normal text-pretty">
                              {item.desc2}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CSS Scrollbar Hider (for webkit) */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Pagination Progress Bar */}
            <div className="w-full h-1 bg-gray-300 mt-6 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-black transition-transform duration-300 ease-out origin-left"
                style={{
                  width: "100%",
                  // 0.33 represents 1/3 progress (1 out of 3 cards). Progress interpolates the rest.
                  transform: `scaleX(${0.333333 + scrollProgress * 0.666667})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div
          ref={sectionRef}
          className="w-full h-screen relative hidden lg:flex bg-transparent overflow-hidden"
        >
          {/* Title */}
          <div
            ref={titleRef}
            className="absolute top-0 left-0 w-full flex justify-center mt-10"
          >
            <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-gray-900 text-3xl font-medium tracking-tight">
              Legacy In The Making
            </h2>
          </div>

          {/* Cards */}
          {legacyData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="w-full h-full absolute left-0 flex items-center justify-center top-8 will-change-transform"
              style={{ zIndex: legacyData.length - index }}
            >
              <div
                className="w-full max-w-lg xl:max-w-xl 4xl:max-w-2xl"
                style={{ transform: `rotate(${item.desktopRotation}deg)` }}
              >
                <div
                  className={`w-full flex-col text-center rounded-[2rem] lg:rounded-3xl grid p-8 xl:p-12 lg:aspect-square ${item.bgClass} ${item.textClass}`}
                >
                  <div className="col-start-1 row-start-1 flex flex-col text-center items-center gap-y-5">
                    <div className="rounded-2xl overflow-hidden w-48 h-48 xl:w-56 xl:h-56 4xl:w-64 4xl:h-64 relative shrink-0">
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 256px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-y-4 w-full">
                      <h3 className="text-5xl xl:text-6xl 4xl:text-7xl font-medium tracking-tight leading-none mb-2">
                        {item.title}
                      </h3>
                      <div className="w-full">
                        <p className="text-base font-medium leading-normal text-pretty mb-4">
                          {item.desc1}
                        </p>
                        {item.desc2 && (
                          <p className="text-base font-medium leading-normal text-pretty">
                            {item.desc2}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegacySection;
