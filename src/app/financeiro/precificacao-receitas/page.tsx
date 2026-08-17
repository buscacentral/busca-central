import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import PrecificacaoClient from './PrecificacaoClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora de Precificação de Receitas (${year})`,
  'Calcule o custo exato da sua receita, adicione custos invisíveis, embalagens e defina o preço de venda ideal com margem de lucro real.',
  '/financeiro/precificacao-receitas'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é a Calculadora de Precificação de Receitas?</h2>
    <p>
      A <strong>Calculadora de Precificação de Receitas do BuscaCentral</strong> é uma ferramenta profissional de gestão financeira voltada para confeiteiros, doceiros, padeiros, cozinheiros, artesãos e empreendedores do setor gastronômico. Ela automatiza a montagem da ficha técnica de custos, convertendo proporcionalmente os ingredientes utilizados, computando custos indiretos (gás, energia, água) e embalagens, e calculando o <strong>preço de venda ideal por unidade</strong> com base na margem de lucro desejada.
    </p>

    <h3>Para que serve precificar corretamente alimentos e doces?</h3>
    <p>
      Muitos negócios caseiros e pequenas confeitarias operam no vermelho ou fecham as portas por usarem regras empíricas antigas, como simplesmente &quot;multiplicar os custos por 3&quot;. A precificação técnica e profissional garante:
    </p>
    <ul>
      <li><strong>Lucro Real e Sustentável:</strong> Assegura que cada brigadeiro, fatia de bolo, pão artesanal ou marmita vendida cubra todas as despesas e deixe sobra limpa no caixa da empresa.</li>
      <li><strong>Ficha Técnica Automatizada:</strong> Converte automaticamente as medidas de compra (ex.: 1 kg de farinha ou 1 litro de leite) para as frações exatas exigidas pela receita (gramas e mililitros).</li>
      <li><strong>Cobertura de Custos Invisíveis:</strong> Inclui despesas que passam despercebidas, como gás de cozinha, energia elétrica de batedeiras e fornos, água, detergente e desgaste de utensílios.</li>
      <li><strong>Inclusão de Embalagens e Etiquetas:</strong> Considera o valor de caixas, fitas, adesivos personalizados e sacolas no custo unitário de cada produto entregue.</li>
    </ul>

    <h3>Como usar a Calculadora de Precificação</h3>
    <ol>
      <li><strong>Cadastre os Ingredientes:</strong> Informe o nome do item, a quantidade comprada na embalagem fechada, o preço pago e a quantidade que vai na sua receita.</li>
      <li><strong>Defina os Custos Fixos e Variáveis (%):</strong> Insira uma porcentagem (recomendado entre 10% e 20%) para cobrir gás, luz, água e materiais de limpeza.</li>
      <li><strong>Adicione o Custo de Embalagem:</strong> Digite o custo individual das embalagens, sacolas e fitas por unidade de produto.</li>
      <li><strong>Informe o Rendimento:</strong> Digite quantas unidades ou porções a receita completa produz.</li>
      <li><strong>Ajuste a Margem de Lucro (%):</strong> Defina a porcentagem de lucro desejada para obter o Preço de Venda Sugerido e o Lucro Líquido total.</li>
    </ol>

    <h3>Diferença entre Salário (Mão de Obra) e Lucro da Empresa</h3>
    <p>
      Um dos erros mais frequentes na gastronomia artesanal é confundir o lucro da empresa com o salário do cozinheiro. A remuneração pelas horas trabalhadas (seu pró-labore) deve ser incluída como custo de mão de obra na receita. O <strong>lucro líquido</strong> é o capital que pertence à empresa, reservado para investimentos em maquinários, reformas, marketing e reserva de emergência para períodos de baixa sazonalidade.
    </p>
  </article>
);

const faqItems = [
  {
    question: "Por que a regra de 'multiplicar por 3' não é mais recomendada?",
    answer: "A regra de multiplicar os custos por 3 é genérica e imprecisa. Ela pode superfaturar produtos com ingredientes muito caros (afastando clientes) e subestimar produtos trabalhosos com ingredientes baratos (gerando prejuízo pelo tempo de mão de obra e gás consumido)."
  },
  {
    question: "Como estimar os custos de gás, água e eletricidade na receita?",
    answer: "A prática recomendada para autônomos e pequenos negócios é adicionar uma margem de segurança de 10% a 20% sobre o custo total dos ingredientes para cobrir despesas indiretas de fabricação, limpeza e depreciação dos equipamentos."
  },
  {
    question: "Como funciona a fórmula de Markup Divisor para garantir a margem de lucro?",
    answer: "Para garantir uma margem de lucro real sobre o faturamento total (e não apenas sobre o custo), divide-se o custo total por (1 - Margem/100). Por exemplo, para ter 30% de lucro líquido, divide-se o custo por 0,70. Nossa calculadora aplica essa fórmula automaticamente."
  },
  {
    question: "As embalagens devem ser cobradas do cliente?",
    answer: "Sim. Caixas, fitas, etiquetas, sacolas e potes plásticos são custos diretos vinculados à venda e devem ser somados ao custo total unitário de cada produto comercializado."
  }
];

const relatedTools = [
  {
    title: "Conversor CLT x PJ",
    url: "/financeiro/conversor-clt-pj",
    description: "Compare rendimentos e impostos entre pessoa física e empresa."
  },
  {
    title: "Calculadora de Juros Compostos",
    url: "/financeiro/juros-compostos",
    description: "Simule o crescimento dos lucros e investimentos da sua empresa."
  },
  {
    title: "Calculadora de Desconto",
    url: "/utilidades/calculadora-desconto",
    description: "Simule descontos promocionais para vendas no atacado e kits."
  }
];

export default function PrecificacaoPage() {
  return (
    <ToolPageLayout
      title={`Calculadora de Precificação de Receitas (${year})`}
      description="Saiba exatamente quanto custa cada ingrediente usado e descubra o preço ideal de venda para garantir seu lucro sem achismos."
      ariaLabel="Calculadora de precificação de receitas interativa"
      path="/financeiro/precificacao-receitas"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <PrecificacaoClient />
    </ToolPageLayout>
  );
}
