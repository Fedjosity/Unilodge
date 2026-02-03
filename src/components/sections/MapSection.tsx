"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MapSection() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".map-content", {
        y: 50,
        opacity: 0,
        duration: 0.2,
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
    <section ref={container} className="w-full bg-white py-0">
      <div className="map-content w-full h-[400px] md:h-[500px] relative filter grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5786357367856!2d5.617192375836239!3d6.318933293671378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d39e9432608d%3A0x29634e029272337e!2sHall%201%20Car%20Park!5e0!3m2!1sen!2sng!4v1714828000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute top-4 left-4 bg-white p-4 rounded-md shadow-lg z-10 max-w-xs hidden md:block">
          <h3 className="font-bold text-charcoal-black mb-1">
            Unilodge Realty and Property Developers Limited
          </h3>
          <p className="text-sm text-gray-600">Uniben, Benin City</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-red text-xs font-medium mt-2 inline-block hover:underline"
          >
            View larger map
          </a>
        </div>
      </div>
    </section>
  );
}
