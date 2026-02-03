"use client";
import { useEffect, useRef } from "react";
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
            Our Core Values
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-primary-red" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
