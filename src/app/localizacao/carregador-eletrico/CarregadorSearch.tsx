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

const CIDADES_INTERNACIONAIS: City[] = [
  { n: 'Buenos Aires', u: 'Argentina', lat: -34.6037, lon: -58.3816 },
  { n: 'Montevideo', u: 'Uruguai', lat: -34.9011, lon: -56.1645 },
  { n: 'Santiago', u: 'Chile', lat: -33.4489, lon: -70.6693 },
  { n: 'Asunción', u: 'Paraguai', lat: -25.2637, lon: -57.5759 },
  { n: 'Punta del Este', u: 'Uruguai', lat: -34.9411, lon: -54.9333 },
  { n: 'Lisboa', u: 'Portugal', lat: 38.7223, lon: -9.1393 },
  { n: 'Porto', u: 'Portugal', lat: 41.1579, lon: -8.6291 },
  { n: 'Miami', u: 'EUA', lat: 25.7617, lon: -80.1918 },
  { n: 'Orlando', u: 'EUA', lat: 28.5383, lon: -81.3792 },
  { n: 'Madrid', u: 'Espanha', lat: 40.4168, lon: -3.7038 },
];

export default function CarregadorSearch() {
  const [cities, setCities] = useState<City[]>(CIDADES_INTERNACIONAIS);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLFormElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Lazy loading cities
  const loadCities = useCallback(() => {
    if (cities.length === CIDADES_INTERNACIONAIS.length) {
      fetch('/localizacao/distancia-cidades/cidades.json')
        .then((res) => res.json())
        .then((data: City[]) => setCities([...CIDADES_INTERNACIONAIS, ...data]))
        .catch((err) => console.error('Erro ao carregar cidades', err));
    }
  }, [cities.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterCities = useCallback(
    (searchValue: string) => {
      if (searchValue.length < 2) return [];
      const norm = normalize(searchValue);
      return cities
        .filter(
          (c) =>
            normalize(c.n).includes(norm) || normalize(c.u).includes(norm)
        )
        .sort((a, b) => {
          const aExact = normalize(a.n) === norm ? 0 : 1;
          const bExact = normalize(b.n) === norm ? 0 : 1;
          if (aExact !== bExact) return aExact - bExact;
          const aStarts = normalize(a.n).startsWith(norm) ? 0 : 1;
          const bStarts = normalize(b.n).startsWith(norm) ? 0 : 1;
          if (aStarts !== bStarts) return aStarts - bStarts;
          const aIsIntl = CIDADES_INTERNACIONAIS.some((i) => i.n === a.n && i.u === a.u) ? 0 : 1;
          const bIsIntl = CIDADES_INTERNACIONAIS.some((i) => i.n === b.n && i.u === b.u) ? 0 : 1;
          return aIsIntl - bIsIntl;
        })
        .slice(0, 10);
    },
    [cities]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setFilteredCities(filterCities(value));
    setShowDropdown(value.length >= 2);
    setSelectedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && filteredCities[selectedIndex]) {
      selectCity(filteredCities[selectedIndex]);
    } else if (filteredCities.length > 0) {
      selectCity(filteredCities[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredCities.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCities.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      selectCity(filteredCities[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listboxRef.current) {
      const activeElement = listboxRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

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
    <form onSubmit={handleSubmit} ref={dropdownRef} className="relative w-full max-w-xl mx-auto" role="search">
      <div className="relative">
        <button type="submit" aria-label="Buscar eletropostos na cidade" className="absolute inset-y-0 left-0 pl-3 flex items-center hover:text-sky-600 transition-colors">
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
          onFocus={() => {
            loadCities();
            search.length >= 2 && setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua cidade... (Ex: Ribeirão Preto)"
          className="block w-full pl-10 pr-3 py-3 border border-sky-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-all shadow-sm"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="city-listbox"
          aria-activedescendant={selectedIndex >= 0 ? `city-option-${selectedIndex}` : undefined}
          aria-autocomplete="list"
        />
      </div>

      {showDropdown && filteredCities.length > 0 && (
        <ul
          id="city-listbox"
          ref={listboxRef}
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto"
        >
          {filteredCities.map((city, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <li
                key={`${city.n}-${city.u}-${idx}`}
                id={`city-option-${idx}`}
                role="option"
                aria-selected={isActive}
                onClick={() => selectCity(city)}
                className={`w-full text-left px-4 py-3 cursor-pointer transition-colors border-b border-slate-50 last:border-0 flex items-center justify-between group ${isActive ? 'bg-sky-100' : 'hover:bg-sky-50'}`}
              >
                <span>
                  <span className={`font-medium ${isActive ? 'text-sky-800' : 'text-slate-800 group-hover:text-sky-700'}`}>
                    {highlightMatch(city.n, search)}
                  </span>
                  <span className="text-slate-400 ml-1 text-sm">- {city.u}</span>
                </span>
                <span className={`text-xs px-2 py-0.5 rounded transition-colors ${isActive ? 'bg-sky-200 text-sky-800' : 'text-slate-500 bg-slate-100 group-hover:bg-sky-100 group-hover:text-sky-700'}`}>
                  {city.u}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
