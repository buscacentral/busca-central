import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Novidades e Atualizações',
  description:
    'Acompanhe o histórico de novidades do BuscaCentral: novas ferramentas, melhorias e correções publicadas a cada atualização.',
  alternates: {
    canonical: 'https://buscacentral.com.br/novidades',
  },
  openGraph: {
    title: 'Novidades e Atualizações | BuscaCentral',
    description:
      'Histórico de novas ferramentas, melhorias e correções do BuscaCentral.',
    url: 'https://buscacentral.com.br/novidades',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
};

type ChangeType = 'novo' | 'melhoria' | 'correção';

interface ChangeItem {
  type: ChangeType;
  text: string;
  href?: string;
}

interface ChangelogEntry {
  date: string; // ISO YYYY-MM-DD
  title: string;
  changes: ChangeItem[];
}

/**
 * Histórico de novidades. Para registrar uma atualização, adicione um novo
 * objeto no topo da lista (ordem do mais recente para o mais antigo).
 */
const changelog: ChangelogEntry[] = [
  {
    date: '2026-08-16',
    title: 'Interlinking inteligente e rotas de viagem',
    changes: [
      { type: 'melhoria', text: 'Títulos e meta descrições otimizados com quilometragem e tempo exato nas páginas de rotas de distância.' },
      { type: 'novo', text: 'Blocos integrados de cálculo de combustível e localizador de eletropostos ao longo de viagens.', href: '/localizacao/distancia-cidades' },
      { type: 'melhoria', text: 'Estimativa de custo médio de combustível em tempo real em todas as páginas de distância rodoviária.' },
      { type: 'correção', text: 'Padronização canônica e redirecionamento 301 definitivo de domínios via middleware.' },
    ],
  },
  {
    date: '2026-06-16',
    title: 'Busca aprimorada e mais transparência',
    changes: [
      { type: 'novo', text: 'Página de resultados de busca dedicada em /buscar.', href: '/buscar' },
      { type: 'melhoria', text: 'Campo de busca disponível no cabeçalho em todas as páginas (desktop e mobile).' },
      { type: 'melhoria', text: 'Ferramentas passam a exibir a data da última atualização com dados estruturados.' },
      { type: 'novo', text: 'Página de novidades para acompanhar a evolução do portal.', href: '/novidades' },
    ],
  },
  {
    date: '2026-05-20',
    title: 'Novas calculadoras financeiras e trabalhistas',
    changes: [
      { type: 'novo', text: 'Lançamento do Conversor CLT x PJ com comparativo completo de impostos e benefícios.', href: '/financeiro/conversor-clt-pj' },
      { type: 'novo', text: 'Calculadora de Salário Líquido atualizada com as tabelas vigentes de INSS e IRPF.', href: '/financeiro/salario-liquido' },
      { type: 'novo', text: 'Simulador de Financiamento Imobiliário com sistemas SAC e Price.', href: '/financeiro/financiamento-imobiliario' },
      { type: 'novo', text: 'Calculadora de ROI Imobiliário para estimativa de cap rate e retorno de aluguel.', href: '/financeiro/roi-imobiliario' },
    ],
  },
  {
    date: '2026-04-10',
    title: 'Expansão das ferramentas de localização e mobilidade',
    changes: [
      { type: 'novo', text: 'Localizador de Eletropostos e Estações de Recarga para Carros Elétricos (VEs).', href: '/localizacao/carregador-eletrico/perto-de-mim' },
      { type: 'novo', text: 'Calculadora de Distância entre Cidades do Brasil baseada nas coordenadas oficiais do IBGE.', href: '/localizacao/distancia-cidades' },
      { type: 'novo', text: 'Estimador de Praças e Custos de Pedágio em rodovias nacionais.', href: '/localizacao' },
    ],
  },
  {
    date: '2026-03-01',
    title: 'Ferramentas para desenvolvedores e documentos',
    changes: [
      { type: 'novo', text: 'Geradores e validadores oficiais de CPF e CNPJ com algoritmo de módulo 11.', href: '/documentos' },
      { type: 'novo', text: 'Gerador de Recibos em PDF pronto para impressão.', href: '/documentos/gerador-recibos' },
      { type: 'novo', text: 'Gerador de QR Code instantâneo com suporte a PIX, links e Wi-Fi.', href: '/utilidades/gerador-qr-code' },
    ],
  },
];

const TYPE_STYLES: Record<ChangeType, string> = {
  novo: 'bg-green-100 text-green-800 border-green-200',
  melhoria: 'bg-blue-100 text-blue-800 border-blue-200',
  correção: 'bg-amber-100 text-amber-800 border-amber-200',
};

function formatDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function NovidadesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Novidades e Atualizações</h1>
        <p className="text-gray-600 text-lg">
          Estamos sempre adicionando ferramentas e melhorando o BuscaCentral. Veja abaixo o histórico
          das atualizações mais recentes.
        </p>
      </header>

      <ol className="relative border-l-2 border-slate-200 ml-3 space-y-10">
        {changelog.map((entry) => (
          <li key={entry.date} className="ml-6">
            <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white" aria-hidden="true" />
            <time dateTime={entry.date} className="block text-sm font-medium text-blue-700 mb-1">
              {formatDate(entry.date)}
            </time>
            <h2 className="text-xl font-bold text-slate-900 mb-4">{entry.title}</h2>
            <ul className="space-y-3">
              {entry.changes.map((change, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${TYPE_STYLES[change.type]}`}>
                    {change.type}
                  </span>
                  <span className="text-slate-700 leading-relaxed">
                    {change.href ? (
                      <Link href={change.href} className="text-blue-700 hover:underline font-medium">
                        {change.text}
                      </Link>
                    ) : (
                      change.text
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-12 pt-8 border-t border-slate-200 text-center">
        <p className="text-slate-600">
          Tem uma sugestão de ferramenta?{' '}
          <Link href="/contato" className="text-blue-700 font-semibold hover:underline">
            Fale com a gente
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
