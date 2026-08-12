import { Metadata } from 'next';
import Link from 'next/link';
import { fetchChargingStations } from '@/lib/openchargemap';
import StationCard from '@/components/ev/StationCard';
import CarregadorSearch from '../CarregadorSearch';
import LocationButton from '@/components/ev/LocationButton';
import AdBanner from '@/components/AdBanner';
import { PlugIcon } from '@/components/ev/Icons';

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
  const title = 'Eletropostos Perto de Mim | Postos de Recarga Próximos';
  const description = 'Encontre os eletropostos e postos de recarga para carros elétricos mais próximos de você. Veja localização, conectores, potência e rota no mapa.';
  const keywords = 'eletroposto perto de mim, eletroposto perto, carregador eletrico perto de mim, posto de recarga perto, recarga BYD perto';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: 'https://buscacentral.com.br/localizacao/carregador-eletrico/perto-de-mim',
    },
    openGraph: {
      title,
      description,
      url: 'https://buscacentral.com.br/localizacao/carregador-eletrico/perto-de-mim',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function EletropostoPertoDeMimPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const latStr = resolvedParams?.lat;
  const lngStr = resolvedParams?.lng;

  const latNum = latStr ? parseFloat(latStr) : undefined;
  const lngNum = lngStr ? parseFloat(lngStr) : undefined;
  const hasCoords = latNum !== undefined && !isNaN(latNum) && lngNum !== undefined && !isNaN(lngNum);

  let stations: Awaited<ReturnType<typeof fetchChargingStations>> = [];

  if (hasCoords) {
    stations = await fetchChargingStations({
      latitude: latNum,
      longitude: lngNum,
      distance: 35,
    });

    // Sort by distance ascending
    stations.sort((a, b) => {
      const distA = a.AddressInfo?.Distance ?? 999;
      const distB = b.AddressInfo?.Distance ?? 999;
      return distA - distB;
    });
  }

  const topCities = [
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CivicStructure',
    'name': 'Eletropostos Perto de Mim - BuscaCentral',
    'description': 'Localizador de estações de recarga de veículos elétricos mais próximas por geolocalização.',
    'url': 'https://buscacentral.com.br/localizacao/carregador-eletrico/perto-de-mim',
    'keywords': 'eletroposto perto de mim, eletroposto perto, carregador eletrico perto de mim, posto de recarga perto',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <PlugIcon />
            Eletropostos Perto de Mim
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Localize instantaneamente postos de recarga para carros elétricos (BYD, GWM, Volvo, BMW, Porsche) mais próximos da sua localização atual.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8 max-w-xl mx-auto">
            <LocationButton variant="hero" />
            <p className="text-xs text-gray-500 mt-3 text-center">
              Acesso seguro via GPS do navegador. Nenhuma informação pessoal é armazenada.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-medium text-gray-500 mb-2">Ou digite uma cidade manualmente:</p>
            <CarregadorSearch />
          </div>
        </header>

        {hasCoords ? (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Eletropostos Encontrados ({stations.length})
              </h2>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Raio de ~35 km
              </span>
            </div>

            {stations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stations.map((station) => (
                  <StationCard key={station.ID} station={station} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-700 text-lg font-medium mb-2">
                  Nenhum eletroposto cadastrado diretamente no seu raio atual.
                </p>
                <p className="text-gray-500 text-sm">
                  Tente buscar por um grande polo regional ou capital nas opções abaixo.
                </p>
              </div>
            )}
          </section>
        ) : null}

        {/* Top Cities Grid */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Principais Cidades com Eletropostos em Operação
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Se preferir, selecione diretamente sua cidade ou região para ver todos os pontos de recarga disponíveis:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {topCities.map((cidade) => (
              <Link
                key={cidade.slug}
                href={`/localizacao/carregador-eletrico/${cidade.slug}`}
                className="flex items-center justify-between p-3.5 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-blue-600 text-sm">
                  {cidade.nome}
                </span>
                <span aria-hidden="true" className="text-gray-400 group-hover:text-blue-500 text-sm">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* AdSense Placement */}
        <div className="mt-8 w-full min-h-[100px] flex justify-center">
          <AdBanner adSlot="auto" adFormat="auto" />
        </div>

        {/* SEO Text */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Como encontrar o eletroposto perto de mim em 2026?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Com a rápida popularização dos carros elétricos (VEs) no Brasil — impulsionada por marcas como BYD (Dolphin, King, Seal), GWM (Ora 5), Volvo, BMW e Renault —, a necessidade de localizar postos de recarga próximos se tornou parte da rotina diária dos motoristas.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Utilizando o botão <strong>&ldquo;Usar Minha Localização Atual&rdquo;</strong> acima, nossa ferramenta consulta em tempo real os eletropostos num raio de até 35 km da sua posição geográfica. Você terá acesso aos detalhes dos conectores (Tipo 2, CCS2, CHAdeMO), potência em kW e link direto para navegar via Google Maps ou Waze.
          </p>
        </section>
      </main>
    </div>
  );
}
