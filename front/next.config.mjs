/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: process.env.ALLOWED_IMAGE_HOST.split(',') // 文字列を配列に変える（区切りは「,」）
  }
};

export default nextConfig;
