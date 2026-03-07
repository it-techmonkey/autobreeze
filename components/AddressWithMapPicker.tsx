"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const LocationMapPicker = dynamic(() => import("./LocationMapPicker"), { ssr: false });

const LEAFLET_SCRIPT = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

function preloadLeaflet() {
  if (typeof document === "undefined") return;
  if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = LEAFLET_CSS;
    document.head.appendChild(link);
  }
  if (!document.querySelector(`script[src="${LEAFLET_SCRIPT}"]`)) {
    const script = document.createElement("script");
    script.src = LEAFLET_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

interface AddressWithMapPickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function AddressWithMapPicker({
  id,
  value,
  onChange,
  className = "",
  placeholder = "Delivery or collection location",
}: AddressWithMapPickerProps) {
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    preloadLeaflet();
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
        />
        <button
          type="button"
          onClick={() => setMapOpen(true)}
          className="shrink-0 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm font-medium text-gold hover:bg-gold/20 transition flex items-center gap-2 min-h-[48px] sm:min-h-[44px]"
          title="Pick location on map"
        >
          <MapPinIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Map</span>
        </button>
      </div>
      {mapOpen && (
        <LocationMapPicker
          onSelect={(address) => {
            onChange(address);
            setMapOpen(false);
          }}
          onClose={() => setMapOpen(false)}
        />
      )}
    </div>
  );
}
