import { Metadata } from "next";
import Link from "next/link";
import { fetchRouteChargers, OCMPointOfInterest } from "@/lib/openchargemap";
import { getCityBySlug } from "@/lib/distancia-cidades";
import AdBanner from "@/components/AdBanner";
import PlanejadorSearch from "../../PlanejadorSearch";

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

// Icons
const PlugIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M12 22v-5"/>
    <path d="M9 8V2"/>
    <path d="M15 8V2"/>
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-1 shrink-0">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 shrink-0">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
  </svg>
);

const NavigationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

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
            {routeData ? `Encontramos ${stations.length} pontos de recarga num trajeto de ${routeDistance.toFixed(0)} km.` : 'Traçando rota e buscando pontos de recarga...'}
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

// Re-use the StationCard from the other page, but keeping it here for simplicity
function StationCard({ station }: { station: OCMPointOfInterest }) {
  const address = station.AddressInfo;
  const operator = station.OperatorInfo?.Title || "Operador Desconhecido";
  const addressStr = [address.AddressLine1, address.Town, address.StateOrProvince].filter(Boolean).join(", ");
  
  // Aggregate connectors information
  const connectors = station.Connections || [];
  const powerLevels = connectors.map(c => c.PowerKW).filter((p): p is number => !!p);
  const maxPower = powerLevels.length > 0 ? Math.max(...powerLevels) : null;
  
  const connectorTypes = Array.from(
    new Set(connectors.map(c => c.ConnectionType?.Title).filter(Boolean))
  );

  // Status
  const isOperational = station.StatusType?.IsOperational;
  let statusBadge = (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
      Status Desconhecido
    </span>
  );
  if (isOperational === true) {
    statusBadge = (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
        Operacional
      </span>
    );
  } else if (isOperational === false) {
    statusBadge = (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <span className="w-2 h-2 mr-1.5 bg-red-500 rounded-full"></span>
        Inoperante
      </span>
    );
  }

  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${address.Latitude},${address.Longitude}`;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 pr-2">{operator}</h2>
          {statusBadge}
        </div>
        
        <div className="flex items-start text-gray-600 mb-4 text-sm">
          <MapPinIcon />
          <span className="ml-2 line-clamp-2">{addressStr}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Potência Máx</p>
            <p className="text-gray-900 font-medium flex items-center">
              <ZapIcon />
              <span className="ml-1">{maxPower ? `${maxPower} kW` : "Não informada"}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Conectores</p>
            <p className="text-gray-900 font-medium text-sm">
              {connectorTypes.length > 0 ? connectorTypes.join(", ") : "Não informado"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-5 pt-0 mt-auto">
        <a 
          href={mapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <NavigationIcon />
          Navegar via Google Maps
        </a>
      </div>
    </div>
  );
}
