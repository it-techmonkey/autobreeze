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
  7: { horsepower: "285 HP", transmission: "Automatic", fuel_type: "Petrol" },
  9: { horsepower: "186 HP", transmission: "Automatic", fuel_type: "Petrol" },
  10: { horsepower: "187 HP", transmission: "Automatic", fuel_type: "Petrol" },
  13: { horsepower: "335 HP", transmission: "Automatic", fuel_type: "Petrol" },
  14: { horsepower: "228 HP", transmission: "CVT", fuel_type: "Petrol" },
  15: { horsepower: "268 HP", transmission: "CVT", fuel_type: "Petrol" },
  18: { horsepower: "174 HP", transmission: "CVT", fuel_type: "Petrol" },
  20: { horsepower: "162 HP", transmission: "DCT", fuel_type: "Petrol" },
  19: { horsepower: "181 HP", transmission: "CVT", fuel_type: "Petrol" },
  22: { horsepower: "285 HP", transmission: "Automatic", fuel_type: "Petrol" },
  24: { horsepower: "170 HP", transmission: "CVT", fuel_type: "Petrol" },
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
    car_id: 7,
    title: "Jeep Wrangler (Sahara)",
    img: "sahara.png",
    category: "suv",
    capacity: 5,
    daily_price: "400 د.إ",
    weekly_price: "2275 د.إ",
    monthly_price: "7000 د.إ",
  },
  {
    car_id: 9,
    title: "Mazda CX 30",
    img: "cx30.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
  },
  {
    car_id: 10,
    title: "Mazda CX5",
    img: "cx5.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
  },
  {
    car_id: 13,
    title: "Cadillac CT5",
    img: "ct5.png",
    category: "sedan",
    capacity: 5,
    daily_price: "225 د.إ",
    weekly_price: "1260 د.إ",
    monthly_price: "4200 د.إ",
  },
  {
    car_id: 14,
    title: "Chevrolet Trailblazer",
    img: "cheverolet.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
  },
  {
    car_id: 15,
    title: "Infinity QX 50",
    img: "qx5.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
  },
  {
    car_id: 18,
    title: "Honda ZR-V",
    img: "zrv.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1200 د.إ",
    monthly_price: "3200 د.إ",
  },
  {
    car_id: 20,
    title: "MG HS Trophy",
    img: "trophy.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
  },
  {
    car_id: 19,
    title: "Nissan X Trail",
    img: "trial.png",
    category: "suv",
    capacity: 7,
    daily_price: "200 د.إ",
    weekly_price: "1250 د.إ",
    monthly_price: "4000 د.إ",
  },
  {
    car_id: 22,
    title: "Jeep Gladiator Sport",
    img: "gladitor.png",
    category: "suv",
    capacity: 5,
    daily_price: "185 د.إ",
    weekly_price: "1120 د.إ",
    monthly_price: "3600 د.إ",
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
];
