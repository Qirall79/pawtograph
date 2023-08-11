/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pawtograph.s3.eu-west-3.amazonaws.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "platform-lookaside.fbsbx.com",
      },
      {
        hostname: "pbs.twimg.com",
      },
    ],
  },
};

module.exports = nextConfig;
