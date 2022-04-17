/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_HOST: process.env.API_HOST,
    GCP_AUTH_API_KEY: process.env.GCP_AUTH_API_KEY,
    GCP_AUTH_CLIENT_ID: process.env.GCP_AUTH_CLIENT_ID,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
};

module.exports = nextConfig;
