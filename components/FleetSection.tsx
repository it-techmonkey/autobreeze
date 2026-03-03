"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cars, CATEGORIES } from "@/lib/cars";
import type { Car } from "@/lib/cars";
import FilterBar from "./FilterBar";
import CarCard from "./CarCard";
import RevealOnScroll from "./RevealOnScroll";

type CategoryId = (typeof CATEGORIES)[number]["id"];

const CAPACITY_OPTIONS = [
  { value: "all", label: "All Seats" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6+" },
] as const;

function filterCars(
  carsList: Car[],
  category: CategoryId,
  searchQuery: string,
  capacityFilter: string
): Car[] {
  let result = carsList;
  if (category !== "all") {
    const normalized = category.toLowerCase().trim();
    result = result.filter((car) => {
      const c = (car.category || "").toLowerCase().trim();
      if (normalized === "supercars") return c === "luxury" || c === "sport";
      if (normalized === "convertibles") return c === "convertible";
      return c === normalized || c.includes(normalized);
    });
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter((car) => car.title.toLowerCase().includes(q));
  }
  if (capacityFilter !== "all") {
    const minCap = capacityFilter === "6" ? 6 : parseInt(capacityFilter, 10);
    result = result.filter((car) =>
      capacityFilter === "6" ? car.capacity >= 6 : car.capacity === minCap
    );
  }
  return result;
}

interface FleetSectionProps {
  /** When set, show only this many featured cars and a "View All Cars" button (e.g. 4 on home). */
  featuredLimit?: number;
}

export default function FleetSection({ featuredLimit }: FleetSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const filteredCars = useMemo(
    () => filterCars(cars, activeCategory, searchQuery, capacityFilter),
    [activeCategory, searchQuery, capacityFilter]
  );
  const displayCars = featuredLimit != null ? filteredCars.slice(0, featuredLimit) : filteredCars;
  const hasMore = featuredLimit != null && filteredCars.length > featuredLimit;

  return (
    <section id="fleet" className="py-20 bg-[#0A0A0A]">
      <RevealOnScroll as="div" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">
            Catalog
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our Fleet
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-gradient-to-r from-gold to-gold-champagne rounded-full" />
        </motion.div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" aria-hidden />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by car name..."
              className="w-full rounded-xl border border-white/20 bg-matte-black/50 pl-11 pr-4 py-3 text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
              aria-label="Search cars"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            <span className="sr-only">Car type</span>
            <FilterBar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {CAPACITY_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setCapacityFilter(value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[40px] ${
                  capacityFilter === value
                    ? "bg-gold/20 text-gold border border-gold/50"
                    : "border border-white/20 text-white/80 hover:border-gold/40 hover:text-gold"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {displayCars.length > 0 ? (
              displayCars.map((car, index) => (
                <CarCard key={car.car_id} car={car} index={index} />
              ))
            ) : (
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center text-white/60"
              >
                No vehicles in this category.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-10 text-center">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center rounded-full border-2 border-gold px-8 py-3.5 text-sm font-semibold text-gold hover:bg-gold hover:text-matte-black transition-all duration-300"
            >
              View All Cars
            </Link>
          </div>
        )}
      </RevealOnScroll>
    </section>
  );
}
