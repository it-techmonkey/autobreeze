"use client";

import { motion } from "framer-motion";
import type { Car } from "@/lib/cars";

const iconClass = "h-5 w-5";
function IconGauge({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconSparkles({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
function IconLayoutGrid({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}
function IconRadio({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" /><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}
function IconPalette({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.648 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.648-1.648h1.852c1.063 0 1.648.937 1.648 1.648 0 .726-.385 1.38-.937 1.652-.289.174-.652.261-1.015.261-.726 0-1.38-.385-1.652-.937a2.47 2.47 0 0 1-.261-1.015" />
    </svg>
  );
}

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
      icon: IconGauge,
      title: "Engine & Drivetrain",
      desc: "Turbocharged Inline-Six with refined power delivery. All-wheel drive for confident handling in all conditions.",
    },
    {
      icon: IconLayoutGrid,
      title: "Adaptive Suspension",
      desc: "Electronically controlled adaptive suspension for a balance of comfort and dynamic driving.",
    },
  ];

  const interiorItems = [
    {
      icon: IconSparkles,
      title: "Interior & Materials",
      desc: "Vernasca leather upholstery, premium soft-touch surfaces, and meticulous craftsmanship throughout the cabin.",
    },
    {
      icon: IconRadio,
      title: "Infotainment & Tech",
      desc: "12.3-inch digital instrument cluster and central touchscreen. Wireless connectivity and premium sound system.",
    },
    {
      icon: IconShield,
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
              <IconPalette className="h-4 w-4 text-gold shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
