import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import RegraDeTresClient from './RegraDeTresClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora de Regra de Três Simples e Inversa (${year})`,
  'Calcule regras de três diretamente ou inversamente proporcionais online. Veja o passo a passo completo da conta e encontre o valor de X.',
  '/utilidades/regra-de-tres'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é a Regra de Três?</h2>
    <p>
      A <strong>Regra de Três</strong> é um dos métodos matemáticos mais práticos e fundamentais da aritmética. Ela permite descobrir um quarto valor desconhecido (denominado <strong>incógnita X</strong>) a partir de três grandezas já conhecidas que possuem uma relação de proporcionalidade direta ou inversa entre si.
    </p>

    <h3>Para que serve a Regra de Três no dia a dia?</h3>
    <p>
      Seja na escola, em concursos públicos ou na rotina profissional e doméstica, a regra de três é indispensável para:
    </p>
    <ul>
      <li><strong>Cálculos Financeiros e Comerciais:</strong> Determinar preços proporcionais de produtos por peso ou volume, calcular descontos, juros simples e taxas de câmbio.</li>
      <li><strong>Culinária e Proporção de Receitas:</strong> Adaptar receitas gastronômicas para mais ou menos porções sem alterar o equilíbrio de sabor dos ingredientes.</li>
      <li><strong>Engenharia, Logística e Construção:</strong> Estimar prazos de entrega e dimensionamento de equipes — como quantos dias serão necessários para concluir uma obra com mais ou menos trabalhadores (proporção inversa).</li>
      <li><strong>Estudos e Concursos:</strong> Resolver questões de física, química (estequiometria) e matemática do ENEM e vestibulares com conferência do passo a passo.</li>
    </ul>

    <h3>Como usar a Calculadora de Regra de Três</h3>
    <ol>
      <li><strong>Escolha o Tipo de Proporção:</strong> Selecione <strong>Direta</strong> (se as grandezas aumentam ou diminuem juntas) ou <strong>Inversa</strong> (se o aumento de uma faz a outra diminuir).</li>
      <li><strong>Preencha os Três Valores:</strong> Insira os valores de referência nos campos correspondentes (A está para B, assim como C está para X).</li>
      <li><strong>Veja a Resolução Completa:</strong> A calculadora exibe instantaneamente o resultado exato de X acompanhado da equação armada e da memória de cálculo detalhada.</li>
    </ol>

    <h3>Diferença entre Regra de Três Direta e Inversa</h3>
    <p>
      <strong>Proporção Direta:</strong> Multiplica-se em formato de cruz (&quot;cruzado&quot;). Exemplo: Se 1 kg de café custa R$ 30, 4 kg custarão mais. Fórmula: <code>A × X = B × C &rarr; X = (B × C) / A</code>.
    </p>
    <p>
      <strong>Proporção Inversa:</strong> Multiplica-se em linha reta. Exemplo: Se 2 pedreiros constroem um muro em 6 dias, 4 pedreiros farão em menos tempo. Fórmula: <code>A × B = C × X &rarr; X = (A × B) / C</code>.
    </p>
  </article>
);

const faqItems = [
  {
    question: "Como saber se uma regra de três é direta ou inversa?",
    answer: "Analise a relação entre as grandezas: se aumentar o primeiro valor fizer o segundo também aumentar, a proporção é direta (ex.: mais combustível = mais quilômetros rodados). Se aumentar o primeiro fizer o segundo diminuir, é inversa (ex.: mais velocidade = menos tempo de viagem)."
  },
  {
    question: "Como é feita a conta da regra de três direta passo a passo?",
    answer: "Na proporção direta, realiza-se a multiplicação cruzada: multiplica-se o valor B pelo valor C e, em seguida, divide-se o produto obtido pelo valor A. A fórmula simplificada é X = (B × C) / A."
  },
  {
    question: "Como se calcula a regra de três inversa?",
    answer: "Na proporção inversa, multiplica-se em linha reta: multiplica-se o valor A pelo valor B e divide-se o resultado pelo valor C. A fórmula é X = (A × B) / C."
  },
  {
    question: "A calculadora aceita valores decimais (com vírgula)?",
    answer: "Sim. Você pode inserir números decimais utilizando tanto a vírgula quanto o ponto (ex.: 12,5 ou 12.5), e o sistema calculará o resultado com precisão decimal exata."
  }
];

const relatedTools = [
  {
    title: "Calculadora de Porcentagem",
    url: "/utilidades/calculadora-porcentagem",
    description: "Calcule aumentos, descontos e variações percentuais facilmente."
  },
  {
    title: "Calculadora de Desconto",
    url: "/utilidades/calculadora-desconto",
    description: "Descubra o valor final e a economia real em compras e ofertas."
  },
  {
    title: "Conversor de Unidades",
    url: "/utilidades/conversor-unidades",
    description: "Converta medidas de comprimento, peso, volume e temperatura."
  }
];

export default function RegraDeTresPage() {
  return (
    <ToolPageLayout
      title={`Calculadora de Regra de Três (${year})`}
      description="Descubra o valor de X em problemas de proporção simples e inversa com resolução passo a passo detalhada."
      ariaLabel="Calculadora de regra de três interativa"
      path="/utilidades/regra-de-tres"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <RegraDeTresClient />
    </ToolPageLayout>
  );
}
