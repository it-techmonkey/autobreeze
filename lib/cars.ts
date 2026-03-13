export interface Car {
  car_id: number;
  title: string;
  img: string;
  category: string;
  capacity: number;
  daily_price: string;
  weekly_price: string;
  monthly_price: string;
  section1_title?: string;
  section1_description?: string;
  section2_title?: string;
  section2_description?: string;
  key_features?: string;
  /** Optional specs for Key Features grid */
  horsepower?: string;
  transmission?: string;
  fuel_type?: string;
  description?: string;
}

/** Default/placeholder specs per car_id for Key Features grid when not on car object. */
export const CAR_SPECS: Record<number, { horsepower?: string; transmission?: string; fuel_type?: string }> = {
  21: { horsepower: "523 HP", transmission: "Automatic", fuel_type: "Petrol" },
  9: { horsepower: "186 HP", transmission: "Automatic", fuel_type: "Petrol" },
  10: { horsepower: "187 HP", transmission: "Automatic", fuel_type: "Petrol" },
  13: { horsepower: "335 HP", transmission: "Automatic", fuel_type: "Petrol" },
  15: { horsepower: "268 HP", transmission: "CVT", fuel_type: "Petrol" },
  20: { horsepower: "162 HP", transmission: "DCT", fuel_type: "Petrol" },
  19: { horsepower: "181 HP", transmission: "CVT", fuel_type: "Petrol" },
  22: { horsepower: "285 HP", transmission: "Automatic", fuel_type: "Petrol" },
  24: { horsepower: "170 HP", transmission: "CVT", fuel_type: "Petrol" },
  25: { horsepower: "450 HP", transmission: "Automatic", fuel_type: "Petrol" },
  26: { horsepower: "365 HP", transmission: "Automatic", fuel_type: "Petrol" },
  27: { horsepower: "365 HP", transmission: "Automatic", fuel_type: "Petrol" },
  28: { horsepower: "187 HP", transmission: "DCT", fuel_type: "Petrol" },
  29: { horsepower: "311 HP", transmission: "Automatic", fuel_type: "Petrol" },
  30: { horsepower: "186 HP", transmission: "Automatic", fuel_type: "Petrol" },
};

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "luxury", label: "Luxury Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "sedan", label: "Sedans" },
] as const;

export const cars: Car[] = [
  {
    car_id: 21,
    title: "BMW X5 M50I",
    img: "second.png",
    category: "luxury",
    capacity: 5,
    daily_price: "650 د.إ",
    weekly_price: "3675 د.إ",
    monthly_price: "13500 د.إ",
  },
  {
    car_id: 19,
    title: "Nissan Xterra",
    img: "trial.png",
    category: "suv",
    capacity: 7,
    daily_price: "200 د.إ",
    weekly_price: "1250 د.إ",
    monthly_price: "4000 د.إ",
  },
  {
    car_id: 24,
    title: "Renault Koleos",
    img: "koleos.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
  },
  {
    car_id: 25,
    title: "Ford Mustang",
    img: "mustang.png",
    category: "luxury",
    capacity: 4,
    daily_price: "350 د.إ",
    weekly_price: "2100 د.إ",
    monthly_price: "7500 د.إ",
  },
  {
    car_id: 28,
    title: "Jetour T2",
    img: "jetour.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
  },
  {
    car_id: 29,
    title: "Lexus IS 350",
    img: "lexus.png",
    category: "sedan",
    capacity: 5,
    daily_price: "275 د.إ",
    weekly_price: "1650 د.إ",
    monthly_price: "6000 د.إ",
  },
];

/** Car IDs to show on the home page fleet section only (others are hidden there but still on /cars). */
export const HOME_PAGE_CAR_IDS: number[] = [21, 19, 24, 25, 28, 29];

/** Cars to display on the home page: Nissan Xterra, Renault Koleos, Ford Mustang, Jetour T2, Lexus IS 350, BMW X5. */
export const homePageCars: Car[] = cars.filter((c) => HOME_PAGE_CAR_IDS.includes(c.car_id));
