/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-hosting.imagekit.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["./public/assets/icons"],
  },
};

export default nextConfig;
