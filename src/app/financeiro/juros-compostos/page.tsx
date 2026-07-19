import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import JurosCompostosClient from './JurosCompostosClient';

export const revalidate = 3600;

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora Juros Compostos Online (${year})`,
  `Simule investimentos com juros compostos e veja seu dinheiro crescer. Ferramenta grátis, atualizada ${year} e sem cadastro.`,
  '/financeiro/juros-compostos'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que são juros compostos?</h2>
    <p>
      Juros compostos são os juros calculados sobre o capital inicial mais os juros acumulados 
      dos períodos anteriores. É o famoso &quot;juros sobre juros&quot;, que faz o dinheiro crescer 
      exponencialmente ao longo do tempo.
    </p>
    <h2>Por que simular?</h2>
    <p>
      Simular investimentos ajuda a entender quanto você pode acumular ao longo do tempo, 
      considerando aportes regulares e a taxa de retorno. É essencial para planejar a 
      aposentadoria, compra de imóveis ou qualquer objetivo financeiro.
    </p>
    <h3>Como usar a calculadora</h3>
    <ol>
      <li><strong>Capital Inicial:</strong> Informe o valor que você já tem disponível para investir.</li>
      <li><strong>Aporte Mensal:</strong> Defina quanto pretende depositar todo mês.</li>
      <li><strong>Taxa de Juros:</strong> Informe a taxa mensal ou anual do investimento.</li>
      <li><strong>Prazo:</strong> Escolha por quanto tempo pretende manter o investimento.</li>
    </ol>
    <h3>Exemplo prático</h3>
    <p>
      Se você investir R$ 1.000 iniciais + R$ 200/mês durante 10 anos a 1% ao mês, o montante
      final será de aproximadamente R$ 52.000 — sendo R$ 25.000 apenas de juros compostos.
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
    question: "Qual a diferença entre juros simples e compostos?",
    answer: "No juros simples, os juros são calculados apenas sobre o capital inicial. Nos juros compostos, os juros incidem sobre o capital acumulado (capital + juros anteriores), gerando crescimento exponencial."
  },
  {
    question: "Juros compostos funcionam para qualquer investimento?",
    answer: "Sim. Qualquer investimento que reinveste automaticamente os rendimentos (como CDB, Tesouro Direto e fundos) utiliza juros compostos. Até a poupança rende com juros compostos, embora a taxa seja baixa."
  },
  {
    question: "Como calcular juros compostos manualmente?",
    answer: "A fórmula é M = C × (1 + i)^n, onde M é o montante final, C é o capital inicial, i é a taxa por período e n é o número de períodos. Para aportes mensais, a fórmula se torna mais complexa, por isso a calculadora é útil."
  }
];

const relatedTools = [
  {
    title: "Simulador de Investimentos",
    url: "/financeiro/simulador-investimentos",
    description: "Compare rendimento de CDB, Tesouro Selic e Poupança."
  },
  {
    title: "Financiamento de Carro",
    url: "/financeiro/financiamento-carro",
    description: "Simule o financiamento e veja o impacto dos juros no preço final."
  },
  {
    title: "ROI Imobiliário",
    url: "/financeiro/roi-imobiliario",
    description: "Compare a rentabilidade de imóveis com juros compostos."
  }
];

export default function JurosCompostos() {
  return (
    <ToolPageLayout
      title="Simulador de Juros Compostos"
      description="Simule o crescimento dos seus investimentos com aportes mensais e juros compostos."
      ariaLabel="Calculadora de juros compostos interativa"
      path="/financeiro/juros-compostos"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <JurosCompostosClient />
    </ToolPageLayout>
  );
}
