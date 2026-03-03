# Component Architecture – AutoBreeze Next.js

## Overview

The app is structured for a **Premium Dark/Gold** luxury car rental experience with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

---

## 1. Visual identity & theme

| Element | Implementation |
|--------|----------------|
| **Palette** | `tailwind.config.ts`: `matte.black` (#0A0A0A), `charcoal`, `gold` (#D4AF37), `gold.champagne` |
| **Typography** | `layout.tsx`: Playfair Display (--font-playfair) for headings, Inter (--font-inter) for body |
| **Glassmorphism** | `.glass-panel` and `.glass-panel-strong` in `globals.css`; used in `Navbar.tsx` |

---

## 2. Core components

| Component | Role |
|-----------|------|
| **Navbar** | Fixed top bar, glass effect on scroll, mobile menu, “Book Now” CTA |
| **Hero** | Full-viewport hero, gradient overlay, headline + CTA, scroll hint |
| **FilterBar** | Category pills (All, Supercars, Luxury, SUV, Sedan, Convertibles); passes active category to parent |
| **FleetSection** | Holds filter state, filters `cars` by category, renders grid of `CarCard` with Framer Motion `layout` + `AnimatePresence` |
| **CarCard** | Single car: `next/image`, title, price, “View 360°” (if URL exists), “View Details” → `/car/[id]`; opens `ThreeSixtyViewer` on 360 click |
| **ThreeSixtyViewer** | Modal with Impel iframe, loading state, “Open in new tab” |
| **BrandCarousel** | Per-brand horizontal scroll sections; each brand has a list of images from `lib/brandCarousel.ts`; touch/swipe via overflow-x-auto |
| **Footer** | Links, contact, copyright |

---

## 3. Data & lib

| File | Purpose |
|------|--------|
| **lib/cars.ts** | `Car` type, `CATEGORIES`, `cars` array (from existing carBack) |
| **lib/carImageUtils.ts** | `getCarImageUrl(car)`, `getCarImageFallbackUrl(car)`; maps title/car_id → `/static_images/{folder}/{image}` or S3 |
| **lib/spin360.ts** | `getSpin360Url(car)`; maps car_id/title → Impel 360 iframe URL |
| **lib/brandCarousel.ts** | `BRAND_IMAGES`: brand folder name → list of image filenames for carousels |

---

## 4. Pages & routes

| Route | Description |
|-------|-------------|
| **/ (app/page.tsx)** | Home: Navbar, Hero, FleetSection, BrandCarousel, Footer |
| **/car/[id] (app/car/[id]/page.tsx)** | Car detail: image, title, capacity, daily/weekly/monthly, 360 button, Book Now (WhatsApp) |
| **app/loading.tsx** | Global loading UI (dark + gold spinner) |

---

## 5. Animations & UX

| Feature | Where |
|--------|--------|
| Hero reveal | `Hero.tsx`: Framer Motion `initial`/`animate` on headline, tagline, CTAs |
| Nav bar on scroll | `Navbar.tsx`: `scrolled` state → add glass + shadow |
| Filter layout transition | `FleetSection.tsx`: `motion.div layout` on grid, `AnimatePresence mode="popLayout"` on CarCard list |
| Card hover glow | `CarCard.tsx`: Tailwind `hover:shadow-glow-lg`, `hover:border-luxury-border-hover` |
| Loading | `app/loading.tsx`: dual-ring spinner + “Loading” text |

---

## 6. Responsive grid

- **FleetSection** grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **BrandCarousel**: horizontal scroll per brand; cards `w-[280px] sm:w-[320px]`, `object-cover`, scroll-snap

---

## 7. Static assets

- **Car images**: `public/static_images/{FolderName}/{filename}` (copy from parent `public/static_images`).
- **Hero**: `public/img/landing/landing3.jpg` (copy from parent `public/img/landing`).
- **next/image**: Used for car images and brand carousel; `unoptimized` for local `/static_images`; S3 allowed via `next.config.mjs` `images.remotePatterns`.

---

## 8. 360° viewer

- **Source**: Impel URLs from existing `carSpin360.js` (ported in `lib/spin360.ts`).
- **UI**: `ThreeSixtyViewer` modal; iframe loads URL; loading state until iframe `onLoad`; “Open in new tab” for fallback. Rotation/drag is handled inside the Impel iframe.

---

## 9. Suggested next steps

1. Copy `public/static_images` and `public/img/landing` from the parent project into `nextjs/public/`.
2. Run `npm install` and `npm run dev` in `nextjs/`.
3. Optionally add `/about` and `/contact` pages and link them from Navbar/Footer.
4. Optionally add GSAP for more cinematic hero sequences.
5. Optionally add a proper “magnetic” button effect (e.g. with Framer Motion `useMotionValue` + `useTransform` on cursor position).
