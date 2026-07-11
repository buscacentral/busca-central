import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import SimuladorInvestimentosClient from './SimuladorInvestimentosClient';

export const metadata: Metadata = generateToolMetadata(
  'Simulador de Investimentos',
  'Compare investimentos: CDB, Tesouro Direto, poupança e mais. Simule rendimentos com impostos.',
  '/financeiro/simulador-investimentos'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Como o Simulador de Investimentos pode ajudar no seu futuro financeiro?</h2>
    <p>O <strong>Simulador de Investimentos da BuscaCentral</strong> foi criado para simplificar o mercado financeiro e ajudar você a entender quanto o seu dinheiro pode render ao longo do tempo. Comparamos as principais opções de renda fixa do Brasil (Poupança, Tesouro Direto e CDB) para que você tome a melhor decisão, sempre considerando o desconto do Imposto de Renda.</p>

    <h3>Como utilizar o simulador</h3>
    <p>A simulação é prática e fornece resultados líquidos (o que realmente vai para o seu bolso):</p>
    <ol>
      <li><strong>Valor Inicial:</strong> Insira o capital que você tem disponível para investir hoje.</li>
      <li><strong>Aporte Mensal:</strong> Se planeja depositar dinheiro todo mês, informe o valor (isso acelera consideravelmente os juros compostos).</li>
      <li><strong>Prazo:</strong> Escolha por quanto tempo pretende deixar o dinheiro investido.</li>
      <li><strong>Taxa Selic/CDI:</strong> Informe a taxa básica de juros atual (o sistema pode sugerir a taxa vigente, mas você pode alterar para simular cenários futuros).</li>
    </ol>
    <p>O resultado vai projetar o montante bruto, o total de juros ganhos, o desconto do Imposto de Renda (se houver) e o saldo final líquido para cada tipo de aplicação.</p>

    <h3>Entendendo as opções de investimento</h3>
    <p>Nossa calculadora foca na renda fixa, a modalidade mais segura do mercado brasileiro. Entenda as diferenças:</p>
    <ul>
      <li><strong>Poupança:</strong> É a aplicação mais popular e isenta de Imposto de Renda. No entanto, sua rentabilidade é a menor de todas, geralmente perdendo para a inflação no longo prazo. Rende apenas na data de "aniversário" do depósito (mensalmente).</li>
      <li><strong>Tesouro Selic:</strong> Um título público emitido pelo Governo Federal (considerado o investimento mais seguro do país). Seu rendimento acompanha a taxa Selic diariamente. Embora tenha cobrança de Imposto de Renda, o retorno líquido é superior ao da poupança na imensa maioria dos cenários.</li>
      <li><strong>CDB (Certificado de Depósito Bancário):</strong> Você empresta dinheiro para um banco em troca de juros. CDBs que pagam 100% do CDI (ou mais) também superam a poupança facilmente. São protegidos pelo Fundo Garantidor de Créditos (FGC).</li>
    </ul>

    <h3>Benefícios de usar o simulador</h3>
    <p>Ao realizar uma projeção, você consegue transformar sonhos em metas matemáticas. Benefícios incluem:</p>
    <ul>
      <li><strong>Fuga da inflação:</strong> Entender matematicamente por que a Poupança pode desvalorizar seu poder de compra.</li>
      <li><strong>Poder dos aportes:</strong> Visualizar o impacto gigantesco que pequenos depósitos mensais causam ao longo dos anos.</li>
      <li><strong>Transparência tributária:</strong> Compreender como o Imposto de Renda afeta seus ganhos dependendo do prazo do investimento.</li>
    </ul>

    <h3>Exemplos práticos de simulação</h3>
    <p>Imagine investir R$ 10.000,00 iniciais, sem aportes mensais, durante 2 anos (24 meses), com uma taxa Selic em torno de 10% ao ano.</p>
    <ul>
      <li><strong>Poupança:</strong> Seu dinheiro renderia cerca de 6,17% ao ano + TR. No final, você teria aproximadamente R$ 11.270,00 (líquidos, pois é isenta).</li>
      <li><strong>Tesouro Selic:</strong> Renderia os 10% ao ano brutos. Após descontar a alíquota de 15% de Imposto de Renda sobre o lucro, o saldo final seria próximo de R$ 11.780,00 (uma diferença de R$ 510 apenas escolhendo o lugar certo).</li>
    </ul>

    <h3>Conclusão</h3>
    <p>Nosso Simulador de Investimentos prova que a falta de conhecimento custa caro. Explorar opções seguras como o Tesouro Direto e o CDB protege seu patrimônio e faz seu dinheiro trabalhar por você com eficiência. Simule diferentes prazos e descubra a força dos juros compostos!</p>
  
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
    question: "Como funciona a tabela de Imposto de Renda na Renda Fixa?",
    answer: "A tributação no Tesouro Direto e CDB é regressiva. Ela incide apenas sobre os lucros (nunca sobre o capital inicial) nas seguintes faixas: 22,5% (até 180 dias), 20% (de 181 a 360 dias), 17,5% (de 361 a 720 dias) e 15% (acima de 720 dias). A Poupança é totalmente isenta de IR."
  },
  {
    question: "O Tesouro Selic pode dar prejuízo?",
    answer: "Diferente de títulos prefixados ou indexados à inflação (IPCA+), o Tesouro Selic não sofre marcação a mercado negativa significativa. Ele sempre rende um valor positivo a cada dia útil, acompanhando a taxa Selic. A única forma de 'perder dinheiro' seria se você retirasse o valor antes de 30 dias devido à cobrança de IOF."
  },
  {
    question: "O que é CDI e qual sua relação com a Selic?",
    answer: "CDI (Certificado de Depósito Interbancário) é a taxa que os bancos usam para emprestar dinheiro entre si. Na prática, a taxa CDI é sempre muito próxima à taxa Selic (geralmente 0,10% menor). Por isso, um CDB que rende '100% do CDI' vai render quase a mesma coisa que o Tesouro Selic."
  }
];

const relatedTools = [
  {
    title: "Juros Compostos",
    url: "/financeiro/juros-compostos",
    description: "Faça projeções avançadas de juros sobre juros e entenda o crescimento exponencial do seu patrimônio."
  },
  {
    title: "Financiamento de Carro",
    url: "/financeiro/financiamento-carro",
    description: "Descubra quanto de juros você pagaria ao banco financiando um veículo em vez de investir o dinheiro."
  },
  {
    title: "Calculadora de ROI",
    url: "/financeiro/roi-imobiliario",
    description: "Analise se vale a pena comprar um imóvel para investir ou se é melhor manter o dinheiro rendendo na renda fixa."
  }
];

export default function SimuladorInvestimentos() {
  return (
    <ToolPageLayout
      title="Simulador de Investimentos"
      description="Compare o rendimento do CDB, Tesouro Selic e Poupança de forma simples. Simule os juros e veja o dinheiro líquido após o Imposto de Renda."
      ariaLabel="Simulador de investimentos interativo"
      path="/financeiro/simulador-investimentos"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <SimuladorInvestimentosClient />
    </ToolPageLayout>
  );
}
