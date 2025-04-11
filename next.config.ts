/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'logo.svgcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
      },
      {
        protocol: 'https',
        hostname: 'www.nordfabrik.ch',
      },
      {
        protocol: 'https',
        hostname: 'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
      },
      {
        protocol: 'https',
        hostname: 'learnai.tw',
      },
      {
        protocol: 'https',
        hostname: 'brandpalettes.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'aipedia.co.il',
      },
      {
        protocol: 'https',
        hostname: 'images.g2crowd.com',
      },
      {
        protocol: 'https',
        hostname: 'techpilot.ai',
      },
      {
        protocol: 'https',
        hostname: '10web.io',
      },
      {
        protocol: 'https',
        hostname: 'logospng.org',
      }
    ]
  }
};

module.exports = nextConfig;
