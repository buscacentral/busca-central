import { Metadata } from "next";
import Link from "next/link";
import { fetchChargingStations, OCMPointOfInterest } from "@/lib/openchargemap";
import AdBanner from "@/components/AdBanner";
import CarregadorSearch from "../CarregadorSearch";
import { getCityBySlug } from "@/lib/distancia-cidades";

interface PageProps {
  params: Promise<{
    "cidade-uf": string;
  }>;
}

function parseCidadeUf(slug: string) {
  const parts = slug.split("-");
  const uf = parts.length > 1 ? parts.pop()?.toUpperCase() || "" : "";
  const cidadeStr = parts.join(" ");
  // Capitalize each word for display
  const cidade = cidadeStr.replace(/\b\w/g, (char) => char.toUpperCase());
  return { cidade, uf };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams["cidade-uf"];
  const { cidade, uf } = parseCidadeUf(slug);
  const displayLocation = uf ? `${cidade}-${uf}` : cidade;

  return {
    title: `Carregadores Elétricos em ${displayLocation}: Eletropostos e Recarga (2026)`,
    description: `Encontre pontos de recarga e eletropostos para carros elétricos em ${displayLocation}. Veja endereços, conectores, potência em kW e como chegar.`,
  };
}

// Helper for SVGs to keep it standalone
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

export default async function CarregadorEletricoPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams["cidade-uf"];
  const { cidade, uf } = parseCidadeUf(slug);
  const displayLocation = uf ? `${cidade} - ${uf}` : cidade;

  const cityData = getCityBySlug(slug);

  // We fetch without accents/special chars in town if possible, or directly with the parsed one.
  const stations = await fetchChargingStations(cidade, uf, cityData?.lat, cityData?.lon);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center md:justify-start gap-3">
            <PlugIcon />
            Eletropostos na região de {displayLocation}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Encontre carregadores para veículos elétricos, verifique a potência, conectores disponíveis e como chegar.
          </p>
          <div className="max-w-2xl mx-auto md:mx-0">
            <CarregadorSearch />
          </div>
        </header>

        {stations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stations.map((station) => (
              <StationCard key={station.ID} station={station} />
            ))}
          </div>
        ) : (
          <FallbackCard cidade={cidade} uf={uf} />
        )}

        {/* AdSense Placement: Mid-Content / Above SEO Footer */}
        <div className="mt-8">
          <AdBanner adSlot="auto" adFormat="auto" />
        </div>

        {/* SEO Semantic Footer Text (AdSense Compliance) */}
        <section className="mt-16 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como funciona a recarga de veículos elétricos em {cidade}</h2>
            <p className="text-gray-700 leading-relaxed">
              O ecossistema de mobilidade elétrica no Brasil vem crescendo rapidamente. Em {cidade}, motoristas de carros elétricos (VEs) ou híbridos plug-in podem utilizar pontos de recarga públicos ou semipúblicos, muitas vezes localizados em postos de combustível, shoppings, supermercados e estacionamentos particulares. A utilização geralmente é feita através de aplicativos específicos de cada rede (como Shell Recharge, Tupinambá, entre outros) ou por cartões RFID. É essencial verificar no aplicativo a disponibilidade do carregador em tempo real antes de se deslocar.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Diferenças entre carregadores AC e DC</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ao procurar um eletroposto, você encontrará principalmente duas categorias de recarga:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>Corrente Alternada (AC):</strong> Conhecida como carga semi-rápida (geralmente entre 7 kW e 22 kW). Ideal para quando o carro ficará estacionado por algumas horas, como durante o trabalho ou compras no shopping. Utiliza principalmente o conector Tipo 2.</li>
              <li><strong>Corrente Contínua (DC):</strong> Conhecida como carga rápida ou ultra-rápida (de 50 kW a mais de 350 kW). Apropriada para viagens ou recargas de emergência, podendo carregar a bateria de 20% a 80% em 30-40 minutos na maioria dos modelos. Utiliza conectores CCS2 ou CHAdeMO.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dicas para viagens longas com carros elétricos em 2026</h2>
            <p className="text-gray-700 leading-relaxed">
              Viajar de carro elétrico exige planejamento, especialmente se {cidade} for uma de suas paradas. 
              Sempre mapeie a rota com antecedência identificando carregadores DC pelo caminho. Tenha planos de contingência (um carregador secundário) caso o ponto principal esteja inoperante ou ocupado. 
              É altamente recomendável ter os aplicativos das principais redes de recarga já instalados e configurados no seu celular. Mantenha a bateria entre 20% e 80% para otimizar o tempo de recarga rápida nas estradas.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

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
        Com Defeito / Inoperante
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

function FallbackCard({ cidade, uf }: { cidade: string, uf: string }) {
  const searchQuery = `eletropostos carregador eletrico em ${cidade} ${uf}`;
  const mapSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-2xl mx-auto my-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
        <PlugIcon />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Nenhum eletroposto cadastrado diretamente em {cidade}{uf ? ` - ${uf}` : ""} até o momento.
      </h2>
      <p className="text-gray-600 mb-8 text-lg">
        A base de dados pública pode ainda não ter registrado pontos nesta localização, ou os carregadores podem estar concentrados em cidades vizinhas e rodovias da região.
      </p>
      
      <div className="space-y-4">
        <a 
          href={mapSearchUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
        >
          <NavigationIcon />
          Buscar no Google Maps
        </a>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100 text-left">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">Procurando recarga em outra cidade?</h3>
        <p className="text-gray-600 text-sm text-center mb-6">
          Grandes polos regionais e capitais costumam concentrar a infraestrutura de recarga (eletropostos rápidos DC e AC). Considere buscar nas cidades polos mais próximas a {cidade} para planejar sua rota com segurança.
        </p>
        <CarregadorSearch />
      </div>
    </div>
  );
}
