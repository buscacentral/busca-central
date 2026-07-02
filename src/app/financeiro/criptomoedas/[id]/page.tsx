import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageLayout from '@/components/ToolPageLayout';
import CryptoDetailClient from './CryptoDetailClient';

export const revalidate = 3600;

const CRYPTO_MAP: Record<string, { name: string; symbol: string; description: string }> = {
  bitcoin: { name: 'Bitcoin', symbol: 'BTC', description: 'Cotação do Bitcoin (BTC) em tempo real em Reais. Veja gráficos, capitalização de mercado, volume 24h e dados históricos.' },
  ethereum: { name: 'Ethereum', symbol: 'ETH', description: 'Cotação do Ethereum (ETH) em tempo real em Reais. Veja gráficos, capitalização de mercado, volume 24h e dados históricos.' },
  tether: { name: 'Tether', symbol: 'USDT', description: 'Cotação do Tether (USDT) em tempo real em Reais. Stablecoin indexada ao dólar americano.' },
  binancecoin: { name: 'BNB', symbol: 'BNB', description: 'Cotação do BNB em tempo real em Reais. Token nativo da Binance Smart Chain.' },
  solana: { name: 'Solana', symbol: 'SOL', description: 'Cotação do Solana (SOL) em tempo real em Reais. Blockchain de alta performance para DeFi e NFTs.' },
  ripple: { name: 'XRP', symbol: 'XRP', description: 'Cotação do XRP em tempo real em Reais. Criptomoeda para pagamentos internacionais rápidos.' },
  'usd-coin': { name: 'USD Coin', symbol: 'USDC', description: 'Cotação do USD Coin (USDC) em tempo real em Reais. Stablecoin regulamentada indexada ao dólar.' },
  dogecoin: { name: 'Dogecoin', symbol: 'DOGE', description: 'Cotação do Dogecoin (DOGE) em tempo real em Reais. A meme coin mais popular do mercado.' },
  cardano: { name: 'Cardano', symbol: 'ADA', description: 'Cotação do Cardano (ADA) em tempo real em Reais. Blockchain focada em sustentabilidade e pesquisa acadêmica.' },
  'staked-ether': { name: 'Lido Staked Ether', symbol: 'STETH', description: 'Cotação do Lido Staked Ether (STETH) em tempo real em Reais. Token derivado do ETH stakado.' },
};

export const TOP_10 = Object.keys(CRYPTO_MAP);

export function generateStaticParams() {
  return TOP_10.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const crypto = CRYPTO_MAP[id];
  if (!crypto) return {};

  const title = `${crypto.name} (${crypto.symbol}) Hoje: Cotação em Tempo Real e Conversor | BuscaCentral`;
  const description = `Acompanhe a cotação do ${crypto.name} (${crypto.symbol}) em tempo real, veja o gráfico de 7 dias, dados de mercado e use o conversor de ${crypto.symbol} para BRL gratuito.`;
  const url = `https://buscacentral.com.br/financeiro/criptomoedas/${id}`;

  return {
    title,
    description,
    keywords: [
      `${crypto.name}`, `${crypto.symbol}`, `cotação ${crypto.name}`, `preço ${crypto.symbol}`,
      `${crypto.name} hoje`, `converter ${crypto.symbol} para real`, `criptomoedas`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'BuscaCentral',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CryptoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const crypto = CRYPTO_MAP[id];
  if (!crypto) notFound();

  const isStablecoin = ['USDT', 'USDC'].includes(crypto.symbol);
  const quickDesc = isStablecoin
    ? '1, 10, 100, 500, 1000 e 5000'
    : '0.001, 0.01, 0.1, 0.5, 1 e 5';

  const faqItems = [
    {
      question: `Como é calculada a cotação do ${crypto.name} (${crypto.symbol}) em tempo real?`,
      answer: `A cotação do ${crypto.name} exibida no BuscaCentral é obtida em tempo real através da API do CoinGecko, que agrega dados de centenas de exchanges globais. O preço é calculado com base na média ponderada do volume de negociação em Reais (BRL), garantindo um valor referência preciso para o mercado brasileiro.`,
    },
    {
      question: `Qual a diferença entre o ${crypto.name} e o Bitcoin?`,
      answer: `O ${crypto.name} (${crypto.symbol}) e o Bitcoin (BTC) são criptomoedas distintas com propósitos e tecnologias diferentes. O Bitcoin foi a primeira criptomoeda e funciona principalmente como reserva de valor digital. O ${crypto.name} pode ter características técnicas, caso de uso e modelo de consenso próprios. Ambos são negociados 24/7 em exchanges globais e podem ser convertidos para Reais (BRL) usando a calculadora do BuscaCentral.`,
    },
    {
      question: `Como funciona a calculadora de conversão de ${crypto.name} do BuscaCentral?`,
      answer: `A calculadora do BuscaCentral utiliza o preço atual do ${crypto.name} em Reais (BRL) para converter instantaneamente entre ${crypto.symbol} e BRL de forma bidirecional. Basta digitar um valor em qualquer um dos dois campos e o outro será calculado automaticamente. A tabela de conversões rápidas exibe valores pré-calculados para referências comuns como ${quickDesc} ${crypto.symbol}.`,
    },
  ];

  return (
    <ToolPageLayout
      title={`${crypto.name} (${crypto.symbol})`}
      description={crypto.description}
      ariaLabel={`Cotação de ${crypto.name} em tempo real`}
      faqItems={faqItems}
    >
      <CryptoDetailClient id={id} name={crypto.name} symbol={crypto.symbol} faqItems={faqItems} />
    </ToolPageLayout>
  );
}
