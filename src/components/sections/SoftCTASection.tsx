"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function SoftCTASection() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
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
      className="bg-white py-32 md:py-40 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-4 cta-content relative z-10">
        <p className="mb-6 text-sm font-bold uppercase tracking-widest text-primary-red">
          The Next Step
        </p>
        <h2 className="mb-8 text-4xl font-bold text-charcoal-black md:text-6xl lg:text-7xl">
          This is just the beginning.
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl font-light text-gray-600 leading-relaxed">
          We&apos;ve only scratched the surface of what&apos;s possible. If this
          direction resonates with your vision, we are ready to build the future
          of Unilodge Realty and Property Developers Limited.
        </p>

        <button className="group inline-flex items-center gap-4 rounded-full bg-charcoal-black px-12 py-6 text-lg font-medium text-white transition-all hover:bg-primary-red hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
          Let&apos;s Continue
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
