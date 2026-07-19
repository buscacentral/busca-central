import { Metadata } from 'next';
import PainelB3Client, { type StockData } from './PainelB3Client';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Painel B3: Cotação Ações e FIIs Hoje (${year})`,
  description: `Cotação em tempo real de ações e FIIs da B3. Acompanhe PETR4, VALE3, ITUB4 e mais. Dados atualizados, grátis.`,
};

export default async function PainelB3Page() {
  const apiKey = process.env.BRAPI_TOKEN;
  const tickers = ['PETR4', 'VALE3', 'ITUB4', 'MXRF11'];
  let initialStocks: StockData[] = [];

  if (apiKey) {
    try {
      const promises = tickers.map(t =>
        fetch(`https://brapi.dev/api/quote/${t}?token=${apiKey}`, {
          next: { revalidate: 60 } // Atualiza a cada 60 segundos
        }).then(r => r.json())
      );

      const results = await Promise.all(promises);
      initialStocks = results
        .filter(d => d && d.results && d.results.length > 0)
        .map(d => d.results[0]);
    } catch (error) {
      console.error("Erro ao buscar ações iniciais:", error);
    }
  } else {
    console.warn("BRAPI_TOKEN não configurado. O Painel B3 iniciará sem dados pré-carregados.");
  }

  // Schema Markup (JSON-LD) para SEO (FAQ e WebPage)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que são Ações (B3)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ações representam uma fração do capital social de uma empresa. Ao comprar uma ação na B3 (Bolsa de Valores do Brasil), você se torna sócio daquela companhia e pode lucrar com a valorização do papel e o recebimento de dividendos."
        }
      },
      {
        "@type": "Question",
        "name": "O que são Fundos Imobiliários (FIIs)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os Fundos de Investimento Imobiliário (FIIs) são grupos de investidores que aplicam recursos no mercado imobiliário (shoppings, galpões, escritórios ou títulos de dívida). Eles são negociados na bolsa de valores sob códigos terminados em '11' (como MXRF11) e costumam pagar rendimentos mensais (aluguéis)."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      {/* Injeção do Schema no HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Painel B3 (Ações e FIIs)</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Acompanhe a cotação em tempo real dos principais ativos da bolsa brasileira. 
            Digite o código do ticker (ex: PETR4, MXRF11, ITUB4) para ver os detalhes.
          </p>
        </div>
        
        {/* Componente Client-side de Busca Interativa com dados pre-carregados */}
        <PainelB3Client initialStocks={initialStocks} />

        {/* SEÇÃO DE SEO: FAQ & Disclaimer Legal */}
        <div className="mt-24 pt-12 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Dúvidas Frequentes sobre a B3</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-slate-800 text-lg mb-2">O que são Ações (B3)?</h3>
              <p className="text-slate-600">Ações representam uma fração do capital social de uma empresa. Ao comprar uma ação na B3 (Bolsa de Valores do Brasil), você se torna sócio daquela companhia e pode lucrar com a valorização do papel e o recebimento de dividendos.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg mb-2">O que são FIIs?</h3>
              <p className="text-slate-600">Fundos Imobiliários reúnem investidores para aplicar no mercado imobiliário (shoppings, galpões). São negociados com códigos terminados em '11' (como o MXRF11) e distribuem os aluguéis recebidos como rendimentos mensais isentos de IR para pessoas físicas.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 text-sm text-slate-500 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-2">Aviso Legal (Disclaimer) e Termos de Uso</h4>
            <p className="mb-2">
              As cotações e informações exibidas no Busca Central são providas por fontes públicas e parceiros de tecnologia financeira, como a <strong>API da Brapi</strong>. 
              <strong>Podem existir atrasos de até 15 minutos</strong> na atualização dos preços em relação ao mercado em tempo real.
            </p>
            <p>
              Nenhuma informação apresentada neste painel deve ser interpretada como análise, aconselhamento, sugestão de investimento ou recomendação de compra e venda de ativos. O Busca Central isenta-se de responsabilidade por eventuais perdas financeiras decorrentes do uso destas informações. Antes de investir na bolsa de valores, certifique-se de conhecer o seu perfil de investidor e os riscos envolvidos em ativos de Renda Variável.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
