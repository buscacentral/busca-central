import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import ConsultaCNPJClient from './ConsultaCNPJClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Consulta CNPJ: Dados da Receita Federal (${year})`,
  `Consulte CNPJ e veja razão social, situação, endereço e CNAE direto da Receita Federal. Grátis e sem cadastro.`,
  '/documentos/consulta-cnpj'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Como consultar um CNPJ na BuscaCentral?</h2>
    <p>A <strong>Consulta CNPJ da BuscaCentral</strong> permite acessar os dados cadastrais de qualquer empresa brasileira diretamente da base da Receita Federal. Basta digitar o CNPJ (com ou sem pontuação) para receber informações completas em segundos.</p>

    <h3>Dados retornados pela consulta</h3>
    <ul>
      <li><strong>Razão Social:</strong> Nome oficial da empresa no cadastro da Receita Federal.</li>
      <li><strong>Situação Cadastral:</strong> Indica se a empresa está Ativa, Inapta, Suspensa ou Baixada.</li>
      <li><strong>Endereço:</strong> Logradouro, número, bairro, cidade, estado e CEP da sede.</li>
      <li><strong>CNAE:</strong> Código de Atividade Econômica Principal — descreve a atividade principal da empresa.</li>
      <li><strong>Data de Abertura:</strong> Data em que a empresa foi constituída legalmente.</li>
      <li><strong>Capital Social:</strong> Valor do capital registrado na Junta Comercial.</li>
    </ul>

    <h3>Para que serve a consulta?</h3>
    <ul>
      <li><strong>Due Diligence:</strong> Verificar se uma empresa está ativa antes de fechar um negócio.</li>
      <li><strong>Compras e Fornecedores:</strong> Confirmar o CNPJ de um fornecedor antes de emitir notas.</li>
      <li><strong>Marketing B2B:</strong> Validar listas de empresas para campanhas comerciais.</li>
      <li><strong>Compliance:</strong> Empresas precisam verificar parceiros para atender à LGPD e normas anticorrupção.</li>
    </ul>
  
    <h3>A matemática por trás dos algoritmos de verificação</h3>
    <p>Os algoritmos de verificação de documentos utilizam lógicas matemáticas modulares (como o módulo 11) para confirmar a integridade estrutural das numerações. Em vez de simplesmente contar dígitos, essas funções aplicam pesos específicos a cada posição numérica, realizando multiplicações sucessivas cuja soma resulta em um dígito verificador. Esse processo padronizado garante que erros comuns de digitação sejam detectados imediatamente pela equação, assegurando a validade técnica do dado fornecido antes de qualquer processamento adicional em bancos de dados ou sistemas corporativos.</p>

    <h3>Por que a validação de dígitos verificadores protege transações online</h3>
    <p>A checagem de dígitos verificadores é uma camada primária de segurança vital para aplicações online. Ao bloquear entradas estruturalmente corrompidas ou geradas aleatoriamente no nível do cliente, as plataformas previnem a sobrecarga de servidores com dados inválidos e reduzem a fricção em transações de e-commerce e processos de onboarding. Esta validação proativa não apenas melhora a qualidade da base de dados, mitigando fraudes primárias, como também acelera o tempo de resposta do sistema, proporcionando uma experiência de navegação mais fluida e confiável para todos os usuários.</p>
</article>
);

const faqItems = [
  {
    question: "A consulta funciona para empresas de todo o Brasil?",
    answer: "Sim. A consulta acessa a base de dados da Receita Federal, que cobre todas as empresas registradas no território nacional."
  },
  {
    question: "Por que uma empresa aparece como 'Inapta'?",
    answer: "Uma empresa é classificada como Inapta quando a Receita Federal identifica que ela deixou de apresentar declarações por dois ou mais anos consecutivos, ou apresentou indícios de não possuir atividade econômica."
  },
  {
    question: "Os dados são atualizados em tempo real?",
    answer: "Os dados são extraídos diretamente da Receita Federal e refletem o último cadastro disponível. Podem haver pequenas variações de atualização conforme o calendário da Receita."
  }
];

const relatedTools = [
  {
    title: "Gerador de CNPJ",
    url: "/documentos/gerador-cnpj",
    description: "Gere CNPJs válidos para testes de sistemas."
  },
  {
    title: "Validador de CNPJ",
    url: "/documentos/validador-cnpj",
    description: "Verifique se um CNPJ possui dígitos verificadores válidos."
  },
  {
    title: "Busca de CEP",
    url: "/localizacao/busca-cep",
    description: "Consulte o CEP do endereço de qualquer empresa."
  }
];

export default function ConsultaCNPJ() {
  return (
    <ToolPageLayout
      title="Consulta CNPJ"
      description="Consulte gratuitamente os dados cadastrais de qualquer empresa brasileira diretamente da base da Receita Federal."
      ariaLabel="Consulta de CNPJ interativa"
      path="/documentos/consulta-cnpj"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <ConsultaCNPJClient />
    </ToolPageLayout>
  );
}
