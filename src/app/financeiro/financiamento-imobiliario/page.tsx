import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import FinanciamentoImobiliarioClient from './FinanciamentoImobiliarioClient';

export const metadata: Metadata = generateToolMetadata(
  'Simulador de Financiamento Imobiliário',
  'Simule o financiamento da sua casa ou apartamento pelos sistemas SAC e Price. Veja parcelas, total de juros e compare qual sai mais barato. Grátis.',
  '/financeiro/financiamento-imobiliario'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Simulador de Financiamento Imobiliário (SAC e Price)</h2>
    <p>
      Comprar a casa própria é, para a maioria das famílias, o maior compromisso financeiro da vida. Antes de assinar o
      contrato com o banco, é essencial entender quanto você vai pagar de fato. O
      <strong> Simulador de Financiamento Imobiliário da BuscaCentral</strong> calcula as parcelas pelos dois sistemas de
      amortização mais usados no Brasil — <strong>SAC</strong> e <strong>Price</strong> — e mostra qual deles resulta em
      menos juros no total.
    </p>

    <h3>Como usar a calculadora</h3>
    <ol>
      <li><strong>Valor do imóvel:</strong> informe o preço total da casa ou apartamento.</li>
      <li><strong>Entrada:</strong> digite o valor (ou a porcentagem) que você vai dar de entrada. Bancos costumam exigir no mínimo 20%.</li>
      <li><strong>Prazo:</strong> escolha em quantos anos pretende pagar (de 5 a 35 anos).</li>
      <li><strong>Taxa de juros anual:</strong> use a taxa oferecida pelo banco (normalmente entre 9% e 12% ao ano).</li>
      <li><strong>Compare SAC e Price</strong> e veja a primeira parcela, a última, o total pago e o total de juros.</li>
    </ol>

    <h3>SAC ou Price: qual a diferença?</h3>
    <p>
      No <strong>sistema SAC</strong> (Sistema de Amortização Constante), a parte que abate a dívida é fixa, então as
      parcelas começam mais altas e <strong>diminuem com o tempo</strong>. É o sistema mais comum no crédito imobiliário e
      costuma resultar em <strong>menos juros no total</strong>.
    </p>
    <p>
      Já no <strong>sistema Price</strong> (Tabela Price), as <strong>parcelas são fixas</strong> do começo ao fim. Isso
      facilita o planejamento mensal, mas como a dívida é amortizada mais devagar no início, normalmente paga-se
      <strong> mais juros</strong> ao longo do contrato.
    </p>

    <h3>Por que a entrada faz tanta diferença?</h3>
    <p>
      Quanto maior a entrada, menor o valor financiado e, consequentemente, menor o impacto dos juros. Aumentar a entrada
      em alguns pontos percentuais pode representar uma economia de dezenas de milhares de reais ao longo de 30 anos.
      Simule diferentes cenários acima para enxergar esse efeito na prática.
    </p>

    <p>
      Tudo é calculado <strong>no seu navegador</strong>, sem envio de dados. Lembre-se: esta é uma estimativa para
      planejamento. As condições reais incluem seguros obrigatórios (MIP e DFI) e tarifas que variam conforme o banco.
    </p>
  
    <h3>O que é um cálculo comparativo e transição de carreira?</h3>
    <p>O cálculo comparativo entre regimes de trabalho e transições corporativas exige uma visão sistêmica sobre as finanças pessoais e empresariais. Compreender a matemática por trás dessas operações é fundamental para profissionais que buscam otimizar seus rendimentos. Ao utilizar simuladores financeiros, o trabalhador ou empresário consegue traduzir dados brutos em inteligência aplicável para o seu planejamento de longo prazo, considerando não apenas o valor nominal, mas o ganho real líquido de cada cenário.</p>

    <h3>Impostos e responsabilidades fiscais envolvidos</h3>
    <p>Nas transições e cálculos empresariais, as responsabilidades fiscais desempenham um papel crítico. Tributos como impostos retidos na fonte, contribuições previdenciárias e o enquadramento no Simples Nacional ou Lucro Presumido alteram substancialmente o fluxo de caixa. O entendimento claro dessas alíquotas e deduções previne surpresas no planejamento orçamentário anual, permitindo que a pessoa física ou jurídica reserve o montante correto para obrigações legais, mitigando riscos de autuações e otimizando a saúde financeira.</p>

    <h3>Como profissionais utilizam estes dados no planejamento de contratos</h3>
    <p>Profissionais experientes utilizam os dados gerados por estas ferramentas para embasar negociações de contratos e decisões de carreira de forma técnica e transparente. Ter acesso ao detalhamento de deduções e encargos permite desenhar propostas mais assertivas, seja na precificação de serviços B2B, na solicitação de reajustes ou na transição para um novo modelo de atuação. Esses relatórios atuam como um documento de referência matemática, facilitando o diálogo entre contratantes e contratados e assegurando que ambas as partes compreendam o valor real do acordo.</p>
</article>
);

const faqItems = [
  {
    question: 'SAC ou Price: qual é melhor para financiar um imóvel?',
    answer:
      'Depende do seu objetivo. O SAC normalmente resulta em menos juros totais e as parcelas diminuem com o tempo, mas começa com prestações mais altas. O Price tem parcelas fixas, facilitando o orçamento mensal, porém costuma custar mais juros no total. Use o simulador para comparar os dois com os seus números.',
  },
  {
    question: 'Qual é a entrada mínima para financiar um imóvel?',
    answer:
      'A maioria dos bancos financia até 80% do valor do imóvel, exigindo uma entrada de pelo menos 20%. Algumas linhas e programas habitacionais podem ter regras diferentes. Quanto maior a entrada, menor o valor financiado e o total de juros pagos.',
  },
  {
    question: 'A simulação inclui os seguros e taxas do financiamento?',
    answer:
      'Não. Esta calculadora considera o valor financiado, a taxa de juros, o prazo e o sistema de amortização. No contrato real, há seguros obrigatórios (MIP e DFI) e a taxa de administração, que aumentam um pouco o valor da parcela. Por isso, trate o resultado como uma estimativa de planejamento.',
  },
  {
    question: 'Posso usar este simulador para o programa Minha Casa Minha Vida?',
    answer:
      'Você pode usá-lo para ter uma estimativa, informando a taxa de juros do seu enquadramento. Porém, programas habitacionais têm subsídios e regras específicas de renda e taxa que esta ferramenta genérica não aplica automaticamente.',
  },
];

const relatedTools = [
  {
    title: 'Financiamento de Carro',
    url: '/financeiro/financiamento-carro',
    description: 'Simule o financiamento de um veículo pelos sistemas Price e SAC.',
  },
  {
    title: 'Calculadora de Juros Compostos',
    url: '/financeiro/juros-compostos',
    description: 'Veja como seu dinheiro rende ao longo do tempo com juros sobre juros.',
  },
  {
    title: 'Simulador de Investimentos',
    url: '/financeiro/simulador-investimentos',
    description: 'Compare CDB, Tesouro Direto e poupança e planeje sua entrada.',
  },
];

export default function FinanciamentoImobiliarioPage() {
  return (
    <ToolPageLayout
      title="Simulador de Financiamento Imobiliário"
      description="Simule o financiamento da sua casa ou apartamento pelos sistemas SAC e Price, compare os juros e descubra qual sai mais barato."
      ariaLabel="Simulador de financiamento imobiliário interativo"
      path="/financeiro/financiamento-imobiliario"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <FinanciamentoImobiliarioClient />
    </ToolPageLayout>
  );
}
