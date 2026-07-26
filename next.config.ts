import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    cpus: 2,
  },
  async redirects() {
    return [
      {
        source: "/localizacao/whatsapp-link",
        destination: "/utilidades/whatsapp-link",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
