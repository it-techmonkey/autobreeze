import { NextResponse } from "next/server";
import { cars } from "@/lib/cars";
import { getSpin360Url } from "@/lib/spin360";

/**
 * GET /api/debug-360
 * Run in production to verify 360° resolution per car.
 * Returns which cars get a URL from getSpin360Url (no fetch to Impel).
 */
export async function GET() {
  const resolution = cars.map((car) => {
    const url = getSpin360Url(car);
    return {
      car_id: car.car_id,
      title: car.title,
      url: url ?? null,
      has360: !!url,
    };
  });
  const with360 = resolution.filter((r) => r.has360).length;
  return NextResponse.json({
    summary: `${with360}/${cars.length} cars have a 360° URL (in-app resolution)`,
    resolution,
    note: "If has360 is false for some cars here, the issue is in lib/spin360.ts or car data. If all true but 360° still missing in UI, the issue is likely Impel embed (permissions/JS) or iframe loading.",
  });
}
