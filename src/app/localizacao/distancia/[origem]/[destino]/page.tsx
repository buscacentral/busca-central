import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import AdBanner from '@/components/AdBanner';
import SemPararBanner from '@/components/affiliates/SemPararBanner';
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
// gerados sob demanda na primeira visita e ficam em cache (ISR por 24 horas).
export const dynamicParams = true;
export const revalidate = 86400;

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
    const title = `Distância de ${originName} a ${destName}: Km, Tempo, Pedágios e Custo [2026]`;
    const description = `Descubra a distância exata de ${originName} até ${destName}, tempo estimado de viagem de carro, valor dos pedágios e custo de combustível. Calcule sua rota!`;
    const canonical = `https://buscacentral.com.br/localizacao/distancia/${origem}/${destino}`;
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

  const { origin, dest } = result;

  // ─── Title ────────────────────────────────────────────────────────────────
  // Fórmula de Alto CTR: "Distância de {Origem} a {Destino}: Km, Tempo, Pedágios e Custo [2026]"
  const title = `Distância de ${origin.n} a ${dest.n}: Km, Tempo, Pedágios e Custo [2026]`;

  // ─── Description ──────────────────────────────────────────────────────────
  const description = `Descubra a distância exata de ${origin.n} até ${dest.n}, tempo estimado de viagem de carro, valor dos pedágios e custo de combustível. Calcule sua rota!`;

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

  // Estimativa de pedágios (1 praça a cada 70 km, R$ 6,50/praça)
  const numPedagios = Math.max(1, Math.round(road / 70));
  const custoPedagio = numPedagios * 6.5;

  // Custo EV estimado (consumo médio 6 km/kWh, R$ 0,80/kWh)
  const custoEV = (road / 6) * 0.80;

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
    // ── Q1: Distância exata em km — resposta direta para AI Overview ────────
    {
      name: `Qual a distância de ${origin.n} a ${dest.n} em km?`,
      text: `A distância de ${origin.n} a ${dest.n} é de ${road.toLocaleString('pt-BR')} km por estrada (${straightLine.toLocaleString('pt-BR')} km em linha reta). O tempo estimado de viagem de carro a 80 km/h é de aproximadamente ${formatHoras(road, 80)}.`,
    },
    // ── Q2: Tempo de carro e ônibus — resposta direta com valores numéricos ─
    {
      name: `Quanto tempo demora de ${origin.n} a ${dest.n} de carro?`,
      text: `De carro, a viagem de ${origin.n} a ${dest.n} dura aproximadamente ${formatHoras(road, 80)} a uma velocidade média de 80 km/h. De ônibus, o tempo estimado é de ${formatHoras(road, 60)} (considerando ~60 km/h com paradas). A distância rodoviária é de ${road.toLocaleString('pt-BR')} km.`,
    },
    // ── Q3: Custo de combustível com valores explícitos ──────────────────────
    {
      name: `Quanto gasta de gasolina de ${origin.n} a ${dest.n}?`,
      text: `Considerando consumo de ${consumoPadrao} km/L e gasolina a R$ ${precoPadrao.toFixed(2).replace('.', ',')}/L, o custo de combustível de ${origin.n} a ${dest.n} é de aproximadamente R$ ${custoCombustivel.toFixed(2).replace('.', ',')} (${litros.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} litros) apenas na ida. Para a ida e volta, o custo estimado é de R$ ${(custoCombustivel * 2).toFixed(2).replace('.', ',')}.`,
    },
    // ── Q4: Pedágios — estimativa numérica explícita ─────────────────────────
    {
      name: `Quantos pedágios tem de ${origin.n} a ${dest.n}?`,
      text: `Estimamos aproximadamente ${numPedagios} praça(s) de pedágio entre ${origin.n} e ${dest.n}, com custo médio de R$ ${custoPedagio.toFixed(2).replace('.', ',')} (base: R$ 6,50 por praça). O número exato varia conforme o trajeto e a concessionária da rodovia.`,
    },
    // ── Q5: Rota e mapa ──────────────────────────────────────────────────────
    {
      name: `Qual a melhor rota de ${origin.n} para ${dest.n}?`,
      text: `A rota mais comum de ${origin.n} (${origin.u}) a ${dest.n} (${dest.u}) cobre ${road.toLocaleString('pt-BR')} km e dura cerca de ${formatHoras(road, 80)} de carro. Para ver o trajeto em tempo real com alternativas de rota, abra o Google Maps.`,
    },
    // FAQ extra dinâmico — só aparece em rotas interestaduais
    ...(isInterestadual
      ? [
          {
            name: `Quanto custa viajar de ${origin.n} para ${dest.n} incluindo pedágio?`,
            text: `O custo total estimado de ${origin.n} a ${dest.n} é de aproximadamente R$ ${(custoCombustivel + custoPedagio).toFixed(2).replace('.', ',')} na ida, incluindo R$ ${custoCombustivel.toFixed(2).replace('.', ',')} de combustível e R$ ${custoPedagio.toFixed(2).replace('.', ',')} de pedágio estimado (${numPedagios} praça(s) a ~R$ 6,50 cada). A distância é de ${road.toLocaleString('pt-BR')} km.`,
          },
        ]
      : []),
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'dateModified': '2026-08-18',
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
    'dateModified': '2026-08-18',
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
        <time dateTime="2026-08-18" className="text-xs text-gray-500 block mt-2">Atualizado em: 18 de agosto de 2026</time>
      </header>

      {/* ============================================================== */}
      {/* DIRECT ANSWER BOX — GEO / AI Overview optimizado               */}
      {/* Marcação semântica <section> + <dl> para consumo por IA        */}
      {/* ============================================================== */}
      <section
        aria-label={`Resumo Rápido da Rota de ${origin.n} a ${dest.n}`}
        className="mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border-2 border-blue-200/80 rounded-2xl p-5 sm:p-6 shadow-sm"
      >
        <h2 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-base shadow-sm" aria-hidden="true">⚡</span>
          Resumo do Trajeto de {origin.n} a {dest.n}
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div className="flex flex-col bg-white/70 border border-blue-100 rounded-xl px-4 py-3">
            <dt className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-0.5">Distância rodoviária</dt>
            <dd className="text-xl font-black text-gray-900">{road.toLocaleString('pt-BR')} km</dd>
            <dd className="text-xs text-gray-500">{straightLine.toLocaleString('pt-BR')} km em linha reta</dd>
          </div>
          <div className="flex flex-col bg-white/70 border border-emerald-100 rounded-xl px-4 py-3">
            <dt className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-0.5">Tempo de carro</dt>
            <dd className="text-xl font-black text-gray-900">~{formatHoras(road, 80)}</dd>
            <dd className="text-xs text-gray-500">a 80 km/h de velocidade média</dd>
          </div>
          <div className="flex flex-col bg-white/70 border border-violet-100 rounded-xl px-4 py-3">
            <dt className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-0.5">Tempo de ônibus</dt>
            <dd className="text-xl font-black text-gray-900">~{formatHoras(road, 60)}</dd>
            <dd className="text-xs text-gray-500">~60 km/h com paradas estimadas</dd>
          </div>
          <div className="flex flex-col bg-white/70 border border-amber-100 rounded-xl px-4 py-3">
            <dt className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-0.5">Custo médio de combustível</dt>
            <dd className="text-xl font-black text-gray-900">{custoCombustivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</dd>
            <dd className="text-xs text-gray-500">{consumoPadrao} km/L · R$ {precoPadrao.toFixed(2).replace('.', ',')}/L · só ida</dd>
          </div>
          <div className="flex flex-col bg-white/70 border border-slate-100 rounded-xl px-4 py-3">
            <dt className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-0.5">Praças de pedágio est.</dt>
            <dd className="text-xl font-black text-gray-900">~{numPedagios} praça{numPedagios !== 1 ? 's' : ''}</dd>
            <dd className="text-xs text-gray-500">~R$ {custoPedagio.toFixed(2).replace('.', ',')} estimado (R$ 6,50/praça)</dd>
          </div>
          <div className="flex flex-col bg-white/70 border border-blue-100 rounded-xl px-4 py-3 sm:col-span-1">
            <dt className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-0.5">Custo total estimado</dt>
            <dd className="text-xl font-black text-gray-900">{(custoCombustivel + custoPedagio).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</dd>
            <dd className="text-xs text-gray-500">combustível + pedágio (ida)</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Link
            href={`/utilidades/calculadora-combustivel?distancia=${road}&origem=${encodeURIComponent(origin.n)}&destino=${encodeURIComponent(dest.n)}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            <span>Calcular com meu carro →</span>
          </Link>
          <Link
            href={`/localizacao/pedagio/${origin.slug}/${dest.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            <span>Ver estimativa de pedágios →</span>
          </Link>
        </div>
      </section>

      {/* ============================================================== */}
      {/* TABELA COMPARATIVA DE MODAIS DE VIAGEM — GEO / AI Overview     */}
      {/* ============================================================== */}
      <section aria-label="Comparativo de modais de transporte" className="mb-8">
        <h2 className="text-base font-bold text-gray-800 mb-3">Compare as opções de viagem</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th scope="col" className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap">Modal</th>
                <th scope="col" className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap">Tempo Estimado</th>
                <th scope="col" className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap">Custo Médio (ida)</th>
                <th scope="col" className="px-4 py-3 font-bold text-slate-700">Vantagens</th>
                <th scope="col" className="px-4 py-3 font-bold text-slate-700">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Linha Carro */}
              <tr className="hover:bg-blue-50/40 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                  <span className="mr-1.5" aria-hidden="true">🚗</span>Carro
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">~{formatHoras(road, 80)}</td>
                <td className="px-4 py-3 text-gray-700">
                  {(custoCombustivel + custoPedagio).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  <span className="block text-xs text-gray-500">combustível + pedágio</span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">Flexível, porta a porta, bagagem livre</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/localizacao/pedagio/${origin.slug}/${dest.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap gap-1"
                  >
                    Ver pedágios →
                  </Link>
                </td>
              </tr>
              {/* Linha Ônibus */}
              <tr className="hover:bg-violet-50/40 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                  <span className="mr-1.5" aria-hidden="true">🚌</span>Ônibus
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">~{formatHoras(road, 60)}</td>
                <td className="px-4 py-3 text-gray-700">
                  <span className="text-xs text-gray-500">Varia conforme empresa</span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">Econômico, sem preocupação com direção e pedágio</td>
                <td className="px-4 py-3">
                  <a
                    href={`https://www.buscaonibus.com.br/${origin.n.toLowerCase().replace(/\s+/g, '-')}-${dest.n.toLowerCase().replace(/\s+/g, '-')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-violet-600 hover:text-violet-800 whitespace-nowrap gap-1"
                  >
                    Comparar Passagens →
                  </a>
                </td>
              </tr>
              {/* Linha Carro Elétrico */}
              <tr className="hover:bg-emerald-50/40 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                  <span className="mr-1.5" aria-hidden="true">⚡</span>Carro Elétrico
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">~{formatHoras(road, 80)}</td>
                <td className="px-4 py-3 text-gray-700">
                  ~{custoEV.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  <span className="block text-xs text-gray-500">6 km/kWh · R$ 0,80/kWh</span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">Custo menor que gasolina, zero emissões locais</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/localizacao/planejador-viagem-ev/${origin.slug}/${dest.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap gap-1"
                  >
                    Planejar rota EV →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">* Estimativas baseadas em médias de mercado. Valores reais variam conforme veículo, combustível e rota.</p>
      </section>

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

      {/* Banner de Afiliado Sem Parar (Awin) */}
      <SemPararBanner
        variant="card"
        className="mb-10"
        title={`Planejando pegar a estrada de ${origin.n} para ${dest.n}?`}
        subtitle={`Economize tempo e passe direto nas cabines de pedágio ao longo dos ${road.toLocaleString('pt-BR')} km de trajeto com a tag Sem Parar. 100% de cobertura nacional e descontos no Free Flow.`}
      />

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
