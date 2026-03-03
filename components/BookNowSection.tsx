"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cars } from "@/lib/cars";
import RevealOnScroll from "./RevealOnScroll";

const WHATSAPP_NUMBER = "971527074847";

function buildWhatsAppUrl(
  fullName: string,
  phone: string,
  carName: string,
  pickupDate: string,
  duration: string
): string {
  const text = [
    "Hello, I would like to book the following:",
    "",
    `Car: ${carName}`,
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Pickup Date: ${pickupDate}`,
    `Duration: ${duration}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function BookNowSection() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const carName = selectedCar || "Not selected";
    const payload = {
      fullName,
      phone,
      selectedCar: carName,
      pickupDate,
      duration,
    };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("autobreeze_booking", JSON.stringify(payload));
      } catch (_) {}
      const url = buildWhatsAppUrl(fullName, phone, carName, pickupDate, duration);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="border-t border-white/10 py-20 bg-[#0A0A0A]">
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
            Fill in your details and we&apos;ll confirm your booking via WhatsApp.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-charcoal/80 p-6 sm:p-8 shadow-xl backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="sm:col-span-2">
              <label htmlFor="book-name" className="block text-sm font-medium text-white/80 mb-1.5">
                Full Name
              </label>
              <input
                id="book-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
              />
            </div>
            <div>
              <label htmlFor="book-phone" className="block text-sm font-medium text-white/80 mb-1.5">
                Phone Number
              </label>
              <input
                id="book-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+971 ..."
                className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
              />
            </div>
            <div>
              <label htmlFor="book-date" className="block text-sm font-medium text-white/80 mb-1.5">
                Pickup Date
              </label>
              <input
                id="book-date"
                type="date"
                required
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="book-car" className="block text-sm font-medium text-white/80 mb-1.5">
                Selected Car
              </label>
              <select
                id="book-car"
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
            <div className="sm:col-span-2">
              <label htmlFor="book-duration" className="block text-sm font-medium text-white/80 mb-1.5">
                Duration
              </label>
              <select
                id="book-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-matte-black/50 px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
              >
                <option value="">Select duration</option>
                <option value="1 day">1 day</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <button
              type="submit"
              className="w-full rounded-lg bg-gold px-6 py-3.5 font-semibold text-matte-black hover:bg-gold/90 transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-matte-black"
            >
              Continue to WhatsApp
            </button>
          </div>
        </motion.form>
      </RevealOnScroll>
    </section>
  );
}
