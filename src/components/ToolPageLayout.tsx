import type { Metadata } from 'next';
import Link from 'next/link';
import AdPlaceholder from './AdPlaceholder';
import { getToolLastUpdated, getRelatedTools } from '@/lib/tools';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedTool {
  title: string;
  url: string;
  description?: string;
}

interface ToolPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  ariaLabel?: string;
  showMiddleAd?: boolean;
  seoContent?: React.ReactNode;
  faqItems?: FAQItem[];
  relatedTools?: RelatedTool[];
  path?: string;
  /** Data da última atualização da ferramenta no formato ISO (ex.: "2026-06-16"). */
  lastUpdated?: string;
}

/** Formata uma data ISO (YYYY-MM-DD) para o formato pt-BR (DD/MM/AAAA), sem desvio de fuso. */
function formatUpdatedDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

const SITE_URL = 'https://buscacentral.com.br';

const CATEGORY_LABELS: Record<string, string> = {
  documentos: 'Documentos',
  localizacao: 'Localização',
  financeiro: 'Financeiro',
  utilidades: 'Utilidades',
  artigos: 'Artigos',
};

interface Breadcrumb {
  name: string;
  url: string;
}

/** Transforma um slug (ex.: "tabela-fipe") em rótulo legível ("Tabela Fipe"). */
function prettifySegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Constrói a trilha de breadcrumbs a partir do caminho da página. */
function buildBreadcrumbs(path: string, currentTitle: string): Breadcrumb[] {
  const segments = path.split('/').filter(Boolean);
  const crumbs: Breadcrumb[] = [{ name: 'Início', url: `${SITE_URL}/` }];

  let accumulated = '';
  segments.forEach((segment, index) => {
    accumulated += `/${segment}`;
    const isLast = index === segments.length - 1;
    crumbs.push({
      name: isLast ? currentTitle : CATEGORY_LABELS[segment] || prettifySegment(segment),
      url: `${SITE_URL}${accumulated}`,
    });
  });

  return crumbs;
}

/**
 * ToolPageLayout - Template base para páginas de ferramentas
 * 
 * Estrutura semântica:
 * - <article> como container principal da ferramenta
 * - <section> com aria-label para cada área
 * - Hierarquia de headings correta (h1 único)
 * - Prevenção de CLS para anúncios
 * 
 * Uso:
 * ```tsx
 * export const metadata: Metadata = {
 *   title: 'Gerador de CPF',
 *   description: 'Gere CPFs válidos para testes.',
 *   openGraph: {
 *     title: 'Gerador de CPF | BuscaCentral',
 *     description: 'Gere CPFs válidos para testes.',
 *     url: 'https://buscacentral.com.br/documentos/gerador-cpf',
 *     type: 'website',
 *   },
 * };
 * 
 * export default function GeradorCPF() {
 *   return (
 *     <ToolPageLayout
 *       title="Gerador de CPF"
 *       description="Gere CPFs válidos para testes."
 *       ariaLabel="Gerador de CPF interativo"
 *     >
 *       {/* Seu conteúdo aqui *\/}
 *     </ToolPageLayout>
 *   );
 * }
 * ```
 */
export default function ToolPageLayout({
  children,
  title,
  description,
  ariaLabel,
  showMiddleAd = true,
  seoContent,
  faqItems,
  relatedTools,
  path,
  lastUpdated,
}: ToolPageLayoutProps) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const breadcrumbs = path ? buildBreadcrumbs(path, title) : null;

  // Usa a data explícita (prop) ou, na ausência, a data centralizada em
  // src/lib/tools.ts mapeada pelo path da ferramenta.
  const effectiveLastUpdated = lastUpdated ?? getToolLastUpdated(path);

  // Ferramentas relacionadas: usa a lista curada da página, ou — na ausência —
  // gera automaticamente a partir da mesma categoria (links internos para
  // todas as ferramentas, sem manutenção manual).
  const effectiveRelatedTools: RelatedTool[] =
    relatedTools && relatedTools.length > 0 ? relatedTools : getRelatedTools(path);

  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.url,
        })),
      }
    : null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": description,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "url": url,
    ...(effectiveLastUpdated ? { "dateModified": effectiveLastUpdated } : {}),
  };

  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Trilha de navegação (breadcrumbs) */}
      {breadcrumbs && (
        <nav aria-label="Trilha de navegação" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              const href = crumb.url.replace(SITE_URL, '') || '/';
              return (
                <li key={crumb.url} className="flex items-center gap-1.5">
                  {isLast ? (
                    <span className="text-gray-700 font-medium" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={href} className="hover:text-blue-600 transition-colors">
                        {crumb.name}
                      </Link>
                      <span className="text-gray-300" aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* Cabeçalho da ferramenta */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 text-lg">{description}</p>
        {effectiveLastUpdated && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-500">
            <span aria-hidden="true">🗓️</span>
            Atualizado em{' '}
            <time dateTime={effectiveLastUpdated} className="font-medium text-gray-600">
              {formatUpdatedDate(effectiveLastUpdated)}
            </time>
          </p>
        )}
      </header>

      {/* Área interativa da ferramenta */}
      <section
        id="interactive-tool"
        aria-label={ariaLabel || title}
        className="mb-8"
      >
        {children}
      </section>

      {/* Anúncio do meio da página com prevenção de CLS */}
      {showMiddleAd && (
        <div className="ads-wrapper" style={{ minHeight: '250px' }}>
          <AdPlaceholder position="middle" />
        </div>
      )}

      {/* Seção de conteúdo SEO */}
      {seoContent && (
        <section
          id="seo-content"
          aria-label="Informações sobre a ferramenta"
          className="mt-12"
        >
          {seoContent}
        </section>
      )}

      {/* Seção de Perguntas Frequentes (Visível e Otimizada para AdSense) */}
      {faqItems && faqItems.length > 0 && (
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-lg text-slate-800 mb-2 flex items-start gap-2">
                  <span className="text-sky-500">❓</span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ferramentas Relacionadas */}
      {effectiveRelatedTools && effectiveRelatedTools.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ferramentas Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {effectiveRelatedTools.map((tool, idx) => (
              <Link 
                key={idx} 
                href={tool.url}
                className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{tool.title}</h3>
                {tool.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{tool.description}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/**
 * Gera metadados Open Graph para uma página de ferramenta
 * 
 * @param title - Título da ferramenta
 * @param description - Descrição da ferramenta (150-160 caracteres)
 * @param path - Caminho da página (ex: /documentos/gerador-cpf)
 * @returns Metadata object para Next.js
 */
export function generateToolMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  // O root layout já aplica o template "%s | BuscaCentral" no <title>.
  // OG/Twitter são independentes e precisam do sufixo explícito.
  const ogTitle = `${title} | BuscaCentral`;
  const url = `https://buscacentral.com.br${path}`;

  // Usa a imagem Open Graph da categoria (ex.: /documentos/opengraph-image),
  // com fallback para a imagem padrão do site. Sem isto, as ferramentas
  // ficavam sem og:image ao serem compartilhadas.
  const categories = ['documentos', 'financeiro', 'localizacao', 'utilidades'];
  const segment = path.split('/').filter(Boolean)[0];
  const ogImage = categories.includes(segment)
    ? `https://buscacentral.com.br/${segment}/opengraph-image`
    : 'https://buscacentral.com.br/opengraph-image';

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: 'BuscaCentral',
      locale: 'pt_BR',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
