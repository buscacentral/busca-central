import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central de Documentos',
  description: 'Ferramentas para documentos: gerador e validador de CPF e CNPJ. Consulta CNPJ pela Receita Federal.',
  alternates: { canonical: '/documentos' },
  openGraph: {
    title: 'Central de Documentos | BuscaCentral',
    description: 'Ferramentas para documentos: gerador e validador de CPF e CNPJ. Consulta CNPJ pela Receita Federal.',
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
  { title: 'Gerador de Cartão de Crédito', description: 'Gere números de cartão válidos para testes de sistemas.', href: '/documentos/gerador-cartao-credito', icon: '💳', color: 'bg-rose-50 border-rose-200' },
  { title: 'Consulta de Processos', description: 'Descubra se há processos judiciais públicos associados ao seu nome (Seguro LGPD).', href: '/documentos/consulta-processos', icon: '⚖️', color: 'bg-blue-50 border-blue-200' },
];

const sugestoes = [
  { title: 'Busca de CEP', href: '/localizacao/busca-cep', icon: '📍' },
  { title: 'Cotação de Moedas', href: '/financeiro/cotacao', icon: '💱' },
  { title: 'Gerador de QR Code', href: '/utilidades/gerador-qr-code', icon: '📱' },
];

export default function DocumentosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Central de Documentos</h1>
      <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mb-4">
        Ferramentas para geração e validação de documentos brasileiros.
        Gere CPFs e CNPJs válidos para testes ou consulte dados reais de empresas pela Receita Federal.
      </p>
      <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed mb-10">
        Todos os CPFs e CNPJs gerados são fictícios e destinados exclusivamente a testes e desenvolvimento.
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
