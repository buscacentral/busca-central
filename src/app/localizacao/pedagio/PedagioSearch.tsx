'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface City {
  n: string;
  u: string;
  lat: number;
  lon: number;
}

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function generateCitySlug(nome: string, uf: string): string {
  const base = normalize(nome)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${base}-${uf.toLowerCase()}`;
}

interface PedagioSearchProps {
  initialOrigemNome?: string;
  initialOrigemUf?: string;
  initialOrigemSlug?: string;
}

export default function PedagioSearch({
  initialOrigemNome = '',
  initialOrigemUf = '',
}: PedagioSearchProps) {
  const [cities, setCities] = useState<City[]>([]);

  const [searchOrigem, setSearchOrigem] = useState(
    initialOrigemNome && initialOrigemUf ? `${initialOrigemNome}, ${initialOrigemUf}` : ''
  );
  const [filteredOrigem, setFilteredOrigem] = useState<City[]>([]);
  const [showDropdownOrigem, setShowDropdownOrigem] = useState(false);
  const [selectedOrigem, setSelectedOrigem] = useState<City | null>(null);

  const [searchDestino, setSearchDestino] = useState('');
  const [filteredDestino, setFilteredDestino] = useState<City[]>([]);
  const [showDropdownDestino, setShowDropdownDestino] = useState(false);
  const [selectedDestino, setSelectedDestino] = useState<City | null>(null);

  const origemRef = useRef<HTMLDivElement>(null);
  const destinoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/localizacao/distancia-cidades/cidades.json')
      .then((res) => res.json())
      .then((data: City[]) => {
        setCities(data);
        if (initialOrigemNome && initialOrigemUf) {
          const match = data.find(
            (c) =>
              c.u.toLowerCase() === initialOrigemUf.toLowerCase() &&
              normalize(c.n) === normalize(initialOrigemNome)
          );
          if (match) {
            setSelectedOrigem(match);
          }
        }
      })
      .catch((err) => console.error('Erro ao carregar cidades', err));
  }, [initialOrigemNome, initialOrigemUf]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (origemRef.current && !origemRef.current.contains(e.target as Node)) {
        setShowDropdownOrigem(false);
      }
      if (destinoRef.current && !destinoRef.current.contains(e.target as Node)) {
        setShowDropdownDestino(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterCities = useCallback(
    (searchValue: string) => {
      if (searchValue.length < 2) return [];
      const lower = searchValue.toLowerCase();
      return cities
        .filter(
          (c) =>
            c.n.toLowerCase().includes(lower) || c.u.toLowerCase() === lower
        )
        .sort((a, b) => {
          const aStarts = a.n.toLowerCase().startsWith(lower) ? 0 : 1;
          const bStarts = b.n.toLowerCase().startsWith(lower) ? 0 : 1;
          return aStarts - bStarts;
        })
        .slice(0, 8);
    },
    [cities]
  );

  const handleSearchOrigem = (value: string) => {
    setSearchOrigem(value);
    setSelectedOrigem(null);
    setFilteredOrigem(filterCities(value));
    setShowDropdownOrigem(value.length >= 2);
  };

  const handleSearchDestino = (value: string) => {
    setSearchDestino(value);
    setSelectedDestino(null);
    setFilteredDestino(filterCities(value));
    setShowDropdownDestino(value.length >= 2);
  };

  const highlightMatch = (text: string, searchStr: string) => {
    if (!searchStr) return text;
    const regex = new RegExp(`(${searchStr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="font-bold text-blue-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSelectOrigem = (city: City) => {
    setSelectedOrigem(city);
    setSearchOrigem(`${city.n}, ${city.u}`);
    setShowDropdownOrigem(false);
  };

  const handleSelectDestino = (city: City) => {
    setSelectedDestino(city);
    setSearchDestino(`${city.n}, ${city.u}`);
    setShowDropdownDestino(false);
  };

  const handleInvert = () => {
    const tempSearch = searchOrigem;
    const tempSelected = selectedOrigem;

    setSearchOrigem(searchDestino);
    setSelectedOrigem(selectedDestino);

    setSearchDestino(tempSearch);
    setSelectedDestino(tempSelected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalOrigem = selectedOrigem;
    let finalDestino = selectedDestino;

    if (!finalOrigem && searchOrigem.trim()) {
      const match = cities.find(
        (c) =>
          normalize(`${c.n}, ${c.u}`) === normalize(searchOrigem) ||
          normalize(c.n) === normalize(searchOrigem)
      );
      if (match) finalOrigem = match;
    }

    if (!finalDestino && searchDestino.trim()) {
      const match = cities.find(
        (c) =>
          normalize(`${c.n}, ${c.u}`) === normalize(searchDestino) ||
          normalize(c.n) === normalize(searchDestino)
      );
      if (match) finalDestino = match;
    }

    if (!finalOrigem || !finalDestino) {
      alert('Por favor, selecione as cidades de origem e destino na lista.');
      return;
    }

    const slugOrigem = generateCitySlug(finalOrigem.n, finalOrigem.u);
    const slugDestino = generateCitySlug(finalDestino.n, finalDestino.u);

    router.push(`/localizacao/pedagio/${slugOrigem}/${slugDestino}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 md:p-8 space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-lg shadow-sm">
          🛣️
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
            Calcular Pedágio e Rota Rodoviária
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Descubra o valor estimado de pedágios, praças de cobrança e combustível
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
        {/* Origem */}
        <div ref={origemRef} className="relative">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Cidade de Origem (Partida)
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchOrigem}
              onChange={(e) => handleSearchOrigem(e.target.value)}
              onFocus={() => {
                if (searchOrigem.length >= 2) setShowDropdownOrigem(true);
              }}
              placeholder="Ex: São Paulo, SP"
              className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              required
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400">📍</span>
          </div>

          {showDropdownOrigem && (
            <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
              {filteredOrigem.length > 0 ? (
                filteredOrigem.map((c, idx) => (
                  <li
                    key={`${c.n}-${c.u}-${idx}`}
                    onClick={() => handleSelectOrigem(c)}
                    className="px-4 py-3 hover:bg-blue-50/70 cursor-pointer flex items-center justify-between text-sm transition-colors"
                  >
                    <span className="text-slate-800">
                      {highlightMatch(c.n, searchOrigem)}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {c.u}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-500 text-center">
                  Nenhuma cidade encontrada
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Botão de Inverter */}
        <div className="flex justify-center md:pt-6">
          <button
            type="button"
            onClick={handleInvert}
            className="p-3 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-xl border border-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Inverter origem e destino"
          >
            <span className="text-base">⇄</span>
          </button>
        </div>

        {/* Destino */}
        <div ref={destinoRef} className="relative">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Cidade de Destino (Chegada)
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchDestino}
              onChange={(e) => handleSearchDestino(e.target.value)}
              onFocus={() => {
                if (searchDestino.length >= 2) setShowDropdownDestino(true);
              }}
              placeholder="Ex: Rio de Janeiro, RJ"
              className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
              required
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400">🏁</span>
          </div>

          {showDropdownDestino && (
            <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
              {filteredDestino.length > 0 ? (
                filteredDestino.map((c, idx) => (
                  <li
                    key={`${c.n}-${c.u}-${idx}`}
                    onClick={() => handleSelectDestino(c)}
                    className="px-4 py-3 hover:bg-blue-50/70 cursor-pointer flex items-center justify-between text-sm transition-colors"
                  >
                    <span className="text-slate-800">
                      {highlightMatch(c.n, searchDestino)}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {c.u}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-500 text-center">
                  Nenhuma cidade encontrada
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
      >
        <span>Calcular Valor de Pedágio e Rota</span>
        <span>→</span>
      </button>
    </form>
  );
}
