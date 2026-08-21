import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import PedagioSearch from '../PedagioSearch';
import SemPararBanner from '@/components/affiliates/SemPararBanner';
import {
  getCityBySlug,
  getCapitais,
  haversine,
  pedagioPairUrl,
  pairUrl,
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
      title: `Pedágios no Brasil (${year}) | BuscaCentral`,
      description: 'Consulte valores estimados de pedágio e rotas rodoviárias no Brasil.',
    };
  }

  return generateToolMetadata(
    `Pedágios saindo de ${city.n} (${city.u}): Valores e Praças (${year})`,
    `Calcule o custo de pedágio saindo de ${city.n} (${city.u}) para as principais cidades e capitais do Brasil. Veja praças de cobrança, gasto com combustível e economia com tags automáticas.`,
    `/localizacao/pedagio/${city.slug}`
  );
}

export default async function PedagioOrigemCityPage({ params }: Props) {
  const { origem } = await params;
  const origin = getCityBySlug(origem);

  if (!origin) {
    permanentRedirect('/localizacao/pedagio');
  }

  // Monta lista de rotas saindo desta cidade para todas as outras capitais
  const capitais = getCapitais().filter((c) => c.slug !== origin.slug);

  const rotasSaindo = capitais
    .map((dest) => {
      const straightLine = Math.round(haversine(origin, dest));
      const road = Math.round(straightLine * 1.3);
      const kmPorPedagio = 70;
      const numPedagios = Math.max(1, Math.floor(road / kmPorPedagio));
      const custoEstimado = numPedagios * 6.5;

      return {
        dest,
        road,
        numPedagios,
        custoEstimado,
      };
    })
    .sort((a, b) => a.road - b.road);

  const seoContent = (
    <article className="prose prose-gray max-w-none">
      <h2>Quanto custa viajar de carro saindo de {origin.n} ({origin.u})?</h2>
      <p>
        Ao planejar uma viagem rodoviária a partir de <strong>{origin.n} ({origin.u})</strong>, o custo com praças de pedágio e combustível representa uma parte relevante do orçamento. Abaixo você encontra o levantamento completo das principais rotas conectando {origin.n} às capitais e polos turísticos do Brasil.
      </p>

      <h3>Vantagens de utilizar tags de pagamento automático em {origin.n}</h3>
      <p>
        Tanto nas rodovias estaduais quanto nas vias federais que cruzam a região de {origin.n}, o uso de tags automáticas (como Sem Parar, ConectCar e Veloe) garante passagem sem filas e acesso a benefícios como o Desconto de Usuário Frequente (DUF) e o sistema de pedágio Free Flow.
      </p>
    </article>
  );

  const faqItems = [
    {
      question: `Quantas praças de pedágio existem nas principais saídas de ${origin.n}?`,
      answer: `A quantidade de praças varia conforme a rodovia utilizada. Em média, concessionárias sob concessão contam com 1 praça de cobrança a cada 60 a 80 km de estrada.`,
    },
    {
      question: `Como economizar nas viagens de carro saindo de ${origin.n}?`,
      answer: `Recomenda-se calibrar os pneus adequadamente, manter velocidade de cruzeiro constante e utilizar tags de passagem automática para usufruir de descontos por frequência nas praças de pedágio.`,
    },
  ];

  const relatedTools = [
    {
      title: `Eletropostos em ${origin.n}`,
      url: `/localizacao/carregador-eletrico/${origin.slug}`,
      description: `Veja todos os pontos de recarga para carros elétricos em ${origin.n} e região.`,
    },
    {
      title: 'Dividir Custo de Viagem',
      url: '/financeiro/dividir-custo-viagem',
      description: 'Calcule a divisão exata de pedágio e combustível por pessoa na viagem.',
    },
    {
      title: 'Distância entre Cidades',
      url: '/localizacao/distancia-cidades',
      description: 'Consulte a quilometragem oficial do IBGE e tempos médios de percurso.',
    },
  ];

  return (
    <ToolPageLayout
      title={`Pedágios saindo de ${origin.n} (${origin.u})`}
      description={`Estimativa de pedágio, praças de cobrança e rotas rodoviárias partindo de ${origin.n} para todo o Brasil.`}
      path={`/localizacao/pedagio/${origin.slug}`}
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Formulário com Origem Pré-preenchida */}
        <PedagioSearch
          initialOrigemNome={origin.n}
          initialOrigemUf={origin.u}
          initialOrigemSlug={origin.slug}
        />

        {/* Banner de Afiliado Sem Parar */}
        <SemPararBanner
          variant="card"
          title={`Vai viajar saindo de ${origin.n}? Evite filas com Sem Parar`}
          subtitle="Tenha passagem automática nas praças de pedágio de todo o país e aproveite vantagens exclusivas em estacionamentos e postos."
        />

        {/* Lista de Rotas Saindo da Cidade */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Principais Rotas de Pedágio saindo de {origin.n}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Selecione o destino para ver a estimativa detalhada e navegação GPS
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">
              {rotasSaindo.length} Destinos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rotasSaindo.map(({ dest, road, numPedagios, custoEstimado }) => (
              <Link
                key={dest.slug}
                href={pedagioPairUrl(origin.slug, dest.slug)}
                className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {road} km
                    </span>
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      ~{numPedagios} praça{numPedagios > 1 ? 's' : ''}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {origin.n} ➔ {dest.n} ({dest.u})
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Est. Pedágio:</span>
                  <span className="text-sm font-black text-blue-900">
                    R$ {custoEstimado.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
