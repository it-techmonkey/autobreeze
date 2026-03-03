"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";
import BookingForm from "./BookingForm";

export default function BookNowSection() {
  return (
    <section className="border-t border-white/10 py-20 bg-[#0A0A0A]" id="book">
      <RevealOnScroll className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">
            Reserve
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Book Now
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Choose your dates, car, and we&apos;ll confirm your booking via WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-charcoal/60 p-6 sm:p-8 shadow-xl backdrop-blur-sm"
        >
          <BookingForm idPrefix="home" showCancelButton={false} />
        </motion.div>
      </RevealOnScroll>
    </section>
  );
}
