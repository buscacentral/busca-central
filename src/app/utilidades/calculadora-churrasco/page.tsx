import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import CalculadoraChurrascoClient from './CalculadoraChurrascoClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora de Churrasco: Quantidade Ideal de Carne e Cerveja (${year})`,
  'Descubra a quantidade exata de carne bovina, linguiça, frango, cerveja, refrigerante e carvão para o seu evento. Evite desperdícios e economize.',
  '/utilidades/calculadora-churrasco'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é a Calculadora de Churrasco?</h2>
    <p>
      A <strong>Calculadora de Churrasco do BuscaCentral</strong> é uma ferramenta prática e 100% gratuita que calcula com precisão matemática a lista de compras completa para a sua confraternização. Baseada nos padrões profissionais da cutelaria e churrasco brasileiros, ela estima a quantidade ideal de carnes bovinas, frango, linguiça, pão de alho, bebidas alcoólicas, refrigerantes, água, carvão e gelo de acordo com o perfil e o número de convidados.
    </p>

    <h3>Para que serve calcular a comida do churrasco?</h3>
    <p>
      Organizar um churrasco sem planejamento prévio quase sempre resulta em dois problemas clássicos: gastar dinheiro em excesso comprando comida que sobra e estraga, ou passar pelo constrangimento de ver a carne e a bebida acabarem no meio da celebração. A calculadora resolve isso ao oferecer:
    </p>
    <ul>
      <li><strong>Economia Financeira:</strong> Você compra exatamente o necessário para atender a todos com fartura, evitando desperdício de cortes nobres e insumos caros.</li>
      <li><strong>Lista de Compras Pronta:</strong> Economize tempo no supermercado e no açougue com valores já convertidos em quilos (kg), latas de cerveja e litros de bebida.</li>
      <li><strong>Planejamento Equilibrado:</strong> Diferenciação de consumo médio entre homens adultos, mulheres adultas e crianças, respeitando as variações biológicas de apetite.</li>
    </ul>

    <h3>Como usar a Calculadora de Churrasco</h3>
    <ol>
      <li><strong>Informe os Convidados:</strong> Digite a quantidade de homens, mulheres e crianças que estarão presentes no churrasco.</li>
      <li><strong>Selecione o Tipo de Bebida:</strong> Ative ou desative a opção de bebidas alcoólicas para incluir ou remover o cálculo de cerveja.</li>
      <li><strong>Consulte a Lista de Itens:</strong> O sistema gera instantaneamente a quantidade recomendada de carnes (bovina, linguiça toscana e frango), pão de alho, carvão (1 kg por kg de carne) e sacos de gelo.</li>
      <li><strong>Leve para as Compras:</strong> Utilize as quantidades calculadas diretamente no balcão do açougue ou na lista do mercado.</li>
    </ol>

    <h3>Dicas de Ouro dos Mestres Churrasqueiros</h3>
    <p>
      Para um churrasco de 4 a 6 horas de duração, o consumo médio estimado é de <strong>500g de carne por homem</strong>, <strong>400g por mulher</strong> e <strong>200g por criança</strong>. Recomenda-se dividir o volume de carnes em 60% de carne vermelha (picanha, contrafilé, alcatra ou fraldinha), 25% de linguiça e 15% de cortes de frango (coxa, sobrecoxa ou coração). Além disso, não se esqueça da regra fundamental do fogo: reserve <strong>1 kg de carvão para cada 1 kg de carne</strong> para garantir brasa constante durante todo o evento.
    </p>
  </article>
);

const faqItems = [
  {
    question: "Quantos gramas de carne calcular por pessoa em um churrasco?",
    answer: "A média recomendada para eventos de 4 a 6 horas é de 500g para homens adultos, 400g para mulheres adultas e 200g para crianças. Essa quantidade inclui carnes bovinas, frango e linguiças."
  },
  {
    question: "Quanto de cerveja e refrigerante devo comprar por convidado?",
    answer: "Para quem consome álcool, a média é de 4 a 6 latas (ou long necks) de cerveja por adulto. Para bebidas não alcoólicas (refrigerante, suco e água), calcule de 500ml a 1 litro por pessoa."
  },
  {
    question: "Qual a quantidade certa de carvão e gelo para comprar?",
    answer: "A regra de ouro do carvão é de 1 kg de carvão vegetal de boa qualidade para cada 1 kg de carne total. Para o gelo, considere 1 saco de 5 kg para cada 10 a 12 pessoas para manter caixas térmicas e coolers bem resfriados."
  },
  {
    question: "Como dividir os tipos de corte de carne para não ficar enjoativo?",
    answer: "A proporção clássica sugerida é: 60% de carne bovina (cortes para grelha como picanha, maminha, alcatra ou fraldinha), 25% de linguiça toscana e 15% de frango (coração, coxa ou asinha)."
  }
];

const relatedTools = [
  {
    title: "Dividir Custo de Viagem e Churrasco",
    url: "/financeiro/dividir-custo-viagem",
    description: "Divida as despesas e contas do churrasco entre amigos facilmente."
  },
  {
    title: "Calculadora de Combustível",
    url: "/utilidades/calculadora-combustivel",
    description: "Calcule os gastos de combustível e pedágio para a sua viagem."
  },
  {
    title: "Consumo de Água Diário",
    url: "/utilidades/consumo-agua",
    description: "Calcule a meta ideal de água diária para manter a hidratação."
  }
];

export default function CalculadoraChurrascoPage() {
  return (
    <ToolPageLayout
      title={`Calculadora de Churrasco: Quantidade Ideal (${year})`}
      description="Descubra a quantidade exata de carne, linguiça, frango, cerveja, bebidas e carvão para o seu churrasco com base no número de convidados."
      ariaLabel="Calculadora de churrasco interativa"
      path="/utilidades/calculadora-churrasco"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <CalculadoraChurrascoClient />
    </ToolPageLayout>
  );
}
