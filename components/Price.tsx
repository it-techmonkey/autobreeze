"use client";

import DirhamSymbol from "./DirhamSymbol";

/** Parses price string like "650 د.إ" or "650" and returns the numeric part. */
function parseAmount(price: string): string {
  const match = String(price).match(/^[\d,]+/);
  return match ? match[0] : price;
}

interface PriceProps {
  value: string;
  symbolSize?: number;
  className?: string;
}

/** Renders a price amount with the AED Dirham symbol. */
export default function Price({ value, symbolSize = 16, className = "" }: PriceProps) {
  const amount = parseAmount(value);
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      <span>{amount}</span>
      <DirhamSymbol size={symbolSize} className="text-current" />
    </span>
  );
}
