'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { OCMPointOfInterest } from '@/lib/openchargemap';
import StationCard from '@/components/ev/StationCard';
import CarregadorSearch from '../CarregadorSearch';
import LocationButton from '@/components/ev/LocationButton';
import AdBanner from '@/components/AdBanner';
import { PlugIcon } from '@/components/ev/Icons';

interface CityItem {
  nome: string;
  slug: string;
}

interface PertoDeMimClientProps {
  initialStations: OCMPointOfInterest[];
  hasCoords: boolean;
  topCities: CityItem[];
}

export default function PertoDeMimClient({
  initialStations,
  hasCoords: initialHasCoords,
  topCities,
}: PertoDeMimClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');
  const hasCoords = initialHasCoords || (!!latParam && !!lngParam);

  const [isLocating, setIsLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  // Automatic Geolocation Trigger on Mount if coords are missing
  useEffect(() => {
    if (hasCoords) return;
    if (typeof window === 'undefined' || !navigator.geolocation) return;

    setIsLocating(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        router.replace(
          `/localizacao/carregador-eletrico/perto-de-mim?lat=${latitude.toFixed(6)}&lng=${longitude.toFixed(6)}`
        );
      },
      (error) => {
        console.warn('[PertoDeMim] Geolocation error/denied:', error);
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocError('Ative a localização para ver postos na sua cidade');
        } else {
          setLocError('Não foi possível obter sua localização automaticamente. Escolha sua cidade abaixo:');
        }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, [hasCoords, router]);

  // Explicit H1 Title
  const h1Title = hasCoords ? 'Eletropostos na sua Região 📍' : 'Eletropostos Próximos de Você 📍';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CivicStructure',
    'name': 'Eletropostos Perto de Mim',
    'description': 'Estações de recarga de veículos elétricos mais próximas por geolocalização.',
    'url': 'https://buscacentral.com.br/localizacao/carregador-eletrico/perto-de-mim',
    'keywords': 'eletroposto perto de mim, eletroposto perto, carregador eletrico perto de mim, posto de recarga perto',
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full">
        <header className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <PlugIcon />
            {h1Title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Localize postos de recarga para carros elétricos (BYD, GWM, Volvo, BMW, EZVolt) mais próximos da sua posição atual.
          </p>

          {/* Banner de Status ou Ação de Geolocalização */}
          {isLocating && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 mb-6 max-w-xl mx-auto flex items-center justify-center gap-3 shadow-sm">
              <svg className="animate-spin h-5 w-5 text-blue-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="font-medium text-sm">Obtendo sua localização GPS em tempo real...</span>
            </div>
          )}

          {locError && !hasCoords && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 mb-6 max-w-xl mx-auto text-center space-y-3 shadow-sm">
              <p className="font-bold text-base flex items-center justify-center gap-2">
                <span>📍</span> Ative a localização para ver postos na sua cidade
              </p>
              <p className="text-sm text-amber-800">
                Seu navegador não compartilhou o GPS. Clique abaixo para ativar ou selecione sua cidade na busca:
              </p>
              <div className="pt-1">
                <LocationButton variant="hero" />
              </div>
            </div>
          )}

          {!hasCoords && !isLocating && !locError && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8 max-w-xl mx-auto">
              <LocationButton variant="hero" />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Acesso seguro via GPS do seu navegador. Nenhuma informação pessoal é armazenada.
              </p>
            </div>
          )}

          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-medium text-gray-500 mb-2">Ou pesquise sua cidade manualmente:</p>
            <CarregadorSearch />
          </div>
        </header>

        {hasCoords && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Eletropostos Encontrados ({initialStations.length})
              </h2>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Raio de ~35 km
              </span>
            </div>

            {initialStations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {initialStations.map((station) => (
                  <StationCard key={station.ID} station={station} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-800 text-lg font-bold mb-2">
                  Nenhum eletroposto cadastrado diretamente no seu raio GPS atual.
                </p>
                <p className="text-gray-600 text-sm">
                  Utilize a busca por cidade acima ou selecione uma cidade polo da região nas opções abaixo.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Top Cities Grid */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Principais Cidades com Postos de Recarga
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Selecione sua cidade ou região para ver a lista completa de carregadores elétricos:
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

        {/* SEO Text Block */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Como encontrar o eletroposto mais próximo de você?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Com a rápida expansão dos carros elétricos (VEs) e híbridos plug-in no Brasil — liderados por BYD (Dolphin, King, Seal), GWM (Ora 5), Volvo, BMW e redes públicas como EZVolt e Shell Recharge —, saber exatamente onde recarregar é essencial.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ao utilizar o recurso de <strong>geolocalização por GPS</strong>, o BuscaCentral consulta em tempo real a API OpenChargeMap para filtrar apenas as estações ativas num raio aproximado de 35 km de onde você se encontra, exibindo conectores (Tipo 2, CCS2), potência (kW) e rota direta no Google Maps.
          </p>
        </section>
      </div>
    </div>
  );
}
