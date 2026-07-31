import { Metadata } from "next";
import Link from "next/link";
import { fetchRouteChargers, OCMPointOfInterest } from "@/lib/openchargemap";
import { getCityBySlug } from "@/lib/distancia-cidades";
import AdBanner from "@/components/AdBanner";
import PlanejadorSearch from "../../PlanejadorSearch";
import { PlugIcon } from "@/components/ev/Icons";
import StationCard from "@/components/ev/StationCard";

interface PageProps {
  params: Promise<{
    origem: string;
    destino: string;
  }>;
}

function parseCidadeUf(slug: string) {
  const parts = slug.split("-");
  const uf = parts.length > 1 ? parts.pop()?.toUpperCase() || "" : "";
  const cidadeStr = parts.join(" ");
  const cidade = cidadeStr.replace(/\b\w/g, (char) => char.toUpperCase());
  return { cidade, uf };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { origem, destino } = resolvedParams;
  
  const originParsed = parseCidadeUf(origem);
  const destParsed = parseCidadeUf(destino);
  
  const displayOrigin = originParsed.uf ? `${originParsed.cidade}-${originParsed.uf}` : originParsed.cidade;
  const displayDest = destParsed.uf ? `${destParsed.cidade}-${destParsed.uf}` : destParsed.cidade;

  return {
    title: `Carregadores Elétricos na Rota de ${displayOrigin} para ${displayDest} | BuscaCentral`,
    description: `Planeje sua viagem de carro elétrico de ${displayOrigin} até ${displayDest}. Veja todos os pontos de recarga e eletropostos disponíveis ao longo da rodovia.`,
  };
}

async function getRoutePolyline(lon1: number, lat1: number, lon2: number, lat2: number): Promise<{ polyline: string, distanceKm: number } | null> {
  try {
    // OSRM uses lon,lat
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
    console.error("Error fetching OSRM route:", err);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center md:text-left">
          <Link href="/localizacao/planejador-viagem-ev" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para Nova Busca
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-3">
              <PlugIcon />
              <span>Rota EV:</span>
            </div>
            <span className="text-blue-700">{displayOrigin}</span>
            <svg className="w-6 h-6 text-gray-400 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="text-blue-700">{displayDest}</span>
          </h1>
          
          <p className="text-gray-600 text-lg mb-6">
            {routeData ? `Encontramos ${stations.length} pontos de recarga num trajeto de ${routeDistance.toFixed(0)} km.` : 'Não foi possível traçar a rota rodoviária entre essas cidades.'}
          </p>
          
          <div className="max-w-4xl mx-auto md:mx-0">
            <PlanejadorSearch />
          </div>
        </header>

        {/* AdSense Placement */}
        <div className="my-8">
          <AdBanner adSlot="auto" adFormat="auto" />
        </div>

        {stations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stations.map((station) => (
              <StationCard key={station.ID} station={station} />
            ))}
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
              Não conseguimos localizar eletropostos públicos ao longo dessa viagem específica. É possível que este trecho ainda não conte com infraestrutura rápida.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}


