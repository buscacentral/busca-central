import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { artigos } from './artigos/page';
import { TOP_10 as cryptoIds } from './financeiro/criptomoedas/[id]/page';
import { SITE_LAST_REVIEWED } from '@/lib/tools';
import { getCityPairs, getAllCities, getInternationalCities } from '@/lib/distancia-cidades';
import { SALARIOS_COMUNS } from '@/lib/salario-liquido-faixas';

const baseUrl = 'https://buscacentral.com.br';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

/** Data padrão de última revisão do conteúdo (fallback estável). */
const reviewedDate = new Date(`${SITE_LAST_REVIEWED}T12:00:00.000Z`);

const MESES: Record<string, number> = {
  janeiro: 0, fevereiro: 1, marco: 2, 'março': 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11,
};

/** Converte datas em pt-BR ("15 de Junho, 2026") para Date. */
function parsePtDate(input: string): Date {
  const match = input
    .toLowerCase()
    .match(/(\d{1,2})\s+de\s+([a-zç]+),?\s+(\d{4})/);
  if (!match) return reviewedDate;
  const day = parseInt(match[1], 10);
  const month = MESES[match[2]] ?? 0;
  const year = parseInt(match[3], 10);
  return new Date(Date.UTC(year, month, day, 12, 0, 0));
}

const articleDates = new Map<string, Date>(
  artigos.map((artigo) => [`/artigos/${artigo.slug}`, parsePtDate(artigo.date)]),
);

const CATEGORY_LANDINGS = new Set([
  '/documentos', '/financeiro', '/localizacao', '/utilidades', '/artigos',
]);

/** Cache em memória das datas extraídas dos arquivos de rota */
const pageDateCache = new Map<string, Date>();

/**
 * Lê o arquivo de código da página correspondente e extrai a data real de modificação
 * declarada no schema JSON-LD ("dateModified"), na prop lastUpdated ou na tag <time>.
 */
function extractDateFromPageFile(filePath: string): Date | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Procura dateModified no schema JSON-LD: "dateModified": "2026-08-16"
    const schemaMatch = content.match(/["']dateModified["']\s*:\s*["'](\d{4}-\d{2}-\d{2})["']/);
    if (schemaMatch) {
      return new Date(`${schemaMatch[1]}T12:00:00.000Z`);
    }

    // 2. Procura lastUpdated prop em ToolPageLayout: lastUpdated="2026-08-16"
    const propMatch = content.match(/lastUpdated\s*=\s*["'](\d{4}-\d{2}-\d{2})["']/);
    if (propMatch) {
      return new Date(`${propMatch[1]}T12:00:00.000Z`);
    }

    // 3. Procura dateTime em tag <time dateTime="2026-08-16">
    const timeMatch = content.match(/<time[^>]*dateTime=["'](\d{4}-\d{2}-\d{2})["']/);
    if (timeMatch) {
      return new Date(`${timeMatch[1]}T12:00:00.000Z`);
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Mapeia a URL de uma rota para o seu respectivo arquivo físico page.tsx em src/app
 */
function getPageFilePath(route: string): string {
  const appDir = path.join(process.cwd(), 'src', 'app');
  if (route === '/') return path.join(appDir, 'page.tsx');

  // Rotas dinâmicas programáticas
  if (route.startsWith('/financeiro/salario-liquido/') && route !== '/financeiro/salario-liquido') {
    return path.join(appDir, 'financeiro', 'salario-liquido', '[valor]', 'page.tsx');
  }
  if (route.startsWith('/localizacao/distancia/') && route !== '/localizacao/distancia-cidades') {
    return path.join(appDir, 'localizacao', 'distancia', '[origem]', '[destino]', 'page.tsx');
  }
  if (route.startsWith('/localizacao/pedagio/')) {
    return path.join(appDir, 'localizacao', 'pedagio', '[origem]', '[destino]', 'page.tsx');
  }
  if (route.startsWith('/localizacao/planejador-viagem-ev/') && route !== '/localizacao/planejador-viagem-ev') {
    return path.join(appDir, 'localizacao', 'planejador-viagem-ev', '[origem]', '[destino]', 'page.tsx');
  }
  if (route.startsWith('/localizacao/carregador-eletrico/') && route !== '/localizacao/carregador-eletrico' && route !== '/localizacao/carregador-eletrico/perto-de-mim') {
    return path.join(appDir, 'localizacao', 'carregador-eletrico', '[cidade-uf]', 'page.tsx');
  }
  if (route.startsWith('/financeiro/criptomoedas/') && route !== '/financeiro/criptomoedas') {
    return path.join(appDir, 'financeiro', 'criptomoedas', '[id]', 'page.tsx');
  }

  // Rotas estáticas
  const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
  return path.join(appDir, cleanRoute, 'page.tsx');
}

/**
 * Obtém a data de modificação da rota, com cache em memória
 */
function getRouteLastModified(route: string): Date {
  if (articleDates.has(route)) {
    return articleDates.get(route)!;
  }
  if (pageDateCache.has(route)) {
    return pageDateCache.get(route)!;
  }

  const filePath = getPageFilePath(route);
  const extractedDate = extractDateFromPageFile(filePath);
  const finalDate = extractedDate ?? reviewedDate;

  pageDateCache.set(route, finalDate);
  return finalDate;
}

/**
 * Define prioridade, frequência de mudança e data de modificação por tipo de
 * rota, lendo a data dinamicamente do arquivo correspondente.
 */
function routeMeta(route: string): {
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified: Date;
} {
  const lastModified = getRouteLastModified(route);

  // Home
  if (route === '/') {
    return { priority: 1.0, changeFrequency: 'daily', lastModified };
  }
  // Artigos (data real de publicação)
  if (articleDates.has(route)) {
    return { priority: 0.7, changeFrequency: 'monthly', lastModified };
  }
  // Páginas de criptomoeda (preços mudam diariamente)
  if (route.startsWith('/financeiro/criptomoedas/')) {
    return { priority: 0.6, changeFrequency: 'daily', lastModified };
  }
  // Páginas programáticas de distância entre cidades (alto volume de busca)
  if (route.startsWith('/localizacao/distancia/')) {
    return { priority: 0.7, changeFrequency: 'weekly', lastModified };
  }
  // Páginas programáticas de estimativa de pedágio entre cidades
  if (route.startsWith('/localizacao/pedagio/')) {
    return { priority: 0.7, changeFrequency: 'weekly', lastModified };
  }
  // Páginas programáticas de Eletropostos
  if (route.startsWith('/localizacao/carregador-eletrico/')) {
    return { priority: 0.8, changeFrequency: 'weekly', lastModified };
  }
  // Páginas programáticas de Planejador de Viagens EV
  if (route.startsWith('/localizacao/planejador-viagem-ev/')) {
    return { priority: 0.7, changeFrequency: 'weekly', lastModified };
  }
  // Páginas programáticas de salário líquido por faixa
  if (route.startsWith('/financeiro/salario-liquido/')) {
    return { priority: 0.6, changeFrequency: 'monthly', lastModified };
  }

  const segments = route.split('/').filter(Boolean);

  // Landing de categoria (ex.: /financeiro) vs. páginas institucionais/legais
  if (segments.length === 1) {
    if (CATEGORY_LANDINGS.has(route)) {
      return { priority: 0.9, changeFrequency: 'weekly', lastModified };
    }
    // /sobre, /contato, /privacidade, /termos, /novidades
    return { priority: 0.4, changeFrequency: 'yearly', lastModified };
  }

  // Páginas de ferramenta (ex.: /financeiro/tabela-fipe, /documentos/gerador-recibos)
  return { priority: 0.8, changeFrequency: 'monthly', lastModified };
}

/**
 * Descobre automaticamente todas as rotas estáticas varrendo o diretório
 * `src/app` em busca de arquivos `page.tsx`. Dessa forma, toda nova ferramenta
 * entra no sitemap sem precisar de manutenção manual.
 *
 * Segmentos dinâmicos ([slug]), route groups ((grupo)), pastas privadas (_) e a
 * pasta `api` são ignorados — as rotas dinâmicas são adicionadas explicitamente
 * a partir das suas respectivas fontes de dados.
 */
function getStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const routes: string[] = [];

  function walk(dir: string, route: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const hasPage = entries.some(
      (entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name),
    );
    if (hasPage) {
      routes.push(route === '' ? '/' : route);
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      // Ignora API, segmentos dinâmicos, route groups e pastas privadas.
      if (
        name === 'api' ||
        name.startsWith('[') ||
        name.startsWith('(') ||
        name.startsWith('_')
      ) {
        continue;
      }
      walk(path.join(dir, name), `${route}/${name}`);
    }
  }

  walk(appDir, '');
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = getStaticRoutes();
  const articleRoutes = artigos.map((artigo) => `/artigos/${artigo.slug}`);
  const cryptoRoutes = cryptoIds.map((id) => `/financeiro/criptomoedas/${id}`);
  const distanceRoutes = getCityPairs().map(
    ({ origem, destino }) => `/localizacao/distancia/${origem}/${destino}`,
  );
  const pedagioRoutes = getCityPairs().map(
    ({ origem, destino }) => `/localizacao/pedagio/${origem}/${destino}`,
  );
  const evTripRoutes = getCityPairs().map(
    ({ origem, destino }) => `/localizacao/planejador-viagem-ev/${origem}/${destino}`,
  );
  const salarioRoutes = SALARIOS_COMUNS.map(
    (v) => `/financeiro/salario-liquido/${v}`,
  );
  const evRoutes = [
    ...getAllCities(),
    ...getInternationalCities()
  ].map(
    (c) => `/localizacao/carregador-eletrico/${c.slug}`,
  );

  // Rotas que não devem aparecer no sitemap (ex.: resultados de busca, marcados
  // como noindex).
  const excludedRoutes = new Set(['/buscar']);

  // Remove duplicatas e ordena (mantendo a home em primeiro).
  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...articleRoutes,
      ...cryptoRoutes,
      ...distanceRoutes,
      ...pedagioRoutes,
      ...evTripRoutes,
      ...salarioRoutes,
      ...evRoutes
    ]),
  )
    .filter((route) => !excludedRoutes.has(route))
    .sort((a, b) => {
      if (a === '/') return -1;
      if (b === '/') return 1;
      return a.localeCompare(b);
    });

  return allRoutes.map((route) => {
    const meta = routeMeta(route);
    return {
      url: route === '/' ? baseUrl : `${baseUrl}${route}`,
      lastModified: meta.lastModified,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    };
  });
}
