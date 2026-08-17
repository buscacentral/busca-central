import EvProductCards from '@/components/affiliate/EvProductCards';
import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import PlanejadorSearch from './PlanejadorSearch';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Planejador de Viagens para Carros Elétricos (EV Route Planner) (${year})`,
  'Planeje sua viagem com carro elétrico no Brasil. Insira a origem e destino para mapear todos os eletropostos e pontos de recarga rápida (DC) ao longo da rodovia.',
  '/localizacao/planejador-viagem-ev'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é o Planejador de Viagens para Carros Elétricos (EV Route Planner)?</h2>
    <p>
      O <strong>Planejador de Viagens EV do BuscaCentral</strong> é uma ferramenta especializada no planejamento rodoviário para motoristas de Veículos Elétricos (BEV) e Híbridos Plug-in (PHEV) no Brasil. O sistema traça a rota rodoviária entre cidades brasileiras, calcula a quilometragem total do percurso e mapeia todos os eletropostos rápidos (DC) e semirrápidos (AC) instalados nas rodovias e postos de parada do trajeto.
    </p>

    <h3>Para que serve o planejamento de rotas com recarga elétrica?</h3>
    <p>
      Viajar com um carro elétrico exige previsibilidade sobre a infraestrutura de recarga disponível. O planejador resolve essa necessidade ao oferecer:
    </p>
    <ul>
      <li><strong>Prevenção da Falta de Bateria (Range Anxiety):</strong> Saiba exatamente em quais quilômetros da rodovia estão os pontos de recarga compatíveis com marcas como BYD (Dolphin, Seal, Song, Yuan), GWM (Haval H6, Ora 03), Volvo (EX30, XC40), Renault, BMW e Porsche.</li>
      <li><strong>Priorização de Carregadores Rápidos (DC):</strong> Localize estações ultrarrápidas de 50 kW a 150 kW para recargas de 20% a 80% em 25 a 45 minutos durante suas pausas para refeição ou café.</li>
      <li><strong>Paradas Estruturadas:</strong> Identifique carregadores situados em postos com conveniência completa (como redes Graal, Frango Assado, Shell Recharge, Ipiranga e Petrobras).</li>
      <li><strong>Economia e Sustentabilidade:</strong> Compare a quilometragem e planeje custos de recarga com maior eficiência financeira do que o abastecimento tradicional.</li>
    </ul>

    <h3>Como usar o Planejador de Rotas EV</h3>
    <ol>
      <li><strong>Informe a Origem:</strong> Digite a sua cidade de partida e selecione-a na lista de sugestões.</li>
      <li><strong>Informe o Destino:</strong> Digite a cidade para onde você deseja viajar.</li>
      <li><strong>Clique em Planejar Rota EV:</strong> O sistema exibirá a página dedicada do trajeto com a distância oficial, estimativa de consumo e a lista de eletropostos ordenados pelo caminho.</li>
    </ol>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm font-bold text-lg">
          1
        </div>
        <h4 className="font-bold text-slate-900 mb-1">Defina a Rota</h4>
        <p className="text-sm text-slate-600">Informe origem e destino para traçar a rota rodoviária ideal.</p>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm font-bold text-lg">
          2
        </div>
        <h4 className="font-bold text-slate-900 mb-1">Mapeie os Eletropostos</h4>
        <p className="text-sm text-slate-600">Identifique postos de recarga ao longo de todo o percurso.</p>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-sm font-bold text-lg">
          3
        </div>
        <h4 className="font-bold text-slate-900 mb-1">Viaje Seguro</h4>
        <p className="text-sm text-slate-600">Verifique conectores, potência em kW e navegue até as paradas.</p>
      </div>
    </div>
  </article>
);

const faqItems = [
  {
    question: "Quantas paradas de recarga devo planejar em uma viagem de carro elétrico?",
    answer: "A recomendação prática é programar paradas a cada 200 a 300 km de estrada. Em rodovias com velocidade de 100 a 120 km/h e ar-condicionado em funcionamento, a autonomia real de um VE costuma ser de 70% a 80% do valor homologado no ciclo Inmetro/PBEV."
  },
  {
    question: "Os eletropostos em rodovias possuem plugues compatíveis com meu veículo?",
    answer: "Sim. A grande maioria dos carregadores instalados em rodovias brasileiras adota o padrão europeu CCS2 Combo para corrente contínua (recarga rápida DC) e Tipo 2 para recarga alternada (AC)."
  },
  {
    question: "O que fazer como margem de segurança caso um eletroposto esteja ocupado ou indisponível?",
    answer: "A regra de ouro do condutor de veículos elétricos é nunca chegar ao ponto de recarga com menos de 15% a 20% de bateria restante. Essa margem garante energia suficiente para alcançar o próximo posto de recarga na mesma rodovia."
  },
  {
    question: "É necessário instalar aplicativos específicos para pagar a recarga na estrada?",
    answer: "Sim. As principais redes rodoviárias brasileiras (EZVolt, Tupinambá, Shell Recharge, Zletric, WeCharge) operam a ativação e pagamento via aplicativo móvel. É altamente recomendável cadastrar seu cartão previamente nos aplicativos antes de iniciar a viagem."
  }
];

const relatedTools = [
  {
    title: "Eletropostos Perto de Mim",
    url: "/localizacao/carregador-eletrico/perto-de-mim",
    description: "Encontre carregadores de carros elétricos próximos via GPS em tempo real."
  },
  {
    title: "Distância entre Cidades",
    url: "/localizacao/distancia-cidades",
    description: "Calcule a distância rodoviária oficial e tempo de viagem entre municípios."
  },
  {
    title: "Calculadora de Combustível",
    url: "/utilidades/calculadora-combustivel",
    description: "Compare o custo de abastecimento por km rodado entre eletricidade, etanol e gasolina."
  }
];

export default function PlanejadorIndexPage() {
  return (
    <ToolPageLayout
      title={`Planejador de Viagens para Carros Elétricos (${year})`}
      description="Nunca mais fique sem bateria na estrada. Traçamos sua rota e encontramos todos os pontos de recarga disponíveis no trajeto para o seu carro elétrico."
      ariaLabel="Planejador de rotas de carro elétrico interativo"
      path="/localizacao/planejador-viagem-ev"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <div className="py-4">
        <PlanejadorSearch />
      </div>
    </ToolPageLayout>
  );
}
