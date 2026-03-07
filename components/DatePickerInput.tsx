"use client";

import { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatForInput(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseInputValue(value: string): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(value + "T12:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: Date[] = [];
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function getWeekdayStart(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface DatePickerInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  min?: string;
  max?: string;
}

export default function DatePickerInput({
  id,
  value,
  onChange,
  required,
  className = "",
  min,
  max,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const parsed = parseInputValue(value);
    return parsed || new Date();
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();

  const minDate = min ? parseInputValue(min) : null;
  const maxDate = max ? parseInputValue(max) : null;
  const [popoverStyle, setPopoverStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    const parsed = parseInputValue(value);
    if (parsed) setViewDate(parsed);
  }, [value]);

  useEffect(() => {
    if (open && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const left = Math.max(8, Math.min(rect.left, (typeof window !== "undefined" ? window.innerWidth : 320) - 296));
      setPopoverStyle({ top: rect.bottom + 8, left });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current?.contains(target) ||
        inputRef.current?.contains(target)
      ) return;
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

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = getDaysInMonth(year, month);
  const startPad = getWeekdayStart(year, month);

  const isDisabled = (d: Date) => {
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const selectDay = (d: Date) => {
    if (isDisabled(d)) return;
    onChange(formatForInput(d));
    setOpen(false);
  };

  const popoverContent = open && typeof document !== "undefined" && (
    <div
      ref={popoverRef}
      id={`${id}-popover-${uniqueId}`}
      role="dialog"
      aria-label="Choose date"
      className="fixed z-[200] rounded-xl border border-white/20 bg-charcoal shadow-2xl p-4 min-w-[280px]"
      style={{
        top: popoverStyle.top,
        left: popoverStyle.left,
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="Previous month"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-white">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="Next month"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((wd) => (
          <span key={wd} className="text-xs text-white/50 py-1">{wd}</span>
        ))}
        {Array.from({ length: startPad }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {days.map((d) => {
          const disabled = isDisabled(d);
          const selected = value === formatForInput(d);
          return (
            <button
              key={d.getTime()}
              type="button"
              onClick={() => selectDay(d)}
              disabled={disabled}
              className={`rounded-lg py-2 text-sm transition ${
                disabled
                  ? "text-white/30 cursor-not-allowed"
                  : selected
                    ? "bg-gold text-matte-black font-semibold"
                    : "text-white hover:bg-white/10"
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        readOnly
        required={required}
        placeholder="YYYY-MM-DD"
        className={className}
        autoComplete="off"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? `${id}-popover-${uniqueId}` : undefined}
      />
      {typeof document !== "undefined" && createPortal(popoverContent, document.body)}
    </>
  );
}
