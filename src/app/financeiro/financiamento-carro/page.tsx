import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import FinanciamentoCarroClient from './FinanciamentoCarroClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Simulador Financiamento de Carro (${year})`,
  `Simule o financiamento do seu carro: parcelas, juros totais e custo final por Price ou SAC. Grátis e atualizado ${year}.`,
  '/financeiro/financiamento-carro'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Simulador de Financiamento de Carro: Como Planejar Sua Compra</h2>
    <p>O <strong>Simulador de Financiamento de Carro da BuscaCentral</strong> é a ferramenta ideal para você visualizar exatamente o custo da compra do seu veículo antes de assinar o contrato. Compreender os juros e as opções de parcelamento é fundamental para evitar endividamento e garantir o melhor negócio.</p>

    <h3>Como usar o simulador passo a passo</h3>
    <p>Nossa calculadora é projetada para fornecer uma projeção clara e rápida:</p>
    <ol>
      <li><strong>Valor do Veículo:</strong> Informe o valor total do carro que deseja comprar.</li>
      <li><strong>Valor da Entrada:</strong> Digite o valor que você pagará à vista (o saldo devedor será a diferença).</li>
      <li><strong>Taxa de Juros:</strong> Insira a taxa de juros oferecida pelo banco ou concessionária (ao mês ou ao ano).</li>
      <li><strong>Prazo:</strong> Escolha em quantos meses deseja parcelar o financiamento (geralmente de 12 a 60 meses).</li>
      <li><strong>Sistema de Amortização:</strong> Selecione entre Price (parcelas fixas) ou SAC (parcelas decrescentes).</li>
    </ol>
    <p>Ao calcular, você obterá o valor exato das parcelas, o total de juros que será pago ao banco e o custo final do carro.</p>

    <h3>Qual a diferença entre a Tabela Price e o SAC?</h3>
    <p>Essa é a dúvida mais comum na hora de financiar. Entenda os detalhes:</p>
    <ul>
      <li><strong>Tabela Price:</strong> É o modelo mais comum no Brasil. As parcelas são fixas do início ao fim do contrato. Oferece alta previsibilidade, mas no longo prazo, o montante total de juros pagos costuma ser maior, já que a amortização inicial da dívida é mais lenta.</li>
      <li><strong>Sistema SAC (Sistema de Amortização Constante):</strong> Como o nome sugere, você abate um valor fixo da dívida todo mês. Por isso, as primeiras parcelas são mais altas e vão diminuindo com o passar do tempo (pois os juros incidem sobre um saldo devedor cada vez menor). No total, você paga menos juros do que na Tabela Price.</li>
    </ul>

    <h3>Benefícios de simular antes de fechar negócio</h3>
    <p>Realizar simulações financeiras evita surpresas desagradáveis. Algumas vantagens:</p>
    <ul>
      <li><strong>Transparência total:</strong> Descubra o verdadeiro custo efetivo (Custo Efetivo Total - CET) e não apenas o valor do bem.</li>
      <li><strong>Poder de barganha:</strong> Sabendo como os juros impactam as parcelas, você pode negociar taxas melhores com a instituição financeira.</li>
      <li><strong>Planejamento do fluxo de caixa:</strong> Analise qual parcela se encaixa confortavelmente no seu orçamento familiar mensal sem comprometer suas finanças essenciais.</li>
    </ul>

    <h3>Exemplos práticos de financiamento</h3>
    <p>Para facilitar a visualização, imagine um carro de R$ 50.000, com uma entrada de R$ 10.000 (R$ 40.000 financiados), em 48 meses a uma taxa de juros de 1,5% ao mês.</p>
    <p><strong>Na Tabela Price:</strong> Você pagaria 48 parcelas fixas de aproximadamente R$ 1.185. O total de juros ficaria em torno de R$ 16.880.</p>
    <p><strong>No Sistema SAC:</strong> A primeira parcela seria de cerca de R$ 1.433 e a última de R$ 845. O total de juros ficaria em torno de R$ 14.700. Ou seja, uma economia considerável no longo prazo.</p>

    <h3>Conclusão</h3>
    <p>O nosso Simulador de Financiamento de Carro é uma bússola para a sua próxima compra. Sempre simule diferentes cenários (ex: dar uma entrada maior, reduzir o prazo) para encontrar a configuração mais econômica e que garanta a saúde da sua vida financeira.</p>
  
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
    question: "O que é melhor: Tabela Price ou Sistema SAC para carros?",
    answer: "A escolha depende do seu orçamento. O SAC é matematicamente mais vantajoso por cobrar menos juros no montante final, mas requer capacidade financeira para arcar com parcelas maiores no início. A Tabela Price é indicada se você precisa de parcelas fixas e menores desde o primeiro mês, sacrificando a economia a longo prazo."
  },
  {
    question: "Posso amortizar o financiamento antes do prazo?",
    answer: "Sim, de acordo com o Código de Defesa do Consumidor, você tem o direito de antecipar parcelas ou quitar o financiamento a qualquer momento, o que garante o abatimento proporcional dos juros futuros."
  },
  {
    question: "A simulação inclui o CET (Custo Efetivo Total)?",
    answer: "Nossa ferramenta faz um cálculo direto com base na taxa de juros informada. No entanto, lembre-se de que no financiamento real os bancos incluem IOF, TAC (Taxa de Abertura de Crédito) e seguros. Sempre peça o valor do CET à concessionária, pois ele representa a verdadeira taxa que você pagará."
  }
];

const relatedTools = [
  {
    title: "Tabela FIPE",
    url: "/financeiro/tabela-fipe",
    description: "Consulte rapidamente o preço médio dos veículos no mercado nacional e garanta um preço justo na compra."
  },
  {
    title: "Simulador de Investimentos",
    url: "/financeiro/simulador-investimentos",
    description: "Compare o retorno do seu dinheiro se, ao invés de comprar o carro, você investisse o valor."
  },
  {
    title: "Juros Compostos",
    url: "/financeiro/juros-compostos",
    description: "Entenda a matemática por trás dos juros e veja como eles podem trabalhar contra ou a favor do seu bolso."
  }
];

export default function FinanciamentoCarro() {
  return (
    <ToolPageLayout
      title="Simulador de Financiamento de Carro"
      description="Simule o financiamento do seu veículo e descubra o valor das parcelas, total de juros e custo efetivo. Compare os sistemas Price e SAC para escolher a melhor opção."
      ariaLabel="Simulador de financiamento de carro interativo"
      path="/financeiro/financiamento-carro"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <FinanciamentoCarroClient />
    </ToolPageLayout>
  );
}
