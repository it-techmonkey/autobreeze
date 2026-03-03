"use client";

import Image from "next/image";

/** UAE Dirham symbol from public/img/dirham.png. Sizes are scaled to fit next to text. */
export default function DirhamSymbol({
  className = "",
  size = 20,
}: { className?: string; size?: number }) {
  return (
    <Image
      src="/img/dirham.png"
      alt=""
      width={size}
      height={size}
      className={`inline-block align-middle shrink-0 object-contain brightness-0 invert ${className}`}
      aria-hidden
    />
  );
}
