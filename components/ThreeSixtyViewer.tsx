"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreeSixtyViewerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

/** Lazy-loads the 360 iframe only after the modal is open, so the page and modal open instantly. */
export default function ThreeSixtyViewer({
  isOpen,
  onClose,
  url,
  title,
}: ThreeSixtyViewerProps) {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setIframeSrc(null);
      setLoaded(false);
      loadedRef.current = false;
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    // Defer loading the heavy iframe until after the modal has opened (instant UX).
    const t = setTimeout(() => {
      setIframeSrc(url);
    }, 150);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [isOpen, url]);

  const openInNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-matte-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative flex w-full max-w-5xl flex-col rounded-2xl border border-gold/30 bg-charcoal shadow-glow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h3 className="font-display text-lg font-semibold text-white">
              360° View – {title}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openInNewTab}
                className="rounded-lg border border-gold/50 px-3 py-1.5 text-sm text-gold hover:bg-gold/10"
              >
                Open in new tab
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative aspect-video w-full bg-matte-black">
            {(!iframeSrc || !loaded) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
                <p className="text-sm">{iframeSrc ? "Loading 360° viewer…" : "Preparing viewer…"}</p>
                <button
                  type="button"
                  onClick={openInNewTab}
                  className="text-sm text-gold underline hover:no-underline"
                >
                  Open in new tab instead
                </button>
              </div>
            )}
            {iframeSrc && (
              <iframe
                title={`360 view ${title}`}
                src={iframeSrc}
                className="absolute inset-0 h-full w-full border-0"
                onLoad={() => {
                  setLoaded(true);
                  loadedRef.current = true;
                }}
                style={{ opacity: loaded ? 1 : 0 }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
