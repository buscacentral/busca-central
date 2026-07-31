import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central de Utilidades',
  description: 'Ferramentas úteis gratuitas: QR Code, senhas, UUID, textos, imagens e muito mais.',
  alternates: { canonical: '/utilidades' },
  openGraph: {
    title: 'Central de Utilidades | BuscaCentral',
    description: 'Ferramentas úteis gratuitas: QR Code, senhas, UUID, textos, imagens e muito mais.',
    url: 'https://buscacentral.com.br/utilidades',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
};

const subcategorias = [
  {
    nome: 'Calculadoras',
    icon: '🧮',
    ferramentas: [
      { title: 'Calculadora de Porcentagem', description: 'Calcule porcentagem, variação, acréscimo e desconto.', href: '/utilidades/calculadora-porcentagem', icon: '🔢' },
      { title: 'Calculadora de Desconto', description: 'Veja o preço final com desconto e quanto economiza.', href: '/utilidades/calculadora-desconto', icon: '🏷️' },
      { title: 'Calculadora de Regra de Três', description: 'Calcule regras de três diretamente ou inversamente proporcionais com passo a passo.', href: '/utilidades/regra-de-tres', icon: '✖️' },
    ],
  },
  {
    nome: 'Texto e Código',
    icon: '💻',
    ferramentas: [
      { title: 'Formatador de JSON e XML', description: 'Formate, minifique e valide JSON e XML.', href: '/utilidades/formatador-codigo', icon: '📋' },
      { title: 'Formatador em Lote (CPF/CNPJ/Tel)', description: 'Limpe e formate grandes listas de dados instantaneamente.', href: '/utilidades/formatador-dados', icon: '🧹' },
      { title: 'Conversor JSON ↔ CSV', description: 'Converta arquivos JSON em CSV ou CSV em JSON de forma local.', href: '/utilidades/json-csv', icon: '🔄' },
      { title: 'Codificador Base64', description: 'Codifique ou decodifique textos em Base64.', href: '/utilidades/base64', icon: '🔄' },
      { title: 'Contador de Palavras e Caracteres', description: 'Conte caracteres, palavras, linhas e estime tempo de leitura.', href: '/utilidades/contador-caracteres', icon: '🔢' },
      { title: 'Comparador de Textos', description: 'Compare dois textos e veja as diferenças.', href: '/utilidades/comparador-textos', icon: '📝' },
      { title: 'Validador de E-mail', description: 'Verifique a sintaxe e identifique e-mails descartáveis.', href: '/utilidades/validador-email', icon: '✉️' },
      { title: 'Removedor de Duplicatas', description: 'Remova linhas duplicadas e ordene listas.', href: '/utilidades/removedor-duplicatas', icon: '🧹' },
      { title: 'Conversor de Caixa', description: 'Transforme texto em MAIÚSCULO, minúsculo, etc.', href: '/utilidades/conversor-caixa', icon: '🔡' },
      { title: 'Número por Extenso', description: 'Converta números e valores em reais por extenso para cheques e recibos.', href: '/utilidades/numero-por-extenso', icon: '🔤' },
    ],
  },
  {
    nome: 'Geradores',
    icon: '⚡',
    ferramentas: [
      { title: 'Sorteador Online', description: 'Sorteie números ou nomes de forma justa e aleatória.', href: '/utilidades/sorteador', icon: '🎲' },
      { title: 'Calculadora de Combustível', description: 'Saiba quantos litros vai gastar e o custo total da viagem.', href: '/utilidades/calculadora-combustivel', icon: '⛽' },
      { title: 'Gerador de QR Code', description: 'Gere QR Codes a partir de textos ou URLs.', href: '/utilidades/gerador-qr-code', icon: '📱' },
      { title: 'Gerador de Senha', description: 'Gere senhas seguras e aleatórias.', href: '/utilidades/gerador-senha', icon: '🔐' },
      { title: 'Gerador de UUID', description: 'Gere UUIDs v4 aleatórios.', href: '/utilidades/gerador-uuid', icon: '🆔' },
      { title: 'Gerador de Link WhatsApp', description: 'Crie links e QR Codes para WhatsApp.', href: '/utilidades/whatsapp-link', icon: '💬' },
      { title: 'PIX Copia e Cola', description: 'Gere códigos PIX no padrão EMV.', href: '/utilidades/pix-copia-cola', icon: '💳' },
      { title: 'Gerador de Lorem Ipsum', description: 'Gere textos placeholder para design e desenvolvimento.', href: '/utilidades/gerador-lorem-ipsum', icon: '📝' },
    ],
  },
  {
    nome: 'Dia a Dia',
    icon: '☀️',
    ferramentas: [
      { title: 'Calculadora de Churrasco', description: 'Calcule a quantidade exata de carne, bebida e carvão para o seu evento.', href: '/utilidades/calculadora-churrasco', icon: '🍖' },
    ],
  },
  {
    nome: 'Bem-estar',
    icon: '❤️',
    ferramentas: [
      { title: 'Calculadora de IMC', description: 'Calcule seu IMC, classificação OMS e TMB.', href: '/utilidades/calculadora-imc', icon: '⚖️' },
      { title: 'Calculadora de Água Diária', description: 'Descubra quantos litros de água beber por dia baseado no seu peso.', href: '/utilidades/consumo-agua', icon: '💧' },
      { title: 'Tabela de Calorias', description: 'Consulte calorias e nutrientes de 200 alimentos (TACO/IBGE).', href: '/utilidades/tabela-calorias', icon: '🍎' },
    ],
  },
  {
    nome: 'Datas e Tempo',
    icon: '📅',
    ferramentas: [
      { title: 'Cronômetro e Temporizador', description: 'Meça o tempo com precisão ou use o alarme.', href: '/utilidades/cronometro', icon: '⏱️' },
      { title: 'Calculadora de Dias Úteis', description: 'Calcule dias úteis entre duas datas com feriados.', href: '/utilidades/dias-uteis', icon: '📅' },
      { title: 'Conversor de Timestamp', description: 'Converta entre timestamp Unix e data/hora.', href: '/utilidades/timestamp', icon: '⏰' },
    ],
  },
  {
    nome: 'Conversores',
    icon: '🔄',
    ferramentas: [
      { title: 'Conversor de Unidades', description: 'Comprimento, peso, temperatura, área, volume e mais.', href: '/utilidades/conversor-unidades', icon: '📐' },
      { title: 'Conversor de Imagens', description: 'Converta imagens entre WebP, PNG e JPG.', href: '/utilidades/conversor-imagens', icon: '🖼️' },
    ],
  },
  {
    nome: 'Mídia',
    icon: '🎨',
    ferramentas: [
      { title: 'Seletor de Cores', description: 'Esquemas de cores em HEX, RGB e HSL.', href: '/utilidades/seletor-cores', icon: '🎨' },
      { title: 'Extrator de Emails', description: 'Extraia emails de qualquer texto ou documento.', href: '/utilidades/extrator-emails', icon: '📧' },
    ],
  },
  {
    nome: 'Logística',
    icon: '📦',
    ferramentas: [
      { title: 'Rastreador de Encomendas', description: 'Rastreie encomendas dos Correios em tempo real via BrasilAPI.', href: '/utilidades/rastreio', icon: '📦' },
    ],
  },
  {
    nome: 'Viagens',
    icon: '✈️',
    ferramentas: [
      { title: 'Planejador de Férias', description: 'Planeje sua viagem com orçamento completo: passagem, hospedagem, alimentação e atividades.', href: '/utilidades/planejador-viagem', icon: '✈️' },
    ],
  },
];

export default function UtilidadesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Utilidades</h1>
      <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mb-12">
        Ferramentas úteis para o dia a dia organizadas por categoria.
        Gere senhas, QR Codes, converta textos e muito mais — tudo gratuito e sem cadastro.
      </p>

      {subcategorias.map((sub) => (
        <section key={sub.nome} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{sub.icon}</span>
            <h2 className="text-3xl font-bold text-slate-900">{sub.nome}</h2>
            <span className="text-sm md:text-base text-slate-500 font-medium ml-2">{sub.ferramentas.length} ferramentas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {sub.ferramentas.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-7xl mb-6 transition-transform duration-300 group-hover:scale-110">{tool.icon}</div>
                <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">{tool.title}</h3>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
