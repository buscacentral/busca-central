import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchChargingStations, INTERNATIONAL_CITY_COORDS } from "@/lib/openchargemap";
import AdBanner from "@/components/AdBanner";
import CarregadorSearch from "../CarregadorSearch";
import { getCityBySlug, getInternationalCities } from "@/lib/distancia-cidades";
import { PlugIcon, NavigationIcon } from "@/components/ev/Icons";
import StationCard from "@/components/ev/StationCard";
import PertoDeMimClient from "../perto-de-mim/PertoDeMimClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

interface PageProps {
  params: Promise<{
    "cidade-uf": string;
  }>;
}

const TOP_CITIES_FALLBACK = [
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

function parseCidadeUfSlug(slug: string) {
  const parts = slug.split("-");
  const lastPart = parts.length > 1 ? parts.pop() || "" : "";
  const isCountry = lastPart.length > 2;
  const uf = isCountry 
    ? lastPart.replace(/\b\w/g, (char) => char.toUpperCase()) 
    : lastPart.toUpperCase();
  const cidadeStr = parts.join(" ");
  // Capitalize each word for display
  const cityName = cidadeStr.replace(/\b\w/g, (char) => char.toUpperCase());
  return { cityName, uf, isCountry };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams["cidade-uf"] || "";
  const normalizedSlug = rawSlug.toLowerCase().trim();

  if (normalizedSlug === "perto-de-mim") {
    return {
      title: 'Eletropostos Perto de Mim | Postos de Recarga Próximos',
      description: 'Encontre os eletropostos e postos de recarga para carros elétricos mais próximos de você. Veja localização, conectores, potência e rota no mapa.',
      keywords: 'eletroposto perto de mim, eletroposto perto, carregador eletrico perto de mim, posto de recarga perto, recarga BYD perto',
      alternates: {
        canonical: 'https://buscacentral.com.br/localizacao/carregador-eletrico/perto-de-mim',
      },
    };
  }
  
  const intlConfig = INTERNATIONAL_CITY_COORDS[normalizedSlug] ||
    (normalizedSlug.includes("buenos-aires") ? INTERNATIONAL_CITY_COORDS["buenos-aires-argentina"] : undefined);
  const cityData = getCityBySlug(normalizedSlug);
  const intlData = getInternationalCities().find(c => c.slug === normalizedSlug);
  
  let cityName = "";
  let uf = "";
  let isCountry = false;
  
  if (cityData) {
    cityName = cityData.n;
    uf = cityData.u;
  } else if (intlData) {
    cityName = intlData.n;
    uf = intlData.u;
    isCountry = true;
  } else {
    const parsed = parseCidadeUfSlug(normalizedSlug);
    cityName = parsed.cityName;
    uf = parsed.uf;
    isCountry = parsed.isCountry;
  }
  const displayLocation = isCountry ? `${cityName} (${uf})` : (uf ? `${cityName} - ${uf}` : cityName);
  const year = new Date().getFullYear();

  const title = `Carregador Elétrico em ${displayLocation} | Eletropostos Próximos`;
  const description = `Encontre eletropostos e postos de recarga em ${displayLocation}. Compatível com BYD (Dolphin/Seal), GWM, EZVolt, Volvo e mais. Veja conectores, potência e rotas.`;
  const keywords = `carregador eletrico ${cityName}, eletroposto ${cityName}, recarga BYD ${cityName}, EZVolt ${cityName}, postos de recarga ${uf || cityName}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://buscacentral.com.br/localizacao/carregador-eletrico/${normalizedSlug}`
    },
    openGraph: {
      title,
      description,
      url: `https://buscacentral.com.br/localizacao/carregador-eletrico/${normalizedSlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CarregadorEletricoPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams["cidade-uf"] || "";
  const normalizedSlug = rawSlug.toLowerCase().trim();

  if (normalizedSlug === "perto-de-mim") {
    return (
      <PertoDeMimClient
        initialStations={[]}
        hasCoords={false}
        topCities={TOP_CITIES_FALLBACK}
      />
    );
  }
  
  const intlConfig = INTERNATIONAL_CITY_COORDS[normalizedSlug] ||
    (normalizedSlug.includes("buenos-aires") ? INTERNATIONAL_CITY_COORDS["buenos-aires-argentina"] : undefined);
  const cityData = getCityBySlug(normalizedSlug);
  const intlData = getInternationalCities().find(c => c.slug === normalizedSlug);
  
  let cidade = "";
  let uf = "";
  let isCountry = false;
  let lat: number | undefined = undefined;
  let lon: number | undefined = undefined;
  let countryCode: string | undefined = undefined;
  let radiusKm = 30;
  
  if (intlConfig) {
    lat = intlConfig.lat;
    lon = intlConfig.lng;
    countryCode = intlConfig.countryCode;
    radiusKm = intlConfig.radiusKm;
    if (intlData) {
      cidade = intlData.n;
      uf = intlData.u;
      isCountry = true;
    } else {
      const parsed = parseCidadeUfSlug(normalizedSlug);
      cidade = parsed.cityName;
      uf = parsed.uf;
      isCountry = parsed.isCountry;
    }
  } else if (cityData) {
    cidade = cityData.n;
    uf = cityData.u;
    lat = cityData.lat;
    lon = cityData.lon;
    countryCode = "BR";
  } else if (intlData) {
    cidade = intlData.n;
    uf = intlData.u;
    lat = intlData.lat;
    lon = intlData.lon;
    isCountry = true;
  } else {
    const parsed = parseCidadeUfSlug(normalizedSlug);
    cidade = parsed.cityName;
    uf = parsed.uf;
    isCountry = parsed.isCountry;
  }

  // Fail-safe direct coordinates for Buenos Aires if lat/lon were missed
  if (normalizedSlug.includes("buenos-aires") && (lat === undefined || lon === undefined)) {
    lat = -34.6037;
    lon = -58.3816;
    countryCode = "AR";
    radiusKm = 30;
    cidade = "Buenos Aires";
    uf = "Argentina";
    isCountry = true;
  }

  const displayLocation = isCountry ? `${cidade} (${uf})` : (uf ? `${cidade} - ${uf}` : cidade);

  // Fetch charging stations with options object
  const stations = await fetchChargingStations({
    cityName: cidade,
    uf,
    latitude: lat,
    longitude: lon,
    countryCode,
    distance: radiusKm,
  });

  console.log('[EV Page] Slug:', normalizedSlug, 'Coords:', { lat, lon, countryCode, radiusKm }, 'Stations count:', stations?.length);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CivicStructure",
    "name": `Eletropostos em ${displayLocation}`,
    "description": `Estações de recarga para carros elétricos em ${displayLocation}, compatíveis com BYD, GWM, EZVolt e principais redes de recarga.`,
    "url": `https://buscacentral.com.br/localizacao/carregador-eletrico/${normalizedSlug}`,
    "dateModified": "2026-08-16",
    "keywords": `carregador eletrico ${cidade}, eletroposto ${cidade}, recarga BYD ${cidade}, EZVolt ${cidade}, postos de recarga ${uf || cidade}`,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center md:justify-start gap-3">
            <PlugIcon />
            Eletropostos na região de {displayLocation}
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Encontre carregadores para veículos elétricos, verifique a potência, conectores disponíveis e como chegar.
          </p>
          <time dateTime="2026-08-16" className="text-xs text-gray-500 block mb-4">Atualizado em: 16 de agosto de 2026</time>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3.5 mb-6 text-sm text-blue-900 flex items-start sm:items-center gap-2.5 shadow-sm">
            <span className="inline-block p-1 bg-blue-100 rounded text-blue-700 font-semibold text-xs shrink-0 mt-0.5 sm:mt-0">
              Compatibilidade
            </span>
            <span className="leading-relaxed">
              Compatível com conectores <strong>Type 2 / CCS2</strong> — Ideal para modelos <strong>BYD (Dolphin, Seal, King)</strong>, <strong>GWM (Ora 5)</strong>, Volvo, BMW e redes públicas (<strong>EZVolt</strong>, Shell Recharge, Enel X).
            </span>
          </div>
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

        {/* Callout Box: Eletropostos Perto de Mim */}
        <div className="my-8 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Procurando postos na sua localização atual?
            </h3>
            <p className="text-gray-600 text-sm">
              Acesse Eletropostos Perto de Mim e encontre recargas pelo GPS em tempo real.
            </p>
          </div>
          <Link
            href="/localizacao/carregador-eletrico/perto-de-mim"
            className="shrink-0 inline-flex items-center justify-center py-2.5 px-5 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Eletropostos Perto de Mim 📍
          </Link>
        </div>

        {/* AdSense Placement: Mid-Content / Above SEO Footer */}
        <div className="mt-8 w-full min-h-[100px] flex justify-center">
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
              É highly recomendável ter os aplicativos das principais redes de recarga já instalados e configurados no seu celular. Mantenha a bateria entre 20% e 80% para otimizar o tempo de recarga rápida nas estradas.
            </p>
          </div>
        </section>
      </main>
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

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-600 text-sm">
          Grandes polos regionais e capitais costumam concentrar a infraestrutura de recarga. Considere buscar nas cidades polos mais próximas a {cidade} utilizando a barra de busca acima.
        </p>
      </div>
    </div>
  );
}
