import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import ConsultaProcessosClient from './ConsultaProcessosClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Consulta de Processos pelo Nome Online Grátis (${year})`,
  'Descubra se há processos no seu nome ou empresa em bases públicas e Diários Oficiais como Jusbrasil, Escavador e Tribunais. Links diretos e gratuitos.',
  '/documentos/consulta-processos'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é a Consulta de Processos pelo Nome?</h2>
    <p>
      A <strong>Consulta de Processos do BuscaCentral</strong> é uma ferramenta online e gratuita desenvolvida para permitir que cidadãos, autônomos, contadores, advogados e gestores empresariais descubram se existem processos judiciais, intimações em Diários Oficiais ou citações públicas vinculadas a um nome completo ou razão social (CNPJ).
    </p>

    <h3>Para que serve a pesquisa pública de processos judiciais?</h3>
    <p>
      Estar ciente de pendências jurídicas com antecedência é fundamental para evitar bloqueios judiciais e garantir segurança jurídica em negócios:
    </p>
    <ul>
      <li><strong>Identificar Ações Judiciais Ativas:</strong> Saiba se há processos cíveis, execuções de dívidas, ações trabalhistas ou litígios tributários em trâmite no seu nome antes de ser surpreendido por intimações.</li>
      <li><strong>Due Diligence e Análise de Risco:</strong> Verifique antecedentes e histórico processual de futuros sócios, inquilinos em contratos de locação, fornecedores e prestadores de serviços.</li>
      <li><strong>Acompanhamento de Ações Pessoais:</strong> Localize o número CNJ de processos em que você é autor para acompanhar as movimentações nos tribunais junto ao seu advogado.</li>
      <li><strong>Rastreamento em Diários de Justiça Eletrônicos (DJe):</strong> Encontre publicações e editais que citam seu nome nos Tribunais de Justiça Estaduais (TJs), Tribunais Regionais do Trabalho (TRTs) e Tribunais Federais (TRFs).</li>
    </ul>

    <h3>Como usar a ferramenta de Consulta de Processos</h3>
    <ol>
      <li><strong>Digite o Nome Completo:</strong> Insira o nome da pessoa física ou a Razão Social da pessoa jurídica (evite abreviações).</li>
      <li><strong>Gere os Links Otimizados:</strong> Clique em <strong>Gerar Links de Consulta</strong> para criar buscas pré-formatadas.</li>
      <li><strong>Acesse as Bases de Dados:</strong> Abra os links diretos para Jusbrasil, Escavador e Google estruturado com filtros booleanos para conferir os resultados públicos.</li>
    </ol>

    <h3>Processos em Segredo de Justiça</h3>
    <p>
      Vale destacar que ações que tramitam sob <strong>Segredo de Justiça</strong> — tais como processos de direito de família (divórcio, partilha de bens, alimentos e guarda de menores) e certas medidas criminais sigilosas — não são expostas em buscadores abertos. Para acessá-las, é necessário certificado digital ou peticionamento com procuração através de um advogado.
    </p>
  </article>
);

const faqItems = [
  {
    question: "A consulta de processos é sigilosa e gratuita?",
    answer: "Sim. A ferramenta do BuscaCentral é 100% gratuita e não armazena os nomes pesquisados nem notifica tribunais ou terceiros sobre a consulta realizada."
  },
  {
    question: "Como descobrir em qual Tribunal ou Vara o processo está tramitando?",
    answer: "O número único do CNJ (formato NNNNNNN-DD.AAAA.J.TR.OOOO) traz essa informação. Os dígitos J.TR indicam o tribunal (por exemplo: 8.26 representa a Justiça Estadual do Tribunal de Justiça de São Paulo - TJSP, enquanto 5.02 indica o Tribunal Regional do Trabalho da 2ª Região - TRT-2)."
  },
  {
    question: "Processos em segredo de justiça aparecem na busca pela internet?",
    answer: "Não. Processos com segredo de justiça garantido por lei são bloqueados para consultas públicas e só podem ser visualizados pelas partes envolvidas e seus advogados constituídos com senha judicial ou certificado digital."
  },
  {
    question: "O que fazer se encontrar um processo no meu nome que desconheço?",
    answer: "Anote o número do processo, a comarca e a vara identificados na publicação e entre em contato imediatamente com um advogado ou com a Defensoria Pública do seu estado para examinar o teor da petição inicial e apresentar defesa tempestiva."
  }
];

const relatedTools = [
  {
    title: "Gerador de Recibos Online",
    url: "/documentos/gerador-recibos",
    description: "Emita recibos de pagamento profissionais e prontos para impressão."
  },
  {
    title: "Consulta CNPJ na Receita",
    url: "/documentos/consulta-cnpj",
    description: "Consulte a situação cadastral de empresas e pessoas jurídicas na Receita Federal."
  },
  {
    title: "Conversor CLT x PJ",
    url: "/financeiro/conversor-clt-pj",
    description: "Compare benefícios e tributação entre regime CLT e contratação PJ."
  }
];

export default function ConsultaProcessosPage() {
  return (
    <ToolPageLayout
      title={`Consulta de Processos pelo Nome (${year})`}
      description="Descubra se você tem processos públicos no seu nome. Gerador inteligente de links de busca para Jusbrasil, Escavador e Diários Oficiais."
      ariaLabel="Consulta de processos judiciais pelo nome"
      path="/documentos/consulta-processos"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <ConsultaProcessosClient />
    </ToolPageLayout>
  );
}
