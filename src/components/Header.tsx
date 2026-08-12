'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <Link href="/" className="flex items-center transition-transform hover:scale-105 shrink-0">
            <Image src="/logo.png" alt="BuscaCentral" width={220} height={48} priority />
          </Link>

          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 shrink-0">
            <Link href="/documentos" className="text-gray-700 hover:text-blue-700 font-extrabold text-lg lg:text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              Documentos
            </Link>
            <Link href="/localizacao" className="text-gray-700 hover:text-blue-700 font-extrabold text-lg lg:text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              Localização
            </Link>
            <Link href="/financeiro" className="text-gray-700 hover:text-blue-700 font-extrabold text-lg lg:text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              Financeiro
            </Link>
            <Link href="/utilidades" className="text-gray-700 hover:text-blue-700 font-extrabold text-lg lg:text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              Utilidades
            </Link>
            <Link href="/artigos" className="text-blue-600 hover:text-blue-800 font-extrabold text-lg lg:text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
              Artigos
            </Link>
            <Link
              href="/localizacao/carregador-eletrico/perto-de-mim"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-sm border border-blue-200 rounded-full transition-all hover:scale-105"
            >
              <span>Perto de mim</span>
              <span>📍</span>
            </Link>
          </nav>

          {/* Busca no cabeçalho (desktop) */}
          <div className="hidden lg:block w-48 xl:w-64">
            <SearchBar variant="compact" placeholder="Buscar ferramenta..." />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{ touchAction: 'manipulation' }}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4">
            {/* Busca no menu mobile */}
            <div className="mb-3 px-1">
              <SearchBar
                variant="compact"
                placeholder="Buscar ferramenta..."
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
            <Link
              href="/localizacao/carregador-eletrico/perto-de-mim"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 px-4 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold text-base mb-3 border border-blue-200"
            >
              <span>Eletropostos Perto de Mim</span>
              <span>📍</span>
            </Link>
            <Link
              href="/documentos"
              onClick={() => setMenuOpen(false)}
              className="block py-4 px-5 text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-semibold text-lg"
            >
              Documentos
            </Link>
            <Link
              href="/localizacao"
              onClick={() => setMenuOpen(false)}
              className="block py-4 px-5 text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-semibold text-lg"
            >
              Localização
            </Link>
            <Link
              href="/financeiro"
              onClick={() => setMenuOpen(false)}
              className="block py-4 px-5 text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-semibold text-lg"
            >
              Financeiro
            </Link>
            <Link
              href="/utilidades"
              onClick={() => setMenuOpen(false)}
              className="block py-4 px-5 text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-semibold text-lg"
            >
              Utilidades
            </Link>
            <Link
              href="/artigos"
              onClick={() => setMenuOpen(false)}
              className="block py-4 px-5 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded-lg font-semibold text-lg"
            >
              Artigos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
