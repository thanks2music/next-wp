/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.ALLOWED_IMAGE_HOST,
      },
    ],
  },
};

export default nextConfig;
