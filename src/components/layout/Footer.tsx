"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import ComingSoon from "../ui/ComingSoon";

export default function Footer() {
  const container = useRef(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={container}
      className="bg-[#8B0000] text-white py-16 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6 max-w-lg footer-content">
            <h3 className="text-lg md:text-xl font-medium leading-relaxed">
              We are available from 9 am–5 pm,{" "}
              <span className="font-bold">Monday</span> through{" "}
              <span className="font-bold">Friday</span>
            </h3>

            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-bold">Phone:</span>{" "}
                <a
                  href="tel:+2348159457077"
                  className="hover:underline hover:text-gray-200 transition-colors"
                >
                  +234 815 945 7077
                </a>
              </p>

              <p className="text-lg">
                <span className="font-bold">Email:</span>{" "}
                <a
                  href="mailto:unilodgegroup@gmail.com"
                  className="hover:underline hover:text-gray-200 transition-colors"
                >
                  unilodgegroup@gmail.com
                </a>
              </p>
            </div>

            <div className="pt-4">
              <p className="font-bold text-lg mb-4">Follow Us:</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsComingSoonOpen(true)}
                  className="bg-[#0066FF] p-2 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <Facebook
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  />
                </button>
                <button
                  onClick={() => setIsComingSoonOpen(true)}
                  className="bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-2 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => setIsComingSoonOpen(true)}
                  className="bg-[#0077b5] p-2 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <Linkedin
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  />
                </button>
                <button
                  onClick={() => setIsComingSoonOpen(true)}
                  className="bg-[#FF0000] p-2 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <Youtube className="w-6 h-6 text-white" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Navigation */}
          <div className="flex flex-col items-start md:items-end space-y-2 footer-content">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg hover:underline underline-offset-4 decoration-2 cursor-pointer"
            >
              Home
            </Link>
            <button
              onClick={() => setIsComingSoonOpen(true)}
              className="text-lg hover:underline underline-offset-4 decoration-2 cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => setIsComingSoonOpen(true)}
              className="text-lg hover:underline underline-offset-4 decoration-2 cursor-pointer"
            >
              Properties
            </button>
            <button
              onClick={() => setIsComingSoonOpen(true)}
              className="text-lg hover:underline underline-offset-4 decoration-2 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="w-full h-px bg-white/20 mt-16 footer-content" />
        <div className="mt-4 text-sm text-white/60 text-center md:text-left footer-content">
          © {new Date().getFullYear()} Unilodge Realty. All rights reserved.
        </div>
      </div>
      <ComingSoon
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </footer>
  );
}
