"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";

const LOGO_SRC = "/img/logo.png";

const REASONS = [
  {
    title: "No Hidden Fees, Transparent Pricing",
    description:
      "Our pricing model is fully transparent—no surprise charges at checkout. What you see is what you pay, with clear upfront details on taxes, insurance, and fuel options.",
    icon: "currency",
  },
  {
    title: "Door to Door Delivery",
    description:
      "Enjoy the convenience of 24/7 contactless vehicle pick-up and drop-off at multiple locations, making your car rental experience faster, safer, and more efficient.",
    icon: "car",
  },
  {
    title: "Luxury & Eco Friendly Vehicle Options",
    description:
      "Choose from a wide range of vehicles, from luxury cars to eco-friendly hybrids and electric vehicles, providing both comfort and sustainability for every type of traveler.",
    icon: "leaf",
  },
  {
    title: "24/7 Roadside Assistance & Customer Support",
    description:
      "We prioritize your peace of mind with around-the-clock roadside assistance and dedicated customer support, ensuring you're never alone during your journey.",
    icon: "support",
  },
];

function Icon({ name }: { name: string }) {
  const cls = "h-8 w-8 shrink-0";
  if (name === "currency")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (name === "car")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-1.607-1.464-2.668-3.128-1.93C10.226 5.554 9 7.473 9 9.6v9.4m6-12.75v.75m0 3.75v.75m0 3.75v.75m0 3.75V18" />
      </svg>
    );
  if (name === "leaf")
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    );
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function WhyUsSection() {
  return (
    <section id="whyus" className="py-20 bg-[#0A0A0A]">
      <RevealOnScroll className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="relative h-8 w-24">
              <Image src={LOGO_SRC} alt="" fill className="object-contain object-center" sizes="96px" unoptimized />
            </span>
          </div>
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">The difference</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Why Us?</h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-gold rounded-full" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px 0px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {REASONS.map((reason) => (
            <motion.article
              key={reason.title}
              variants={item}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group rounded-2xl border border-white/10 bg-charcoal/50 backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 hover:border-gold/30 hover:shadow-glow/50"
            >
              <div className="flex items-start gap-4">
                <span className="rounded-xl border border-gold/30 bg-gold/10 p-2.5 text-gold transition-colors group-hover:bg-gold/20">
                  <Icon name={reason.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{reason.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </RevealOnScroll>
    </section>
  );
}
