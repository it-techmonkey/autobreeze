"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cars } from "@/lib/cars";

const WHATSAPP_NUMBER = "971527074847";

type RentalPlan = "Daily" | "Weekly" | "Monthly";

function buildWhatsAppUrl(
  fullName: string,
  phone: string,
  carName: string,
  pickupDate: string,
  duration: string,
  plan: RentalPlan
): string {
  const message = [
    "New Booking Request: " + carName + " | Plan: " + plan + " | Customer: " + fullName + " | Phone: " + phone,
    "",
    "Pickup Date: " + pickupDate,
    "Duration: " + duration,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-fill car name when opening from a car detail page */
  initialCar?: string;
  /** Pre-fill rental plan when opening from a car detail page */
  initialPlan?: RentalPlan;
}

export default function BookNowModal({ isOpen, onClose, initialCar = "", initialPlan = "Daily" }: BookNowModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCar, setSelectedCar] = useState(initialCar);
  const [pickupDate, setPickupDate] = useState("");
  const [duration, setDuration] = useState("");
  const [plan, setPlan] = useState<RentalPlan>(initialPlan);

  useEffect(() => {
    if (isOpen && initialCar) setSelectedCar(initialCar);
    if (isOpen && initialPlan) setPlan(initialPlan);
  }, [isOpen, initialCar, initialPlan]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const carName = selectedCar || "a vehicle";
    const durationText = duration || "To be confirmed";
    const url = buildWhatsAppUrl(fullName, phone, carName, pickupDate, durationText, plan);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "autobreeze_booking",
          JSON.stringify({ fullName, phone, selectedCar: carName, pickupDate, duration, plan })
        );
      } catch (_) {}
      window.open(url, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-now-title"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-charcoal p-6 shadow-2xl shadow-black/50 sm:p-8 mx-4"
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-white/80 mb-2">Rental duration</span>
                <div className="flex rounded-lg border border-white/20 bg-matte-black/50 p-1">
                  {(["Daily", "Weekly", "Monthly"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlan(p)}
                      className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                        plan === p ? "bg-gold text-matte-black" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-date-from" className="block text-sm font-medium text-white/80 mb-1.5">
                    From
                  </label>
                  <input
                    id="modal-date-from"
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                  />
                </div>
                <div>
                  <label htmlFor="modal-duration" className="block text-sm font-medium text-white/80 mb-1.5">
                    Duration
                  </label>
                  <select
                    id="modal-duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                  >
                    <option value="">Select</option>
                    <option value="1 day">1 day</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-white/80 mb-1.5">
                  Full Name
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-white/80 mb-1.5">
                  Phone Number
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 ..."
                  className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                />
              </div>
              <div>
                <label htmlFor="modal-car" className="block text-sm font-medium text-white/80 mb-1.5">
                  Select Car
                </label>
                <select
                  id="modal-car"
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                >
                  <option value="">Choose a car</option>
                  {cars.map((car) => (
                    <option key={car.car_id} value={car.title}>
                      {car.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-white/20 px-4 py-3 text-white/90 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gold px-4 py-3 font-semibold text-matte-black hover:bg-gold/90 transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
