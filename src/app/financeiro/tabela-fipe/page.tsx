import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import TabelaFipeClient from './TabelaFipeClient';

export const metadata: Metadata = generateToolMetadata(
  'Tabela FIPE',
  'Consulte preços médios de veículos novos e usados pela Tabela FIPE. Carros, motos e caminhonetes.',
  '/financeiro/tabela-fipe'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é a Tabela FIPE?</h2>
    <p>
      A Tabela FIPE é um referencial de preços médios de veículos no Brasil, produzido pela 
      Fundação Instituto de Pesquisas Econômicas (FIPE) da Universidade de São Paulo (USP). 
      É amplamente usada por seguradoras, financiadoras e consumidores para avaliar veículos.
    </p>
    <h2>Como os preços são calculados?</h2>
    <p>
      Os valores são baseados em pesquisas de mercado realizadas mensalmente, considerando 
      veículos zero quilômetro e usados. A tabela é atualizada mensalmente e reflete os 
      preços praticados no mercado brasileiro.
    </p>
    <h3>Como consultar</h3>
    <ol>
      <li><strong>Selecione o tipo:</strong> Escolha entre Carros, Utilitários, Motos ou Caminhões.</li>
      <li><strong>Escolha a marca:</strong> Selecione a fabricante do veículo.</li>
      <li><strong>Selecione o modelo:</strong> Escolha o modelo específico.</li>
      <li><strong>Escolha o ano:</strong> Selecione o ano do veículo para ver o preço.</li>
    </ol>
    <h3>Por que a FIPE é importante?</h3>
    <ul>
      <li><strong>Compra e venda:</strong> Serve como referência para negociar veículos usados.</li>
      <li><strong>Seguros:</strong> Seguradoras usam a FIPE para definir o valor de mercado.</li>
      <li><strong>Financiamento:</strong> Bancos utilizam a tabela para definir o valor de garantia.</li>
      <li><strong>Aluguel de veículos:</strong> Empresas de locação baseiam seus preços na FIPE.</li>
    </ul>
  
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
    question: "A Tabela FIPE é obrigatória para venda de veículos?",
    answer: "Não é obrigatória por lei, mas é amplamente utilizada como referência de mercado. Compradores e vendedores usam para negociar preços justos."
  },
  {
    question: "Com que frequência a tabela é atualizada?",
    answer: "A FIPE atualiza a tabela mensalmente, geralmente nas primeiras semanas de cada mês."
  },
  {
    question: "O preço FIPE é o preço real de venda?",
    answer: "Não necessariamente. O preço FIPE é uma média de mercado. O preço real pode variar conforme estado, condição do veículo, kilometragem e negociação."
  }
];

const relatedTools = [
  {
    title: "Financiamento de Carro",
    url: "/financeiro/financiamento-carro",
    description: "Simule o financiamento do veículo que você pesquisou na FIPE."
  },
  {
    title: "Cotação de Moedas",
    url: "/financeiro/cotacao",
    description: "Acompanhe as cotações em tempo real para planejar sua compra."
  },
  {
    title: "ROI Imobiliário",
    url: "/financeiro/roi-imobiliario",
    description: "Compare o investimento em veículos com investimentos imobiliários."
  }
];

export default function TabelaFIPE() {
  return (
    <ToolPageLayout
      title="Tabela FIPE"
      description="Consulte preços médios de veículos pela Tabela FIPE oficial."
      ariaLabel="Consulta de Tabela FIPE interativa"
      path="/financeiro/tabela-fipe"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <TabelaFipeClient />
    </ToolPageLayout>
  );
}
