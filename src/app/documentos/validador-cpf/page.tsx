import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import ValidadorCPFClient from './ValidadorCPFClient';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  ...generateToolMetadata(
    `Validador de CPF Online e Gratuito (${year})`,
    'Valide CPFs com o algoritmo oficial da Receita Federal. Veja o passo a passo do dígito verificador. Rápido e gratuito.',
    '/documentos/validador-cpf'
  ),
  keywords: [
    'validador de cpf',
    'validar cpf',
    'validação de cpf',
    'verificador cpf',
    'dígito verificador cpf',
    'calcular dígito verificador cpf',
    'digito verificador do cpf',
  ],
};

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Como funciona o Validador de CPF?</h2>
    <p>O <strong>Validador de CPF da BuscaCentral</strong> é uma ferramenta matemática simples e rápida para desenvolvedores, profissionais de RH ou qualquer pessoa que precise conferir se uma sequência de 11 números forma um CPF válido segundo as regras da Receita Federal.</p>

    <h2>Como calcular o dígito verificador do CPF (passo a passo)</h2>
    <p>Os dois últimos números de um CPF são os <strong>Dígitos Verificadores (DV)</strong>, calculados a partir dos 9 primeiros dígitos pelo algoritmo <em>módulo 11</em>. Veja como calcular o dígito verificador do CPF usando o exemplo <strong>111.444.777-35</strong>:</p>

    <h3>1º dígito verificador (10ª posição)</h3>
    <p>Multiplique os <strong>9 primeiros dígitos</strong> pelos pesos de 10 a 2:</p>
    <ul>
      <li><strong>Pesos:</strong> 10, 9, 8, 7, 6, 5, 4, 3, 2</li>
      <li><strong>Dígitos:</strong> 1, 1, 1, 4, 4, 4, 7, 7, 7</li>
      <li><strong>Soma dos produtos:</strong> 10 + 9 + 8 + 28 + 24 + 20 + 28 + 21 + 14 = <strong>162</strong></li>
      <li><strong>Resto da divisão por 11:</strong> 162 ÷ 11 deixa resto <strong>8</strong></li>
      <li><strong>Regra:</strong> se o resto for menor que 2, o DV é 0; senão, é <strong>11 − resto</strong>. Logo: 11 − 8 = <strong>3</strong>.</li>
    </ul>
    <p>O primeiro dígito verificador é <strong>3</strong>.</p>

    <h3>2º dígito verificador (11ª posição)</h3>
    <p>Agora inclua o 1º DV e use os <strong>10 dígitos</strong> com pesos de 11 a 2:</p>
    <ul>
      <li><strong>Pesos:</strong> 11, 10, 9, 8, 7, 6, 5, 4, 3, 2</li>
      <li><strong>Dígitos:</strong> 1, 1, 1, 4, 4, 4, 7, 7, 7, 3</li>
      <li><strong>Soma dos produtos:</strong> = <strong>204</strong></li>
      <li><strong>Resto da divisão por 11:</strong> 204 ÷ 11 deixa resto <strong>6</strong></li>
      <li><strong>DV:</strong> 11 − 6 = <strong>5</strong></li>
    </ul>
    <p>O segundo dígito verificador é <strong>5</strong>. Por isso o CPF termina em <strong>-35</strong>. É exatamente essa conta que a ferramenta acima faz para validar qualquer CPF.</p>

    <h3>Estrutura dos 11 dígitos do CPF</h3>
    <ul>
      <li>Os <strong>9 primeiros</strong> formam o número base (incluindo um dígito que indica a região fiscal de emissão).</li>
      <li>Os <strong>2 últimos</strong> são os dígitos verificadores que acabamos de calcular.</li>
    </ul>

    <h3>Para que serve validar o CPF?</h3>
    <ul>
      <li><strong>Prevenção de Erros de Digitação:</strong> Ideal para quem preenche formulários importantes (cadastros, e-commerce ou emissão de notas fiscais) e quer evitar erros antes do envio.</li>
      <li><strong>Testes de Sistemas (Desenvolvedores):</strong> Quem desenvolve sites ou aplicativos precisa testar máscaras de formulários para garantir que o sistema rejeite CPFs com a matemática incorreta.</li>
      <li><strong>Filtragem de Leads Falsos:</strong> Profissionais de marketing e vendas validam listas de cadastros para remover dados fictícios.</li>
    </ul>

    <h3>Privacidade e Segurança</h3>
    <p>Fique tranquilo: <strong>nós não temos acesso à base de dados da Receita Federal</strong>. A ferramenta confirma apenas se a <em>matemática</em> do CPF está correta (se ele pode existir). Ela não informa a quem o CPF pertence, nem verifica situação cadastral. Tudo é processado localmente no seu navegador e nenhum dado é salvo em nossos servidores.</p>
  
    <h3>A matemática por trás dos algoritmos de verificação</h3>
    <p>Os algoritmos de verificação de documentos utilizam lógicas matemáticas modulares (como o módulo 11) para confirmar a integridade estrutural das numerações. Em vez de simplesmente contar dígitos, essas funções aplicam pesos específicos a cada posição numérica, realizando multiplicações sucessivas cuja soma resulta em um dígito verificador. Esse processo padronizado garante que erros comuns de digitação sejam detectados imediatamente pela equação, assegurando a validade técnica do dado fornecido antes de qualquer processamento adicional em bancos de dados ou sistemas corporativos.</p>

    <h3>Por que a validação de dígitos verificadores protege transações online</h3>
    <p>A checagem de dígitos verificadores é uma camada primária de segurança vital para aplicações online. Ao bloquear entradas estruturalmente corrompidas ou geradas aleatoriamente no nível do cliente, as plataformas previnem a sobrecarga de servidores com dados inválidos e reduzem a fricção em transações de e-commerce e processos de onboarding. Esta validação proativa não apenas melhora a qualidade da base de dados, mitigando fraudes primárias, como também acelera o tempo de resposta do sistema, proporcionando uma experiência de navegação mais fluida e confiável para todos os usuários.</p>
</article>
);

const faqItems = [
  {
    question: "Como calcular o dígito verificador do CPF?",
    answer: "Multiplique os 9 primeiros dígitos pelos pesos 10,9,8,7,6,5,4,3,2 e some os resultados. Divida a soma por 11: se o resto for menor que 2, o dígito é 0; caso contrário, o dígito é 11 menos o resto. Esse é o 1º dígito verificador. Para o 2º, repita com 10 dígitos e os pesos 11,10,9,8,7,6,5,4,3,2."
  },
  {
    question: "Quais são os pesos usados na validação do CPF?",
    answer: "Para o primeiro dígito verificador, os pesos são 10,9,8,7,6,5,4,3,2. Para o segundo, são 11,10,9,8,7,6,5,4,3,2. Em ambos os casos usa-se o algoritmo módulo 11."
  },
  {
    question: "O validador informa o nome do titular do CPF?",
    answer: "Não. Por questões de privacidade (LGPD) e segurança, apenas a Receita Federal e instituições autorizadas podem associar um número de CPF ao nome de uma pessoa. Nossa ferramenta valida apenas o algoritmo matemático dos dígitos verificadores."
  },
  {
    question: "Um CPF válido nesta ferramenta significa que ele existe?",
    answer: "Nem sempre. A ferramenta verifica se o CPF é matematicamente possível. Um CPF gerado aleatoriamente pode passar como válido aqui mesmo que a Receita Federal nunca o tenha emitido para um cidadão."
  },
  {
    question: "Por que um CPF que existe deu como 'inválido'?",
    answer: "Quase sempre por um erro de digitação. Se um único dos 11 dígitos estiver errado, a conta dos dígitos verificadores não fecha e a ferramenta aponta como inválido. Sequências repetidas, como 111.111.111-11, também são bloqueadas automaticamente."
  }
];

const relatedTools = [
  {
    title: "Gerador de CPF",
    url: "/documentos/gerador-cpf",
    description: "Gere CPFs válidos e com dígito verificador correto para usar em testes e desenvolvimento."
  },
  {
    title: "Validador de CNPJ",
    url: "/documentos/validador-cnpj",
    description: "Confira a validade matemática de CNPJs e entenda como calcular o dígito verificador."
  },
  {
    title: "Formatador de Dados",
    url: "/utilidades/formatador-dados",
    description: "Limpe e formate listas de CPFs, CNPJs e telefones em lote, removendo pontuação e duplicatas."
  }
];

export default function ValidadorCPF() {
  return (
    <ToolPageLayout
      title="Validador de CPF"
      description="Verifique instantaneamente se um CPF é válido segundo o algoritmo oficial da Receita Federal e veja como calcular o dígito verificador passo a passo."
      ariaLabel="Validador de CPF interativo"
      path="/documentos/validador-cpf"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <ValidadorCPFClient />
    </ToolPageLayout>
  );
}
