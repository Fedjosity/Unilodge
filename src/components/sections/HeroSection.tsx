"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const container = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline();

      tl.from(bgRef.current, {
        scale: 1.2,
        duration: 2,
        ease: "power3.out",
      }).from(
        ".hero-text",
        {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=1.5",
      );

      // Parallax effect
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative h-screen w-full overflow-hidden bg-charcoal-black"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Luxury Real Estate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1
          ref={textRef}
          className="hero-text mb-6  text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl"
        >
          Redefining Real Estate <br />
          <span className="text-primary-red">for a New Generation</span>
        </h1>

        <p className="hero-text mb-10  text-lg font-light tracking-wide text-gray-200 md:text-xl">
          Where community, technology, and trust converge to create the future
          of living.
        </p>

        <button className="hero-text group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-black transition-all hover:bg-primary-red hover:text-white cursor-pointer">
          Explore the Vision
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
