import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuscaCentral — Ferramentas Online Gratuitas',
    short_name: 'BuscaCentral',
    description:
      'Central de ferramentas online gratuitas do Brasil. Gerador de CPF, CNPJ, consulta de CEP, cotações e muito mais.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0057FF',
    icons: [
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable' as any,
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable' as any,
      },
    ],
  };
}