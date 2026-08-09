"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Car } from "@/lib/cars";
import { getCarImageUrl, getCarImageFallbackUrl } from "@/lib/carImageUtils";
import Price from "./Price";
import { getSpin360Url } from "@/lib/spin360";
import { useState } from "react";
import ThreeSixtyViewer from "./ThreeSixtyViewer";

interface CarCardProps {
  car: Car;
  index: number;
}

export default function CarCard({ car, index }: CarCardProps) {
  const [imgSrc, setImgSrc] = useState(() => getCarImageUrl(car));
  const [show360, setShow360] = useState(false);
  const spin360Url = getSpin360Url(car);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <>
      <motion.article
        ref={ref}
        layout
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-luxury-border bg-luxury-card transition-all duration-300 hover:border-luxury-border-hover hover:shadow-[0_0_40px_rgba(212,175,55,0.22)] hover:-translate-y-1"
      >
        <Link href={`/car/${car.car_id}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-charcoal">
          <Image
            src={imgSrc || getCarImageFallbackUrl(car)}
            alt={car.title}
            fill
            loading={index < 4 ? "eager" : "lazy"}
            className="car-card-image transition-transform duration-500 group-hover:scale-[1.15]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgSrc(getCarImageFallbackUrl(car))}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-xl font-semibold text-white">
            {car.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">
            From <Price value={car.daily_price} symbolSize={14} /> / day
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {spin360Url && (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShow360(true);
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border border-gold/50 px-4 py-2.5 text-sm font-medium text-gold hover:bg-gold/10 transition-colors min-h-[44px] touch-manipulation"
              >
                View 360°
              </motion.button>
            )}
            <Link
              href={`/car/${car.car_id}`}
              className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-matte-black hover:shadow-glow transition-all inline-flex min-h-[44px] touch-manipulation items-center"
            >
              <motion.span whileTap={{ scale: 0.95 }}>View Details</motion.span>
            </Link>
          </div>
        </div>
      </motion.article>

      {spin360Url && (
        <ThreeSixtyViewer
          isOpen={show360}
          onClose={() => setShow360(false)}
          url={spin360Url}
          title={car.title}
        />
      )}
    </>
  );
}
