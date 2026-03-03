"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const S3_CAR_BASE = "https://car-image-bucket-2024.s3.ap-south-1.amazonaws.com/car";

interface ProductCarouselProps {
  imageUrls: string[];
  spin360Url: string | null;
  carTitle: string;
  fallbackImg?: string;
}

export default function ProductCarousel({
  imageUrls,
  spin360Url,
  carTitle,
  fallbackImg,
}: ProductCarouselProps) {
  const has360 = Boolean(spin360Url);
  const totalSlides = has360 ? 1 + imageUrls.length : imageUrls.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [load360Iframe, setLoad360Iframe] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const dragStartX = useRef(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (zoomOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [zoomOpen]);

  // Lazy-load 360 iframe only after user has been on the 360 slide for 300ms (instant page load).
  useEffect(() => {
    if (!has360 || currentIndex !== 0) {
      setLoad360Iframe(false);
      setIframeLoaded(false);
      return;
    }
    const t = setTimeout(() => setLoad360Iframe(true), 300);
    return () => clearTimeout(t);
  }, [has360, currentIndex]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides]
  );

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const handleDragStart = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const handleDragEnd = (e: React.PointerEvent) => {
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
  };

  const is360Active = has360 && currentIndex === 0;
  const currentImageUrl = imageUrls[has360 ? currentIndex - 1 : currentIndex] || fallbackImg;
  const canZoom = !is360Active && currentImageUrl;
  const thumbnails = has360
    ? [{ type: "360" as const, label: "360°" }, ...imageUrls.map((url, i) => ({ type: "image" as const, url, index: i }))]
    : imageUrls.map((url, i) => ({ type: "image" as const, url, index: i }));

  return (
    <div className="flex flex-col gap-4">
      {/* Main viewer */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] touch-pan-y"
        onPointerDown={handleDragStart}
        onPointerUp={handleDragEnd}
        onPointerLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {is360Active && spin360Url ? (
            <motion.div
              key="360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col"
            >
              {(!load360Iframe || !iframeLoaded) && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white/70">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
                  <p className="text-sm">{load360Iframe ? "Loading 360° viewer…" : "Preparing…"}</p>
                </div>
              )}
              {load360Iframe && (
                <iframe
                  title={`360° view – ${carTitle}`}
                  src={spin360Url}
                  className="absolute inset-0 h-full w-full border-0"
                  onLoad={() => setIframeLoaded(true)}
                  style={{ opacity: iframeLoaded ? 1 : 0 }}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <button
                type="button"
                onClick={() => canZoom && setZoomOpen(true)}
                className={`absolute inset-0 flex items-center justify-center ${canZoom ? "cursor-zoom-in" : ""}`}
                aria-label={canZoom ? "Zoom image" : undefined}
              >
                <Image
                  src={
                    currentImageUrl ||
                    `${S3_CAR_BASE}/placeholder`
                  }
                  alt={`${carTitle} – view ${currentIndex + 1}`}
                  fill
                  className="object-cover object-center scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={(currentImageUrl || "").startsWith("/static_images")}
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (fallbackImg && t.src !== fallbackImg) t.src = fallbackImg;
                  }}
                />
              </button>
              {canZoom && (
                <span className="absolute bottom-3 right-3 rounded-full border border-white/30 bg-matte-black/70 px-2.5 py-1 text-xs text-white/90 backdrop-blur-sm">
                  Click to zoom
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-matte-black/80 p-2.5 text-white shadow-lg backdrop-blur-sm transition hover:border-gold/50 hover:bg-gold/20"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-matte-black/80 p-2.5 text-white shadow-lg backdrop-blur-sm transition hover:border-gold/50 hover:bg-gold/20"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Zoom lightbox */}
      <AnimatePresence>
        {zoomOpen && currentImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setZoomOpen(false)}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Close zoom"
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative aspect-[16/10] w-full max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImageUrl}
                alt={`${carTitle} – zoomed`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                unoptimized={currentImageUrl.startsWith("/static_images")}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnails */}
      {thumbnails.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {thumbnails.map((item, i) => (
            <button
              key={item.type === "360" ? "360" : item.url}
              type="button"
              onClick={() => goTo(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                currentIndex === i
                  ? "border-gold ring-2 ring-gold/30"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              {item.type === "360" ? (
                <span className="flex h-full w-full items-center justify-center bg-charcoal text-xs font-semibold text-gold">
                  360°
                </span>
              ) : (
                <span className="relative block h-full w-full min-h-[3rem]">
                  <Image
                    src={item.url}
                    alt=""
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="80px"
                    unoptimized={item.url.startsWith("/static_images")}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
