"use client";

import { useState, useEffect, useRef } from "react";

const DUBAI_CENTER: [number, number] = [25.2048, 55.2708];
const LEAFLET_SCRIPT = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&zoom=18&addressdetails=1";
const NOMINATIM_SEARCH_URL =
  "https://nominatim.openstreetmap.org/search?format=json&q={query}&addressdetails=1&limit=5";

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const url = NOMINATIM_URL.replace("{lat}", String(lat)).replace("{lon}", String(lon));
  const res = await fetch(url, {
    headers: { "Accept-Language": "en-US, en; q=0.9", "Accept": "application/json" },
  });
  if (!res.ok) return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
  const data = (await res.json()) as { address?: Record<string, string>; display_name?: string };
  const a = data.address || {};
  const parts = [
    a.road,
    a.suburb || a.neighbourhood || a.quarter,
    a.city_district || a.city || a.town || a.village,
    a.state,
    a.country,
  ].filter(Boolean);
  const built = parts.length ? parts.join(", ") : (data.display_name as string) || "";
  return built || `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
}

async function searchAddress(query: string): Promise<SearchResult[]> {
  const url = NOMINATIM_SEARCH_URL.replace("{query}", encodeURIComponent(query));
  const res = await fetch(url, {
    headers: { "Accept-Language": "en-US, en; q=0.9", Accept: "application/json" },
  });
  if (!res.ok) return [];
  return (await res.json()) as SearchResult[];
}

interface LocationMapPickerProps {
  onSelect: (address: string) => void;
  onClose: () => void;
}

export default function LocationMapPicker({ onSelect, onClose }: LocationMapPickerProps) {
  const [address, setAddress] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ remove: () => void; setView: (c: [number, number], z: number) => void } | null>(null);
  const markerRef = useRef<{ setLatLng: (latlng: [number, number]) => void } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Script load failed"));
        document.head.appendChild(s);
      });

    const loadCss = (href: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) {
          resolve();
          return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error("CSS load failed"));
        document.head.appendChild(link);
      });

    let cancelled = false;
    Promise.all([loadCss(LEAFLET_CSS), loadScript(LEAFLET_SCRIPT)])
      .then(() => {
        if (cancelled || !containerRef.current) return;
        const L = (window as Window & { L: unknown }).L as {
          map: (el: HTMLElement) => {
            setView: (c: number[], z: number) => unknown;
            remove: () => void;
            on: (event: string, fn: (e: { latlng: { lat: number; lng: number } }) => void) => void;
          };
          tileLayer: (url: string, opt: { attribution: string }) => { addTo: (m: unknown) => unknown };
          marker: (c: number[], opts?: { icon?: unknown }) => { addTo: (m: unknown) => unknown; setLatLng: (latlng: [number, number]) => void };
          Icon: { Default: { mergeOptions: (opts: { imagePath?: string }) => void } };
        };
        L.Icon.Default.mergeOptions({
          imagePath: "https://unpkg.com/leaflet@1.9.4/dist/images/",
        });
        const map = L.map(containerRef.current).setView(DUBAI_CENTER, 12) as {
          remove: () => void;
          on: (event: string, fn: (e: { latlng: { lat: number; lng: number } }) => void) => void;
          setView: (c: [number, number], z: number) => void;
        };
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
          attribution: "",
        }).addTo(map);
        const marker = L.marker(DUBAI_CENTER).addTo(map) as { setLatLng: (latlng: [number, number]) => void };
        markerRef.current = marker;
        mapRef.current = map;
        map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          setFetchingAddress(true);
          reverseGeocode(lat, lng)
            .then((addr) => setAddress(addr))
            .catch(() => setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`))
            .finally(() => setFetchingAddress(false));
        });
        setMapReady(true);
      })
      .catch(() => setMapReady(false));

    return () => {
      cancelled = true;
      markerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const q = address.trim();
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
  }, [address]);

  const handleUseAddress = () => {
    if (address.trim()) {
      onSelect(address.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-charcoal">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <p className="text-sm text-white/80">Click on the map to pick a location, or enter address below</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20"
        >
          Close
        </button>
      </div>
      <div className="flex-1 flex flex-col min-h-0 p-4 gap-4">
        <div className="shrink-0 flex gap-2">
          <div className="relative z-[1000] flex-1">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 906 Park Lane, Park Regis Business Bay, Dubai"
              className="w-full rounded-xl border border-white/20 bg-matte-black/50 px-4 py-3 text-white placeholder-white/40 min-h-[48px]"
            />
            {(searching || suggestions.length > 0) && (
              <div className="absolute z-[1001] mt-1 max-h-56 w-full overflow-auto rounded-xl border border-white/20 bg-charcoal/95 shadow-xl">
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
                        setAddress(s.display_name);
                        setSuggestions([]);
                        const lat = Number(s.lat);
                        const lon = Number(s.lon);
                        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
                          markerRef.current?.setLatLng([lat, lon]);
                          mapRef.current?.setView([lat, lon], 15);
                        }
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
            onClick={handleUseAddress}
            className="rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-matte-black shrink-0"
          >
            Use this address
          </button>
        </div>
        <div className="relative z-0 flex-1 min-h-[280px] rounded-xl overflow-hidden border border-white/10 bg-matte-black/30">
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />
          {!mapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/80">
              <p className="text-white/80">Loading Dubai map…</p>
            </div>
          )}
          {fetchingAddress && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg bg-matte-black/95 px-4 py-2 text-sm text-white shadow-lg">
              Getting address…
            </div>
          )}
        </div>
        <p className="text-xs text-white/50">
          Click on the map to select a location — the address will fill automatically. You can also type or edit the address above, then click &quot;Use this address&quot;.
        </p>
      </div>
    </div>
  );
}
