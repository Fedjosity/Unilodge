"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface ComingSoonProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoon({ isOpen, onClose }: ComingSoonProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow render before animating
      const timer = setTimeout(() => {
        document.body.style.overflow = "hidden";

        if (overlayRef.current && contentRef.current) {
          const tl = gsap.timeline();
          tl.to(overlayRef.current, {
            opacity: 1,
            duration: 0.3,
            pointerEvents: "auto",
            ease: "power2.out",
          }).fromTo(
            contentRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
            },
            "-=0.2",
          );
        }
      }, 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";

      if (overlayRef.current && contentRef.current) {
        const tl = gsap.timeline({
          onComplete: () => setShouldRender(false),
        });

        tl.to(contentRef.current, {
          y: 20,
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.in",
        }).to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.2",
        );
      } else {
        setTimeout(() => setShouldRender(false), 0);
      }
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md opacity-0 pointer-events-none"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-linear-to-br from-charcoal-black to-black p-1 shadow-2xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-linear-to-tr from-primary-red/20 via-transparent to-transparent opacity-50" />

        <div className="relative rounded-xl bg-black/90 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 text-primary-red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>
          </div>

          <h3 className="mb-2 text-2xl font-bold text-white">Coming Soon</h3>
          <p className="mb-8 text-gray-400">
            We are crafting an exceptional digital experience. This page is
            currently under construction.
          </p>

          <button
            onClick={onClose}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-white px-6 py-3 font-medium text-black transition-all hover:bg-gray-200"
          >
            <span className="relative">Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
