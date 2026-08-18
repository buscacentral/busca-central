import { Metadata } from 'next';
import { fetchChargingStations } from '@/lib/openchargemap';
import ToolPageLayout from '@/components/ToolPageLayout';
import PertoDeMimClient from './PertoDeMimClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

interface PageProps {
  searchParams: Promise<{
    lat?: string;
    lng?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Eletroposto Perto de Mim: Encontre Carregadores de Carro Elétrico Próximos [Mapa]';
  const description = 'Localize agora os pontos de recarga e eletropostos mais próximos da sua localização atual. Veja conectores Tipo 2, CCS2, potência e rotas no GPS.';
  const canonical = 'https://buscacentral.com.br/localizacao/carregador-eletrico/perto-de-mim';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'BuscaCentral',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const TOP_CITIES = [
  { nome: 'São Paulo (SP)', slug: 'sao-paulo-sp' },
  { nome: 'Rio de Janeiro (RJ)', slug: 'rio-de-janeiro-rj' },
  { nome: 'Belo Horizonte (MG)', slug: 'belo-horizonte-mg' },
  { nome: 'Curitiba (PR)', slug: 'curitiba-pr' },
  { nome: 'Brasília (DF)', slug: 'brasilia-df' },
  { nome: 'Porto Alegre (RS)', slug: 'porto-alegre-rs' },
  { nome: 'Campinas (SP)', slug: 'campinas-sp' },
  { nome: 'Salvador (BA)', slug: 'salvador-ba' },
  { nome: 'Fortaleza (CE)', slug: 'fortaleza-ce' },
  { nome: 'Recife (PE)', slug: 'recife-pe' },
  { nome: 'Goiânia (GO)', slug: 'goiania-go' },
  { nome: 'Florianópolis (SC)', slug: 'florianopolis-sc' },
];

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Como funciona o localizador de eletropostos perto de mim?</h2>
    <p>
      O <strong>Localizador de Eletropostos do BuscaCentral</strong> utiliza a tecnologia de geolocalização do seu dispositivo (GPS) combinada com a base aberta global da <em>Open Charge Map</em> para encontrar estações de recarga para carros elétricos (BEV) e híbridos plug-in (PHEV) no raio mais próximo de você.
    </p>

    <h3>Quais marcas e veículos são compatíveis?</h3>
    <p>
      Nossa ferramenta lista estações compatíveis com todas as principais montadoras presentes no mercado brasileiro:
    </p>
    <ul>
      <li><strong>BYD:</strong> Dolphin, Dolphin Mini, Seal, Song Plus, King, Tan, Han e Yuan Pro/Plus.</li>
      <li><strong>GWM:</strong> Linha Haval H6 (PHEV) e Ora 03 (BEV).</li>
      <li><strong>Volvo:</strong> EX30, XC40 Recharge, C40 Recharge, XC60 e XC90 T8.</li>
      <li><strong>BMW, Porsche, Audi, Renault, Nissan, Peugeot e Mercedes-Benz</strong> com portas padrão Tipo 2 (AC) ou CCS2 (DC).</li>
    </ul>

    <h3>Diferença entre carregador Tipo 2 (AC) e CCS2 (DC)</h3>
    <ul>
      <li><strong>Tipo 2 (Mennekes - AC):</strong> Utilizado para recarga lenta ou semi-rápida (de 3.7 kW a 22 kW). Ideal para paradas prolongadas em shoppings, hotéis, estacionamentos e residências.</li>
      <li><strong>CCS2 / Combo 2 (DC):</strong> Carregamento rápido e ultrarrápido (de 30 kW até mais de 150 kW). Fornece energia em corrente contínua para recuperar de 20% a 80% da bateria em cerca de 30 minutos em rodovias e postos estruturados.</li>
    </ul>
  </article>
);

const faqItems = [
  {
    question: "Como achar o eletroposto mais próximo de mim agora?",
    answer: "Ative o GPS do seu celular ou computador nesta página tocando no botão 'Encontrar Eletropostos Mais Próximos de Mim'. O BuscaCentral calcula a distância exata em tempo real até todas as estações disponíveis no raio de 35 km e exibe a lista ordenada por proximidade."
  },
  {
    question: "Quais tipos de conectores de carro elétrico encontro perto de mim?",
    answer: "Os eletropostos no Brasil contam principalmente com plugues Tipo 2 (AC para recargas de 7 kW a 22 kW) e CCS2 Combo (DC para recarga rápida de 30 kW a 150+ kW), compatíveis com BYD, GWM, Volvo, BMW e demais modelos."
  },
  {
    question: "Existem eletropostos gratuitos perto de mim?",
    answer: "Sim. Vários shoppings centers, supermercados, hotéis e concessionárias oferecem recarga cortesia ou condicionada ao consumo. Na nossa ferramenta, utilize o filtro 'Gratuito' para listar as opções sem cobrança direta por kWh."
  },
  {
    question: "Como traçar rota até o eletroposto pelo Google Maps ou Waze?",
    answer: "Basta clicar no botão 'Abrir no Google Maps / Waze' no card da estação desejada. Seu aplicativo de mapas favorito será aberto instantaneamente com as coordenadas e navegação curva a curva."
  }
];

const relatedTools = [
  {
    title: "Planejador de Viagem para Carro Elétrico",
    url: "/localizacao/planejador-viagem-ev",
    description: "Trace rotas interestaduais com paradas estratégicas em eletropostos ao longo do caminho."
  },
  {
    title: "Distância entre Cidades",
    url: "/localizacao/distancia-cidades",
    description: "Calcule a distância rodoviária oficial e tempo de viagem entre municípios."
  },
  {
    title: "Calculadora de Combustível",
    url: "/utilidades/calculadora-combustivel",
    description: "Simule e compare o custo por km de abastecimento e recarga."
  }
];

export default async function EletropostoPertoDeMimPage({
  searchParams,
}: PageProps) {
  const resolvedParams = await searchParams;
  const latStr = resolvedParams?.lat;
  const lngStr = resolvedParams?.lng;

  const latNum = latStr ? parseFloat(latStr) : undefined;
  const lngNum = lngStr ? parseFloat(lngStr) : undefined;
  const hasCoords =
    latNum !== undefined &&
    !isNaN(latNum) &&
    lngNum !== undefined &&
    !isNaN(lngNum);

  let stations: Awaited<ReturnType<typeof fetchChargingStations>> = [];

  if (hasCoords) {
    stations = await fetchChargingStations({
      latitude: latNum,
      longitude: lngNum,
      distance: 35,
    });
    stations.sort((a, b) => {
      const distA = a.AddressInfo?.Distance ?? 999;
      const distB = b.AddressInfo?.Distance ?? 999;
      return distA - distB;
    });
  }

  // Schema JSON-LD WebApplication + FAQPage
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Eletroposto Perto de Mim - Localizador de Carregadores EV',
    url: 'https://buscacentral.com.br/localizacao/carregador-eletrico/perto-de-mim',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and Geolocation API',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    description: 'Localize pontos de recarga e eletropostos mais próximos da sua localização atual por GPS.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <ToolPageLayout
      title="Eletroposto Perto de Mim: Encontre Carregadores de Carro Elétrico Próximos [Mapa]"
      description="Localize agora os pontos de recarga e eletropostos mais próximos da sua localização atual. Veja conectores Tipo 2, CCS2, potência e rotas no GPS."
      ariaLabel="Localizador de eletropostos por GPS interativo"
      path="/localizacao/carregador-eletrico/perto-de-mim"
      lastUpdated="2026-08-18"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PertoDeMimClient
        initialStations={stations}
        hasCoords={hasCoords}
        topCities={TOP_CITIES}
        userLat={latNum}
        userLng={lngNum}
      />
    </ToolPageLayout>
  );
}
