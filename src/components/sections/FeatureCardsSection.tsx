"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    title: "Sustainability",
    desc: "Building eco-friendly communities that prioritize the environment.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Excellence",
    desc: "Delivering exceptional quality in every property development project.",
    image:
      "https://images.unsplash.com/photo-1644042191329-759b854f880a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Integrity",
    desc: "Operating with transparency and trust in all real estate transactions.",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Collaboration",
    desc: "Working with partners and communities to create shared value.",
    image: "/core-values/collaboration.jpg",
  },
  {
    title: "Innovation",
    desc: "Leveraging technology to redefine the real estate experience.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
];

function Card3D({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !contentRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Calculate glow position
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    gsap.to(contentRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
    });

    gsap.to(glowRef.current, {
      background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.3), transparent 50%)`,
      duration: 0.2,
    });
  };

  const handleMouseLeave = () => {
    if (!contentRef.current || !glowRef.current) return;

    gsap.to(contentRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(glowRef.current, {
      background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0), transparent 50%)`,
      duration: 0.5,
    });
  };

  return (
    <div
      ref={cardRef}
      className="feature-card-wrapper relative h-[450px] w-full"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={contentRef}
        className="feature-card relative h-full w-full rounded-xl bg-gray-900 shadow-xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shadow Layer - moves opposite to tilt */}
        <div
          className="absolute inset-0 z-0 bg-black/50 blur-xl transition-transform duration-300"
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* Image Layer - Deepest */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: "translateZ(0px) scale(1.1)" }}
        >
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
          />
        </div>

        {/* Gradient Overlay Layer - Middle */}
        <div
          className="absolute inset-0 z-10 bg-linear-to-t from-black/95 via-black/50 to-transparent"
          style={{ transform: "translateZ(20px)" }}
        />

        {/* Hover Glow Effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
          style={{ transform: "translateZ(30px)" }}
        />

        {/* Content Layer - Highest (Pop out) */}
        <div
          className="absolute bottom-0 left-0 w-full z-30 flex flex-col justify-end p-8 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0"
          style={{ transform: "translateZ(50px)" }}
        >
          <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl drop-shadow-lg tracking-wide">
            {feature.title}
          </h3>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="text-gray-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100 leading-relaxed font-light pt-2 pb-2">
                {feature.desc}
              </p>
            </div>
          </div>

          {/* Decorative element */}
          <div className="w-12 h-1 bg-primary-red mt-2 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </div>

        {/* Border Glow on Hover */}
        <div
          className="absolute inset-0 border border-white/10 rounded-xl z-40 transition-colors duration-300 group-hover:border-white/30"
          style={{ transform: "translateZ(60px)" }}
        />
      </div>
    </div>
  );
}

export default function FeatureCardsSection() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".feature-card-wrapper", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          end: "bottom center",
          scrub: 1,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="bg-soft-off-white py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold uppercase tracking-widest text-charcoal-black md:text-5xl mb-4">
            Our Core Values
          </h2>
          <div className="mx-auto h-1.5 w-24 bg-primary-red rounded-full" />
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto font-light text-lg">
            Principles that define our legacy and shape your future.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 perspective-container">
          {features.map((feature, idx) => (
            <div key={idx} className="group h-full">
              <Card3D feature={feature} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
