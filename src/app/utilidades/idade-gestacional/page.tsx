import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import IdadeGestacionalClient from './IdadeGestacionalClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Calculadora de Idade Gestacional (DUM e DPP) (${year})`,
  'Descubra de quantas semanas e dias você está grávida usando a Data da Última Menstruação (DUM) ou a Data Provável do Parto (DPP). Acompanhe os trimestres.',
  '/utilidades/idade-gestacional'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é a Calculadora de Idade Gestacional?</h2>
    <p>
      A <strong>Calculadora de Idade Gestacional do BuscaCentral</strong> é uma ferramenta obstétrica online e 100% gratuita desenvolvida para ajudar futuras mães, pais e profissionais de saúde a determinarem o tempo exato de gestação em <strong>semanas e dias</strong>. Utilizando as metodologias oficiais da medicina reprodutiva (como a Regra de Naegele), o sistema calcula tanto a partir da Data da Última Menstruação (DUM) quanto pela Data Provável do Parto (DPP) definida no ultrassom.
    </p>

    <h3>Para que serve saber a Idade Gestacional correta?</h3>
    <p>
      O acompanhamento rigoroso da idade gestacional é essencial para a saúde materna e fetal por diversos motivos:
    </p>
    <ul>
      <li><strong>Acompanhamento do Desenvolvimento Fetal:</strong> Permite entender os marcos biológicos de cada fase, como a formação dos órgãos vitais, desenvolvimento dos sentidos e ganho de peso do bebê.</li>
      <li><strong>Janelas Ideais de Exames Pré-Natais:</strong> Exames cruciais possuem épocas específicas para máxima precisão, como a Translucência Nucal e Ultrassom Morfológico de 1º Trimestre (11ª a 14ª semana), Morfológico de 2º Trimestre (20ª a 24ª semana) e o teste de rastreamento de diabetes gestacional (24ª a 28ª semana).</li>
      <li><strong>Planejamento do Parto e Licença-Maternidade:</strong> Ajuda a família a se organizar para a mala da maternidade, compras do enxoval e agendamento dos trâmites trabalhistas e médicos.</li>
    </ul>

    <h3>Como usar a Calculadora de Idade Gestacional</h3>
    <ol>
      <li><strong>Escolha o Método de Cálculo:</strong> Selecione <strong>Data da Última Menstruação (DUM)</strong> ou <strong>Data Provável do Parto (DPP)</strong>.</li>
      <li><strong>Insira a Data:</strong> Escolha a data de início da menstruação ou a data estimada do parto informada pelo seu obstetra/ultrassom.</li>
      <li><strong>Consulte os Resultados:</strong> Veja na hora a quantidade exata de semanas e dias decorridos, a data prevista do nascimento e em qual dos 3 trimestres gestacionais você se encontra.</li>
    </ol>

    <h3>Os Três Trimestres da Gestação</h3>
    <p>
      <strong>1º Trimestre (1ª à 13ª semana):</strong> Período de formação inicial de todos os órgãos e sistemas do feto. É a fase em que os sintomas maternos de enjoo, sono e sensibilidade hormonal costumam ser mais intensos.
    </p>
    <p>
      <strong>2º Trimestre (14ª à 26ª semana):</strong> Marcado pelo crescimento acelerado do bebê e pelo início dos primeiros movimentos e chutes percebidos pela mãe. Geralmente é o trimestre de maior disposição física.
    </p>
    <p>
      <strong>3º Trimestre (27ª à 40ª+ semana):</strong> Fase final de maturação pulmonar, ganho acelerado de peso fetal e preparação do corpo para o trabalho de parto.
    </p>

    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mt-6 not-prose">
      <p className="text-sm text-amber-900 leading-relaxed">
        <strong>⚠️ Nota Médica:</strong> Esta calculadora é uma ferramenta de apoio educacional e não substitui consultas e diagnósticos médicos. Realize o acompanhamento pré-natal completo com o seu obstetra.
      </p>
    </div>
  </article>
);

const faqItems = [
  {
    question: "O que é a DUM e como os médicos calculam a gravidez a partir dela?",
    answer: "A DUM é o primeiro dia de sangramento da sua última menstruação. A obstetrícia utiliza a Regra de Naegele (somar 7 dias e adicionar 9 meses) porque a data da ovulação/fecundação é difícil de precisar, enquanto a menstruação é uma referência temporal objetiva."
  },
  {
    question: "O que fazer se a idade gestacional do ultrassom for diferente da DUM?",
    answer: "É muito comum haver diferença de alguns dias. Caso a diferença entre a DUM e o primeiro ultrassom de primeiro trimestre (feito entre a 8ª e 12ª semana) seja superior a 5 a 7 dias, a data estipulada pelo ultrassom precoce prevalece como a mais confiável."
  },
  {
    question: "Quantos meses duram 40 semanas de gravidez?",
    answer: "40 semanas equivalem a 280 dias, o que corresponde aproximadamente a 9 meses solares e 1 semana. A medicina prefere contar a gravidez em semanas porque os meses do calendário possuem quantidades diferentes de dias (28, 30 ou 31)."
  },
  {
    question: "O bebê sempre nasce na Data Provável do Parto (DPP)?",
    answer: "Não. Apenas cerca de 5% dos bebês nascem exatamente na DPP. Considera-se uma gestação a termo qualquer parto ocorrido entre a 37ª e a 42ª semana de gestação."
  }
];

const relatedTools = [
  {
    title: "Calculadora de IMC",
    url: "/utilidades/calculadora-imc",
    description: "Monitore o ganho de peso saudável com o Índice de Massa Corporal."
  },
  {
    title: "Consumo de Água Diário",
    url: "/utilidades/consumo-agua",
    description: "Calcule a hidratação diária ideal para gestantes e lactantes."
  },
  {
    title: "Tabela de Calorias dos Alimentos",
    url: "/utilidades/tabela-calorias",
    description: "Consulte o valor nutricional de alimentos para uma dieta balanceada."
  }
];

export default function IdadeGestacionalPage() {
  return (
    <ToolPageLayout
      title={`Calculadora de Idade Gestacional (${year})`}
      description="Descubra com precisão de quantas semanas e dias você está e acompanhe a evolução da gravidez trimestre a trimestre."
      ariaLabel="Calculadora de idade gestacional interativa"
      path="/utilidades/idade-gestacional"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <IdadeGestacionalClient />
    </ToolPageLayout>
  );
}
