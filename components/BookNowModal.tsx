"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm, { type RentalPlan } from "./BookingForm";

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCar?: string;
  initialPlan?: RentalPlan;
}

export default function BookNowModal({ isOpen, onClose, initialCar = "", initialPlan = "Daily" }: BookNowModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-lg"
            onClick={onClose}
            aria-hidden
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="book-now-title"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-charcoal/95 bg-opacity-95 p-5 sm:p-6 shadow-2xl shadow-black/50 backdrop-blur-xl pointer-events-auto max-h-[90dvh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="book-now-title" className="font-display text-2xl font-bold text-white">
                  Book Now
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-white/60 mb-6">
                Fill in your details and we&apos;ll confirm your booking via WhatsApp.
              </p>
              <BookingForm
                idPrefix="modal"
                initialCar={initialCar}
                initialPlan={initialPlan}
                onCancel={onClose}
                onSubmitSuccess={onClose}
                showCancelButton
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
