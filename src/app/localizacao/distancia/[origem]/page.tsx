import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import {
  getCityBySlug,
  getCapitais,
  haversine,
  pairUrl,
  pedagioPairUrl,
} from '@/lib/distancia-cidades';

export const revalidate = 86400;

interface Props {
  params: Promise<{ origem: string }>;
}

const year = new Date().getFullYear();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { origem } = await params;
  const city = getCityBySlug(origem);

  if (!city) {
    return {
      title: `Distância entre Cidades (${year}) | BuscaCentral`,
      description: 'Calcule distâncias rodoviárias e em linha reta entre cidades brasileiras.',
    };
  }

  return generateToolMetadata(
    `Distâncias saindo de ${city.n} (${city.u}): Rotas e Quilometragem (${year})`,
    `Calcule a distância rodoviária oficial do IBGE e tempo estimado de viagem de carro saindo de ${city.n} (${city.u}) para as capitais e principais cidades do Brasil.`,
    `/localizacao/distancia/${city.slug}`
  );
}

export default async function DistanciaOrigemCityPage({ params }: Props) {
  const { origem } = await params;
  const origin = getCityBySlug(origem);

  if (!origin) {
    permanentRedirect('/localizacao/distancia-cidades');
  }

  const capitais = getCapitais().filter((c) => c.slug !== origin.slug);

  const rotasSaindo = capitais
    .map((dest) => {
      const straightLine = Math.round(haversine(origin, dest));
      const road = Math.round(straightLine * 1.3);
      const tempoHoras = (road / 80).toFixed(1);

      return {
        dest,
        straightLine,
        road,
        tempoHoras,
      };
    })
    .sort((a, b) => a.road - b.road);

  const seoContent = (
    <article className="prose prose-gray max-w-none">
      <h2>Distâncias rodoviárias oficiais a partir de {origin.n} ({origin.u})</h2>
      <p>
        Confira a tabela com a distância em linha reta e a estimativa rodoviária para deslocamentos saindo de <strong>{origin.n} ({origin.u})</strong> para as principais capitais e polos regionais do Brasil. Os cálculos utilizam as coordenadas geográficas oficiais do IBGE.
      </p>

      <h3>Como a distância rodoviária é estimada?</h3>
      <p>
        A distância em linha reta é calculada pela fórmula de Haversine sobre o globo terrestre. Para a distância rodoviária, aplicamos um fator logístico de correção que considera o traçado das rodovias brasileiras, contornos de relevo e curvas.
      </p>
    </article>
  );

  const faqItems = [
    {
      question: `Qual é a capital mais próxima de ${origin.n}?`,
      answer: rotasSaindo[0]
        ? `A capital mais próxima de ${origin.n} é ${rotasSaindo[0].dest.n} (${rotasSaindo[0].dest.u}), localizada a aproximadamente ${rotasSaindo[0].road} km de distância rodoviária.`
        : 'Consulte a lista de capitais para verificar as distâncias exatas.',
    },
    {
      question: `Os cálculos são baseados em dados oficiais?`,
      answer: `Sim, utilizamos as coordenadas de latitude e longitude da malha municipal oficial do IBGE.`,
    },
  ];

  const relatedTools = [
    {
      title: `Pedágios saindo de ${origin.n}`,
      url: `/localizacao/pedagio/${origin.slug}`,
      description: `Veja a estimativa de custos com tarifas de pedágio saindo de ${origin.n}.`,
    },
    {
      title: `Eletropostos em ${origin.n}`,
      url: `/localizacao/carregador-eletrico/${origin.slug}`,
      description: `Encontre pontos de recarga para carros elétricos em ${origin.n}.`,
    },
    {
      title: 'Calculadora de Combustível',
      url: '/utilidades/calculadora-combustivel',
      description: 'Simule o custo em reais de gasolina, etanol ou diesel para a viagem.',
    },
  ];

  return (
    <ToolPageLayout
      title={`Distâncias saindo de ${origin.n} (${origin.u})`}
      description={`Tabela de distâncias rodoviárias, tempo de viagem e rotas partindo de ${origin.n} para todo o Brasil.`}
      path={`/localizacao/distancia/${origin.slug}`}
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Rotas Rodoviárias saindo de {origin.n}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Selecione um destino para ver o mapa da rota, pedágios e custo de combustível
              </p>
            </div>
            <Link
              href="/localizacao/distancia-cidades"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors shrink-0"
            >
              <span>🔍 Outra Cidade</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rotasSaindo.map(({ dest, road, straightLine, tempoHoras }) => (
              <Link
                key={dest.slug}
                href={pairUrl(origin.slug, dest.slug)}
                className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ~{tempoHoras}h de carro
                    </span>
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {road} km
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {origin.n} ➔ {dest.n} ({dest.u})
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span>Linha reta: {straightLine} km</span>
                  <span className="font-bold text-blue-600">Ver Rota →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
