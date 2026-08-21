import cidadesData from '@/data/cidades.json';

/**
 * Lógica das páginas programáticas de "distância entre cidades".
 *
 * O catálogo de cidades é importado estaticamente de src/data/cidades.json,
 * garantindo compatibilidade total com o runtime Serverless / ISR da Vercel
 * sem dependência de I/O em disco ou caminhos de filesystem.
 *
 * Deploy Trigger: Vercel Production Build Sync
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
  // Capitais (27)
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
  // Principais Polos Turísticos e Regionais (12)
  { nome: 'Ubatuba', uf: 'SP' },
  { nome: 'Campos do Jordão', uf: 'SP' },
  { nome: 'Armação dos Búzios', uf: 'RJ' },
  { nome: 'Gramado', uf: 'RS' },
  { nome: 'Caldas Novas', uf: 'GO' },
  { nome: 'Paraty', uf: 'RJ' },
  { nome: 'Balneário Camboriú', uf: 'SC' },
  { nome: 'Porto Seguro', uf: 'BA' },
  { nome: 'Santos', uf: 'SP' },
  { nome: 'Campinas', uf: 'SP' },
  { nome: 'Petrópolis', uf: 'RJ' },
  { nome: 'Angra dos Reis', uf: 'RJ' },
  // Maiores cidades não-capitais (SP)
  { nome: 'Guarulhos', uf: 'SP' },
  { nome: 'São Bernardo do Campo', uf: 'SP' },
  { nome: 'Santo André', uf: 'SP' },
  { nome: 'Osasco', uf: 'SP' },
  { nome: 'São José dos Campos', uf: 'SP' },
  { nome: 'Ribeirão Preto', uf: 'SP' },
  { nome: 'Sorocaba', uf: 'SP' },
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
  { nome: 'Cabo Frio', uf: 'RJ' },
  // MG
  { nome: 'Contagem', uf: 'MG' },
  { nome: 'Uberlândia', uf: 'MG' },
  { nome: 'Juiz de Fora', uf: 'MG' },
  { nome: 'Betim', uf: 'MG' },
  { nome: 'Montes Claros', uf: 'MG' },
  { nome: 'Uberaba', uf: 'MG' },
  { nome: 'Ouro Preto', uf: 'MG' },
  { nome: 'Tiradentes', uf: 'MG' },
  { nome: 'Poços de Caldas', uf: 'MG' },
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
  { nome: 'Canela', uf: 'RS' },
  { nome: 'Caxias do Sul', uf: 'RS' },
  { nome: 'Canoas', uf: 'RS' },
  { nome: 'Pelotas', uf: 'RS' },
  { nome: 'Santa Maria', uf: 'RS' },
  // GO
  { nome: 'Aparecida de Goiânia', uf: 'GO' },
  { nome: 'Anápolis', uf: 'GO' },
  { nome: 'Pirenópolis', uf: 'GO' },
  // Outros Polos
  { nome: 'Ilhabela', uf: 'SP' },
  { nome: 'Maragogi', uf: 'AL' },
  { nome: 'Bonito', uf: 'MS' },
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

/** Normaliza qualquer entrada (com espaços, %20, acentos, vírgulas) para o formato slug "nome-uf". */
export function parseToCitySlug(input: string): string {
  let decoded = input;
  try {
    decoded = decodeURIComponent(input);
  } catch {
    // se já estiver decodificado
  }
  return normalize(decoded)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const ALL_CITIES: CityResolved[] = (cidadesData as City[]).map((c) => ({
  ...c,
  slug: citySlug(c.n, c.u),
}));

/** Mapa de busca O(1) por slug para resolução instantânea */
const CITIES_BY_SLUG = new Map<string, CityResolved>();
for (const city of ALL_CITIES) {
  CITIES_BY_SLUG.set(city.slug, city);
}

/** Retorna TODAS as cidades do Brasil formatadas com coordenadas e slug. */
export function getAllCities(): CityResolved[] {
  return ALL_CITIES;
}

/** Quantidade de capitais no início do array CIDADES_PRINCIPAIS. */
const NUM_CAPITAIS = 27;

const CAPITAIS_RESOLVED: CityResolved[] = [];
for (const cap of CIDADES_PRINCIPAIS) {
  const match = ALL_CITIES.find(
    (c) => c.u === cap.uf && normalize(c.n) === normalize(cap.nome),
  );
  if (match) {
    CAPITAIS_RESOLVED.push(match);
  }
}

/** Carrega as capitais e cidades principais resolvidas a partir do cidades.json. */
export function getCapitais(): CityResolved[] {
  return CAPITAIS_RESOLVED;
}

/** Busca uma capital ou cidade principal pelo slug. */
export function getCapitalBySlug(slug: string): CityResolved | undefined {
  const norm = parseToCitySlug(slug);
  return CAPITAIS_RESOLVED.find((c) => c.slug === norm);
}

const CITY_SLUG_ALIASES: Record<string, { nome: string; uf: string }> = {
  'buzios-rj': { nome: 'Armação dos Búzios', uf: 'RJ' },
};

/** Busca QUALQUER cidade (dentre as 5570 do IBGE) pelo slug, aceitando espaços, maiúsculas ou sem UF */
export function getCityBySlug(slug: string): CityResolved | undefined {
  const norm = parseToCitySlug(slug);

  // 1. Tenta alias direto
  const alias = CITY_SLUG_ALIASES[norm];
  if (alias) {
    const found = ALL_CITIES.find((c) => c.u === alias.uf && normalize(c.n) === normalize(alias.nome));
    if (found) return found;
  }

  // 2. Busca O(1) pelo Map
  const direct = CITIES_BY_SLUG.get(norm);
  if (direct) return direct;

  // 3. Busca por nome sem sufixo UF (ex: "sao-paulo" -> "sao-paulo-sp")
  const matchWithoutUf = ALL_CITIES.find((c) => {
    const withoutUf = c.slug.replace(/-[a-z]{2}$/, '');
    return withoutUf === norm;
  });
  if (matchWithoutUf) return matchWithoutUf;

  // 4. Fallback dinâmico
  return ALL_CITIES.find((c) => c.slug === norm || citySlug(c.n, c.u) === norm);
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
 * Subconjunto pré-renderizado no build (generateStaticParams): todas as capitais
 * e polos turísticos / cidades estratégicas de maior volume de busca.
 */
export function getCapitalPairs(): { origem: string; destino: string }[] {
  return buildPairs(CAPITAIS_RESOLVED.slice(0, 32));
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
