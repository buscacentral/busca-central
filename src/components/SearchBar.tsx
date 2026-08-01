'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { tools, searchTools } from '@/lib/tools';

interface SearchBarProps {
  /** 'hero' (home, grande) | 'compact' (cabeçalho) */
  variant?: 'hero' | 'compact';
  /** Placeholder customizado */
  placeholder?: string;
  /** Callback opcional após navegar (ex.: fechar menu mobile) */
  onNavigate?: () => void;
}

export default function SearchBar({ variant = 'hero', placeholder, onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isCompact = variant === 'compact';
  const inputId = isCompact ? 'header-search' : 'global-search';

  const filtered = searchTools(query);

  const close = () => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(-1);
    onNavigate?.();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToSearchPage = () => {
    const q = query.trim();
    if (q.length === 0) return;
    close();
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && activeIndex < filtered.length) {
        const target = filtered[activeIndex].path;
        close();
        router.push(target);
      } else {
        // Sem item destacado: leva para a página de resultados completa.
        goToSearchPage();
      }
      return;
    }

    if (!isOpen || filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const activeElement = resultsRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  const inputClassName = isCompact
    ? 'w-full py-2 pl-9 pr-3 border-2 border-slate-200 rounded-full text-sm shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-50'
    : 'w-full py-3 pl-11 pr-4 border-2 border-slate-200 rounded-full text-base shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-md focus:ring-4 focus:ring-blue-50';

  const iconClassName = isCompact
    ? 'absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-colors duration-300 group-focus-within:text-blue-500'
    : 'absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors duration-300 group-focus-within:text-blue-500';

  return (
    <div className={`relative w-full group ${isCompact ? '' : 'max-w-2xl mx-auto'}`}>
      <label htmlFor={inputId} className="sr-only">
        Busca global de ferramentas
      </label>
      <input
        ref={inputRef}
        type="search"
        id={inputId}
        placeholder={placeholder ?? 'Ex: cpf, cep, cnpj, dólar, fipe, bitcoin…'}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        role="combobox"
        aria-expanded={isOpen && filtered.length > 0}
        aria-controls="search-results-listbox"
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
      />
      <span className={iconClassName}>
        🔍
      </span>

      {isOpen && filtered.length > 0 && (
        <div
          id="search-results-listbox"
          ref={resultsRef}
          className="absolute w-full bg-white border border-slate-200 rounded-2xl text-left block z-50 shadow-xl mt-3 max-h-[400px] overflow-y-auto divide-y divide-slate-100"
          role="listbox"
        >
          {filtered.map((tool, index) => (
            <Link
              key={tool.path}
              id={`search-option-${index}`}
              href={tool.path}
              onClick={close}
              className={`flex items-center px-4 py-3 transition-colors text-slate-800 ${activeIndex === index ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
              role="option"
              aria-selected={activeIndex === index}
            >
              <span className="text-xs font-bold text-blue-700 bg-white border border-blue-100 px-3 py-1 rounded-full mr-3 tracking-wide uppercase whitespace-nowrap">
                {tool.category}
              </span>
              <span className="font-semibold text-sm sm:text-base">{tool.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Reexportado para conveniência de quem já importava daqui.
export { tools };
