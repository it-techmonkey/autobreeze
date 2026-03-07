"use client";

import { useState, useRef, useEffect, useMemo, useId } from "react";
import { createPortal } from "react-dom";

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

// Clock face: 12 at top, angles clockwise in degrees. Hour 1 = 30°, etc.
function hourToAngle(hour: number) {
  return ((hour % 12) - 1) * 30;
}

// Map pixel click to viewBox coords; return region (inner = hour, outer = minute) and angle 0-360 from 12 o'clock.
function getClickRegion(
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  cx: number,
  cy: number,
  radius: number
): { region: "hour" | "minute"; angle: number } {
  const relX = (offsetX / width) * (cx * 2) - cx;
  const relY = (offsetY / height) * (cy * 2) - cy;
  let angle = (Math.atan2(relX, -relY) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  const distance = Math.sqrt(relX * relX + relY * relY);
  const region = distance < radius * 0.5 ? "hour" : "minute";
  return { region, angle };
}

function angleToHour(angle: number): number {
  const h = Math.round(angle / 30) % 12;
  return h === 0 ? 12 : h;
}

function angleToMinute(angle: number): number {
  return Math.round(angle / 6) % 60;
}

interface TimeInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function TimeInput({ id, value, onChange, className = "" }: TimeInputProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  const parsed = useMemo(() => parseTime(value || "12:00 AM"), [value]);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [ampm, setAmPm] = useState<"AM" | "PM">(parsed.ampm);

  useEffect(() => {
    const p = parseTime(value || "12:00 AM");
    setHour(p.hour);
    setMinute(p.minute);
    setAmPm(p.ampm);
  }, [value]);

  const [popoverStyle, setPopoverStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const w = typeof window !== "undefined" ? window.innerWidth : 320;
      setPopoverStyle({
        top: rect.bottom + 8,
        left: Math.max(8, Math.min(rect.left, w - 220)),
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const clockContainerRef = useRef<HTMLDivElement>(null);

  const handleClockClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = clockContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const { region, angle } = getClickRegion(offsetX, offsetY, rect.width, rect.height, cx, cy, radius);
    if (region === "hour") {
      const h = angleToHour(angle);
      setHour(h);
      onChange(formatTime(h, minute, ampm));
    } else {
      const m = angleToMinute(angle);
      setMinute(m);
      onChange(formatTime(hour, m, ampm));
    }
  };

  const selectAmPm = (a: "AM" | "PM") => {
    setAmPm(a);
    onChange(formatTime(hour, minute, a));
  };

  const displayValue = value || "12:00 AM";

  const clockSize = 160;
  const cx = clockSize / 2;
  const cy = clockSize / 2;
  const radius = 52;

  const popoverContent = open && typeof document !== "undefined" && (
    <div
      ref={popoverRef}
      id={`${id}-popover-${uniqueId}`}
      role="dialog"
      aria-label="Choose time"
      className="fixed z-[200] rounded-xl border border-white/20 bg-charcoal shadow-2xl p-4 w-[200px]"
      style={{ top: popoverStyle.top, left: popoverStyle.left }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Clock face: click inner for hour, outer for minute */}
        <div
          ref={clockContainerRef}
          role="button"
          tabIndex={0}
          onClick={handleClockClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") e.currentTarget.click();
          }}
          className="relative cursor-pointer rounded-full border-2 border-white/20 select-none"
          style={{ width: clockSize, height: clockSize }}
          aria-label="Select time using clock"
        >
          <svg
            width={clockSize}
            height={clockSize}
            viewBox={`0 0 ${clockSize} ${clockSize}`}
            className="rounded-full pointer-events-none"
            aria-hidden
          >
            <circle cx={cx} cy={cy} r={radius} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Minute ticks (60) */}
            {Array.from({ length: 60 }, (_, i) => {
              const a = (i * 6 * Math.PI) / 180;
              const r = i % 5 === 0 ? radius - 4 : radius - 2;
              const x1 = cx + radius * Math.sin(a);
              const y1 = cy - radius * Math.cos(a);
              const x2 = cx + r * Math.sin(a);
              const y2 = cy - r * Math.cos(a);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.25)" strokeWidth={i % 5 === 0 ? 1.5 : 1} />
              );
            })}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
              const angle = (h - 1) * 30;
              const rad = (angle * Math.PI) / 180;
              const x = cx + (radius * 0.65) * Math.sin(rad);
              const y = cy - (radius * 0.65) * Math.cos(rad);
              const isSelected = hour === h;
              return (
                <g key={h}>
                  <circle cx={x} cy={y} r={isSelected ? 12 : 8} fill={isSelected ? "rgb(212,175,55)" : "rgba(255,255,255,0.15)"} />
                  <text x={x} y={y + 4} textAnchor="middle" className="text-sm" fill={isSelected ? "#1a1a1a" : "rgba(255,255,255,0.9)"}>
                    {h}
                  </text>
                </g>
              );
            })}
            <line
              x1={cx}
              y1={cy}
              x2={cx + (radius * 0.45) * Math.sin((hourToAngle(hour) * Math.PI) / 180)}
              y2={cy - (radius * 0.45) * Math.cos((hourToAngle(hour) * Math.PI) / 180)}
              stroke="rgba(212,175,55,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx + (radius * 0.72) * Math.sin((minute * 6 * Math.PI) / 180)}
              y2={cy - (radius * 0.72) * Math.cos((minute * 6 * Math.PI) / 180)}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* AM/PM */}
        <div className="flex rounded-lg border border-white/20 overflow-hidden shrink-0">
          <button
            type="button"
            onClick={() => selectAmPm("AM")}
            className={`px-4 py-2 text-sm font-medium transition ${
              ampm === "AM" ? "bg-gold text-matte-black" : "text-white/70 hover:text-white bg-white/5"
            }`}
            aria-pressed={ampm === "AM"}
          >
            AM
          </button>
          <button
            type="button"
            onClick={() => selectAmPm("PM")}
            className={`px-4 py-2 text-sm font-medium transition ${
              ampm === "PM" ? "bg-gold text-matte-black" : "text-white/70 hover:text-white bg-white/5"
            }`}
            aria-pressed={ampm === "PM"}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-2 w-full rounded-xl border border-white/20 bg-matte-black/50 px-3 py-2.5 min-h-[48px] sm:min-h-[44px] text-left text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition ${className}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? `${id}-popover-${uniqueId}` : undefined}
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gold/80 shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {displayValue}
        </span>
        <svg className="h-4 w-4 text-white/50 shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {typeof document !== "undefined" && createPortal(popoverContent, document.body)}
    </>
  );
}
