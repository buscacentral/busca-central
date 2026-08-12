import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    cpus: 2,
  },
  async redirects() {
    return [
      // Garante que a rota perto-de-mim seja sempre canônica (sem trailing slash)
      {
        source: "/localizacao/carregador-eletrico/perto-de-mim/",
        destination: "/localizacao/carregador-eletrico/perto-de-mim",
        permanent: false,
      },
      {
        source: "/localizacao/whatsapp-link",
        destination: "/utilidades/whatsapp-link",
        permanent: true,
      },
      {
        source: "/carregador-eletrico",
        destination: "/localizacao/carregador-eletrico",
        permanent: true,
      },
      {
        source: "/carregador-eletrico/:path*",
        destination: "/localizacao/carregador-eletrico/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
