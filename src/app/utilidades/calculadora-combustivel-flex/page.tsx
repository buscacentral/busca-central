import type { Metadata } from 'next';
import ToolPageLayout from '@/components/ToolPageLayout';
import CalculadoraCombustivelFlexClient from './CalculadoraCombustivelFlexClient';

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Calculadora Álcool ou Gasolina: Economize no Posto (${year})`,
  description: `Descubra se vale mais a pena abastecer com álcool ou gasolina no seu carro flex. Cálculo instantâneo com a regra dos 70%, 100% gratuito e sem cadastro.`,
  keywords: [
    'álcool ou gasolina',
    'calculadora flex',
    'etanol ou gasolina',
    'regra dos 70 porcento',
    'qual combustivel compensa mais',
    'postil de gasolina calculo',
    'calculadora de combustivel para posto',
    'alcool compensa',
  ],
  alternates: { canonical: 'https://buscacentral.com.br/utilidades/calculadora-combustivel-flex' },
  openGraph: {
    title: `Calculadora Álcool ou Gasolina: Economize no Posto (${year}) | BuscaCentral`,
    description: `Descubra se vale mais a pena abastecer com álcool ou gasolina no seu carro flex. Cálculo instantâneo com a regra dos 70%, 100% gratuito.`,
    url: 'https://buscacentral.com.br/utilidades/calculadora-combustivel-flex',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Calculadora Álcool ou Gasolina: Economize no Posto (${year})`,
    description: `Descubra se vale mais a pena abastecer com álcool ou gasolina no seu carro flex. Cálculo instantâneo com a regra dos 70%.`,
  },
};

const faqItems = [
  {
    question: 'Por que existe a regra dos 70% entre álcool e gasolina?',
    answer: 'O etanol (álcool) possui uma densidade energética menor que a gasolina. Em média, um carro flex consome cerca de 30% a mais de volume de combustível ao rodar com etanol. Por isso, para valer a pena financeiramente, o litro do etanol deve custar até 70% do valor da gasolina.',
  },
  {
    question: 'A regra dos 70% vale para todos os carros flex modernos?',
    answer: 'Nos carros flex modernos com injeção direta de combustível e motores turbo, a eficiência do etanol evoluiu bastante e pode chegar a 73% ou 75% da eficiência da gasolina. Contudo, a regra clássica dos 70% continua sendo a referência mais segura e conservadora para a maioria da frota brasileira.',
  },
  {
    question: 'Misturar álcool e gasolina no mesmo tanque prejudica o motor?',
    answer: 'Não! Os veículos com tecnologia Flexfuel possuem sensores na injeção eletrônica (ou algoritmos na sonda lambda) preparados para identificar a proporção exata da mistura no tanque e ajustar o ponto de ignição e a mistura ar-combustível automaticamente.',
  },
];

const relatedTools = [
  {
    title: 'Cálculo de Combustível para Viagens',
    url: '/utilidades/calculadora-combustivel',
    description: 'Calcule a quantidade necessária de litros e o custo total da sua viagem rodoviária.',
  },
  {
    title: 'Dividir Custo de Viagem (Racha-Combustível)',
    url: '/financeiro/dividir-custo-viagem',
    description: 'Divida o valor gasto no posto entre os amigos de forma rápida via Pix.',
  },
  {
    title: 'Estimador de Pedágios entre Cidades',
    url: '/localizacao/pedagio/sao-paulo-sp/rio-de-janeiro-rj',
    description: 'Estime praças de cobrança e valores de pedágio em viagens de carro.',
  },
];

const seoContent = (
  <article className="prose prose-gray max-w-none space-y-6 text-slate-700">
    <h2>A regra dos 70% explicada: Quando o álcool vale a pena?</h2>
    <p>
      Para entender se compensa abastecer com <strong>álcool (etanol) ou gasolina</strong>, é necessário considerar o poder calorífico de cada combustível. O etanol gera menos energia por litro queimado do que a gasolina pura. Historicamente, a relação de consumo nos motores flex de primeira e segunda geração é de 30% a mais de consumo quando abastecidos com etanol.
    </p>

    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 my-4">
      <p className="font-bold text-slate-900 mb-2">Fórmula Matemática Simples:</p>
      <code className="text-sm font-mono bg-white px-3 py-1.5 rounded border border-slate-300 block text-blue-700 font-bold">
        Preço do Etanol ÷ Preço da Gasolina ≤ 0,70 (70%)
      </code>
      <p className="text-xs text-slate-600 mt-2">
        Se o resultado for menor ou igual a 0,70, abasteça com <strong>Álcool</strong>. Se for maior que 0,70, abasteça com <strong>Gasolina</strong>.
      </p>
    </div>

    <h2>Como o motor flex calcula a eficiência de queima do combustível</h2>
    <p>
      A central de controle do motor (ECU) dos veículos flexíveis utiliza as leituras da sonda lambda localizada no escapamento para analisar a quantidade de oxigênio resultante da combustão. A partir desses dados, o sistema reaprende em poucos minutos de rodagem se o combustível predominante no tanque é etanol, gasolina ou uma mistura de ambos, adaptando o tempo de abertura dos bicos injetores e o avanço da centelha das velas.
    </p>

    <h2>Dicas para economizar combustível no trânsito urbano</h2>
    <p>
      Independentemente da escolha entre álcool ou gasolina, pequenas mudanças no hábito de direção ajudam a estender a autonomia do veículo:
    </p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Mantenha os pneus calibrados:</strong> Pneus murchos aumentam o atrito com o asfalto e elevação no consumo de combustível em até 3%.</li>
      <li><strong>Evite acelerações bruscas:</strong> Arrancadas fortes consomem um grande volume de combustível sem ganho significativo de tempo no trânsito das cidades.</li>
      <li><strong>Atenção ao peso desnecessário:</strong> Retire bagagens pesadas do porta-malas que não serão utilizadas no dia a dia.</li>
      <li><strong>Aproveite a inércia do veículo:</strong> Ao avistar um sinal vermelho à frente, tire o pé do acelerador e deixe o freio motor atuar (cutoff), zerando temporariamente o consumo de combustível.</li>
    </ul>
  </article>
);

export default function CalculadoraCombustivelFlexPage() {
  return (
    <ToolPageLayout
      title="Calculadora Álcool ou Gasolina (Flex)"
      description="Descubra se vale mais a pena abastecer com álcool ou gasolina no seu carro flex com a regra dos 70%."
      path="/utilidades/calculadora-combustivel-flex"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <CalculadoraCombustivelFlexClient />
    </ToolPageLayout>
  );
}
