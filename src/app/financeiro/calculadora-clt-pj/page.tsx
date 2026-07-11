import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import CalculadoraCLTPJClient from './CalculadoraCLTPJClient';

// ---------------------------------------------------------------------------
// SEO METADATA — Otimizado para termos: "calculadora clt x pj", "clt ou pj",
// "qual vale mais a pena clt ou pj"
// ---------------------------------------------------------------------------
export const metadata: Metadata = generateToolMetadata(
  'Calculadora CLT x PJ: Qual vale mais a pena? Simule online',
  'Compare CLT e PJ lado a lado. Simule salário líquido real com INSS, IRRF, FGTS, 13º, férias e benefícios vs faturamento PJ com Simples Nacional. Descubra qual proposta coloca mais dinheiro no bolso.',
  '/financeiro/calculadora-clt-pj'
);

// ---------------------------------------------------------------------------
// CONTEUDO SEO — Texto otimizado para featured snippets e long-tail
// ---------------------------------------------------------------------------
const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Calculadora CLT x PJ: como comparar as duas propostas</h2>
    <p>
      A decisão entre <strong>CLT ou PJ</strong> é uma das mais comuns no mercado de trabalho brasileiro,
      especialmente na área de tecnologia, consultoria e serviços especializados. A nossa{' '}
      <strong>calculadora comparativa CLT x PJ</strong> foi criada para mostrar o{' '}
      <strong>rendimento líquido real</strong> de cada cenário, considerando todos os descontos, impostos e
      benefícios que muitos profissionais esquecem na hora de avaliar uma proposta.
    </p>

    <h3>O que a calculadora considera no cenário CLT?</h3>
    <p>
      No regime CLT, o cálculo vai além do salário líquido. Consideramos os descontos obrigatórios de{' '}
      <strong>INSS</strong> (tabela progressiva) e <strong>IRRF</strong> (imposto de renda retido na fonte),
      e adicionamos ao resultado os benefícios informados (VR, VA, plano de saúde), além das provisões
      mensais de <strong>13º salário</strong> (1/12 por mês), <strong>férias com 1/3 constitucional</strong>{' '}
      (1/12 por mês) e <strong>FGTS</strong> (8% do bruto depositado mensalmente pela empresa).
    </p>

    <h3>O que a calculadora considera no cenário PJ?</h3>
    <p>
      Para o PJ, partimos do faturamento mensal bruto proposto e deduzimos o{' '}
      <strong>imposto do Simples Nacional</strong> (alíquota de 6% do Anexo III, faixa inicial) e o{' '}
      <strong>custo com contabilidade e taxas</strong>. O resultado é o valor que efetivamente cai na sua
      conta como pessoa jurídica.
    </p>

    <h3>Quando vale a pena ser PJ?</h3>
    <p>
      Em geral, o PJ compensa financeiramente quando o faturamento proposto é pelo menos{' '}
      <strong>40% a 60% superior</strong> ao salário bruto CLT equivalente. Isso porque o CLT tem custos
      &ldquo;invisíveis&rdquo; pagos pela empresa (FGTS, INSS patronal, 13º, férias) que não aparecem no
      contracheque mas representam valor real para o trabalhador.
    </p>

    <h3>Limitações do cálculo</h3>
    <p>
      Esta é uma <strong>simulação simplificada</strong> para auxiliar na tomada de decisão. Não considera
      INSS sobre pró-labore PJ, possíveis alíquotas maiores do Simples Nacional em faixas superiores de
      faturamento, benefícios fiscais específicos, ou custos adicionais como plano de saúde particular e
      previdência privada que o PJ precisará contratar por conta própria. Para uma análise completa,
      consulte um contador.
    </p>
  
    <h3>O que é um cálculo comparativo e transição de carreira?</h3>
    <p>O cálculo comparativo entre regimes de trabalho e transições corporativas exige uma visão sistêmica sobre as finanças pessoais e empresariais. Compreender a matemática por trás dessas operações é fundamental para profissionais que buscam otimizar seus rendimentos. Ao utilizar simuladores financeiros, o trabalhador ou empresário consegue traduzir dados brutos em inteligência aplicável para o seu planejamento de longo prazo, considerando não apenas o valor nominal, mas o ganho real líquido de cada cenário.</p>

    <h3>Impostos e responsabilidades fiscais envolvidos</h3>
    <p>Nas transições e cálculos empresariais, as responsabilidades fiscais desempenham um papel crítico. Tributos como impostos retidos na fonte, contribuições previdenciárias e o enquadramento no Simples Nacional ou Lucro Presumido alteram substancialmente o fluxo de caixa. O entendimento claro dessas alíquotas e deduções previne surpresas no planejamento orçamentário anual, permitindo que a pessoa física ou jurídica reserve o montante correto para obrigações legais, mitigando riscos de autuações e otimizando a saúde financeira.</p>

    <h3>Como profissionais utilizam estes dados no planejamento de contratos</h3>
    <p>Profissionais experientes utilizam os dados gerados por estas ferramentas para embasar negociações de contratos e decisões de carreira de forma técnica e transparente. Ter acesso ao detalhamento de deduções e encargos permite desenhar propostas mais assertivas, seja na precificação de serviços B2B, na solicitação de reajustes ou na transição para um novo modelo de atuação. Esses relatórios atuam como um documento de referência matemática, facilitando o diálogo entre contratantes e contratados e assegurando que ambas as partes compreendam o valor real do acordo.</p>
</article>
);

// ---------------------------------------------------------------------------
// FAQ — Schema JSON-LD + HTML estruturado (3 perguntas-alvo de SEO)
// ---------------------------------------------------------------------------
const faqItems = [
  {
    question: 'Qual a diferença entre CLT e PJ?',
    answer:
      'CLT (Consolidação das Leis do Trabalho) é o regime de carteira assinada, onde a empresa paga INSS, FGTS, 13º, férias e demais direitos trabalhistas. PJ (Pessoa Jurídica) é quando o profissional abre uma empresa (geralmente MEI ou ME) e emite nota fiscal. No PJ, o profissional recebe mais bruto, mas precisa arcar com impostos, contador e não tem benefícios trabalhistas garantidos por lei.',
  },
  {
    question: 'Quando vale a pena mudar para PJ?',
    answer:
      'Vale a pena mudar para PJ quando o faturamento proposto é pelo menos 40% a 60% superior ao salário bruto CLT equivalente. Isso compensa a perda de FGTS, 13º, férias remuneradas e estabilidade. Use nossa calculadora para simular com os seus valores reais e tomar a melhor decisão para o seu caso.',
  },
  {
    question: 'Como calcular o salário PJ equivalente?',
    answer:
      'Para calcular o PJ equivalente, some o salário líquido CLT + benefícios + provisão de 13º (1/12) + provisão de férias com 1/3 (1/12) + FGTS (8% do bruto). Esse é o seu "ganho real CLT". O faturamento PJ precisa ser suficiente para, após descontar imposto (6% no Simples) e contador, entregar pelo menos esse mesmo valor líquido.',
  },
];

// ---------------------------------------------------------------------------
// FERRAMENTAS RELACIONADAS — Interlinking
// ---------------------------------------------------------------------------
const relatedTools = [
  {
    title: 'Conversor CLT para PJ (Avançado)',
    url: '/financeiro/conversor-clt-pj',
    description:
      'Versão avançada com PLR, VT, gympass e simulação de FGTS acumulado + multa rescisória.',
  },
  {
    title: 'Calculadora de Salário Líquido',
    url: '/financeiro/salario-liquido',
    description: 'Calcule o salário líquido CLT com todos os descontos obrigatórios.',
  },
  {
    title: 'Simulador de Rescisão Trabalhista',
    url: '/financeiro/rescisao-trabalhista',
    description: 'Simule os valores da rescisão caso decida sair do emprego CLT.',
  },
];

// ---------------------------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------------------------
export default function CalculadoraCLTPJ() {
  return (
    <ToolPageLayout
      title="Calculadora CLT x PJ"
      description="Compare o rendimento líquido real de uma proposta CLT contra uma proposta PJ. Descubra qual regime de contratação coloca mais dinheiro no seu bolso ao fim do mês."
      ariaLabel="Calculadora Comparativa CLT x PJ interativa"
      path="/financeiro/calculadora-clt-pj"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <CalculadoraCLTPJClient />
    </ToolPageLayout>
  );
}
