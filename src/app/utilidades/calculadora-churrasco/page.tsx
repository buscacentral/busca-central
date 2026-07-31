import type { Metadata } from 'next';
import CalculadoraChurrascoClient from './CalculadoraChurrascoClient';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Calculadora de Churrasco: Quantidade ideal de carne e cerveja',
  description: 'Descubra a quantidade exata de carne, linguiça, cerveja e carvão que você precisa comprar para o seu churrasco. Calcule por homem, mulher e criança.',
  openGraph: {
    title: 'Calculadora de Churrasco Online',
    description: 'Evite desperdícios no seu churrasco. Calcule a lista de compras perfeita com base no número de convidados.',
    url: 'https://buscacentral.com.br/utilidades/calculadora-churrasco',
  }
};

export default function CalculadoraChurrascoPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Calculadora de Churrasco
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Não falte nem sobre comida! Informe quantos convidados vão participar e nós geramos a lista de compras perfeita com as quantidades recomendadas por churrasqueiros profissionais.
          </p>
        </header>

        <CalculadoraChurrascoClient />

        <div className="mt-8 mb-8">
          <AdBanner adSlot="auto" adFormat="auto" />
        </div>

        <div className="prose prose-slate max-w-none bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2>Como fazemos o cálculo para o churrasco perfeito?</h2>
          <p>
            Nossa calculadora utiliza as regras médias recomendadas pelos maiores mestres churrasqueiros do Brasil. 
            O cálculo varia o apetite baseado no perfil de cada convidado (adultos e crianças), garantindo 
            uma margem de segurança para que ninguém vá embora com fome ou sede.
          </p>
          
          <h3>Porções por pessoa:</h3>
          <ul>
            <li><strong>Homens:</strong> 500g de carne, 4 latas de cerveja, 500ml de água/refrigerante, e 150g de linguiça.</li>
            <li><strong>Mulheres:</strong> 400g de carne, 2 latas de cerveja, 500ml de água/refrigerante, e 100g de linguiça.</li>
            <li><strong>Crianças:</strong> 200g de carne, 500ml de água/refrigerante/suco e 50g de linguiça.</li>
          </ul>

          <h3>Dica sobre o Carvão</h3>
          <p>
            Uma das regras mais esquecidas é a do carvão. A regra de ouro é simples: <strong>1kg de carvão para cada 1kg de carne</strong>. 
            Nós já incluímos essa margem na sua lista de compras final, junto com o cálculo do gelo para as bebidas.
          </p>
        </div>
      </div>
    </main>
  );
}
