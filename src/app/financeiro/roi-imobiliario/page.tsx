import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import ROIImobiliarioClient from './ROIImobiliarioClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora ROI Imobiliário: Cap Rate (${year})`,
  `Calcule Cap Rate e ROI anual do seu imóvel considerando aluguel e valorização. Grátis e atualizada ${year}.`,
  '/financeiro/roi-imobiliario'
);

const seoContent = (
  <section className="prose prose-gray max-w-none">
    <h2>O que é Cap Rate?</h2>
    <p>
      O Cap Rate (Capitalization Rate) é o indicador que mostra o rendimento bruto anual
      de um imóvel com base no aluguel, desconsiderando a valorização. Um Cap Rate acima
      de 6% ao ano é considerado bom no mercado brasileiro.
    </p>
    <h2>O que é ROI Imobiliário?</h2>
    <p>
      O ROI (Return on Investment) considera não apenas o aluguel líquido, mas também a
      valorização patrimonial do imóvel. É o indicador mais completo para avaliar se um
      investimento imobiliário vale a pena comparado a outras aplicações.
    </p>
    <h3>Como usar a calculadora</h3>
    <ol>
      <li><strong>Valor do Imóvel:</strong> Informe o preço de compra do imóvel.</li>
      <li><strong>Valor do Aluguel:</strong> Digite o valor mensal que o imóvel gera de aluguel.</li>
      <li><strong>Taxa de Ocupação:</strong> Informe o percentual de meses que o imóvel fica alugado no ano.</li>
      <li><strong>Valorização Anual:</strong> Estime a valorização percentual do imóvel ao ano.</li>
    </ol>
    <h3>Comparação com renda fixa</h3>
    <p>
      A calculadora compara o ROI imobiliário com a taxa Selic e o CDI para ajudar você a decidir
      se investir em imóveis é mais vantajoso que manter o dinheiro na renda fixa.
    </p>
  </section>
);

const faqItems = [
  {
    question: "O que é um bom Cap Rate no Brasil?",
    answer: "Um Cap Rate acima de 6% ao ano é considerado bom. Abaixo de 4%, o investimento pode não compensar comparado a opções de renda fixa."
  },
  {
    question: "O cálculo considera IPTU e condomínio?",
    answer: "Sim. A calculadora permite descontar despesas como IPTU, condomínio, manutenção e imposto sobre aluguel para calcular o rendimento líquido real."
  },
  {
    question: "Investir em imóveis é melhor que renda fixa?",
    answer: "Depende do Cap Rate e da valorização. Se o Cap Rate + valorização superar a Selic, o imóvel pode ser mais vantajoso. Caso contrário, a renda fixa pode ser melhor."
  }
];

const relatedTools = [
  {
    title: "Cotação de Moedas",
    url: "/financeiro/cotacao",
    description: "Acompanhe o dólar para avaliar investimentos internacionais."
  },
  {
    title: "Juros Compostos",
    url: "/financeiro/juros-compostos",
    description: "Simule como seu dinheiro renderia na renda fixa."
  },
  {
    title: "Simulador de Investimentos",
    url: "/financeiro/simulador-investimentos",
    description: "Compare CDB, Tesouro Direto e Poupança com o imóvel."
  }
];

export default function ROIImobiliario() {
  return (
    <ToolPageLayout
      title="Calculadora de ROI Imobiliário"
      description="Descubra o potencial de lucro do seu imóvel medindo o Cap Rate e o Retorno sobre o Investimento."
      ariaLabel="Calculadora de ROI imobiliário interativa"
      path="/financeiro/roi-imobiliario"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <ROIImobiliarioClient />
    </ToolPageLayout>
  );
}
