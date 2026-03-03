"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
const HERO_IMAGES = [
  "/img/landing/landing0.png",
  "/img/landing/landing1.png",
  "/img/landing/landing2.png",
  "/img/landing/landing3.jpg",
  "/img/landing/landing4.jpg",
  "/img/landing/landing5.jpg",
];
const SLIDE_INTERVAL_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[index]}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
              sizes="100vw"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-[#0A0A0A]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-matte-black/85 via-matte-black/75 to-matte-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-sans text-sm uppercase tracking-[0.4em] text-gold-champagne mb-4"
        >
          Premium Car Rental
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.98, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          Drive in
          <br />
          <span className="text-gold">Luxury</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 max-w-xl mx-auto text-white/80 text-lg"
        >
          Experience the finest fleet in Dubai. From SUVs to sedans, we deliver excellence at every turn.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="#fleet"
            className="group relative inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-semibold text-matte-black transition-all duration-300 hover:shadow-glow-lg hover:scale-105"
          >
            <motion.span className="relative z-10" whileTap={{ scale: 0.95 }}>Explore Fleet</motion.span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#fleet" className="block text-white/60 hover:text-gold transition-colors">
          <svg className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
