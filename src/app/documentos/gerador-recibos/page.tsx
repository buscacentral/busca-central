import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import GeradorReciboClient from './GeradorReciboClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Gerador de Recibos em PDF Grátis (${year})`,
  'Gere recibos de pagamento simples e profissionais. Preencha os dados, visualize em tempo real e imprima ou salve em PDF sem cadastro.',
  '/documentos/gerador-recibos'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é o Gerador de Recibos?</h2>
    <p>
      O <strong>Gerador de Recibos do BuscaCentral</strong> é uma ferramenta online e 100% gratuita desenvolvida para autônomos, freelancers, prestadores de serviços e pequenas empresas que precisam emitir comprovantes de pagamento válidos de forma rápida, sem a necessidade de blocos de papel ou softwares de faturamento pagos.
    </p>

    <h3>Para que serve um recibo de pagamento?</h3>
    <p>
      O recibo é a declaração formal por escrito de que uma pessoa ou empresa recebeu de outra determinada quantia financeira em dinheiro, transferência bancária ou PIX. Ele tem como funções essenciais:
    </p>
    <ul>
      <li><strong>Comprovação de Quitação:</strong> Serve como prova jurídica irrevogável de que uma obrigação financeira (como aluguel, honorários ou prestação de serviços) foi devidamente liquidada.</li>
      <li><strong>Controle Contábil e Financeiro:</strong> Permite ao pagador e ao recebedor manterem o registro organizado de suas despesas e receitas para fins de gestão e declaração de Imposto de Renda.</li>
      <li><strong>Segurança Jurídica:</strong> Previne cobranças indevidas e garante clareza quanto às partes envolvidas (nome, CPF/CNPJ) e o motivo da transação.</li>
    </ul>

    <h3>Como usar o Gerador de Recibos</h3>
    <ol>
      <li><strong>Preencha os dados do Recebedor:</strong> Digite seu nome completo (ou razão social) e seu número de CPF ou CNPJ.</li>
      <li><strong>Preencha os dados do Pagador:</strong> Informe o nome e documento da pessoa ou empresa que realizou o pagamento.</li>
      <li><strong>Detalhes do Pagamento:</strong> Insira o valor total em Reais e descreva resumidamente o serviço ou produto no campo &quot;Referente a&quot;.</li>
      <li><strong>Local e Data:</strong> Confirme a cidade e a data da emissão do documento.</li>
      <li><strong>Imprimir ou Salvar em PDF:</strong> Clique no botão de impressão. Na tela do navegador, escolha a opção &quot;Salvar como PDF&quot; para arquivar o arquivo digital ou selecione sua impressora física.</li>
    </ol>

    <h3>Privacidade e Segurança dos Dados (LGPD)</h3>
    <p>
      Diferente de outros sistemas na web, o BuscaCentral prioriza a privacidade absoluta das suas informações. Nenhum dado digitado nos recibos é enviado para servidores ou gravado em bancos de dados. Todo o processamento é executado estritamente no seu navegador (client-side), garantindo sigilo total.
    </p>
  </article>
);

const faqItems = [
  {
    question: "O recibo simples gerado online tem validade jurídica?",
    answer: "Sim. O recibo simples devidamente assinado pelo recebedor (com nome, CPF ou CNPJ e discriminação do valor e motivo) é um documento legalmente aceito pelo Código Civil Brasileiro para comprovar a quitação de obrigações financeiras."
  },
  {
    question: "Como salvar o recibo gerado em formato PDF?",
    answer: "Após preencher todos os dados, clique no botão 'Imprimir PDF'. Na janela de impressão do seu navegador ou celular, mude o destino da impressora para 'Salvar como PDF'. Os menus e botões da página serão ocultados automaticamente no documento final."
  },
  {
    question: "Meus dados ou os dados do meu cliente ficam salvos no site?",
    answer: "Não. A ferramenta opera 100% no seu navegador (client-side). O BuscaCentral não armazena nomes, valores, CPFs ou CNPJs preenchidos no formulário."
  },
  {
    question: "Posso emitir recibos para serviços prestados como MEI ou autônomo?",
    answer: "Sim. Prestadores autônomos, profissionais liberais e microempreendedores individuais (MEI) podem emitir recibos de pagamento para comprovar a prestação de serviços a pessoas físicas."
  }
];

const relatedTools = [
  {
    title: "Gerador de CPF",
    url: "/documentos/gerador-cpf",
    description: "Gere números de CPF válidos para testes e desenvolvimento."
  },
  {
    title: "Gerador de CNPJ",
    url: "/documentos/gerador-cnpj",
    description: "Gere CNPJs formatados para validação de sistemas."
  },
  {
    title: "Consulta CNPJ",
    url: "/documentos/consulta-cnpj",
    description: "Consulte a situação cadastral e dados oficiais de empresas."
  }
];

export default function GeradorRecibosPage() {
  return (
    <ToolPageLayout
      title={`Gerador de Recibos em PDF Grátis (${year})`}
      description="Crie recibos de pagamento profissionais em segundos. Preencha os campos abaixo e clique em imprimir para salvar como PDF ou mandar direto para a impressora."
      ariaLabel="Gerador de recibos online interativo"
      path="/documentos/gerador-recibos"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <GeradorReciboClient />
    </ToolPageLayout>
  );
}
