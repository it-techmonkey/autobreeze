"use client";

import { useMemo, useCallback } from "react";

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

const baseInputClass =
  "rounded-lg border border-white/20 bg-matte-black/50 text-white text-center focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition placeholder:text-white/40";

interface TimeInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function TimeInput({ id, value, onChange, className = "" }: TimeInputProps) {
  const { hour, minute, ampm } = useMemo(() => parseTime(value || "12:00 AM"), [value]);

  const setHour = useCallback(
    (h: number) => {
      const n = Math.min(12, Math.max(1, h));
      onChange(formatTime(n, minute, ampm));
    },
    [minute, ampm, onChange]
  );

  const setMinute = useCallback(
    (m: number) => {
      const n = Math.min(59, Math.max(0, m));
      onChange(formatTime(hour, n, ampm));
    },
    [hour, ampm, onChange]
  );

  const setAmPm = useCallback(
    (a: "AM" | "PM") => {
      onChange(formatTime(hour, minute, a));
    },
    [hour, minute, onChange]
  );

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") return;
    const n = parseInt(v, 10);
    if (!isNaN(n)) setHour(n);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") return;
    const n = parseInt(v, 10);
    if (!isNaN(n)) setMinute(n);
  };

  const handleHourBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = e.target.value.trim();
    if (v === "") {
      setHour(12);
      return;
    }
    const n = parseInt(v, 10);
    if (isNaN(n)) setHour(12);
    else setHour(n);
  };

  const handleMinuteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = e.target.value.trim();
    if (v === "") {
      setMinute(0);
      return;
    }
    const n = parseInt(v, 10);
    if (isNaN(n)) setMinute(0);
    else setMinute(n);
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border border-white/20 bg-matte-black/50 px-3 py-2 min-h-[48px] sm:min-h-[44px] min-w-0 ${className}`}
      role="group"
      aria-labelledby={`${id}-label`}
    >
      <span id={`${id}-label`} className="sr-only">
        Time
      </span>

      {/* Hour */}
      <input
        id={id}
        type="number"
        min={1}
        max={12}
        value={hour}
        onChange={handleHourChange}
        onBlur={handleHourBlur}
        className={`${baseInputClass} w-12 min-w-[3rem] py-2.5 text-base tabular-nums`}
        aria-label="Hour (1-12)"
        inputMode="numeric"
      />

      <span className="text-white/60 text-lg font-medium select-none" aria-hidden="true">
        :
      </span>

      {/* Minute */}
      <input
        id={`${id}-minute`}
        type="number"
        min={0}
        max={59}
        value={minute}
        onChange={handleMinuteChange}
        onBlur={handleMinuteBlur}
        className={`${baseInputClass} w-12 min-w-[3rem] py-2.5 text-base tabular-nums`}
        aria-label="Minute (0-59)"
        inputMode="numeric"
      />

      {/* AM/PM dropdown */}
      <select
        id={`${id}-ampm`}
        value={ampm}
        onChange={(e) => setAmPm(e.target.value as "AM" | "PM")}
        className={`${baseInputClass} w-[4.5rem] min-w-0 py-2.5 pl-2 pr-7 text-sm font-medium cursor-pointer appearance-none bg-no-repeat bg-[length:1rem] bg-[right_0.35rem_center] shrink-0`}
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.7)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
        aria-label="AM or PM"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
