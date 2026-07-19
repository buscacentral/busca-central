import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import RescisaoTrabalhistaClient from './RescisaoTrabalhistaClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora Rescisão Trabalhista (${year})`,
  `Calcule sua rescisão: verbas, 13º proporcional, férias, FGTS e multa de 40%. Atualizada ${year}, grátis e sem cadastro.`,
  '/financeiro/rescisao-trabalhista'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Tipos de Rescisão</h2>
    <p>
      <strong>Sem justa causa:</strong> o empregador demite sem motivo. O trabalhador recebe todas as verbas,
      aviso prévio, multa de 40% do FGTS e tem direito ao seguro-desemprego.
    </p>
    <p>
      <strong>Pedido de demissão:</strong> o trabalhador pede para sair. Perde a multa do FGTS e o
      seguro-desemprego, e pode ter desconto do aviso prévio não cumprido.
    </p>
    <p>
      <strong>Justa causa:</strong> o empregador demite por falta grave. O trabalhador recebe apenas
      saldo de salário e férias vencidas.
    </p>
    <p>
      <strong>Acordo mútuo (art. 484-A):</strong> ambas as partes concordam. Multa FGTS de 20%,
      saque de 80% do FGTS, sem seguro-desemprego.
    </p>

    <h2>Como é feito o cálculo exato da nossa calculadora?</h2>
    <p>
      Diferente de outros simuladores da internet que calculam o FGTS e o 13º sobre bases erradas
      ou parciais, o BuscaCentral utiliza o histórico de meses trabalhados para projetar o saldo
      real acumulado do FGTS, aplicando a multa rescisória de 40% estritamente sobre o montante
      depositado e calculando as alíquotas de INSS e IRRF apenas sobre a base tributável permitida por lei.
    </p>
    <h3>13º Salário Proporcional</h3>
    <p>
      O 13º proporcional é calculado com base nos meses trabalhados <strong>no ano da demissão</strong>,
      e não no total de meses do contrato. Se o funcionário foi demitido em junho, recebe 6/12 avos
      do salário bruto, independentemente de ter trabalhado 2 ou 10 anos na empresa.
    </p>
    <h3>Férias Proporcionais</h3>
    <p>
      As férias proporcionais são calculadas sobre o período aquisitivo incompleto. Se o funcionário
      completou 3 anos e 7 meses, recebe férias por 7 meses (o restante do ciclo de 12 meses).
      A fórmula é: <code>(salário ÷ 12) × meses do período incompleto</code>, acrescida do terço constitucional.
    </p>
    <h3>FGTS e Multa Rescisória</h3>
    <p>
      O FGTS é calculado como <code>salário × meses trabalhados × 8%</code>. A multa de 40%
      (ou 20% no acordo mútuo) é aplicada <strong>exclusivamente sobre o FGTS acumulado</strong>,
      e não sobre o saldo de salário ou outras verbas. Isso garante que o valor da multa reflita
      o real patrimônio do trabalhador na conta do FGTS.
    </p>
    <h3>INSS e IRRF</h3>
    <p>
      Os descontos de INSS e IRRF incidem apenas sobre a <strong>base tributável</strong>: saldo de
      salário + aviso prévio indenizado. Férias, 13º proporcional e multa do FGTS <strong>não sofrem
      esses descontos</strong> na rescisão. Nossa calculadora respeita essa regra para não inflar
      artificialmente os descontos.
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
    question: "Qual a diferença entre demissão sem justa causa e pedido de demissão?",
    answer: "Na demissão sem justa causa, o trabalhador recebe todas as verbas + multa de 40% do FGTS + seguro-desemprego. No pedido de demissão, perde a multa do FGTS e o seguro-desemprego."
  },
  {
    question: "O aviso prévio é obrigatório?",
    answer: "Sim. O aviso prévio pode ser trabalhado (o funcionário continua trabalhando) ou indenizado (a empresa paga um valor equivalente). A nossa calculadora considera o aviso prévio indenizado."
  },
  {
    question: "Como funciona a multa do acordo mútuo (art. 484-A)?",
    answer: "No acordo mútuo, a multa do FGTS é de 20% (metade da normal), o trabalhador pode sacar 80% do FGTS, mas não tem direito ao seguro-desemprego."
  }
];

const relatedTools = [
  {
    title: "Conversor CLT → PJ",
    url: "/financeiro/conversor-clt-pj",
    description: "Se está pensando em sair da CLT, veja quanto precisa faturar como PJ."
  },
  {
    title: "Juros Compostos",
    url: "/financeiro/juros-compostos",
    description: "Simule como investir o valor da sua rescisão."
  },
  {
    title: "Simulador de Investimentos",
    url: "/financeiro/simulador-investimentos",
    description: "Compare opções para aplicar o valor da rescisão."
  }
];

export default function RescisaoTrabalhista() {
  return (
    <ToolPageLayout
      title="Calculadora de Rescisão Trabalhista"
      description="Calcule os valores da sua rescisão trabalhista de forma rápida e gratuita. Nossa calculadora considera saldo de salário, aviso prévio, 13º salário proporcional, férias e multa do FGTS para todos os tipos de demissão."
      ariaLabel="Calculadora de rescisão trabalhista interativa"
      path="/financeiro/rescisao-trabalhista"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <RescisaoTrabalhistaClient />
    </ToolPageLayout>
  );
}
