"use client";

import { motion } from "framer-motion";
import type { Car } from "@/lib/cars";
import { CAR_SPECS } from "@/lib/cars";

interface KeyFeaturesProps {
  car: Car;
}

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-24px 0px" },
  transition: { duration: 0.4 },
};

export default function KeyFeatures({ car }: KeyFeaturesProps) {
  const specs = CAR_SPECS[car.car_id] || {};
  const horsepower = car.horsepower ?? specs.horsepower ?? "—";
  const transmission = car.transmission ?? specs.transmission ?? "—";
  const fuelType = car.fuel_type ?? specs.fuel_type ?? "—";

  const items = [
    {
      label: "Horsepower",
      value: horsepower,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      ),
    },
    {
      label: "Transmission",
      value: transmission,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
        </svg>
      ),
    },
    {
      label: "Fuel Type",
      value: fuelType,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12.871A1.875 1.875 0 0118.18 21h-12.36a1.875 1.875 0 01-1.654-1.618L5.356 8.493m12.356 0V6a3.75 3.75 0 00-7.5 0v2.493" />
        </svg>
      ),
    },
    {
      label: "Seats",
      value: `${car.capacity}`,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
  ];

  return (
    <motion.section
      {...fadeIn}
      className="rounded-2xl border border-white/10 bg-charcoal/40 p-6 sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold text-gold mb-6">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="flex flex-col items-center sm:items-start gap-2 rounded-xl border border-white/10 bg-matte-black/50 p-4"
          >
            <span className="text-gold" aria-hidden>{item.icon}</span>
            <span className="text-xs uppercase tracking-wider text-white/60">{item.label}</span>
            <span className="font-display font-semibold text-white">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
