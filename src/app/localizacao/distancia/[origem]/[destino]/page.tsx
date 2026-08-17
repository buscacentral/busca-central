import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import AdBanner from '@/components/AdBanner';
import {
  getCapitalPairs,
  resolvePair,
  getOtherCapitais,
  pairUrl,
} from '@/lib/distancia-cidades';

/**
 * Converte um slug de cidade (ex: "florianopolis-sc") em nome próprio legível
 * (ex: "Florianópolis"). Usado apenas como fallback seguro quando resolvePair
 * não consegue encontrar a cidade na base de dados.
 *
 * Estratégia: remove o sufixo "-uf" de duas letras, substitui hifens por
 * espaços e aplica title-case simples. Nomes já acentuados (vindos de
 * CityResolved.n) NÃO passam por aqui — este helper é defensivo.
 */
function slugToProperName(slug: string): string {
  // Remove o sufixo de UF ("-sp", "-rj", etc.) — sempre 3 chars: "-xx"
  const withoutUf = slug.replace(/-[a-z]{2}$/, '');
  return withoutUf
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Pré-renderiza no build apenas os pares de capitais; os demais pares são
// gerados sob demanda na primeira visita e ficam em cache (ISR).
export const dynamicParams = true;

// Constantes configuráveis de estimativa de combustível
const CONSUMO_MEDIO_INLINE = 12; // km/L
const PRECO_MEDIO_COMBUSTIVEL_INLINE = 6.20; // R$/L


interface Props {
  params: Promise<{ origem: string; destino: string }>;
}

export function generateStaticParams() {
  return getCapitalPairs();
}

function formatHoras(km: number, velocidade: number): string {
  const totalMin = Math.round((km / velocidade) * 60);
  const h = Math.floor(totalMin / 60);
  const min = totalMin % 60;
  return `${h}h${min > 0 ? `${min}min` : ''}`;
}

// ---------------------------------------------------------------------------
// SEO METADATA — Otimizado para CTR (km exato + tempo estimado + copy de alto clique)
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { origem, destino } = await params;
  const result = resolvePair(origem, destino);

  // Fallback defensivo: usa slugToProperName quando a cidade não existe na base
  if (!result) {
    const originName = slugToProperName(origem);
    const destName = slugToProperName(destino);
    const title = `Distância de ${originName} a ${destName} de Carro`;
    const description = `Veja a distância rodoviária de ${originName} para ${destName}, tempo estimado de viagem de carro e custo de combustível. Calcule grátis no BuscaCentral.`;
    return {
      title,
      description,
    };
  }

  const { origin, dest, road } = result;
  const tempoEstimado = formatHoras(road, 80);

  // ─── Title ────────────────────────────────────────────────────────────────
  // Ex: "Distância de São Paulo a Rio de Janeiro: 435 km, ~5h26min de carro"
  const title = `Distância de ${origin.n} a ${dest.n}: ${road.toLocaleString('pt-BR')} km, ~${tempoEstimado} de carro`;

  // ─── Description ──────────────────────────────────────────────────────────
  const description = `Veja a distância rodoviária de ${origin.n} para ${dest.n}, tempo estimado de viagem de carro e custo de combustível. Calcule grátis no BuscaCentral.`;

  const canonical = `https://buscacentral.com.br${pairUrl(origin.slug, dest.slug)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'BuscaCentral',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}


// ---------------------------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------------------------
export default async function DistanciaParPage({ params }: Props) {
  const { origem, destino } = await params;
  const result = resolvePair(origem, destino);
  if (!result) notFound();

  // Garante URL canônica única por par (slugs em ordem alfabética)
  const [canonA, canonB] = [origem, destino].sort();
  if (origem !== canonA || destino !== canonB) {
    permanentRedirect(`/localizacao/distancia/${canonA}/${canonB}`);
  }

  const { origin, dest, road, straightLine } = result;

  const isSorocabaPiracicaba =
    (origin.slug === 'sorocaba-sp' && dest.slug === 'piracicaba-sp') ||
    (origin.slug === 'piracicaba-sp' && dest.slug === 'sorocaba-sp');

  // Estimativas de combustível (padrão geral da página)
  const consumoPadrao = 10; // km/l
  const precoPadrao = 6.0; // R$/litro
  const litros = road / consumoPadrao;
  const custoCombustivel = litros * precoPadrao;

  // Estimativa inteligente para viagens longas (> 150 km) — consumo médio de mercado: 12 km/L
  const isViagemLonga = road > 150;
  const consumoMedio = 12; // km/l — média de mercado para carros populares em estrada
  const litrosEstimativa = road / consumoMedio;
  const custoEstimativa = litrosEstimativa * precoPadrao;

  // Rota interestadual (UFs diferentes)
  const isInterestadual = origin.u !== dest.u;

  const outras = getOtherCapitais([origin.slug, dest.slug], 8);
  const mapsUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(`${origin.n} - ${origin.u}`)}&daddr=${encodeURIComponent(`${dest.n} - ${dest.u}`)}`;

  // -------------------------------------------------------------------------
  // STRUCTURED DATA — Breadcrumbs
  // -------------------------------------------------------------------------
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://buscacentral.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Localização', item: 'https://buscacentral.com.br/localizacao' },
      { '@type': 'ListItem', position: 3, name: 'Distância entre Cidades', item: 'https://buscacentral.com.br/localizacao/distancia-cidades' },
      { '@type': 'ListItem', position: 4, name: `${origin.n} a ${dest.n}`, item: `https://buscacentral.com.br${pairUrl(origin.slug, dest.slug)}` },
    ],
  };

  // -------------------------------------------------------------------------
  // STRUCTURED DATA — FAQ Schema (5 perguntas dinâmicas)
  // -------------------------------------------------------------------------
  const faqItems = [
    // ── Q1/Q2: espelham exatamente as queries do Search Console ──────────────
    // "Qual a distância de [A] a [B]?" · "distancia de [A] a [B]"
    {
      name: `Qual a distância de ${origin.n} a ${dest.n}?`,
      text: `A distância entre ${origin.n} e ${dest.n} é de aproximadamente ${road.toLocaleString('pt-BR')} km por rodovia, com tempo estimado de ${formatHoras(road, 80)} de carro.`,
    },
    // "Quantos km de [A] a [B] de carro?" · "quantos km de [A] a [B]"
    {
      name: `Quantos km de ${origin.n} a ${dest.n} de carro?`,
      text: `São aproximadamente ${road.toLocaleString('pt-BR')} km de estrada. Você pode simular o consumo e o custo exato do combustível para esta viagem na nossa calculadora de combustível integrada.`,
    },
    // ── Perguntas complementares (tempo, custo, pedágios, rota) ───────────────
    {
      name: `Quanto tempo de carro de ${origin.n} a ${dest.n}?`,
      text: `De carro, a uma velocidade média de 80 km/h, a viagem de ${origin.n} a ${dest.n} leva aproximadamente ${formatHoras(road, 80)}. De ônibus (~60 km/h), leva cerca de ${formatHoras(road, 60)}.`,
    },
    {
      name: `Quanto gasto de gasolina de ${origin.n} a ${dest.n}?`,
      text: `Considerando um veículo que faz ${consumoPadrao} km/l e gasolina a R$ ${precoPadrao.toFixed(2).replace('.', ',')}/litro, o custo estimado é de ${custoCombustivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} só de ida (${litros.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} litros).`,
    },
    {
      name: `Quantos pedágios tem de ${origin.n} a ${dest.n}?`,
      text: `O número exato de pedágios varia conforme a rota escolhida. Recomendamos consultar o Google Maps ou o app da concessionária da rodovia para obter os valores atualizados de pedágio entre ${origin.n} e ${dest.n}.`,
    },
    {
      name: `Qual o melhor caminho de ${origin.n} para ${dest.n}?`,
      text: `Para visualizar a rota mais rápida ou mais curta de ${origin.n} a ${dest.n}, recomendamos abrir o Google Maps diretamente. Nossa ferramenta calcula a distância estimada (${road.toLocaleString('pt-BR')} km) e o custo de combustível para ajudar no seu planejamento.`,
    },
    // FAQ extra dinâmico — só aparece em rotas interestaduais (SEO on-page para long-tail)
    ...(isInterestadual
      ? [
          {
            name: `Como calcular o gasto de combustível para viajar de ${origin.n} para ${dest.n}?`,
            text: `Para calcular o gasto exato, divida a distância total de ${road.toLocaleString('pt-BR')} km pelo consumo médio de km/litro do seu veículo e multiplique pelo preço atual do combustível na bomba. Pode usar a calculadora completa do Buscacentral para simular o valor exato em segundos.`,
          },
        ]
      : []),
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'dateModified': '2026-08-16',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.text,
      },
    })),
  };

  // -------------------------------------------------------------------------
  // STRUCTURED DATA — HowTo Schema (rich snippet com passos visuais)
  // -------------------------------------------------------------------------
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'dateModified': '2026-08-16',
    name: `Como calcular a distância de ${origin.n} a ${dest.n}`,
    description: `Descubra a distância rodoviária, o tempo de viagem e o custo de combustível entre ${origin.n} (${origin.u}) e ${dest.n} (${dest.u}).`,
    totalTime: `PT${Math.floor((road / 80) * 60)}M`,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'BRL',
      value: Math.round(custoCombustivel).toString(),
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Verifique a distância por estrada',
        text: `A distância rodoviária estimada de ${origin.n} a ${dest.n} é de ${road.toLocaleString('pt-BR')} km (${straightLine.toLocaleString('pt-BR')} km em linha reta).`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Calcule o tempo de viagem',
        text: `A uma velocidade média de 80 km/h, o trajeto de carro leva aproximadamente ${formatHoras(road, 80)}. De ônibus (~60 km/h), cerca de ${formatHoras(road, 60)}.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Estime o consumo de combustível',
        text: `Divida a distância (${road.toLocaleString('pt-BR')} km) pelo consumo do seu veículo (ex: ${consumoPadrao} km/l) para obter os litros necessários: ${litros.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} litros.`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Calcule o custo total de combustível',
        text: `Multiplique os litros (${litros.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}) pelo preço do combustível (R$ ${precoPadrao.toFixed(2).replace('.', ',')}). Custo estimado: ${custoCombustivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} só de ida.`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Ajuste com o consumo real do seu veículo',
        text: `Para um resultado mais preciso, use a Calculadora de Combustível da BuscaCentral informando o consumo específico do seu carro e o preço atualizado na sua cidade.`,
        url: `https://buscacentral.com.br/utilidades/calculadora-combustivel?distancia=${road}`,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Trilha de navegação">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span className="mx-2">›</span>
        <Link href="/localizacao" className="hover:text-blue-600">Localização</Link>
        <span className="mx-2">›</span>
        <Link href="/localizacao/distancia-cidades" className="hover:text-blue-600">Distância entre Cidades</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{origin.n} a {dest.n}</span>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Distância de {origin.n} a {dest.n}
        </h1>
        <p className="text-gray-600 text-lg">
          A distância entre <strong>{origin.n} ({origin.u})</strong> e <strong>{dest.n} ({dest.u})</strong> é de
          aproximadamente <strong>{road.toLocaleString('pt-BR')} km</strong> por estrada.
        </p>
        <time dateTime="2026-08-16" className="text-xs text-gray-500 block mt-2">Atualizado em: 16 de agosto de 2026</time>
      </header>

      {/* ================================================================= */}
      {/* HERO DATA BLOCK — 3 colunas: distância, tempo, custo              */}
      {/* Resposta imediata à intenção de busca, sem scroll                 */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-sm font-medium text-blue-700 mb-1">Distância por estrada</p>
          <p className="text-4xl font-bold text-blue-600">
            {road.toLocaleString('pt-BR')} <span className="text-lg font-medium">km</span>
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-5 text-center">
          <p className="text-sm font-medium text-emerald-700 mb-1">Tempo de carro (~80 km/h)</p>
          <p className="text-4xl font-bold text-emerald-600">{formatHoras(road, 80)}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-5 text-center">
          <p className="text-sm font-medium text-amber-700 mb-1">Custo estimado (ida)</p>
          <p className="text-4xl font-bold text-amber-600">
            {custoCombustivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Linha reta: {straightLine.toLocaleString('pt-BR')} km · Ônibus (~60 km/h): {formatHoras(road, 60)} · Consumo base: {consumoPadrao} km/l a R$ {precoPadrao.toFixed(2).replace('.', ',')}
      </p>

      {/* AdSense Placement: Mid-Content */}
      <div className="w-full mb-8 min-h-[100px] flex justify-center">
        <AdBanner adSlot="auto" adFormat="auto" />
      </div>

      {/* ================================================================= */}
      {/* BLOCO ESTIMATIVA INTELIGENTE — Viagens > 150 km                    */}
      {/* Micro-card visual com cálculo rápido (12 km/L, R$ 6,00/L)         */}
      {/* ================================================================= */}
      {isViagemLonga && (
        <section className="mb-6">
          <div className="relative overflow-hidden rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 sm:p-7 shadow-sm">
            {/* Decorative background */}
            <div className="absolute -right-6 -top-6 text-[7rem] opacity-[0.04] select-none pointer-events-none">🚗</div>

            <div className="relative">
              <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 mb-3">
                <span className="text-2xl">🚗</span> Estimativa de Gasto para esta viagem
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-3 bg-white/80 border border-orange-100 rounded-xl px-4 py-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-lg">⛽</span>
                  <div>
                    <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Consumo médio estimado</p>
                    <p className="text-xl font-bold text-gray-900">
                      ~{litrosEstimativa.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} Litros
                    </p>
                    <p className="text-xs text-gray-500">com base num consumo médio de {consumoMedio} km/L</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/80 border border-orange-100 rounded-xl px-4 py-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-lg">💰</span>
                  <div>
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Custo estimado</p>
                    <p className="text-xl font-bold text-gray-900">
                      ~{custoEstimativa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p className="text-xs text-gray-500">com base na média nacional de R$ {precoPadrao.toFixed(2).replace('.', ',')}/L</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                * Estimativa baseada em médias de mercado. O consumo real varia conforme o modelo do veículo, tipo de combustível, condições da estrada e estilo de condução.
              </p>
            </div>
          </div>

          {/* ─── CTA PERSONALIZADO — Conversão agressiva para a calculadora ─── */}
          <Link
            href={`/utilidades/calculadora-combustivel?distancia=${road}&origem=${encodeURIComponent(origin.n)}&destino=${encodeURIComponent(dest.n)}`}
            className="group mt-4 flex items-center justify-between gap-4 w-full px-5 py-4 sm:px-7 sm:py-5 rounded-2xl border-2 border-blue-500/80 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-800 hover:border-blue-600 transition-all duration-300"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex-shrink-0 text-3xl sm:text-4xl">🎯</span>
              <div>
                <p className="text-base sm:text-lg font-bold leading-tight">
                  Personalizar Cálculo com o Consumo do Meu Carro
                </p>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">
                  Informe o consumo real do seu veículo e o preço na sua cidade — os {road.toLocaleString('pt-BR')} km já estarão preenchidos
                </p>
              </div>
            </div>
            <span className="flex-shrink-0 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </section>
      )}

      {/* Detalhes adicionais da viagem */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-slate-500 mb-1">Ônibus (~60 km/h)</p>
          <p className="text-xl font-bold text-slate-700">{formatHoras(road, 60)}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-slate-500 mb-1">Litros necessários</p>
          <p className="text-xl font-bold text-slate-700">{litros.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} L</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-slate-500 mb-1">Ida e volta</p>
          <p className="text-xl font-bold text-slate-700">{(road * 2).toLocaleString('pt-BR')} km</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-slate-500 mb-1">Custo ida+volta</p>
          <p className="text-xl font-bold text-slate-700">
            {(custoCombustivel * 2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>

      {/* ================================================================= */}
      {/* CALLOUTS CONTEXTUAIS — Combustível & Carregadores Elétricos       */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
        {/* Card 1: Calculadora de Combustível */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-white border border-blue-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-sm">
                ⛽
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                Planejamento de Viagem
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
              Vai viajar de carro? Calcule os gastos com combustível
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Estime o consumo de gasolina, etanol e o custo total para o trajeto entre as cidades selecionadas.
            </p>
          </div>
          <Link
            href={`/utilidades/calculadora-combustivel?distancia=${road}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <span>Calcular Combustível</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        {/* Card 2: Eletropostos e Carregadores Elétricos */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border border-emerald-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-sm">
                ⚡
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Mobilidade Elétrica
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
              Viajando de Carro Elétrico ou Híbrido?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Encontre estações de recarga rápida (BYD, GWM, Volvo) próximas e ao longo de rodovias em tempo real.
            </p>
          </div>
          <Link
            href="/localizacao/carregador-eletrico/perto-de-mim"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <span>Ver Eletropostos Perto de Mim</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* CTAs secundários */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 transition-colors"
        >
          📍 Ver rota no Google Maps
        </a>
        <Link
          href="/localizacao/distancia-cidades"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          🧮 Calcular outra distância
        </Link>
      </div>

      {/* Conteúdo SEO */}
      <article className="prose prose-gray max-w-none mb-10">
        {isSorocabaPiracicaba && (
          <p>
            Se você quer saber <strong>qual a distância de Piracicaba para Sorocaba</strong> ou está se planejando para viajar pela região, pode estar se perguntando: <strong>Piracicaba é perto de Sorocaba?</strong> A resposta é sim! O trajeto possui pouco mais de 80 km. Saiba a seguir qual o tempo estimado de viagem e <strong>quantos km de distância entre Sorocaba e Piracicaba</strong> por estrada para planejar o consumo de combustível da sua viagem.
          </p>
        )}

        <h2>Como calculamos a distância de {origin.n} a {dest.n}</h2>
        <p>
          A distância em linha reta de <strong>{straightLine.toLocaleString('pt-BR')} km</strong> entre {origin.n} e{' '}
          {dest.n} é calculada com a fórmula de Haversine, usando as coordenadas geográficas oficiais do IBGE.
          Como as estradas não seguem uma linha reta, aplicamos um fator de correção de aproximadamente 30% para
          estimar a <strong>distância rodoviária de {road.toLocaleString('pt-BR')} km</strong> — um valor próximo
          do que você efetivamente percorrerá de carro ou ônibus.
        </p>

        <h3>Custo de combustível de {origin.n} a {dest.n}</h3>
        <p>
          Para estimar o gasto de gasolina, usamos valores de referência: consumo médio de {consumoPadrao} km/l
          e preço de R$ {precoPadrao.toFixed(2).replace('.', ',')} por litro. Com esses parâmetros, a viagem
          de {origin.n} a {dest.n} consome aproximadamente{' '}
          <strong>{litros.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} litros</strong>, custando{' '}
          <strong>{custoCombustivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong> só de ida.
          Para um cálculo personalizado com o consumo real do seu veículo,{' '}
          <Link href={`/utilidades/calculadora-combustivel?distancia=${road}`} className="text-blue-600 hover:underline font-semibold">
            use nossa calculadora de combustível
          </Link>.
        </p>

        <h3>Tempo de viagem</h3>
        <p>
          Os tempos de viagem são estimativas baseadas em velocidades médias e não consideram paradas, trânsito,
          pedágios ou condições da via. De carro a ~80 km/h, a viagem leva cerca de <strong>{formatHoras(road, 80)}</strong>.
          De ônibus a ~60 km/h, espere cerca de <strong>{formatHoras(road, 60)}</strong>. Para a rota exata,
          recomendamos conferir também no Google Maps.
        </p>

        <h3>Planejando sua viagem de {origin.n} para {dest.n}</h3>
        <p>
          Ao planejar uma viagem de <strong>{origin.n} ({origin.u})</strong> para <strong>{dest.n} ({dest.u})</strong>, é essencial compreender as características da rota. Este percurso exige preparação adequada e atenção aos detalhes da estrada para garantir uma jornada tranquila e segura até o seu destino. A distância de {road.toLocaleString('pt-BR')} km e o tempo estimado reforçam a importância de um planejamento detalhado.
        </p>
        <p>
          Recomendamos realizar uma revisão veicular completa antes de pegar a estrada para {dest.n}. Verifique a pressão e o desgaste dos pneus, os níveis de óleo e fluidos, além de testar os freios e o sistema de iluminação. Devido à extensão do trajeto, é fundamental planejar paradas estratégicas para abastecimento e descanso, ajudando a manter o foco e a segurança durante a condução.
        </p>
        <p>
          Como dicas gerais para uma viagem segura, sempre verifique as condições meteorológicas previstas para o dia e evite dirigir sob chuva forte ou neblina intensa. Respeite os limites de velocidade e mantenha distância segura dos outros veículos. Caso prefira não dirigir, avaliar a possibilidade de fazer o trajeto de ônibus pode ser uma alternativa confortável, permitindo que você descanse enquanto viaja de {origin.n} até {dest.n}.
        </p>
      </article>

      {/* ================================================================= */}
      {/* FAQ VISÍVEL — Perguntas Frequentes com <details>                   */}
      {/* ================================================================= */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 group"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-center justify-between gap-2">
                <span>{item.name}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-3 leading-relaxed">{item.text}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* FERRAMENTAS RELACIONADAS — Cross-sell / Interlinking               */}
      {/* ================================================================= */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ferramentas úteis para sua viagem</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/utilidades/calculadora-combustivel?distancia=${road}`}
            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">⛽</span>
            <div>
              <p className="font-semibold text-slate-800">Calculadora de Combustível</p>
              <p className="text-xs text-slate-500">Calcule o gasto com seu consumo real</p>
            </div>
          </Link>
          <Link
            href="/localizacao/distancia-cidades"
            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">🗺️</span>
            <div>
              <p className="font-semibold text-slate-800">Calcular outra distância</p>
              <p className="text-xs text-slate-500">Qualquer cidade do Brasil</p>
            </div>
          </Link>
          <Link
            href="/financeiro/tabela-fipe"
            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">🚗</span>
            <div>
              <p className="font-semibold text-slate-800">Tabela FIPE</p>
              <p className="text-xs text-slate-500">Consulte o valor do seu veículo</p>
            </div>
          </Link>
          <Link
            href="/financeiro/financiamento-carro"
            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-semibold text-slate-800">Financiamento de Carro</p>
              <p className="text-xs text-slate-500">Simule parcelas e taxas</p>
            </div>
          </Link>
          <Link
            href="/utilidades/conversor-unidades"
            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">📐</span>
            <div>
              <p className="font-semibold text-slate-800">Conversor de Unidades</p>
              <p className="text-xs text-slate-500">Km, milhas, litros, galões...</p>
            </div>
          </Link>
          <Link
            href="/utilidades/dias-uteis"
            className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-semibold text-slate-800">Dias Úteis</p>
              <p className="text-xs text-slate-500">Calcule prazos de entrega/frete</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ================================================================= */}
      {/* BLOCO DISCRETO — Custo Estimado de Combustível                    */}
      {/* ================================================================= */}
      <section className="mb-8 bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-1">
              <span>⛽</span>
              <span>Custo estimado de combustível para esta rota</span>
            </h3>
            <p className="text-sm text-slate-600">
              Viagem de <strong>{road.toLocaleString('pt-BR')} km</strong>:{' '}
              <strong className="text-slate-900">
                {((road / CONSUMO_MEDIO_INLINE) * PRECO_MEDIO_COMBUSTIVEL_INLINE).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>{' '}
              <span className="text-xs text-slate-500">
                (estimativa com média de {CONSUMO_MEDIO_INLINE} km/L a R$ {PRECO_MEDIO_COMBUSTIVEL_INLINE.toFixed(2).replace('.', ',')}/L)
              </span>
            </p>
          </div>
          <Link
            href={`/utilidades/calculadora-combustivel?distancia=${road}`}
            className="flex-shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
          >
            <span>Personalizar na Calculadora</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Links internos para outras distâncias */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Distâncias a partir de {origin.n}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {outras.map((c) => (
            <Link
              key={c.slug}
              href={pairUrl(origin.slug, c.slug)}
              className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-slate-800">
                {origin.n} → {c.n} ({c.u})
              </span>
              <span className="text-slate-400">›</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
