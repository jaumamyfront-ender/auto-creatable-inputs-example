import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "refspace.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "panel.refspace.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.refspace.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "refspace-api-staging-p75pz.ondigitalocean.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "refspace-api-test-egopi.ondigitalocean.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.refspace.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ref-staging.fra1.digitaloceanspaces.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ref-test.fra1.digitaloceanspaces.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
