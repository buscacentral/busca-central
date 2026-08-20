import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o BuscaCentral — A principal central de ferramentas online gratuitas do Brasil.',
  alternates: {
    canonical: 'https://buscacentral.com.br/sobre',
  },
  openGraph: {
    title: 'Sobre Nós | BuscaCentral',
    description: 'Conheça o BuscaCentral — A principal central de ferramentas online gratuitas do Brasil.',
    url: 'https://buscacentral.com.br/sobre',
    siteName: 'BuscaCentral',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nós | BuscaCentral',
    description: 'Conheça o BuscaCentral — A principal central de ferramentas online gratuitas do Brasil.',
  },
};

export default function Sobre() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BuscaCentral',
    url: 'https://buscacentral.com.br',
    logo: 'https://buscacentral.com.br/favicon.ico',
    description: 'Central de ferramentas online gratuitas do Brasil. Consultas rápidas, seguras e sem cadastro.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contato@buscacentral.com.br',
      contactType: 'customer support',
      availableLanguage: 'Portuguese',
    },
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre o BuscaCentral',
    url: 'https://buscacentral.com.br/sobre',
    description: 'Conheça a missão, propósito e diferenciais do BuscaCentral.',
    mainEntity: organizationSchema,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Dados Estruturados de Entidade (Schema.org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sobre o BuscaCentral</h1>
      
      <div className="prose prose-gray max-w-none">
        <h2>Nossa Missão</h2>
        <p>
          O BuscaCentral nasceu com um objetivo claro: ser a principal central de ferramentas online 
          gratuitas do Brasil. Queremos que qualquer pessoa encontre, num só lugar, consultas de 
          documentos, localização, informações financeiras e utilitários do dia a dia.
        </p>
        
        <h2>O Problema que Resolvemos</h2>
        <p>
          Hoje o usuário brasileiro precisa acessar 4 ou 5 sites diferentes para consultar CEP, 
          validar um CNPJ, checar a cotação do dólar e pesquisar o preço de um carro na tabela FIPE. 
          O BuscaCentral unifica essas ferramentas numa interface única e bem indexada no Google.
        </p>
        
        <h2>Nossos Diferenciais</h2>
        <ul>
          <li><strong>Gratuito:</strong> Todas as ferramentas são 100% gratuitas, sem planos pagos ou limitações.</li>
          <li><strong>Sem cadastro:</strong> Use qualquer ferramenta sem precisar criar conta.</li>
          <li><strong>Rápido:</strong> Resultados instantâneos, sem espera.</li>
          <li><strong>Privacidade:</strong> As ferramentas rodam no navegador. Seus dados nunca saem do seu computador.</li>
        </ul>
        
        <h2>Nosso Compromisso</h2>
        <p>
          Estamos constantemente trabalhando para adicionar novas ferramentas e melhorar as existentes. 
          Nosso compromisso é oferecer a melhor experiência possível para nossos usuários.
        </p>
        
        <h2>Contato</h2>
        <p>
          Tem sugestões, dúvidas ou feedback? Entre em contato conosco pelo e-mail: 
          <strong>contato@buscacentral.com.br</strong>
        </p>
      </div>
    </div>
  );
}
