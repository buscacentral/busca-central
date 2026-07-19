import type { Metadata } from 'next';
import ToolPageLayout from '@/components/ToolPageLayout';
import FeriasClient from './FeriasClient';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Calculadora de Férias ${year}: Venda e Abono`,
  description: `Calcule suas férias com opção de venda e adiantamento do 13º. Descontos INSS e IRPF de ${year}. Grátis e sem cadastro.`,
  keywords: ['calculadora de férias', 'cálculo de férias', 'abono pecuniário', 'vender férias', '1/3 férias', 'adiantar 13º'],
  alternates: { canonical: 'https://buscacentral.com.br/financeiro/ferias' },
};

const faqItems = [
  { question: "Quando devo receber o pagamento das férias?", answer: "Por lei, o empregador deve pagar as férias (o valor base mais o adicional de 1/3) até 2 (dois) dias antes do início do período de gozo." },
  { question: "O que é o Abono Pecuniário (vender férias)?", answer: "É o direito do trabalhador de 'vender' até 1/3 (10 dias) de suas férias. Ou seja, você descansa 20 dias e trabalha 10, recebendo os 10 dias em dobro (uma vez como férias e outra como salário normal no mês)." },
  { question: "Há desconto de INSS e IRPF sobre a venda de férias?", answer: "Não. O abono pecuniário (venda das férias) tem natureza indenizatória, portanto, não incide INSS nem IRPF sobre esse valor." },
];

const relatedTools = [
  { title: "Calculadora de Salário Líquido", url: "/financeiro/salario-liquido", description: "Descubra quanto do seu salário realmente vai para a sua conta." },
  { title: "Calculadora de Horas Extras", url: "/financeiro/horas-extras", description: "Calcule o valor de horas a 50% ou 100%." },
  { title: "Cálculo de 13º Salário", url: "/financeiro/decimo-terceiro", description: "Descubra o valor da primeira e segunda parcela do 13º." },
];

export default function FeriasPage() {
  return (
    <ToolPageLayout
      title="Calculadora de Férias"
      description="Saiba exatamente quanto vai receber nas suas férias. Simule a venda de dias e o adiantamento do 13º."
      ariaLabel="Calculadora de Férias interativa"
      path="/financeiro/ferias"
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <FeriasClient />
    </ToolPageLayout>
  );
}
