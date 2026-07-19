import type { Metadata } from 'next';
import ToolPageLayout from '@/components/ToolPageLayout';
import DividirCustoViagemClient from './DividirCustoViagemClient';

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Calculadora para Dividir Custo de Viagem (${year}): Racha-Combustível`,
  description: `Calcule o valor de combustível e pedágio por pessoa na sua viagem de carro. Divida a conta facilmente com amigos via Pix. 100% grátis e atualizado em ${year}.`,
  keywords: [
    'dividir custo de viagem',
    'racha combustivel',
    'dividir gasolina viagem',
    'calcular gasto de viagem por pessoa',
    'dividir pedagio e gasolina',
    'racha de viagem de carro',
    'calcular pix viagem',
  ],
  alternates: { canonical: 'https://buscacentral.com.br/financeiro/dividir-custo-viagem' },
  openGraph: {
    title: `Calculadora para Dividir Custo de Viagem (${year}): Racha-Combustível | BuscaCentral`,
    description: `Calcule o valor de combustível e pedágio por pessoa na sua viagem de carro. Divida a conta facilmente com amigos via Pix. 100% grátis.`,
    url: 'https://buscacentral.com.br/financeiro/dividir-custo-viagem',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Calculadora para Dividir Custo de Viagem (${year}): Racha-Combustível`,
    description: `Calcule o valor de combustível e pedágio por pessoa na sua viagem de carro. Divida a conta via Pix de forma justa.`,
  },
};

const faqItems = [
  {
    question: 'Como calcular o consumo exato do meu carro na estrada?',
    answer: 'Para calcular o consumo real em km/L, encha o tanque antes de sair e zere o odômetro parcial (Trip). Ao final do trajeto, complete o tanque novamente. Divida a quantidade de quilômetros rodados pelo número de litros necessários para encher o tanque.',
  },
  {
    question: 'Devo incluir a desgaste do carro no racha da viagem?',
    answer: 'Para viagens casuais entre amigos, costuma-se rachar apenas os custos diretos de combustível e pedágio. Em viagens muito longas ou corporativas, pode-se incluir uma taxa simbólica por quilômetro rodado para custear depreciação, pneus e óleo.',
  },
  {
    question: 'Como cobrar o valor dos passageiros de forma transparente?',
    answer: 'O ideal é utilizar nossa calculadora de racha-combustível e enviar o resumo gerado com o valor por pessoa e a sua chave Pix diretamente no grupo de WhatsApp da viagem.',
  },
];

const relatedTools = [
  {
    title: 'Calculadora Álcool ou Gasolina (Flex)',
    url: '/utilidades/calculadora-combustivel-flex',
    description: 'Descubra qual combustível vale mais a pena na hora de abastecer.',
  },
  {
    title: 'Estimativa de Pedágio entre Cidades',
    url: '/localizacao/pedagio/sao-paulo-sp/rio-de-janeiro-rj',
    description: 'Estime praças de cobrança e tarifas de pedágio para a sua rota.',
  },
  {
    title: 'Cálculo de Combustível para Viagem',
    url: '/utilidades/calculadora-combustivel',
    description: 'Calcule a quantidade total de litros e o custo estimado de combustível.',
  },
];

const seoContent = (
  <article className="prose prose-gray max-w-none space-y-6 text-slate-700">
    <h2>Como calcular o gasto de combustível por quilômetro rodado</h2>
    <p>
      Para planejar os custos de uma viagem de carro com precisão, a fórmula base consiste em dividir a <strong>distância percorrida (km)</strong> pelo <strong>consumo médio do veículo (km/L)</strong> e multiplicar pelo <strong>preço do combustível por litro (R$)</strong>.
    </p>

    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 my-4 font-mono text-sm text-slate-800 space-y-1">
      <p><strong>Custo do Combustível</strong> = (Distância ÷ Consumo) × Preço por Litro</p>
      <p><strong>Custo Total da Viagem</strong> = Custo do Combustível + Tarifas de Pedágio</p>
      <p className="text-blue-700 font-bold"><strong>Valor por Pessoa</strong> = Custo Total da Viagem ÷ Número de Passageiros</p>
    </div>

    <h2>O que incluir no racha de custos de uma viagem de carro</h2>
    <p>
      Para evitar mal-entendidos entre os passageiros, é recomendável alinhar previamente os itens que farão parte do orçamento dividido:
    </p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Combustível:</strong> O total gasto em abastecimentos durante todo o itinerário.</li>
      <li><strong>Pedágios:</strong> As tarifas cobradas nas praças manuais ou registradas no extrato da tag automática.</li>
      <li><strong>Estacionamento:</strong> Taxas pagas em garagens ou estacionamentos em pontos turísticos.</li>
      <li><strong>Alimentação em trânsito (opcional):</strong> Paradas em lanchonetes de estrada podem ser divididas ou pagas individualmente por cada passageiro.</li>
    </ul>

    <h2>Formas inteligentes de organizar finanças compartilhadas entre amigos</h2>
    <p>
      Viajar em grupo fica muito mais simples quando as despesas são registradas em tempo real. A melhor prática é definir um organizador financeiro responsável por concentrar o pagamento dos abastecimentos e repassar o código Pix para acerto imediato ao final do passeio, garantindo justiça e transparência para todos os motoristas e caronas.
    </p>
  </article>
);

export default function DividirCustoViagemPage() {
  return (
    <ToolPageLayout
      title="Calculadora de Racha-Combustível e Custos de Viagem"
      description="Divida o custo de combustível e pedágios entre os passageiros de forma simples, justa e com resumo pronto para o WhatsApp."
      path="/financeiro/dividir-custo-viagem"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <DividirCustoViagemClient />
    </ToolPageLayout>
  );
}
