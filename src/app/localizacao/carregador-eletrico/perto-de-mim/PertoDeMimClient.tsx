'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { OCMPointOfInterest } from '@/lib/openchargemap';
import StationCard from '@/components/ev/StationCard';
import CarregadorSearch from '../CarregadorSearch';
import AdBanner from '@/components/AdBanner';
import { PlugIcon } from '@/components/ev/Icons';
import EvProductCards from '@/components/affiliate/EvProductCards';

interface CityItem {
  nome: string;
  slug: string;
}

interface PertoDeMimClientProps {
  initialStations: OCMPointOfInterest[];
  hasCoords: boolean;
  topCities: CityItem[];
  userLat?: number;
  userLng?: number;
}

type FilterType = 'todos' | 'rapida' | 'tipo2' | 'gratuito';

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function isFastCharger(station: OCMPointOfInterest): boolean {
  const connectors = station.Connections || [];
  return connectors.some((c) => {
    const power = c.PowerKW ?? 0;
    const title = (c.ConnectionType?.Title || '').toLowerCase();
    return (
      power >= 30 ||
      title.includes('ccs') ||
      title.includes('combo') ||
      title.includes('dc') ||
      title.includes('chademo') ||
      title.includes('fast') ||
      [33, 2, 32, 1002, 1003, 1004].includes(c.ConnectionTypeID)
    );
  });
}

function isType2Charger(station: OCMPointOfInterest): boolean {
  const connectors = station.Connections || [];
  return connectors.some((c) => {
    const title = (c.ConnectionType?.Title || '').toLowerCase();
    return (
      title.includes('type 2') ||
      title.includes('tipo 2') ||
      title.includes('mennekes') ||
      c.ConnectionTypeID === 25 ||
      (c.PowerKW !== undefined && c.PowerKW < 30)
    );
  });
}

function isFreeCharger(station: OCMPointOfInterest): boolean {
  const cost = (station.UsageCost || '').toLowerCase();
  if (!cost) return false;
  return (
    cost.includes('grátis') ||
    cost.includes('gratis') ||
    cost.includes('gratuito') ||
    cost.includes('free') ||
    cost.includes('cortesia') ||
    cost.includes('sem custo') ||
    cost === '0'
  );
}

export default function PertoDeMimClient({
  initialStations,
  hasCoords: initialHasCoords,
  topCities,
  userLat,
  userLng,
}: PertoDeMimClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');

  const currentLat = userLat ?? (latParam ? parseFloat(latParam) : undefined);
  const currentLng = userLng ?? (lngParam ? parseFloat(lngParam) : undefined);
  const hasCoords = initialHasCoords || (currentLat !== undefined && !isNaN(currentLat) && currentLng !== undefined && !isNaN(currentLng));

  const [isLocating, setIsLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');

  // Trigger GPS Geolocation
  const requestLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocError('Geolocalização não é suportada pelo seu navegador.');
      return;
    }

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
          setLocError('Permissão de GPS negada. Ative a localização no seu navegador ou escolha sua cidade manualmente abaixo:');
        } else {
          setLocError('Não foi possível obter sua localização GPS. Escolha sua cidade abaixo:');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [router]);

  // Automatic Geolocation Trigger on Mount if coords are missing
  useEffect(() => {
    if (!hasCoords && !locError) {
      requestLocation();
    }
  }, [hasCoords, locError, requestLocation]);

  // Compute stations with distances and sort by proximity
  const processedStations = useMemo(() => {
    return initialStations.map((station) => {
      let distanceKm: number | undefined = undefined;
      if (currentLat !== undefined && currentLng !== undefined && station.AddressInfo?.Latitude && station.AddressInfo?.Longitude) {
        distanceKm = haversineDistanceKm(
          currentLat,
          currentLng,
          station.AddressInfo.Latitude,
          station.AddressInfo.Longitude
        );
      } else if (station.AddressInfo?.Distance !== undefined) {
        distanceKm = station.AddressInfo.Distance;
      }
      return {
        ...station,
        computedDistance: distanceKm,
      };
    }).sort((a, b) => {
      const distA = a.computedDistance ?? 9999;
      const distB = b.computedDistance ?? 9999;
      return distA - distB;
    });
  }, [initialStations, currentLat, currentLng]);

  // Filter counts
  const filterCounts = useMemo(() => {
    return {
      todos: processedStations.length,
      rapida: processedStations.filter(isFastCharger).length,
      tipo2: processedStations.filter(isType2Charger).length,
      gratuito: processedStations.filter(isFreeCharger).length,
    };
  }, [processedStations]);

  // Filtered station list
  const filteredStations = useMemo(() => {
    switch (activeFilter) {
      case 'rapida':
        return processedStations.filter(isFastCharger);
      case 'tipo2':
        return processedStations.filter(isType2Charger);
      case 'gratuito':
        return processedStations.filter(isFreeCharger);
      case 'todos':
      default:
        return processedStations;
    }
  }, [processedStations, activeFilter]);

  const h1Title = hasCoords ? 'Eletropostos Próximos de Você 📍' : 'Localizar Eletropostos Perto de Mim 📍';

  return (
    <div className="w-full">
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 flex items-center justify-center gap-3">
          <PlugIcon />
          <span>{h1Title}</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6">
          Encontre estações de recarga rápida e convencional (BYD, GWM, Volvo, BMW, EZVolt, Shell) com rotas diretas no GPS.
        </p>

        {/* ─── ONE-TAP GPS HERO BUTTON ─── */}
        <div className="max-w-xl mx-auto mb-6">
          <button
            type="button"
            onClick={requestLocation}
            disabled={isLocating}
            className="group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-xl active:scale-[0.99] transition-all disabled:opacity-75"
          >
            {isLocating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Detectando sua localização GPS...</span>
              </>
            ) : (
              <>
                <span className="text-2xl">📍</span>
                <span>Encontrar Eletropostos Mais Próximos de Mim</span>
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {hasCoords
              ? 'Localização ativa por GPS. Toque acima para recalcular a sua posição atual.'
              : 'Detecção rápida e segura via GPS. Nenhuma informação pessoal é armazenada.'}
          </p>
        </div>

        {/* Status / Error Fallback Alert */}
        {locError && !hasCoords && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-5 mb-8 max-w-xl mx-auto text-center space-y-3 shadow-sm">
            <p className="font-bold text-base flex items-center justify-center gap-2">
              <span>⚠️</span> {locError}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={requestLocation}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
              >
                <span>Tentar Ativar GPS Novamente</span>
                <span>🔄</span>
              </button>
            </div>
          </div>
        )}

        {/* Fallback Manual City Selector */}
        <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 mb-8 text-left">
          <label htmlFor="city-search-input" className="block text-sm font-bold text-slate-800 mb-2">
            🔍 Ou pesquise por cidade manualmente:
          </label>
          <CarregadorSearch />
        </div>
      </header>

      {/* ─── RESULTS SECTION ─── */}
      {hasCoords && (
        <section className="mb-12">
          {/* Header of results with filter pills */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>⚡</span>
                  <span>Eletropostos Encontrados ({filteredStations.length})</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Ordenados pela menor distância calculada até você (raio de ~35 km)
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                GPS Ativo
              </span>
            </div>

            {/* ─── FILTER PILLS ─── */}
            <div className="flex flex-wrap items-center gap-2 pt-1" role="tablist" aria-label="Filtros de tipo de eletroposto">
              <button
                type="button"
                onClick={() => setActiveFilter('todos')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                  activeFilter === 'todos'
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Todos</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === 'todos' ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {filterCounts.todos}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('rapida')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                  activeFilter === 'rapida'
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>⚡ Recarga Rápida (DC / CCS2)</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === 'rapida' ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {filterCounts.rapida}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('tipo2')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                  activeFilter === 'tipo2'
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>🔌 Tipo 2 (AC)</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === 'tipo2' ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {filterCounts.tipo2}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('gratuito')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
                  activeFilter === 'gratuito'
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>🎁 Gratuito</span>
                {filterCounts.gratuito > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === 'gratuito' ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {filterCounts.gratuito}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredStations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStations.map((station) => (
                <StationCard
                  key={station.ID}
                  station={station}
                  distanceKm={station.computedDistance}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
              <p className="text-gray-800 text-lg font-bold mb-2">
                Nenhum eletroposto corresponde ao filtro selecionado.
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Tente selecionar outro filtro de conector acima ou amplie a busca selecionando uma cidade polo.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter('todos')}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Ver todos os eletropostos ({filterCounts.todos})
              </button>
            </div>
          )}
        </section>
      )}

      {/* ─── EXISTING MONETIZATION AFFILIATE COMPONENT ─── */}
      <EvProductCards
        title="Equipamentos e Acessórios Recomendados para seu Carro Elétrico"
        subtitle="Itens indispensáveis para viagens tranquilas, recargas em qualquer lugar e proteção do seu veículo elétrico."
        className="my-10"
      />

      {/* Top Cities Grid */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mt-10">
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
              className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
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
    </div>
  );
}
