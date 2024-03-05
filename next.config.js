/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "files.edgestore.dev",
      "img.clerk.com",
      "https://loved-redbird-62.clerk.accounts.dev",
    ],
  },
};

module.exports = nextConfig;
