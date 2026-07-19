import type { Metadata } from 'next';
import ToolPageLayout from '@/components/ToolPageLayout';
import HorasExtrasClient from './HorasExtrasClient';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Calculadora Horas Extras e DSR Online (${year})`,
  description: `Calcule horas extras a 50% e 100% com reflexo no DSR. Simples, de acordo com a CLT e atualizada ${year}. Grátis.`,
  keywords: ['horas extras', 'calculadora horas extras', 'cálculo hora extra', 'DSR', 'trabalho', 'CLT', '50%', '100%'],
  alternates: { canonical: 'https://buscacentral.com.br/financeiro/horas-extras' },
};

const faqItems = [
  { question: "O que é Hora Extra 50%?", answer: "É a hora extra padrão, paga com acréscimo de 50% sobre o valor da hora normal. Ela ocorre quando você trabalha além da sua jornada em dias úteis ou sábados (quando não é dia de folga)." },
  { question: "O que é Hora Extra 100%?", answer: "É a hora extra paga em dobro. Ela ocorre quando o trabalhador presta serviço em seus dias de repouso remunerado (geralmente domingos) e em feriados." },
  { question: "O que é reflexo no DSR?", answer: "Sempre que você faz horas extras, você tem direito a receber um acréscimo no seu Descanso Semanal Remunerado (DSR). O cálculo é a soma das horas extras dividida pelos dias úteis e multiplicada pelos domingos e feriados do mês." },
];

const relatedTools = [
  { title: "Calculadora de Salário Líquido", url: "/financeiro/salario-liquido", description: "Descubra quanto do seu salário realmente vai para a sua conta." },
  { title: "Cálculo de Férias", url: "/financeiro/ferias", description: "Calcule quanto você receberá em suas férias, com o abono de 1/3." },
  { title: "Cálculo de 13º Salário", url: "/financeiro/decimo-terceiro", description: "Descubra o valor da primeira e segunda parcela do 13º." },
];

export default function HorasExtrasPage() {
  return (
    <ToolPageLayout
      title="Calculadora de Horas Extras"
      description="Descubra quanto você tem a receber pelo trabalho além da jornada. Calcula automaticamente o valor da hora e o DSR."
      ariaLabel="Calculadora de Horas Extras interativa"
      path="/financeiro/horas-extras"
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <HorasExtrasClient />
    </ToolPageLayout>
  );
}
