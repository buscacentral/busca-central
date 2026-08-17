'use client';

import { useState } from 'react';
import { usePersistentState } from '@/hooks/usePersistentState';
import ShareWhatsAppButton from '@/components/ui/ShareWhatsAppButton';

// ---------------------------------------------------------------------------
// TIPOS
// ---------------------------------------------------------------------------
interface ResultadoCLT {
  salarioBruto: number;
  inss: number;
  irrf: number;
  salarioLiquido: number;
  beneficios: number;
  decimoTerceiroMensal: number;
  feriasMensal: number;
  fgtsMensal: number;
  rendimentoLiquidoReal: number;
}

interface ResultadoPJ {
  faturamento: number;
  impostoSimples: number;
  custoContador: number;
  rendimentoLiquidoReal: number;
}

// ---------------------------------------------------------------------------
// TABELAS INSS 2024 (progressiva)
// ---------------------------------------------------------------------------
const FAIXAS_INSS = [
  { limite: 1518.0, aliquota: 0.075 },
  { limite: 2793.88, aliquota: 0.09 },
  { limite: 4190.83, aliquota: 0.12 },
  { limite: 8157.41, aliquota: 0.14 },
] as const;

function calcularINSS(salario: number): number {
  if (salario <= 0) return 0;
  const teto = 8157.41;
  if (salario > teto) salario = teto;

  let inss = 0;
  let anterior = 0;

  for (const faixa of FAIXAS_INSS) {
    if (salario <= faixa.limite) {
      inss += (salario - anterior) * faixa.aliquota;
      break;
    } else {
      inss += (faixa.limite - anterior) * faixa.aliquota;
      anterior = faixa.limite;
    }
  }

  return inss;
}

// ---------------------------------------------------------------------------
// TABELA IRRF 2024 (progressiva)
// ---------------------------------------------------------------------------
const FAIXAS_IRRF = [
  { limite: 2259.2, aliquota: 0, deducao: 0 },
  { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { limite: Infinity, aliquota: 0.275, deducao: 896.0 },
] as const;

function calcularIRRF(baseCalculo: number): number {
  if (baseCalculo <= 0) return 0;

  for (const faixa of FAIXAS_IRRF) {
    if (baseCalculo <= faixa.limite) {
      const irrf = baseCalculo * faixa.aliquota - faixa.deducao;
      return irrf > 0 ? irrf : 0;
    }
  }
  return 0;
}

// ---------------------------------------------------------------------------
// FORMATADORES
// ---------------------------------------------------------------------------
function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

function parseInput(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function formatInputCurrency(value: string): string {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  return (Number(num) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// ---------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------------------------------
export default function CalculadoraCLTPJClient() {
  // Inputs
  const [salarioBruto, setSalarioBruto] = usePersistentState<string>('clt_pj_salario_bruto', '');
  const [beneficiosCLT, setBeneficiosCLT] = usePersistentState<string>('clt_pj_beneficios', '');
  const [faturamentoPJ, setFaturamentoPJ] = usePersistentState<string>('clt_pj_faturamento', '');
  const [custoContador, setCustoContador] = usePersistentState<string>('clt_pj_contador', '100,00');

  // Resultado
  const [resultadoCLT, setResultadoCLT] = useState<ResultadoCLT | null>(null);
  const [resultadoPJ, setResultadoPJ] = useState<ResultadoPJ | null>(null);

  // ---------- CALCULAR ----------
  const handleCalcular = () => {
    const bruto = parseInput(salarioBruto);
    const beneficios = parseInput(beneficiosCLT);
    const faturamento = parseInput(faturamentoPJ);
    const contador = parseInput(custoContador);

    if (bruto <= 0 && faturamento <= 0) return;

    // === CLT ===
    const inss = calcularINSS(bruto);
    const baseIRRF = bruto - inss;
    const irrf = calcularIRRF(baseIRRF);
    const salarioLiquido = bruto - inss - irrf;

    // Provisoes mensais
    const decimoTerceiroMensal = bruto / 12;
    const feriasComTerco = (bruto + bruto / 3) / 12; // 1/12 de (salario + 1/3)
    const fgtsMensal = bruto * 0.08;

    const rendimentoCLT =
      salarioLiquido + beneficios + decimoTerceiroMensal + feriasComTerco + fgtsMensal;

    setResultadoCLT({
      salarioBruto: bruto,
      inss,
      irrf,
      salarioLiquido,
      beneficios,
      decimoTerceiroMensal,
      feriasMensal: feriasComTerco,
      fgtsMensal,
      rendimentoLiquidoReal: rendimentoCLT,
    });

    // === PJ ===
    const aliquotaSimples = 0.06; // Anexo III faixa inicial
    const impostoSimples = faturamento * aliquotaSimples;
    const rendimentoPJ = faturamento - impostoSimples - contador;

    setResultadoPJ({
      faturamento,
      impostoSimples,
      custoContador: contador,
      rendimentoLiquidoReal: rendimentoPJ,
    });
  };

  const melhorOpcao =
    resultadoCLT && resultadoPJ
      ? resultadoCLT.rendimentoLiquidoReal >= resultadoPJ.rendimentoLiquidoReal
        ? 'CLT'
        : 'PJ'
      : null;

  return (
    <div className="space-y-8">
      {/* ================================================================= */}
      {/* FORMULARIO DE ENTRADA — Tema escuro com detalhes dourados          */}
      {/* ================================================================= */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">
            ⚖️
          </span>
          Dados da Simulação
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna CLT */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Proposta CLT
              </h3>
            </div>

            <div>
              <label
                htmlFor="salario-bruto"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Salário Bruto CLT (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                  R$
                </span>
                <input
                  id="salario-bruto"
                  type="text"
                  inputMode="numeric"
                  value={salarioBruto}
                  onChange={(e) => setSalarioBruto(formatInputCurrency(e.target.value))}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                  placeholder="5.000,00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="beneficios-clt"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Benefícios Mensais CLT (R$)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                  R$
                </span>
                <input
                  id="beneficios-clt"
                  type="text"
                  inputMode="numeric"
                  value={beneficiosCLT}
                  onChange={(e) => setBeneficiosCLT(formatInputCurrency(e.target.value))}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                  placeholder="1.500,00"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                VR + VA + Plano de Saúde somados
              </p>
            </div>
          </div>

          {/* Coluna PJ */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                Proposta PJ
              </h3>
            </div>

            <div>
              <label
                htmlFor="faturamento-pj"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Faturamento PJ Proposto (R$/mês)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                  R$
                </span>
                <input
                  id="faturamento-pj"
                  type="text"
                  inputMode="numeric"
                  value={faturamentoPJ}
                  onChange={(e) => setFaturamentoPJ(formatInputCurrency(e.target.value))}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                  placeholder="10.000,00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="custo-contador"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Custo Contador / Taxas PJ (R$/mês)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">
                  R$
                </span>
                <input
                  id="custo-contador"
                  type="text"
                  inputMode="numeric"
                  value={custoContador}
                  onChange={(e) => setCustoContador(formatInputCurrency(e.target.value))}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium"
                  placeholder="100,00"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Contabilidade + DAS + taxas bancárias
              </p>
            </div>
          </div>
        </div>

        {/* Botao Calcular */}
        <div className="mt-8">
          <button
            onClick={handleCalcular}
            disabled={!salarioBruto && !faturamentoPJ}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-lg rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
          >
            Calcular Comparação
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* RESULTADOS — Cards XXL lado a lado                                 */}
      {/* ================================================================= */}
      {resultadoCLT && resultadoPJ && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Cards comparativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card CLT */}
            <div
              className={`relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                melhorOpcao === 'CLT'
                  ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-lg shadow-emerald-100'
                  : 'border-slate-200 bg-white shadow-sm'
              }`}
            >
              {melhorOpcao === 'CLT' && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
                  Melhor
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  💼
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Regime CLT</h3>
                  <p className="text-xs text-slate-500">Carteira assinada</p>
                </div>
              </div>

              {/* Valor destaque */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Rendimento Líquido Real
                </p>
                <p
                  className={`text-3xl sm:text-4xl font-black ${
                    melhorOpcao === 'CLT' ? 'text-emerald-600' : 'text-slate-800'
                  }`}
                >
                  {formatCurrency(resultadoCLT.rendimentoLiquidoReal)}
                </p>
                <p className="text-xs text-slate-500 mt-1">por mês (inclui provisões)</p>
              </div>

              {/* Breakdown */}
              <dl className="space-y-2 text-sm border-t border-slate-200 pt-4">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Salário Bruto</dt>
                  <dd className="font-medium text-slate-800">
                    {formatCurrency(resultadoCLT.salarioBruto)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-red-500">(-) INSS</dt>
                  <dd className="font-medium text-red-600">
                    - {formatCurrency(resultadoCLT.inss)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-red-500">(-) IRRF</dt>
                  <dd className="font-medium text-red-600">
                    - {formatCurrency(resultadoCLT.irrf)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2">
                  <dt className="font-semibold text-slate-700">= Líquido Mensal</dt>
                  <dd className="font-bold text-slate-800">
                    {formatCurrency(resultadoCLT.salarioLiquido)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-emerald-600">(+) Benefícios</dt>
                  <dd className="text-emerald-700">
                    + {formatCurrency(resultadoCLT.beneficios)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-emerald-600">(+) 13º (1/12)</dt>
                  <dd className="text-emerald-700">
                    + {formatCurrency(resultadoCLT.decimoTerceiroMensal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-emerald-600">(+) Férias + 1/3 (1/12)</dt>
                  <dd className="text-emerald-700">
                    + {formatCurrency(resultadoCLT.feriasMensal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-emerald-600">(+) FGTS (8%)</dt>
                  <dd className="text-emerald-700">
                    + {formatCurrency(resultadoCLT.fgtsMensal)}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Card PJ */}
            <div
              className={`relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                melhorOpcao === 'PJ'
                  ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-lg shadow-emerald-100'
                  : 'border-slate-200 bg-white shadow-sm'
              }`}
            >
              {melhorOpcao === 'PJ' && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
                  Melhor
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
                  🏢
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Regime PJ</h3>
                  <p className="text-xs text-slate-500">Pessoa Jurídica (Simples Nacional)</p>
                </div>
              </div>

              {/* Valor destaque */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Rendimento Líquido Real
                </p>
                <p
                  className={`text-3xl sm:text-4xl font-black ${
                    melhorOpcao === 'PJ' ? 'text-emerald-600' : 'text-slate-800'
                  }`}
                >
                  {formatCurrency(resultadoPJ.rendimentoLiquidoReal)}
                </p>
                <p className="text-xs text-slate-500 mt-1">por mês (já descontado impostos)</p>
              </div>

              {/* Breakdown */}
              <dl className="space-y-2 text-sm border-t border-slate-200 pt-4">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Faturamento Bruto</dt>
                  <dd className="font-medium text-slate-800">
                    {formatCurrency(resultadoPJ.faturamento)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-red-500">(-) Simples Nacional (6%)</dt>
                  <dd className="font-medium text-red-600">
                    - {formatCurrency(resultadoPJ.impostoSimples)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-red-500">(-) Contabilidade/Taxas</dt>
                  <dd className="font-medium text-red-600">
                    - {formatCurrency(resultadoPJ.custoContador)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2">
                  <dt className="font-semibold text-slate-700">= Líquido PJ</dt>
                  <dd className="font-bold text-slate-800">
                    {formatCurrency(resultadoPJ.rendimentoLiquidoReal)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Bloco Comparativo Final */}
          <div
            className={`rounded-2xl border-2 p-6 sm:p-8 text-center ${
              melhorOpcao === 'PJ'
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300'
                : 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-300'
            }`}
          >
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Diferença Mensal
            </p>
            <p
              className={`text-4xl sm:text-5xl font-black mb-3 ${
                melhorOpcao === 'PJ' ? 'text-emerald-600' : 'text-blue-600'
              }`}
            >
              {melhorOpcao === 'PJ' ? '+' : '-'}{' '}
              {formatCurrency(
                Math.abs(
                  resultadoPJ.rendimentoLiquidoReal - resultadoCLT.rendimentoLiquidoReal
                )
              )}
            </p>
            <p className="text-base font-medium text-slate-700">
              {melhorOpcao === 'PJ'
                ? 'O regime PJ coloca mais dinheiro no seu bolso'
                : 'O regime CLT oferece um pacote melhor ao considerar todos os benefícios'}
            </p>
            <p className="text-xs text-slate-400 mt-3 mb-4">
              * Cálculo simplificado. Consulte um contador para decisões financeiras.
            </p>

            <div className="pt-4 border-t border-slate-200/80 flex justify-center">
              <ShareWhatsAppButton
                message={`⚖️ *Comparativo CLT x PJ — BuscaCentral*

💼 *Proposta CLT:*
• Salário Bruto: ${formatCurrency(resultadoCLT.salarioBruto)}
• Salário Líquido: ${formatCurrency(resultadoCLT.salarioLiquido)}
• Rendimento Real Mensal: ${formatCurrency(resultadoCLT.rendimentoLiquidoReal)} (inclui 13º, Férias e FGTS)

🏢 *Proposta PJ (Simples Nacional):*
• Faturamento Mensal: ${formatCurrency(resultadoPJ.faturamento)}
• Imposto Simples (6%): ${formatCurrency(resultadoPJ.impostoSimples)}
• Rendimento Líquido Real: ${formatCurrency(resultadoPJ.rendimentoLiquidoReal)} (já descontado impostos e contador)

🏆 *Veredito:* ${
                  melhorOpcao === 'PJ'
                    ? `O regime PJ rende + ${formatCurrency(resultadoPJ.rendimentoLiquidoReal - resultadoCLT.rendimentoLiquidoReal)} a mais por mês no bolso!`
                    : `O regime CLT é mais vantajoso (+ ${formatCurrency(resultadoCLT.rendimentoLiquidoReal - resultadoPJ.rendimentoLiquidoReal)}/mês ao considerar todos os benefícios)!`
                }`}
                buttonText="Compartilhar Comparativo no WhatsApp"
                url="https://buscacentral.com.br/financeiro/calculadora-clt-pj"
                className="w-full sm:w-auto justify-center"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
