"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function SplashScreen() {
  const [isMounted, setIsMounted] = useState(false); // Default to false (hidden)
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const tagline = "Redefining Real Estate";

  // Check session storage on mount
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setIsMounted(true);
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, []);

  // Handle animation when component mounts
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (!isMounted) return;

    // Prevent scrolling while splash is active
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out container then unmount
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setIsMounted(false);
              document.body.style.overflow = ""; // Restore scrolling
            },
          });
        },
      });

      // Initial state
      gsap.set(containerRef.current, { opacity: 0 }); // Start hidden for fade-in
      gsap.set(logoRef.current, { scale: 0, opacity: 0 });
      gsap.set(".splash-char", { opacity: 0, y: 20 });

      // Fade in container first
      gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });

      // Animation sequence
      tl.to(logoRef.current, {
        scale: 1.2,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      })
        .to(
          logoRef.current,
          {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          ".splash-char",
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3",
        )
        // Add a slight pause at the end for impact
        .to({}, { duration: 1.0 });
    }, containerRef);
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black opacity-0"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div
          ref={logoRef}
          className="relative mb-8 w-24 h-24 md:w-32 md:h-32 opacity-0"
        >
          <Image
            src="/logo.png"
            alt="Unilodge Realty and Property Developers Limited Logo"
            fill
            className="object-contain"
            priority
          />

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-primary-red/20 blur-2xl rounded-full -z-10 animate-pulse" />
        </div>

        {/* Tagline with Split Text */}
        <div ref={textRef} className="overflow-hidden px-4 text-center">
          <h2 className="text-sm sm:text-base md:text-2xl font-light tracking-[0.3em] text-white uppercase">
            {tagline.split("").map((char, index) => (
              <span key={index} className="splash-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
}
