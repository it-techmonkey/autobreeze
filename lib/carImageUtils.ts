import type { Car } from "./cars";
import { BRAND_IMAGES } from "./brandCarousel";

const TITLE_TO_STATIC_FOLDER: [string, string][] = [
  ["bmw x5", "BMW X5"],
  ["cadillac", "Cadillac"],
  ["chevrolet trailblazer", "Chevy Trailblazer"],
  ["chevy trailblazer", "Chevy Trailblazer"],
  ["ford mustang", "Ford Mustang"],
  ["genesis g70 white", "Genesis G70 white"],
  ["genesis g70", "Genesis G70"],
  ["genesis", "Genesis G70"],
  ["honda hr-v", "Honda HR-V"],
  ["honda zr-v", "Honda HR-V"],
  ["infinity qx 50", "Infinity QX 50"],
  ["infiniti qx50", "Infinity QX 50"],
  ["jeep", "Jeep"],
  ["jetour t2", "Jetour T2"],
  ["jetour", "Jetour T2"],
  ["lexus is 350", "Lexus IS 350"],
  ["lexus is350", "Lexus IS 350"],
  ["mazda cx30", "MAZDA CX30"],
  ["mazda cx 30", "MAZDA CX30"],
  ["mazda cx-30", "Mazda CX-30"],
  ["mazda cx5", "Mazda CX-5"],
  ["mazda cx 5", "Mazda CX-5"],
  ["mazda cx-5", "Mazda CX-5"],
  ["mg hs", "MG HS"],
  ["nissan x trail", "Nissan X-TRAIL"],
  ["nissan x-trail", "Nissan X-TRAIL"],
  ["renault koleos", "Renault Koleos"],
];

const STATIC_FOLDER_DEFAULT_IMAGE: Record<string, string> = {
  "BMW X5": "DSC_0039.jpg",
  Cadillac: "DSC_0002.jpg",
  "Chevy Trailblazer": "DSC_0019.jpg",
  "Ford Mustang": "DSC_0020.jpg",
  "Genesis G70": "_MG_1824.jpg",
  "Genesis G70 white": "_MG_1841.jpg",
  "Honda HR-V": "DSC_0035.jpg",
  "Infinity QX 50": "IMG_6972.jpg",
  Jeep: "IMG_6948.jpg",
  "Jetour T2": "IMG_6008.jpg",
  "Lexus IS 350": "IMG_1686.jpg",
  "MAZDA CX30": "IMG_6924.jpg",
  "Mazda CX-5": "DSC_0023.jpg",
  "Mazda CX-30": "DSC_0001.jpg",
  "MG HS": "DSC_0041.jpg",
  "Nissan X-TRAIL": "IMG_6033.jpg",
  "Renault Koleos": "DSC_0002.jpg",
};

const CAR_STATIC_IMAGE_MAP: Record<number, { folder: string; image: string }> = {
  21: { folder: "BMW X5", image: "DSC_0039.jpg" },
  13: { folder: "Cadillac", image: "DSC_0002.jpg" },
  14: { folder: "Chevy Trailblazer", image: "DSC_0019.jpg" },
  7: { folder: "Jeep", image: "IMG_6948.jpg" },
  22: { folder: "Jeep", image: "IMG_6948.jpg" },
  15: { folder: "Infinity QX 50", image: "IMG_6972.jpg" },
  18: { folder: "Honda HR-V", image: "DSC_0035.jpg" },
  10: { folder: "Mazda CX-5", image: "DSC_0023.jpg" },
  9: { folder: "MAZDA CX30", image: "IMG_6924.jpg" },
  20: { folder: "MG HS", image: "DSC_0041.jpg" },
  19: { folder: "Nissan X-TRAIL", image: "IMG_6033.jpg" },
  24: { folder: "Renault Koleos", image: "DSC_0002.jpg" },
};

const S3_CAR_BASE =
  "https://car-image-bucket-2024.s3.ap-south-1.amazonaws.com/car";

function getFolderFromTitle(title: string | undefined): string {
  if (!title) return "";
  const lower = title.toLowerCase().trim();
  for (const [key, folder] of TITLE_TO_STATIC_FOLDER) {
    if (lower.includes(key)) return folder;
  }
  return "";
}

/** Build Next.js public path for static_images (no "public" prefix). */
export function staticImagePath(folder: string, filename: string): string {
  const encodedFolder = encodeURIComponent(folder);
  return `/static_images/${encodedFolder}/${filename}`;
}

export function getCarImageUrl(car: Car | null): string {
  if (!car) return "";
  const mapping = CAR_STATIC_IMAGE_MAP[car.car_id];
  if (mapping) return staticImagePath(mapping.folder, mapping.image);
  const folder = getFolderFromTitle(car.title);
  if (folder) {
    const image = STATIC_FOLDER_DEFAULT_IMAGE[folder];
    if (image) return staticImagePath(folder, image);
  }
  if (car.img) return `${S3_CAR_BASE}/${car.img}`;
  return "";
}

export function getCarImageFallbackUrl(car: Car | null): string {
  if (!car?.img) return "";
  return `${S3_CAR_BASE}/${car.img}`;
}

export function getBrandImagePaths(folderName: string): string[] {
  const folder = folderName.trim();
  if (!folder) return [];
  const encoded = encodeURIComponent(folder);
  return [`/static_images/${encoded}`];
}

/** Get folder name for a car (from static_images subfolder). */
export function getCarFolder(car: Car | null): string {
  if (!car) return "";
  const mapping = CAR_STATIC_IMAGE_MAP[car.car_id];
  if (mapping) return mapping.folder;
  return getFolderFromTitle(car.title);
}

/**
 * Returns full image URLs for the car's gallery (all images in that car's subfolder).
 * Used for the detail page carousel. Falls back to single default image if no gallery list.
 */
export function getCarGalleryImageUrls(car: Car | null): string[] {
  const folder = getCarFolder(car);
  if (!folder) {
    const single = getCarImageUrl(car);
    return single ? [single] : [];
  }
  const filenames = BRAND_IMAGES[folder as keyof typeof BRAND_IMAGES];
  if (!filenames?.length) {
    const single = getCarImageUrl(car);
    return single ? [single] : [];
  }
  return filenames.map((f) => staticImagePath(folder, f));
}
