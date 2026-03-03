"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/cars";
import clsx from "clsx";

type CategoryId = (typeof CATEGORIES)[number]["id"];

interface FilterBarProps {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}

export default function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onCategoryChange(cat.id)}
          className={clsx(
            "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center",
            activeCategory === cat.id
              ? "bg-gold text-matte-black shadow-glow"
              : "glass-panel text-white/90 hover:text-gold hover:border-gold/40"
          )}
        >
          {cat.label}
        </button>
      ))}
    </motion.div>
  );
}
