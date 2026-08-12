/**
 * Testes Unitários - CLT-PJ Logic
 * 
 * Testa toda a camada de lógica de negócios para o conversor CLT → PJ.
 * Garante que os cálculos matemáticos sejam precisos e que a sanitização
 * de inputs nunca gere NaN ou exceções não tratadas.
 */

import { describe, it, expect } from 'vitest';
import {
  sanitizeNumber,
  validarInputCLT,
  calcularINSS,
  calcularIRRF,
  calcularDecimoTerceiro,
  calcularFerias,
  calcularFGTSAcumulado,
  calcularMultaFGTS,
  calcularBeneficios,
  calcularPLRMensal,
  calcularFaturamentoPJ,
  calcularResultadoCLT,
  calcularResultadoPJ,
  calcularComparacaoCLTPJ,
  type InputCLT,
  type InputPJ,
} from '@/lib/clt-pj-logic';

// ============================================================
// TESTES DE SANITIZAÇÃO DE INPUT
// ============================================================

describe('sanitizeNumber', () => {
  it('deve converter string numérica corretamente', () => {
    expect(sanitizeNumber('1234.56')).toBe(1234.56);
    expect(sanitizeNumber('1000')).toBe(1000);
  });

  it('deve converter string com vírgula brasileira', () => {
    // Nota: sanitizeNumber processa da esquerda para direita
    // '1.234,56' → primeiro encontra '.', para no ponto
    expect(sanitizeNumber('10,5')).toBe(10.5);
    expect(sanitizeNumber('1.234')).toBe(1.234);
  });

  it('deve retornar valor padrão para string vazia', () => {
    expect(sanitizeNumber('')).toBe(0);
    expect(sanitizeNumber('', 100)).toBe(100);
  });

  it('deve retornar valor padrão para null', () => {
    expect(sanitizeNumber(null)).toBe(0);
    expect(sanitizeNumber(null, 50)).toBe(50);
  });

  it('deve retornar valor padrão para undefined', () => {
    expect(sanitizeNumber(undefined)).toBe(0);
    expect(sanitizeNumber(undefined, 25)).toBe(25);
  });

  it('deve retornar 0 para strings não numéricas', () => {
    expect(sanitizeNumber('abc')).toBe(0);
    expect(sanitizeNumber('NaN')).toBe(0);
    expect(sanitizeNumber('Infinity')).toBe(0);
  });

  it('nunca deve retornar NaN', () => {
    const results = [
      sanitizeNumber(''),
      sanitizeNumber('abc'),
      sanitizeNumber(null),
      sanitizeNumber(undefined),
      sanitizeNumber(Number.NaN),
    ];

    results.forEach((result) => {
      expect(result).not.toBeNaN();
      expect(Number.isFinite(result)).toBe(true);
    });
  });

  it('deve tratar números negativos', () => {
    expect(sanitizeNumber('-500')).toBe(-500);
    expect(sanitizeNumber('-1.5')).toBe(-1.5);
  });
});

// ============================================================
// TESTES DE VALIDAÇÃO
// ============================================================

describe('validarInputCLT', () => {
  const inputValido: InputCLT = {
    salarioBruto: 5000,
    mesesTrabalhados: 12,
    valeRefeicao: 1000,
    planoSaude: 500,
    planoOdontologico: 0,
    valeTransporte: 0,
    receberVT: false,
    gympass: 100,
    outrosBeneficios: 0,
    plrAnual: 0,
  };

  it('deve validar input correto', () => {
    const result = validarInputCLT(inputValido);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('deve rejeitar salário bruto zero', () => {
    const result = validarInputCLT({ ...inputValido, salarioBruto: 0 });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Salário bruto');
  });

  it('deve rejeitar salário bruto negativo', () => {
    const result = validarInputCLT({ ...inputValido, salarioBruto: -1000 });
    expect(result.isValid).toBe(false);
  });

  it('deve rejeitar meses trabalhados menor que 1', () => {
    const result = validarInputCLT({ ...inputValido, mesesTrabalhados: 0 });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Meses trabalhados');
  });

  it('deve rejeitar meses trabalhados maior que 12', () => {
    const result = validarInputCLT({ ...inputValido, mesesTrabalhados: 13 });
    expect(result.isValid).toBe(false);
  });

  it('deve aceitar meses trabalhados de 1 a 12', () => {
    for (let i = 1; i <= 12; i++) {
      const result = validarInputCLT({ ...inputValido, mesesTrabalhados: i });
      expect(result.isValid).toBe(true);
    }
  });
});

// ============================================================
// TESTES DE CÁLCULO DE INSS
// ============================================================

describe('calcularINSS', () => {
  it('deve retornar 0 para salário zero ou negativo', () => {
    expect(calcularINSS(0)).toBe(0);
    expect(calcularINSS(-1000)).toBe(0);
  });

  it('deve calcular INSS para salário na primeira faixa (até R$ 1.518,00)', () => {
    // Salário R$ 1.000 → INSS = 1000 * 7.5% = R$ 75,00
    const inss = calcularINSS(1000);
    expect(inss).toBeCloseTo(75, 2);
  });

  it('deve calcular INSS progressivo para salário na segunda faixa', () => {
    // Salário R$ 2.000
    // Primeira faixa: 1518 * 7.5% = 113.85
    // Segunda faixa: (2000 - 1518) * 9% = 43.38
    // Total: 157.23
    const inss = calcularINSS(2000);
    expect(inss).toBeCloseTo(157.23, 2);
  });

  it('deve calcular INSS para salário no teto', () => {
    // Salário acima do teto (R$ 8.157,41) → INSS = teto * 14%
    const inss = calcularINSS(10000);
    expect(inss).toBeCloseTo(8157.41 * 0.14, 2);
  });

  it('deve calcular INSS para salário exatamente no teto', () => {
    const inss = calcularINSS(8157.41);
    expect(inss).toBeGreaterThan(0);
    expect(inss).toBeLessThanOrEqual(8157.41 * 0.14);
  });
});

// ============================================================
// TESTES DE CÁLCULO DE IRRF
// ============================================================

describe('calcularIRRF', () => {
  it('deve retornar 0 para base zero ou negativa', () => {
    expect(calcularIRRF(0)).toBe(0);
    expect(calcularIRRF(-1000)).toBe(0);
  });

  it('deve retornar 0 para base dentro da isenção', () => {
    expect(calcularIRRF(2000)).toBe(0);
    expect(calcularIRRF(2259.20)).toBe(0);
  });

  it('deve calcular IRRF para base na segunda faixa', () => {
    // Base R$ 2.500
    // IRRF = 2500 * 7.5% - 169.44 = 18.06
    const irrf = calcularIRRF(2500);
    expect(irrf).toBeCloseTo(18.06, 2);
  });

  it('deve calcular IRRF para base na faixa máxima', () => {
    // Base R$ 10.000
    // IRRF = 10000 * 27.5% - 896 = 1854
    const irrf = calcularIRRF(10000);
    expect(irrf).toBeCloseTo(1854, 2);
  });
});

// ============================================================
// TESTES DE CÁLCULO DE 13º E FÉRIAS
// ============================================================

describe('calcularDecimoTerceiro', () => {
  it('deve calcular 13º proporcional para 12 meses', () => {
    // 12 meses → ciclo = 12 (12 % 12 = 0, então usa 12)
    // 13º = (5000 / 12) * (12 / 12) = 416.67
    const decimo = calcularDecimoTerceiro(5000, 12);
    expect(decimo).toBeCloseTo(416.67, 2);
  });

  it('deve calcular 13º proporcional para 6 meses', () => {
    // 6 meses → ciclo = 6
    // 13º = (5000 / 12) * (6 / 12) = 208.33
    const decimo = calcularDecimoTerceiro(5000, 6);
    expect(decimo).toBeCloseTo(208.33, 2);
  });

  it('DEVE ASSUMIR 12 MESES QUANDO mesesTrab % 12 === 0 (EDGE CASE)', () => {
    // 24 meses → 24 % 12 = 0 → deve usar 12 (não 0!)
    const decimo24 = calcularDecimoTerceiro(5000, 24);
    expect(decimo24).toBeCloseTo(416.67, 2);

    // 36 meses → 36 % 12 = 0 → deve usar 12
    const decimo36 = calcularDecimoTerceiro(5000, 36);
    expect(decimo36).toBeCloseTo(416.67, 2);

    // 12 meses → 12 % 12 = 0 → deve usar 12
    const decimo12 = calcularDecimoTerceiro(5000, 12);
    expect(decimo12).toBeCloseTo(416.67, 2);
  });

  it('nunca deve retornar 0 para meses positivos', () => {
    // Qualquer quantidade de meses > 0 deve gerar um valor > 0
    for (let i = 1; i <= 36; i++) {
      const decimo = calcularDecimoTerceiro(5000, i);
      expect(decimo).toBeGreaterThan(0);
    }
  });
});

describe('calcularFerias', () => {
  it('deve calcular férias proporcionais para 12 meses', () => {
    const ferias = calcularFerias(5000, 12);
    expect(ferias).toBeCloseTo(416.67, 2);
  });

  it('deve calcular férias proporcionais para 6 meses', () => {
    const ferias = calcularFerias(5000, 6);
    expect(ferias).toBeCloseTo(208.33, 2);
  });

  it('DEVE ASSUMIR 12 MESES QUANDO mesesTrab % 12 === 0 (EDGE CASE)', () => {
    const ferias24 = calcularFerias(5000, 24);
    expect(ferias24).toBeCloseTo(416.67, 2);
  });
});

// ============================================================
// TESTES DE CÁLCULO DE FGTS
// ============================================================

describe('calcularFGTSAcumulado', () => {
  it('deve calcular FGTS acumulado corretamente', () => {
    // FGTS = Salário * Meses * 8%
    // 5000 * 12 * 0.08 = 4800
    const fgts = calcularFGTSAcumulado(5000, 12);
    expect(fgts).toBe(4800);
  });

  it('deve calcular FGTS para 6 meses', () => {
    // 5000 * 6 * 0.08 = 2400
    const fgts = calcularFGTSAcumulado(5000, 6);
    expect(fgts).toBe(2400);
  });

  it('deve retornar 0 para salário zero', () => {
    expect(calcularFGTSAcumulado(0, 12)).toBe(0);
  });

  it('deve retornar 0 para 0 meses', () => {
    expect(calcularFGTSAcumulado(5000, 0)).toBe(0);
  });
});

describe('calcularMultaFGTS', () => {
  it('deve calcular multa de 40% sobre FGTS acumulado', () => {
    // Multa = FGTS * 40%
    // 4800 * 0.40 = 1920
    const multa = calcularMultaFGTS(4800);
    expect(multa).toBe(1920);
  });

  it('deve retornar 0 para FGTS zero', () => {
    expect(calcularMultaFGTS(0)).toBe(0);
  });
});

// ============================================================
// TESTES DE FUNÇÕES AUXILIARES
// ============================================================

describe('calcularBeneficios', () => {
  it('deve somar todos os benefícios quando recebe VT', () => {
    const result = calcularBeneficios(1000, 500, 80, 300, true, 100, 0, 5000);
    expect(result.totalBeneficios).toBe(1980);
    expect(result.descontoVT).toBe(0);
  });

  it('deve descontar VT quando não recebe', () => {
    const result = calcularBeneficios(1000, 500, 80, 300, false, 100, 0, 5000);
    expect(result.totalBeneficios).toBe(1680);
    expect(result.descontoVT).toBe(300);
  });

  it('deve limitar desconto VT a 6% do salário', () => {
    const result = calcularBeneficios(0, 0, 0, 500, false, 0, 0, 1000);
    expect(result.descontoVT).toBe(60); // 1000 * 0.06
  });

  it('deve retornar 0 quando todos são zero', () => {
    const result = calcularBeneficios(0, 0, 0, 0, false, 0, 0, 0);
    expect(result.totalBeneficios).toBe(0);
    expect(result.descontoVT).toBe(0);
  });
});

describe('calcularPLRMensal', () => {
  it('deve dividir PLR anual por 12', () => {
    expect(calcularPLRMensal(12000)).toBe(1000);
    expect(calcularPLRMensal(6000)).toBe(500);
  });

  it('deve retornar 0 para PLR zero', () => {
    expect(calcularPLRMensal(0)).toBe(0);
  });
});

describe('calcularFaturamentoPJ', () => {
  it('deve calcular faturamento com alíquota de 6%', () => {
    // Faturamento = (Ganho + Contador) / (1 - 0.06)
    // (5000 + 100) / 0.94 = 5425.53
    const faturamento = calcularFaturamentoPJ(5000, 100, 0.06);
    expect(faturamento).toBeCloseTo(5425.53, 2);
  });

  it('deve usar alíquota padrão de 6% quando não informada', () => {
    const faturamento = calcularFaturamentoPJ(5000, 100);
    expect(faturamento).toBeCloseTo(5425.53, 2);
  });
});

// ============================================================
// TESTES DE INTEGRAÇÃO - CÁLCULO COMPLETO
// ============================================================

describe('calcularResultadoCLT', () => {
  const inputCLT: InputCLT = {
    salarioBruto: 5000,
    mesesTrabalhados: 12,
    valeRefeicao: 1000,
    planoSaude: 500,
    planoOdontologico: 0,
    valeTransporte: 0,
    receberVT: false,
    gympass: 100,
    outrosBeneficios: 0,
    plrAnual: 0,
  };

  it('deve calcular resultado CLT completo', () => {
    const resultado = calcularResultadoCLT(inputCLT);

    expect(resultado.bruto).toBe(5000);
    expect(resultado.inss).toBeGreaterThan(0);
    expect(resultado.irrf).toBeGreaterThan(0);
    expect(resultado.liquidoMensal).toBeLessThan(5000);
    expect(resultado.ganhoRealCLT).toBeGreaterThan(0);
    expect(resultado.fgtsAcumulado).toBe(4800);
    expect(resultado.multaFgts).toBe(1920);
  });

  it('deve incluir benefícios no ganho real', () => {
    const resultado = calcularResultadoCLT(inputCLT);

    expect(resultado.totalBeneficios).toBe(1600);
    expect(resultado.ganhoRealCLT).toBeGreaterThan(resultado.liquidoMensal);
  });
});

describe('calcularResultadoPJ', () => {
  it('deve calcular resultado PJ', () => {
    const resultado = calcularResultadoPJ(5000, {
      contador: 100,
      aliquotaSimples: 0.06,
    });

    expect(resultado.faturamento).toBeGreaterThan(5000);
    expect(resultado.impostoSimples).toBeGreaterThan(0);
    expect(resultado.contador).toBe(100);
    expect(resultado.liquido).toBeGreaterThan(0);
  });
});

describe('calcularComparacaoCLTPJ', () => {
  const inputCLT: InputCLT = {
    salarioBruto: 5000,
    mesesTrabalhados: 12,
    valeRefeicao: 1000,
    planoSaude: 500,
    planoOdontologico: 0,
    valeTransporte: 0,
    receberVT: false,
    gympass: 100,
    outrosBeneficios: 0,
    plrAnual: 0,
  };

  const inputPJ: InputPJ = {
    contador: 100,
    aliquotaSimples: 0.06,
  };

  it('deve retornar comparação completa', () => {
    const resultado = calcularComparacaoCLTPJ(inputCLT, inputPJ);

    expect(resultado.clt).toBeDefined();
    expect(resultado.pj).toBeDefined();
    expect(resultado.diferenca).toBeDefined();
    expect(resultado.percentual).toBeDefined();
    expect(['CLT', 'PJ']).toContain(resultado.vantagem);
  });

  it('deve garantir que cálculos são consistentes', () => {
    const resultado = calcularComparacaoCLTPJ(inputCLT, inputPJ);

    // A diferença deve ser PJ - CLT
    const diferencaCalculada = resultado.pj.liquido - resultado.clt.ganhoRealCLT;
    expect(resultado.diferenca).toBeCloseTo(diferencaCalculada, 2);
  });
});
