import type { Metadata } from 'next';
import Link from 'next/link';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import PedagioSearch from './PedagioSearch';
import SemPararBanner from '@/components/affiliates/SemPararBanner';
import { pedagioPairUrl, citySlug } from '@/lib/distancia-cidades';

const year = new Date().getFullYear();

export const metadata: Metadata = generateToolMetadata(
  `Calculadora de Pedágio: Quanto Custa a Viagem no Brasil (${year})`,
  'Calcule o custo estimado de pedágio entre cidades brasileiras, quantidade de praças de cobrança, gasto de combustível e dicas de economia com tags automáticas e Free Flow.',
  '/localizacao/pedagio'
);

const rotasPopularesPedagio: [string, string, string, string, number, number][] = [
  ['São Paulo', 'SP', 'Rio de Janeiro', 'RJ', 435, 6],
  ['São Paulo', 'SP', 'Curitiba', 'PR', 408, 6],
  ['São Paulo', 'SP', 'Belo Horizonte', 'MG', 586, 8],
  ['São Paulo', 'SP', 'Campinas', 'SP', 99, 2],
  ['Rio de Janeiro', 'RJ', 'Belo Horizonte', 'MG', 440, 6],
  ['Curitiba', 'PR', 'Florianópolis', 'SC', 300, 5],
  ['São Paulo', 'SP', 'Santos', 'SP', 72, 1],
  ['Brasília', 'DF', 'Goiânia', 'GO', 209, 3],
  ['São Paulo', 'SP', 'Ribeirão Preto', 'SP', 314, 5],
  ['São Paulo', 'SP', 'Ubatuba', 'SP', 225, 3],
  ['Porto Alegre', 'RS', 'Florianópolis', 'SC', 460, 6],
  ['São Paulo', 'SP', 'Sorocaba', 'SP', 100, 2],
];

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Como funciona o Cálculo de Pedágio entre Cidades?</h2>
    <p>
      A ferramenta de <strong>Cálculo de Pedágio da BuscaCentral</strong> foi desenvolvida para ajudar motoristas de carros de passeio, motos e frotistas a planejar os custos rodoviários de qualquer viagem pelo Brasil. Cruzamos a malha de rodovias federais e estaduais com as médias tarifárias das concessionárias sob regulação da ANTT (Agência Nacional de Transportes Terrestres) e agências estaduais como ARTESP e AGERGS.
    </p>

    <h3>O que a estimativa de pedágio informa?</h3>
    <ul>
      <li><strong>Valor Estimado das Tarifas:</strong> Custo total aproximado para veículos de passeio (2 eixos) no trajeto selecionado.</li>
      <li><strong>Quantidade de Praças de Cobrança:</strong> Estimativa de quantas praças de pedágio físicas ou pórticos eletrônicos (Free Flow) você encontrará ao longo do trajeto.</li>
      <li><strong>Custo de Ida e Volta:</strong> Projeção financeira completa para a viagem de ida e retorno com pedágios e combustível.</li>
      <li><strong>Tempo Economizado com Tag Automática:</strong> Ganho médio de minutos ao evitar filas de pagamento manual em dinheiro ou cartão.</li>
    </ul>

    <h3>Como economizar com pedágios e tags de pagamento automático</h3>
    <p>
      O uso de tags de passagem automática (como Sem Parar, ConectCar, Veloe, Move Mais e Tag Itaú) é a maneira mais eficiente e econômica de viajar pelas rodovias brasileiras:
    </p>
    <ol>
      <li><strong>Desconto de Usuário Frequente (DUF):</strong> Motoristas que realizam viagens regulares na mesma rodovia contam com descontos percentuais progressivos a cada passagem dentro do mesmo mês.</li>
      <li><strong>Sistema Free Flow (Pedágio Eletrônico sem Cancela):</strong> Em rodovias modernas como a Rio-Santos (BR-101) e trechos concedidos no RS e SP, a leitura da tag é automática nos pórticos suspensos, garantindo velocidade contínua e eliminando o risco de multas por evasão de pedágio.</li>
      <li><strong>Economia de Combustível e Freios:</strong> Eliminar paradas bruscas e arrancadas nas cabines de cobrança reduz o consumo médio de combustível e o desgaste de pastilhas de freio.</li>
    </ol>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm font-bold text-lg">
          🛣️
        </div>
        <h4 className="font-bold text-slate-900 mb-1">Mapeie as Praças</h4>
        <p className="text-sm text-slate-600">Descubra a quantidade de cancelas e pórticos na sua rota.</p>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm font-bold text-lg">
          💳
        </div>
        <h4 className="font-bold text-slate-900 mb-1">Preveja os Gastos</h4>
        <p className="text-sm text-slate-600">Saiba o custo em reais para ida e volta com combustível integrado.</p>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm font-bold text-lg">
          ⚡
        </div>
        <h4 className="font-bold text-slate-900 mb-1">Viaje sem Parar</h4>
        <p className="text-sm text-slate-600">Aproveite tags automáticas para economizar tempo nas praças.</p>
      </div>
    </div>

    <h3>Rotas de Pedágio Mais Procuradas no Brasil</h3>
    <p>Confira a estimativa de pedágio e distância para os trajetos rodoviários mais movimentados:</p>
  </article>
);

const faqItems = [
  {
    question: "Quanto custa o pedágio de São Paulo para o Rio de Janeiro?",
    answer: "Na Rodovia Presidente Dutra (BR-116), a viagem entre São Paulo e Rio de Janeiro possui cerca de 6 praças de pedágio, com custo total aproximado de R$ 75 a R$ 85 para carros de passeio na ida."
  },
  {
    question: "Todas as praças de pedágio aceitam cartão de débito e PIX?",
    answer: "A maioria das concessionárias federais já aceita cartão por aproximação e PIX, mas em rodovias estaduais ou trechos mais antigos ainda pode haver cabines que operam exclusivamente com dinheiro em espécie ou tag automática. Ter uma tag instalada é a melhor garantia de não passar aperto."
  },
  {
    question: "Como funciona o pedágio Free Flow sem cancela?",
    answer: "No Free Flow, não existem cabines físicas nem redução de velocidade. Pórticos equipados com câmeras e sensores leem a tag automática ou a placa do carro ao passar. Se você não tiver tag, precisará acessar o site ou app da concessionária em até 15 dias para pagar a tarifa manualmente e evitar multa por evasão de pedágio."
  },
  {
    question: "Motos pagam pedágio nas rodovias brasileiras?",
    answer: "Depende da concessão. Em algumas rodovias federais motocicletas são isentas de tarifa, enquanto em rodovias estaduais (como em São Paulo) o valor costuma ser cobrado com desconto de 50% em relação à tarifa de veículos de passeio."
  }
];

const relatedTools = [
  {
    title: "Dividir Custo de Viagem",
    url: "/financeiro/dividir-custo-viagem",
    description: "Divida os custos de gasolina, etanol e pedágios igualmente entre os passageiros do carro."
  },
  {
    title: "Distância entre Cidades",
    url: "/localizacao/distancia-cidades",
    description: "Calcule a quilometragem oficial do IBGE e o tempo médio de viagem entre municípios."
  },
  {
    title: "Calculadora de Combustível",
    url: "/utilidades/calculadora-combustivel",
    description: "Simule quantos litros de combustível serão necessários para rodar a distância do trajeto."
  }
];

export default function PedagioLandingPage() {
  return (
    <ToolPageLayout
      title="Calculadora de Pedágios no Brasil"
      description="Calcule a estimativa de tarifas de pedágio, quantidade de praças na rodovia, custo de ida e volta e tempo economizado com tags automáticas."
      path="/localizacao/pedagio"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Componente de Busca */}
        <PedagioSearch />

        {/* Banner de Afiliado Sem Parar */}
        <SemPararBanner
          variant="card"
          title="Economize tempo e garanta descontos com a tag Sem Parar"
          subtitle="Passe direto pelas praças de pedágio em todas as rodovias do Brasil e usufrua do sistema Free Flow sem risco de esquecer pagamentos."
        />

        {/* Grade de Rotas Mais Buscadas */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Principais Rotas e Valores de Pedágio
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Estimativas baseadas em veículos de passeio para os principais eixos rodoviários
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">
              Atualizado {year}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rotasPopularesPedagio.map(([origem, ufA, destino, ufB, road, numPedagios]) => {
              const slugA = citySlug(origem, ufA);
              const slugB = citySlug(destino, ufB);
              const custoEstimado = numPedagios * 6.5;

              return (
                <Link
                  key={`${slugA}-${slugB}`}
                  href={pedagioPairUrl(slugA, slugB)}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {road} km de estrada
                      </span>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        ~{numPedagios} praça{numPedagios > 1 ? 's' : ''}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {origem} ({ufA}) ➔ {destino} ({ufB})
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Est. Pedágio:</span>
                    <span className="text-sm font-black text-blue-900">
                      R$ {custoEstimado.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
