"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandStorySection() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".story-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-white py-24 md:py-32 lg:py-40"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
          <div>
            <span className="story-text mb-6 block text-sm font-medium uppercase tracking-widest text-primary-red">
              Our Vision
            </span>
            <h2 className="story-text text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-charcoal-black">
              Building more than just walls. We build{" "}
              <span className="text-gray-400">ecosystems.</span>
            </h2>
          </div>

          <div className="space-y-8 text-lg font-light leading-relaxed text-gray-600 md:text-xl">
            <p className="story-text">
              In a world where technology moves fast, real estate has stayed
              still. We are changing that. Unilodge Realty and Property Developers Limited isn&apos;t just about
              property; it&apos;s about creating connected, sustainable
              communities that adapt to how you live.
            </p>
            <p className="story-text">
              From smart home integration to eco-conscious design, every project
              we undertake is a commitment to the future. We don&apos;t just
              sell spaces; we curate lifestyles for the modern generation.
            </p>
            <div className="story-text pt-4">
              <div className="h-px w-full bg-gray-200" />
              <div className="mt-8 flex gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-charcoal-black">
                    15+
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-gray-500">
                    Communities
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-charcoal-black">
                    100%
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-gray-500">
                    Sustainable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
