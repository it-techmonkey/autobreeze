/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "car-image-bucket-2024.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
    // WebP only. AVIF compresses ~10% better but is far slower to encode, and
    // the optimizer runs in-process — a detail page requesting ~10 distinct
    // sources at once meant ten concurrent AVIF encodes competing with the
    // server, which is what made pages hang on a cold cache.
    formats: ["image/webp"],
    // Trim the variant matrix. Next defaults to 8 deviceSizes x 8 imageSizes,
    // so each source could generate 16 renditions; these cover what the layout
    // actually requests (cards, carousel, 80px thumbnails, full-bleed hero).
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [96, 256],
    // Cache generated variants for 30 days so repeat views skip re-transforming.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  transpilePackages: [],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "accelerometer=(self \"https://spins.impel.io\" \"https://cdn.impel.io\"), gyroscope=(self \"https://spins.impel.io\" \"https://cdn.impel.io\")",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
