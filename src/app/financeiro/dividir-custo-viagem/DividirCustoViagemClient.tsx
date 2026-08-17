'use client';

import { usePersistentState } from '@/hooks/usePersistentState';
import ShareWhatsAppButton from '@/components/ui/ShareWhatsAppButton';

export default function DividirCustoViagemClient() {
  const [distanciaStr, setDistanciaStr] = usePersistentState<string>('racha_distancia', '435');
  const [consumoStr, setConsumoStr] = usePersistentState<string>('racha_consumo', '11.5');
  const [precoStr, setPrecoStr] = usePersistentState<string>('racha_preco', '6.09');
  const [passageirosStr, setPassageirosStr] = usePersistentState<string>('racha_passageiros', '4');
  const [pedagioStr, setPedagioStr] = usePersistentState<string>('racha_pedagio', '45.50');
  const [chavePix, setChavePix] = usePersistentState<string>('racha_chave_pix', '');

  const distancia = parseFloat(distanciaStr) || 0;
  const consumo = parseFloat(consumoStr) || 1;
  const preco = parseFloat(precoStr) || 0;
  const passageiros = Math.max(1, parseInt(passageirosStr, 10) || 1);
  const pedagio = parseFloat(pedagioStr) || 0;

  const litros = consumo > 0 ? distancia / consumo : 0;
  const custoCombustivel = litros * preco;
  const custoTotal = custoCombustivel + pedagio;
  const custoPorPessoa = custoTotal / passageiros;

  const pixTexto = chavePix.trim() ? `\n🔑 *Chave Pix:* ${chavePix.trim()}` : '';
  const mensagemWhatsApp = `🚗 *Racha da Viagem!*
📍 *Distância:* ${distancia} km
⛽ *Combustível:* R$ ${custoCombustivel.toFixed(2).replace('.', ',')} (${litros.toFixed(1)}L)
🛣️ *Pedágios:* R$ ${pedagio.toFixed(2).replace('.', ',')}
💰 *Custo Total:* R$ ${custoTotal.toFixed(2).replace('.', ',')}
👥 *Passageiros:* ${passageiros} pessoas

👉 *Valor por pessoa: R$ ${custoPorPessoa.toFixed(2).replace('.', ',')}*${pixTexto}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          👥 Calculadora de Racha-Combustível
        </span>
        <h2 className="text-xl md:text-2xl font-black text-slate-900">
          Dividir Custo de Viagem entre Amigos
        </h2>
        <p className="text-sm text-slate-600">
          Insira os dados da viagem e obtenha o valor exato que cada passageiro deve pagar via Pix.
        </p>
      </div>

      {/* Grid de Formulário de Entrada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Distância */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
          <label htmlFor="distancia-km" className="block text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            Distância Total (km)
          </label>
          <input
            id="distancia-km"
            type="number"
            min="0"
            value={distanciaStr}
            onChange={(e) => setDistanciaStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Consumo */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
          <label htmlFor="consumo-kml" className="block text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            Consumo do Carro (km/L)
          </label>
          <input
            id="consumo-kml"
            type="number"
            step="0.1"
            min="0.1"
            value={consumoStr}
            onChange={(e) => setConsumoStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Preço Combustível */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
          <label htmlFor="preco-litro" className="block text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            Preço Combustível (R$/L)
          </label>
          <input
            id="preco-litro"
            type="number"
            step="0.01"
            min="0"
            value={precoStr}
            onChange={(e) => setPrecoStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Passageiros */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200 space-y-1.5">
          <label htmlFor="num-passageiros" className="block text-xs font-extrabold text-blue-900 uppercase tracking-wide">
            Número de Pessoas (Passageiros)
          </label>
          <input
            id="num-passageiros"
            type="number"
            min="1"
            max="50"
            value={passageirosStr}
            onChange={(e) => setPassageirosStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-blue-300 rounded-lg font-black text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Total Pedágios */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
          <label htmlFor="total-pedagio" className="block text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            Custo com Pedágios (R$)
          </label>
          <input
            id="total-pedagio"
            type="number"
            step="0.50"
            min="0"
            value={pedagioStr}
            onChange={(e) => setPedagioStr(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Chave Pix (Opcional) */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
          <label htmlFor="chave-pix" className="block text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            Sua Chave Pix (Opcional)
          </label>
          <input
            id="chave-pix"
            type="text"
            placeholder="Ex: CPF ou celular"
            value={chavePix}
            onChange={(e) => setChavePix(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Cartão de Resultado Destacado */}
      <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Divisão de Custos da Viagem</p>
            <h3 className="text-3xl sm:text-4xl font-black mt-1">
              Valor por pessoa: R$ {custoPorPessoa.toFixed(2).replace('.', ',')}
            </h3>
            <p className="text-xs text-blue-100 mt-1">
              Total de R$ {custoTotal.toFixed(2).replace('.', ',')} dividido para {passageiros} pessoa(s)
            </p>
          </div>

          <ShareWhatsAppButton
            message={mensagemWhatsApp}
            buttonText="Enviar Divisão no WhatsApp"
            url="https://buscacentral.com.br/financeiro/dividir-custo-viagem"
            className="w-full sm:w-auto"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-blue-500/50 text-center text-xs">
          <div className="bg-blue-800/40 p-2.5 rounded-lg">
            <span className="block text-blue-200">Combustível</span>
            <strong className="block text-sm text-white font-bold mt-0.5">
              R$ {custoCombustivel.toFixed(2).replace('.', ',')}
            </strong>
          </div>
          <div className="bg-blue-800/40 p-2.5 rounded-lg">
            <span className="block text-blue-200">Litros Est.</span>
            <strong className="block text-sm text-white font-bold mt-0.5">{litros.toFixed(1)} L</strong>
          </div>
          <div className="bg-blue-800/40 p-2.5 rounded-lg">
            <span className="block text-blue-200">Pedágios</span>
            <strong className="block text-sm text-white font-bold mt-0.5">
              R$ {pedagio.toFixed(2).replace('.', ',')}
            </strong>
          </div>
          <div className="bg-blue-800/40 p-2.5 rounded-lg">
            <span className="block text-blue-200">Custo Total</span>
            <strong className="block text-sm text-white font-bold mt-0.5">
              R$ {custoTotal.toFixed(2).replace('.', ',')}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
