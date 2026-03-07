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

const MINUTE_STEPS = [0, 15, 30, 45];

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

  const selectHour = (h: number) => {
    setHour(h);
    onChange(formatTime(h, minute, ampm));
  };

  const selectMinute = (m: number) => {
    setMinute(m);
    onChange(formatTime(hour, m, ampm));
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
        {/* Clock face */}
        <div className="relative" style={{ width: clockSize, height: clockSize }}>
          <svg
            width={clockSize}
            height={clockSize}
            viewBox={`0 0 ${clockSize} ${clockSize}`}
            className="rounded-full border-2 border-white/20"
            aria-hidden
          >
            <circle cx={cx} cy={cy} r={radius} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
              const angle = (h - 1) * 30;
              const rad = (angle * Math.PI) / 180;
              const x = cx + radius * Math.sin(rad);
              const y = cy - radius * Math.cos(rad);
              const isSelected = hour === h;
              return (
                <g key={h}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 14 : 10}
                    fill={isSelected ? "rgb(212,175,55)" : "transparent"}
                    className="cursor-pointer"
                    onClick={() => selectHour(h)}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    className="select-none text-sm fill-current cursor-pointer"
                    fill={isSelected ? "#1a1a1a" : "rgba(255,255,255,0.9)"}
                    onClick={() => selectHour(h)}
                  >
                    {h}
                  </text>
                </g>
              );
            })}
            {/* Hour hand */}
            <line
              x1={cx}
              y1={cy}
              x2={cx + (radius * 0.5) * Math.sin((hourToAngle(hour) * Math.PI) / 180)}
              y2={cy - (radius * 0.5) * Math.cos((hourToAngle(hour) * Math.PI) / 180)}
              stroke="rgba(212,175,55,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Minute hand */}
            <line
              x1={cx}
              y1={cy}
              x2={cx + (radius * 0.75) * Math.sin((minute * 6 * Math.PI) / 180)}
              y2={cy - (radius * 0.75) * Math.cos((minute * 6 * Math.PI) / 180)}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Minutes */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {MINUTE_STEPS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => selectMinute(m)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium min-w-[44px] transition ${
                minute === m ? "bg-gold text-matte-black" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              :{m.toString().padStart(2, "0")}
            </button>
          ))}
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
