import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central de Localização | CEP, Distâncias e Eletropostos',
  description: 'Ferramentas de localização: busca de CEP, busca reversa, cálculo de distância entre cidades e localizador de eletropostos para veículos elétricos.',
  alternates: { canonical: '/localizacao' },
  openGraph: {
    title: 'Central de Localização | BuscaCentral',
    description: 'Ferramentas de localização: busca de CEP, busca reversa, cálculo de distância entre cidades e localizador de eletropostos para veículos elétricos.',
    url: 'https://buscacentral.com.br/localizacao',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
};

const tools = [
  { title: 'Busca de CEP', description: 'Consulte endereços completos por CEP ou busque CEPs por nome de rua. Dados do ViaCEP em tempo real.', href: '/localizacao/busca-cep', icon: '📍', color: 'bg-blue-50 border-blue-200' },
  { title: 'Distância entre Cidades', description: 'Calcule a distância entre cidades brasileiras, tempo de viagem e custo de combustível.', href: '/localizacao/distancia-cidades', icon: '🗺️', color: 'bg-green-50 border-green-200' },
  { title: 'Localizador de Eletropostos', description: 'Encontre estações de recarga para carros elétricos (VEs) nas principais cidades do Brasil.', href: '/localizacao/carregador-eletrico', icon: '⚡', color: 'bg-purple-50 border-purple-200' },
  { title: 'Planejador de Viagens EV', description: 'Planeje rotas rodoviárias interestaduais com mapeamento de carregadores rápidos no caminho.', href: '/localizacao/planejador-viagem-ev', icon: '🛣️', color: 'bg-teal-50 border-teal-200' },
  { title: 'Clima e Previsão do Tempo', description: 'Consulte a temperatura, umidade e condições climáticas atuais de qualquer região do Brasil.', href: '/localizacao/clima', icon: '🌤️', color: 'bg-sky-50 border-sky-200' },
];

const sugestoes = [
  { title: 'Gerador de CPF', href: '/documentos/gerador-cpf', icon: '📄' },
  { title: 'Consulta CNPJ', href: '/documentos/consulta-cnpj', icon: '🔎' },
  { title: 'Cotação de Moedas', href: '/financeiro/cotacao', icon: '💱' },
];

const faqItems = [
  {
    question: 'Como funciona o localizador de eletropostos por GPS?',
    answer: 'Ao permitir o acesso à sua geolocalização no navegador, o sistema identifica sua posição e mapeia todas as estações de recarga rápida (DC) e semirrápida (AC) no raio de até 35 km, exibindo conectores, potência e rota.'
  },
  {
    question: 'A distância entre cidades é rodoviária ou em linha reta?',
    answer: 'Nossa ferramenta calcula a distância rodoviária oficial por estradas (quilometragem real percorrida de carro ou ônibus) e também apresenta a distância geodésica em linha reta baseada nas coordenadas do IBGE.'
  },
  {
    question: 'O planejador de rotas EV considera carregamento rápido em rodovias?',
    answer: 'Sim. O planejador de viagens mapeia eletropostos a até 15 km da rodovia principal, destacando carregadores ultrarrápidos DC (50 kW a 150 kW) em postos de serviço estruturados.'
  },
  {
    question: 'Os dados de busca de CEP são confiáveis e atualizados?',
    answer: 'Sim. O sistema utiliza a base oficial dos Correios sincronizada via webservices do ViaCEP, garantindo endereços, bairros e cidades atualizados em tempo real.'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'dateModified': '2026-08-16',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function LocalizacaoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-4xl font-bold text-slate-900 mb-4">Serviços de Localização</h1>
      <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mb-4">
        Ferramentas de localização para consultas de endereço, distâncias e mobilidade elétrica.
        Busque CEPs, calcule rotas e estime custos de viagem entre cidades brasileiras.
      </p>
      <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed mb-10">
        Dados fornecidos pelo ViaCEP, coordenadas oficiais do IBGE e base internacional Open Charge Map.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group block p-6 rounded-2xl border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${tool.color}`}
          >
            <div className="text-7xl mb-6 transition-transform duration-300 group-hover:scale-110">{tool.icon}</div>
            <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">{tool.title}</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>

      {/* Bloco Explicativo de Apoio */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre os Serviços de Localização</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          A Central de Localização do BuscaCentral foi construída para atender às necessidades de planejamento geográfico de viajantes, motoristas de veículos elétricos, profissionais de logística e o público geral. Nossas ferramentas permitem consultar endereços por CEP ou busca reversa de logradouro, calcular trajetos entre quaisquer municípios do Brasil e planejar custos de combustível com precisão.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Pioneiro na integração de mobilidade sustentável, o portal disponibiliza localizadores de eletropostos em tempo real e planejadores de viagens rodoviárias para carros elétricos (BEV) e híbridos (PHEV), conectando motoristas à infraestrutura nacional de recarga rápida.
        </p>
      </section>

      {/* Bloco de FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas Frequentes sobre Localização</h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 group"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-center justify-between gap-2">
                <span>{item.question}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-3 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Ferramentas Relacionadas</h2>
        <p className="text-sm md:text-base text-slate-500 mb-4">Outras ferramentas que podem ser úteis</p>
        <div className="flex flex-wrap gap-3">
          {sugestoes.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all text-sm md:text-base font-medium text-slate-700"
            >
              <span>{s.icon}</span>
              {s.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
