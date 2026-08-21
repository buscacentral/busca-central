import type { Metadata } from 'next';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import MultimodalSearchBox from '@/components/home/MultimodalSearchBox';

export const metadata: Metadata = {
  title: 'BuscaCentral: Como Chegar a Qualquer Lugar do Brasil | Rotas, Pedágios e Ferramentas',
  description: 'Descubra a melhor rota para qualquer destino no Brasil. Calcule distâncias, tempo de viagem de carro e ônibus, custo de combustível e estimativa de pedágios.',
  alternates: {
    canonical: '/',
  },
};

const siteSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BuscaCentral',
    url: 'https://buscacentral.com.br',
    logo: 'https://buscacentral.com.br/logo.png',
    description: 'Central de rotas, distâncias e ferramentas online gratuitas do Brasil.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BuscaCentral',
    url: 'https://buscacentral.com.br',
  },
];

const mainTools = [
  { title: 'Eletropostos Perto de Mim', description: 'Encontre postos de recarga para carros elétricos próximos via GPS em tempo real.', href: '/localizacao/carregador-eletrico/perto-de-mim', icon: '📍', color: 'blue' as const },
  { title: 'Gerador de CPF', description: 'Gere CPFs válidos para testes e desenvolvimento.', href: '/documentos/gerador-cpf', icon: '📄', color: 'blue' as const },
  { title: 'Busca de CEP', description: 'Consulte endereços completos por CEP em tempo real.', href: '/localizacao/busca-cep', icon: '📍', color: 'green' as const },
  { title: 'Localizador de Eletropostos', description: 'Encontre estações de recarga para carros elétricos (VEs).', href: '/localizacao/carregador-eletrico', icon: '⚡', color: 'purple' as const },
  { title: 'Cotação de Moedas', description: 'USD, EUR, GBP, BTC em tempo real pela AwesomeAPI.', href: '/financeiro/cotacao', icon: '💱', color: 'purple' as const },
  { title: 'Tabela FIPE', description: 'Preços médios de veículos novos e usados no Brasil.', href: '/financeiro/tabela-fipe', icon: '🚗', color: 'orange' as const },
  { title: 'Conversor CLT → PJ', description: 'Descubra quanto faturar como PJ para manter seu salário.', href: '/financeiro/conversor-clt-pj', icon: '💰', color: 'blue' as const },
  { title: 'Gerador de QR Code', description: 'Gere QR Codes a partir de textos ou URLs e baixe em PNG.', href: '/utilidades/gerador-qr-code', icon: '📱', color: 'green' as const },
  { title: 'Calculadora de IMC', description: 'Calcule seu IMC, veja classificação OMS e TMB.', href: '/utilidades/calculadora-imc', icon: '⚖️', color: 'purple' as const },
  { title: 'Tabela de Calorias', description: 'Consulte calorias e nutrientes de 200 alimentos (TACO/IBGE).', href: '/utilidades/tabela-calorias', icon: '🍎', color: 'orange' as const },
  { title: 'Calculadora de Churrasco', description: 'Calcule a quantidade exata de carne e bebida para o evento.', href: '/utilidades/calculadora-churrasco', icon: '🍖', color: 'red' as const },
  { title: 'Formatador em Lote', description: 'Limpe e formate CPFs, CNPJs e Telefones instantaneamente.', href: '/utilidades/formatador-dados', icon: '🧹', color: 'green' as const },
  { title: 'Gerador de Recibos', description: 'Gere recibos de pagamento simples e profissionais em PDF.', href: '/documentos/gerador-recibos', icon: '🧾', color: 'blue' as const },
  { title: 'Precificação de Receitas', description: 'Calcule o custo e o preço ideal de venda dos seus produtos.', href: '/financeiro/precificacao-receitas', icon: '🍰', color: 'purple' as const },
  { title: 'Cronômetro Pomodoro', description: 'Aumente sua produtividade com blocos de foco de 25 minutos.', href: '/utilidades/pomodoro', icon: '🍅', color: 'red' as const },
  { title: 'Consulta de Processos', description: 'Descubra se você tem processos judiciais pelo seu nome.', href: '/documentos/consulta-processos', icon: '⚖️', color: 'blue' as const },
  { title: 'Gerador de Senha', description: 'Crie senhas fortes e seguras com um clique.', href: '/utilidades/gerador-senha', icon: '🔑', color: 'purple' as const },
  { title: 'Calculadora de Combustível', description: 'Calcule o custo da viagem e o consumo do seu veículo.', href: '/utilidades/calculadora-combustivel', icon: '⛽', color: 'green' as const },
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <section className="text-center mx-auto mt-8 sm:mt-12 mb-12 max-w-5xl px-4 sm:px-6 md:px-12">
        {/* Badge / Subtítulo Superior dos Modais */}
        <div className="mb-4">
          <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200/90 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full shadow-2xs">
            <span>🚗 DE CARRO</span>
            <span>•</span>
            <span>🚌 ÔNIBUS</span>
            <span>•</span>
            <span>⚡ VEÍCULO ELÉTRICO</span>
            <span>•</span>
            <span>🛣️ CÁLCULO DE PEDÁGIOS EM TEMPO REAL</span>
          </p>
        </div>

        {/* Título de Alto Impacto */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight max-w-3xl mx-auto">
          Descubra como chegar a qualquer lugar do Brasil
        </h1>

        <p className="text-slate-600 mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Calcule distâncias rodoviárias exatas, tempo estimado, custos de combustível e valores de pedágio em todas as estradas brasileiras.
        </p>

        {/* Search Box Ponto a Ponto Multimodal */}
        <MultimodalSearchBox />
      </section>

      {/* Banner de Destaque: Eletropostos Perto de Mim */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-12">
        <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-indigo-950 rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/40">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-full text-xs font-semibold text-sky-300">
              ⚡ Mobilidade Elétrica
            </div>
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Procurando Eletropostos Perto de Você?
            </p>
            <p className="text-slate-300 text-sm md:text-base max-w-xl">
              Encontre estações de recarga para carros elétricos (BYD, GWM, Volvo, BMW, EZVolt) mais próximas da sua localização via GPS em tempo real.
            </p>
          </div>
          <Link
            href="/localizacao/carregador-eletrico/perto-de-mim"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-extrabold rounded-xl shadow-md transition-all hover:scale-105 text-base"
          >
            Eletropostos Perto de Mim 📍
          </Link>
        </div>
      </section>

      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
        Ferramentas Populares
      </h2>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mainTools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>

      <AdPlaceholder position="middle" />

      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl p-6 md:p-10 border border-blue-100 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-2">
            Explore por Categoria
          </h2>
          <p className="text-center text-slate-500 mb-8 text-base">
            Encontre a ferramenta ideal para cada necessidade
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Documentos', href: '/documentos', icon: '📄', count: 8 },
              { name: 'Localização', href: '/localizacao', icon: '📍', count: 3 },
              { name: 'Financeiro', href: '/financeiro', icon: '💱', count: 18 },
              { name: 'Utilidades', href: '/utilidades', icon: '🛠️', count: 38 },
            ].map((cat) => (
              <a
                key={cat.href}
                href={cat.href}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{cat.icon}</span>
                <div>
                  <p className="text-base font-bold text-slate-900 mb-0.5">{cat.name}</p>
                  <p className="text-sm text-slate-500">{cat.count} ferramentas</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Block para AdSense e Google Search */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
        <div className="prose prose-slate max-w-none text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Por que usar o BuscaCentral?</h2>
          <p className="mb-4 leading-relaxed">
            O <strong>BuscaCentral</strong> é uma plataforma online gratuita dedicada a facilitar o seu dia a dia com dezenas de utilitários, calculadoras e geradores de dados. Nós acreditamos que tarefas simples — como calcular o salário líquido, formatar um documento JSON, gerar um CPF para testes de software ou sortear um número — não devem exigir a instalação de aplicativos complexos ou o preenchimento de cadastros invasivos.
          </p>
          
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">100% Gratuito e Sem Cadastro</h3>
          <p className="mb-4 leading-relaxed">
            Todas as nossas {mainTools.length > 0 ? '67' : ''} ferramentas estão disponíveis gratuitamente 24 horas por dia, 7 dias por semana. Não exigimos criação de conta, login com redes sociais ou assinaturas premium. Basta acessar a página da utilidade que você precisa e utilizá-la imediatamente.
          </p>
          
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">Privacidade e Segurança em Primeiro Lugar</h3>
          <p className="mb-4 leading-relaxed">
            A sua privacidade é nossa prioridade máxima. Nossas calculadoras financeiras, geradores de documentos e conversores processam os dados <strong>diretamente no seu navegador (Client-Side)</strong>. Nós não salvamos os textos que você compara, as senhas que você gera ou os valores salariais que você calcula. Todo o processamento é efêmero e desaparece assim que você fecha a aba.
          </p>
          
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">Para Profissionais e Estudantes</h3>
          <p className="leading-relaxed">
            Seja você um desenvolvedor de software precisando de dados fictícios para testes em ambiente de homologação (Sandbox), um profissional de RH validando cálculos de férias e décimo terceiro, ou apenas alguém querendo rastrear uma encomenda, o BuscaCentral foi projetado para ser o seu canivete suíço digital favorito.
          </p>
        </div>
      </section>
    </main>
  );
}
