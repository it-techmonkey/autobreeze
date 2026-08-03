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
    // Modern formats first; roughly 25-35% smaller than JPEG at equal quality.
    formats: ["image/avif", "image/webp"],
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
