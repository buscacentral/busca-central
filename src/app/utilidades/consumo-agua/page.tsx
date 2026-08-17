import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import ConsumoAguaClient from './ConsumoAguaClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora de Consumo de Água Diário (${year})`,
  'Descubra a quantidade exata de água que você deve beber por dia com base no seu peso e nível de atividade física. Saiba quantos litros e copos tomar.',
  '/utilidades/consumo-agua'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é a Calculadora de Consumo de Água?</h2>
    <p>
      A <strong>Calculadora de Consumo de Água do BuscaCentral</strong> é uma ferramenta gratuita de saúde preventiva que calcula com precisão matemática a meta de ingestão hídrica ideal para o seu organismo. Diferente de recomendações genéricas, ela cruza o seu peso corporal atual com o seu nível de esforço físico diário para indicar o volume exato em litros (L), mililitros (ml) e o equivalente em copos de 250 ml.
    </p>

    <h3>Para que serve calcular a ingestão ideal de água?</h3>
    <p>
      A água compõe cerca de 60% do peso corporal de um adulto e participa de praticamente todas as reações bioquímicas do organismo. Manter a ingestão hídrica sob medida proporciona benefícios vitais:
    </p>
    <ul>
      <li><strong>Saúde Renal e Prevenção de Cálculos:</strong> A hidratação contínua dilui sais minerais na urina, prevenindo a formação de pedras nos rins e infecções no trato urinário.</li>
      <li><strong>Foco, Memória e Disposição:</strong> Uma desidratação de apenas 1% a 2% da massa corporal já causa dores de cabeça, fadiga mental, perda de foco e irritabilidade.</li>
      <li><strong>Digestão e Metabolismo:</strong> Facilita a absorção de nutrientes, regula o trânsito intestinal e auxilia na queima calórica e controle do apetite.</li>
      <li><strong>Saúde da Pele e Articulações:</strong> Melhora a elasticidade cutânea e atua na lubrificação das articulações e tecidos conjuntivos.</li>
    </ul>

    <h3>Como usar a Calculadora de Consumo de Água</h3>
    <ol>
      <li><strong>Digite seu Peso:</strong> Insira seu peso atual em quilogramas (ex.: 70 kg).</li>
      <li><strong>Selecione o Nível de Atividade Física:</strong> Escolha entre Sedentário (pouco ou nenhum exercício diário), Moderado (30 a 60 minutos de atividades regulares) ou Intenso (atletas, treinos pesados ou trabalho sob calor intenso).</li>
      <li><strong>Veja a Meta Calculada:</strong> O sistema exibe o total diário em mililitros, litros recomendados e o número de copos de água que você deve distribuir ao longo das suas horas acordado.</li>
    </ol>

    <h3>O Mito dos 2 Litros e Fatores de Ajuste</h3>
    <p>
      A recomendação popular de &quot;beber 2 litros de água ao dia&quot; é uma média simplista. A ciência da nutrição estabelece que o cálculo ideal varia de <strong>35 ml por kg de peso</strong> para pessoas sedentárias até <strong>55 ml por kg</strong> para praticantes de treinos intensos, que perdem eletrólitos e água pelo suor. Dias muito quentes e secos também exigem um acréscimo de 300 ml a 500 ml para compensar a transpiração.
    </p>
  </article>
);

const faqItems = [
  {
    question: "Qual é a fórmula para calcular a quantidade ideal de água por dia?",
    answer: "A fórmula recomendada por nutricionistas utiliza o peso multiplicado pelo fator de atividade: 35 ml/kg para pessoas sedentárias, 45 ml/kg para praticantes de atividade física moderada e 55 ml/kg para atletas em treinos intensos."
  },
  {
    question: "Café, chás e sucos substituem a água mineral?",
    answer: "Embora líquidos em geral contribuam para a ingestão total, bebidas com cafeína (café, energéticos) e com açúcar não devem substituir a água pura mineral. A maior parte (pelo menos 80%) da sua meta diária deve vir de água potável."
  },
  {
    question: "Quais são os sinais mais comuns de desidratação?",
    answer: "Os principais sinais incluem sensação constante de sede, urina escura e concentrada, boca seca, dores de cabeça, cansaço sem motivo aparente, tonturas ao se levantar e pele ressecada."
  },
  {
    question: "Beber água demais em pouco tempo pode fazer mal?",
    answer: "Sim. A ingestão excessiva e repentina de água além da capacidade renal de filtragem (cerca de 800 ml a 1 litro por hora) pode causar hiponatremia (diluição perigosa do sódio sanguíneo). O ideal é fracionar os copos ao longo de todo o dia."
  }
];

const relatedTools = [
  {
    title: "Calculadora de IMC",
    url: "/utilidades/calculadora-imc",
    description: "Calcule seu Índice de Massa Corporal e veja sua faixa ideal de peso."
  },
  {
    title: "Tabela de Calorias dos Alimentos",
    url: "/utilidades/tabela-calorias",
    description: "Consulte calorias, carboidratos e proteínas de centenas de alimentos."
  },
  {
    title: "Cronômetro Pomodoro",
    url: "/utilidades/pomodoro",
    description: "Gerencie blocos de foco e intervalos para lembrar de se hidratar."
  }
];

export default function ConsumoAguaPage() {
  return (
    <ToolPageLayout
      title={`Calculadora de Consumo de Água Diário (${year})`}
      description="Calcule a quantidade ideal de água que você deve beber por dia com base no seu peso e nível de atividade física. Mantenha a hidratação em dia."
      ariaLabel="Calculadora de consumo de água interativa"
      path="/utilidades/consumo-agua"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <ConsumoAguaClient />
    </ToolPageLayout>
  );
}
