'use client';

import React from 'react';
import Link from 'next/link';

export default function OfflinePage() {
  const offlineTools = [
    {
      title: 'Gerador de CPF',
      url: '/documentos/gerador-cpf',
      desc: 'Gere CPFs válidos matematicamente para testes.',
      icon: '🪪',
    },
    {
      title: 'Validador de CPF',
      url: '/documentos/validador-cpf',
      desc: 'Valide a autenticidade dos dígitos verificadores.',
      icon: '✅',
    },
    {
      title: 'Gerador de CNPJ',
      url: '/documentos/gerador-cnpj',
      desc: 'Gere CNPJs válidos para desenvolvimento e QA.',
      icon: '🏢',
    },
    {
      title: 'Juros Compostos',
      url: '/financeiro/juros-compostos',
      desc: 'Simule rentabilidade e evolução de investimentos.',
      icon: '📈',
    },
    {
      title: 'Regra de Três',
      url: '/utilidades/regra-de-tres',
      desc: 'Calcule proporções diretas e inversas rapidamente.',
      icon: '➗',
    },
    {
      title: 'Pomodoro Timer',
      url: '/utilidades/pomodoro',
      desc: 'Cronômetro de foco e produtividade com áudio.',
      icon: '⏱️',
    },
    {
      title: 'Conversor Base64',
      url: '/utilidades/base64',
      desc: 'Codifique e decodifique textos e strings.',
      icon: '🔤',
    },
    {
      title: 'Contador de Caracteres',
      url: '/utilidades/contador-caracteres',
      desc: 'Contador de palavras, caracteres e tempo de leitura.',
      icon: '📝',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Offline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-6 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          Modo Offline Ativo
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Você está sem conexão com a internet
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Não se preocupe! As ferramentas que você já carregou continuam funcionando normalmente direto no seu navegador.
        </p>

        {/* Retry Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Tentar Reconectar
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
          >
            Ir para a Página Inicial
          </Link>
        </div>

        {/* Offline Accessible Tools */}
        <section aria-label="Ferramentas disponíveis offline" className="text-left bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span>⚡</span> Ferramentas Disponíveis no Cache Local:
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Estas calculadoras e utilitários rodam 100% no seu dispositivo sem depender de servidores:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offlineTools.map((tool) => (
              <Link
                key={tool.url}
                href={tool.url}
                className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all group"
              >
                <span className="text-2xl shrink-0 p-1.5 bg-white rounded-lg border border-slate-200/60 shadow-2xs group-hover:scale-105 transition-transform">
                  {tool.icon}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
