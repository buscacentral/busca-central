import { Metadata } from 'next';
import NoticiasClient from './NoticiasClient';

export const metadata: Metadata = {
  title: 'Notícias Financeiras e Criptomoedas Hoje',
  description: 'Últimas notícias do mercado financeiro, blockchain e criptomoedas em tempo real. Atualizado automaticamente.',
};

interface RawArticle {
  title?: string;
  urlToImage?: string;
}

export default async function NoticiasFinanceirasPage() {
  const apiKey = process.env.NEWSAPI_KEY;
  
  // Server-Side Fetching para SEO e Performance
  let initialNews = [];
  let cryptoNews = [];

  if (apiKey) {
    try {
      // Usando endpoint 'everything' para garantir resultados diários no Brasil
      const res = await fetch(`https://newsapi.org/v2/everything?q=economia OR "mercado financeiro"&language=pt&sortBy=publishedAt&apiKey=${apiKey}`, {
        next: { revalidate: 3600 } // Faz o cache por 1 hora
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data && data.articles) {
          initialNews = data.articles
            .filter((a: RawArticle) => a.title && a.title !== '[Removed]' && a.urlToImage)
            .slice(0, 30);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar notícias no servidor:", error);
    }

    try {
      // Buscando criptomoedas no servidor também para evitar bloqueio de CORS do NewsAPI no cliente
      const resCrypto = await fetch(`https://newsapi.org/v2/everything?q=criptomoedas OR bitcoin OR ethereum&language=pt&sortBy=publishedAt&apiKey=${apiKey}`, {
        next: { revalidate: 3600 }
      });
      
      if (resCrypto.ok) {
        const dataCrypto = await resCrypto.json();
        if (dataCrypto && dataCrypto.articles) {
          cryptoNews = dataCrypto.articles
            .filter((a: RawArticle) => a.title && a.title !== '[Removed]' && a.urlToImage)
            .slice(0, 30);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar cripto no servidor:", error);
    }
  }

  // Schema Markup (JSON-LD) para SEO (NewsArticle e WebPage)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Notícias do Mercado e Cripto",
    "description": "Fique por dentro de tudo que acontece no mundo dos investimentos, blockchain e economia digital.",
    "publisher": {
      "@type": "Organization",
      "name": "Busca Central"
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      {/* Injeção do Schema no HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Notícias do Mercado e Cripto</h1>
          <time dateTime="2026-08-16" className="text-xs text-slate-500 block mb-4">Atualizado em: 16 de agosto de 2026</time>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fique por dentro de tudo que acontece no mundo dos investimentos, blockchain e economia digital.
          </p>
        </div>
        
        {/* Passa as notícias pré-renderizadas para o Cliente */}
        <NoticiasClient initialNews={initialNews} cryptoNews={cryptoNews} />

        {/* SEÇÃO DE SEO: FAQ & Disclaimer Legal */}
        <div className="mt-24 pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas Frequentes (FAQ) sobre o Mercado Financeiro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-slate-800 text-lg mb-2">Por que acompanhar notícias do mercado financeiro?</h3>
              <p className="text-slate-600">Acompanhar as notícias econômicas é fundamental para entender o cenário macroeconômico, flutuações da taxa Selic, inflação (IPCA) e como esses fatores impactam seus investimentos em Renda Fixa e Renda Variável.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg mb-2">Como as notícias afetam o preço do Bitcoin e Criptomoedas?</h3>
              <p className="text-slate-600">O mercado de criptomoedas é altamente volátil e reage rapidamente a notícias globais, regulamentações governamentais e adoção institucional. Ficar atualizado ajuda a tomar decisões de investimento mais seguras.</p>
            </div>
          </div>

          <div className="bg-slate-100 p-6 rounded-xl text-sm text-slate-500">
            <h4 className="font-bold text-slate-700 mb-2">Isenção de Responsabilidade (Disclaimer)</h4>
            <p>
              O portal Busca Central consolida notícias financeiras e de mercado usando APIs públicas e de terceiros (como a NewsAPI). 
              O conteúdo exibido nesta página <strong>não constitui recomendação de compra, venda ou retenção de ativos financeiros ou criptomoedas</strong>. 
              As opiniões expressas nas notícias pertencem aos seus respectivos autores e veículos de mídia (G1, InfoMoney, Valor, etc.). 
              Invista com responsabilidade e consulte um profissional credenciado (CNPI) antes de tomar decisões financeiras baseadas em notícias.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
