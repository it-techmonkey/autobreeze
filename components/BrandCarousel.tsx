"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { BRAND_IMAGES } from "@/lib/brandCarousel";

export default function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => setDragging(false);

  return (
    <section id="brands" className="border-t border-white/10 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl font-bold text-white text-center mb-4"
        >
          Our Brands
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/70 mb-12"
        >
          Explore our curated fleet by brand
        </motion.p>
      </div>

      <div className="space-y-16">
        {Object.entries(BRAND_IMAGES).map(([brandName, images], sectionIndex) => (
          <motion.div
            key={brandName}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-xl font-semibold text-gold mb-6 text-center px-4">
              {brandName}
            </h3>
            <div
              ref={sectionIndex === 0 ? scrollRef : undefined}
              onMouseDown={sectionIndex === 0 ? handleMouseDown : undefined}
              onMouseMove={sectionIndex === 0 ? handleMouseMove : undefined}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className={`flex gap-4 overflow-x-auto scroll-smooth py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${
                dragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {images.map((img) => (
                <div
                  key={img}
                  className="relative flex-shrink-0 w-[280px] sm:w-[320px] aspect-video rounded-xl overflow-hidden border border-white/10 bg-charcoal scroll-snap-align-start"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Image
                    src={`/static_images/${encodeURIComponent(brandName)}/${img}`}
                    alt={`${brandName} ${img}`}
                    fill
                    className="car-image-zoom"
                    sizes="(max-width: 640px) 280px, 320px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
