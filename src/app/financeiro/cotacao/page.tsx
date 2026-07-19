import type { Metadata } from 'next';
import ToolPageLayout from '@/components/ToolPageLayout';
import CotacaoClient from './CotacaoClient';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Cotação Dólar, Euro e Libra Hoje (${year})`,
  description: `Cotação em tempo real do Dólar, Euro e Libra em Reais. Conversor grátis e dados atualizados a cada minuto.`,
  keywords: [
    'cotação dólar hoje', 'cotação euro hoje', 'cotação libra hoje',
    'dólar comercial tempo real', 'euro real', 'libra esterlina real',
    'conversor moeda', 'cotação moedas hoje', 'AwesomeAPI',
  ],
  alternates: { canonical: 'https://buscacentral.com.br/financeiro/cotacao' },
  openGraph: {
    title: `Cotação Dólar, Euro e Libra Hoje (${year}) | BuscaCentral`,
    description: 'Cotação em tempo real do Dólar, Euro e Libra em Reais. Conversor grátis e dados atualizados a cada minuto.',
    url: 'https://buscacentral.com.br/financeiro/cotacao',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Cotação Dólar, Euro e Libra Hoje (${year}) | BuscaCentral`,
    description: 'Cotação em tempo real do Dólar, Euro e Libra em Reais. Conversor grátis.',
  },
};

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Sobre as cotações de moedas</h2>
    <p>
      As cotações são obtidas em tempo real através da AwesomeAPI, uma das principais APIs
      de economia do Brasil. Os valores representam a cotação de compra (bid) e venda (ask)
      das moedas em relação ao Real Brasileiro (BRL).
    </p>
    <h2>Por que as cotações mudam?</h2>
    <p>
      As cotações de moedas são influenciadas por diversos fatores econômicos, como inflação,
      taxa de juros, balança comercial e cenário político. A atualização automática a cada
      minuto garante que você sempre tenha os valores mais recentes.
    </p>
    <h3>Como usar o conversor</h3>
    <ol>
      <li><strong>Selecione a moeda:</strong> Escolha entre Dólar, Euro, Libra e outras moedas disponíveis.</li>
      <li><strong>Digite o valor:</strong> Informe o valor em Reais para ver a conversão, ou o valor na moeda estrangeira para ver o equivalente em BRL.</li>
      <li><strong>Resultado instantâneo:</strong> A conversão é calculada automaticamente com a cotação mais recente.</li>
    </ol>
    <h3>Diferença entre compra e venda</h3>
    <p>
      <strong>Cotação de compra (bid):</strong> Valor que o banco paga quando você vende a moeda estrangeira.
      <strong>Cotação de venda (ask):</strong> Valor que você paga quando compra a moeda estrangeira. A diferença
      entre as duas é a margem do banco (spread).
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
    question: "Como é calculada a cotação do Dólar Comercial em tempo real?",
    answer: "A cotação do Dólar Comercial exibida no BuscaCentral é obtida em tempo real através da AwesomeAPI, que agrega dados dos principais mercados financeiros brasileiros. O valor representa a cotação de compra (bid) em Reais (BRL), atualizada a cada minuto para garantir precisão."
  },
  {
    question: "Qual a diferença entre o Dólar Turismo e o Dólar Comercial exibido no BuscaCentral?",
    answer: "O Dólar Comercial é a cotação usada em transações financeiras entre bancos e empresas, sem IOF ou spread de casas de câmbio. O Dólar Turismo inclui IOF (até 1,1%), spread da casa de câmbio e custos operacionais, sendo sempre mais caro. O BuscaCentral exibe o Dólar Comercial, que é a referência oficial do mercado."
  },
  {
    question: "Como converter Euro ou Libra para Real usando a calculadora?",
    answer: "Na página de Cotação do BuscaCentral, selecione a moeda desejada (Euro ou Libra Esterlina) clicando no cartão da moeda. Em seguida, use o conversor bidirecional: digite o valor na moeda estrangeira para ver o equivalente em Reais, ou digite em Reais para converter para Euro ou Libra. A tabela de conversões rápidas exibe valores pré-calculados para referências comuns como 1, 5, 10, 50, 100, 500 e 1000 unidades."
  },
  {
    question: "Com que frequência as cotações são atualizadas?",
    answer: "As cotações são atualizadas a cada minuto através da AwesomeAPI, garantindo dados sempre atualizados durante o horário comercial."
  },
  {
    question: "Qual a diferença entre cotação de compra e venda?",
    answer: "A cotação de compra (bid) é o valor que o banco paga quando você vende a moeda. A cotação de venda (ask) é o valor que você paga ao comprar. A diferença é a margem do banco."
  },
  {
    question: "As cotações são oficiais?",
    answer: "As cotações são obtidas da AwesomeAPI, que compila dados de múltiplas fontes do mercado financeiro brasileiro. São valores de referência, não necessariamente os de uma instituição específica."
  }
];

const relatedTools = [
  {
    title: "Criptomoedas",
    url: "/financeiro/criptomoedas",
    description: "Acompanhe as principais criptomoedas com cotação em tempo real."
  },
  {
    title: "Juros Compostos",
    url: "/financeiro/juros-compostos",
    description: "Simule investimentos e veja como seu dinheiro pode crescer."
  },
  {
    title: "Tabela FIPE",
    url: "/financeiro/tabela-fipe",
    description: "Consulte preços de veículos para planejar sua compra."
  }
];

export default function Cotacao() {
  return (
    <ToolPageLayout
      title="Cotação do Dólar, Euro e Libra em Tempo Real"
      description="Cotações em tempo real das principais moedas estrangeiras em relação ao Real Brasileiro."
      ariaLabel="Cotação de moedas interativa"
      path="/financeiro/cotacao"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <CotacaoClient faqItems={faqItems} />
    </ToolPageLayout>
  );
}
