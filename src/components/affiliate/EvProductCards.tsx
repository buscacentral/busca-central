import React from 'react';

export interface EvProduct {
  id: string;
  name: string;
  url: string;
  tag: string;
  badge: string;
  highlights: string[];
  category: string;
  icon: string;
}

export const EV_PRODUCTS: EvProduct[] = [
  {
    id: 'carregador-portatil-tipo-2',
    name: 'Carregador Portátil Tipo 2 Bivolt (3.5 kW) com Display LCD',
    url: 'https://link.amazon/B0gV6ZPJI',
    tag: 'Item Essencial para Viagens',
    badge: 'Recomendado pela Redação',
    category: 'Recarga Portátil & Emergência',
    icon: '⚡',
    highlights: [
      'Compatível com BYD Dolphin, Dolphin Mini, GWM Ora 03 e Haval',
      'Display LCD em tempo real com controle de corrente e temperatura',
      'Plugue padrão brasileiro com proteção contra surtos e bivolt automático',
    ],
  },
  {
    id: 'adaptador-v2l-tipo-2',
    name: 'Adaptador V2L Tipo 2 (Veículo para Tomada 220V 20A)',
    url: 'https://link.amazon/B0ekHkpBw',
    tag: 'Acessório Prático para Viagens e Camping',
    badge: 'Equipamento Essencial',
    category: 'Energia Portátil V2L',
    icon: '🔌',
    highlights: [
      'Use a bateria do seu BYD ou GWM para ligar eletrodomésticos, notebooks ou equipamentos em viagens',
      'Conector robusto com trava de segurança Tipo 2 para tomada padrão',
      'Ideal para acampamentos, viagens longas e emergências de falta de luz',
    ],
  },
  {
    id: 'suporte-parede-cabo-tipo-2',
    name: 'Suporte de Parede e Organizador para Cabo Tipo 2',
    url: 'https://link.amazon/B0f5NRhGy',
    tag: 'Organização da Garagem',
    badge: 'Recomendado pela Redação',
    category: 'Acessório de Garagem',
    icon: '🛡️',
    highlights: [
      'Evita danos, quedas e umidade no conector do cabo Tipo 2',
      'Fixação segura, durável e prática com gancho para enrolar o cabo',
      'Mantém sua garagem ou vaga de condomínio sempre organizada',
    ],
  },
];

interface EvProductCardsProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  products?: EvProduct[];
  layout?: 'grid' | 'stack' | 'compact';
  className?: string;
  showDisclosure?: boolean;
}

export default function EvProductCards({
  title = 'Acessórios e Equipamentos Recomendados para seu Carro Elétrico',
  subtitle = 'Seleção de itens testados e recomendados pela equipe para garantir viagens sem imprevistos, recarga segura e maior praticidade no dia a dia.',
  badge = 'Equipamento Essencial',
  products = EV_PRODUCTS,
  layout = 'grid',
  className = '',
  showDisclosure = true,
}: EvProductCardsProps) {
  return (
    <aside
      aria-label="Produtos recomendados para veículos elétricos"
      className={`my-10 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 p-6 md:p-8 shadow-sm transition-all not-prose ${className}`}
    >
      {/* Header Section */}
      <div className="text-center md:text-left mb-8">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            {badge}
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Ofertas na Amazon
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Cards Grid / Stack */}
      <div
        className={
          layout === 'stack'
            ? 'space-y-6'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-xl bg-white border border-slate-200 hover:border-blue-400 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 group relative"
          >
            {/* Top Badge & Category */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                  <span className="text-amber-500">★</span> {product.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{product.category}</span>
              </div>

              {/* Tag Banner */}
              <div className="mb-3">
                <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {product.tag}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-4">
                <a
                  href={product.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="focus:outline-none focus:underline"
                >
                  <span className="mr-1.5 inline-block text-lg" aria-hidden="true">
                    {product.icon}
                  </span>
                  {product.name}
                </a>
              </h4>

              {/* Highlights List */}
              <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-600">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <svg
                      className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA & Delivery guarantee */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 mt-auto">
              <a
                href={product.url}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow transition-all group-hover:translate-y-[-1px]"
              >
                <span>Ver Oferta na Amazon</span>
                <span className="text-base leading-none transition-transform group-hover:translate-x-1" aria-hidden="true">➔</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium pt-1">
                <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>Compra Segura &amp; Envio Rápido</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legal Affiliate Disclosure */}
      {showDisclosure && (
        <div className="mt-6 pt-4 border-t border-slate-200/60 text-center">
          <p className="text-[11px] sm:text-xs text-slate-500 italic">
            *Comprando pelos links recomendados, o BuscaCentral pode receber uma comissão sem custo adicional para você.
          </p>
        </div>
      )}
    </aside>
  );
}
