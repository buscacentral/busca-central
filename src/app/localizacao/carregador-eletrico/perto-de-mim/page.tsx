import { Metadata } from 'next';
import { fetchChargingStations } from '@/lib/openchargemap';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
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

const year = new Date().getFullYear();
export async function generateMetadata(): Promise<Metadata> {
  return generateToolMetadata(
    `Eletropostos Perto de Mim: Postos de Recarga por GPS (${year})`,
    'Localize eletropostos e estações de recarga para carros elétricos (BYD, GWM, Volvo) próximos de você via GPS em tempo real. Conectores Tipo 2 e CCS2.',
    '/localizacao/carregador-eletrico/perto-de-mim'
  );
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
    <h2>O que é o Localizador de Eletropostos Perto de Mim?</h2>
    <p>
      O <strong>Localizador de Eletropostos do BuscaCentral</strong> é uma ferramenta de geolocalização em tempo real integrada à base aberta global do <em>Open Charge Map</em>. Desenvolvida especialmente para motoristas de Veículos Elétricos (VE / BEV) e Híbridos Plug-in (PHEV) no Brasil, ela detecta a sua posição GPS e mapeia instantaneamente todas as estações de recarga pública e semipública disponíveis em um raio de até 35 km.
    </p>

    <h3>Para que serve localizar eletropostos por geolocalização?</h3>
    <p>
      Com a rápida expansão da frota de veículos elétricos no país (liderada por marcas como BYD, GWM, Volvo, BMW, Porsche, Audi, Renault e Caoa Chery), encontrar pontos de recarga funcionais e compatíveis é vital para:
    </p>
    <ul>
      <li><strong>Eliminar a Ansiedade de Autonomia (Range Anxiety):</strong> Encontre postos de parada com carregamento no seu caminho antes que o nível da bateria fique crítico.</li>
      <li><strong>Identificar Conectores e Potência:</strong> Verifique se o ponto oferece plugue <strong>Tipo 2 (Mennekes)</strong> para recarga AC ou <strong>CCS2 (Combo 2)</strong> para carregamento rápido e ultrarrápido DC (50 kW a 150+ kW).</li>
      <li><strong>Navegação Direta:</strong> Acesse as coordenadas exatas e trace rotas no Waze ou Google Maps com um único clique.</li>
      <li><strong>Mapeamento em Cidades e Rodovias:</strong> Localize pontos em shoppings, supermercados, postos de combustíveis (Shell Recharge, Ipiranga, Petrobras) e redes privadas (EZVolt, Tupinambá, Zletric, WeCharge).</li>
    </ul>

    <h3>Como usar o Localizador de Eletropostos</h3>
    <ol>
      <li><strong>Ative o GPS:</strong> Permita que o seu navegador acesse a sua localização atual quando solicitado.</li>
      <li><strong>Consulte a Lista Ordenada:</strong> As estações mais próximas de você serão exibidas ordenadas por distância em quilômetros.</li>
      <li><strong>Busque por Outras Cidades:</strong> Caso deseje planejar uma viagem futura, utilize o campo de busca ou selecione as principais capitais brasileiras na lista de atalhos rápidos.</li>
    </ol>
  </article>
);

const faqItems = [
  {
    question: "Como saber se o eletroposto é compatível com o meu carro elétrico (BYD, GWM, Volvo)?",
    answer: "A quase totalidade dos carros elétricos e híbridos plug-in vendidos oficialmente no Brasil adota o padrão Tipo 2 (AC) para recargas normais e CCS2 Combo (DC) para recarga rápida. Nossa ferramenta lista os conectores e potências suportados em cada estação."
  },
  {
    question: "Quanto tempo leva para recarregar a bateria em um eletroposto?",
    answer: "Em estações rápidas DC (50 kW a 150 kW), a recarga de 20% a 80% leva de 25 a 45 minutos. Em carregadores AC (Wallbox de 7 kW a 22 kW), o tempo médio para uma carga completa varia de 3 a 7 horas dependendo da capacidade da bateria."
  },
  {
    question: "Os eletropostos exibidos são gratuitos ou pagos?",
    answer: "Varia conforme o estabelecimento e a operadora. Muitos shoppings, hotéis e supermercados oferecem recarga cortesia, enquanto redes estruturadas em rodovias (como Shell Recharge, EZVolt, Tupinambá e Zletric) cobram por kWh através de seus respectivos aplicativos."
  },
  {
    question: "O mapa funciona durante viagens em rodovias interestaduais?",
    answer: "Sim. Ao trafegar por rodovias como Dutra, Bandeirantes, Castello Branco ou Régis Bittencourt, você pode atualizar a localização GPS para encontrar os postos de recarga nos pontos de apoio mais próximos."
  }
];

const relatedTools = [
  {
    title: "Distância entre Cidades",
    url: "/localizacao/distancia-cidades",
    description: "Calcule a distância rodoviária oficial entre quaisquer municípios do Brasil."
  },
  {
    title: "Calculadora de Combustível",
    url: "/utilidades/calculadora-combustivel",
    description: "Compare o custo de abastecimento tradicional versus autonomia."
  },
  {
    title: "Busca de CEP e Endereço",
    url: "/localizacao/busca-cep",
    description: "Consulte CEPs, logradouros e bairros em todo o território nacional."
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

  return (
    <ToolPageLayout
      title={`Eletropostos Perto de Mim: Postos de Recarga por GPS (${year})`}
      description="Localize eletropostos e estações de recarga para carros elétricos (BYD, GWM, Volvo) próximos de você via GPS em tempo real."
      ariaLabel="Localizador de eletropostos por GPS interativo"
      path="/localizacao/carregador-eletrico/perto-de-mim"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <PertoDeMimClient
        initialStations={stations}
        hasCoords={hasCoords}
        topCities={TOP_CITIES}
      />
    </ToolPageLayout>
  );
}
