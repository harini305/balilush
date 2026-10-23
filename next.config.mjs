/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the site off Vercel's Image Optimization quota: every image is a
  // pre-generated derivative in /public/images (see scripts/build-images.mjs).
  images: { unoptimized: true },
  async redirects() {
    return [
      // Legacy routes recorded in docs/source-audit/09-phase-2-recommendations.md §3
      { source: '/home', destination: '/', permanent: true },
      { source: '/blank', destination: '/', permanent: true },
      { source: '/blog/hashtags/:tag*', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
