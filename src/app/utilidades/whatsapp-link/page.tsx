import type { Metadata } from 'next';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';
import WhatsAppLinkClient from './WhatsAppLinkClient';

export const metadata: Metadata = generateToolMetadata(
  'Gerador de Link WhatsApp',
  'Gere links diretos para WhatsApp com mensagem pré-definida. Crie QR Codes para seu número.',
  '/utilidades/whatsapp-link'
);

const seoContent = (
  <article className="prose prose-gray max-w-none">
    <h2>Facilite o contato com seus clientes usando o Gerador de Link do WhatsApp</h2>
    <p>O <strong>Gerador de Link de WhatsApp da BuscaCentral</strong> é uma ferramenta desenhada para empreendedores, vendedores e criadores de conteúdo que desejam remover qualquer barreira de comunicação. Com um único clique, seu cliente abre uma conversa diretamente com você, sem precisar adicionar seu número à agenda do celular.</p>

    <h3>Como criar seu link personalizado</h3>
    <ol>
      <li><strong>Digite seu número:</strong> Insira o número do seu WhatsApp com o DDD (não esqueça de selecionar o código do país, que no Brasil é +55).</li>
      <li><strong>Escreva a mensagem (opcional):</strong> Digite uma mensagem padrão que aparecerá automaticamente na caixa de texto do seu cliente quando ele clicar no link. Exemplo: <em>"Olá! Gostaria de saber mais sobre os produtos."</em></li>
      <li><strong>Gere o link:</strong> Clique no botão e seu link curto será criado instantaneamente. Você pode copiá-lo para usar no Instagram, Facebook, site ou e-mail.</li>
    </ol>

    <h3>Onde usar seu link do WhatsApp?</h3>
    <p>A versatilidade dos links diretos (conhecidos como wa.me) é enorme:</p>
    <ul>
      <li><strong>Link na Bio do Instagram:</strong> Direcione seguidores interessados no seu produto direto para o seu chat de vendas.</li>
      <li><strong>Botões em Sites:</strong> Adicione o link nos botões de "Fale Conosco" ou "Pedir Orçamento" do seu site.</li>
      <li><strong>Anúncios Patrocinados:</strong> Campanhas de tráfego pago (Facebook Ads ou Google Ads) convertem muito mais quando o destino é o WhatsApp.</li>
      <li><strong>E-mail Marketing:</strong> Adicione o link na sua assinatura de e-mail para comunicação ágil.</li>
    </ul>

    <h3>Benefícios de configurar uma mensagem pré-definida</h3>
    <p>A mensagem pré-definida economiza tempo do cliente e ajuda você a se organizar. Se você faz anúncios de diferentes produtos, pode criar um link diferente para cada um. Quando a mensagem <em>"Tenho interesse no Tênis Modelo X"</em> chega, você já sabe exatamente o que o cliente quer antes mesmo de responder.</p>
  </article>
);

const faqItems = [
  {
    question: "O gerador de link do WhatsApp tem algum custo?",
    answer: "Não, nossa ferramenta é 100% gratuita. Você pode criar quantos links desejar, testar diferentes mensagens e usar comercialmente sem qualquer limitação."
  },
  {
    question: "Os clientes precisam ter meu número salvo?",
    answer: "Esse é o maior benefício! Quando alguém clica no link gerado, o aplicativo do WhatsApp abre diretamente na conversa com você, pulando a etapa chata de ter que salvar o contato na agenda telefônica."
  },
  {
    question: "Funciona tanto no celular quanto no computador?",
    answer: "Sim! Se o cliente clicar no link pelo celular, abrirá o aplicativo do WhatsApp. Se clicar pelo computador, abrirá o WhatsApp Web no navegador ou o aplicativo de desktop, caso ele tenha instalado."
  }
];

const relatedTools = [
  {
    title: "Gerador de QR Code",
    url: "/utilidades/gerador-qr-code",
    description: "Transforme o link do seu WhatsApp que você acabou de criar em um QR Code para panfletos e cartões de visita."
  },
  {
    title: "PIX Copia e Cola & QR Code",
    url: "/utilidades/pix-copia-cola",
    description: "Crie códigos e chaves PIX para compartilhar no WhatsApp e agilizar pagamentos de clientes."
  },
  {
    title: "Contador de Caracteres",
    url: "/utilidades/contador-caracteres",
    description: "Ideal para planejar suas mensagens e copies de vendas no WhatsApp sem exceder os limites de leitura."
  }
];

export default function WhatsAppLink() {
  return (
    <ToolPageLayout
      title="Gerador de Link WhatsApp"
      description="Gere links diretos para o seu WhatsApp de forma gratuita. Configure uma mensagem personalizada e facilite o contato dos seus clientes através do Instagram ou site."
      ariaLabel="Gerador de link WhatsApp interativo"
      path="/utilidades/whatsapp-link"
      seoContent={seoContent}
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <WhatsAppLinkClient />
    </ToolPageLayout>
  );
}
