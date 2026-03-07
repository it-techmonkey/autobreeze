"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { cars } from "@/lib/cars";
import DatePickerInput from "./DatePickerInput";
import AddressWithMapPicker from "./AddressWithMapPicker";
import TimeInput from "./TimeInput";

const iconClass = "h-4 w-4 text-gold/80 shrink-0";
function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
    </svg>
  );
}
function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}
function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconUser({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconCar({ className }: { className?: string }) {
  return (
    <svg className={className ?? iconClass} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9C2.6 9.2 2 10.5 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
    </svg>
  );
}

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
            <IconCalendar />
            From
          </label>
          <DatePickerInput
            id={`${idPrefix}-from`}
            value={fromDate}
            onChange={setFromDate}
            required
            className={inputClass}
            min={(() => { const d = new Date(); d.setHours(0,0,0,0); return d.toISOString().slice(0, 10); })()}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-to`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
            <IconCalendar />
            To
          </label>
          <DatePickerInput
            id={`${idPrefix}-to`}
            value={toDate}
            onChange={setToDate}
            required
            className={inputClass}
            min={fromDate || undefined}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idPrefix}-pickup-time`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
            <IconClock />
            Pickup Time
          </label>
          <TimeInput
            id={`${idPrefix}-pickup-time`}
            value={pickupTime}
            onChange={setPickupTime}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-dropoff-time`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
            <IconClock />
            Drop-off Time
          </label>
          <TimeInput
            id={`${idPrefix}-dropoff-time`}
            value={dropoffTime}
            onChange={setDropoffTime}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-address`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
          <IconMapPin />
          Address
        </label>
        <AddressWithMapPicker
          id={`${idPrefix}-address`}
          value={address}
          onChange={setAddress}
          className={inputClass}
          placeholder="Delivery or collection location"
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-name`} className="flex items-center gap-2 text-sm font-medium text-white/80 mb-1.5">
          <IconUser />
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
          <IconPhone />
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
          <IconCar />
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
