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
  // Allow loading static_images from parent public if symlinked
  transpilePackages: [],
};

export default nextConfig;
