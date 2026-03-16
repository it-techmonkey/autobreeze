import type { Car } from "./cars";

/** Single source of truth: car_id -> Impel 360 URL. All listed cars must show 360. */
const CAR_SPIN_360_BY_ID: Record<number, string> = {
  21: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_bmwx5",
  22: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_jeep",
  9: "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_mazdacx30",
  10: "https://spins.impel.io/dubizzlenonturntable/ms_autobrees_cx5",
  13: "https://spins.impel.io/dubizzlenonturntable/ms__autobreez__ct5",
  15: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_infinity_qx50",
  24: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_koleos",
  19: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xterra",
  20: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mg",
  25: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mustang",
  26: "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_genesis",
  27: "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_genesis_white",
  28: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_jetour",
  29: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_lexus_is350",
  30: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mazda_cx30",
  31: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_zrv",
  32: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xtrail",
  34: "https://spins.impel.io/dubizzlenonturntable/ar-automancar-tesla-white",
  33: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_t2"
};

/** Fallback: normalized title -> URL (for title-based lookup). Use exact titles from cars array. */
const CAR_SPIN_360_BY_TITLE: Record<string, string> = {
  "bmw x5 m50i": CAR_SPIN_360_BY_ID[21],
  "mazda cx 30": CAR_SPIN_360_BY_ID[9],
  "mazda cx5": CAR_SPIN_360_BY_ID[10],
  "cadillac ct5": CAR_SPIN_360_BY_ID[13],
  "infinity qx 50": CAR_SPIN_360_BY_ID[15],
  "mg hs trophy": CAR_SPIN_360_BY_ID[20],
  "nissan xterra": CAR_SPIN_360_BY_ID[19],
  "jeep gladiator": CAR_SPIN_360_BY_ID[22],
  "renault koleos": CAR_SPIN_360_BY_ID[24],
  "ford mustang": CAR_SPIN_360_BY_ID[25],
  "genesis g70": CAR_SPIN_360_BY_ID[26],
  "genesis g70 white": CAR_SPIN_360_BY_ID[27],
  "jetour t2": CAR_SPIN_360_BY_ID[28],
  "lexus is 350": CAR_SPIN_360_BY_ID[29],
  "mazda cx-30": CAR_SPIN_360_BY_ID[30],
  "mazda cx-5": CAR_SPIN_360_BY_ID[10],
  "infiniti qx50": CAR_SPIN_360_BY_ID[15],
  "infinity qx50": CAR_SPIN_360_BY_ID[15],
  "genesis (white)": CAR_SPIN_360_BY_ID[27],
  "genesis g70 (white)": CAR_SPIN_360_BY_ID[27],
  genesis: CAR_SPIN_360_BY_ID[26],
  mg: CAR_SPIN_360_BY_ID[20],
  jeep: CAR_SPIN_360_BY_ID[22],
  "bmw x5": CAR_SPIN_360_BY_ID[21],
  "lexus is350": CAR_SPIN_360_BY_ID[29],
  "nissan x-trail": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xtrail",
  "nissan x trail": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xtrail",
};

function normalizeTitle(s: string): string {
  return (s || "").toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Returns the Impel 360° viewer URL for a car, or null if none is configured.
 * Lookup order: car_id (numeric), then id (if present), then title match.
 */
export function getSpin360Url(car: Car | null): string | null {
  if (!car) return null;

  const id = Number((car as { car_id?: number; id?: number }).car_id ?? (car as { id?: number }).id);
  if (!Number.isNaN(id) && CAR_SPIN_360_BY_ID[id] != null) {
    return CAR_SPIN_360_BY_ID[id];
  }

  const title = normalizeTitle(car.title || "");
  for (const [key, url] of Object.entries(CAR_SPIN_360_BY_TITLE)) {
    if (title.includes(key)) return url;
  }
  return null;
}
