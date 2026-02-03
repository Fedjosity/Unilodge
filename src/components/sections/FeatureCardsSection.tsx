"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    title: "Property Development",
    desc: "Crafting iconic structures that define skylines.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20construction%20site%20luxury%20building%20glass%20facade%20architectural%20rendering&image_size=portrait_4_3",
  },
  {
    title: "Real Estate Investment",
    desc: "Data-driven opportunities for high-yield returns.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=financial%20district%20abstract%20digital%20data%20overlay%20on%20city%20background%20blue%20tones&image_size=portrait_4_3",
  },
  {
    title: "Sustainable Communities",
    desc: "Green living spaces designed for the future.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=vertical%20garden%20building%20sustainable%20architecture%20eco%20friendly%20luxury%20apartments&image_size=portrait_4_3",
  },
  {
    title: "Tech-Driven Management",
    desc: "Seamless property experience through innovation.",
    image:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=smart%20home%20interface%20hologram%20control%20panel%20luxury%20interior%20background&image_size=portrait_4_3",
  },
];

export default function FeatureCardsSection() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="bg-soft-off-white py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-widest text-charcoal-black md:text-4xl">
            Our Expertise
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-primary-red" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card group relative h-[400px] overflow-hidden rounded-xl bg-gray-900 shadow-xl"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
