"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookModal } from "@/contexts/BookModalContext";

const LOGO_SRC = "/img/logo.png";

function isNavLinkActive(pathname: string, href: string): boolean {
  if (pathname === "/") return href === "/#fleet";
  return pathname === href;
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBookModal } = useBookModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#fleet", label: "Explore Cars" },
    { href: "/about", label: "About Us" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/#contact", label: "Contact Us" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-panel-strong py-3 shadow-glow" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-10 flex items-center gap-2 font-display text-xl font-semibold tracking-wide text-white hover:text-gold transition-colors">
          <motion.span whileTap={{ scale: 0.95 }} className="block">
          <span className="relative h-10 w-[120px] sm:h-12 sm:w-[140px] shrink-0 flex items-center">
            <Image
              src={LOGO_SRC}
              alt="AutoBreeze"
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 120px, 140px"
              unoptimized
              priority
            />
          </span>
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isNavLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 text-sm font-medium text-white/90 hover:text-gold transition-colors tracking-wide"
              >
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.span whileTap={{ scale: 0.95 }} className="relative block">
                  {link.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <motion.button
            type="button"
            onClick={() => { openBookModal(); setMobileOpen(false); }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-full border-2 border-gold px-6 py-2.5 text-sm font-semibold text-gold hover:bg-gold hover:text-matte-black transition-all duration-300"
          >
            Book Now
          </motion.button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden p-2 text-white hover:text-gold"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel-strong border-t border-white/10"
          >
            <nav className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-gold font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  <motion.span whileTap={{ scale: 0.95 }} className="block">
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <motion.button
                type="button"
                onClick={() => { openBookModal(); setMobileOpen(false); }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-gold px-6 py-3 text-center font-semibold text-gold w-full"
              >
                Book Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
