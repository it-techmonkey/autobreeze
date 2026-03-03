# AutoBreeze Luxury – Next.js App

Premium dark/gold car rental site built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Modern Luxury theme**: Matte black (#0A0A0A), charcoal, metallic gold (#D4AF37), champagne accents
- **Typography**: Playfair Display (headings) + Inter (body)
- **Glassmorphism**: Frosted nav bar and card overlays
- **Categorical filtering**: Supercars, Luxury Sedans, SUVs, Sedans, Convertibles with Framer Motion layout transitions
- **360° viewer**: Embedded in car detail page gallery (first slide) + modal from fleet cards; no redirect
- **Car detail gallery**: Amazon-style swipeable carousel with 360° as first slide, thumbnails, arrows, click-to-zoom lightbox, touch swipe
- **Brand carousels**: Touch-enabled swipe carousels per brand using static images
- **Cinematic hero**: Reveal-on-scroll style animations
- **Micro-interactions**: Hover glow on cards, magnetic-style CTAs
- **Luxury loading**: Custom dark-theme preloader/skeleton
- **next/image**: Optimized images where applicable
- **Responsive grid**: 1 col (mobile), 2 (tablet), 3–4 (desktop)

## Setup

1. **Install dependencies**

   ```bash
   cd nextjs
   npm install
   ```

2. **Static images (required for car cards and detail gallery)**

   All image `src` paths use **`/static_images/...`** (no `public` prefix; Next.js serves `public/` at the root). Ensure `nextjs/public/static_images/` exists with brand subfolders (e.g. `BMW X5`, `Cadillac`, `Honda HR-V`). You can copy from the parent project:

   - Copy the entire `public/static_images` folder from the repo root into `nextjs/public/` so that `nextjs/public/static_images/` contains all brand folders.
   - Optionally copy `public/img/landing/landing3.jpg` into `nextjs/public/img/landing/` for the hero background.

   Example (from repo root):

   ```bash
   cp -r public/static_images nextjs/public/
   mkdir -p nextjs/public/img/landing
   cp public/img/landing/landing3.jpg nextjs/public/img/landing/  # if exists
   ```

3. **Run the app**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
nextjs/
├── app/
│   ├── layout.tsx      # Root layout, fonts
│   ├── page.tsx        # Home: Hero, Fleet, Brands, Footer
│   ├── loading.tsx    # Luxury preloader
│   └── globals.css
├── components/
│   ├── Navbar.tsx      # Glassmorphism nav
│   ├── Hero.tsx        # Cinematic hero
│   ├── FilterBar.tsx   # Category pills
│   ├── CarCard.tsx     # Card + 360 CTA, viewport reveal
│   ├── ThreeSixtyViewer.tsx  # 360° modal (fleet cards)
│   ├── ProductCarousel.tsx   # Detail page: gallery + 360 + zoom
│   ├── FleetSection.tsx      # Client-side category filter (instant)
│   ├── BrandCarousel.tsx
│   └── Footer.tsx
├── lib/
│   ├── cars.ts         # Car data + categories
│   ├── carImageUtils.ts
│   ├── spin360.ts      # 360 URLs
│   └── brandCarousel.ts
├── public/
│   ├── static_images/  # Copy from parent project
│   └── img/landing/    # Hero image(s)
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## Car detail page (optional)

To add a car detail page (e.g. `/car/[id]`), create `app/car/[id]/page.tsx` and use `lib/cars` and `lib/carImageUtils` to resolve the vehicle and images.

## Environment

No env vars are required for the current feature set. If you add analytics or APIs, add a `.env.local` and reference in `next.config.mjs` if needed.
