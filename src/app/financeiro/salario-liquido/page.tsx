import type { Metadata } from 'next';
import Link from 'next/link';
import ToolPageLayout from '@/components/ToolPageLayout';
import SalarioLiquidoClient from './SalarioLiquidoClient';
import { formatarReaisInteiro } from '@/lib/salario-liquido-faixas';

const salariosPopulares = [1412, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 8000, 10000, 15000];

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Calculadora Salário Líquido ${year}: INSS e IRPF`,
  description: `Calcule seu salário líquido com as tabelas de INSS e IRPF de ${year}. Simule descontos de pensão e dependentes. Grátis.`,
  keywords: ['salário líquido', 'calculadora salário', 'inss', 'irpf', 'descontos salário', 'cálculo trabalhista'],
  alternates: { canonical: 'https://buscacentral.com.br/financeiro/salario-liquido' },
};

const faqItems = [
  { question: "Como é calculado o Salário Líquido?", answer: "O salário líquido é o resultado do Salário Bruto menos os descontos oficiais, como o INSS (Previdência Social) e o IRPF (Imposto de Renda), além de descontos opcionais ou judiciais como pensão alimentícia e vale-transporte." },
  { question: "As tabelas de INSS e IRPF estão atualizadas?", answer: "Sim, a calculadora utiliza as tabelas e alíquotas progressivas oficiais de 2024 estabelecidas pelo governo federal." },
  { question: "O que são dependentes no IRPF?", answer: "São pessoas (como filhos ou cônjuge) que dependem financeiramente do trabalhador. Cada dependente gera uma dedução na base de cálculo do Imposto de Renda, reduzindo o imposto a pagar." },
];

const relatedTools = [
  { title: "Cálculo de Férias", url: "/financeiro/ferias", description: "Calcule quanto você receberá em suas férias, com o abono de 1/3." },
  { title: "Cálculo de 13º Salário", url: "/financeiro/decimo-terceiro", description: "Descubra o valor da primeira e segunda parcela do 13º." },
  { title: "Cálculo CLT x PJ", url: "/financeiro/clt-pj", description: "Compare propostas e descubra qual vale mais a pena." },
];

export default function SalarioLiquidoPage() {
  return (
    <ToolPageLayout
      title="Calculadora de Salário Líquido"
      description="Descubra exatamente quanto vai cair na sua conta. Simule os descontos de INSS, IRPF e dependentes."
      ariaLabel="Calculadora de Salário Líquido interativa"
      path="/financeiro/salario-liquido"
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <SalarioLiquidoClient />

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Salário líquido por valor (consultas rápidas)</h2>
        <p className="text-gray-600 mb-4">Veja o cálculo pronto para os salários mais consultados:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {salariosPopulares.map((v) => (
            <Link
              key={v}
              href={`/financeiro/salario-liquido/${v}`}
              className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-sm"
            >
              <span className="font-medium text-slate-800">{formatarReaisInteiro(v)}</span>
              <span className="text-slate-400">›</span>
            </Link>
          ))}
        </div>
      </section>
    </ToolPageLayout>
  );
}
