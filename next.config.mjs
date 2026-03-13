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
