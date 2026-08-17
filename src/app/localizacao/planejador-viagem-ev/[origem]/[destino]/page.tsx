import EvProductCards from '@/components/affiliate/EvProductCards';
import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchRouteChargers, OCMPointOfInterest } from '@/lib/openchargemap';
import { getCityBySlug } from '@/lib/distancia-cidades';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import PlanejadorSearch from '../../PlanejadorSearch';
import { PlugIcon } from '@/components/ev/Icons';
import StationCard from '@/components/ev/StationCard';

interface PageProps {
  params: Promise<{
    origem: string;
    destino: string;
  }>;
}

function parseCidadeUf(slug: string) {
  const parts = slug.split('-');
  const uf = parts.length > 1 ? parts.pop()?.toUpperCase() || '' : '';
  const cidadeStr = parts.join(' ');
  const cidade = cidadeStr.replace(/\b\w/g, (char) => char.toUpperCase());
  return { cidade, uf };
}

const year = new Date().getFullYear();
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { origem, destino } = resolvedParams;

  const originParsed = parseCidadeUf(origem);
  const destParsed = parseCidadeUf(destino);

  const displayOrigin = originParsed.uf ? `${originParsed.cidade}-${originParsed.uf}` : originParsed.cidade;
  const displayDest = destParsed.uf ? `${destParsed.cidade}-${destParsed.uf}` : destParsed.cidade;

  return generateToolMetadata(
    `Carregadores Elétricos: Rota de ${displayOrigin} para ${displayDest} (${year})`,
    `Planeje sua viagem de carro elétrico de ${displayOrigin} até ${displayDest}. Veja todos os pontos de recarga rápida (DC) e eletropostos disponíveis ao longo da rodovia.`,
    `/localizacao/planejador-viagem-ev/${origem}/${destino}`
  );
}

async function getRoutePolyline(lon1: number, lat1: number, lon2: number, lat2: number): Promise<{ polyline: string, distanceKm: number } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full`;
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      return {
        polyline: data.routes[0].geometry,
        distanceKm: data.routes[0].distance / 1000
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching OSRM route:', err);
    return null;
  }
}

export default async function TripPlannerResultsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { origem, destino } = resolvedParams;

  const originData = getCityBySlug(origem);
  const destData = getCityBySlug(destino);

  const originParsed = parseCidadeUf(origem);
  const destParsed = parseCidadeUf(destino);
  const displayOrigin = originParsed.uf ? `${originParsed.cidade} - ${originParsed.uf}` : originParsed.cidade;
  const displayDest = destParsed.uf ? `${destParsed.cidade} - ${destParsed.uf}` : destParsed.cidade;

  if (!originData || !destData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cidades não encontradas</h1>
        <p className="text-gray-600 mb-8">Não foi possível localizar a origem ou o destino informados.</p>
        <Link href="/localizacao/planejador-viagem-ev" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
          Voltar ao Planejador
        </Link>
      </div>
    );
  }

  // 1. Get Route from OSRM
  const routeData = await getRoutePolyline(originData.lon, originData.lat, destData.lon, destData.lat);

  let stations: OCMPointOfInterest[] = [];
  let routeDistance = 0;

  if (routeData) {
    routeDistance = routeData.distanceKm;
    // 2. Fetch Chargers along Polyline from OCM (within 15km of the highway)
    stations = await fetchRouteChargers(routeData.polyline, 15);
  }

  const seoContent = (
    <article className="prose prose-gray max-w-none">
      <h2>Planejamento de Viagem com Carro Elétrico: {displayOrigin} até {displayDest}</h2>
      <p>
        A rota rodoviária entre <strong>{displayOrigin}</strong> e <strong>{displayDest}</strong> tem uma distância estimada de <strong>{routeDistance.toFixed(0)} km</strong>. Nosso sistema escaneou uma faixa de 15 km ao redor de toda a extensão do traçado rodoviário e identificou <strong>{stations.length} estações de recarga</strong> públicas e semipúblicas cadastradas.
      </p>

      <h3>Dicas para Viajar com Tranquilidade neste Trajeto</h3>
      <ul>
        <li><strong>Faça Paradas Coincidentes com Refeições:</strong> Programe suas paradas de 30 a 45 minutos em postos de serviço estruturados com carregadores rápidos DC (como Graal, Frango Assado, Shell Recharge, Ipiranga).</li>
        <li><strong>Monitore a Velocidade de Cruzeiro:</strong> Manter velocidades moderadas (entre 95 e 105 km/h) reduz significativamente o consumo de energia em kWh por quilômetro e evita paradas não planejadas.</li>
        <li><strong>Margem de Segurança de 20%:</strong> Chegue a cada eletroposto com no mínimo 15% a 20% de carga residual na bateria para ter flexibilidade caso encontre o carregador ocupado.</li>
        <li><strong>Consulte Aplicativos de Operadoras:</strong> As redes EZVolt, Tupinambá, Shell Recharge e Zletric permitem visualizar o status de disponibilidade do conector em tempo real.</li>
      </ul>
    </article>
  );

  const faqItems = [
    {
      question: `Quantas paradas de recarga são necessárias entre ${displayOrigin} e ${displayDest}?`,
      answer: `Com uma distância de cerca de ${routeDistance.toFixed(0)} km, a maioria dos veículos elétricos modernos (com autonomia real de 250 a 400 km) precisará de ${Math.max(0, Math.ceil(routeDistance / 250) - 1)} parada(s) de recarga rápida para completar a viagem com conforto.`
    },
    {
      question: "Os carregadores da rota possuem o plugue compatível com o meu carro?",
      answer: "Sim. A imensa maioria dos pontos de recarga rápida ao longo das rodovias brasileiras possui conector CCS2 Combo (padrão utilizado por BYD, GWM, Volvo, BMW, etc.) e Tipo 2 para recarga em corrente alternada."
    },
    {
      question: "Qual o custo médio para recarregar a bateria durante este percurso?",
      answer: "O custo médio de recarga rápida DC em rodovias gira em torno de R$ 1,90 a R$ 2,80 por kWh consumido, o que torna o custo por quilômetro rodado significativamente inferior ao gasto com gasolina."
    },
    {
      question: "O que fazer se um ponto de recarga da rota estiver indisponível?",
      answer: "Recomendamos nunca descer abaixo de 20% de carga. Caso o ponto escolhido esteja indisponível, utilize a lista do BuscaCentral para prosseguir com segurança até a estação subsequente da rodovia."
    }
  ];

  const relatedTools = [
    {
      title: "Planejador de Viagens EV (Nova Rota)",
      url: "/localizacao/planejador-viagem-ev",
      description: "Planeje novas rotas rodoviárias para carros elétricos entre quaisquer cidades."
    },
    {
      title: "Eletropostos Perto de Mim",
      url: "/localizacao/carregador-eletrico/perto-de-mim",
      description: "Localize carregadores e estações próximas à sua posição GPS atual."
    },
    {
      title: "Distância entre Cidades",
      url: "/localizacao/distancia-cidades",
      description: "Calcule a distância rodoviária e consumo estimado entre municípios."
    }
  ];

  return (
    <ToolPageLayout
      title={`Rota EV: ${displayOrigin} ➔ ${displayDest} (${year})`}
      description={`Encontramos ${stations.length} pontos de recarga num trajeto rodoviário de ${routeDistance.toFixed(0)} km entre ${displayOrigin} e ${displayDest}.`}
      ariaLabel="Resultados do planejador de rota de carro elétrico"
      path={`/localizacao/planejador-viagem-ev/${origem}/${destino}`}
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Alterar Cidades da Rota:</h2>
          <PlanejadorSearch />
        </div>

        <EvProductCards
          title={`Equipamentos Recomendados para a Rota ${displayOrigin} ➔ ${displayDest}`}
          subtitle="Carregador portátil Tipo 2 bivolt e adaptadores recomendados para evitar imprevistos ao longo de qualquer trecho rodoviário."
        />

        {stations.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Eletropostos e Carregadores ao Longo do Trajeto ({stations.length}):
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stations.map((station) => (
                <StationCard key={station.ID} station={station} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-2xl mx-auto my-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
              <PlugIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Nenhum carregador encontrado na rota!
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Não conseguimos localizar eletropostos públicos ao longo dessa viagem específica num raio de 15 km da rodovia.
            </p>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
