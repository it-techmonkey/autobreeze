"use client";

import { motion } from "framer-motion";
import type { Car } from "@/lib/cars";
import {
  Gauge,
  Shield,
  Sparkles,
  LayoutGrid,
  Radio,
  Palette,
} from "lucide-react";

interface PerformanceAndInteriorProps {
  car: Car;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-24px 0px" },
  transition: { duration: 0.45 },
};

export default function PerformanceAndInterior({ car }: PerformanceAndInteriorProps) {
  const performanceItems = [
    {
      icon: Gauge,
      title: "Engine & Drivetrain",
      desc: "Turbocharged Inline-Six with refined power delivery. All-wheel drive for confident handling in all conditions.",
    },
    {
      icon: LayoutGrid,
      title: "Adaptive Suspension",
      desc: "Electronically controlled adaptive suspension for a balance of comfort and dynamic driving.",
    },
  ];

  const interiorItems = [
    {
      icon: Sparkles,
      title: "Interior & Materials",
      desc: "Vernasca leather upholstery, premium soft-touch surfaces, and meticulous craftsmanship throughout the cabin.",
    },
    {
      icon: Radio,
      title: "Infotainment & Tech",
      desc: "12.3-inch digital instrument cluster and central touchscreen. Wireless connectivity and premium sound system.",
    },
    {
      icon: Shield,
      title: "Safety",
      desc: "Active Blind-Spot Detection, Lane Departure Warning, and a comprehensive suite of driver-assist features.",
    },
  ];

  const keyFeaturesList = [
    "Sleek design with aerodynamic lines",
    "Optional third-row seating for extra versatility",
    "Customizable ambient lighting",
  ];

  return (
    <motion.section
      {...fadeIn}
      className="mt-10 rounded-2xl border border-white/10 bg-charcoal/40 p-6 sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold text-gold mb-6">
        Performance & Interior
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
            Performance
          </h3>
          <ul className="space-y-4">
            {performanceItems.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-white/10 bg-matte-black/50 p-4"
              >
                <span className="shrink-0 rounded-lg border border-gold/30 bg-gold/10 p-2.5 text-gold">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
            Interior & Tech
          </h3>
          <ul className="space-y-4">
            {interiorItems.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex gap-4 rounded-xl border border-white/10 bg-matte-black/50 p-4"
              >
                <span className="shrink-0 rounded-lg border border-gold/30 bg-gold/10 p-2.5 text-gold">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-3">
          Key Features
        </h3>
        <ul className="flex flex-wrap gap-3">
          {keyFeaturesList.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-white/90"
            >
              <Palette className="h-4 w-4 text-gold shrink-0" aria-hidden />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
