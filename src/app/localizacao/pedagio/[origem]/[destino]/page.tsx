import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import ToolPageLayout from '@/components/ToolPageLayout';
import SemPararBanner from '@/components/affiliates/SemPararBanner';
import {
  getCapitalPairs,
  resolvePair,
  getOtherCapitais,
  pedagioPairUrl,
  pairUrl,
} from '@/lib/distancia-cidades';

export const dynamicParams = true;
export const revalidate = 86400;

interface Props {
  params: Promise<{ origem: string; destino: string }>;
}

export function generateStaticParams() {
  return getCapitalPairs();
}

function slugToProperName(slug: string): string {
  const withoutUf = slug.replace(/-[a-z]{2}$/, '');
  return withoutUf
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { origem, destino } = await params;
  const year = new Date().getFullYear();
  const result = resolvePair(origem, destino);

  if (!result) {
    const originName = slugToProperName(origem);
    const destName = slugToProperName(destino);
    return {
      title: `Pedágio ${originName} a ${destName}: Quanto Custa (${year})`,
      description: `Saiba quanto vai gastar de pedágio entre ${originName} e ${destName}. Veja tempo de viagem de carro, melhor rota, pedágios e gasto com combustível atualizado.`,
    };
  }

  const { origin, dest } = result;

  const title = `Pedágio ${origin.n} a ${dest.n}: Quanto Custa de Carro (${year})`;
  const description = `Saiba quanto vai gastar de pedágio entre ${origin.n} e ${dest.n}. Veja estimativa de praças de pedágio, custo total da viagem e dicas para economizar com tags em ${year}.`;
  const canonical = `https://buscacentral.com.br${pedagioPairUrl(origin.slug, dest.slug)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `Pedágio ${origin.n} a ${dest.n}: Quanto Custa (${year}) | BuscaCentral`,
      description,
      url: canonical,
      siteName: 'BuscaCentral',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Pedágio ${origin.n} a ${dest.n}: Quanto Custa (${year})`,
      description,
    },
  };
}

export default async function PedagioParPage({ params }: Props) {
  const { origem, destino } = await params;
  const result = resolvePair(origem, destino);

  if (!result) notFound();

  // Garante URL canônica única por par (slugs em ordem alfabética)
  const [canonA, canonB] = [origem, destino].sort();
  if (origem !== canonA || destino !== canonB) {
    permanentRedirect(`/localizacao/pedagio/${canonA}/${canonB}`);
  }

  const { origin, dest, road } = result;
  const year = new Date().getFullYear();

  // Algoritmo de estimativa de pedágios
  const kmPorPedagio = 70; // 1 praça de pedágio a cada 70 km em média em rodovias concedidas
  const valorMedioPedagio = 6.5; // R$ 6,50 valor médio da tarifa de pedágio no Brasil
  const numPedagios = Math.max(1, Math.floor(road / kmPorPedagio));
  const custoPedagioEstimado = numPedagios * valorMedioPedagio;

  // Estimativa complementar de combustível
  const consumoMedio = 11.5; // km/L
  const precoGasolina = 6.0; // R$/L
  const litrosCombustivel = road / consumoMedio;
  const custoCombustivelEstimado = litrosCombustivel * precoGasolina;
  const custoTotalViagem = custoPedagioEstimado + custoCombustivelEstimado;

  const outras = getOtherCapitais([origin.slug, dest.slug], 8);
  const path = `/localizacao/pedagio/${origin.slug}/${dest.slug}`;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${origin.n}, ${origin.u}`)}&destination=${encodeURIComponent(`${dest.n}, ${dest.u}`)}&travelmode=driving`;

  const faqItems = [
    {
      question: `Quanto custa o pedágio de ${origin.n} para ${dest.n}?`,
      answer: `O custo estimado de pedágio de ${origin.n} para ${dest.n} é de aproximadamente R$ ${custoPedagioEstimado.toFixed(2).replace('.', ',')} para carros de passeio na ida, considerando cerca de ${numPedagios} praça(s) ao longo dos ${road} km de trajeto rodoviário. Para ida e volta, o valor estimado de pedágio é de R$ ${(custoPedagioEstimado * 2).toFixed(2).replace('.', ',')}.`,
    },
    {
      question: `Quantos pedágios tem de ${origin.n} a ${dest.n}?`,
      answer: `O trajeto rodoviário de ${origin.n} a ${dest.n} possui aproximadamente ${numPedagios} praça(s) de cobrança de pedágio ao longo de ${road} km (média de 1 praça a cada 70 km em rodovias sob concessão).`,
    },
    {
      question: `Aceita PIX ou cartão no pedágio de ${origin.n} a ${dest.n}?`,
      answer: `A maioria das concessionárias de rodovias no Brasil aceita pagamento por aproximação (cartão de débito/crédito) e PIX, além de dinheiro em espécie. No entanto, a forma mais rápida e recomendada é o uso de tags automáticas (como Sem Parar, ConectCar e Veloe), que evitam filas e contam com passagem direta.`,
    },
    {
      question: `Tem cobrança automática Free Flow nessa rota?`,
      answer: `Em diversas rodovias federais e estaduais no Brasil, está sendo implementado o sistema Free Flow (pedágio eletrônico sem cancela física). A cobrança é realizada automaticamente pela leitura da tag veicular ou da placa, sendo altamente recomendável manter uma tag ativa para evitar multas por evasão de pedágio.`,
    },
    {
      question: `Quanto gasta de combustível e pedágio no total de ${origin.n} a ${dest.n}?`,
      answer: `O custo total estimado de viagem de ${origin.n} a ${dest.n} é de aproximadamente R$ ${custoTotalViagem.toFixed(2).replace('.', ',')} na ida, somando R$ ${custoPedagioEstimado.toFixed(2).replace('.', ',')} de pedágios e R$ ${custoCombustivelEstimado.toFixed(2).replace('.', ',')} de combustível (calculado para consumo médio de 11,5 km/L a R$ 6,00/L).`,
    },
  ];

  const relatedTools = [
    {
      title: `Distância entre ${origin.n} e ${dest.n}`,
      url: pairUrl(origin.slug, dest.slug),
      description: 'Veja o tempo estimado de viagem, km em linha reta e trajeto recomendado.',
    },
    {
      title: 'Calculadora de Combustível Flex',
      url: '/utilidades/calculadora-combustivel-flex',
      description: 'Descubra se vale mais a pena abastecer com Álcool ou Gasolina.',
    },
    {
      title: 'Dividir Custo de Viagem (Racha-Combustível)',
      url: '/financeiro/dividir-custo-viagem',
      description: 'Divida o valor do combustível e pedágio entre os passageiros.',
    },
  ];

  const seoContent = (
    <article className="prose prose-gray max-w-none space-y-6 text-slate-700">
      <h2>Como funciona o cálculo de pedágios em rodovias</h2>
      <p>
        O valor cobrado nas praças de pedágio no Brasil varia de acordo com a concessionária responsável pela rodovia, a extensão do trecho concedido e a categoria do veículo. O cálculo estimado entre <strong>{origin.n} ({origin.u})</strong> e <strong>{dest.n} ({dest.u})</strong> utiliza uma média ponderada de 1 praça de cobrança a cada 70 km de estrada, com tarifa média de R$ 6,50 para veículos de passeio.
      </p>

      <h2>Como planejar os gastos de viagem de forma segura</h2>
      <p>
        Ao planejar um deslocamento rodoviário de <strong>{road} km</strong>, é fundamental contabilizar tanto os custos diretos de pedágio quanto o consumo de combustível e possíveis imprevistos:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Consulte o trajeto atualizado:</strong> Obras ou desvios em rodovias estaduais podem alterar a rota e incluir praças adicionais.</li>
        <li><strong>Considere a volta:</strong> Lembre-se de multiplicar a estimativa de pedágio por dois se for realizar o trajeto de ida e volta.</li>
        <li><strong>Tenha saldo na tag ou dinheiro vivo:</strong> Nem todas as praças manuais aceitam cartão de débito ou Pix instantâneo, tornando prudente levar uma quantia em espécie ou manter a tag ativada.</li>
      </ul>

      <h2>Dicas para economizar usando tags de passagem automática (Sem Parar, ConectCar, Veloe)</h2>
      <p>
        As operadoras de pagamento automático (como Sem Parar, ConectCar, Veloe, Move Mais e Tag Itaú) facilitam a viagem ao eliminar a parada nas cabines de atendimento manual. Além do ganho de tempo, os motoristas contam com incentivos financeiros:
      </p>
      <ol className="list-decimal pl-5 space-y-2">
        <li><strong>Desconto de Usuário Frequente (DUF):</strong> Diversas concessionárias concedem descontos progressivos para motoristas que passam repetidas vezes na mesma praça dentro do mesmo mês.</li>
        <li><strong>Sistema Free Flow:</strong> Nas rodovias com pórticos sem barreira física, a leitura é feita 100% por tags ou placa do veículo, evitando multas por evasão de pedágio.</li>
        <li><strong>Planos sem mensalidade:</strong> Existem opções de tags associadas a bancos ou cartões de crédito sem cobrança de mensalidade fixa.</li>
      </ol>
    </article>
  );

  return (
    <ToolPageLayout
      title={`Pedágio de ${origin.n} a ${dest.n}`}
      description={`Estimativa de praças de pedágio, custo de tarifa e gastos totais de viagem entre ${origin.n} (${origin.u}) e ${dest.n} (${dest.u}).`}
      path={path}
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
              Rota {origin.u} ➔ {dest.u} ({year})
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Estimativa de Pedágio: {origin.n} a {dest.n}
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Distância Total</p>
            <p className="text-2xl font-black text-slate-900">{road} km</p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DIRECT ANSWER BOX — GEO / AI Overview Otimizado                */}
        {/* Marcação semântica <section> + <dl> para consumo por IA        */}
        {/* ============================================================== */}
        <section
          aria-label="Resumo dos Custos de Pedágio"
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border-2 border-blue-200/80 rounded-2xl p-5 sm:p-6 shadow-sm"
        >
          <h2 className="text-base sm:text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-base shadow-sm" aria-hidden="true">🛣️</span>
            Resumo do Pedágio: {origin.n} a {dest.n}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="flex flex-col bg-white/80 border border-blue-100 rounded-xl px-4 py-3">
              <dt className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-0.5">Valor do pedágio (ida)</dt>
              <dd className="text-2xl font-black text-blue-900">R$ {custoPedagioEstimado.toFixed(2).replace('.', ',')}</dd>
              <dd className="text-xs text-slate-500">Média de R$ 6,50 por praça para carros de passeio</dd>
            </div>
            <div className="flex flex-col bg-white/80 border border-slate-200 rounded-xl px-4 py-3">
              <dt className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-0.5">Praças de cobrança</dt>
              <dd className="text-2xl font-black text-slate-900">~{numPedagios} praça{numPedagios !== 1 ? 's' : ''}</dd>
              <dd className="text-xs text-slate-500">Est. 1 praça a cada 70 km em {road} km de trajeto</dd>
            </div>
            <div className="flex flex-col bg-white/80 border border-indigo-100 rounded-xl px-4 py-3">
              <dt className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-0.5">Custo ida e volta (pedágio)</dt>
              <dd className="text-2xl font-black text-indigo-900">R$ {(custoPedagioEstimado * 2).toFixed(2).replace('.', ',')}</dd>
              <dd className="text-xs text-slate-500">Estimativa total para o percurso completo</dd>
            </div>
            <div className="flex flex-col bg-white/80 border border-amber-100 rounded-xl px-4 py-3">
              <dt className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-0.5">Formas de pagamento</dt>
              <dd className="text-sm font-bold text-slate-900 mt-1">Tag Automática · Dinheiro · Cartão · PIX</dd>
              <dd className="text-xs text-slate-500 mt-0.5">Compatível com Free Flow nas rodovias com pórticos</dd>
            </div>
            <div className="flex flex-col bg-white/80 border border-emerald-100 rounded-xl px-4 py-3">
              <dt className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-0.5">Economia com Tag</dt>
              <dd className="text-2xl font-black text-emerald-700">~{Math.max(3, numPedagios * 3)} a {Math.max(5, numPedagios * 5)} min</dd>
              <dd className="text-xs text-slate-500">Passagem direta sem filas nas cabines manuais</dd>
            </div>
            <div className="flex flex-col bg-white/80 border border-blue-100 rounded-xl px-4 py-3">
              <dt className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-0.5">Custo total viagem (ida)</dt>
              <dd className="text-2xl font-black text-blue-900">R$ {custoTotalViagem.toFixed(2).replace('.', ',')}</dd>
              <dd className="text-xs text-slate-500">R$ {custoPedagioEstimado.toFixed(2).replace('.', ',')} (pedágio) + R$ {custoCombustivelEstimado.toFixed(2).replace('.', ',')} (combustível)</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Link
              href={pairUrl(origin.slug, dest.slug)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <span>Ver distância e rota completa →</span>
            </Link>
            <Link
              href={`/utilidades/calculadora-combustivel?distancia=${road}&origem=${encodeURIComponent(origin.n)}&destino=${encodeURIComponent(dest.n)}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <span>Calcular consumo do meu carro →</span>
            </Link>
          </div>
        </section>

        {/* Banner de Afiliado Sem Parar (Awin) */}
        <SemPararBanner
          variant="card"
          title={`Evite filas de pedágio na viagem entre ${origin.n} e ${dest.n}`}
          subtitle={`Com cerca de ${numPedagios} praça(s) estimadas ao longo de ${road} km, use a tag Sem Parar para passar direto pelas cancelas e garantir descontos no sistema Free Flow.`}
        />

        {/* Botão de Ação Direta para o Google Maps */}
        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Rota Oficial e Trajeto GPS ao Vivo</p>
            <h3 className="text-lg font-extrabold">Ver praças e navegação exata no aplicativo</h3>
            <p className="text-xs text-blue-100">
              Abra a rota <strong>{origin.n} ({origin.u}) ➔ {dest.n} ({dest.u})</strong> diretamente no Google Maps no seu celular.
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-blue-50 text-blue-700 font-extrabold rounded-lg text-sm shadow transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>🗺️</span>
            <span>Abrir no Google Maps</span>
          </a>
        </div>

        {/* Disclaimer / Label Clara de Estimativa */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
          <span className="text-lg leading-none">⚠️</span>
          <div>
            <strong>Nota de Isenção:</strong> Esta ferramenta fornece uma <em>estimativa algorítmica</em> baseada na extensão rodoviária total do trajeto ({road} km) e na média nacional de localização e tarifas de pedágio. Os valores reais podem variar de acordo com as concessionárias vigentes, desvios na rota e a categoria do seu veículo (carro, moto ou caminhão).
          </div>
        </div>

        {/* Links Rápidos para outras capitais */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-900 mb-3">Outras estimativas de pedágio populares:</p>
          <div className="flex flex-wrap gap-2">
            {outras.map((c) => (
              <Link
                key={c.slug}
                href={pedagioPairUrl(origin.slug, c.slug)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg text-xs font-medium transition-colors"
              >
                {origin.n} ➔ {c.n}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
