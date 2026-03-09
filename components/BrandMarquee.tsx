"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Exact filenames from public/img/brand/ (case-sensitive for production)
const BRAND_LOGO_PATHS = [
  "bmw.png",
  "hyundai.png",
  "infiniti.png",
  "jeep.png",
  "tesla3.png",
  "mercidez.png",
  "mg.png",
  "reanult.png",
  "v.png",
].map((name) => ({
  src: `/img/brand/${name}`,
  alt: name.replace(/\.(png|svg|jpg)$/i, ""),
}));

function LogoStrip() {
  return (
    <div className="flex items-center gap-12 shrink-0 pr-12" aria-hidden>
      {BRAND_LOGO_PATHS.map(({ src, alt }) => {
        const isTesla = alt.toLowerCase().startsWith("tesla");
        return (
        <div
          key={src}
          className={`relative h-12 shrink-0 flex items-center justify-center transition-all duration-300 ${
            isTesla ? "opacity-90 hover:opacity-100" : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
          } ${
            isTesla ? "w-24" : "w-28"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            width={112}
            height={48}
            className={`object-contain ${
              isTesla ? "w-[82%] h-[82%] mix-blend-screen" : "w-full h-full"
            }`}
            unoptimized
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      );
      })}
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section
      className="relative z-10 w-full min-h-[7rem] border-t border-white/10 border-b border-white/5 py-8 overflow-hidden bg-[#0A0A0A]"
      aria-label="Brand partners"
    >
      <div className="absolute inset-0 w-full overflow-hidden">
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
