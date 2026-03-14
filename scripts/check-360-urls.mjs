#!/usr/bin/env node
/**
 * Deep scan: 360° resolution (in-app) + Impel URL reachability.
 * Run: node scripts/check-360-urls.mjs
 *
 * 1) Resolution: For each car in lib/cars, does getSpin360Url return a URL?
 * 2) Reachability: For each unique Impel URL, does HTTP GET return 200?
 */

const CAR_SPIN_360_BY_ID = {
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
};

const cars = [
  { car_id: 21, title: "BMW X5 M50I" },
  { car_id: 9, title: "Mazda CX 30" },
  { car_id: 10, title: "Mazda CX5" },
  { car_id: 13, title: "Cadillac CT5" },
  { car_id: 15, title: "Infinity QX 50" },
  { car_id: 20, title: "MG HS Trophy" },
  { car_id: 19, title: "Nissan Xterra" },
  { car_id: 22, title: "Jeep Gladiator" },
  { car_id: 24, title: "Renault Koleos" },
  { car_id: 25, title: "Ford Mustang" },
  { car_id: 26, title: "Genesis G70" },
  { car_id: 27, title: "Genesis G70 White" },
  { car_id: 28, title: "Jetour T2" },
  { car_id: 29, title: "Lexus IS 350" },
  { car_id: 30, title: "Mazda CX-30" },
];

function getSpin360Url(car) {
  if (!car) return null;
  const rawId = car.car_id ?? car.id;
  const id = typeof rawId === "string" ? parseInt(rawId, 10) : Number(rawId);
  if (Number.isFinite(id) && id >= 0 && CAR_SPIN_360_BY_ID[id] != null) {
    return CAR_SPIN_360_BY_ID[id];
  }
  const title = (car.title || "").toLowerCase().trim().replace(/\s+/g, " ");
  const byTitle = {
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
    "mazda cx30": CAR_SPIN_360_BY_ID[9],
    "bmw x5": CAR_SPIN_360_BY_ID[21],
  };
  for (const [key, url] of Object.entries(byTitle)) {
    if (title.includes(key)) return url;
  }
  return null;
}

async function main() {
  console.log("=== 1) In-app resolution (getSpin360Url per car) ===\n");

  const resolution = [];
  const uniqueUrls = new Set();

  for (const car of cars) {
    const url = getSpin360Url(car);
    const resolved = !!url;
    resolution.push({ car_id: car.car_id, title: car.title, url: url || null, resolved });
    if (url) uniqueUrls.add(url);
    console.log(
      resolved ? `  ✓ ${car.title} (${car.car_id}) → ${url}` : `  ✗ ${car.title} (${car.car_id}) → NO URL`
    );
  }

  const resolvedCount = resolution.filter((r) => r.resolved).length;
  console.log(`\nSummary: ${resolvedCount}/${cars.length} cars have a 360° URL from app logic.\n`);

  console.log("=== 2) Impel URL reachability (HTTP GET) ===\n");

  const urlChecks = [];
  for (const url of uniqueUrls) {
    let status = null;
    let ok = false;
    let error = null;
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (compatible; AutoBreeze-360-check)" } });
      status = res.status;
      ok = res.ok;
    } catch (e) {
      error = e.message || String(e);
    }
    urlChecks.push({ url, status, ok, error });
    const slug = url.replace("https://spins.impel.io/dubizzlenonturntable/", "");
    if (error) console.log(`  ✗ ${slug} → Error: ${error}`);
    else console.log(`  ${ok ? "✓" : "✗"} ${slug} → HTTP ${status}`);
  }

  const okCount = urlChecks.filter((c) => c.ok).length;
  console.log(`\nSummary: ${okCount}/${urlChecks.length} Impel URLs return HTTP 2xx.\n`);

  const failed = urlChecks.filter((c) => !c.ok && !c.error);
  const errored = urlChecks.filter((c) => c.error);
  if (failed.length) {
    console.log("URLs that did not return 2xx (may be 403/404 or redirect to error):");
    failed.forEach((c) => console.log("  ", c.url, "→", c.status));
  }
  if (errored.length) {
    console.log("URLs that failed to fetch (network/SSL):");
    errored.forEach((c) => console.log("  ", c.url, "→", c.error));
  }

  console.log("\n=== Conclusion ===");
  if (resolvedCount < cars.length) {
    console.log("Issue: In-app resolution is missing for some cars. Fix lib/spin360.ts or ensure cars have car_id/title that match.");
  } else if (okCount < urlChecks.length) {
    console.log("Issue: Some Impel URLs are not reachable (non-2xx or error). 360° visibility depends on Impel: fix or publish those spins in Impel, or correct typos in URLs (e.g. ms_autobrees_cx5 vs ms_autobreez_cx5).");
  } else {
    console.log("Resolution and URL reachability are OK. If 360° is still missing in the UI:");
    console.log("  • Not a fetching issue: all Impel URLs return HTTP 200.");
    console.log("  • Likely cause: iframe content (Impel app) fails for some spins (JS errors, embed disabled, or Permissions-Policy in browser).");
    console.log("  • In production, call GET /api/debug-360 to confirm resolution per car.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
