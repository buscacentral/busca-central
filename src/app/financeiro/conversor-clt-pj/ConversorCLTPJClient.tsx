'use client';

import { useState, useMemo } from 'react';
import {
  sanitizeNumber,
  calcularComparacaoCLTPJ,
  type InputCLT,
  type InputPJ,
} from '@/lib/clt-pj-logic';
import { formatCurrency } from '@/lib/formatters';
import { EmptyState } from '@/components/ui/EmptyState';
import { ResultCard } from '@/components/ui/ResultCard';
import AdBanner from '@/components/AdBanner';

export default function ConversorCLTPJClient() {
  const [salarioBruto, setSalarioBruto] = useState('5000');
  const [mesesTrabalhados, setMesesTrabalhados] = useState('12');
  const [valeRefeicao, setValeRefeicao] = useState('1000');
  const [planoSaude, setPlanoSaude] = useState('500');
  const [planoOdontologico, setPlanoOdontologico] = useState('80');
  const [valeTransporte, setValeTransporte] = useState('300');
  const [receberVT, setReceberVT] = useState(false);
  const [gympass, setGympass] = useState('100');
  const [outrosBeneficios, setOutrosBeneficios] = useState('0');
  const [plrAnual, setPlrAnual] = useState('0');
  const [valorContador, setValorContador] = useState('100');

  const resultado = useMemo(() => {
    const bruto = sanitizeNumber(salarioBruto);
    if (bruto <= 0) return null;

    const inputCLT: InputCLT = {
      salarioBruto: bruto,
      mesesTrabalhados: sanitizeNumber(mesesTrabalhados, 12),
      valeRefeicao: sanitizeNumber(valeRefeicao),
      planoSaude: sanitizeNumber(planoSaude),
      planoOdontologico: sanitizeNumber(planoOdontologico),
      valeTransporte: sanitizeNumber(valeTransporte),
      receberVT,
      gympass: sanitizeNumber(gympass),
      outrosBeneficios: sanitizeNumber(outrosBeneficios),
      plrAnual: sanitizeNumber(plrAnual),
    };

    const inputPJ: InputPJ = {
      contador: sanitizeNumber(valorContador),
      aliquotaSimples: 0.06,
    };

    return calcularComparacaoCLTPJ(inputCLT, inputPJ);
  }, [salarioBruto, mesesTrabalhados, valeRefeicao, planoSaude, planoOdontologico, valeTransporte, receberVT, gympass, outrosBeneficios, plrAnual, valorContador]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dados de Contratação</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="salario-bruto" className="block text-sm font-medium text-gray-700 mb-1">Salário Bruto CLT (R$)</label>
                <input id="salario-bruto" type="text" value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="5000" />
              </div>
              <div>
                <label htmlFor="meses-trabalhados" className="block text-sm font-medium text-gray-700 mb-1">Meses Trabalhados no Ano</label>
                <input id="meses-trabalhados" type="number" min="1" max="12" value={mesesTrabalhados} onChange={(e) => setMesesTrabalhados(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="12" />
                <p className="text-xs text-gray-400 mt-1">Usado para calcular 13º e férias proporcionais</p>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Benefícios CLT (Opcionais)</h2>
            <p className="text-xs text-gray-400 mb-4">Preencha os benefícios que você recebe hoje</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="vale-refeicao" className="block text-sm font-medium text-gray-700 mb-1">Vale Refeição/Alimentação (Mensal R$)</label>
                <input id="vale-refeicao" type="text" value={valeRefeicao} onChange={(e) => setValeRefeicao(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1000" />
              </div>
              <div>
                <label htmlFor="plano-saude" className="block text-sm font-medium text-gray-700 mb-1">Plano de Saúde (Mensal R$)</label>
                <input id="plano-saude" type="text" value={planoSaude} onChange={(e) => setPlanoSaude(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="500" />
              </div>
              <div>
                <label htmlFor="plano-odontologico" className="block text-sm font-medium text-gray-700 mb-1">Plano Odontológico (Mensal R$)</label>
                <input id="plano-odontologico" type="text" value={planoOdontologico} onChange={(e) => setPlanoOdontologico(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="80" />
              </div>
              <div>
                <label htmlFor="vale-transporte" className="block text-sm font-medium text-gray-700 mb-1">Vale Transporte (Mensal R$)</label>
                <div className="flex gap-3 items-center">
                  <input id="vale-transporte" type="text" value={valeTransporte} onChange={(e) => setValeTransporte(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="300" />
                  <label className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                    <input type="checkbox" checked={receberVT} onChange={(e) => setReceberVT(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    Receberei
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {receberVT
                    ? 'VT será contado como benefício (recebe o valor)'
                    : 'Desconto de até 6% do salário sobre o valor do VT'}
                </p>
              </div>
              <div>
                <label htmlFor="gympass" className="block text-sm font-medium text-gray-700 mb-1">Gympass/Wellhub (Mensal R$)</label>
                <input id="gympass" type="text" value={gympass} onChange={(e) => setGympass(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="100" />
              </div>
              <div>
                <label htmlFor="outros-beneficios" className="block text-sm font-medium text-gray-700 mb-1">Outros Benefícios (Mensal R$)</label>
                <input id="outros-beneficios" type="text" value={outrosBeneficios} onChange={(e) => setOutrosBeneficios(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                <p className="text-xs text-gray-400 mt-1">Seguro de vida, auxílio creche, etc.</p>
              </div>
              <div>
                <label htmlFor="plr-anual" className="block text-sm font-medium text-gray-700 mb-1">Previsão de Bônus / PLR Anual (R$)</label>
                <input id="plr-anual" type="text" value={plrAnual} onChange={(e) => setPlrAnual(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                <p className="text-xs text-gray-400 mt-1">Será diluído em 12 meses no cálculo</p>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Extras/Custos PJ</h2>
            <p className="text-xs text-gray-400 mb-4">Custos que você terá como Pessoa Jurídica</p>
            <div>
              <label htmlFor="valor-contador" className="block text-sm font-medium text-gray-700 mb-1">Custo com Contabilidade (Mensal R$)</label>
              <input id="valor-contador" type="text" value={valorContador} onChange={(e) => setValorContador(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="100" />
            </div>
          </section>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          {resultado ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <ResultCard title="CLT — Composição do Ganho Real" animateIn={false}>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Salário Bruto</dt>
                    <dd className="font-medium text-gray-900">{formatCurrency(resultado.clt.bruto)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-red-500">(-) INSS</dt>
                    <dd className="font-medium text-red-600">- {formatCurrency(resultado.clt.inss)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-red-500">(-) IRRF</dt>
                    <dd className="font-medium text-red-600">- {formatCurrency(resultado.clt.irrf)}</dd>
                  </div>
                  {resultado.clt.descontoVT > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-red-500">(-) Vale Transporte (6%)</dt>
                      <dd className="font-medium text-red-600">- {formatCurrency(resultado.clt.descontoVT)}</dd>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <dt className="font-semibold text-gray-900">= Salário Líquido</dt>
                    <dd className="font-bold text-gray-900">{formatCurrency(resultado.clt.liquidoMensal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-green-600">(+) Vale Refeição</dt>
                    <dd className="text-green-700">+ {formatCurrency(resultado.clt.valeRefeicao)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-green-600">(+) Plano de Saúde</dt>
                    <dd className="text-green-700">+ {formatCurrency(resultado.clt.planoSaude)}</dd>
                  </div>
                  {resultado.clt.planoOdontologico > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-green-600">(+) Plano Odontológico</dt>
                      <dd className="text-green-700">+ {formatCurrency(resultado.clt.planoOdontologico)}</dd>
                    </div>
                  )}
                  {resultado.clt.valeTransporte > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-green-600">(+) Vale Transporte</dt>
                      <dd className="text-green-700">+ {formatCurrency(resultado.clt.valeTransporte)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-green-600">(+) Gympass/Outros</dt>
                    <dd className="text-green-700">+ {formatCurrency(resultado.clt.gympass)}</dd>
                  </div>
                  {resultado.clt.outrosBeneficios > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-green-600">(+) Outros Benefícios</dt>
                      <dd className="text-green-700">+ {formatCurrency(resultado.clt.outrosBeneficios)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-green-600">(+) PLR Diluída (÷12)</dt>
                    <dd className="text-green-700">+ {formatCurrency(resultado.clt.plrMensal)}</dd>
                  </div>
                  <div className="border-t-2 border-blue-200 pt-3 flex justify-between">
                    <dt className="font-bold text-blue-900 text-base">= Ganho Real Mensal CLT</dt>
                    <dd className="font-bold text-blue-700 text-lg">{formatCurrency(resultado.clt.ganhoRealCLT)}</dd>
                  </div>
                </dl>
              </ResultCard>

              <section className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Provisão Anual CLT (que o PJ não tem)</h3>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-blue-700">13º Proporcional ({resultado.clt.mesesCiclo} meses)</dt>
                    <dd className="text-blue-900">{formatCurrency(resultado.clt.decimoTerceiro)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-blue-700">Férias Proporcionais</dt>
                    <dd className="text-blue-900">{formatCurrency(resultado.clt.ferias)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-blue-700">1/3 de Férias</dt>
                    <dd className="text-blue-900">{formatCurrency(resultado.clt.umTercoFerias)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-blue-700">FGTS Acumulado (8% × {resultado.clt.mesesTrab}m)</dt>
                    <dd className="text-blue-900">{formatCurrency(resultado.clt.fgtsAcumulado)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-blue-700">Multa FGTS (40%)</dt>
                    <dd className="text-blue-900">{formatCurrency(resultado.clt.multaFgts)}</dd>
                  </div>
                  <div className="border-t border-blue-300 pt-2 flex justify-between">
                    <dt className="font-semibold text-blue-900">Total Provisão Anual</dt>
                    <dd className="font-bold text-blue-900">{formatCurrency(resultado.clt.provisaoAnualCLT)}</dd>
                  </div>
                  <div className="flex justify-between text-xs">
                    <dt className="text-blue-600">Equivalente Mensal</dt>
                    <dd className="text-blue-700">+ {formatCurrency(resultado.clt.provisaoMensalCLT)}/mês</dd>
                  </div>
                </dl>
              </section>

              <ResultCard title="PJ — Faturamento Necessário" animateIn={false}>
                <dl className="space-y-2 text-sm">
                  <div className="bg-green-50 rounded-lg p-4 text-center mb-4">
                    <p className="text-sm text-green-600 mb-1">Faturamento Mensal Necessário (Simples Nacional 6%)</p>
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(resultado.pj.faturamento)}</p>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-red-500">(-) Imposto Simples Nacional (6%)</dt>
                    <dd className="font-medium text-red-600">- {formatCurrency(resultado.pj.impostoSimples)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-red-500">(-) Contabilidade</dt>
                    <dd className="font-medium text-red-600">- {formatCurrency(resultado.pj.contador)}</dd>
                  </div>
                  <div className="border-t-2 border-green-200 pt-3 flex justify-between">
                    <dt className="font-bold text-green-900 text-base">= Líquido PJ Mensal</dt>
                    <dd className="font-bold text-green-700 text-lg">{formatCurrency(resultado.pj.liquido)}</dd>
                  </div>
                </dl>
              </ResultCard>

              <section className={`border-2 rounded-xl p-6 shadow-sm transition-all duration-300 ${resultado.vantagem === 'PJ' ? 'bg-green-50 border-green-300 hover:shadow-md' : 'bg-blue-50 border-blue-300 hover:shadow-md'}`}>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
                  <span className="text-2xl animate-bounce">🏆</span> Comparação Final
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Ganho Real CLT</p>
                    <p className="text-xl font-bold text-blue-700">{formatCurrency(resultado.clt.ganhoRealCLT)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Líquido PJ</p>
                    <p className="text-xl font-bold text-green-700">{formatCurrency(resultado.pj.liquido)}</p>
                  </div>
                </div>
                <div className="text-center border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Diferença Mensal</p>
                  <p className={`text-3xl font-bold ${resultado.diferenca >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {resultado.diferenca >= 0 ? '+' : ''}{formatCurrency(resultado.diferenca)}
                  </p>
                  <p className={`text-sm mt-1 font-medium ${resultado.vantagem === 'PJ' ? 'text-green-600' : 'text-blue-600'}`}>
                    {resultado.vantagem === 'PJ' ? 'PJ coloca mais dinheiro no seu bolso' : 'CLT oferece melhor pacote de ganhos'} ({resultado.percentual >= 0 ? '+' : ''}{resultado.percentual.toFixed(1)}%)
                  </p>
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  * Não considera INSS pró-labore pois o sócio pode optar por não retirar pró-labore em alguns meses.
                </p>
              </section>

              <div className="mt-6 mb-4">
                <AdBanner adSlot="auto" adFormat="auto" />
              </div>

              <p className="text-xs text-gray-400 text-center">
                Valores estimados para planejamento. Consulte um contador para decisões financeiras.
              </p>
            </div>
          ) : (
            <EmptyState
              icon="⚖️"
              title="CLT ou PJ? Qual compensa mais?"
              description="Preencha os dados do seu salário ou proposta no formulário ao lado para descobrir qual regime de contratação coloca mais dinheiro no seu bolso no final do ano."
            />
          )}
        </div>
      </div>
    </>
  );
}
