'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { buscarClima, traduzirCodigoTempo, type DadosClima } from '@/lib/clima-logic';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { EmptyState } from '@/components/ui/EmptyState';

interface Cidade {
  nome: string;
  lat: number;
  lng: number;
  admin1?: string;
}

function formatCidadeNome(c: Cidade): string {
  return c.admin1 ? `${c.nome}, ${c.admin1}` : c.nome;
}

function formatarDataCurta(dataString: string): string {
  const data = new Date(dataString + 'T00:00:00');
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit' }).format(data).replace('.', '');
}

function getInitialCity(): Cidade {
  if (typeof window === 'undefined') return { nome: 'São Paulo', lat: -23.5505, lng: -46.6333, admin1: 'SP' };
  try {
    const salvas = localStorage.getItem('buscasRecentesClima');
    if (salvas) {
      const parseadas = JSON.parse(salvas);
      if (parseadas.length > 0) return parseadas[0];
    }
  } catch { /* ignore */ }
  return { nome: 'São Paulo', lat: -23.5505, lng: -46.6333, admin1: 'SP' };
}

function getInitialRecentes(): Cidade[] {
  if (typeof window === 'undefined') return [];
  try {
    const salvas = localStorage.getItem('buscasRecentesClima');
    if (salvas) return JSON.parse(salvas);
  } catch { /* ignore */ }
  return [];
}

function getGradientPorTempo(codigo: number) {
  if (codigo === 0) return 'from-amber-400 to-orange-500'; // Céu Limpo
  if (codigo >= 1 && codigo <= 3) return 'from-sky-400 to-blue-500'; // Parcialmente Nublado
  if (codigo >= 45 && codigo <= 48) return 'from-slate-400 to-slate-500'; // Névoa
  if (codigo >= 51 && codigo <= 67) return 'from-slate-600 to-blue-700'; // Chuva Leve
  if (codigo >= 71 && codigo <= 82) return 'from-indigo-500 to-indigo-700'; // Neve / Forte
  if (codigo >= 95 && codigo <= 99) return 'from-slate-800 to-gray-900'; // Tempestade
  return 'from-sky-500 to-blue-600';
}

export default function ClimaClient() {
  const [cidade, setCidade] = useState<Cidade>(getInitialCity);
  const [buscasRecentes, setBuscasRecentes] = useState<Cidade[]>(getInitialRecentes);
  const [dados, setDados] = useState<DadosClima | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Cidade[]>([]);
  const [buscandoCidade, setBuscandoCidade] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const buscarCidades = useCallback(async (termo: string) => {
    if (termo.length < 2) {
      setResultados([]);
      setDropdownAberto(false);
      return;
    }

    setBuscandoCidade(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(termo)}&count=6&language=pt`
      );
      const data = await res.json();

      if (data.results) {
        const cidades: Cidade[] = data.results.map((r: Record<string, unknown>) => ({
          nome: String(r.name),
          lat: Number(r.latitude),
          lng: Number(r.longitude),
          admin1: r.admin1 ? String(r.admin1) : undefined,
        }));
        setResultados(cidades);
        setDropdownAberto(cidades.length > 0);
      } else {
        setResultados([]);
        setDropdownAberto(false);
      }
    } catch {
      setResultados([]);
    } finally {
      setBuscandoCidade(false);
    }
  }, []);

  const obterLocalAtual = () => {
    if (!navigator.geolocation) {
      setErro('Geolocalização não é suportada pelo seu navegador.');
      return;
    }
    
    setBuscandoCidade(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pt-BR`);
          const data = await res.json();
          const nome = data.address.city || data.address.town || data.address.village || data.address.municipality || 'Meu Local Atual';
          const estado = data.address.state || '';
          
          selecionarCidade({
            nome,
            lat,
            lng,
            admin1: estado
          });
        } catch {
          selecionarCidade({
            nome: 'Meu Local Atual',
            lat,
            lng,
            admin1: ''
          });
        } finally {
          setBuscandoCidade(false);
        }
      },
      () => {
        setErro('Não foi possível obter sua localização. Verifique as permissões de GPS do seu navegador.');
        setBuscandoCidade(false);
      }
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      buscarCidades(busca);
    }, 400);
    return () => clearTimeout(timer);
  }, [busca, buscarCidades]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchClima = useCallback(async () => {
    if (!cidade) return;
    setCarregando(true);
    setErro('');
    setDados(null);

    const res = await buscarClima(cidade.lat, cidade.lng);
    if (res) {
      setDados(res);
    } else {
      setErro('Não foi possível obter os dados climáticos. Tente novamente.');
    }
    setCarregando(false);
  }, [cidade]);

  useEffect(() => {
    if (cidade) {
      const initFetch = async () => {
        await Promise.resolve();
        fetchClima();
      };
      initFetch();
    }
  }, [fetchClima, cidade]);

  const selecionarCidade = (c: Cidade) => {
    setCidade(c);
    setBusca('');
    setResultados([]);
    setDropdownAberto(false);

    setBuscasRecentes((prev) => {
      const filtradas = prev.filter(item => item.lat !== c.lat || item.lng !== c.lng);
      const novas = [c, ...filtradas].slice(0, 4);
      localStorage.setItem('buscasRecentesClima', JSON.stringify(novas));
      return novas;
    });
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        {/* Campo de busca de cidade */}
        <div className="mb-6" ref={dropdownRef}>
          <label htmlFor="busca-cidade" className="block text-sm md:text-base font-bold text-slate-800 mb-2">
            Busque sua cidade
          </label>
          <div className="flex gap-2 relative">
            <div className="relative w-full">
              <input
                id="busca-cidade"
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onFocus={() => resultados.length > 0 && setDropdownAberto(true)}
                placeholder="Digite o nome da sua cidade…"
                className="w-full py-3 px-4 bg-slate-50 border border-slate-300 rounded-xl text-base md:text-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
                role="combobox"
                aria-expanded={dropdownAberto && resultados.length > 0}
                aria-controls="clima-results-listbox"
                aria-autocomplete="list"
              />
              {buscandoCidade && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" aria-live="polite">
                  Buscando…
                </span>
              )}

              {dropdownAberto && resultados.length > 0 && (
                <ul id="clima-results-listbox" className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto" role="listbox">
                  {resultados.map((c, idx) => (
                    <li key={`${c.nome}-${c.lat}-${idx}`}>
                      <button
                        onClick={() => selecionarCidade(c)}
                        role="option"
                        aria-selected={cidade?.lat === c.lat && cidade?.lng === c.lng}
                        className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between"
                      >
                        <span className="text-base font-medium text-slate-800">{c.nome}</span>
                        <span className="text-sm text-slate-400">{c.admin1 || ''}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <button
              onClick={obterLocalAtual}
              title="Usar minha localização atual"
              aria-label="Usar minha localização atual"
              className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-4 transition-colors border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              📍
            </button>
          </div>
        </div>

        {/* Cidades rápidas */}
        {buscasRecentes.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Buscas Recentes</p>
            <div className="flex flex-wrap gap-2">
              {buscasRecentes.map((c, index) => (
                <button
                  key={`${c.lat}-${c.lng}-${index}`}
                  onClick={() => selecionarCidade(c)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    cidade?.nome === c.nome && cidade?.lat === c.lat
                      ? 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {formatCidadeNome(c)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultado */}
        {!cidade || carregando ? (
          <div className="py-12">
            <EmptyState
              icon="🌤️"
              title="Consultando clima..."
              description="Aguarde um momento enquanto buscamos as informações mais atualizadas."
            />
          </div>
        ) : erro ? (
          <div className="py-6">
            <Alert variant="error" className="mb-4">{erro}</Alert>
            <Button
              onClick={fetchClima}
              variant="outline"
              className="mx-auto block"
            >
              Tentar novamente
            </Button>
          </div>
        ) : dados ? (
          <div className="space-y-6">
            <section className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-3xl border border-white/20 shadow-lg text-white transition-colors duration-500 bg-gradient-to-br ${getGradientPorTempo(dados.codigoTempo)}`} aria-label="Dados climáticos atuais">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <h2 className="text-lg md:text-xl font-medium tracking-wide">{formatCidadeNome(cidade)}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-8xl md:text-9xl font-black tracking-tighter drop-shadow-md">
                    {dados.temperaturaAtual}°
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/30">
                  <span className="text-xl md:text-2xl" aria-hidden="true">
                    {traduzirCodigoTempo(dados.codigoTempo).split(' ').pop()}
                  </span>
                  <span className="text-base md:text-lg font-semibold tracking-wide">
                    {traduzirCodigoTempo(dados.codigoTempo).replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
                  </span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl border border-white/30 shadow-sm space-y-3 text-sm md:text-base">
                <h3 className="text-base font-bold mb-2">Detalhes do Clima</h3>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span>Sensação Térmica:</span>
                  <strong className="text-white">{dados.sensacaoTermica}°C</strong>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span>Umidade Relativa:</span>
                  <strong className="text-white">{dados.umidade}%</strong>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span>Velocidade do Vento:</span>
                  <strong className="text-white">{dados.velocidadeVento} km/h</strong>
                </div>
                <div className="flex justify-between">
                  <span>Prob. de Chuva Hoje:</span>
                  <strong className="text-white">{dados.previsaoDiaria?.[0]?.probChuva ?? 0}%</strong>
                </div>
              </div>
            </section>

            {dados.previsaoDiaria && dados.previsaoDiaria.length > 0 && (
              <section aria-label="Previsão para 5 dias">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Próximos 5 Dias</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {dados.previsaoDiaria.map((dia, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-2">
                      <span className="text-sm font-semibold text-slate-600 uppercase">{formatarDataCurta(dia.data)}</span>
                      <span className="text-3xl" aria-hidden="true">
                        {traduzirCodigoTempo(dia.codigoTempo).split(' ').pop()}
                      </span>
                      <div className="flex justify-between w-full text-sm mt-2 font-medium">
                        <span className="text-rose-500">{dia.tempMax}°</span>
                        <span className="text-sky-500">{dia.tempMin}°</span>
                      </div>
                      <span className="text-xs text-slate-400 mt-1">{dia.probChuva}% chuva</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
