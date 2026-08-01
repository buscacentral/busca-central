'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ResultCard } from '@/components/ui/ResultCard';

// ---------------------------------------------------------------------------
// TIPOS
// ---------------------------------------------------------------------------
type TabMode = 'viagem' | 'autonomia' | 'etanol';

// ---------------------------------------------------------------------------
// Componente interno que consome useSearchParams (requer Suspense boundary)
// ---------------------------------------------------------------------------
function CalculadoraForm() {
  const searchParams = useSearchParams();

  // Tab state
  const [activeTab, setActiveTab] = useState<TabMode>('viagem');

  // ─── Modo Viagem ──────────────────────────────────────────────────────────
  const [distancia, setDistancia] = useState<string>('');
  const [consumo, setConsumo] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [resultado, setResultado] = useState<{
    litros: number;
    custoTotal: number;
    custoKm: number;
  } | null>(null);

  // ─── Modo Autonomia por Valor (R$) ────────────────────────────────────────
  const [autonomiaValor, setAutonomiaValor] = useState<string>('');
  const [autonomiaPreco, setAutonomiaPreco] = useState<string>('');
  const [autonomiaConsumo, setAutonomiaConsumo] = useState<string>('');
  const [autonomiaResultado, setAutonomiaResultado] = useState<{
    litros: number;
    km: number;
  } | null>(null);

  // ─── Modo Comparar Etanol/Gasolina ────────────────────────────────────────
  const [precoGasolina, setPrecoGasolina] = useState<string>('');
  const [precoEtanol, setPrecoEtanol] = useState<string>('');
  const [etanolResultado, setEtanolResultado] = useState<{
    percentual: number;
    compensa: 'etanol' | 'gasolina';
  } | null>(null);

  // Contexto de rota (vindo da página de distância)
  const [rotaContexto, setRotaContexto] = useState<{ origem: string; destino: string } | null>(null);

  useEffect(() => {
    const d = searchParams.get('distancia');
    const origem = searchParams.get('origem');
    const destino = searchParams.get('destino');

    if (d) {
      const formatted = d.replace('.', ',');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDistancia(formatted);
    }
    if (origem && destino) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRotaContexto({ origem: decodeURIComponent(origem), destino: decodeURIComponent(destino) });
    }
  }, [searchParams]);

  // ─── Formatters ───────────────────────────────────────────────────────────
  const formatCurrencyInput = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (!num) return '';
    return (Number(num) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const formatDecimalInput = (value: string) => {
    let v = value.replace(/[^\d,]/g, '');
    const parts = v.split(',');
    if (parts.length > 2) v = parts[0] + ',' + parts.slice(1).join('');
    return v;
  };

  const parseNumber = (value: string) => {
    if (!value) return 0;
    return Number(value.replace(/\./g, '').replace(',', '.'));
  };

  const formatarMoeda = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // ─── Cálculos ─────────────────────────────────────────────────────────────
  const calcularViagem = () => {
    const dist = parseNumber(distancia);
    const cons = parseNumber(consumo);
    const prc = parseNumber(preco);
    if (dist <= 0 || cons <= 0 || prc <= 0) return;

    const litros = dist / cons;
    const custoTotal = litros * prc;
    const custoKm = custoTotal / dist;
    setResultado({ litros, custoTotal, custoKm });
  };

  const calcularAutonomia = () => {
    const valor = parseNumber(autonomiaValor);
    const prc = parseNumber(autonomiaPreco);
    const cons = parseNumber(autonomiaConsumo);
    if (valor <= 0 || prc <= 0 || cons <= 0) return;

    const litros = valor / prc;
    const km = litros * cons;
    setAutonomiaResultado({ litros, km });
  };

  const calcularEtanol = () => {
    const gas = parseNumber(precoGasolina);
    const eta = parseNumber(precoEtanol);
    if (gas <= 0 || eta <= 0) return;

    const percentual = (eta / gas) * 100;
    const compensa = percentual <= 70 ? 'etanol' : 'gasolina';
    setEtanolResultado({ percentual, compensa });
  };

  // ─── Tab Navigation ───────────────────────────────────────────────────────
  const tabs: { id: TabMode; label: string; icon: string }[] = [
    { id: 'viagem', label: 'Custo da Viagem', icon: '🛣️' },
    { id: 'autonomia', label: 'Autonomia por Valor (R$)', icon: '⛽' },
    { id: 'etanol', label: 'Etanol ou Gasolina?', icon: '🔄' },
  ];

  return (
    <>
      {/* Banner de contexto de rota */}
      {rotaContexto && activeTab === 'viagem' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200/60 rounded-xl flex items-center gap-3">
          <span className="text-2xl">🗺️</span>
          <p className="text-sm text-gray-700">
            Calculando combustível para a viagem de{' '}
            <strong>{rotaContexto.origem}</strong> a{' '}
            <strong>{rotaContexto.destino}</strong> — distância de{' '}
            <strong>{distancia} km</strong> já preenchida.
          </p>
        </div>
      )}

      {/* ================================================================= */}
      {/* TABS DE NAVEGAÇÃO                                                  */}
      {/* ================================================================= */}
      <div className="mb-6">
        <nav className="flex flex-col sm:flex-row gap-1 sm:gap-0 bg-slate-100 p-1 rounded-xl" aria-label="Modos de cálculo">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              <span className="text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: CUSTO DA VIAGEM                                             */}
      {/* ================================================================= */}
      {activeTab === 'viagem' && (
        <>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Distância da Viagem</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={distancia}
                    onChange={(e) => setDistancia(formatDecimalInput(e.target.value))}
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="Ex: 150,5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">km</span>
                </div>
                <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                  <span>Não sabe a distância?</span>
                  <a href="/localizacao/distancia-cidades" className="text-sky-600 hover:underline font-medium">Calcule a rota 📍</a>
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Consumo do Veículo</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={consumo}
                    onChange={(e) => setConsumo(formatDecimalInput(e.target.value))}
                    className="w-full pl-4 pr-16 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="Ex: 12,5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">km/L</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preço do Combustível</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={preco}
                    onChange={(e) => setPreco(formatCurrencyInput(e.target.value))}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button onClick={calcularViagem} className="w-full sm:w-auto px-12 py-3 text-lg" disabled={!distancia || !consumo || !preco}>
                Calcular Viagem
              </Button>
            </div>
          </div>

          {resultado && (
            <ResultCard title="Resultado do Cálculo">
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 text-center mb-6">
                <p className="text-sm font-bold text-sky-800 uppercase tracking-wider mb-2">Custo Total da Viagem</p>
                <p className="text-4xl sm:text-5xl font-black text-sky-600">
                  {formatarMoeda(resultado.custoTotal)}
                </p>
                {rotaContexto && (
                  <p className="text-xs text-sky-700 mt-2">
                    {rotaContexto.origem} → {rotaContexto.destino} ({distancia} km)
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase">Combustível Necessário</p>
                  <p className="text-2xl font-bold text-slate-700 mt-2">{resultado.litros.toFixed(1)} <span className="text-lg text-slate-500">Litros</span></p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase">Custo por Quilômetro</p>
                  <p className="text-2xl font-bold text-slate-700 mt-2">{formatarMoeda(resultado.custoKm)} <span className="text-lg text-slate-500">/ km</span></p>
                </div>
              </div>
              <div className="text-xs text-slate-500 text-center mt-6">
                * O consumo real pode variar de acordo com o trânsito, uso do ar condicionado e condições da via.
              </div>
            </ResultCard>
          )}
        </>
      )}

      {/* ================================================================= */}
      {/* TAB 2: AUTONOMIA POR VALOR (R$)                                    */}
      {/* ================================================================= */}
      {activeTab === 'autonomia' && (
        <>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800">Quanto rende o meu abastecimento?</h2>
              <p className="text-sm text-slate-500 mt-1">
                Descubra quantos <strong>litros</strong> você compra e quantos <strong>quilômetros</strong> consegue rodar com o valor investido.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Valor a abastecer</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={autonomiaValor}
                    onChange={(e) => setAutonomiaValor(formatCurrencyInput(e.target.value))}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="100,00"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400">Quanto vai colocar na bomba</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preço do Litro</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={autonomiaPreco}
                    onChange={(e) => setAutonomiaPreco(formatCurrencyInput(e.target.value))}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="5,99"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400">Preço na bomba (gasolina, etanol ou diesel)</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Consumo do Carro</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={autonomiaConsumo}
                    onChange={(e) => setAutonomiaConsumo(formatDecimalInput(e.target.value))}
                    className="w-full pl-4 pr-16 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">km/L</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Média do seu veículo</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={calcularAutonomia}
                className="w-full sm:w-auto px-12 py-3 text-lg"
                disabled={!autonomiaValor || !autonomiaPreco || !autonomiaConsumo}
              >
                Calcular Autonomia
              </Button>
            </div>
          </div>

          {/* Resultado Autonomia */}
          {autonomiaResultado && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-6 text-center">
                <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-2">Litros Comprados</p>
                <p className="text-5xl font-black text-emerald-600">
                  {autonomiaResultado.litros.toFixed(1)}
                </p>
                <p className="text-sm text-emerald-600 mt-1 font-medium">litros</p>
              </div>
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-2xl p-6 text-center">
                <p className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-2">Distância que vai rodar</p>
                <p className="text-5xl font-black text-sky-600">
                  {autonomiaResultado.km.toFixed(0)}
                </p>
                <p className="text-sm text-sky-600 mt-1 font-medium">quilômetros</p>
              </div>
            </div>
          )}

          {/* Tabela de referência rápida */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-base font-bold text-slate-800 mb-3">Referência rápida — Quantos litros por valor</h3>
            <p className="text-xs text-slate-500 mb-4">Gasolina a R$ 6,00/L (média nacional)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[50, 100, 150, 200].map((valor) => {
                const litros = valor / 6;
                return (
                  <div key={valor} className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-slate-500">R$ {valor}</p>
                    <p className="text-lg font-bold text-slate-700">{litros.toFixed(1)} L</p>
                    <p className="text-xs text-slate-400">{(litros * 10).toFixed(0)} km</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SEO On-Page — Texto otimizado para buscas exatas */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Quantos litros de gasolina dá com R$ 100?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Quer saber <strong>quantos litros de gasolina dá com R$ 100</strong> ou <strong>R$ 150</strong>?
              Use o simulador acima para descobrir a autonomia exata do seu carro por valor investido.
              A conta é simples: divida o valor que deseja abastecer pelo preço do litro na bomba.
              Com a gasolina a R$ 6,00, por exemplo, R$ 100 compram aproximadamente <strong>16,7 litros</strong> — o suficiente
              para rodar cerca de <strong>200 km</strong> em um carro popular que faz 12 km/L.
              Já com <strong>R$ 150</strong>, são 25 litros e aproximadamente <strong>300 km</strong> de autonomia.
              Para etanol ou diesel, basta alterar o preço do litro acima e recalcular.
            </p>
          </div>
        </>
      )}

      {/* ================================================================= */}
      {/* TAB 3: COMPARAR ETANOL VS GASOLINA                                 */}
      {/* ================================================================= */}
      {activeTab === 'etanol' && (
        <>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-800">Etanol ou gasolina: qual compensa?</h2>
              <p className="text-sm text-slate-500 mt-1">
                A <strong>regra dos 70%</strong>: se o etanol custar até 70% do preço da gasolina, ele compensa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preço da Gasolina</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={precoGasolina}
                    onChange={(e) => setPrecoGasolina(formatCurrencyInput(e.target.value))}
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="5,99"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">/litro</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preço do Etanol</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={precoEtanol}
                    onChange={(e) => setPrecoEtanol(formatCurrencyInput(e.target.value))}
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    placeholder="3,99"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">/litro</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={calcularEtanol}
                className="w-full sm:w-auto px-12 py-3 text-lg"
                disabled={!precoGasolina || !precoEtanol}
              >
                Comparar
              </Button>
            </div>
          </div>

          {/* Resultado Etanol vs Gasolina */}
          {etanolResultado && (
            <div className={`rounded-2xl p-6 text-center mb-8 border ${
              etanolResultado.compensa === 'etanol'
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
            }`}>
              <p className="text-sm font-bold uppercase tracking-wider mb-2 text-slate-600">
                O etanol está a {etanolResultado.percentual.toFixed(1)}% do preço da gasolina
              </p>
              <p className="text-3xl sm:text-4xl font-black mb-2">
                {etanolResultado.compensa === 'etanol' ? (
                  <span className="text-green-600">Etanol compensa! ✅</span>
                ) : (
                  <span className="text-amber-600">Gasolina compensa! ⛽</span>
                )}
              </p>
              <p className="text-sm text-slate-600">
                {etanolResultado.compensa === 'etanol'
                  ? `A ${etanolResultado.percentual.toFixed(1)}% (abaixo de 70%), o etanol entrega mais km por real gasto.`
                  : `A ${etanolResultado.percentual.toFixed(1)}% (acima de 70%), a gasolina rende mais km por real gasto.`
                }
              </p>
            </div>
          )}

          {/* Explicação SEO */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Como funciona a regra dos 70%?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              O etanol rende cerca de <strong>70% dos km/L</strong> que a gasolina rende no mesmo veículo.
              Portanto, se o preço do etanol for até 70% do preço da gasolina, ele compensa financeiramente.
              Exemplo: gasolina a R$ 6,00 — o etanol compensa se estiver <strong>abaixo de R$ 4,20</strong>.
              Acima disso, abasteça com gasolina.
            </p>
          </div>
        </>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Fallback de loading para o Suspense boundary
// ---------------------------------------------------------------------------
function CalculadoraFallback() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8 animate-pulse">
      <div className="h-12 bg-slate-100 rounded-xl mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-20 bg-slate-100 rounded-lg" />
        <div className="h-20 bg-slate-100 rounded-lg" />
        <div className="h-20 bg-slate-100 rounded-lg" />
      </div>
      <div className="mt-8 flex justify-center">
        <div className="h-12 w-48 bg-slate-100 rounded-lg" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Componente exportado — envolve o formulário em <Suspense>
// ---------------------------------------------------------------------------
export default function CalculadoraCombustivelClient() {
  return (
    <Suspense fallback={<CalculadoraFallback />}>
      <CalculadoraForm />
    </Suspense>
  );
}
