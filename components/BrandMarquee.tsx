"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Exact filenames from img/brand/ (case-sensitive for hosting)
const BRAND_LOGO_PATHS = [
  "bmw.png",
  "hyundai.png",
  "infiniti.png",
  "jeep.png",
  "landrovers.png",
  "mercidez.png",
  "mg.png",
  "reanult.png",
  "v.png",
].map((name) => ({ src: `/img/brand/${name}`, alt: name.replace(/\.(png|svg|jpg)$/i, "") }));

function LogoStrip() {
  return (
    <div className="flex items-center gap-12 shrink-0 pr-12">
      {BRAND_LOGO_PATHS.map(({ src, alt }) => (
        <div
          key={src}
          className="relative h-10 w-24 shrink-0 flex items-center justify-center grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
        >
          <Image
            src={src}
            alt={alt}
            width={96}
            height={40}
            className="object-contain w-full h-full"
            unoptimized
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="relative z-0 border-t border-white/10 py-8 overflow-hidden bg-[#0A0A0A]" aria-label="Brand partners">
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <LogoStrip />
          <LogoStrip />
        </motion.div>
      </div>
    </section>
  );
}
