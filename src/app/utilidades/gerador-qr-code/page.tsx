import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import GeradorQRCodeClient from './GeradorQRCodeClient';

export const metadata: Metadata = generateToolMetadata(
  'Gerador de QR Code',
  'Gere QR Codes a partir de textos ou URLs e baixe em PNG. Ferramenta gratuita e sem cadastro.',
  '/utilidades/gerador-qr-code'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Como funciona o Gerador de QR Code Grátis?</h2>
    <p>O <strong>Gerador de QR Code da BuscaCentral</strong> é uma ferramenta online, totalmente gratuita, que permite transformar qualquer texto, link ou dado em um código de barras bidimensional de forma instantânea. Sem necessidade de cadastros ou limites de criação, você pode gerar quantos códigos precisar.</p>

    <h3>Passo a passo para criar o seu QR Code</h3>
    <ol>
      <li><strong>Insira o conteúdo:</strong> No campo de texto acima, digite a informação que você deseja compartilhar (pode ser o link do seu site, perfil do Instagram, menu do seu restaurante, ou até mesmo um texto simples).</li>
      <li><strong>Geração instantânea:</strong> Assim que você digita, o código é atualizado automaticamente na tela.</li>
      <li><strong>Faça o download:</strong> Clique no botão de "Baixar" para salvar a imagem no formato PNG diretamente no seu dispositivo.</li>
    </ol>

    <h3>Onde utilizar um QR Code?</h3>
    <p>Os QR Codes revolucionaram a forma como compartilhamos informações rapidamente. Eles são muito utilizados em:</p>
    <ul>
      <li><strong>Cardápios de Restaurantes:</strong> Evita o uso de papel e permite atualizar o menu online sem reimpressões.</li>
      <li><strong>Cartões de Visita:</strong> Direciona o cliente instantaneamente para o seu WhatsApp, LinkedIn ou portfólio.</li>
      <li><strong>Embalagens de Produtos:</strong> Leva o consumidor para manuais de instrução, vídeos explicativos ou páginas de suporte.</li>
      <li><strong>Eventos e Convites:</strong> Facilita o check-in e compartilha a localização exata do evento no Google Maps.</li>
      <li><strong>Wi-Fi Compartilhado:</strong> Crie um QR Code com os dados da sua rede para que as visitas se conectem sem precisar digitar a senha.</li>
    </ul>

    <h3>Benefícios da nossa ferramenta</h3>
    <ul>
      <li><strong>Privacidade garantida:</strong> Os códigos são gerados diretamente no seu navegador. Nós não armazenamos os textos ou links que você digita em nossos servidores.</li>
      <li><strong>Qualidade de imagem:</strong> O arquivo gerado está em alta resolução (PNG), perfeito tanto para uso em redes sociais quanto para impressão gráfica (panfletos, banners, etc.).</li>
      <li><strong>Rápido e sem burocracia:</strong> Não pedimos e-mail, não colocamos marcas d'água no seu código e não há expiração.</li>
    </ul>
  </article>
);

const faqItems = [
  {
    question: "O QR Code gerado tem prazo de validade?",
    answer: "Não! Os QR Codes gerados nesta ferramenta são estáticos. Isso significa que eles nunca expiram e funcionarão para sempre, desde que a informação (como o link de um site) continue existindo."
  },
  {
    question: "O que é um QR Code estático?",
    answer: "É um código onde a informação de destino é codificada diretamente no desenho dele. Uma vez gerado, você não pode alterar para onde ele aponta (se quiser mudar o link, precisará gerar e imprimir um novo código)."
  },
  {
    question: "Posso usar comercialmente na minha empresa?",
    answer: "Com certeza. Nossos QR Codes não possuem marca d'água ou restrições de direitos. Você pode imprimi-los em banners, outdoors, cardápios e produtos comerciais livremente."
  }
];

const relatedTools = [
  {
    title: "Gerador de Link de WhatsApp",
    url: "/utilidades/whatsapp-link",
    description: "Crie um link direto para o seu WhatsApp. Excelente para transformar em QR Code depois!"
  },
  {
    title: "PIX Copia e Cola & QR Code",
    url: "/utilidades/pix-copia-cola",
    description: "Gere códigos PIX Copia e Cola e QR Code para receber pagamentos instantâneos."
  },
  {
    title: "Gerador de Senhas Seguras",
    url: "/utilidades/gerador-senha",
    description: "Proteja suas contas criando senhas fortes, aleatórias e impossíveis de serem adivinhadas."
  }
];

export default function GeradorQRCode() {
  return (
    <ToolPageLayout
      title="Gerador de QR Code"
      description="Crie QR Codes personalizados e gratuitos para links, Wi-Fi, textos e cardápios. Baixe a imagem em PNG em alta qualidade para impressão ou uso digital."
      ariaLabel="Gerador de QR Code interativo"
      path="/utilidades/gerador-qr-code"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <GeradorQRCodeClient />
    </ToolPageLayout>
  );
}
