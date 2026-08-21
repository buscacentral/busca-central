'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { calcularCustoViagem, sanitizeNumber } from '@/lib/viagem-logic';
import { formatCurrency, formatDecimal } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { ResultCard } from '@/components/ui/ResultCard';
import { Alert } from '@/components/ui/Alert';
import { EmptyState } from '@/components/ui/EmptyState';

interface City {
  n: string;
  u: string;
  lat: number;
  lon: number;
}

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function toCitySlug(nome: string, uf: string): string {
  const base = normalizeText(nome)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${base}-${uf.toLowerCase()}`;
}

export default function DistanciaCidadesClient() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [filteredOrigin, setFilteredOrigin] = useState<City[]>([]);
  const [filteredDest, setFilteredDest] = useState<City[]>([]);
  const [originSearch, setOriginSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');
  const [originCity, setOriginCity] = useState<City | null>(null);
  const [destCity, setDestCity] = useState<City | null>(null);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [result, setResult] = useState<{ distance: number; estimatedRoad: number } | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState('');
  const [consumo, setConsumo] = useState('10');
  const [precoGasolina, setPrecoGasolina] = useState('6.00');
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/localizacao/distancia-cidades/cidades.json')
      .then(res => res.json())
      .then((data: City[]) => setCities(data))
      .catch(() => setError('Erro ao carregar cidades'));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(e.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterCities = useCallback((search: string) => {
    if (search.length < 2) return [];
    const normSearch = normalizeText(search);
    return cities
      .filter(c =>
        normalizeText(c.n).includes(normSearch) ||
        normalizeText(c.u) === normSearch ||
        normalizeText(`${c.n} ${c.u}`).includes(normSearch) ||
        normalizeText(`${c.n} - ${c.u}`).includes(normSearch)
      )
      .sort((a, b) => {
        const aNorm = normalizeText(a.n);
        const bNorm = normalizeText(b.n);
        const aExact = aNorm === normSearch ? -1 : 0;
        const bExact = bNorm === normSearch ? -1 : 0;
        if (aExact !== bExact) return aExact - bExact;

        const aStarts = aNorm.startsWith(normSearch) ? 0 : 1;
        const bStarts = bNorm.startsWith(normSearch) ? 0 : 1;
        return aStarts - bStarts;
      })
      .slice(0, 10);
  }, [cities]);

  const handleOriginSearch = (value: string) => {
    setOriginSearch(value);
    setOriginCity(null);
    setResult(null);
    setFilteredOrigin(filterCities(value));
    setShowOriginDropdown(value.length >= 2);
  };

  const handleDestSearch = (value: string) => {
    setDestSearch(value);
    setDestCity(null);
    setResult(null);
    setFilteredDest(filterCities(value));
    setShowDestDropdown(value.length >= 2);
  };

  const selectOrigin = (city: City) => {
    setOriginCity(city);
    setOriginSearch(`${city.n} - ${city.u}`);
    setShowOriginDropdown(false);
  };

  const selectDest = (city: City) => {
    setDestCity(city);
    setDestSearch(`${city.n} - ${city.u}`);
    setShowDestDropdown(false);
  };

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const normText = normalizeText(text);
    const normSearch = normalizeText(search);
    const index = normText.indexOf(normSearch);
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <strong className="text-blue-600 font-bold">{text.slice(index, index + search.length)}</strong>
        {text.slice(index + search.length)}
      </>
    );
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const handleCalculate = async () => {
    setError('');

    if (!originCity || !destCity) {
      setError('Selecione duas cidades válidas');
      return;
    }

    if (originCity.n === destCity.n && originCity.u === destCity.u) {
      setError('Selecione cidades diferentes');
      return;
    }

    setCalculating(true);

    const slugOrigem = toCitySlug(originCity.n, originCity.u);
    const slugDestino = toCitySlug(destCity.n, destCity.u);
    const [slugA, slugB] = [slugOrigem, slugDestino].sort();

    // Redireciona diretamente para a rota canônica ISR enriquecida
    router.push(`/localizacao/distancia/${slugA}/${slugB}`);
  };

  const handleSwap = () => {
    setOriginCity(destCity);
    setOriginSearch(destCity ? `${destCity.n} - ${destCity.u}` : '');
    setDestCity(originCity);
    setDestSearch(originCity ? `${originCity.n} - ${originCity.u}` : '');
    setResult(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="space-y-4">
            <div ref={originRef} className="relative">
              <label htmlFor="cidade-origem" className="block text-sm font-medium text-slate-700 mb-2">
                Cidade de Origem
                <span className="text-slate-400 font-normal ml-2">({cities.length} cidades)</span>
              </label>
              <div className="relative">
                <input
                  id="cidade-origem"
                  type="text"
                  value={originSearch}
                  onChange={(e) => handleOriginSearch(e.target.value)}
                  onFocus={() => originSearch.length >= 2 && setShowOriginDropdown(true)}
                  placeholder="Ex: São Paulo, Uberaba, Curitiba…"
                  className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
                {originCity && (
                  <span className="absolute right-3 top-3.5 text-emerald-500">✓</span>
                )}
              </div>
              {showOriginDropdown && filteredOrigin.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                  {filteredOrigin.map((city, idx) => (
                    <button
                      key={`${city.n}-${city.u}-${idx}`}
                      onClick={() => selectOrigin(city)}
                      className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between"
                    >
                      <span>
                        <span className="font-medium text-slate-800">{highlightMatch(city.n, originSearch)}</span>
                        <span className="text-slate-400 ml-1 text-sm">- {city.u}</span>
                      </span>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{city.u}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSwap}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-sky-100 hover:text-sky-600 transition-colors"
                title="Inverter cidades"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            <div ref={destRef} className="relative">
              <label htmlFor="cidade-destino" className="block text-sm font-medium text-slate-700 mb-2">Cidade de Destino</label>
              <div className="relative">
                <input
                  id="cidade-destino"
                  type="text"
                  value={destSearch}
                  onChange={(e) => handleDestSearch(e.target.value)}
                  onFocus={() => destSearch.length >= 2 && setShowDestDropdown(true)}
                  placeholder="Ex: Rio de Janeiro, Fortaleza, Manaus…"
                  className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
                {destCity && (
                  <span className="absolute right-3 top-3.5 text-emerald-500">✓</span>
                )}
              </div>
              {showDestDropdown && filteredDest.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                  {filteredDest.map((city, idx) => (
                    <button
                      key={`${city.n}-${city.u}-${idx}`}
                      onClick={() => selectDest(city)}
                      className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between"
                    >
                      <span>
                        <span className="font-medium text-slate-800">{highlightMatch(city.n, destSearch)}</span>
                        <span className="text-slate-400 ml-1 text-sm">- {city.u}</span>
                      </span>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{city.u}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleCalculate}
              disabled={!originCity || !destCity || calculating}
              isLoading={calculating}
              fullWidth
            >
              Calcular Distância
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="error" title="Erro">{error}</Alert>
        )}
      </div>

      <div className="lg:col-span-7">
        {calculating && !result ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 animate-pulse">
            <div className="text-center">
              <div className="h-6 w-48 bg-slate-200 rounded mx-auto mb-2" />
              <div className="h-8 w-64 bg-slate-200 rounded mx-auto" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 rounded-xl h-32" />
              <div className="bg-slate-100 rounded-xl h-32" />
            </div>
          </div>
        ) : result && originCity && destCity ? (
          <ResultCard title="Informações da Rota">
            <div className="text-center mb-6">
              <p className="text-sm text-slate-500 mb-1">Distância calculada</p>
              <p className="text-lg font-bold text-slate-900">{originCity.n} - {originCity.u}</p>
              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-12 bg-slate-300" />
                <span className="text-slate-400">→</span>
                <div className="h-px w-12 bg-slate-300" />
              </div>
              <p className="text-lg font-bold text-slate-900">{destCity.n} - {destCity.u}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 text-center shadow-sm">
                <div className="text-3xl mb-2">📏</div>
                <p className="text-sm font-medium text-blue-700 mb-1">Distância em Linha Reta</p>
                <p className="text-4xl font-bold text-blue-600">
                  {result.distance.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-blue-500 mt-1">quilômetros</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-5 text-center shadow-sm">
                <div className="text-3xl mb-2">🛣️</div>
                <p className="text-sm font-medium text-emerald-700 mb-1">Estimativa Rodoviária</p>
                <p className="text-4xl font-bold text-emerald-600">
                  {result.estimatedRoad.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-emerald-500 mt-1">quilômetros</p>
              </div>
            </div>

            {/* Tempo estimado de viagem */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">🚗</div>
                <p className="text-sm font-medium text-slate-600 mb-1">De Carro (80 km/h)</p>
                <p className="text-2xl font-bold text-slate-800">
                  {Math.floor(result.estimatedRoad / 80)}h {Math.round((result.estimatedRoad % 80) * 60 / 80)}min
                </p>
                <p className="text-xs text-slate-400 mt-1">tempo estimado</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">🚌</div>
                <p className="text-sm font-medium text-slate-600 mb-1">De Ônibus (60 km/h)</p>
                <p className="text-2xl font-bold text-slate-800">
                  {Math.floor(result.estimatedRoad / 60)}h {Math.round((result.estimatedRoad % 60) * 60 / 60)}min
                </p>
                <p className="text-xs text-slate-400 mt-1">tempo estimado</p>
              </div>
            </div>

            {/* Calculadora de combustível */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4">⛽ Calculadora de Combustível</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Consumo (km/l)</label>
                  <input
                    type="number"
                    value={consumo}
                    onChange={(e) => setConsumo(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                    min="1"
                    step="0.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Preço Gasolina (R$)</label>
                  <input
                    type="number"
                    value={precoGasolina}
                    onChange={(e) => setPrecoGasolina(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                    min="0.01"
                    step="0.10"
                  />
                </div>
              </div>
              {(() => {
                const consumoNum = sanitizeNumber(consumo, 10);
                const precoNum = sanitizeNumber(precoGasolina, 6);
                const viagem = calcularCustoViagem({
                  distancia: result.estimatedRoad,
                  consumo: consumoNum,
                  precoCombustivel: precoNum,
                  pedagio: 0,
                  tipoTrajeto: 'ida',
                });
                return (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-100">
                      <p className="text-xs font-medium text-amber-700 mb-1">Litros Necessários</p>
                      <p className="text-xl font-bold text-amber-600">{formatDecimal(viagem.litrosNecessarios)}L</p>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-3 text-center border border-rose-100">
                      <p className="text-xs font-medium text-rose-700 mb-1">Custo Combustível</p>
                      <p className="text-xl font-bold text-rose-600">{formatCurrency(viagem.custoTotal)}</p>
                    </div>
                  </div>
                );
              })()}
              
              <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <a href={`/utilidades/calculadora-combustivel?distancia=${result.estimatedRoad}`} className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline flex items-center justify-center gap-1">
                  <span>Ver na Calculadora Completa de Combustível</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>

            {/* Botão Google Maps */}
            <div className="mb-4">
              <a
                href={`https://maps.google.com/maps?saddr=${encodeURIComponent(originCity.n + ' - ' + originCity.u)}&daddr=${encodeURIComponent(destCity.n + ' - ' + destCity.u)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Ver Rota no Google Maps
              </a>
            </div>

            <Alert variant="info">A distância em linha reta usa a fórmula de Haversine com coordenadas oficiais do IBGE. A estimativa rodoviária aplica um fator de 1.3x.</Alert>
          </ResultCard>
        ) : (
          <div className="h-full flex items-center justify-center min-h-[300px]">
            <EmptyState
              icon="🗺️"
              title="Calcule uma Distância"
              description="Escolha a cidade de origem e a de destino para ver a distância e os custos de viagem."
            />
          </div>
        )}
      </div>
    </div>

      <article className="mt-12 prose prose-gray max-w-none">
        <h2>Sobre a ferramenta</h2>
        <p>
          Esta ferramenta calcula a distância entre <strong>{cities.length} municípios brasileiros</strong> usando 
          coordenadas geográficas oficiais do IBGE. Basta digitar o nome da cidade ou UF para encontrá-la.
        </p>
      </article>
    </>
  );
}
