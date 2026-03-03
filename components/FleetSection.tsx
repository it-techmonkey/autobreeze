"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cars, CATEGORIES } from "@/lib/cars";
import type { Car } from "@/lib/cars";
import FilterBar from "./FilterBar";
import CarCard from "./CarCard";

type CategoryId = (typeof CATEGORIES)[number]["id"];

function filterCars(carsList: Car[], category: CategoryId): Car[] {
  if (category === "all") return carsList;
  const normalized = category.toLowerCase().trim();
  return carsList.filter((car) => {
    const c = (car.category || "").toLowerCase().trim();
    if (normalized === "supercars") return c === "luxury" || c === "sport";
    if (normalized === "convertibles") return c === "convertible";
    return c === normalized || c.includes(normalized);
  });
}

export default function FleetSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const filteredCars = useMemo(
    () => filterCars(cars, activeCategory),
    [activeCategory]
  );

  return (
    <section id="fleet" className="py-20 bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="mb-12">
          <FilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
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
      </div>
    </section>
  );
}
