import { Metadata } from 'next';
import { fetchChargingStations } from '@/lib/openchargemap';
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

  return (
    <PertoDeMimClient
      initialStations={stations}
      hasCoords={hasCoords}
      topCities={topCities}
    />
  );
}
