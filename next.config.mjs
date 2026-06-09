/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Default image config — case study OG images are static for now,
  // but next/image is still used for thumbnails in case-study pages
  // that don't need remote sources.
}

export default nextConfig
