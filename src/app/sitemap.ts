import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { artigos } from './artigos/page';
import { TOP_10 as cryptoIds } from './financeiro/criptomoedas/[id]/page';
import { SITE_LAST_REVIEWED } from '@/lib/tools';
import { getCityPairs } from '@/lib/distancia-cidades';
import { SALARIOS_COMUNS } from '@/lib/salario-liquido-faixas';

const baseUrl = 'https://buscacentral.com.br';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

/** Data de última revisão do conteúdo (estável entre deploys). */
const reviewedDate = new Date(`${SITE_LAST_REVIEWED}T12:00:00`);

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
  return new Date(year, month, day, 12, 0, 0);
}

const articleDates = new Map<string, Date>(
  artigos.map((artigo) => [`/artigos/${artigo.slug}`, parsePtDate(artigo.date)]),
);

const CATEGORY_LANDINGS = new Set([
  '/documentos', '/financeiro', '/localizacao', '/utilidades', '/artigos',
]);

/**
 * Define prioridade, frequência de mudança e data de modificação por tipo de
 * rota, em vez de aplicar os mesmos valores a todas as páginas.
 */
function routeMeta(route: string): {
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified: Date;
} {
  // Home
  if (route === '/') {
    return { priority: 1.0, changeFrequency: 'daily', lastModified: reviewedDate };
  }
  // Artigos (data real de publicação)
  if (articleDates.has(route)) {
    return { priority: 0.7, changeFrequency: 'monthly', lastModified: articleDates.get(route)! };
  }
  // Páginas de criptomoeda (preços mudam diariamente)
  if (route.startsWith('/financeiro/criptomoedas/')) {
    return { priority: 0.6, changeFrequency: 'daily', lastModified: new Date() };
  }
  // Páginas programáticas de distância entre cidades (alto volume de busca)
  if (route.startsWith('/localizacao/distancia/')) {
    return { priority: 0.7, changeFrequency: 'weekly', lastModified: reviewedDate };
  }
  // Páginas programáticas de salário líquido por faixa
  if (route.startsWith('/financeiro/salario-liquido/')) {
    return { priority: 0.6, changeFrequency: 'monthly', lastModified: reviewedDate };
  }

  const segments = route.split('/').filter(Boolean);

  // Landing de categoria (ex.: /financeiro) vs. páginas institucionais/legais
  if (segments.length === 1) {
    if (CATEGORY_LANDINGS.has(route)) {
      return { priority: 0.9, changeFrequency: 'weekly', lastModified: reviewedDate };
    }
    // /sobre, /contato, /privacidade, /termos, /novidades
    return { priority: 0.4, changeFrequency: 'yearly', lastModified: reviewedDate };
  }

  // Páginas de ferramenta (ex.: /financeiro/tabela-fipe)
  return { priority: 0.8, changeFrequency: 'monthly', lastModified: reviewedDate };
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
  const salarioRoutes = SALARIOS_COMUNS.map(
    (v) => `/financeiro/salario-liquido/${v}`,
  );

  // Rotas que não devem aparecer no sitemap (ex.: resultados de busca, marcados
  // como noindex).
  const excludedRoutes = new Set(['/buscar']);

  // Remove duplicatas e ordena (mantendo a home em primeiro).
  const allRoutes = Array.from(
    new Set([...staticRoutes, ...articleRoutes, ...cryptoRoutes, ...distanceRoutes, ...salarioRoutes]),
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
