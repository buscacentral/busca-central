'use client';

import { useState } from 'react';

export default function CalculadoraCombustivelFlexClient() {
  const [etanolStr, setEtanolStr] = useState<string>('4.19');
  const [gasolinaStr, setGasolinaStr] = useState<string>('6.09');
  const [capacidadeTanque] = useState<number>(50);

  const etanol = parseFloat(etanolStr) || 0;
  const gasolina = parseFloat(gasolinaStr) || 0;

  // Regra dos 70%
  const razao = gasolina > 0 ? etanol / gasolina : 0;
  const porcentagem = (razao * 100).toFixed(1);
  const recomendaEtanol = razao > 0 && razao <= 0.7;

  // Cálculo de economia estimada para tanque cheio (50L)
  const custoTanqueGasolina = gasolina * capacidadeTanque;
  const custoTanqueEtanol = etanol * capacidadeTanque;
  
  // O etanol rende ~70% da gasolina, então precisamos de mais litros de etanol para a mesma autonomia
  const litrosEtanolEquivalente = capacidadeTanque / 0.7;
  const custoAutonomiaEquivalenteEtanol = etanol * litrosEtanolEquivalente;
  const economiaEstimada = Math.abs(custoTanqueGasolina - custoAutonomiaEquivalenteEtanol);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
          ⛽ Calculadora Rápida para Postos de Combustível
        </span>
        <h2 className="text-xl md:text-2xl font-black text-slate-900">
          Álcool ou Gasolina: Qual vale mais a pena agora?
        </h2>
        <p className="text-sm text-slate-600">
          Insira os preços cobrados no posto e veja instantaneamente qual combustível traz economia real para o seu carro flex.
        </p>
      </div>

      {/* Formulário de Input em Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {/* Campo Preço Etanol */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-2">
          <label htmlFor="etanol-price" className="block text-xs font-extrabold text-emerald-800 uppercase tracking-wide">
            Preço do Álcool (Etanol) por Litro
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-slate-500 text-sm">
              R$
            </span>
            <input
              id="etanol-price"
              type="number"
              step="0.01"
              min="0"
              value={etanolStr}
              onChange={(e) => setEtanolStr(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 bg-white border border-emerald-300 rounded-lg font-black text-slate-900 text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Campo Preço Gasolina */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 space-y-2">
          <label htmlFor="gasolina-price" className="block text-xs font-extrabold text-amber-800 uppercase tracking-wide">
            Preço da Gasolina por Litro
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-slate-500 text-sm">
              R$
            </span>
            <input
              id="gasolina-price"
              type="number"
              step="0.01"
              min="0"
              value={gasolinaStr}
              onChange={(e) => setGasolinaStr(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 bg-white border border-amber-300 rounded-lg font-black text-slate-900 text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Resultado Destacado acima do Dobra */}
      {etanol > 0 && gasolina > 0 ? (
        <div className="max-w-2xl mx-auto space-y-4">
          <div
            className={`p-6 rounded-2xl border text-center transition-all ${
              recomendaEtanol
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-100 shadow-lg'
                : 'bg-amber-500 text-white border-amber-600 shadow-amber-100 shadow-lg'
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-1">
              Resultado da Regra dos 70%
            </p>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              {recomendaEtanol ? 'Abasteça com ÁLCOOL (Etanol)' : 'Abasteça com GASOLINA'}
            </h3>
            <p className="text-sm mt-2 font-medium opacity-95">
              O preço do álcool equivale a <strong>{porcentagem}%</strong> do preço da gasolina.
            </p>
          </div>

          {/* Card Detalhado de Proporção e Economia */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase">Proporção Etanol/Gasolina</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{porcentagem}%</p>
              <p className="text-xs text-slate-500 mt-0.5">Limite de vantagem: 70%</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase">Tanque Cheio ({capacidadeTanque}L)</p>
              <p className="text-xl font-bold text-slate-900 mt-1">
                Álcool: R$ {custoTanqueEtanol.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-xs text-slate-500">Gasolina: R$ {custoTanqueGasolina.toFixed(2).replace('.', ',')}</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <p className="text-xs font-bold text-emerald-800 uppercase">Economia por Tanque</p>
              <p className="text-2xl font-black text-emerald-900 mt-1">
                ~ R$ {economiaEstimada.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-xs text-emerald-700 mt-0.5">Com base na autonomia equivalente</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-500 text-sm">
          Informe o valor por litro dos dois combustíveis acima para ver a recomendação.
        </div>
      )}
    </div>
  );
}
