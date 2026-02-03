"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ComingSoon from "../ui/ComingSoon";

const locations = [
  {
    name: "Egba",
    path: "/egba",
    images: ["1.jpg", "2.jpg", "3.jpg"],
  },
  {
    name: "Gwagwalada",
    path: "/gwagwalada",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  },
  {
    name: "Ighodaho",
    path: "/ighodaho",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  },
  {
    name: "Kuje",
    path: "/kuje",
    images: ["1.jpg", "2.jpg", "3.jpg"],
  },
];

export default function PropertiesSection() {
  const sectionRef = useRef(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from(".properties-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate each row
      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        const isMobile = window.innerWidth < 768;
        const direction = index % 2 === 0 ? -1 : 1; // Alternating direction
        // Reduce movement distance significantly for slower, smoother feel
        // Mobile needs slightly more movement relative to screen, but still kept subtle
        const moveDistance = isMobile ? 150 * direction : 250 * direction;

        // Calculate initial offset to center content better
        // For odd rows (moving right), start further left so they slide into center
        // For even rows (moving left), start further right so they slide into center
        // We use a percentage of width to make it responsive
        let startOffset = 0;

        if (index % 2 === 0) {
          // Even rows move Left (-1). They normally start at 0.
          // To "put them a bit in the center", we shift them right initially.
          startOffset = isMobile ? 50 : 100;
        } else {
          // Odd rows move Right (1). They normally start negative.
          // To "put them a bit in the center", we shift them left initially.
          startOffset = isMobile ? -200 : -300;
        }

        gsap.fromTo(
          row,
          { x: startOffset },
          {
            x: startOffset + moveDistance,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current, // Trigger based on section visibility
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5, // Increase scrub for smoother, less jerky catch-up
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-4 mb-16 md:mb-24">
        <div className="properties-header max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
            <span className="block font-semibold">Our Portfolio</span>
            <span className="text-muted-foreground">Prime Locations</span>
          </h2>
          <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
            Discover our exclusive collection of properties across premium
            districts. Each location represents a unique investment opportunity
            designed for the modern lifestyle.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-12 md:gap-20">
        {locations.map((location, index) => (
          <div key={location.name} className="relative w-full">
            {/* Location Title & Link */}
            <div className="container mx-auto px-4 mb-6 flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-medium tracking-wide uppercase text-primary-red/80">
                {location.name}
              </h3>
              <button
                onClick={() => setIsComingSoonOpen(true)}
                className="group flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-primary-red transition-colors cursor-pointer"
              >
                <span>View More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Scrolling Carousel Row */}
            <div
              className={cn(
                "flex gap-4 md:gap-8 px-4 w-max",
                index % 2 !== 0 && "justify-end", // Align odd rows to end initially
              )}
              ref={(el) => {
                rowsRef.current[index] = el;
              }}
            >
              {/* Show all images from the folder, duplicated to ensure fill */}
              {[...location.images, ...location.images, ...location.images].map(
                (img, imgIndex) => (
                  <div
                    key={`${location.name}-${imgIndex}`}
                    className="relative shrink-0 overflow-hidden rounded-xl group
             w-[260px] h-[340px]
             md:w-[400px] md:h-[500px]"
                  >
                    <Image
                      src={`${location.path}/${img}`}
                      alt={`${location.name} Property ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80vw, 520px"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <ComingSoon
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </section>
  );
}
