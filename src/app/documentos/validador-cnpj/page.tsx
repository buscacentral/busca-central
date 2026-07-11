import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import ValidadorCNPJClient from './ValidadorCNPJClient';

export const metadata: Metadata = {
  ...generateToolMetadata(
    'Validador de CNPJ Online — Resultado Imediato',
    'Valide qualquer CNPJ em 1 clique. Verifique se o número é válido com o algoritmo oficial da Receita Federal. 100% gratuito, sem cadastro e sem anúncios invasivos.',
    '/documentos/validador-cnpj'
  ),
  keywords: [
    'validador de cnpj',
    'validar cnpj',
    'validação cnpj',
    'verificar cnpj',
    'cnpj é válido',
    'dígito verificador cnpj',
    'digito verificador do cnpj',
    'calcular dígito do cnpj',
    'cnpj dígito verificador',
    'dígitos do cnpj',
    'consultar cnpj',
  ],
};

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Entenda como funciona o Validador de CNPJ</h2>
    <p>O <strong>Validador de CNPJ da BuscaCentral</strong> é uma ferramenta desenhada para testar rapidamente se um Cadastro Nacional de Pessoa Jurídica (CNPJ) possui o formato e a lógica matemática exigidos pela Receita Federal do Brasil. Ideal para testes de software, cadastros de fornecedores e auditorias internas.</p>

    <h2>Como calcular o dígito verificador do CNPJ (passo a passo)</h2>
    <p>Os dois últimos números de um CNPJ são os <strong>Dígitos Verificadores (DV)</strong>. Eles não são aleatórios: são calculados a partir dos 12 primeiros dígitos usando o algoritmo <em>módulo 11</em>. Veja como calcular o dígito verificador do CNPJ na prática, usando o exemplo <strong>11.222.333/0001-81</strong>:</p>

    <h3>1º dígito verificador (13ª posição)</h3>
    <p>Multiplique cada um dos <strong>12 primeiros dígitos</strong> pelos pesos, da esquerda para a direita:</p>
    <ul>
      <li><strong>Pesos:</strong> 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2</li>
      <li><strong>Dígitos:</strong> 1, 1, 2, 2, 2, 3, 3, 3, 0, 0, 0, 1</li>
      <li><strong>Soma dos produtos:</strong> 5 + 4 + 6 + 4 + 18 + 24 + 21 + 18 + 0 + 0 + 0 + 2 = <strong>102</strong></li>
      <li><strong>Resto da divisão por 11:</strong> 102 ÷ 11 deixa resto <strong>3</strong></li>
      <li><strong>Regra:</strong> se o resto for menor que 2, o DV é 0; senão, o DV é <strong>11 − resto</strong>. Logo: 11 − 3 = <strong>8</strong>.</li>
    </ul>
    <p>O primeiro dígito verificador é <strong>8</strong>.</p>

    <h3>2º dígito verificador (14ª posição)</h3>
    <p>Agora inclua o 1º DV recém-calculado e use <strong>13 dígitos</strong> com um novo conjunto de pesos:</p>
    <ul>
      <li><strong>Pesos:</strong> 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2</li>
      <li><strong>Dígitos:</strong> 1, 1, 2, 2, 2, 3, 3, 3, 0, 0, 0, 1, 8</li>
      <li><strong>Soma dos produtos:</strong> = <strong>120</strong></li>
      <li><strong>Resto da divisão por 11:</strong> 120 ÷ 11 deixa resto <strong>10</strong></li>
      <li><strong>DV:</strong> 11 − 10 = <strong>1</strong></li>
    </ul>
    <p>O segundo dígito verificador é <strong>1</strong>. Por isso o CNPJ termina em <strong>-81</strong>. É exatamente essa conta que a ferramenta acima faz automaticamente para validar qualquer CNPJ.</p>

    <h3>Estrutura dos 14 dígitos do CNPJ</h3>
    <p>O CNPJ segue o formato <strong>00.000.000/0001-00</strong>:</p>
    <ul>
      <li>Os <strong>8 primeiros</strong> identificam a empresa (a raiz).</li>
      <li>Os <strong>4 seguintes</strong> indicam a unidade: &quot;0001&quot; é a matriz e &quot;0002&quot; em diante são as filiais.</li>
      <li>Os <strong>2 últimos</strong> são os dígitos verificadores que acabamos de calcular.</li>
    </ul>

    <h3>Aplicações práticas para o Validador</h3>
    <ul>
      <li><strong>Desenvolvimento de Software:</strong> Programadores usam validadores para criar máscaras de <i>input</i> em formulários web, garantindo que o banco de dados não receba informações corrompidas.</li>
      <li><strong>Prevenção de Fraudes em Cadastros:</strong> Ajuda a bloquear tentativas de usuários que tentam se registrar em sistemas B2B usando CNPJs falsos ou sequências como &quot;11.111.111/1111-11&quot; (que o validador bloqueia automaticamente).</li>
      <li><strong>Setor de Compras e RH:</strong> Facilita a checagem rápida antes de emitir notas fiscais ou contratos para garantir que não houve erro de digitação por parte do fornecedor.</li>
    </ul>

    <h3>Privacidade da Validação</h3>
    <p>Vale ressaltar que nossa validação ocorre <strong>offline no seu navegador</strong>. A ferramenta apenas testa a regra matemática da Receita Federal. Nós não temos acesso ao nome da empresa (Razão Social), não verificamos se o CNPJ está ativo, baixado ou inapto, nem armazenamos o número digitado em nossos servidores.</p>
  
    <h3>A matemática por trás dos algoritmos de verificação</h3>
    <p>Os algoritmos de verificação de documentos utilizam lógicas matemáticas modulares (como o módulo 11) para confirmar a integridade estrutural das numerações. Em vez de simplesmente contar dígitos, essas funções aplicam pesos específicos a cada posição numérica, realizando multiplicações sucessivas cuja soma resulta em um dígito verificador. Esse processo padronizado garante que erros comuns de digitação sejam detectados imediatamente pela equação, assegurando a validade técnica do dado fornecido antes de qualquer processamento adicional em bancos de dados ou sistemas corporativos.</p>

    <h3>Por que a validação de dígitos verificadores protege transações online</h3>
    <p>A checagem de dígitos verificadores é uma camada primária de segurança vital para aplicações online. Ao bloquear entradas estruturalmente corrompidas ou geradas aleatoriamente no nível do cliente, as plataformas previnem a sobrecarga de servidores com dados inválidos e reduzem a fricção em transações de e-commerce e processos de onboarding. Esta validação proativa não apenas melhora a qualidade da base de dados, mitigando fraudes primárias, como também acelera o tempo de resposta do sistema, proporcionando uma experiência de navegação mais fluida e confiável para todos os usuários.</p>
</article>
);

const faqItems = [
  {
    question: "Como validar um CNPJ online?",
    answer: "Cole ou digite os 14 dígitos do CNPJ no campo acima e clique em Validar. A ferramenta verifica instantaneamente se o número segue a regra matemática oficial da Receita Federal (algoritmo módulo 11). O resultado aparece na hora — sem cadastro, sem limite de consultas e 100% gratuito."
  },
  {
    question: "Como calcular o dígito verificador do CNPJ?",
    answer: "Multiplique os 12 primeiros dígitos pelos pesos 5,4,3,2,9,8,7,6,5,4,3,2 e some os resultados. Divida a soma por 11: se o resto for menor que 2, o dígito é 0; caso contrário, o dígito é 11 menos o resto. Esse é o 1º dígito verificador. Para o 2º, repita o processo com 13 dígitos e os pesos 6,5,4,3,2,9,8,7,6,5,4,3,2."
  },
  {
    question: "Qual a diferença entre validar e consultar um CNPJ?",
    answer: "Validar verifica apenas se os dígitos verificadores estão corretos matematicamente — é uma checagem offline e instantânea. Consultar vai além: acessa a base da Receita Federal para verificar razão social, situação cadastral (ativa, baixada, inapta) e endereço. Para consultar dados reais, use nossa ferramenta de Consulta CNPJ."
  },
  {
    question: "Quais são os pesos usados na validação do CNPJ?",
    answer: "Para o primeiro dígito verificador, os pesos (da esquerda para a direita) são 5,4,3,2,9,8,7,6,5,4,3,2. Para o segundo dígito, são 6,5,4,3,2,9,8,7,6,5,4,3,2. Em ambos os casos usa-se o algoritmo módulo 11."
  },
  {
    question: "O validador informa se a empresa está ativa?",
    answer: "Não. A validação oferecida aqui é puramente matemática. Um CNPJ pode ser matematicamente válido, mas pertencer a uma empresa que já foi fechada ou inapta. Para consultar o status de um CNPJ na Receita Federal, use nossa ferramenta de Consulta CNPJ que acessa dados reais."
  },
  {
    question: "Por que um CNPJ que existe deu como 'inválido'?",
    answer: "Geralmente isso ocorre por um erro de digitação em algum dos 14 números. Basta um único dígito errado para que a conta matemática dos dígitos verificadores não feche. Confira se copiou o número completo, sem espaços extras ou dígitos faltando."
  },
  {
    question: "A validação é segura? Meus dados são armazenados?",
    answer: "Sim, é 100% segura. A validação ocorre inteiramente no seu navegador (offline) — o número digitado não é enviado para nenhum servidor. Não armazenamos, registramos ou compartilhamos nenhum CNPJ consultado nesta ferramenta."
  },
  {
    question: "Posso validar vários CNPJs de uma vez?",
    answer: "A ferramenta valida um CNPJ por vez para garantir clareza no resultado. Se precisa validar muitos CNPJs em lote (para importações ou auditorias), uma alternativa é usar a lógica do algoritmo módulo 11 em uma planilha ou script próprio."
  }
];

const relatedTools = [
  {
    title: "Consulta CNPJ",
    url: "/documentos/consulta-cnpj",
    description: "Consulte os dados cadastrais reais de uma empresa (razão social, situação e endereço) na Receita Federal."
  },
  {
    title: "Gerador de CNPJ",
    url: "/documentos/gerador-cnpj",
    description: "Gere CNPJs válidos e com dígito verificador correto para usar em testes e desenvolvimento."
  },
  {
    title: "Validador de CPF",
    url: "/documentos/validador-cpf",
    description: "Confirme se o CPF de um cliente, sócio ou funcionário está matematicamente correto."
  }
];

export default function ValidadorCNPJ() {
  return (
    <ToolPageLayout
      title="Validador de CNPJ"
      description="Verifique instantaneamente se um CNPJ é válido usando o algoritmo oficial da Receita Federal. Veja como calcular o dígito verificador passo a passo."
      ariaLabel="Validador de CNPJ interativo"
      path="/documentos/validador-cnpj"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <ValidadorCNPJClient />
    </ToolPageLayout>
  );
}
