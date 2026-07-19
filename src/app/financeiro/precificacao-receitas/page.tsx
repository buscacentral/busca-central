import React from 'react';
import { Metadata } from 'next';
import PrecificacaoClient from './PrecificacaoClient';
import AdPlaceholder from '@/components/AdPlaceholder';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Calculadora Precificação de Receitas (${year})`,
  description: `Calcule o custo real da sua receita, adicione custos invisíveis e embalagem. Defina margem de lucro e preço de venda. Grátis.`,
  keywords: 'precificação de receitas, calcular custo de receita, preço de venda bolo, calcular lucro doce, calculadora confeitaria',
};

export default function PrecificacaoPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Calculadora de Precificação de Receitas
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Saiba exatamente quanto custa cada ingrediente usado e descubra o <strong>preço ideal de venda</strong> para garantir seu lucro, sem achismos.
          </p>
        </div>

        <PrecificacaoClient />

        <div className="mt-12">
          <AdPlaceholder position="middle" />
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Como calcular o preço de venda de um produto?</h2>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Muitos empreendedores do ramo de alimentação, confeitaria e artesanato perdem dinheiro porque não sabem precificar corretamente os seus produtos. A regra de "multiplicar por 3" já está ultrapassada e não reflete a realidade dos custos atuais.
            </p>

            <h3 className="text-lg font-bold text-slate-800">1. Calcule o custo exato dos ingredientes (Ficha Técnica)</h3>
            <p>
              O primeiro passo é saber o custo proporcional de cada ingrediente. Se você compra um saco de farinha de 1kg por R$ 5,00 e usa apenas 250g na receita, o custo da farinha para aquela receita é de R$ 1,25. Nossa calculadora faz essa conversão automaticamente para você.
            </p>

            <h3 className="text-lg font-bold text-slate-800">2. Adicione os custos invisíveis (Custos Fixos)</h3>
            <p>
              Água, luz, gás, detergente, sua internet e o desgaste dos equipamentos. Tudo isso precisa entrar na conta. Geralmente, adiciona-se uma margem de segurança entre <strong>10% e 20%</strong> sobre o valor total dos ingredientes para cobrir esses custos operacionais.
            </p>

            <h3 className="text-lg font-bold text-slate-800">3. Custos de Embalagem</h3>
            <p>
              Caixas, fitas, etiquetas, sacolas e até o adesivo com a sua logomarca devem ser somados ao custo de cada unidade produzida, pois são custos diretos vinculados à venda.
            </p>

            <h3 className="text-lg font-bold text-slate-800">4. Aplique a Margem de Lucro (Markup)</h3>
            <p>
              O lucro é o dinheiro que sobra <strong>limpo</strong> para a empresa crescer, não o seu salário (o seu salário/hora trabalhada deveria entrar nos custos fixos). Para garantir, por exemplo, 30% de lucro líquido, a fórmula correta de markup divisor é utilizada: <code>Preço = Custo Total / (1 - Margem/100)</code>. Nossa calculadora já aplica essa fórmula profissional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
