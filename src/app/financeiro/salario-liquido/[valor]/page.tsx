import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { formatarMoeda } from '@/lib/trabalhista';
import {
  calcularSalarioLiquido,
  isValidSalario,
  getSalarioParams,
  getSalariosVizinhos,
  formatarReaisInteiro,
} from '@/lib/salario-liquido-faixas';

// Pré-renderiza no build apenas as faixas mais comuns; outros valores são
// gerados sob demanda (ISR) e ficam em cache.
export const dynamicParams = true;

interface Props {
  params: Promise<{ valor: string }>;
}

export function generateStaticParams() {
  return getSalarioParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { valor } = await params;
  const bruto = parseInt(valor, 10);
  if (!isValidSalario(bruto)) return { title: 'Salário Líquido' };

  const r = calcularSalarioLiquido(bruto);
  const brutoFmt = formatarReaisInteiro(bruto);
  const liquidoFmt = formatarMoeda(r.liquido);

  const title = `Salário Líquido de ${brutoFmt}: quanto recebe?`;
  const description = `Quem ganha ${brutoFmt} de salário bruto recebe ${liquidoFmt} líquido por mês (sem dependentes), com desconto de ${formatarMoeda(r.inss)} de INSS e ${formatarMoeda(r.irpf)} de IRPF. Veja o cálculo completo.`;
  const canonical = `https://buscacentral.com.br/financeiro/salario-liquido/${bruto}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | BuscaCentral`,
      description,
      url: canonical,
      siteName: 'BuscaCentral',
      locale: 'pt_BR',
      type: 'website',
    },
  };
}

export default async function SalarioLiquidoValorPage({ params }: Props) {
  const { valor } = await params;
  const bruto = parseInt(valor, 10);

  if (!isValidSalario(bruto)) notFound();
  // URL canônica = valor inteiro puro (ex.: /3000). Normaliza /03000, /3000,00 etc.
  if (valor !== String(bruto)) {
    redirect(`/financeiro/salario-liquido/${bruto}`);
  }

  const r = calcularSalarioLiquido(bruto);
  const vizinhos = getSalariosVizinhos(bruto);
  const brutoFmt = formatarReaisInteiro(bruto);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'dateModified': '2026-08-16',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Qual o salário líquido de quem ganha ${brutoFmt}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Quem tem salário bruto de ${brutoFmt} recebe ${formatarMoeda(r.liquido)} líquido por mês, considerando os descontos obrigatórios de INSS (${formatarMoeda(r.inss)}) e IRPF (${formatarMoeda(r.irpf)}), sem dependentes ou outros descontos.`,
        },
      },
      {
        '@type': 'Question',
        name: `Quanto desconta de INSS e IRPF em um salário de ${brutoFmt}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `O desconto de INSS é de ${formatarMoeda(r.inss)} e o de IRPF é de ${formatarMoeda(r.irpf)}, totalizando ${formatarMoeda(r.totalDescontos)} (${r.percentualDescontos.toFixed(1)}% do bruto).`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://buscacentral.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Financeiro', item: 'https://buscacentral.com.br/financeiro' },
      { '@type': 'ListItem', position: 3, name: 'Salário Líquido', item: 'https://buscacentral.com.br/financeiro/salario-liquido' },
      { '@type': 'ListItem', position: 4, name: `Salário de ${brutoFmt}`, item: `https://buscacentral.com.br/financeiro/salario-liquido/${bruto}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Trilha de navegação">
        <Link href="/" className="hover:text-blue-600">Início</Link>
        <span className="mx-2">›</span>
        <Link href="/financeiro" className="hover:text-blue-600">Financeiro</Link>
        <span className="mx-2">›</span>
        <Link href="/financeiro/salario-liquido" className="hover:text-blue-600">Salário Líquido</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{brutoFmt}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Salário Líquido de {brutoFmt}
        </h1>
        <p className="text-gray-600 text-lg">
          Quem ganha <strong>{brutoFmt}</strong> de salário bruto recebe{' '}
          <strong>{formatarMoeda(r.liquido)}</strong> líquido por mês (sem dependentes).
        </p>
        <time dateTime="2026-08-16" className="text-xs text-gray-500 block mt-2">Atualizado em: 16 de agosto de 2026</time>
      </header>

      {/* Destaque do líquido */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center mb-6">
        <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Salário Líquido</p>
        <p className="text-4xl sm:text-5xl font-black text-emerald-600">{formatarMoeda(r.liquido)}</p>
        <p className="text-sm text-emerald-700 mt-2">por mês</p>
      </div>

      {/* Detalhamento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase">Salário Bruto</p>
          <p className="text-xl font-bold text-slate-700 mt-1">{formatarMoeda(r.bruto)}</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-red-500 uppercase">INSS</p>
          <p className="text-xl font-bold text-red-700 mt-1">- {formatarMoeda(r.inss)}</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-red-500 uppercase">IRPF</p>
          <p className="text-xl font-bold text-red-700 mt-1">- {formatarMoeda(r.irpf)}</p>
        </div>
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase">% Descontos</p>
          <p className="text-xl font-bold text-slate-700 mt-1">{r.percentualDescontos.toFixed(1)}%</p>
        </div>
      </div>

      {/* CTA ferramenta interativa */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10 text-center">
        <p className="text-blue-900 mb-4">
          Tem <strong>dependentes</strong>, paga <strong>pensão alimentícia</strong> ou tem outros descontos?
          O cálculo acima é o cenário-base. Use a calculadora completa para personalizar.
        </p>
        <Link
          href="/financeiro/salario-liquido"
          className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          🧮 Abrir calculadora completa
        </Link>
      </div>

      {/* Conteúdo SEO */}
      <article className="prose prose-gray max-w-none mb-10">
        <h2>Como chegamos ao líquido de {brutoFmt}</h2>
        <p>
          Para um salário bruto de <strong>{brutoFmt}</strong>, os descontos obrigatórios são calculados em duas etapas,
          usando as tabelas progressivas vigentes (2024) de INSS e Imposto de Renda:
        </p>
        <ol>
          <li>
            <strong>INSS:</strong> aplicado sobre o salário bruto pela tabela progressiva, resulta em{' '}
            <strong>{formatarMoeda(r.inss)}</strong>.
          </li>
          <li>
            <strong>IRPF:</strong> calculado sobre o salário já descontado o INSS ({formatarMoeda(r.bruto - r.inss)}),
            resulta em <strong>{formatarMoeda(r.irpf)}</strong>.
          </li>
          <li>
            <strong>Líquido:</strong> {formatarMoeda(r.bruto)} − {formatarMoeda(r.inss)} − {formatarMoeda(r.irpf)} ={' '}
            <strong>{formatarMoeda(r.liquido)}</strong>.
          </li>
        </ol>
        <p>
          Este cálculo considera o cenário-base, <strong>sem dependentes, pensão alimentícia ou outros descontos</strong>
          {' '}(como vale-transporte ou plano de saúde), que podem reduzir o valor final. Acordos coletivos da categoria
          também podem alterar o resultado.
        </p>
      </article>

      {/* Links internos: faixas vizinhas */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Salário líquido de outros valores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {vizinhos.map((v) => (
            <Link
              key={v}
              href={`/financeiro/salario-liquido/${v}`}
              className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-slate-800">{formatarReaisInteiro(v)}</span>
              <span className="text-slate-400">›</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
