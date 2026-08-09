"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const LocationMapPicker = dynamic(() => import("./LocationMapPicker"), { ssr: false });

const NOMINATIM_SEARCH_URL =
  "https://nominatim.openstreetmap.org/search?format=json&q={query}&addressdetails=1&limit=5";

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

async function searchAddress(query: string): Promise<SearchResult[]> {
  const url = NOMINATIM_SEARCH_URL.replace("{query}", encodeURIComponent(query));
  const res = await fetch(url, {
    headers: { "Accept-Language": "en-US, en; q=0.9", Accept: "application/json" },
  });
  if (!res.ok) return [];
  return (await res.json()) as SearchResult[];
}

/**
 * Warm the DNS/TLS connection to the CDN without downloading Leaflet itself.
 * This component renders inside the booking form on the home page, so eagerly
 * fetching leaflet.js here pulled ~150 KB from a third-party host on every
 * visit — and stalled the page whenever unpkg was slow — even though the map
 * only ever opens if someone clicks "Map". LocationMapPicker already loads the
 * script on demand, so preconnect is all that is needed up front.
 */
function preconnectLeafletCdn() {
  if (typeof document === "undefined") return;
  if (document.querySelector('link[data-leaflet-preconnect="1"]')) return;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = "https://unpkg.com";
  link.crossOrigin = "anonymous";
  link.dataset.leafletPreconnect = "1";
  document.head.appendChild(link);
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
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    preconnectLeafletCdn();
  }, []);

  useEffect(() => {
    const q = value.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setSearching(false);
      return;
    }
    const timer = setTimeout(() => {
      setSearching(true);
      searchAddress(q)
        .then((rows) => setSuggestions(rows))
        .catch(() => setSuggestions([]))
        .finally(() => setSearching(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = searching || suggestions.length > 0;

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <div className="flex gap-2 relative">
        <div className="relative flex-1 min-w-0">
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={className}
            autoComplete="off"
          />
          {showDropdown && (
            <div className="absolute z-[1000] mt-1 left-0 right-0 max-h-56 overflow-auto rounded-xl border border-white/20 bg-charcoal/95 shadow-xl">
              {searching && (
                <div className="px-4 py-2.5 text-sm text-white/70">Searching address...</div>
              )}
              {!searching &&
                suggestions.map((s) => (
                  <button
                    key={`${s.lat}-${s.lon}-${s.display_name}`}
                    type="button"
                    className="w-full border-b border-white/10 px-4 py-2.5 text-left text-sm text-white/85 hover:bg-white/10"
                    onClick={() => {
                      onChange(s.display_name);
                      setSuggestions([]);
                    }}
                  >
                    {s.display_name}
                  </button>
                ))}
            </div>
          )}
        </div>
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
