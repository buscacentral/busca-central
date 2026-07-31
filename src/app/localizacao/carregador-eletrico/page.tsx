import { Metadata } from 'next';
import Link from 'next/link';
import ToolPageLayout, { generateToolMetadata } from '@/components/ToolPageLayout';

const title = 'Localizador de Eletropostos e Carregadores Elétricos';
const description = 'Encontre estações de recarga para carros elétricos (VEs) nas principais cidades do Brasil. Endereços, mapas e tipos de conectores em tempo real.';
const path = '/localizacao/carregador-eletrico';

export const metadata: Metadata = generateToolMetadata(title, description, path);

export default function CarregadorEletricoIndex() {
  const capitais = [
    { nome: 'São Paulo (SP)', slug: 'sao-paulo-sp' },
    { nome: 'Rio de Janeiro (RJ)', slug: 'rio-de-janeiro-rj' },
    { nome: 'Belo Horizonte (MG)', slug: 'belo-horizonte-mg' },
    { nome: 'Curitiba (PR)', slug: 'curitiba-pr' },
    { nome: 'Porto Alegre (RS)', slug: 'porto-alegre-rs' },
    { nome: 'Brasília (DF)', slug: 'brasilia-df' },
    { nome: 'Salvador (BA)', slug: 'salvador-ba' },
    { nome: 'Fortaleza (CE)', slug: 'fortaleza-ce' },
    { nome: 'Recife (PE)', slug: 'recife-pe' },
    { nome: 'Goiânia (GO)', slug: 'goiania-go' },
    { nome: 'Campinas (SP)', slug: 'campinas-sp' },
    { nome: 'Florianópolis (SC)', slug: 'florianopolis-sc' },
  ];

  return (
    <ToolPageLayout
      title={title}
      description={description}
      path={path}
      showMiddleAd={true}
      faqItems={[
        {
          question: 'Como funciona o Localizador de Eletropostos?',
          answer: 'Nosso sistema se conecta à base de dados global OpenChargeMap para exibir as estações de recarga de veículos elétricos (VEs) cadastradas em cada cidade. Você pode ver o endereço, a distância aproximada e abrir a rota diretamente no Google Maps.'
        },
        {
          question: 'Todos os carregadores são gratuitos?',
          answer: 'Não. Existem opções gratuitas em shoppings e supermercados, mas muitas redes de recarga rápida (como Tupinambá, Volvo, EZVolt) exigem pagamento via aplicativo próprio.'
        }
      ]}
    >
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Selecione uma Cidade</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {capitais.map((cidade) => (
            <Link
              key={cidade.slug}
              href={`/localizacao/carregador-eletrico/${cidade.slug}`}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-sky-500 hover:shadow-sm transition-all group bg-slate-50 hover:bg-white"
            >
              <span className="font-medium text-slate-700 group-hover:text-sky-600">
                {cidade.nome}
              </span>
              <span aria-hidden="true" className="text-slate-400 group-hover:text-sky-500">
                &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-sky-50 text-sky-800 rounded-lg text-sm leading-relaxed border border-sky-100">
          <p>
            <strong>Não encontrou sua cidade?</strong><br/>
            Você pode acessar qualquer cidade do Brasil digitando a URL diretamente. Exemplo: <code className="bg-white px-1 py-0.5 rounded border border-sky-200">/carregador-eletrico/ribeirao-preto-sp</code>.
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
}
