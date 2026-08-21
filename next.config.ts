import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    cpus: 2,
  },
  // Garante que o cidades.json seja empacotado nas funções serverless de ISR.
  // Sem isso, o fs.readFileSync falha em produção na Vercel, retornando 404
  // para rotas geradas sob demanda (fora do generateStaticParams).
  outputFileTracingIncludes: {
    '/localizacao/distancia/[origem]/[destino]': [
      './public/localizacao/distancia-cidades/cidades.json',
    ],
    '/localizacao/pedagio/[origem]/[destino]': [
      './public/localizacao/distancia-cidades/cidades.json',
    ],
  },
  async redirects() {
    return [
      // Garante que a rota perto-de-mim seja sempre canônica (sem trailing slash)
      {
        source: "/localizacao/carregador-eletrico/perto-de-mim/",
        destination: "/localizacao/carregador-eletrico/perto-de-mim",
        permanent: false,
      },
      // Localização
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
      {
        source: "/distancia",
        destination: "/localizacao/distancia",
        permanent: true,
      },
      {
        source: "/distancia/:path*",
        destination: "/localizacao/distancia/:path*",
        permanent: true,
      },
      {
        source: "/distancia-cidades",
        destination: "/localizacao/distancia-cidades",
        permanent: true,
      },
      {
        source: "/planejador-viagem-ev",
        destination: "/localizacao/planejador-viagem-ev",
        permanent: true,
      },
      {
        source: "/planejador-viagem-ev/:path*",
        destination: "/localizacao/planejador-viagem-ev/:path*",
        permanent: true,
      },
      {
        source: "/pedagio",
        destination: "/localizacao/pedagio",
        permanent: true,
      },
      {
        source: "/pedagio/:path*",
        destination: "/localizacao/pedagio/:path*",
        permanent: true,
      },
      {
        source: "/busca-cep",
        destination: "/localizacao/busca-cep",
        permanent: true,
      },
      {
        source: "/clima",
        destination: "/localizacao/clima",
        permanent: true,
      },
      {
        source: "/localizacao/whatsapp-link",
        destination: "/utilidades/whatsapp-link",
        permanent: true,
      },

      // Financeiro
      {
        source: "/clt-pj",
        destination: "/financeiro/conversor-clt-pj",
        permanent: true,
      },
      {
        source: "/financeiro/clt-pj",
        destination: "/financeiro/conversor-clt-pj",
        permanent: true,
      },
      {
        source: "/cotacao",
        destination: "/financeiro/cotacao",
        permanent: true,
      },
      {
        source: "/cotacao/:path*",
        destination: "/financeiro/cotacao/:path*",
        permanent: true,
      },
      {
        source: "/criptomoedas",
        destination: "/financeiro/criptomoedas",
        permanent: true,
      },
      {
        source: "/criptomoedas/:path*",
        destination: "/financeiro/criptomoedas/:path*",
        permanent: true,
      },
      {
        source: "/tabela-fipe",
        destination: "/financeiro/tabela-fipe",
        permanent: true,
      },
      {
        source: "/juros-compostos",
        destination: "/financeiro/juros-compostos",
        permanent: true,
      },
      {
        source: "/salario-liquido",
        destination: "/financeiro/salario-liquido",
        permanent: true,
      },
      {
        source: "/salario-liquido/:path*",
        destination: "/financeiro/salario-liquido/:path*",
        permanent: true,
      },
      {
        source: "/financiamento-carro",
        destination: "/financeiro/financiamento-carro",
        permanent: true,
      },
      {
        source: "/rescisao-trabalhista",
        destination: "/financeiro/rescisao-trabalhista",
        permanent: true,
      },

      // Documentos e Utilidades
      {
        source: "/whatsapp-link",
        destination: "/utilidades/whatsapp-link",
        permanent: true,
      },
      {
        source: "/gerador-cpf",
        destination: "/documentos/gerador-cpf",
        permanent: true,
      },
      {
        source: "/validador-cpf",
        destination: "/documentos/validador-cpf",
        permanent: true,
      },
      {
        source: "/gerador-cnpj",
        destination: "/documentos/gerador-cnpj",
        permanent: true,
      },
      {
        source: "/validador-cnpj",
        destination: "/documentos/validador-cnpj",
        permanent: true,
      },
      {
        source: "/consulta-cnpj",
        destination: "/documentos/consulta-cnpj",
        permanent: true,
      },
      {
        source: "/gerador-recibos",
        destination: "/documentos/gerador-recibos",
        permanent: true,
      },
      {
        source: "/gerador-qr-code",
        destination: "/utilidades/gerador-qr-code",
        permanent: true,
      },
      {
        source: "/calculadora-imc",
        destination: "/utilidades/calculadora-imc",
        permanent: true,
      },
      {
        source: "/calculadora-combustivel",
        destination: "/utilidades/calculadora-combustivel",
        permanent: true,
      },

      // Páginas descontinuadas
      {
        source: "/produtos",
        destination: "/utilidades",
        permanent: true,
      },
      {
        source: "/produtos/:path*",
        destination: "/utilidades",
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
