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

export default function PlanejadorSearch() {
  const [cities, setCities] = useState<City[]>([]);
  
  const [searchOrigem, setSearchOrigem] = useState('');
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
      .then((data: City[]) => setCities(data))
      .catch((err) => console.error('Erro ao carregar cidades', err));
  }, []);

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
    const index = text.toLowerCase().indexOf(searchStr.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <strong className="text-blue-600">
          {text.slice(index, index + searchStr.length)}
        </strong>
        {text.slice(index + searchStr.length)}
      </>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrigem || !selectedDestino) return;
    
    const slugOrigem = generateCitySlug(selectedOrigem.n, selectedOrigem.u);
    const slugDestino = generateCitySlug(selectedDestino.n, selectedDestino.u);
    
    router.push(`/localizacao/planejador-viagem-ev/${slugOrigem}/${slugDestino}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        
        {/* Origem Input */}
        <div ref={origemRef} className="relative w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Ponto de Partida</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchOrigem}
              onChange={(e) => handleSearchOrigem(e.target.value)}
              onFocus={() => searchOrigem.length >= 2 && setShowDropdownOrigem(true)}
              placeholder="Sua cidade atual..."
              className="block w-full pl-10 pr-3 py-3 border border-sky-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-all shadow-sm"
              required
            />
          </div>

          {showDropdownOrigem && filteredOrigem.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
              {filteredOrigem.map((city, idx) => (
                <button
                  key={`orig-${city.n}-${city.u}-${idx}`}
                  type="button"
                  onClick={() => {
                    setSelectedOrigem(city);
                    setSearchOrigem(`${city.n} - ${city.u}`);
                    setShowDropdownOrigem(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between group"
                >
                  <span>
                    <span className="font-medium text-slate-800 group-hover:text-sky-700">
                      {highlightMatch(city.n, searchOrigem)}
                    </span>
                    <span className="text-slate-400 ml-1 text-sm">- {city.u}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Destino Input */}
        <div ref={destinoRef} className="relative w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Destino</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <input
              type="text"
              value={searchDestino}
              onChange={(e) => handleSearchDestino(e.target.value)}
              onFocus={() => searchDestino.length >= 2 && setShowDropdownDestino(true)}
              placeholder="Para onde você vai?"
              className="block w-full pl-10 pr-3 py-3 border border-sky-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-all shadow-sm"
              required
            />
          </div>

          {showDropdownDestino && filteredDestino.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
              {filteredDestino.map((city, idx) => (
                <button
                  key={`dest-${city.n}-${city.u}-${idx}`}
                  type="button"
                  onClick={() => {
                    setSelectedDestino(city);
                    setSearchDestino(`${city.n} - ${city.u}`);
                    setShowDropdownDestino(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between group"
                >
                  <span>
                    <span className="font-medium text-slate-800 group-hover:text-sky-700">
                      {highlightMatch(city.n, searchDestino)}
                    </span>
                    <span className="text-slate-400 ml-1 text-sm">- {city.u}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={!selectedOrigem || !selectedDestino}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Planejar Rota EV
        </button>
      </div>
    </form>
  );
}
