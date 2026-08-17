import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import SorteadorNomesClient from './SorteadorNomesClient';

const year = new Date().getFullYear();
export const metadata: Metadata = generateToolMetadata(
  `Sorteador de Nomes e Rifas Online Grátis (${year})`,
  'Faça sorteios aleatórios de nomes, rifas ou listas online. Sorteie múltiplos ganhadores simultâneos com total transparência e imparcialidade.',
  '/utilidades/sorteador-nomes'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>O que é o Sorteador de Nomes e Rifas?</h2>
    <p>
      O <strong>Sorteador de Nomes do BuscaCentral</strong> é uma ferramenta online, gratuita e 100% imparcial desenvolvida para realizar sorteios aleatórios a partir de listas de nomes, arrobas de redes sociais (@), números de rifas ou itens personalizados. Seja para campanhas de marketing, promoções no Instagram, salas de aula ou brincadeiras entre amigos, o sistema garante aleatoriedade matemática sem manipulação de resultados.
    </p>

    <h3>Para que serve um sorteador digital aleatório?</h3>
    <p>
      Realizar sorteios manuais com papéis dobrados ou métodos caseiros frequentemente gera dúvidas de favorecimento e desconfiança do público. O sorteador digital soluciona essas questões oferecendo:
    </p>
    <ul>
      <li><strong>Sorteios no Instagram e Redes Sociais:</strong> Sorteie perfis de seguidores que comentaram em publicações ou participaram de ações promocionais com rapidez e lisura.</li>
      <li><strong>Rifas e Ações Beneficentes:</strong> Insira a sequência numérica de bilhetes vendidos (ex.: 1 a 500) e defina os vencedores dos prêmios de forma instantânea.</li>
      <li><strong>Educação e Dinâmicas em Grupo:</strong> Escolha a ordem de apresentação de trabalhos escolares, sorteie participantes de debates ou forme equipes equilibradas para gincanas.</li>
      <li><strong>Amigo Secreto e Confraternizações:</strong> Realize sorteios de brindes e premiações em festas de família e eventos de final de ano em empresas.</li>
    </ul>

    <h3>Como usar o Sorteador de Nomes</h3>
    <ol>
      <li><strong>Cole sua Lista:</strong> Insira os nomes dos participantes, números de rifa ou @perfis na caixa de texto (coloque um item por linha).</li>
      <li><strong>Defina o Número de Ganhadores:</strong> Informe se o sorteio terá 1 vencedor ou múltiplos ganhadores simultâneos.</li>
      <li><strong>Clique em Sortear:</strong> O sistema exibirá uma animação de suspense e revelará os vencedores destacados na tela.</li>
      <li><strong>Grave a Tela para Maior Transparência:</strong> Caso esteja realizando um sorteio público nas redes sociais, grave a tela durante o clique para compartilhar o vídeo com seus seguidores.</li>
    </ol>

    <h3>Aleatoriedade e Segurança Garantidas</h3>
    <p>
      Nosso algoritmo utiliza o motor pseudoaleatório de alta entropia do seu próprio navegador (JavaScript moderno), assegurando que todos os participantes da lista tenham rigorosamente a mesma probabilidade estatística de vitória. Nenhuma lista de participantes é transmitida para servidores ou armazenada em banco de dados, protegendo a privacidade de todos os envolvidos.
    </p>
  </article>
);

const faqItems = [
  {
    question: "O sorteio é realmente 100% aleatório e justo?",
    answer: "Sim. O algoritmo utiliza embaralhamento matemático no navegador para misturar a lista de forma completamente imparcial antes de selecionar os vencedores. Nenhum nome possui prioridade ou favorecimento."
  },
  {
    question: "Posso sortear múltiplos ganhadores de uma só vez?",
    answer: "Sim. Você pode definir a quantidade exata de ganhadores desejada (ex.: 1, 3, 5 ou mais). O sorteador escolherá vencedores distintos da lista sem gerar duplicatas no mesmo sorteio."
  },
  {
    question: "Como utilizar a ferramenta para sorteios de rifas numéricas?",
    answer: "Basta colar os números correspondentes aos bilhetes vendidos (um por linha) no campo de texto. Você pode remover previamente os números que não foram comercializados para garantir que o prêmio saia apenas para bilhetes válidos."
  },
  {
    question: "Meus dados ou a lista de nomes ficam gravados no site?",
    answer: "Não. A ferramenta executa 100% no seu navegador (client-side). O BuscaCentral não armazena nomes, telefones ou arrobas digitados no formulário."
  }
];

const relatedTools = [
  {
    title: "Sorteador de Números Online",
    url: "/utilidades/sorteador",
    description: "Sorteie números aleatórios definindo faixas mínima e máxima."
  },
  {
    title: "Gerador de Senha Segura",
    url: "/utilidades/gerador-senha",
    description: "Crie senhas fortes e aleatórias com símbolos e números."
  },
  {
    title: "Removedor de Duplicatas",
    url: "/utilidades/removedor-duplicatas",
    description: "Limpe e remova nomes repetidos da sua lista antes de sortear."
  }
];

export default function SorteadorNomesPage() {
  return (
    <ToolPageLayout
      title={`Sorteador de Nomes e Rifas (${year})`}
      description="Cole sua lista de nomes ou números e escolha vencedores aleatoriamente de forma justa, transparente e gratuita."
      ariaLabel="Sorteador de nomes interativo"
      path="/utilidades/sorteador-nomes"
      lastUpdated="2026-08-16"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <SorteadorNomesClient />
    </ToolPageLayout>
  );
}
