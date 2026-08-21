import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import PlanejadorSearch from '../PlanejadorSearch';
import EvProductCards from '@/components/affiliate/EvProductCards';
import {
  getCityBySlug,
  getCapitais,
  haversine,
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
      title: `Planejador de Viagens EV (${year}) | BuscaCentral`,
      description: 'Planeje viagens rodoviárias com carros elétricos no Brasil.',
    };
  }

  return generateToolMetadata(
    `Viagens de Carro Elétrico saindo de ${city.n} (${city.u}): Rotas e Eletropostos (${year})`,
    `Planeje sua viagem com veículo elétrico saindo de ${city.n} (${city.u}). Veja distância rodoviária, autonomia necessária e pontos de recarga rápida (DC) ao longo das rodovias.`,
    `/localizacao/planejador-viagem-ev/${city.slug}`
  );
}

export default async function PlanejadorOrigemCityPage({ params }: Props) {
  const { origem } = await params;
  const origin = getCityBySlug(origem);

  if (!origin) {
    permanentRedirect('/localizacao/planejador-viagem-ev');
  }

  const capitais = getCapitais().filter((c) => c.slug !== origin.slug);

  const rotasSaindo = capitais
    .map((dest) => {
      const straightLine = Math.round(haversine(origin, dest));
      const road = Math.round(straightLine * 1.3);
      const paradasEstimadas = Math.max(0, Math.ceil(road / 250) - 1);

      return {
        dest,
        road,
        paradasEstimadas,
      };
    })
    .sort((a, b) => a.road - b.road);

  const seoContent = (
    <article className="prose prose-gray max-w-none">
      <h2>Planejando viagens com veículo elétrico a partir de {origin.n} ({origin.u})</h2>
      <p>
        Viajar com veículos 100% elétricos (BEV) ou híbridos plug-in (PHEV) saindo de <strong>{origin.n} ({origin.u})</strong> exige planejamento estratégico das estações de recarga rápida (DC) nas rodovias. A malha de eletropostos no Brasil tem crescido continuamente, permitindo viagens seguras para os principais centros e capitais.
      </p>

      <h3>Recomendações para viagens rodoviárias de carro elétrico</h3>
      <ul>
        <li><strong>Autonomia real na estrada:</strong> Em rodovias com ar-condicionado e velocidades de 100 a 120 km/h, calcule paradas a cada 200 a 280 km.</li>
        <li><strong>Carregadores rápidos (DC):</strong> Priorize estações de 50 kW ou superiores para recargas de 20% a 80% em menos de 40 minutos.</li>
        <li><strong>Margem de segurança:</strong> Chegue a cada posto de recarga com pelo menos 15% a 20% de bateria restante.</li>
      </ul>
    </article>
  );

  const faqItems = [
    {
      question: `Como planejar paradas de recarga saindo de ${origin.n}?`,
      answer: `Escolha o seu destino na lista ou utilize a caixa de pesquisa. O planejador indicará a quilometragem exata e a posição dos eletropostos ao longo da rodovia.`,
    },
    {
      question: `Onde encontrar eletropostos urbanos em ${origin.n}?`,
      answer: `Você pode consultar os carregadores rápidos e semirrápidos instalados na cidade na nossa página de Eletropostos em ${origin.n}.`,
    },
  ];

  const relatedTools = [
    {
      title: `Eletropostos em ${origin.n}`,
      url: `/localizacao/carregador-eletrico/${origin.slug}`,
      description: `Encontre todos os pontos de recarga disponíveis em ${origin.n}.`,
    },
    {
      title: `Pedágios saindo de ${origin.n}`,
      url: `/localizacao/pedagio/${origin.slug}`,
      description: `Calcule as tarifas de pedágio estimadas para as rodovias partindo de ${origin.n}.`,
    },
    {
      title: 'Distância entre Cidades',
      url: '/localizacao/distancia-cidades',
      description: 'Consulte a quilometragem oficial do IBGE e tempos médios de percurso.',
    },
  ];

  return (
    <ToolPageLayout
      title={`Planejador EV: Rotas saindo de ${origin.n} (${origin.u})`}
      description={`Mapeie pontos de recarga rápida e planeje sua viagem de carro elétrico saindo de ${origin.n}.`}
      path={`/localizacao/planejador-viagem-ev/${origin.slug}`}
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        <PlanejadorSearch />

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Principais Rotas para Carros Elétricos saindo de {origin.n}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Selecione o destino para mapear todos os eletropostos ao longo da rodovia
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg">
              {rotasSaindo.length} Destinos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rotasSaindo.map(({ dest, road, paradasEstimadas }) => (
              <Link
                key={dest.slug}
                href={`/localizacao/planejador-viagem-ev/${origin.slug}/${dest.slug}`}
                className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {road} km
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {paradasEstimadas === 0 ? 'Sem recarga extra' : `~${paradasEstimadas} recarga${paradasEstimadas > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {origin.n} ➔ {dest.n} ({dest.u})
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Ver Eletropostos</span>
                  <span className="text-xs font-bold text-emerald-700">
                    Mapear Rota →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <EvProductCards />
      </div>
    </ToolPageLayout>
  );
}
