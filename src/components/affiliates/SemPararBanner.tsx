import React from 'react';

export const SEM_PARAR_AFFILIATE_URL =
  'https://www.awin1.com/cread.php?awinmid=119233&awinaffid=3042925&clickref=buscacentral-rotas&ued=https%3A%2F%2Fwww.semparar.com.br%2F';

export const SEM_PARAR_SHORT_URL = 'https://tidd.ly/4gMczeX';

interface SemPararBannerProps {
  variant?: 'card' | 'compact';
  title?: string;
  subtitle?: string;
  ctaText?: string;
  className?: string;
  showDisclosure?: boolean;
}

export default function SemPararBanner({
  variant = 'card',
  title = 'Evite filas no pedágio com Sem Parar',
  subtitle = 'Cobertura em 100% dos pedágios do Brasil, estacionamentos e postos. Passe direto nas cancelas automáticas e ganhe descontos com o sistema Free Flow.',
  ctaText = 'Pedir Minha Tag com Desconto →',
  className = '',
  showDisclosure = true,
}: SemPararBannerProps) {
  if (variant === 'compact') {
    return (
      <aside
        aria-label="Oferta Sem Parar Tag de Pedágio"
        className={`bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/90 rounded-xl p-4 shadow-sm not-prose ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="shrink-0 w-10 h-10 rounded-lg bg-yellow-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-xs">
              ⚡
            </span>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wide bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                  Sem Parar Oficial
                </span>
                <span className="text-xs text-amber-800 font-semibold hidden sm:inline">100% dos pedágios do país</span>
              </div>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {title}
              </p>
            </div>
          </div>
          <a
            href={SEM_PARAR_AFFILIATE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all hover:scale-[1.02]"
          >
            <span>{ctaText}</span>
          </a>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Oferta Sem Parar Tag de Pedágio"
      className={`relative overflow-hidden rounded-2xl border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/90 via-yellow-50/60 to-white p-6 sm:p-7 shadow-sm transition-all not-prose ${className}`}
    >
      {/* Elemento decorativo sutil de fundo */}
      <div className="absolute -right-8 -bottom-8 text-8xl opacity-[0.06] select-none pointer-events-none font-black text-amber-900" aria-hidden="true">
        TAG
      </div>

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-yellow-400 text-slate-950 shadow-xs">
              <span>🚗</span>
              <span>Sem Parar</span>
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Passe Direto sem Filas
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-white/80 border border-slate-200 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
              Free Flow &amp; DUF
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {subtitle}
          </p>

          {/* Lista de benefícios rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>100% dos pedágios e rodovias do Brasil</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Desconto progressivo em rodovias conveniadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Aceito em postos, shoppings e drive-thrus</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Receba a tag direto na sua casa com facilidade</span>
            </div>
          </div>
        </div>

        {/* Bloco de CTA */}
        <div className="w-full md:w-auto shrink-0 flex flex-col items-stretch sm:items-center gap-2">
          <a
            href={SEM_PARAR_AFFILIATE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] text-center"
          >
            <span>{ctaText}</span>
          </a>
          <span className="text-[11px] text-slate-500 font-medium text-center">
            Planos sem fidelidade e ativação rápida
          </span>
        </div>
      </div>

      {showDisclosure && (
        <div className="mt-5 pt-3 border-t border-amber-200/50 text-center sm:text-left">
          <p className="text-[11px] text-slate-500 italic">
            *Parceria oficial com Sem Parar. Solicitando sua tag através deste link de parceiro, você apoia o BuscaCentral sem pagar nada a mais por isso.
          </p>
        </div>
      )}
    </aside>
  );
}
