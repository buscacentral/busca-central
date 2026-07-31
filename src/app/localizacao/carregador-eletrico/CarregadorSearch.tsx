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

export default function CarregadorSearch() {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/localizacao/distancia-cidades/cidades.json')
      .then((res) => res.json())
      .then((data: City[]) => setCities(data))
      .catch((err) => console.error('Erro ao carregar cidades', err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilteredCities(filterCities(value));
    setShowDropdown(value.length >= 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredCities.length > 0) {
      selectCity(filteredCities[0]);
    }
  };

  const selectCity = (city: City) => {
    setShowDropdown(false);
    setSearch(`${city.n} - ${city.u}`);
    const slug = generateCitySlug(city.n, city.u);
    router.push(`/localizacao/carregador-eletrico/${slug}`);
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

  return (
    <form onSubmit={handleSubmit} ref={dropdownRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center hover:text-sky-600 transition-colors">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => search.length >= 2 && setShowDropdown(true)}
          placeholder="Digite sua cidade... (Ex: Ribeirão Preto)"
          className="block w-full pl-10 pr-3 py-3 border border-sky-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-all shadow-sm"
        />
      </div>

      {showDropdown && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
          {filteredCities.map((city, idx) => (
            <button
              key={`${city.n}-${city.u}-${idx}`}
              onClick={() => selectCity(city)}
              className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between group"
            >
              <span>
                <span className="font-medium text-slate-800 group-hover:text-sky-700">
                  {highlightMatch(city.n, search)}
                </span>
                <span className="text-slate-400 ml-1 text-sm">- {city.u}</span>
              </span>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors">
                {city.u}
              </span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
