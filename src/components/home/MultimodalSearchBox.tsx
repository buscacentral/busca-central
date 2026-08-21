'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

interface CityOption {
  name: string;
  uf: string;
  slug: string;
}

const CIDADES_POPULARES: CityOption[] = [
  { name: 'São Paulo', uf: 'SP', slug: 'sao-paulo-sp' },
  { name: 'Rio de Janeiro', uf: 'RJ', slug: 'rio-de-janeiro-rj' },
  { name: 'Belo Horizonte', uf: 'MG', slug: 'belo-horizonte-mg' },
  { name: 'Brasília', uf: 'DF', slug: 'brasilia-df' },
  { name: 'Curitiba', uf: 'PR', slug: 'curitiba-pr' },
  { name: 'Campinas', uf: 'SP', slug: 'campinas-sp' },
  { name: 'Florianópolis', uf: 'SC', slug: 'florianopolis-sc' },
  { name: 'Porto Alegre', uf: 'RS', slug: 'porto-alegre-rs' },
  { name: 'Salvador', uf: 'BA', slug: 'salvador-ba' },
  { name: 'Goiânia', uf: 'GO', slug: 'goiania-go' },
  { name: 'Fortaleza', uf: 'CE', slug: 'fortaleza-ce' },
  { name: 'Recife', uf: 'PE', slug: 'recife-pe' },
  { name: 'Uberlândia', uf: 'MG', slug: 'uberlandia-mg' },
  { name: 'Uberaba', uf: 'MG', slug: 'uberaba-mg' },
  { name: 'Ribeirão Preto', uf: 'SP', slug: 'ribeirao-preto-sp' },
  { name: 'Sorocaba', uf: 'SP', slug: 'sorocaba-sp' },
  { name: 'Santos', uf: 'SP', slug: 'santos-sp' },
  { name: 'São José dos Campos', uf: 'SP', slug: 'sao-jose-dos-campos-sp' },
  { name: 'Joinville', uf: 'SC', slug: 'joinville-sc' },
  { name: 'Londrina', uf: 'PR', slug: 'londrina-pr' },
  { name: 'Maringá', uf: 'PR', slug: 'maringa-pr' },
  { name: 'Caxias do Sul', uf: 'RS', slug: 'caxias-do-sul-rs' },
  { name: 'Niterói', uf: 'RJ', slug: 'niteroi-rj' },
  { name: 'Petrópolis', uf: 'RJ', slug: 'petropolis-rj' },
  { name: 'Vitória', uf: 'ES', slug: 'vitoria-es' },
  { name: 'Natal', uf: 'RN', slug: 'natal-rn' },
  { name: 'João Pessoa', uf: 'PB', slug: 'joao-pessoa-pb' },
  { name: 'Maceió', uf: 'AL', slug: 'maceio-al' },
  { name: 'Aracaju', uf: 'SE', slug: 'aracaju-se' },
  { name: 'Teresina', uf: 'PI', slug: 'teresina-pi' },
  { name: 'São Luís', uf: 'MA', slug: 'sao-luis-ma' },
  { name: 'Belém', uf: 'PA', slug: 'belem-pa' },
  { name: 'Manaus', uf: 'AM', slug: 'manaus-am' },
  { name: 'Cuiabá', uf: 'MT', slug: 'cuiaba-mt' },
  { name: 'Campo Grande', uf: 'MS', slug: 'campo-grande-ms' },
  { name: 'Palmas', uf: 'TO', slug: 'palmas-to' },
  { name: 'Porto Velho', uf: 'RO', slug: 'porto-velho-ro' },
  { name: 'Rio Branco', uf: 'AC', slug: 'rio-branco-ac' },
  { name: 'Macapá', uf: 'AP', slug: 'macapa-ap' },
  { name: 'Boa Vista', uf: 'RR', slug: 'boa-vista-rr' },
  // Polos Turísticos e Regionais Estratégicos
  { name: 'Gramado', uf: 'RS', slug: 'gramado-rs' },
  { name: 'Canela', uf: 'RS', slug: 'canela-rs' },
  { name: 'Caldas Novas', uf: 'GO', slug: 'caldas-novas-go' },
  { name: 'Porto Seguro', uf: 'BA', slug: 'porto-seguro-ba' },
  { name: 'Armação dos Búzios', uf: 'RJ', slug: 'armacao-dos-buzios-rj' },
  { name: 'Búzios', uf: 'RJ', slug: 'armacao-dos-buzios-rj' },
  { name: 'Paraty', uf: 'RJ', slug: 'paraty-rj' },
  { name: 'Angra dos Reis', uf: 'RJ', slug: 'angra-dos-reis-rj' },
  { name: 'Cabo Frio', uf: 'RJ', slug: 'cabo-frio-rj' },
  { name: 'Campos do Jordão', uf: 'SP', slug: 'campos-do-jordao-sp' },
  { name: 'Ubatuba', uf: 'SP', slug: 'ubatuba-sp' },
  { name: 'Ilhabela', uf: 'SP', slug: 'ilhabela-sp' },
  { name: 'Balneário Camboriú', uf: 'SC', slug: 'balneario-camboriu-sc' },
  { name: 'Foz do Iguaçu', uf: 'PR', slug: 'foz-do-iguacu-pr' },
  { name: 'Maragogi', uf: 'AL', slug: 'maragogi-al' },
  { name: 'Bonito', uf: 'MS', slug: 'bonito-ms' },
  { name: 'Ouro Preto', uf: 'MG', slug: 'ouro-preto-mg' },
  { name: 'Tiradentes', uf: 'MG', slug: 'tiradentes-mg' },
  { name: 'Poços de Caldas', uf: 'MG', slug: 'pocos-de-caldas-mg' },
  { name: 'Pirenópolis', uf: 'GO', slug: 'pirenopolis-go' },
  { name: 'Franca', uf: 'SP', slug: 'franca-sp' },
  { name: 'Montes Claros', uf: 'MG', slug: 'montes-claros-mg' },
];

export const ROTAS_DESTACADAS = [
  {
    origem: 'São Paulo, SP',
    destino: 'Rio de Janeiro, RJ',
    slugOrigem: 'sao-paulo-sp',
    slugDestino: 'rio-de-janeiro-rj',
    distancia: '435 km',
    tempo: '~5h',
    badge: 'Dutra / Free Flow',
    icon: '🛣️',
  },
  {
    origem: 'São Paulo, SP',
    destino: 'Campinas, SP',
    slugOrigem: 'sao-paulo-sp',
    slugDestino: 'campinas-sp',
    distancia: '95 km',
    tempo: '~1h15',
    badge: 'Anhanguera-Bandeirantes',
    icon: '🚗',
  },
  {
    origem: 'Curitiba, PR',
    destino: 'Florianópolis, SC',
    slugOrigem: 'curitiba-pr',
    slugDestino: 'florianopolis-sc',
    distancia: '300 km',
    tempo: '~4h15',
    badge: 'BR-101 Litoral',
    icon: '🏖️',
  },
  {
    origem: 'Belo Horizonte, MG',
    destino: 'Rio de Janeiro, RJ',
    slugOrigem: 'belo-horizonte-mg',
    slugDestino: 'rio-de-janeiro-rj',
    distancia: '440 km',
    tempo: '~6h',
    badge: 'BR-040 Concedida',
    icon: '⛰️',
  },
  {
    origem: 'São Paulo, SP',
    destino: 'Curitiba, PR',
    slugOrigem: 'sao-paulo-sp',
    slugDestino: 'curitiba-pr',
    distancia: '408 km',
    tempo: '~5h30',
    badge: 'Régis Bittencourt',
    icon: '🌲',
  },
  {
    origem: 'Brasília, DF',
    destino: 'Goiânia, GO',
    slugOrigem: 'brasilia-df',
    slugDestino: 'goiania-go',
    distancia: '209 km',
    tempo: '~2h45',
    badge: 'BR-060 Duplicada',
    icon: '🏛️',
  },
];

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function convertToSlug(input: string): string {
  const clean = input.trim();
  // Se for uma das cidades do catálogo, pega o slug exato
  const normInput = normalizeText(clean);
  const found = CIDADES_POPULARES.find(
    (c) =>
      normalizeText(`${c.name} ${c.uf}`) === normInput ||
      normalizeText(`${c.name}, ${c.uf}`) === normInput ||
      normalizeText(`${c.name}-${c.uf}`) === normInput ||
      normalizeText(c.name) === normInput ||
      c.slug === normInput,
  );
  if (found) return found.slug;

  // Fallback slugifier
  const parts = clean.split(/[,-]/).map((p) => p.trim());
  if (parts.length >= 2) {
    const cityName = parts[0];
    const uf = parts[parts.length - 1].toLowerCase();
    const base = normalizeText(cityName).replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `${base}-${uf}`;
  }
  return normalizeText(clean).replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

export default function MultimodalSearchBox() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'routes' | 'tools'>('routes');

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [origemSugestoes, setOrigemSugestoes] = useState<CityOption[]>([]);
  const [destinoSugestoes, setDestinoSugestoes] = useState<CityOption[]>([]);
  const [showOrigemDropdown, setShowOrigemDropdown] = useState(false);
  const [showDestinoDropdown, setShowDestinoDropdown] = useState(false);

  // Toggles de intenção
  const [incluirPedagios, setIncluirPedagios] = useState(true);
  const [compararOnibus, setCompararOnibus] = useState(false);
  const [rotaEV, setRotaEV] = useState(false);

  const origemRef = useRef<HTMLDivElement>(null);
  const destinoRef = useRef<HTMLDivElement>(null);

  // Fecha dropdowns se clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (origemRef.current && !origemRef.current.contains(e.target as Node)) {
        setShowOrigemDropdown(false);
      }
      if (destinoRef.current && !destinoRef.current.contains(e.target as Node)) {
        setShowDestinoDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOrigemChange = (val: string) => {
    setOrigem(val);
    if (val.trim().length > 1) {
      const q = normalizeText(val);
      const filtered = CIDADES_POPULARES.filter(
        (c) =>
          normalizeText(c.name).includes(q) ||
          normalizeText(`${c.name} ${c.uf}`).includes(q) ||
          normalizeText(`${c.name}, ${c.uf}`).includes(q) ||
          normalizeText(`${c.name}-${c.uf}`).includes(q) ||
          normalizeText(c.uf) === q,
      )
        .sort((a, b) => {
          const aNorm = normalizeText(a.name);
          const bNorm = normalizeText(b.name);
          const aExact = aNorm === q ? -1 : 0;
          const bExact = bNorm === q ? -1 : 0;
          if (aExact !== bExact) return aExact - bExact;

          const aStarts = aNorm.startsWith(q) ? 0 : 1;
          const bStarts = bNorm.startsWith(q) ? 0 : 1;
          return aStarts - bStarts;
        })
        .slice(0, 6);
      setOrigemSugestoes(filtered);
      setShowOrigemDropdown(filtered.length > 0);
    } else {
      setOrigemSugestoes([]);
      setShowOrigemDropdown(false);
    }
  };

  const handleDestinoChange = (val: string) => {
    setDestino(val);
    if (val.trim().length > 1) {
      const q = normalizeText(val);
      const filtered = CIDADES_POPULARES.filter(
        (c) =>
          normalizeText(c.name).includes(q) ||
          normalizeText(`${c.name} ${c.uf}`).includes(q) ||
          normalizeText(`${c.name}, ${c.uf}`).includes(q) ||
          normalizeText(`${c.name}-${c.uf}`).includes(q) ||
          normalizeText(c.uf) === q,
      )
        .sort((a, b) => {
          const aNorm = normalizeText(a.name);
          const bNorm = normalizeText(b.name);
          const aExact = aNorm === q ? -1 : 0;
          const bExact = bNorm === q ? -1 : 0;
          if (aExact !== bExact) return aExact - bExact;

          const aStarts = aNorm.startsWith(q) ? 0 : 1;
          const bStarts = bNorm.startsWith(q) ? 0 : 1;
          return aStarts - bStarts;
        })
        .slice(0, 6);
      setDestinoSugestoes(filtered);
      setShowDestinoDropdown(filtered.length > 0);
    } else {
      setDestinoSugestoes([]);
      setShowDestinoDropdown(false);
    }
  };

  const handleSelectOrigem = (c: CityOption) => {
    setOrigem(`${c.name}, ${c.uf}`);
    setShowOrigemDropdown(false);
  };

  const handleSelectDestino = (c: CityOption) => {
    setDestino(`${c.name}, ${c.uf}`);
    setShowDestinoDropdown(false);
  };

  const handleSwap = () => {
    const temp = origem;
    setOrigem(destino);
    setDestino(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origem.trim() || !destino.trim()) return;

    const slugOrigem = convertToSlug(origem);
    const slugDestino = convertToSlug(destino);

    if (rotaEV) {
      router.push(`/localizacao/planejador-viagem-ev/${slugOrigem}/${slugDestino}`);
      return;
    }

    if (compararOnibus) {
      router.push(`/localizacao/distancia/${slugOrigem}/${slugDestino}`);
      return;
    }

    // Padrão: Distância com tabela multimodal e pedágios
    router.push(`/localizacao/distancia/${slugOrigem}/${slugDestino}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Abas de Navegação Superior da Busca */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('routes')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeTab === 'routes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
              : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <span>🗺️</span>
          <span>Calcular Rotas &amp; Viagens</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tools')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
            activeTab === 'tools'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
              : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <span>🛠️</span>
          <span>Buscar 68 Ferramentas</span>
        </button>
      </div>

      {activeTab === 'tools' ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200/80 shadow-xl shadow-slate-200/50 transition-all">
          <p className="text-sm font-semibold text-slate-600 text-center mb-4">
            Digite o que você precisa (ex: <em>Gerador de CPF</em>, <em>Busca de CEP</em>, <em>Salário Líquido</em>, <em>FIPE</em>):
          </p>
          <SearchBar />
        </div>
      ) : (
        <div className="bg-white p-5 sm:p-7 md:p-8 rounded-3xl border-2 border-blue-200/80 shadow-2xl shadow-blue-900/10 transition-all text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Inputs de Origem e Destino com Botão Swap */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origem */}
              <div ref={origemRef} className="relative md:col-span-5">
                <label htmlFor="input-origem" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Origem
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-emerald-600 select-none">
                    🟢
                  </span>
                  <input
                    id="input-origem"
                    type="text"
                    required
                    value={origem}
                    onChange={(e) => handleOrigemChange(e.target.value)}
                    onFocus={() => {
                      if (origemSugestoes.length > 0) setShowOrigemDropdown(true);
                    }}
                    placeholder="Cidade de Origem (ex: São Paulo, SP)"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-2 border-slate-200 focus:border-blue-500 rounded-2xl text-sm md:text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>
                {/* Dropdown de sugestões */}
                {showOrigemDropdown && origemSugestoes.length > 0 && (
                  <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden divide-y divide-slate-100">
                    {origemSugestoes.map((c) => (
                      <li key={c.slug}>
                        <button
                          type="button"
                          onClick={() => handleSelectOrigem(c)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 flex items-center justify-between group"
                        >
                          <span className="font-semibold text-slate-800 group-hover:text-blue-600">
                            {c.name}, {c.uf}
                          </span>
                          <span className="text-xs text-slate-400">Brasil</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Botão de Inversão (Swap) */}
              <div className="flex justify-center md:col-span-2 -my-2 md:my-0 md:pt-5">
                <button
                  type="button"
                  onClick={handleSwap}
                  title="Inverter origem e destino"
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 border border-slate-200 flex items-center justify-center text-lg font-bold transition-all hover:scale-110 active:scale-95 shadow-2xs"
                >
                  ⇄
                </button>
              </div>

              {/* Destino */}
              <div ref={destinoRef} className="relative md:col-span-5">
                <label htmlFor="input-destino" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Destino
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-rose-500 select-none">
                    📍
                  </span>
                  <input
                    id="input-destino"
                    type="text"
                    required
                    value={destino}
                    onChange={(e) => handleDestinoChange(e.target.value)}
                    onFocus={() => {
                      if (destinoSugestoes.length > 0) setShowDestinoDropdown(true);
                    }}
                    placeholder="Cidade de Destino (ex: Rio de Janeiro, RJ)"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border-2 border-slate-200 focus:border-blue-500 rounded-2xl text-sm md:text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>
                {/* Dropdown de sugestões */}
                {showDestinoDropdown && destinoSugestoes.length > 0 && (
                  <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden divide-y divide-slate-100">
                    {destinoSugestoes.map((c) => (
                      <li key={c.slug}>
                        <button
                          type="button"
                          onClick={() => handleSelectDestino(c)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 flex items-center justify-between group"
                        >
                          <span className="font-semibold text-slate-800 group-hover:text-blue-600">
                            {c.name}, {c.uf}
                          </span>
                          <span className="text-xs text-slate-400">Brasil</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Checkbox / Toggles de Intenção Contextual */}
            <div className="pt-2 flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={incluirPedagios}
                  onChange={(e) => setIncluirPedagios(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                />
                <span className="font-semibold flex items-center gap-1.5">
                  <span>Pedágios &amp; Sem Parar</span>
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.2 bg-yellow-400 text-slate-950 rounded">
                    Tag
                  </span>
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={compararOnibus}
                  onChange={(e) => {
                    setCompararOnibus(e.target.checked);
                    if (e.target.checked) setRotaEV(false);
                  }}
                  className="w-4 h-4 text-violet-600 rounded focus:ring-violet-400"
                />
                <span className="font-medium">🚌 Passagens de ônibus</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rotaEV}
                  onChange={(e) => {
                    setRotaEV(e.target.checked);
                    if (e.target.checked) setCompararOnibus(false);
                  }}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-400"
                />
                <span className="font-medium">⚡ Recarga Carro Elétrico (EV)</span>
              </label>
            </div>

            {/* Botão de Ação Direta */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Calcular Rota e Custos</span>
                <span className="text-xl leading-none">➔</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid de Destinos Populares no Brasil */}
      <div className="mt-10 text-left">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🇧🇷</span>
            <span>Rotas e Destinos Mais Buscados</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Cálculos com pedágios e combustível</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {ROTAS_DESTACADAS.map((rota) => (
            <Link
              key={`${rota.slugOrigem}-${rota.slugDestino}`}
              href={`/localizacao/distancia/${rota.slugOrigem}/${rota.slugDestino}`}
              className="group p-4 bg-white hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all duration-200 shadow-2xs hover:shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-lg p-1.5 bg-slate-50 group-hover:bg-white rounded-lg border border-slate-100">
                    {rota.icon}
                  </span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 group-hover:bg-blue-100/70 px-2 py-0.5 rounded-md">
                    {rota.badge}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {rota.origem.replace(/, \w+$/, '')} ➔ {rota.destino.replace(/, \w+$/, '')}
                </p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>🛣️ {rota.distancia}</span>
                  <span>•</span>
                  <span>⏱️ {rota.tempo}</span>
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Ver rota e pedágios</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
