"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, User, Phone, Car } from "lucide-react";
import { cars } from "@/lib/cars";

const WHATSAPP_NUMBER = "971527074847";

export type RentalPlan = "Daily" | "Weekly" | "Monthly";

function buildWhatsAppUrl(
  carName: string,
  fromDate: string,
  fromTime: string,
  toDate: string,
  toTime: string,
  address: string,
  fullName: string,
  phone: string,
  rentalPeriod: string
): string {
  const message = [
    "Booking Request: " + carName + " | From: " + fromDate + " " + fromTime + " | To: " + toDate + " " + toTime + " | Address: " + address,
    "",
    "*Rental Plan:* " + rentalPeriod,
    "",
    "Customer: " + fullName,
    "Phone: " + phone,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const TIME_OPTIONS: string[] = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const period = h < 12 ? "AM" : "PM";
    const hour = h % 12 || 12;
    const min = m.toString().padStart(2, "0");
    TIME_OPTIONS.push(`${hour}:${min} ${period}`);
  }
}

const inputClass =
  "w-full rounded-xl border border-white/20 bg-matte-black/50 px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition min-h-[48px] text-base sm:min-h-[44px]";

interface BookingFormProps {
  idPrefix?: string;
  initialCar?: string;
  initialPlan?: RentalPlan;
  onCancel?: () => void;
  onSubmitSuccess?: () => void;
  /** When true, show Cancel button (e.g. in modal). When false, single submit button (e.g. inline on page). */
  showCancelButton?: boolean;
}

export default function BookingForm({
  idPrefix = "book",
  initialCar = "",
  initialPlan = "Daily",
  onCancel,
  onSubmitSuccess,
  showCancelButton = false,
}: BookingFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCar, setSelectedCar] = useState(initialCar);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [address, setAddress] = useState("");
  const [plan, setPlan] = useState<RentalPlan>(initialPlan);

  useEffect(() => {
    if (initialCar) setSelectedCar(initialCar);
    if (initialPlan) setPlan(initialPlan);
  }, [initialCar, initialPlan]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const carName = selectedCar || "a vehicle";
    const fromTime = pickupTime || "—";
    const toTime = dropoffTime || "—";
    const url = buildWhatsAppUrl(carName, fromDate, fromTime, toDate, toTime, address || "—", fullName, phone, plan);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "autobreeze_booking",
          JSON.stringify({ fullName, phone, selectedCar: carName, fromDate, toDate, pickupTime, dropoffTime, address, plan })
        );
      } catch (_) {}
      window.open(url, "_blank", "noopener,noreferrer");
    }
    onSubmitSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="block text-sm font-medium text-white/80 mb-2">Rental period</span>
        <div className="flex rounded-xl border border-white/20 bg-matte-black/50 p-1">
          {(["Daily", "Weekly", "Monthly"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`flex-1 rounded-lg py-3 text-sm font-medium transition-all duration-300 ${
                plan === p ? "bg-gold text-matte-black shadow-glow" : "text-white/80 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idPrefix}-from`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
            <CalendarDays className="h-4 w-4 text-gold/80" aria-hidden />
            From
          </label>
          <input
            id={`${idPrefix}-from`}
            type="date"
            required
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-to`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
            <CalendarDays className="h-4 w-4 text-gold/80" aria-hidden />
            To
          </label>
          <input
            id={`${idPrefix}-to`}
            type="date"
            required
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idPrefix}-pickup-time`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
            <Clock className="h-4 w-4 text-gold/80" aria-hidden />
            Pickup Time
          </label>
          <select
            id={`${idPrefix}-pickup-time`}
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className={inputClass}
          >
            <option value="">Select time</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-dropoff-time`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
            <Clock className="h-4 w-4 text-gold/80" aria-hidden />
            Drop-off Time
          </label>
          <select
            id={`${idPrefix}-dropoff-time`}
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className={inputClass}
          >
            <option value="">Select time</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-address`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
          <MapPin className="h-4 w-4 text-gold/80" aria-hidden />
          Address
        </label>
        <input
          id={`${idPrefix}-address`}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Delivery or collection location"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-name`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
          <User className="h-4 w-4 text-gold/80" aria-hidden />
          Full Name
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
          <Phone className="h-4 w-4 text-gold/80" aria-hidden />
          Phone Number
        </label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+971 ..."
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-car`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
          <Car className="h-4 w-4 text-gold/80" aria-hidden />
          Select Car
        </label>
        <select
          id={`${idPrefix}-car`}
          value={selectedCar}
          onChange={(e) => setSelectedCar(e.target.value)}
          className={inputClass}
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
        {showCancelButton && onCancel && (
          <motion.button
            type="button"
            onClick={onCancel}
            whileTap={{ scale: 0.98 }}
            className="flex-1 rounded-xl border border-white/20 px-4 py-3.5 text-white/90 hover:bg-white/5 transition-colors min-h-[48px]"
          >
            Cancel
          </motion.button>
        )}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className={`rounded-xl bg-gold px-4 py-3.5 font-semibold text-matte-black hover:bg-gold/90 transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal min-h-[48px] ${showCancelButton && onCancel ? "flex-1" : "w-full"}`}
        >
          {showCancelButton ? "Confirm Booking" : "Continue to WhatsApp"}
        </motion.button>
      </div>
    </form>
  );
}
