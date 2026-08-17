export interface Tool {
  name: string;
  path: string;
  category: string;
  keywords: string[];
}

export const tools: Tool[] = [
  { name: 'Gerador de CPF', path: '/documentos/gerador-cpf', category: 'Documentos', keywords: ['cpf', 'gerar', 'documento'] },
  { name: 'Validador de CPF', path: '/documentos/validador-cpf', category: 'Documentos', keywords: ['cpf', 'validar', 'documento'] },
  { name: 'Gerador de CNPJ', path: '/documentos/gerador-cnpj', category: 'Documentos', keywords: ['cnpj', 'gerar', 'empresa'] },
  { name: 'Validador de CNPJ', path: '/documentos/validador-cnpj', category: 'Documentos', keywords: ['cnpj', 'validar', 'empresa'] },
  { name: 'Consulta CNPJ', path: '/documentos/consulta-cnpj', category: 'Documentos', keywords: ['cnpj', 'consulta', 'receita', 'empresa', 'razão social'] },
  { name: 'Busca de CEP', path: '/localizacao/busca-cep', category: 'Localização', keywords: ['cep', 'endereço', 'buscar'] },
  { name: 'Distância entre Cidades', path: '/localizacao/distancia-cidades', category: 'Localização', keywords: ['distância', 'cidades', 'km'] },
  { name: 'Clima e Previsão do Tempo', path: '/localizacao/clima', category: 'Localização', keywords: ['clima', 'tempo', 'temperatura', 'previsão', 'chuva', 'sol'] },
  { name: 'Link WhatsApp', path: '/utilidades/whatsapp-link', category: 'Utilidades', keywords: ['whatsapp', 'link', 'wa.me'] },
  { name: 'Cotação de Moedas', path: '/financeiro/cotacao', category: 'Financeiro', keywords: ['dólar', 'euro', 'bitcoin', 'cotação'] },
  { name: 'Criptomoedas', path: '/financeiro/criptomoedas', category: 'Financeiro', keywords: ['bitcoin', 'ethereum', 'crypto', 'cripto'] },
  { name: 'Tabela FIPE', path: '/financeiro/tabela-fipe', category: 'Financeiro', keywords: ['fipe', 'carro', 'veículo', 'preço'] },
  { name: 'Juros Compostos', path: '/financeiro/juros-compostos', category: 'Financeiro', keywords: ['juros', 'investimento', 'simulador'] },
  { name: 'Conversor CLT PJ', path: '/financeiro/conversor-clt-pj', category: 'Financeiro', keywords: ['clt', 'pj', 'salário', 'faturamento', 'impostos'] },
  { name: 'Financiamento de Carro', path: '/financeiro/financiamento-carro', category: 'Financeiro', keywords: ['financiamento', 'carro', 'veículo', 'parcelas', 'price', 'sac'] },
  { name: 'ROI Imobiliário', path: '/financeiro/roi-imobiliario', category: 'Financeiro', keywords: ['roi', 'imóvel', 'aluguel', 'cap rate', 'investimento', 'imobiliário'] },
  { name: 'Salário Líquido', path: '/financeiro/salario-liquido', category: 'Financeiro', keywords: ['salário líquido', 'inss', 'irpf', 'descontos', 'trabalhista', 'calculadora salário'] },
  { name: 'Cálculo de Férias', path: '/financeiro/ferias', category: 'Financeiro', keywords: ['férias', 'cálculo', 'abono', 'vender férias', 'trabalhista'] },
  { name: '13º Salário', path: '/financeiro/decimo-terceiro', category: 'Financeiro', keywords: ['13', 'décimo terceiro', 'salário', 'parcela', 'trabalhista'] },
  { name: 'Horas Extras e DSR', path: '/financeiro/horas-extras', category: 'Financeiro', keywords: ['horas extras', 'dsr', 'trabalhista', '50%', '100%'] },
  { name: 'Rescisão Trabalhista', path: '/financeiro/rescisao-trabalhista', category: 'Financeiro', keywords: ['rescisão', 'demissão', 'fgts', 'aviso', 'trabalhista', 'verbas'] },
  { name: 'Simulador de Investimentos', path: '/financeiro/simulador-investimentos', category: 'Financeiro', keywords: ['investimento', 'cdb', 'tesouro', 'selic', 'poupança', 'rendimento'] },
  { name: 'Gerador de QR Code', path: '/utilidades/gerador-qr-code', category: 'Utilidades', keywords: ['qr', 'code', 'qrcode'] },
  { name: 'Gerador de Senha', path: '/utilidades/gerador-senha', category: 'Utilidades', keywords: ['senha', 'password', 'aleatória'] },
  { name: 'Gerador de UUID', path: '/utilidades/gerador-uuid', category: 'Utilidades', keywords: ['uuid', 'id', 'identificador'] },
  { name: 'Codificador Base64', path: '/utilidades/base64', category: 'Utilidades', keywords: ['base64', 'codificar', 'decodificar'] },
  { name: 'Contador de Caracteres', path: '/utilidades/contador-caracteres', category: 'Utilidades', keywords: ['caracteres', 'palavras', 'contador'] },
  { name: 'PIX Copia e Cola', path: '/utilidades/pix-copia-cola', category: 'Utilidades', keywords: ['pix', 'pagamento', 'copia'] },
  { name: 'Conversor de Timestamp', path: '/utilidades/timestamp', category: 'Utilidades', keywords: ['timestamp', 'data', 'hora', 'unix'] },
  { name: 'Comparador de Textos', path: '/utilidades/comparador-textos', category: 'Utilidades', keywords: ['diff', 'comparar', 'texto'] },
  { name: 'Removedor de Duplicatas', path: '/utilidades/removedor-duplicatas', category: 'Utilidades', keywords: ['duplicata', 'lista', 'ordenar'] },
  { name: 'Conversor de Caixa', path: '/utilidades/conversor-caixa', category: 'Utilidades', keywords: ['maiúsculo', 'minúsculo', 'caixa'] },
  { name: 'Conversor de Imagens', path: '/utilidades/conversor-imagens', category: 'Utilidades', keywords: ['imagem', 'webp', 'png', 'jpg'] },
  { name: 'Seletor de Cores', path: '/utilidades/seletor-cores', category: 'Utilidades', keywords: ['cor', 'hex', 'rgb', 'paleta'] },
  { name: 'Extrator de Emails', path: '/utilidades/extrator-emails', category: 'Utilidades', keywords: ['email', 'extrair', 'contato'] },
  { name: 'Dias Úteis', path: '/utilidades/dias-uteis', category: 'Utilidades', keywords: ['dias', 'úteis', 'data', 'feriado', 'prazo', 'calendário'] },
  { name: 'Rastreador de Encomendas', path: '/utilidades/rastreio', category: 'Utilidades', keywords: ['rastreio', 'encomenda', 'correios', 'pacote', 'rastrear', 'entrega'] },
  { name: 'Planejador de Férias', path: '/utilidades/planejador-viagem', category: 'Utilidades', keywords: ['viagem', 'férias', 'orçamento', 'planejamento', 'custo', 'passagem'] },
  { name: 'Formatador JSON XML', path: '/utilidades/formatador-codigo', category: 'Utilidades', keywords: ['json', 'xml', 'formatar', 'minificar', 'validar', 'código'] },
  { name: 'Calculadora de IMC', path: '/utilidades/calculadora-imc', category: 'Utilidades', keywords: ['imc', 'peso', 'altura', 'massa corporal', 'obesidade', 'saúde'] },
  { name: 'Tabela de Calorias', path: '/utilidades/tabela-calorias', category: 'Utilidades', keywords: ['calorias', 'taco', 'alimentos', 'nutrição', 'proteínas', 'carboidratos'] },
  { name: 'Calculadora de Porcentagem', path: '/utilidades/calculadora-porcentagem', category: 'Utilidades', keywords: ['porcentagem', 'cálculo', 'matemática', 'percentual'] },
  { name: 'Calculadora de Desconto', path: '/utilidades/calculadora-desconto', category: 'Utilidades', keywords: ['desconto', 'preço', 'economia', 'oferta', 'promoção'] },
  { name: 'Conversor de Unidades', path: '/utilidades/conversor-unidades', category: 'Utilidades', keywords: ['conversor', 'unidades', 'medidas', 'peso', 'comprimento', 'temperatura'] },
  { name: 'Gerador de Lorem Ipsum', path: '/utilidades/gerador-lorem-ipsum', category: 'Utilidades', keywords: ['lorem', 'ipsum', 'texto', 'placeholder', 'gerador', 'design'] },
  { name: 'Sorteador Online', path: '/utilidades/sorteador', category: 'Utilidades', keywords: ['sorteador', 'sortear', 'aleatório', 'nomes', 'números'] },
  { name: 'Cronômetro e Timer', path: '/utilidades/cronometro', category: 'Utilidades', keywords: ['cronômetro', 'timer', 'temporizador', 'alarme', 'tempo'] },
  { name: 'Conversor JSON CSV', path: '/utilidades/json-csv', category: 'Utilidades', keywords: ['json', 'csv', 'converter', 'dados'] },
  { name: 'Gerador de Cartão de Crédito', path: '/documentos/gerador-cartao-credito', category: 'Documentos', keywords: ['cartão', 'crédito', 'gerador', 'teste', 'cc'] },
  { name: 'Calculadora de Combustível', path: '/utilidades/calculadora-combustivel', category: 'Utilidades', keywords: ['combustível', 'gasolina', 'viagem', 'consumo', 'litros'] },
  { name: 'Validador de E-mail', path: '/utilidades/validador-email', category: 'Utilidades', keywords: ['email', 'validador', 'verificador', 'temporário', 'descartável'] },
  { name: 'Calculadora de Churrasco', path: '/utilidades/calculadora-churrasco', category: 'Utilidades', keywords: ['churrasco', 'carne', 'bebida', 'festa', 'quantidade'] },
  { name: 'Formatador de Dados', path: '/utilidades/formatador-dados', category: 'Utilidades', keywords: ['formatar', 'limpar', 'cpf', 'cnpj', 'telefone', 'celular', 'lote'] },
  { name: 'Regra de Três', path: '/utilidades/regra-de-tres', category: 'Utilidades', keywords: ['regra de três', 'matemática', 'proporção', 'cálculo', 'simples'] },
  { name: 'Consumo de Água', path: '/utilidades/consumo-agua', category: 'Utilidades', keywords: ['água', 'beber', 'hidratação', 'litros', 'saúde'] },
  { name: 'Consulta de Processos', path: '/documentos/consulta-processos', category: 'Documentos', keywords: ['processo', 'jusbrasil', 'judicial', 'nome', 'justiça', 'tribunal'] },
  { name: 'Precificação de Receitas', path: '/financeiro/precificacao-receitas', category: 'Financeiro', keywords: ['preço', 'receita', 'custo', 'venda', 'lucro', 'markup', 'doces', 'salgados'] },
  { name: 'Gerador de Recibos', path: '/documentos/gerador-recibos', category: 'Documentos', keywords: ['recibo', 'pagamento', 'pdf', 'comprovante', 'gerador', 'imprimir'] },
  { name: 'Idade Gestacional', path: '/utilidades/idade-gestacional', category: 'Utilidades', keywords: ['idade gestacional', 'gravidez', 'semanas', 'dum', 'dpp', 'parto'] },
  { name: 'Cronômetro Pomodoro', path: '/utilidades/pomodoro', category: 'Utilidades', keywords: ['pomodoro', 'foco', 'estudo', 'produtividade', 'timer', 'temporizador'] },
  { name: 'Sorteador de Nomes', path: '/utilidades/sorteador-nomes', category: 'Utilidades', keywords: ['sorteio', 'nomes', 'rifa', 'instagram', 'aleatório'] },
  { name: 'Calculadora do Amor', path: '/utilidades/calculadora-amor', category: 'Utilidades', keywords: ['amor', 'calculadora', 'casal', 'compatibilidade', 'nomes', 'crush', 'brincadeira'] },
  { name: 'Indicadores Econômicos', path: '/financeiro/indicadores-economicos', category: 'Financeiro', keywords: ['selic', 'ipca', 'cdi', 'inflação', 'indicadores', 'taxa de juros', 'banco central', 'economia'] },
  { name: 'Notícias Financeiras', path: '/financeiro/noticias-financeiras', category: 'Financeiro', keywords: ['notícias', 'mercado financeiro', 'cripto', 'blockchain', 'economia', 'bolsa'] },
  { name: 'Painel B3', path: '/financeiro/painel-b3', category: 'Financeiro', keywords: ['b3', 'ações', 'fiis', 'bolsa', 'fundos imobiliários', 'cotação', 'bovespa', 'ibovespa'] },
  { name: 'Número por Extenso', path: '/utilidades/numero-por-extenso', category: 'Utilidades', keywords: ['extenso', 'número por extenso', 'valor por extenso', 'escrever valor', 'cheque', 'recibo', 'contrato'] },
  { name: 'Simulador de Financiamento Imobiliário', path: '/financeiro/financiamento-imobiliario', category: 'Financeiro', keywords: ['financiamento', 'imóvel', 'sac', 'price', 'casa própria', 'apartamento', 'amortização', 'imobiliário', 'parcelas'] },
];

/**
 * Filtra as ferramentas por nome, categoria ou palavras-chave.
 * Usado tanto pela busca instantânea (SearchBar) quanto pela
 * página de resultados (/buscar).
 */
export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];

  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some((kw) => kw.includes(q))
  );
}

/**
 * Data da última revisão geral do conteúdo do site (ISO YYYY-MM-DD).
 *
 * É a fonte ÚNICA usada pelo `ToolPageLayout` para exibir "Atualizado em <data>"
 * e preencher o campo `dateModified` do schema. Usamos um valor único e honesto
 * (a data em que o conteúdo foi revisado por último) em vez de inventar uma data
 * diferente por ferramenta.
 *
 * COMO MANTER: quando fizer uma revisão/atualização geral do conteúdo, basta
 * alterar esta data. Se quiser destacar a atualização de UMA ferramenta
 * específica, passe a prop `lastUpdated="AAAA-MM-DD"` diretamente no
 * `<ToolPageLayout>` daquela página (a prop sobrescreve este valor).
 */
export const SITE_LAST_REVIEWED = '2026-08-16';

/**
 * Retorna a data de última atualização (ISO) para exibir numa página de
 * ferramenta. Hoje devolve a data única de revisão do site.
 */
export function getToolLastUpdated(path?: string): string | undefined {
  if (!path) return undefined;
  return SITE_LAST_REVIEWED;
}


export interface RelatedToolLink {
  title: string;
  url: string;
}

/**
 * Gera ferramentas relacionadas automaticamente, escolhendo as próximas
 * ferramentas da MESMA categoria (com wrap-around). Distribui os links internos
 * de forma equilibrada: cada ferramenta aponta para as seguintes da sua
 * categoria, em vez de todas apontarem para as primeiras da lista.
 *
 * Usado como fallback pelo `ToolPageLayout` quando a página não define
 * `relatedTools` manualmente.
 */
export function getRelatedTools(path?: string, limit = 3): RelatedToolLink[] {
  if (!path) return [];
  const current = tools.find((t) => t.path === path);
  if (!current) return [];

  const categoryTools = tools.filter((t) => t.category === current.category);
  const n = categoryTools.length;
  if (n <= 1) return [];

  const startIndex = categoryTools.findIndex((t) => t.path === path);
  const result: RelatedToolLink[] = [];
  for (let offset = 1; offset < n && result.length < limit; offset++) {
    const candidate = categoryTools[(startIndex + offset) % n];
    if (candidate.path !== path) {
      result.push({ title: candidate.name, url: candidate.path });
    }
  }
  return result;
}
