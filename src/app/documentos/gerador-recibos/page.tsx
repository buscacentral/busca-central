import React from 'react';
import { Metadata } from 'next';
import GeradorReciboClient from './GeradorReciboClient';
import AdPlaceholder from '@/components/AdPlaceholder';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Gerador de Recibos em PDF Grátis (${year})`,
  description: 'Gere recibos de pagamento simples e profissionais. Preencha, imprima ou salve em PDF. Grátis e sem cadastro.',
  keywords: 'gerador de recibo, recibo simples, recibo de pagamento, recibo pdf, imprimir recibo, modelo de recibo',
};

export default function GeradorRecibosPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 no-print">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Gerador de Recibos Simples
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Crie recibos de pagamento profissionais em segundos. Preencha os campos abaixo e clique em imprimir para salvar como PDF ou mandar direto para a impressora.
          </p>
        </div>

        <GeradorReciboClient />

        <div className="mt-12 no-print">
          <AdPlaceholder position="middle" />
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 no-print">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Como funciona o Gerador de Recibos?</h2>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Nosso gerador de recibos online foi desenhado para profissionais liberais, autônomos, freelancers e pequenos negócios que precisam emitir comprovantes de pagamento rápidos, sem depender de talonários de papel ou sistemas complexos de faturamento.
            </p>

            <h3 className="text-lg font-bold text-slate-800">Privacidade Garantida (LGPD)</h3>
            <p>
              Ao contrário de outros geradores de recibo na internet, nós não salvamos os dados do pagador ou do recebedor em nossos bancos de dados. Todo o processamento é feito <strong>localmente no seu navegador</strong>. Assim que você fecha a página, os dados desaparecem. 
            </p>

            <h3 className="text-lg font-bold text-slate-800">Como salvar como PDF?</h3>
            <p>
              Quando você clica no botão <strong>Imprimir PDF</strong>, o próprio sistema operacional abre a janela de impressão. Nela, basta alterar o campo "Destino" (ou "Impressora") para a opção <strong>"Salvar como PDF"</strong>. O layout do site é programado para esconder os botões e menus, deixando no PDF apenas o desenho do recibo limpo e profissional.
            </p>

            <h3 className="text-lg font-bold text-slate-800">O recibo simples tem validade legal?</h3>
            <p>
              Sim, o recibo simples assinado por quem recebe o dinheiro é um documento válido para comprovar a quitação de uma dívida ou o pagamento de um serviço. Para dar ainda mais força jurídica ao documento, certifique-se de preencher corretamente o nome completo e o CPF/CNPJ de ambas as partes e, claro, recolher a assinatura física ou digital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
