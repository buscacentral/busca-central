import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central Financeira | Simuladores, Cotações e Cálculos',
  description: 'Ferramentas financeiras gratuitas: cotações em tempo real, criptomoedas, tabela FIPE, salário líquido, rescisão e simuladores de investimento.',
  alternates: { canonical: '/financeiro' },
  openGraph: {
    title: 'Central Financeira | BuscaCentral',
    description: 'Ferramentas financeiras gratuitas: cotações em tempo real, criptomoedas, tabela FIPE, salário líquido, rescisão e simuladores de investimento.',
    url: 'https://buscacentral.com.br/financeiro',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
};

const tools = [
  {
    title: 'Cotação de Moedas',
    description: 'Cotações em tempo real: USD, EUR, GBP, ARS, BTC.',
    href: '/financeiro/cotacao',
    icon: '💱',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Criptomoedas',
    description: 'Top 10 criptomoedas com variação 24h e conversor.',
    href: '/financeiro/criptomoedas',
    icon: '🪙',
    color: 'bg-orange-50 border-orange-200'
  },
  {
    title: 'Tabela FIPE',
    description: 'Consulte preços médios de veículos.',
    href: '/financeiro/tabela-fipe',
    icon: '🚗',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'Simulador de Juros Compostos',
    description: 'Simule investimentos com aportes mensais.',
    href: '/financeiro/juros-compostos',
    icon: '📈',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    title: 'Cálculo de Salário Líquido',
    description: 'Calcule seu salário líquido com os descontos de INSS e IRPF de 2024.',
    href: '/financeiro/salario-liquido',
    icon: '💰',
    color: 'bg-emerald-50 border-emerald-200'
  },
  {
    title: 'Cálculo de Férias',
    description: 'Descubra o valor das suas férias, com opções de venda e abono.',
    href: '/financeiro/ferias',
    icon: '🏖️',
    color: 'bg-sky-50 border-sky-200'
  },
  {
    title: '13º Salário',
    description: 'Calcule o valor exato da 1ª e 2ª parcela do 13º salário.',
    href: '/financeiro/decimo-terceiro',
    icon: '🎁',
    color: 'bg-indigo-50 border-indigo-200'
  },
  {
    title: 'Horas Extras e DSR',
    description: 'Calcule o valor das horas extras a 50% e 100% com reflexo no DSR.',
    href: '/financeiro/horas-extras',
    icon: '⏱️',
    color: 'bg-rose-50 border-rose-200'
  },
  {
    title: 'Conversor CLT para PJ',
    description: 'Descubra quanto cobrar como PJ para equivaler ao salário CLT.',
    href: '/financeiro/conversor-clt-pj',
    icon: '💼',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'Precificação de Receitas',
    description: 'Calcule o custo real e preço de venda ideal com margem de lucro.',
    href: '/financeiro/precificacao-receitas',
    icon: '🧁',
    color: 'bg-amber-50 border-amber-200'
  },
  {
    title: 'Simulador de Financiamento de Carro',
    description: 'Simule parcelas pelos sistemas Price e SAC.',
    href: '/financeiro/financiamento-carro',
    icon: '🚙',
    color: 'bg-red-50 border-red-200'
  },
  {
    title: 'Simulador de Financiamento Imobiliário',
    description: 'Simule o financiamento da casa própria por SAC ou Price.',
    href: '/financeiro/financiamento-imobiliario',
    icon: '🏠',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'Calculadora de Rescisão Trabalhista',
    description: 'Calcule valores de rescisão para todos os tipos de demissão.',
    href: '/financeiro/rescisao-trabalhista',
    icon: '📋',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Simulador de Investimentos',
    description: 'Compare CDB, Tesouro Selic e Poupança.',
    href: '/financeiro/simulador-investimentos',
    icon: '📈',
    color: 'bg-teal-50 border-teal-200'
  },
  {
    title: 'ROI Imobiliário',
    description: 'Calcule o Cap Rate e o ROI anual do seu investimento imobiliário.',
    href: '/financeiro/roi-imobiliario',
    icon: '🏠',
    color: 'bg-amber-50 border-amber-200'
  },
  {
    title: 'Painel B3 (Ações e FIIs)',
    description: 'Acompanhe as cotações em tempo real da bolsa brasileira.',
    href: '/financeiro/painel-b3',
    icon: '📈',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'Indicadores Econômicos',
    description: 'Consulte a Taxa Selic, IPCA, CDI e Poupança atualizados.',
    href: '/financeiro/indicadores-economicos',
    icon: '📊',
    color: 'bg-cyan-50 border-cyan-200'
  },
  {
    title: 'Notícias Financeiras',
    description: 'Últimas notícias do mercado financeiro e de criptomoedas.',
    href: '/financeiro/noticias-financeiras',
    icon: '📰',
    color: 'bg-gray-50 border-gray-200'
  },
];

const faqItems = [
  {
    question: 'As cotações de moedas e criptomoedas são em tempo real?',
    answer: 'Sim. As cotações de moedas estrangeiras (Dólar, Euro, Libra, Peso) e das principais criptomoedas (Bitcoin, Ethereum, Solana) são sincronizadas em tempo real com fontes de câmbio internacionais.'
  },
  {
    question: 'A Tabela FIPE é atualizada com que frequência?',
    answer: 'A Tabela FIPE é atualizada mensalmente pela Fundação Instituto de Pesquisas Econômicas. O BuscaCentral sincroniza os preços médios oficiais de carros, motos e caminhões assim que cada nova tabela é homologada.'
  },
  {
    question: 'O conversor CLT para PJ considera todos os impostos e benefícios?',
    answer: 'Sim. O simulador considera os encargos obrigatórios da CLT (13º salário, férias com 1/3 constitucional, FGTS com multa rescisória e descontos de INSS/IRPF) e compara com os regimes tributários PJ (Simples Nacional e Lucro Presumido).'
  },
  {
    question: 'Os dados do Painel B3 são oficiais?',
    answer: 'Sim. As cotações de ações e fundos imobiliários (FIIs) são integradas aos dados de mercado da B3 (Bolsa de Valores do Brasil), com atualização contínua e delay regulamentar de até 15 minutos em horários de pregão.'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'dateModified': '2026-08-16',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FinanceiroPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-4xl font-bold text-slate-900 mb-4">Central Financeira</h1>
      <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mb-12">
        Ferramentas financeiras gratuitas para acompanhar cotações, simular investimentos, calcular direitos trabalhistas e consultar preços de veículos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group block p-6 rounded-2xl border-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${tool.color}`}
          >
            <div className="text-7xl mb-6 transition-transform duration-300 group-hover:scale-110">{tool.icon}</div>
            <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">{tool.title}</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>

      {/* Bloco Explicativo de Apoio */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre as Ferramentas Financeiras</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          A Central Financeira do BuscaCentral reúne um ecossistema completo de simuladores, calculadoras e painéis de mercado para quem busca clareza e precisão na gestão do dinheiro. Seja para planejar a compra de um imóvel através de tabelas SAC e Price, estimar rendimentos de juros compostos ou acompanhar as taxas Selic, IPCA e CDI divulgadas pelo Banco Central do Brasil, nossas ferramentas eliminam cálculos manuais complexos.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Nossos simuladores trabalhistas e conversores CLT para PJ são projetados de acordo com a legislação e tabelas progressivas vigentes, permitindo que profissionais e empreendedores tomem decisões de carreira e investimentos com total transparência e embasamento técnico.
        </p>
      </section>

      {/* Bloco de FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas Frequentes sobre Finanças</h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 group"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-center justify-between gap-2">
                <span>{item.question}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-3 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
