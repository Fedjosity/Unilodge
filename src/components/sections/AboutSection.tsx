"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import ComingSoon from "../ui/ComingSoon";

export default function AboutSection() {
  const container = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Image Parallax & Reveal
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
      });

      // Content Reveal
      gsap.from(".about-content-item", {
        x: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          end: "center center",
          scrub: 1,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-white py-24 md:py-32 overflow-hidden"
      id="about"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Column - Founder Image */}
          <div className="w-full lg:w-1/2 relative">
            <div
              ref={imageRef}
              className="relative aspect-4/5 w-full max-w-md mx-auto lg:mr-auto rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/blog/5.jpg"
                alt="Founder of Unilodge Realty and Property Developers Limited"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />

              {/* Optional: Founder Name/Title overlay */}
              {/* <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-primary-red mb-1">
                  Founder & CEO
                </p>
                <h3 className="text-2xl font-bold">Visionary Leader</h3>
              </div> */}
            </div>

            {/* Decorative background element */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-gray-100 rounded-2xl hidden lg:block" />
          </div>

          {/* Right Column - Text Content */}
          <div ref={contentRef} className="w-full lg:w-1/2 space-y-8">
            <h2 className="about-content-item text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-charcoal-black">
              Real Estate, <br />
              <span className="text-primary-red">Technology & Energy</span>
            </h2>

            <p className="about-content-item text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              Unilodge Realty and Property Developers Limited is an innovative
              consortium dedicated to solving Africa&apos;s most pressing
              challenges in housing, infrastructure, and energy.
            </p>

            <p className="about-content-item text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              We don&apos;t just build properties. We create smart, sustainable
              solutions that transform lives, empower communities, and shape the
              future.
            </p>

            <div className="about-content-item pt-4">
              <button
                onClick={() => setIsComingSoonOpen(true)}
                className="group flex items-center gap-3 rounded-full bg-primary-red px-10 py-4 text-white transition-all hover:bg-red-700 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <span className="font-medium tracking-wide">About Us</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ComingSoon
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </section>
  );
}
