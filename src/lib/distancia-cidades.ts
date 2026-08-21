import fs from 'node:fs';
import path from 'node:path';

/**
 * Lógica das páginas programáticas de "distância entre cidades".
 *
 * IMPORTANTE: este módulo lê o arquivo de cidades do filesystem em tempo de
 * build, portanto só pode ser importado por código server-side (page.tsx com
 * generateStaticParams / sitemap.ts). Nunca importar em Client Components.
 */

export interface City {
  n: string; // nome
  u: string; // UF
  lat: number;
  lon: number;
}

export interface CityResolved extends City {
  slug: string;
}

export interface DistanceResult {
  origin: CityResolved;
  dest: CityResolved;
  straightLine: number; // km em linha reta
  road: number; // km estimados por estrada
}

/**
 * Principais cidades brasileiras: as 27 capitais + as maiores cidades não-capitais
 * (por população). Os pares entre elas geram as páginas programáticas de distância.
 * Para expandir, basta adicionar mais cidades aqui (o nome deve bater com o IBGE,
 * acentuação é normalizada automaticamente).
 */
const CIDADES_PRINCIPAIS: { nome: string; uf: string }[] = [
  // Capitais
  { nome: 'Rio Branco', uf: 'AC' },
  { nome: 'Maceió', uf: 'AL' },
  { nome: 'Macapá', uf: 'AP' },
  { nome: 'Manaus', uf: 'AM' },
  { nome: 'Salvador', uf: 'BA' },
  { nome: 'Fortaleza', uf: 'CE' },
  { nome: 'Brasília', uf: 'DF' },
  { nome: 'Vitória', uf: 'ES' },
  { nome: 'Goiânia', uf: 'GO' },
  { nome: 'São Luís', uf: 'MA' },
  { nome: 'Cuiabá', uf: 'MT' },
  { nome: 'Campo Grande', uf: 'MS' },
  { nome: 'Belo Horizonte', uf: 'MG' },
  { nome: 'Belém', uf: 'PA' },
  { nome: 'João Pessoa', uf: 'PB' },
  { nome: 'Curitiba', uf: 'PR' },
  { nome: 'Recife', uf: 'PE' },
  { nome: 'Teresina', uf: 'PI' },
  { nome: 'Rio de Janeiro', uf: 'RJ' },
  { nome: 'Natal', uf: 'RN' },
  { nome: 'Porto Alegre', uf: 'RS' },
  { nome: 'Porto Velho', uf: 'RO' },
  { nome: 'Boa Vista', uf: 'RR' },
  { nome: 'Florianópolis', uf: 'SC' },
  { nome: 'São Paulo', uf: 'SP' },
  { nome: 'Aracaju', uf: 'SE' },
  { nome: 'Palmas', uf: 'TO' },
  // Maiores cidades não-capitais (SP)
  { nome: 'Guarulhos', uf: 'SP' },
  { nome: 'Campinas', uf: 'SP' },
  { nome: 'São Bernardo do Campo', uf: 'SP' },
  { nome: 'Santo André', uf: 'SP' },
  { nome: 'Osasco', uf: 'SP' },
  { nome: 'São José dos Campos', uf: 'SP' },
  { nome: 'Ribeirão Preto', uf: 'SP' },
  { nome: 'Sorocaba', uf: 'SP' },
  { nome: 'Santos', uf: 'SP' },
  { nome: 'Mauá', uf: 'SP' },
  { nome: 'São José do Rio Preto', uf: 'SP' },
  { nome: 'Mogi das Cruzes', uf: 'SP' },
  { nome: 'Diadema', uf: 'SP' },
  { nome: 'Piracicaba', uf: 'SP' },
  { nome: 'Carapicuíba', uf: 'SP' },
  { nome: 'Bauru', uf: 'SP' },
  { nome: 'Jundiaí', uf: 'SP' },
  { nome: 'Franca', uf: 'SP' },
  // RJ
  { nome: 'São Gonçalo', uf: 'RJ' },
  { nome: 'Duque de Caxias', uf: 'RJ' },
  { nome: 'Nova Iguaçu', uf: 'RJ' },
  { nome: 'Niterói', uf: 'RJ' },
  { nome: 'Campos dos Goytacazes', uf: 'RJ' },
  { nome: 'Belford Roxo', uf: 'RJ' },
  { nome: 'Volta Redonda', uf: 'RJ' },
  { nome: 'Petrópolis', uf: 'RJ' },
  // MG
  { nome: 'Contagem', uf: 'MG' },
  { nome: 'Uberlândia', uf: 'MG' },
  { nome: 'Juiz de Fora', uf: 'MG' },
  { nome: 'Betim', uf: 'MG' },
  { nome: 'Montes Claros', uf: 'MG' },
  { nome: 'Uberaba', uf: 'MG' },
  // BA
  { nome: 'Feira de Santana', uf: 'BA' },
  { nome: 'Vitória da Conquista', uf: 'BA' },
  { nome: 'Camaçari', uf: 'BA' },
  // SC
  { nome: 'Joinville', uf: 'SC' },
  { nome: 'Blumenau', uf: 'SC' },
  // PR
  { nome: 'Londrina', uf: 'PR' },
  { nome: 'Maringá', uf: 'PR' },
  { nome: 'Ponta Grossa', uf: 'PR' },
  { nome: 'Cascavel', uf: 'PR' },
  { nome: 'Foz do Iguaçu', uf: 'PR' },
  // RS
  { nome: 'Caxias do Sul', uf: 'RS' },
  { nome: 'Canoas', uf: 'RS' },
  { nome: 'Pelotas', uf: 'RS' },
  { nome: 'Santa Maria', uf: 'RS' },
  // GO
  { nome: 'Aparecida de Goiânia', uf: 'GO' },
  { nome: 'Anápolis', uf: 'GO' },
  // ES
  { nome: 'Serra', uf: 'ES' },
  { nome: 'Vila Velha', uf: 'ES' },
  // PE
  { nome: 'Olinda', uf: 'PE' },
  { nome: 'Jaboatão dos Guararapes', uf: 'PE' },
  { nome: 'Caruaru', uf: 'PE' },
  { nome: 'Petrolina', uf: 'PE' },
  // CE
  { nome: 'Caucaia', uf: 'CE' },
  { nome: 'Juazeiro do Norte', uf: 'CE' },
  // PA
  { nome: 'Ananindeua', uf: 'PA' },
  { nome: 'Santarém', uf: 'PA' },
  // Polos Turísticos e Regionais Estratégicos
  { nome: 'Gramado', uf: 'RS' },
  { nome: 'Canela', uf: 'RS' },
  { nome: 'Caldas Novas', uf: 'GO' },
  { nome: 'Porto Seguro', uf: 'BA' },
  { nome: 'Armação dos Búzios', uf: 'RJ' },
  { nome: 'Paraty', uf: 'RJ' },
  { nome: 'Angra dos Reis', uf: 'RJ' },
  { nome: 'Cabo Frio', uf: 'RJ' },
  { nome: 'Campos do Jordão', uf: 'SP' },
  { nome: 'Ubatuba', uf: 'SP' },
  { nome: 'Ilhabela', uf: 'SP' },
  { nome: 'Balneário Camboriú', uf: 'SC' },
  { nome: 'Maragogi', uf: 'AL' },
  { nome: 'Bonito', uf: 'MS' },
  { nome: 'Ouro Preto', uf: 'MG' },
  { nome: 'Tiradentes', uf: 'MG' },
  { nome: 'Poços de Caldas', uf: 'MG' },
  { nome: 'Pirenópolis', uf: 'GO' },
];

/** Remove acentos e normaliza para comparação/slug. */
function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Gera o slug de uma cidade: "São Paulo" + "SP" -> "sao-paulo-sp". */
export function citySlug(nome: string, uf: string): string {
  const base = normalize(nome)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${base}-${uf.toLowerCase()}`;
}

let _capitaisCache: CityResolved[] | null = null;
let _allCitiesCache: CityResolved[] | null = null;

/** Retorna TODAS as cidades do Brasil formatadas com coordenadas e slug (com cache em memória). */
export function getAllCities(): CityResolved[] {
  if (_allCitiesCache) return _allCitiesCache;
  const filePath = path.join(
    process.cwd(),
    'public',
    'localizacao',
    'distancia-cidades',
    'cidades.json',
  );
  const cities: City[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const resolved = cities.map((c) => ({
    ...c,
    slug: citySlug(c.n, c.u),
  }));
  _allCitiesCache = resolved;
  return resolved;
}

/** Quantidade de capitais no início do array CIDADES_PRINCIPAIS. */
const NUM_CAPITAIS = 27;

/** Carrega as capitais e cidades principais resolvidas a partir do cidades.json. */
export function getCapitais(): CityResolved[] {
  if (_capitaisCache) return _capitaisCache;

  const cities = getAllCities();

  const resolved: CityResolved[] = [];
  for (const cap of CIDADES_PRINCIPAIS) {
    const match = cities.find(
      (c) => c.u === cap.uf && normalize(c.n) === normalize(cap.nome),
    );
    if (match) {
      resolved.push({ ...match, slug: citySlug(match.n, match.u) });
    }
  }

  _capitaisCache = resolved;
  return resolved;
}

/** Busca uma capital ou cidade principal pelo slug. */
export function getCapitalBySlug(slug: string): CityResolved | undefined {
  return getCapitais().find((c) => c.slug === slug);
}

const CITY_SLUG_ALIASES: Record<string, { nome: string; uf: string }> = {
  'buzios-rj': { nome: 'Armação dos Búzios', uf: 'RJ' },
};

/** Busca QUALQUER cidade (dentre as 5570 do IBGE) pelo slug */
export function getCityBySlug(slug: string): City | undefined {
  const cities = getAllCities();

  // 1. Tenta alias direto
  const alias = CITY_SLUG_ALIASES[slug];
  if (alias) {
    const found = cities.find((c) => c.u === alias.uf && normalize(c.n) === normalize(alias.nome));
    if (found) return found;
  }

  // 2. Busca pelo slug gerado dinamicamente
  return cities.find((c) => citySlug(c.n, c.u) === slug);
}

/** Distância em linha reta (Haversine) em km. */
export function haversine(a: City, b: City): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

/**
 * Pares canônicos (não-direcionais) de TODAS as cidades principais, ordenados
 * por slug. Usado pelo sitemap (todas as páginas são indexáveis).
 */
export function getCityPairs(): { origem: string; destino: string }[] {
  return buildPairs(getCapitais());
}

/**
 * Subconjunto pré-renderizado no build (generateStaticParams): apenas os pares
 * entre CAPITAIS — os de maior volume de busca. Os demais pares (envolvendo
 * cidades grandes não-capitais) são gerados sob demanda na primeira visita e
 * ficam em cache (ISR), mantendo o build leve.
 */
export function getCapitalPairs(): { origem: string; destino: string }[] {
  return buildPairs(getCapitais().slice(0, NUM_CAPITAIS));
}

function buildPairs(lista: CityResolved[]): { origem: string; destino: string }[] {
  const pairs: { origem: string; destino: string }[] = [];
  for (let i = 0; i < lista.length; i++) {
    for (let j = i + 1; j < lista.length; j++) {
      const [a, b] = [lista[i].slug, lista[j].slug].sort();
      pairs.push({ origem: a, destino: b });
    }
  }
  return pairs;
}

/** Resolve um par (origem, destino) e calcula as distâncias com suporte total a ISR. */
export function resolvePair(
  origemSlug: string,
  destinoSlug: string,
): DistanceResult | null {
  let origin = getCapitalBySlug(origemSlug);
  if (!origin) {
    const raw = getCityBySlug(origemSlug);
    if (raw) origin = { ...raw, slug: citySlug(raw.n, raw.u) };
  }

  let dest = getCapitalBySlug(destinoSlug);
  if (!dest) {
    const raw = getCityBySlug(destinoSlug);
    if (raw) dest = { ...raw, slug: citySlug(raw.n, raw.u) };
  }

  if (!origin || !dest || origin.slug === dest.slug) return null;

  const straightLine = Math.round(haversine(origin, dest));
  return {
    origin,
    dest,
    straightLine,
    road: Math.round(straightLine * 1.3),
  };
}

/** Outras capitais (para links internos), excluindo as duas do par atual. */
export function getOtherCapitais(
  excludeSlugs: string[],
  limit = 8,
): CityResolved[] {
  return getCapitais()
    .filter((c) => !excludeSlugs.includes(c.slug))
    .slice(0, limit);
}

/** Monta a URL canônica (slugs ordenados) de um par de pedágio. */
export function pairUrl(slugA: string, slugB: string): string {
  const [a, b] = [slugA, slugB].sort();
  return `/localizacao/distancia/${a}/${b}`;
}

/** Monta a URL canônica (slugs ordenados) de um par de estimativa de pedágio. */
export function pedagioPairUrl(slugA: string, slugB: string): string {
  const [a, b] = [slugA, slugB].sort();
  return `/localizacao/pedagio/${a}/${b}`;
}

export const CIDADES_INTERNACIONAIS: City[] = [
  { n: 'Buenos Aires', u: 'Argentina', lat: -34.6037, lon: -58.3816 },
  { n: 'Montevideo', u: 'Uruguai', lat: -34.9011, lon: -56.1645 },
  { n: 'Santiago', u: 'Chile', lat: -33.4489, lon: -70.6693 },
  { n: 'Asunción', u: 'Paraguai', lat: -25.2637, lon: -57.5759 },
  { n: 'Punta del Este', u: 'Uruguai', lat: -34.9411, lon: -54.9333 },
  { n: 'Lisboa', u: 'Portugal', lat: 38.7223, lon: -9.1393 },
  { n: 'Porto', u: 'Portugal', lat: 41.1579, lon: -8.6291 },
  { n: 'Miami', u: 'EUA', lat: 25.7617, lon: -80.1918 },
  { n: 'Orlando', u: 'EUA', lat: 28.5383, lon: -81.3792 },
  { n: 'Madrid', u: 'Espanha', lat: 40.4168, lon: -3.7038 },
];

export function getInternationalCities(): CityResolved[] {
  return CIDADES_INTERNACIONAIS.map(c => ({
    ...c,
    slug: citySlug(c.n, c.u)
  }));
}
