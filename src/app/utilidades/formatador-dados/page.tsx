import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import FormatadorDadosClient from './FormatadorDadosClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Formatador de CPF, CNPJ e Telefone em Lote (${year})`,
  'Cole listas despadronizadas de CPF, CNPJ ou telefone e formate todas de uma vez com pontuação oficial ou apenas números. Grátis e seguro.',
  '/utilidades/formatador-dados'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é o Formatador de Dados em Lote?</h2>
    <p>
      O <strong>Formatador de Dados do BuscaCentral</strong> é uma ferramenta profissional de higienização e padronização cadastral. Desenvolvido para programadores, analistas de BI, contadores e administradores, ele processa listas massivas de CPFs, CNPJs e números de telefone (fixo ou celular), aplicando máscaras padrão ou removendo qualquer caractere especial de forma instantânea.
    </p>

    <h3>Para que serve a padronização e limpeza de dados em lote?</h3>
    <p>
      Trabalhar com relatórios exportados de múltiplos sistemas frequentemente gera inconsistências cadastrais — documentos com pontuação mesclados com números limpos, espaços e caracteres indesejados. O formatador resolve essas dores:
    </p>
    <ul>
      <li><strong>Importação em Bancos de Dados e ERPs:</strong> Garante que arquivos CSV e planilhas estejam no formato exato exigido por sistemas como SAP, Totvs, Salesforce ou bancos SQL (apenas dígitos numéricos ou máscaras oficiais).</li>
      <li><strong>Campanhas de Mensageria e WhatsApp:</strong> Higieniza listas de contatos com DDD e nono dígito, removendo parênteses e traços para integrações com APIs de comunicação.</li>
      <li><strong>Emissão de Documentos Fiscais:</strong> Aplica a formatação oficial do Ministério da Fazenda e Receita Federal em CNPJs (<code>00.000.000/0001-00</code>) e CPFs (<code>000.000.000-00</code>) para relatórios gerenciais e contratos.</li>
      <li><strong>Economia de Horas no Excel:</strong> Substitui fórmulas complexas de manipulação de texto por um único clique de formatação em massa.</li>
    </ul>

    <h3>Como usar o Formatador de Dados em Lote</h3>
    <ol>
      <li><strong>Cole sua Lista:</strong> Copie os dados despadronizados de sua planilha ou editor de texto e cole na caixa de entrada (um item por linha).</li>
      <li><strong>Escolha o Formato Desejado:</strong> Clique no botão correspondente: <strong>Formatar CPF</strong>, <strong>Formatar CNPJ</strong>, <strong>Formatar Celular</strong> ou <strong>Apenas Números</strong>.</li>
      <li><strong>Copie o Resultado:</strong> Clique no botão de cópia rápida para transferir todos os dados higienizados para a sua área de transferência com layout preservado linha a linha.</li>
    </ol>

    <h3>Segurança Total e Conformidade com a LGPD</h3>
    <p>
      A segurança das suas bases de clientes e fornecedores é prioridade absoluta. Todo o algoritmo de limpeza é executado <strong>100% no seu navegador (client-side)</strong> utilizando JavaScript moderno. Nenhum dado cadastral colado nesta ferramenta transita pela rede ou é gravado em servidores, garantindo conformidade irrestrita com a Lei Geral de Proteção de Dados (LGPD).
    </p>
  </article>
);

const faqItems = [
  {
    question: "A ferramenta suporta quantas linhas de dados por processamento?",
    answer: "Não há limite fixo de linhas imposto pelo servidor. Como a higienização é processada diretamente pelo motor de JavaScript do seu navegador, é possível formatar milhares de linhas em fração de segundos sem lentidão."
  },
  {
    question: "Os dados de clientes que eu colar aqui ficam armazenados no site?",
    answer: "Não. Nenhum dado colado é enviado para servidores externos ou gravado em banco de dados. O processamento é estritamente local no seu próprio dispositivo, garantindo sigilo total."
  },
  {
    question: "O que acontece se uma linha da lista contiver letras ou caracteres inválidos?",
    answer: "O algoritmo filtra e extrai apenas os caracteres numéricos da linha antes de aplicar a máscara. Caso uma linha não possua dígitos, ela é mantida como está para não quebrar a ordem original da sua lista."
  },
  {
    question: "Como remover pontuação para importar números limpos no meu sistema?",
    answer: "Cole a lista completa de CPFs ou CNPJs pontuados e clique no botão 'Apenas Números'. A ferramenta removerá todos os pontos, traços, barras e espaços, deixando apenas os dígitos numéricos prontos para banco de dados."
  }
];

const relatedTools = [
  {
    title: "Validador de CPF",
    url: "/documentos/validador-cpf",
    description: "Valide a matemática dos dígitos verificadores de um CPF."
  },
  {
    title: "Validador de CNPJ",
    url: "/documentos/validador-cnpj",
    description: "Confira a validade matemática de registros empresariais."
  },
  {
    title: "Removedor de Duplicatas",
    url: "/utilidades/removedor-duplicatas",
    description: "Elimine linhas duplicadas e ordene listas de dados rapidamente."
  }
];

export default function FormatadorDadosPage() {
  return (
    <ToolPageLayout
      title={`Formatador de Dados em Lote (${year})`}
      description="Padronize grandes listas de CPFs, CNPJs ou telefones com um clique. Adicione máscaras oficiais ou extraia apenas números."
      ariaLabel="Formatador de dados em lote interativo"
      path="/utilidades/formatador-dados"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <FormatadorDadosClient />
    </ToolPageLayout>
  );
}
