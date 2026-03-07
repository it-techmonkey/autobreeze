"use client";

import { useMemo } from "react";

const inputClass =
  "rounded-lg border border-white/20 bg-matte-black/50 px-2 py-2.5 text-white text-center focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition min-h-[44px] text-base w-14";

function parseTime(value: string): { hour: number; minute: number; ampm: "AM" | "PM" } {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match) {
    let hour = parseInt(match[1], 10);
    const minute = Math.min(59, Math.max(0, parseInt(match[2], 10)));
    const ampm = match[3].toUpperCase() as "AM" | "PM";
    if (hour < 1 || hour > 12) hour = 12;
    return { hour, minute, ampm };
  }
  return { hour: 12, minute: 0, ampm: "AM" };
}

function formatTime(hour: number, minute: number, ampm: "AM" | "PM"): string {
  const h = Math.min(12, Math.max(1, hour));
  const m = Math.min(59, Math.max(0, minute));
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

interface TimeInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function TimeInput({ id, value, onChange, className = "" }: TimeInputProps) {
  const { hour, minute, ampm } = useMemo(() => parseTime(value || "12:00 AM"), [value]);

  const setHour = (h: number) => {
    const n = Math.min(12, Math.max(1, h));
    onChange(formatTime(n, minute, ampm));
  };
  const setMinute = (m: number) => {
    const n = Math.min(59, Math.max(0, m));
    onChange(formatTime(hour, n, ampm));
  };
  const setAmPm = (a: "AM" | "PM") => onChange(formatTime(hour, minute, a));

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border border-white/20 bg-matte-black/50 px-3 py-2 min-h-[48px] sm:min-h-[44px] ${className}`}
      role="group"
      aria-label="Time"
    >
      <input
        id={id}
        type="number"
        min={1}
        max={12}
        value={hour}
        onChange={(e) => setHour(parseInt(e.target.value, 10) || 12)}
        className={inputClass}
        aria-label="Hour"
      />
      <span className="text-white/60 text-lg font-medium">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={minute}
        onChange={(e) => setMinute(parseInt(e.target.value, 10) || 0)}
        className={inputClass}
        aria-label="Minute"
      />
      <div className="flex rounded-lg border border-white/20 bg-matte-black/70 overflow-hidden shrink-0">
        <button
          type="button"
          onClick={() => setAmPm("AM")}
          className={`px-3 py-2.5 text-sm font-medium min-h-[44px] transition ${
            ampm === "AM" ? "bg-gold text-matte-black" : "text-white/70 hover:text-white"
          }`}
          aria-pressed={ampm === "AM"}
        >
          AM
        </button>
        <button
          type="button"
          onClick={() => setAmPm("PM")}
          className={`px-3 py-2.5 text-sm font-medium min-h-[44px] transition ${
            ampm === "PM" ? "bg-gold text-matte-black" : "text-white/70 hover:text-white"
          }`}
          aria-pressed={ampm === "PM"}
        >
          PM
        </button>
      </div>
    </div>
  );
}
