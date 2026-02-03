"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ComingSoon from "../ui/ComingSoon";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "#properties" },
    { name: "Events", href: "#events" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    )
      .fromTo(
        logoRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      )
      .fromTo(
        ".nav-link",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.6",
      );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".mobile-nav-link",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent, name: string) => {
    if (name !== "Home") {
      e.preventDefault();
      setIsComingSoonOpen(true);
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/90 backdrop-blur-md py-4 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center gap-2 z-50">
            <Image
              src="/logo.png"
              alt="Unilodge Realty and Property Developers Limited"
              width={40}
              height={40}
            />
          </div>

          {/* Desktop Navigation */}
          <nav ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.name)}
                className="nav-link group relative text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <button
              className="nav-link text-white hover:text-primary-red transition-colors"
              onClick={() => setIsComingSoonOpen(true)}
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="z-50 block p-2 text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative h-6 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "top-3 rotate-45" : "top-1"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "top-3"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "top-3 -rotate-45" : "top-5"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-30 flex flex-col justify-center bg-black/95 px-8 translate-x-full md:hidden"
      >
        <nav ref={mobileLinksRef} className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.name)}
              className="mobile-nav-link text-3xl font-bold text-white transition-colors hover:text-primary-red"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <ComingSoon
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </>
  );
}
