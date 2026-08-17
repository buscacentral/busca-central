import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central de Documentos | Geradores, Validadores e Consultas',
  description: 'Ferramentas gratuitas para documentos: gerador e validador de CPF e CNPJ, consulta de empresas na Receita Federal e emissão de recibos.',
  alternates: { canonical: '/documentos' },
  openGraph: {
    title: 'Central de Documentos | BuscaCentral',
    description: 'Ferramentas gratuitas para documentos: gerador e validador de CPF e CNPJ, consulta de empresas na Receita Federal e emissão de recibos.',
    url: 'https://buscacentral.com.br/documentos',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
};

const tools = [
  { title: 'Gerador de CPF', description: 'Gere números de CPF válidos para testes de software.', href: '/documentos/gerador-cpf', icon: '👤', color: 'bg-blue-50 border-blue-200' },
  { title: 'Validador de CPF', description: 'Verifique se um CPF é válido e veja seu estado de origem.', href: '/documentos/validador-cpf', icon: '✅', color: 'bg-green-50 border-green-200' },
  { title: 'Gerador de CNPJ', description: 'Gere números de CNPJ válidos para testes.', href: '/documentos/gerador-cnpj', icon: '🏢', color: 'bg-purple-50 border-purple-200' },
  { title: 'Validador de CNPJ', description: 'Valide a autenticidade de um CNPJ rapidamente.', href: '/documentos/validador-cnpj', icon: '✔️', color: 'bg-orange-50 border-orange-200' },
  { title: 'Consulta de CNPJ', description: 'Busque todos os dados públicos de uma empresa pelo CNPJ.', href: '/documentos/consulta-cnpj', icon: '🔍', color: 'bg-blue-50 border-blue-200' },
  { title: 'Gerador de Recibos', description: 'Emita recibos de pagamento profissionais e prontos para impressão.', href: '/documentos/gerador-recibos', icon: '🧾', color: 'bg-emerald-50 border-emerald-200' },
  { title: 'Gerador de Cartão de Crédito', description: 'Gere números de cartão válidos para testes de sistemas.', href: '/documentos/gerador-cartao-credito', icon: '💳', color: 'bg-rose-50 border-rose-200' },
  { title: 'Consulta de Processos', description: 'Descubra se há processos judiciais públicos associados ao seu nome (Seguro LGPD).', href: '/documentos/consulta-processos', icon: '⚖️', color: 'bg-blue-50 border-blue-200' },
];

const sugestoes = [
  { title: 'Busca de CEP', href: '/localizacao/busca-cep', icon: '📍' },
  { title: 'Cotação de Moedas', href: '/financeiro/cotacao', icon: '💱' },
  { title: 'Gerador de QR Code', href: '/utilidades/gerador-qr-code', icon: '📱' },
];

const faqItems = [
  {
    question: 'As ferramentas de documentos são gratuitas?',
    answer: 'Sim. Todas as ferramentas da Central de Documentos do BuscaCentral são 100% gratuitas, acessíveis diretamente pelo navegador e sem necessidade de cadastro ou pagamento de mensalidades.'
  },
  {
    question: 'Os dados que insiro no CPF/CNPJ ficam salvos?',
    answer: 'Não. A validação e a formatação de documentos ocorrem localmente no seu dispositivo através de scripts seguros no navegador. O BuscaCentral não armazena nem compartilha informações pessoais digitadas.'
  },
  {
    question: 'O gerador de CPF cria documentos reais?',
    answer: 'Não. O gerador produz números fictícios que atendem rigorosamente ao algoritmo matemático oficial de dígitos verificadores da Receita Federal, destinados exclusivamente para testes de software e desenvolvimento de sistemas.'
  },
  {
    question: 'O recibo gerado tem validade jurídica?',
    answer: 'Sim. O recibo de pagamento emitido contém todos os campos e requisitos formais previstos na legislação brasileira. Ao ser impresso e assinado pelo recebedor, tem plena validade como comprovante de quitação.'
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

export default function DocumentosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-4xl font-bold text-slate-900 mb-4">Central de Documentos</h1>
      <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mb-4">
        Ferramentas para geração, validação e consulta de documentos brasileiros.
        Gere CPFs e CNPJs válidos para testes ou consulte dados reais de empresas pela Receita Federal.
      </p>
      <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed mb-10">
        Todos os CPFs e CNPJs gerados são fictícios e destinados exclusivamente a testes e desenvolvimento em conformidade com a LGPD.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
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
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre as Ferramentas de Documentos</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          A Central de Documentos do BuscaCentral reúne soluções ágeis para desenvolvedores, contadores, advogados, autônomos e gestores de empresas. Nossas ferramentas automatizam rotinas diárias como validação de cadastros em formulários web, testes de software em ambientes de homologação e emissão rápida de recibos de prestação de serviços.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Com foco total na segurança e na privacidade, todos os processos de geração e validação de dados ocorrem de forma transparente no seu próprio navegador, sem registro de informações em banco de dados, em total conformidade com as diretrizes da Lei Geral de Proteção de Dados (LGPD).
        </p>
      </section>

      {/* Bloco de FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas Frequentes sobre Documentos</h2>
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

      <section className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Ferramentas Relacionadas</h2>
        <p className="text-sm md:text-base text-slate-500 mb-4">Outras ferramentas que podem ser úteis</p>
        <div className="flex flex-wrap gap-3">
          {sugestoes.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all text-sm md:text-base font-medium text-slate-700"
            >
              <span>{s.icon}</span>
              {s.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
