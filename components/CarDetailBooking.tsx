"use client";

import { useState } from "react";
import { useBookModal } from "@/contexts/BookModalContext";
import type { Car } from "@/lib/cars";

type PlanKey = "Daily" | "Weekly" | "Monthly";

const PLAN_KEYS: PlanKey[] = ["Daily", "Weekly", "Monthly"];

export default function CarDetailBooking({ car }: { car: Car }) {
  const [plan, setPlan] = useState<PlanKey>("Daily");
  const { openBookModal } = useBookModal();

  const priceMap = {
    Daily: car.daily_price,
    Weekly: car.weekly_price,
    Monthly: car.monthly_price,
  };

  return (
    <div className="flex flex-wrap gap-4 rounded-xl border border-white/10 bg-charcoal/50 p-6">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        {PLAN_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setPlan(key)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              plan === key
                ? "bg-gold text-matte-black shadow-glow"
                : "border border-white/20 text-white/80 hover:border-gold/40 hover:text-gold"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <p className="font-display text-2xl font-semibold text-white">{priceMap[plan]}</p>
        <button
          type="button"
          onClick={() => openBookModal(car.title, plan)}
          className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-semibold text-matte-black hover:shadow-glow transition-all"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
