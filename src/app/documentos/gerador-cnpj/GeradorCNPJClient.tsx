'use client';

import { useState } from 'react';
import { generateCNPJ } from '@/lib/cnpj';
import CopyButton from '@/components/CopyButton';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ResultCard } from '@/components/ui/ResultCard';

export default function GeradorCNPJClient() {
  const [cnpj, setCnpj] = useState('');
  const [formatted, setFormatted] = useState(true);

  const handleGenerate = () => {
    setCnpj(generateCNPJ(formatted));
  };

  return (
    <>
      {/* Disclaimer Banner */}
      <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 rounded-r-xl shadow-sm text-sm">
        <p className="flex items-start gap-2">
          <span className="text-base select-none leading-none">⚠️</span>
          <span>
            <strong>Atenção:</strong> os CNPJs gerados aqui são fictícios e servem apenas para testes de sistemas e QA. Eles não representam empresas reais e não devem ser usados para fins comerciais, fiscais ou de cadastro.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={formatted}
                  onChange={(e) => setFormatted(e.target.checked)}
                  className="peer w-5 h-5 border-2 border-slate-300 rounded-md appearance-none checked:bg-sky-600 checked:border-sky-600 transition-colors cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Formatado (00.000.000/0001-00)</span>
            </label>
          </div>

          <Button onClick={handleGenerate} className="w-full">
            Gerar Novo CNPJ
          </Button>
        </div>

        <Alert variant="warning">
          Os dados gerados são fictícios, criados exclusivamente para fins de teste e desenvolvimento. É proibido utilizar estes dados para cadastros reais, fraudes ou qualquer atividade ilícita.
        </Alert>
      </div>

      <div className="lg:col-span-7">
        {cnpj && (
          <ResultCard title="CNPJ Gerado" className="animate-fade-in">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Número Válido</span>
                <CopyButton text={cnpj} />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 rounded-l-xl"></div>
                <p className="text-4xl font-mono font-black text-slate-800 tracking-wider relative z-10 selection:bg-sky-200 selection:text-sky-900">
                  {cnpj}
                </p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/50 pointer-events-none z-0"></div>
              </div>
            </div>
          </ResultCard>
        )}
        {!cnpj && (
          <div className="h-full flex items-center justify-center min-h-[250px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
             <div className="text-center p-6 opacity-60">
               <span className="text-4xl mb-3 block">🏢</span>
               <p className="text-sm font-medium text-slate-600">Clique em "Gerar" para criar um CNPJ.</p>
             </div>
          </div>
        )}
      </div>
    </div>

      <article className="mt-12 prose prose-gray max-w-none">
        <h2>Como funciona o Gerador de CNPJ?</h2>
        <p>
          O gerador cria números de CNPJ válidos utilizando o algoritmo de cálculo dos dígitos 
          verificadores definido pela Receita Federal. O CNPJ é composto por 14 dígitos, sendo 
          8 da raiz, 4 do estabelecimento e 2 dígitos verificadores.
        </p>
        <h2>Para que serve?</h2>
        <p>
          CNPJs gerados são úteis para testar sistemas que fazem validação de cadastro de empresas, 
          emitir notas fiscais de teste ou criar dados fictícios em ambientes de desenvolvimento.
        </p>
      </article>
    </>
  );
}
