"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ComingSoon from "../ui/ComingSoon";

const blogs = [
  {
    id: 1,
    title: "The Future of Real Estate",
    description:
      "How technology and sustainable design are reshaping the property landscape in Nigeria.",
    image: "/blog/1.jpg",
  },
  {
    id: 2,
    title: "Smart Home Integration",
    description:
      "Essential smart features that increase property value and modern living comfort.",
    image: "/blog/2.jpg",
  },
  {
    id: 3,
    title: "Investment Opportunities",
    description:
      "Understanding the current market trends and where to find high-yield properties.",
    image: "/blog/3.jpg",
  },
  {
    id: 4,
    title: "Sustainable Living",
    description:
      "Eco-friendly architecture and why it matters for the next generation of homes.",
    image: "/blog/4.jpg",
  },
  {
    id: 5,
    title: "Luxury Defined",
    description:
      "What truly defines luxury in modern residential developments beyond just price.",
    image: "/blog/5.jpg",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Update items per view based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, blogs.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Animate track when currentIndex changes
  useEffect(() => {
    if (!trackRef.current) return;

    // Calculate percentage to move based on container width
    // We move by (100 / itemsPerView) percent for each index
    const percentPerItem = 100 / itemsPerView;
    const xPercent = -(currentIndex * percentPerItem);

    gsap.to(trackRef.current, {
      xPercent: xPercent,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [currentIndex, itemsPerView]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".blog-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Carousel Entrance
      gsap.from(".blog-carousel", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-carousel",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 mb-12 md:mb-16">
        <div className="blog-header max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
            <span className="block font-semibold">Latest Insights</span>
            <span className="text-muted-foreground">News & Updates</span>
          </h2>
          <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
            Stay informed with the latest trends, expert advice, and updates
            from the world of premium real estate.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="container mx-auto px-4 blog-carousel relative">
        <div className="overflow-hidden -mx-3">
          <div ref={trackRef} className="flex w-full">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="shrink-0 px-3 w-full md:w-1/2 lg:w-1/3"
              >
                <div className="group relative flex flex-col h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary-red/30 transition-colors duration-300">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-medium text-foreground mb-3 line-clamp-1 group-hover:text-primary-red transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                      {blog.description}
                    </p>

                    <button
                      onClick={() => setIsComingSoonOpen(true)}
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary-red transition-colors mt-auto w-fit cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center justify-between mt-8 md:mt-12">
          {/* Dots / Indicators */}
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  currentIndex === idx
                    ? "w-8 bg-primary-red"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-primary-red hover:border-primary-red text-foreground hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-primary-red hover:border-primary-red text-foreground hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            onClick={() => setIsComingSoonOpen(true)}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary-red/20 hover:border-primary-red bg-primary-red/5 hover:bg-primary-red text-primary-red hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="font-medium">View All Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <ComingSoon
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </section>
  );
}
