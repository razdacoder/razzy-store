/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/bc0o0l6uwj/*",
      },
    ],
  },
};

export default nextConfig;
