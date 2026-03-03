import type { Car } from "./cars";

const CAR_SPIN_360_URLS: Record<number, string> = {
  21: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_bmwx5",
  7: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_jeep",
  22: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_jeep",
  9: "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_mazdacx30",
  10: "https://spins.impel.io/dubizzlenonturntable/ms_autobrees_cx5",
  13: "https://spins.impel.io/dubizzlenonturntable/ms__autobreez__ct5",
  14: "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_chevytrailblazer",
  15: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_infinity_qx50",
  18: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_zrv",
  24: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_koleos",
  19: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xtrail",
  20: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mg",
};

const CAR_SPIN_360_BY_TITLE: Record<string, string> = {
  "nissan xterra": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xterra",
  jetour: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_jetour",
  "renault koleos": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_koleos",
  "honda zr-v": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_zrv",
  "honda hr-v": "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_hondahrv",
  "chevrolet trailblazer":
    "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_chevytrailblazer",
  "mazda cx-30":
    "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_mazdacx30",
  "genesis (white)":
    "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_genesis_white",
  genesis: "https://spins.impel.io/dubizzlenonturntable/mz_autobreeze_genesis",
  "jetour t2": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_t2",
  "lexus is350":
    "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_lexus_is350",
  mg: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mg",
  "nissan x-trail": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xtrail",
  "mazda cx-5": "https://spins.impel.io/dubizzlenonturntable/ms_autobrees_cx5",
  "infiniti qx50":
    "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_infinity_qx50",
  "infinity qx 50":
    "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_infinity_qx50",
  "mazda cx 30": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mazda_cx30",
  "mazda cx5": "https://spins.impel.io/dubizzlenonturntable/ms_autobrees_cx5",
  jeep: "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_jeep",
  "bmw x5": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_bmwx5",
  "ford mustang":
    "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mustang",
  "cadillac ct5": "https://spins.impel.io/dubizzlenonturntable/ms__autobreez__ct5",
  "mg hs trophy": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_mg",
  "nissan x trail": "https://spins.impel.io/dubizzlenonturntable/ms_autobreez_xtrail",
};

export function getSpin360Url(car: Car | null): string | null {
  if (!car) return null;
  const byId = CAR_SPIN_360_URLS[car.car_id];
  if (byId) return byId;
  const title = (car.title || "").toLowerCase().trim();
  for (const [key, url] of Object.entries(CAR_SPIN_360_BY_TITLE)) {
    if (title.includes(key)) return url;
  }
  return null;
}
