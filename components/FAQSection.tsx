"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/lib/faq";
import RevealOnScroll from "./RevealOnScroll";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-[#0A0A0A]">
      <RevealOnScroll className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">Support</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            FAQ&apos;s
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-gold rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px 0px" }}
          className="mx-auto max-w-3xl"
        >
          <div className="space-y-2">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="rounded-xl border border-white/10 bg-charcoal/40 overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 py-4 px-5 sm:py-5 sm:px-6 text-left min-h-[44px] sm:min-h-[52px]"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span
                      className={`font-display font-semibold text-base sm:text-lg transition-colors ${
                        isOpen ? "text-gold" : "text-white hover:text-gold"
                      }`}
                    >
                      {item.qua}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full border border-current flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? "text-gold rotate-180" : "text-white/70"
                      }`}
                      aria-hidden
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 sm:px-6 sm:pb-5 pt-0">
                          <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                            {item.ans}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </RevealOnScroll>
    </section>
  );
}
