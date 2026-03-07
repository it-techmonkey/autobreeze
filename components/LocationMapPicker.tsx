"use client";

import { useState, useEffect, useRef } from "react";

const DUBAI_CENTER: [number, number] = [25.2048, 55.2708];
const LEAFLET_SCRIPT = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

interface LocationMapPickerProps {
  onSelect: (address: string) => void;
  onClose: () => void;
}

export default function LocationMapPicker({ onSelect, onClose }: LocationMapPickerProps) {
  const [address, setAddress] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ remove: () => void } | null>(null);

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
          map: (el: HTMLElement) => { setView: (c: number[], z: number) => unknown; remove: () => void };
          tileLayer: (url: string, opt: { attribution: string }) => { addTo: (m: unknown) => unknown };
          marker: (c: number[], opts?: { icon?: unknown }) => { addTo: (m: unknown) => unknown };
          Icon: { Default: { mergeOptions: (opts: { imagePath?: string }) => void } };
        };
        L.Icon.Default.mergeOptions({
          imagePath: "https://unpkg.com/leaflet@1.9.4/dist/images/",
        });
        const map = L.map(containerRef.current).setView(DUBAI_CENTER, 12) as { remove: () => void };
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
        }).addTo(map);
        L.marker(DUBAI_CENTER).addTo(map);
        mapRef.current = map;
        setMapReady(true);
      })
      .catch(() => setMapReady(false));

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const handleUseAddress = () => {
    if (address.trim()) {
      onSelect(address.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-charcoal">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <p className="text-sm text-white/80">Select your location in Dubai — enter address below or use the map</p>
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
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 906 Park Lane, Park Regis Business Bay, Dubai"
            className="flex-1 rounded-xl border border-white/20 bg-matte-black/50 px-4 py-3 text-white placeholder-white/40 min-h-[48px]"
          />
          <button
            type="button"
            onClick={handleUseAddress}
            className="rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-matte-black shrink-0"
          >
            Use this address
          </button>
        </div>
        <div className="flex-1 min-h-[280px] rounded-xl overflow-hidden border border-white/10 bg-matte-black/30 relative">
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />
          {!mapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/80">
              <p className="text-white/80">Loading Dubai map…</p>
            </div>
          )}
        </div>
        <p className="text-xs text-white/50">
          The map shows Dubai. Enter your delivery or collection address above and click &quot;Use this address&quot;.
        </p>
      </div>
    </div>
  );
}
