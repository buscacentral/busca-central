import type { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'Página Não Encontrada | BuscaCentral',
  description: 'A página que você procura não foi encontrada ou foi movida. Encontre ferramentas úteis e gratuitas no BuscaCentral.',
  robots: {
    index: false,
    follow: true,
  },
};

const FERRAMENTAS_POPULARES = [
  {
    title: 'Gerador de CPF',
    url: '/documentos/gerador-cpf',
    icon: '📄',
    desc: 'Gere CPFs válidos para testes e desenvolvimento',
  },
  {
    title: 'Busca de CEP',
    url: '/localizacao/busca-cep',
    icon: '📍',
    desc: 'Consulte endereços completos e CEPs do Brasil',
  },
  {
    title: 'Tabela FIPE',
    url: '/financeiro/tabela-fipe',
    icon: '🚗',
    desc: 'Preços médios atualizados de carros, motos e caminhões',
  },
  {
    title: 'Salário Líquido',
    url: '/financeiro/salario-liquido',
    icon: '💰',
    desc: 'Calcule descontos de INSS, IRPF e dependentes',
  },
  {
    title: 'Distância entre Cidades',
    url: '/localizacao/distancia-cidades',
    icon: '🗺️',
    desc: 'Distância em km e estimativa de combustível na rota',
  },
  {
    title: 'Eletropostos Perto de Mim',
    url: '/localizacao/carregador-eletrico/perto-de-mim',
    icon: '⚡',
    desc: 'Localize pontos de recarga para carros elétricos por GPS',
  },
];

export default function NotFound() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
      <div className="mb-10">
        <p className="text-7xl md:text-9xl font-black text-slate-200 mb-2 select-none tracking-tight">404</p>
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
          Página não encontrada
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-6">
          O link que você acessou pode ter sido atualizado ou reorganizado. Use a busca abaixo ou explore nossas ferramentas mais acessadas.
        </p>

        {/* Barra de busca */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar placeholder="O que você está procurando?" />
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm md:text-base transition-colors shadow-sm active:scale-95"
        >
          <span>🏠</span>
          <span>Voltar para a Página Inicial</span>
        </Link>
      </div>

      {/* 6 Ferramentas mais acessadas */}
      <section className="pt-8 border-t border-slate-200 text-left">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 text-center">
          Ferramentas mais populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FERRAMENTAS_POPULARES.map((tool) => (
            <Link
              key={tool.url}
              href={tool.url}
              className="group p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all duration-200 flex items-start gap-3 shadow-sm hover:shadow"
            >
              <span className="text-2xl shrink-0 p-2 bg-white rounded-lg border border-slate-100 shadow-2xs">
                {tool.icon}
              </span>
              <div>
                <p className="text-sm md:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {tool.title} →
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
