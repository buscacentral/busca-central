import { tools } from './tools';

export interface FerramentaLink {
  title: string;
  url: string;
}

/**
 * Mapeia cada artigo (slug) para as ferramentas relacionadas (por path).
 * Usado para renderizar a seção "Ferramentas relacionadas" no rodapé de cada
 * artigo, reforçando o cluster de links internos artigo -> ferramenta.
 */
const MAPA: Record<string, string[]> = {
  'como-saber-se-estou-sendo-processado': ['/documentos/consulta-processos', '/documentos/consulta-cnpj'],
  'como-funciona-tabela-fipe': ['/financeiro/tabela-fipe', '/financeiro/financiamento-carro'],
  'diferenca-clt-e-pj': ['/financeiro/conversor-clt-pj', '/financeiro/salario-liquido'],
  'entenda-o-calculo-de-rescisao-de-contrato': ['/financeiro/rescisao-trabalhista', '/financeiro/salario-liquido'],
  'como-funciona-um-extrator-de-emails': ['/utilidades/extrator-emails', '/utilidades/validador-email'],
  'simulando-investimentos-tesouro-direto-vs-cdb': ['/financeiro/simulador-investimentos', '/financeiro/juros-compostos'],
  'qr-code-tudo-que-voce-precisa-saber': ['/utilidades/gerador-qr-code', '/utilidades/whatsapp-link'],
  'dolar-hoje-por-que-a-cotacao-oscila-tanto': ['/financeiro/cotacao', '/financeiro/indicadores-economicos'],
  'calculadora-de-imc-e-peso-ideal': ['/utilidades/calculadora-imc', '/utilidades/consumo-agua', '/utilidades/tabela-calorias'],
  'o-que-e-base64-e-como-funciona': ['/utilidades/base64', '/utilidades/formatador-codigo'],
  'como-funciona-api-de-cep-correios': ['/localizacao/busca-cep', '/localizacao/distancia-cidades'],
  'por-que-empresas-precisam-gerar-cpf-para-testes': ['/documentos/gerador-cpf', '/documentos/validador-cpf'],
  'juros-compostos-o-segredo-dos-investimentos': ['/financeiro/juros-compostos', '/financeiro/simulador-investimentos'],
  'tamanho-ideal-textos-seo-redes-sociais': ['/utilidades/contador-caracteres'],
  'salario-bruto-vs-liquido-irrf-inss': ['/financeiro/salario-liquido', '/financeiro/conversor-clt-pj'],
  'guia-do-decimo-terceiro-salario': ['/financeiro/decimo-terceiro', '/financeiro/salario-liquido'],
  'calculo-de-ferias-e-terco-constitucional': ['/financeiro/ferias', '/financeiro/salario-liquido', '/financeiro/decimo-terceiro'],
  'bitcoin-ethereum-volatilidade-mercado': ['/financeiro/criptomoedas', '/financeiro/cotacao', '/financeiro/noticias-financeiras'],
  'como-calcular-idade-gestacional-dum-dpp': ['/utilidades/idade-gestacional', '/utilidades/calculadora-imc'],
  'como-calcular-quantidade-de-carne-para-churrasco': ['/utilidades/calculadora-churrasco'],
  'como-consultar-situacao-cnpj': ['/documentos/consulta-cnpj', '/documentos/validador-cnpj', '/documentos/gerador-cnpj'],
  'como-criar-uma-senha-forte': ['/utilidades/gerador-senha', '/utilidades/gerador-uuid'],
  'como-fazer-regra-de-tres-simples-passo-a-passo': ['/utilidades/regra-de-tres', '/utilidades/calculadora-porcentagem'],
  'como-fazer-sorteio-justo-no-instagram': ['/utilidades/sorteador-nomes', '/utilidades/sorteador'],
  'como-fazer-um-recibo-simples-e-com-validade-legal': ['/documentos/gerador-recibos'],
  'como-limpar-listas-de-cpf-e-telefones-no-excel': ['/utilidades/formatador-dados', '/utilidades/removedor-duplicatas'],
  'como-precificar-doces-e-salgados-para-vender': ['/financeiro/precificacao-receitas'],
  'criar-link-whatsapp-vendas': ['/utilidades/whatsapp-link', '/utilidades/gerador-qr-code'],
  'etanol-ou-gasolina-regra-dos-70': ['/utilidades/calculadora-combustivel'],
  'financiamento-veiculos-tabela-price': ['/financeiro/financiamento-carro', '/financeiro/tabela-fipe'],
  'gerador-cartao-de-credito-testes': ['/documentos/gerador-cartao-credito'],
  'o-que-e-uuid-e-por-que-e-seguro': ['/utilidades/gerador-uuid', '/utilidades/gerador-senha'],
  'pix-copia-e-cola-br-code': ['/utilidades/pix-copia-cola', '/utilidades/gerador-qr-code'],
  'quantos-litros-de-agua-beber-por-dia-calculo': ['/utilidades/consumo-agua', '/utilidades/calculadora-imc'],
  'rastreio-encomendas-correios': ['/utilidades/rastreio', '/localizacao/busca-cep'],
  'tecnica-pomodoro-como-parar-de-procrastinar': ['/utilidades/pomodoro', '/utilidades/cronometro'],
  'a-historia-das-calculadoras-do-amor-na-internet': ['/utilidades/calculadora-amor', '/utilidades/sorteador-nomes'],
  // Artigos novos
  'como-calcular-distancia-entre-cidades': ['/localizacao/distancia-cidades', '/utilidades/calculadora-combustivel', '/utilidades/planejador-viagem'],
  'salario-liquido-por-faixa-quanto-sobra': ['/financeiro/salario-liquido', '/financeiro/conversor-clt-pj', '/financeiro/decimo-terceiro'],
  'como-escrever-valores-por-extenso': ['/utilidades/numero-por-extenso', '/documentos/gerador-recibos'],
  'sac-ou-price-qual-o-melhor-para-financiar-imovel': ['/financeiro/financiamento-imobiliario', '/financeiro/financiamento-carro', '/financeiro/juros-compostos'],
  'como-carregar-carro-eletrico-conectores-byd-gwm-volvo': ['/localizacao/carregador-eletrico/perto-de-mim', '/localizacao/carregador-eletrico', '/localizacao/planejador-viagem-ev'],
  'potencia-eletropostos-kw-tempo-de-recarga': ['/localizacao/carregador-eletrico/perto-de-mim', '/localizacao/carregador-eletrico', '/localizacao/planejador-viagem-ev'],
  'eletropostos-minas-gerais-rodovias-onde-carregar': ['/localizacao/carregador-eletrico/perto-de-mim', '/localizacao/planejador-viagem-ev', '/localizacao/distancia-cidades'],
  'recarga-eletrica-mg-bh-triangulo-rio': ['/localizacao/carregador-eletrico/perto-de-mim', '/localizacao/planejador-viagem-ev', '/localizacao/distancia-cidades'],
};

const porPath = new Map(tools.map((t) => [t.path, t.name]));

/** Retorna as ferramentas relacionadas de um artigo (resolvendo o nome pelo path). */
export function getArtigoFerramentas(slug: string): FerramentaLink[] {
  const paths = MAPA[slug] ?? [];
  return paths
    .map((p) => {
      const title = porPath.get(p);
      return title ? { title, url: p } : null;
    })
    .filter((x): x is FerramentaLink => x !== null);
}
