'use client';

import { usePersistentState } from '@/hooks/usePersistentState';
import ShareWhatsAppButton from '@/components/ui/ShareWhatsAppButton';

export default function CalculadoraChurrascoClient() {
  const [homens, setHomens] = usePersistentState<number>('calc_churrasco_homens', 0);
  const [mulheres, setMulheres] = usePersistentState<number>('calc_churrasco_mulheres', 0);
  const [criancas, setCriancas] = usePersistentState<number>('calc_churrasco_criancas', 0);
  const [comBebidaAlcoolica, setComBebidaAlcoolica] = usePersistentState<boolean>('calc_churrasco_bebida', true);

  // Regras de cálculo
  // Homens: 500g carne, 4 latas cerveja, 500ml refri/água, 150g acompanhamentos
  // Mulheres: 400g carne, 2 latas cerveja, 500ml refri/água, 150g acompanhamentos
  // Crianças: 200g carne, 0 cerveja, 500ml refri/água, 100g acompanhamentos
  const calcular = () => {
    const totalPessoas = homens + mulheres + criancas;
    if (totalPessoas === 0) return null;

    const carneG = (homens * 500) + (mulheres * 400) + (criancas * 200);
    const linguiG = (homens * 150) + (mulheres * 100) + (criancas * 50);
    const frangoG = (homens * 100) + (mulheres * 100) + (criancas * 50);

    const cervejaLatas = comBebidaAlcoolica ? (homens * 4) + (mulheres * 2) : 0;
    const refriAguaL = ((homens * 500) + (mulheres * 500) + (criancas * 500)) / 1000;
    
    const paoAlho = (homens * 2) + (mulheres * 2) + (criancas * 1);
    const carvaoKg = Math.ceil((carneG + linguiG + frangoG) / 1000); // 1kg de carvão por kg de carne
    const geloSacos = Math.ceil((homens + mulheres) / 10) || 1;

    return {
      carne: (carneG / 1000).toFixed(1),
      linguica: (linguiG / 1000).toFixed(1),
      frango: (frangoG / 1000).toFixed(1),
      cerveja: cervejaLatas,
      refriAgua: refriAguaL.toFixed(1),
      paoAlho,
      carvao: carvaoKg,
      gelo: geloSacos
    };
  };

  const resultado = calcular();

  const mensagemWhatsApp = resultado
    ? `🥩 *Lista de Compras do Churrasco!*
👥 *Convidados:* ${homens} homens, ${mulheres} mulheres, ${criancas} crianças

🍗 *Carnes & Acompanhamentos:*
• Carne Bovina: ${resultado.carne} kg
• Linguiça: ${resultado.linguica} kg
• Frango / Coração: ${resultado.frango} kg
• Pão de Alho: ${resultado.paoAlho} un.

🍻 *Bebidas & Suprimentos:*
${comBebidaAlcoolica ? `• Cerveja (350ml): ${resultado.cerveja} latas\n` : ''}• Refri / Água / Suco: ${resultado.refriAgua} L
• Carvão: ${resultado.carvao} kg
• Gelo (5kg): ${resultado.gelo} saco${resultado.gelo > 1 ? 's' : ''}`
    : '';

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulário */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <span className="text-3xl mr-3">🍖</span>
            Quantas pessoas vão?
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">👨</div>
                <div>
                  <h3 className="font-semibold text-slate-800">Homens</h3>
                  <p className="text-sm text-slate-500">Comem e bebem mais</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setHomens(Math.max(0, homens - 1))} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-lg cursor-pointer">-</button>
                <span className="w-8 text-center font-bold text-xl">{homens}</span>
                <button onClick={() => setHomens(homens + 1)} className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg cursor-pointer">+</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xl">👩</div>
                <div>
                  <h3 className="font-semibold text-slate-800">Mulheres</h3>
                  <p className="text-sm text-slate-500">Média geral</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setMulheres(Math.max(0, mulheres - 1))} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-lg cursor-pointer">-</button>
                <span className="w-8 text-center font-bold text-xl">{mulheres}</span>
                <button onClick={() => setMulheres(mulheres + 1)} className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg cursor-pointer">+</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">👶</div>
                <div>
                  <h3 className="font-semibold text-slate-800">Crianças</h3>
                  <p className="text-sm text-slate-500">Até 12 anos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setCriancas(Math.max(0, criancas - 1))} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-lg cursor-pointer">-</button>
                <span className="w-8 text-center font-bold text-xl">{criancas}</span>
                <button onClick={() => setCriancas(criancas + 1)} className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg cursor-pointer">+</button>
              </div>
            </div>
            
            <div className="flex items-center mt-6">
              <input
                id="bebidaAlcoolica"
                type="checkbox"
                checked={comBebidaAlcoolica}
                onChange={(e) => setComBebidaAlcoolica(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="bebidaAlcoolica" className="ml-3 text-slate-700 font-medium cursor-pointer">
                Incluir bebidas alcoólicas (cerveja)
              </label>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div>
          <div className="bg-slate-900 rounded-3xl p-8 h-full text-white shadow-xl flex flex-col">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-3xl mr-3">🛒</span>
              Lista de Compras
            </h2>

            {!resultado ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 opacity-70 text-center">
                <div className="text-6xl mb-4">🍗</div>
                <p>Adicione convidados para ver a quantidade recomendada.</p>
              </div>
            ) : (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">Carne (Picanha, Alcatra)</div>
                      <div className="text-2xl font-bold text-amber-400">{resultado.carne} kg</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">Linguiça</div>
                      <div className="text-2xl font-bold text-amber-400">{resultado.linguica} kg</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">Frango / Coração</div>
                      <div className="text-2xl font-bold text-amber-400">{resultado.frango} kg</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">Pão de Alho</div>
                      <div className="text-2xl font-bold text-amber-400">{resultado.paoAlho} un.</div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-700 my-4 w-full"></div>

                  <div className="grid grid-cols-2 gap-4">
                    {comBebidaAlcoolica && (
                      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                        <div className="text-slate-400 text-sm mb-1">Cerveja (Latas 350ml)</div>
                        <div className="text-2xl font-bold text-sky-400">{resultado.cerveja} latas</div>
                      </div>
                    )}
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">Refri / Água / Suco</div>
                      <div className="text-2xl font-bold text-sky-400">{resultado.refriAgua} L</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">Carvão</div>
                      <div className="text-2xl font-bold text-slate-300">{resultado.carvao} kg</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                      <div className="text-slate-400 text-sm mb-1">Gelo (Saco 5kg)</div>
                      <div className="text-2xl font-bold text-slate-300">{resultado.gelo} saco{resultado.gelo > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </div>

                {/* Botão de Compartilhar no WhatsApp */}
                <div className="pt-4 border-t border-slate-800">
                  <ShareWhatsAppButton
                    message={mensagemWhatsApp}
                    buttonText="Enviar Lista de Compras no WhatsApp"
                    url="https://buscacentral.com.br/utilidades/calculadora-churrasco"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
