import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central de Localização',
  description: 'Ferramentas de localização: busca de CEP, busca reversa e distância entre cidades brasileiras.',
  alternates: { canonical: '/localizacao' },
  openGraph: {
    title: 'Central de Localização | BuscaCentral',
    description: 'Ferramentas de localização: busca de CEP, busca reversa e distância entre cidades brasileiras.',
    url: 'https://buscacentral.com.br/localizacao',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
};

const tools = [
  { title: 'Busca de CEP', description: 'Consulte endereços completos por CEP ou busque CEPs por nome de rua. Dados do ViaCEP em tempo real.', href: '/localizacao/busca-cep', icon: '📍', color: 'bg-blue-50 border-blue-200' },
  { title: 'Distância entre Cidades', description: 'Calcule a distância entre cidades brasileiras, tempo de viagem e custo de combustível.', href: '/localizacao/distancia-cidades', icon: '🗺️', color: 'bg-green-50 border-green-200' },
  { title: 'Localizador de Eletropostos', description: 'Encontre estações de recarga para carros elétricos (VEs) nas principais cidades do Brasil.', href: '/carregador-eletrico', icon: '⚡', color: 'bg-purple-50 border-purple-200' },
  { title: 'Clima e Previsão do Tempo', description: 'Consulte a temperatura, umidade e condições climáticas atuais de qualquer região do Brasil.', href: '/localizacao/clima', icon: '🌤️', color: 'bg-sky-50 border-sky-200' },
];

const sugestoes = [
  { title: 'Gerador de CPF', href: '/documentos/gerador-cpf', icon: '📄' },
  { title: 'Consulta CNPJ', href: '/documentos/consulta-cnpj', icon: '🔎' },
  { title: 'Cotação de Moedas', href: '/financeiro/cotacao', icon: '💱' },
];

export default function LocalizacaoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Serviços de Localização</h1>
      <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mb-4">
        Ferramentas de localização para consultas de endereço e distâncias.
        Busque CEPs, calcule rotas e estime custos de viagem entre cidades brasileiras.
      </p>
      <p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed mb-10">
        Dados fornecidos pelo ViaCEP e coordenadas oficiais do IBGE.
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
