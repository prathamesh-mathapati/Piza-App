import path from 'path'; // Use ES module import

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.dominos.co.in" }],
    domains: ['images.dominos.co.in'],
  },
  webpack(config) {
    // Add custom alias for models
    config.resolve.alias = {
      ...config.resolve.alias,
      models: path.resolve('src/page/models'), // Adjust the path as per your folder structure
    };

    return config;  // Return the modified config
  },
};

export default nextConfig;
