"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Zap, TrendingUp } from "lucide-react";

const propositions = [
  {
    icon: Shield,
    title: "Trust-Building Experience",
    desc: "A premium digital presence signals authority and attention to detail. We build trust before the first meeting.",
  },
  {
    icon: Zap,
    title: "Future-Ready Foundation",
    desc: "Our tech-driven approach ensures your assets are positioned for the next generation of digital-native investors.",
  },
  {
    icon: TrendingUp,
    title: "Premium Positioning",
    desc: "Elevate your brand beyond the competition. We transform property viewing into an immersive lifestyle experience.",
  },
];

export default function ValuePropositionSection() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".prop-item", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
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
      className="bg-charcoal-black py-24 md:py-32 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-8">
              Why this evolution <br />
              <span className="text-primary-red">matters now.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
              The real estate landscape is changing. A modern digital presence
              is no longer an option—it&apos;s the primary way high-end clients
              perceive value.
            </p>
          </div>

          <div className="space-y-12">
            {propositions.map((prop, idx) => (
              <div key={idx} className="prop-item flex gap-6 items-start group">
                <div className="shrink-0 rounded-full bg-white/5 p-4 group-hover:bg-primary-red transition-colors duration-300">
                  <prop.icon className="h-6 w-6 text-primary-red group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
