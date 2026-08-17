import { Metadata } from 'next';
import IndicadoresClient from './IndicadoresClient';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Indicadores Econômicos ${year}: Selic, IPCA e CDI`,
  description: `Consulte Selic, IPCA e CDI atualizados ${year} direto do Banco Central. Dados oficiais em tempo real, grátis.`,
};

export default async function IndicadoresPage() {
  // Fetch Server-Side dos dados do Banco Central (SGS)
  let indicadoresData = { selic: null, ipca: null, cdi: null };
  
  try {
    const [selicRes, ipcaRes, cdiRes] = await Promise.all([
      fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json', { next: { revalidate: 3600 } }),
      fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json', { next: { revalidate: 3600 } }),
      fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/1?formato=json', { next: { revalidate: 3600 } }),
    ]);

    if (selicRes.ok && ipcaRes.ok && cdiRes.ok) {
      const selicData = await selicRes.json();
      const ipcaData = await ipcaRes.json();
      const cdiData = await cdiRes.json();
      
      indicadoresData = {
        selic: selicData[0] || null,
        ipca: ipcaData[0] || null,
        cdi: cdiData[0] || null,
      };
    }
  } catch (err) {
    console.error("Erro ao buscar indicadores no servidor", err);
  }

  // Schema Markup (JSON-LD) para SEO (FAQ e WebPage)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-08-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é a Taxa Selic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Selic é a taxa básica de juros da economia brasileira. Ela influencia todas as outras taxas de juros, como as de empréstimos, financiamentos e aplicações financeiras."
        }
      },
      {
        "@type": "Question",
        "name": "O que é o IPCA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O IPCA (Índice Nacional de Preços ao Consumidor Amplo) é o índice oficial da inflação no Brasil. Ele mede a variação dos preços de um conjunto de produtos e serviços consumidos pelas famílias."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      {/* Injeção do Schema no HTML para Rich Snippets do Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Indicadores Econômicos do Brasil</h1>
          <time dateTime="2026-08-16" className="text-xs text-slate-500 block mb-4">Atualizado em: 16 de agosto de 2026</time>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Acompanhe as taxas oficiais atualizadas diretamente pelo <strong>Banco Central do Brasil</strong>.
            Esses indicadores afetam diretamente seus investimentos em Renda Fixa (CDB, Tesouro Direto) e financiamentos.
          </p>
        </div>
        
        {/* Renderiza o componente com SSR */}
        <IndicadoresClient data={indicadoresData} />

        {/* SEÇÃO DE SEO: Disclaimer Legal */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-sm text-slate-500 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-2">Aviso Legal (Disclaimer) e Fonte dos Dados</h4>
            <p className="mb-2">
              Os dados apresentados nesta página (Taxa Selic, IPCA e CDI) são coletados publicamente através da API do <strong>Sistema Gerenciador de Séries Temporais (SGS) do Banco Central do Brasil</strong>.
            </p>
            <p>
              O portal Busca Central exibe as informações a título informativo. As taxas podem sofrer atualizações e não devem ser interpretadas como garantias ou recomendações de aplicação financeira. Consulte sempre a página oficial do Banco Central ou seu corretor para transações financeiras.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
