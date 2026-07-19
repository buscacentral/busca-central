import type { Metadata } from 'next';
import ToolPageLayout from '@/components/ToolPageLayout';
import DecimoTerceiroClient from './DecimoTerceiroClient';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Calculadora 13º Salário ${year}: 1ª e 2ª Parcela`,
  description: `Calcule o valor exato da 1ª e 2ª parcela do 13º com descontos de INSS e IRPF. Atualizada ${year}, grátis e sem cadastro.`,
  keywords: ['13º salário', 'décimo terceiro', 'calculadora 13', 'primeira parcela 13', 'segunda parcela 13', 'desconto 13'],
  alternates: { canonical: 'https://buscacentral.com.br/financeiro/decimo-terceiro' },
};

const faqItems = [
  { question: "Como funciona o pagamento das parcelas?", answer: "A 1ª parcela deve ser paga até o dia 30 de novembro, equivalente à metade do salário (ou proporcional), sem descontos. A 2ª parcela deve ser paga até o dia 20 de dezembro, e nela são realizados todos os descontos de INSS e IRPF referentes ao valor total." },
  { question: "O que é o 13º Proporcional?", answer: "Se você não trabalhou os 12 meses do ano na empresa (foi contratado durante o ano), o seu 13º será proporcional aos meses trabalhados. Para ter direito a um mês no cálculo, é preciso ter trabalhado ao menos 15 dias naquele mês." },
  { question: "Por que a 2ª parcela é menor?", answer: "Porque a lei determina que não haja desconto na 1ª parcela. Todos os impostos (INSS e IRPF) calculados sobre o valor total do 13º são descontados de uma só vez na 2ª parcela." },
];

const relatedTools = [
  { title: "Calculadora de Salário Líquido", url: "/financeiro/salario-liquido", description: "Descubra quanto do seu salário realmente vai para a sua conta." },
  { title: "Cálculo de Férias", url: "/financeiro/ferias", description: "Calcule quanto você receberá em suas férias, com o abono de 1/3." },
  { title: "Calculadora de Horas Extras", url: "/financeiro/horas-extras", description: "Calcule o valor de horas extras e DSR." },
];

export default function DecimoTerceiroPage() {
  return (
    <ToolPageLayout
      title="Calculadora de 13º Salário"
      description="Veja o valor exato da sua primeira e segunda parcela do 13º, já com os descontos oficiais de INSS e IRPF aplicados na etapa correta."
      ariaLabel="Calculadora de 13º Salário interativa"
      path="/financeiro/decimo-terceiro"
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <DecimoTerceiroClient />
    </ToolPageLayout>
  );
}
