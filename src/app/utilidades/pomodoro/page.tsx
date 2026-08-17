import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import PomodoroClient from './PomodoroClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Cronômetro Pomodoro Online: Foco e Produtividade (${year})`,
  'Aumente sua produtividade usando a técnica Pomodoro online. Cronômetro grátis com ciclos de 25 minutos de foco, pausas curtas e aviso sonoro.',
  '/utilidades/pomodoro'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é o Cronômetro Pomodoro?</h2>
    <p>
      O <strong>Cronômetro Pomodoro do BuscaCentral</strong> é uma ferramenta online e gratuita desenvolvida para potencializar a concentração e disciplina nos estudos, trabalho e projetos pessoais. Ela aplica de forma interativa a renomada <strong>Técnica Pomodoro</strong>, criada pelo consultor italiano Francesco Cirillo nos anos 1980, intercalando blocos de atenção focada ininterrupta com momentos estratégicos de descanso.
    </p>

    <h3>Para que serve a Técnica Pomodoro?</h3>
    <p>
      O cérebro humano consome alta energia biológica quando opera em estado de atenção plena e perde eficiência quando forçado a trabalhar horas a fio sem interrupção. A técnica Pomodoro resolve isso através de:
    </p>
    <ul>
      <li><strong>Eliminação da Procrastinação:</strong> Dividir grandes demandas em ciclos menores de apenas 25 minutos reduz a resistência inicial para começar qualquer tarefa.</li>
      <li><strong>Prevenção da Fadiga Mental e Burnout:</strong> As pausas programadas de 5 e 15 minutos permitem ao sistema nervoso consolidar memórias e recuperar a clareza mental.</li>
      <li><strong>Aumento da Precisão e Foco:</strong> Estabelece um compromisso de não atender distrações externas (como notificações e redes sociais) durante o período ativo do cronômetro.</li>
      <li><strong>Consciência de Tempo e Gestão de Tarefas:</strong> Ajuda a mensurar exatamente quantas sessões (Pomodoros) são necessárias para concluir cada atividade da sua rotina.</li>
    </ul>

    <h3>Como usar o Cronômetro Pomodoro</h3>
    <ol>
      <li><strong>Defina sua Meta:</strong> Escolha a tarefa específica que você irá realizar nesta sessão e remova distrações do seu ambiente de trabalho.</li>
      <li><strong>Inicie o Pomodoro (25 min):</strong> Clique no botão de reprodução e trabalhe com foco absoluto até o alarme sonoro tocar.</li>
      <li><strong>Faça a Pausa Curta (5 min):</strong> Ao fim dos 25 minutos, aproveite o intervalo para levantar, esticar o corpo, beber água e relaxar os olhos longe de telas.</li>
      <li><strong>Complete o Ciclo de 4 Pomodoros:</strong> Após realizar 4 sessões consecutivas de foco, o cronômetro libera a <strong>Pausa Longa (15 min)</strong> para uma recarga energética profunda.</li>
    </ol>

    <h3>Dicas Práticas para Maximizar seus Resultados</h3>
    <p>
      Se um pensamento urgente surgir durante um bloco de foco, anote-o rapidamente em um bloco de notas ao lado e volte imediatamente ao trabalho — resolva pendências secundárias apenas durante suas pausas. Lembre-se também de manter uma garrafa de água por perto para associar seus descansos à hidratação regular.
    </p>
  </article>
);

const faqItems = [
  {
    question: "Por que a técnica tem o nome de 'Pomodoro'?",
    answer: "O nome vem da palavra italiana para 'tomate'. O criador do método, Francesco Cirillo, utilizava um cronômetro mecânico de cozinha com formato de tomate para cronometrar seus blocos de estudo universitário."
  },
  {
    question: "O que devo fazer durante o intervalo de 5 minutos?",
    answer: "O ideal é levantar da cadeira, caminhar um pouco, alongar o pescoço e a coluna, beber água e descansar a visão longe de telas de computador e celular para proporcionar real descanso neurológico."
  },
  {
    question: "O cronômetro emite som quando o tempo acaba?",
    answer: "Sim. A ferramenta conta com um alerta sonoro automático para avisar o início e o fim de cada bloco de trabalho ou pausa, permitindo que você se concentre sem precisar olhar o relógio a todo momento."
  },
  {
    question: "Por que o tempo padrão é de 25 minutos de foco?",
    answer: "Pesquisas em neurociência apontam que 25 minutos é o intervalo ideal em que o cérebro atinge pico de concentração sem sobrecarga de cortisol ou cansaço excessivo, garantindo alto rendimento contínuo."
  }
];

const relatedTools = [
  {
    title: "Cronômetro e Timer Online",
    url: "/utilidades/cronometro",
    description: "Temporizador progressivo e regressivo com voltas para controle de tempo."
  },
  {
    title: "Contador de Caracteres e Palavras",
    url: "/utilidades/contador-caracteres",
    description: "Conte caracteres, palavras e tempo de leitura de redações e artigos."
  },
  {
    title: "Consumo de Água Diário",
    url: "/utilidades/consumo-agua",
    description: "Calcule a ingestão hídrica ideal para manter a saúde e a hidratação."
  }
];

export default function PomodoroPage() {
  return (
    <ToolPageLayout
      title={`Cronômetro Pomodoro Online (${year})`}
      description="Derrote a procrastinação e mantenha o foco nos estudos ou no trabalho intercalando períodos de atenção plena com pequenas pausas."
      ariaLabel="Cronômetro pomodoro interativo"
      path="/utilidades/pomodoro"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <PomodoroClient />
    </ToolPageLayout>
  );
}
