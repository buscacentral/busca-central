import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Artigos e Guias | BuscaCentral',
  description: 'Leia nossos artigos e guias práticos sobre documentos, finanças, produtividade e muito mais.',
};

export const artigos = [
  {
    slug: 'sac-ou-price-qual-o-melhor-para-financiar-imovel',
    title: 'SAC ou Price: qual o melhor sistema para financiar seu imóvel?',
    excerpt: 'Entenda a diferença entre os dois sistemas de amortização, veja qual paga menos juros e aprenda a simular o financiamento da casa própria.',
    date: '03 de Julho, 2026',
    category: 'Finanças'
  },
  {
    slug: 'como-escrever-valores-por-extenso',
    title: 'Como escrever valores por extenso em cheques, recibos e contratos',
    excerpt: 'Aprenda as regras do português para escrever valores em reais por extenso sem erros — e entenda por que isso protege você contra fraudes.',
    date: '02 de Julho, 2026',
    category: 'Documentos'
  },
  {
    slug: 'como-calcular-distancia-entre-cidades',
    title: 'Como calcular a distância entre cidades (e o custo da viagem)',
    excerpt: 'Entenda a diferença entre distância em linha reta e rodoviária, estime o tempo de viagem e descubra quanto vai gastar de combustível antes de pegar a estrada.',
    date: '02 de Julho, 2026',
    category: 'Localização'
  },
  {
    slug: 'salario-liquido-por-faixa-quanto-sobra',
    title: 'Salário líquido por faixa: quanto sobra de R$ 2.000 a R$ 10.000',
    excerpt: 'Veja quanto sobra do salário bruto após INSS e IRRF em diferentes faixas e entenda por que o líquido não cresce na mesma proporção que o bruto.',
    date: '02 de Julho, 2026',
    category: 'Trabalhista'
  },
  {
    slug: 'como-saber-se-estou-sendo-processado',
    title: 'Como saber se estou sendo processado? Guia completo e Legal (LGPD)',
    excerpt: 'Descubra como pesquisar se o seu nome está envolvido em processos judiciais de forma totalmente gratuita, segura e de acordo com a LGPD.',
    date: '15 de Junho, 2026',
    category: 'Jurídico'
  },
  {
    slug: 'como-funciona-tabela-fipe',
    title: 'Como funciona a Tabela FIPE na prática?',
    excerpt: 'Descubra como a Fundação Instituto de Pesquisas Econômicas calcula o preço médio dos veículos no Brasil e como usar isso a seu favor na hora da negociação.',
    date: '14 de Junho, 2026',
    category: 'Financeiro'
  },
  {
    slug: 'diferenca-clt-e-pj',
    title: 'CLT vs PJ: Qual vale mais a pena?',
    excerpt: 'Um guia completo e prático sobre os prós e contras de trabalhar com carteira assinada versus abrir a própria empresa e faturar como Pessoa Jurídica.',
    date: '10 de Junho, 2026',
    category: 'Trabalhista'
  },
  {
    slug: 'entenda-o-calculo-de-rescisao-de-contrato',
    title: 'Demissão ou Pedido de Contas: Como calcular a Rescisão Trabalhista',
    date: '18 de Junho, 2026',
    category: 'Trabalhista',
    excerpt: 'Aprenda os conceitos básicos do acerto trabalhista na CLT. Saiba o que muda nos seus direitos quando você é demitido sem justa causa ou decide pedir demissão.',
  },
  {
    slug: 'como-funciona-um-extrator-de-emails',
    title: 'Extrator de E-mails: O que é, como funciona e cuidados',
    date: '19 de Junho, 2026',
    category: 'Marketing',
    excerpt: 'Aprenda como funcionam os extratores de e-mail a partir de blocos de texto e as práticas éticas para montar listas de contato.',
  },
  {
    slug: 'simulando-investimentos-tesouro-direto-vs-cdb',
    title: 'Simulando Investimentos: Tesouro Direto vs. CDB',
    date: '19 de Junho, 2026',
    category: 'Finanças',
    excerpt: 'Entenda as diferenças entre as duas principais portas de entrada para os investimentos de Renda Fixa no Brasil e aprenda a simular a rentabilidade.',
  },
  {
    slug: 'qr-code-tudo-que-voce-precisa-saber',
    title: 'QR Code: A tecnologia de matriz que dominou o mundo',
    date: '20 de Junho, 2026',
    category: 'Tecnologia',
    excerpt: 'Entenda como o Quick Response (QR) funciona, por que ele superou o código de barras tradicional e as melhores formas de gerá-lo.',
  },
  {
    slug: 'dolar-hoje-por-que-a-cotacao-oscila-tanto',
    title: 'Dólar Hoje: Entenda por que a Cotação da Moeda oscila todos os dias',
    date: '20 de Junho, 2026',
    category: 'Economia',
    excerpt: 'Aprenda os motivos econômicos e políticos que fazem as moedas globais flutuarem e como acompanhar a cotação em tempo real.',
  },
  {
    slug: 'calculadora-de-imc-e-peso-ideal',
    title: 'IMC e Saúde: Como calcular e entender seu peso ideal',
    date: '17 de Junho, 2026',
    category: 'Saúde',
    excerpt: 'Entenda como funciona o Índice de Massa Corporal (IMC), suas limitações para atletas e como usá-lo como um guia inicial para a sua saúde.',
  },
  {
    slug: 'o-que-e-base64-e-como-funciona',
    title: 'O que é Base64 e por que ele é onipresente na web?',
    date: '17 de Junho, 2026',
    category: 'Desenvolvimento',
    excerpt: 'Descubra como a codificação Base64 transforma imagens, arquivos e dados binários em texto simples para transitarem de forma segura pela internet.',
  },
  {
    slug: 'como-funciona-api-de-cep-correios',
    title: 'Como funciona a estrutura e a busca de um CEP no Brasil?',
    date: '18 de Junho, 2026',
    category: 'Tecnologia',
    excerpt: 'Entenda a lógica por trás dos 8 dígitos do Código de Endereçamento Postal brasileiro e como sistemas integram essas buscas na hora do frete.',
  },
  {
    slug: 'por-que-empresas-precisam-gerar-cpf-para-testes',
    title: 'Por que empresas precisam gerar CPF para testes?',
    excerpt: 'Descubra por que o uso de CPFs reais em ambientes de teste é um risco de segurança e como os geradores ajudam empresas a validarem seus sistemas de forma ética.',
    date: '15 de Junho, 2026',
    category: 'Desenvolvimento'
  },
  {
    slug: 'juros-compostos-o-segredo-dos-investimentos',
    title: 'Juros Compostos: O segredo para multiplicar seu patrimônio',
    excerpt: 'Entenda como a mágica dos juros sobre juros funciona e como o tempo é o seu maior aliado na construção de riqueza a longo prazo.',
    date: '16 de Junho, 2026',
    category: 'Financeiro'
  },
  {
    slug: 'tamanho-ideal-textos-seo-redes-sociais',
    title: 'SEO e Textos: O tamanho ideal para cada rede social',
    excerpt: 'Saber a quantidade exata de caracteres para o Twitter, Instagram, SEO (Meta Titles) e anúncios faz toda a diferença no seu engajamento.',
    date: '16 de Junho, 2026',
    category: 'Marketing'
  }
,
  {
    slug: 'salario-bruto-vs-liquido-irrf-inss',
    title: 'Salário Bruto vs. Líquido: Onde vai parar o seu dinheiro (INSS e IRRF)?',
    date: '21 de Junho, 2026',
    category: 'Trabalhista',
    excerpt: 'Entenda os descontos obrigatórios na folha de pagamento e aprenda a calcular o seu salário líquido real.',
  },
  {
    slug: 'guia-do-decimo-terceiro-salario',
    title: 'Guia do 13º Salário: Quem tem direito e como é feito o cálculo',
    date: '21 de Junho, 2026',
    category: 'Trabalhista',
    excerpt: 'Tudo o que você precisa saber sobre a gratificação natalina, os prazos de pagamento e os descontos da segunda parcela.',
  },
  {
    slug: 'calculo-de-ferias-e-terco-constitucional',
    title: 'Cálculo de Férias e Terço Constitucional: O que você precisa saber',
    date: '22 de Junho, 2026',
    category: 'Trabalhista',
    excerpt: 'Aprenda como funciona o cálculo do seu pagamento de férias, incluindo o adicional de um terço e os descontos legais.',
  },
  {
    slug: 'bitcoin-ethereum-volatilidade-mercado',
    title: 'Bitcoin e Ethereum: Como acompanhar a cotação e entender a volatilidade',
    date: '22 de Junho, 2026',
    category: 'Economia',
    excerpt: 'Desvende o mercado de criptoativos, entenda as diferenças entre as principais moedas e como a oferta e demanda ditam os preços.',
  },
  {
    slug: 'financiamento-veiculos-tabela-price',
    title: 'A ilusão das parcelas: Entenda a tabela Price no financiamento de veículos',
    date: '23 de Junho, 2026',
    category: 'Finanças',
    excerpt: 'Entenda como os bancos calculam as prestações do seu carro novo e quanto você realmente está pagando de juros.',
  },
  {
    slug: 'como-criar-uma-senha-forte',
    title: 'Ataques de Força Bruta: Como criar uma senha impossível de ser hackeada',
    date: '23 de Junho, 2026',
    category: 'Segurança',
    excerpt: 'Aprenda os conceitos de criptografia básica e o que realmente torna uma senha impenetrável contra robôs invasores.',
  },
  {
    slug: 'como-consultar-situacao-cnpj',
    title: 'Como consultar a situação de um CNPJ e evitar fraudes na internet',
    date: '24 de Junho, 2026',
    category: 'Segurança',
    excerpt: 'Saiba interpretar o comprovante de situação cadastral e como identificar empresas de fachada antes de realizar compras ou contratos.',
  },
  {
    slug: 'gerador-cartao-de-credito-testes',
    title: 'Por que sistemas de teste usam algoritmos (Módulo 10) para gerar cartões virtuais?',
    date: '24 de Junho, 2026',
    category: 'Desenvolvimento',
    excerpt: 'Entenda como funciona o Algoritmo de Luhn e a matemática que valida qualquer cartão de crédito do mundo instantaneamente.',
  },
  {
    slug: 'criar-link-whatsapp-vendas',
    title: 'API do WhatsApp: Como criar links diretos para aumentar as vendas',
    date: '25 de Junho, 2026',
    category: 'Marketing',
    excerpt: 'Aprenda a utilizar a API Click to Chat (wa.me) para encurtar o caminho do seu cliente e automatizar o início da conversa.',
  },
  {
    slug: 'pix-copia-e-cola-br-code',
    title: 'A evolução do PIX: Como o sistema BR Code revolucionou os pagamentos',
    date: '25 de Junho, 2026',
    category: 'Tecnologia',
    excerpt: 'Entenda os bastidores técnicos do Pix e como o sistema EMVCo / BR Code formata os dados de um Pix Copia e Cola.',
  },
  {
    slug: 'rastreio-encomendas-correios',
    title: 'A logística por trás dos Correios: Como funciona o sistema de rastreamento',
    date: '26 de Junho, 2026',
    category: 'Tecnologia',
    excerpt: 'Desvende o significado das siglas dos Correios (PAC, SEDEX) e como os pacotes são bipados ao redor do país.',
  },
  {
    slug: 'etanol-ou-gasolina-regra-dos-70',
    title: 'Etanol ou Gasolina? A regra matemática dos 70% na hora de abastecer',
    date: '26 de Junho, 2026',
    category: 'Finanças',
    excerpt: 'Entenda por que o etanol queima mais rápido e como saber matematicamente qual combustível está valendo mais a pena na bomba.',
  },
  {
    slug: 'como-calcular-quantidade-de-carne-para-churrasco',
    title: 'Como calcular a quantidade exata de carne e bebida para o seu churrasco',
    date: '26 de Junho, 2026',
    category: 'Utilidades',
    excerpt: 'O guia definitivo de gramas por pessoa, bebidas e acompanhamentos para você não errar na festa.',
  },
  {
    slug: 'como-limpar-listas-de-cpf-e-telefones-no-excel',
    title: 'Tratamento de Dados: Como formatar milhares de CPFs e Telefones de uma vez',
    date: '27 de Junho, 2026',
    category: 'Produtividade',
    excerpt: 'Aprenda como ferramentas de automação e limpeza de dados economizam horas de trabalho manual em planilhas.',
  },
  {
    slug: 'como-fazer-regra-de-tres-simples-passo-a-passo',
    title: 'Como fazer Regra de Três Simples (Com exemplos do dia a dia)',
    date: '27 de Junho, 2026',
    category: 'Matemática',
    excerpt: 'Esqueceu como multiplicar cruzado? Entenda a lógica por trás da regra de três e como ela salva vidas em cálculos diários.',
  },
  {
    slug: 'quantos-litros-de-agua-beber-por-dia-calculo',
    title: 'A matemática da hidratação: Como calcular o consumo de água ideal para o seu peso',
    date: '28 de Junho, 2026',
    category: 'Saúde',
    excerpt: 'O mito dos 2 litros: por que a quantidade ideal varia muito e como a Organização Mundial da Saúde faz o cálculo.',
  },
  {
    slug: 'como-precificar-doces-e-salgados-para-vender',
    title: 'Empreendedorismo Gastronômico: Como calcular o preço de custo e venda dos seus doces',
    date: '28 de Junho, 2026',
    category: 'Empreendedorismo',
    excerpt: 'Pare de perder dinheiro na embalagem ou no gás. Entenda o que é Markup e como precificar seu cardápio com lucro real.',
  },
  {
    slug: 'como-fazer-um-recibo-simples-e-com-validade-legal',
    title: 'Recibo Simples: O que não pode faltar no documento para ter validade',
    date: '29 de Junho, 2026',
    category: 'Documentos',
    excerpt: 'Trabalha como autônomo? Veja como gerar recibos de pagamento de forma profissional, gratuita e legal.',
  },
  {
    slug: 'como-calcular-idade-gestacional-dum-dpp',
    title: 'DUM e DPP: Entenda como a medicina calcula as semanas de gravidez',
    date: '29 de Junho, 2026',
    category: 'Saúde',
    excerpt: 'Semanas ou meses? Saiba a diferença entre o cálculo pela menstruação e pelo ultrassom, e acompanhe o crescimento do bebê.',
  },
  {
    slug: 'tecnica-pomodoro-como-parar-de-procrastinar',
    title: 'Técnica Pomodoro: A ciência de focar por 25 minutos para combater a procrastinação',
    date: '30 de Junho, 2026',
    category: 'Produtividade',
    excerpt: 'Descubra por que quebrar seu tempo em blocos curtos é o segredo dos estudantes e profissionais de alta performance.',
  },
  {
    slug: 'como-fazer-sorteio-justo-no-instagram',
    title: 'Sorteio no Instagram e Rifas: Como garantir que o resultado seja 100% justo',
    date: '30 de Junho, 2026',
    category: 'Utilidades',
    excerpt: 'Entenda por que você não deve usar ferramentas obscuras e como os algoritmos de aleatoriedade garantem que não haja fraude nos sorteios.',
  },
  {
    slug: 'a-historia-das-calculadoras-do-amor-na-internet',
    title: 'Dos cadernos para a web: Como funcionam as calculadoras do amor e testes de compatibilidade',
    date: '01 de Julho, 2026',
    category: 'Diversão',
    excerpt: 'Uma viagem pela nostalgia dos testes de nomes da adolescência e como algoritmos modernos transformam palavras em números mágicos.',
  },
  {
    slug: 'potencia-eletropostos-kw-tempo-de-recarga',
    title: 'Potência de Eletropostos (kW): Quanto Tempo Demora para Carregar um Veículo Elétrico?',
    date: '12 de Agosto, 2026',
    category: 'Veículos Elétricos',
    excerpt: 'Descubra quanto tempo demora para carregar um carro elétrico, entenda a potência dos eletropostos (kW) e veja estimativas para BYD Dolphin, Haval H6 e Volvo EX30.',
  },
  {
    slug: 'eletropostos-minas-gerais-rodovias-onde-carregar',
    title: 'Eletropostos em Minas Gerais e Principais Rodovias: Onde Recarregar com Segurança',
    date: '12 de Agosto, 2026',
    category: 'Veículos Elétricos',
    excerpt: 'Descubra os principais eletropostos em Minas Gerais (MG), no Triângulo Mineiro (Uberaba/Uberlândia) e nas rodovias. Saiba onde carregar no caminho!',
  },
  {
    slug: 'como-carregar-carro-eletrico-conectores-byd-gwm-volvo',
    title: 'Como Carregar Carro Elétrico (BYD, GWM e Volvo): Tipos de Conectores e Onde Encontrar Postos',
    date: '12 de Agosto, 2026',
    category: 'Veículos Elétricos',
    excerpt: 'Neste guia, explicamos os tipos de conectores, as diferenças entre carga lenta e rápida e como usar o GPS para encontrar o eletroposto mais próximo da sua localização atual.',
  }
];

export default function ArtigosPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Artigos e Guias Práticos</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Aprenda a otimizar sua vida financeira, usar nossos geradores corretamente e entender os bastidores da tecnologia.
          </p>
        </header>

        <div className="grid gap-8">
          {artigos.map((artigo) => (
            <article key={artigo.slug} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {artigo.category}
                </span>
                <time className="text-slate-500 text-sm font-medium">{artigo.date}</time>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                <Link href={`/artigos/${artigo.slug}`} className="hover:text-blue-600 transition-colors">
                  {artigo.title}
                </Link>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {artigo.excerpt}
              </p>
              <Link 
                href={`/artigos/${artigo.slug}`} 
                className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
              >
                Ler artigo completo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
