import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getArtigoFerramentas } from '@/lib/artigos-ferramentas';
import { calcularINSS, calcularIRPF, formatarMoeda } from '@/lib/trabalhista';

/** Calcula o líquido (cenário-base) para a tabela do artigo de salário. */
function liquidoBase(bruto: number): string {
  const inss = calcularINSS(bruto);
  const irpf = calcularIRPF(bruto - inss);
  return formatarMoeda(bruto - inss - irpf);
}

// Mocked articles database for AdSense approval
const articlesData: Record<string, { title: string; content: React.ReactNode; date: string; isoDate: string; category: string; description: string }> = {
  'sac-ou-price-qual-o-melhor-para-financiar-imovel': {
    title: 'SAC ou Price: qual o melhor sistema para financiar seu imóvel?',
    date: '03 de Julho, 2026',
    isoDate: '2026-07-03T10:00:00.000Z',
    category: 'Finanças',
    description: 'Entenda a diferença entre os sistemas de amortização SAC e Price, veja qual paga menos juros e aprenda a simular o financiamento da casa própria.',
    content: (
      <>
        <p>Ao financiar um imóvel, além de negociar a taxa de juros, você precisa escolher o <strong>sistema de amortização</strong>: SAC ou Price. Essa escolha muda o valor das suas parcelas e, no fim das contas, quanto você vai pagar de juros ao longo de 20, 30 ou até 35 anos. Entender os dois é essencial antes de assinar o contrato.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">O que é amortização?</h2>
        <p>Toda parcela do financiamento tem duas partes: uma abate a dívida (amortização) e a outra paga os juros sobre o saldo que ainda falta quitar. O que diferencia o SAC do Price é <strong>como essas duas partes se comportam ao longo do tempo</strong>.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Sistema SAC: parcelas que diminuem</h2>
        <p>No SAC (Sistema de Amortização Constante), a parte que abate a dívida é <strong>fixa</strong> em todas as parcelas. Como os juros incidem sobre o saldo devedor, que vai diminuindo, as parcelas <strong>começam mais altas e caem mês a mês</strong>. É o sistema mais comum no crédito imobiliário brasileiro e, na maioria dos casos, resulta em <strong>menos juros no total</strong>.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Tabela Price: parcelas fixas</h2>
        <p>Na Tabela Price, as parcelas são <strong>iguais do início ao fim</strong>. No começo, a maior parte da prestação é juros e pouco abate a dívida; com o tempo, isso se inverte. A previsibilidade ajuda no orçamento, mas como a dívida cai mais devagar no início, normalmente você paga <strong>mais juros no total</strong> do que no SAC.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Então o SAC é sempre melhor?</h2>
        <p>Em juros totais, geralmente sim. Mas o SAC exige uma capacidade de pagamento maior no começo, justamente quando muita gente já está apertada com mudança, reforma e ITBI. Se a primeira parcela do SAC não couber no seu orçamento, a Price pode ser a opção que viabiliza a compra. O segredo é simular os dois com os seus números reais.</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Simule antes de decidir</h3>
          <p className="text-blue-800">
            Use o nosso <Link href="/financeiro/financiamento-imobiliario" className="underline font-semibold hover:text-blue-900">Simulador de Financiamento Imobiliário</Link> para comparar SAC e Price lado a lado: veja a primeira e a última parcela, o total pago e quanto você economiza em juros. Vale também conhecer o efeito dos <Link href="/financeiro/juros-compostos" className="underline font-semibold hover:text-blue-900">juros compostos</Link> sobre o seu dinheiro.
          </p>
        </div>
      </>
    )
  },
  'como-escrever-valores-por-extenso': {
    title: 'Como escrever valores por extenso em cheques, recibos e contratos',
    date: '02 de Julho, 2026',
    isoDate: '2026-07-02T10:00:00.000Z',
    category: 'Documentos',
    description: 'Aprenda as regras do português para escrever valores em reais por extenso sem erros — e entenda por que isso protege você contra fraudes em cheques, recibos e contratos.',
    content: (
      <>
        <p>Escrever um valor por extenso parece simples, até a hora de preencher um cheque, emitir um recibo ou redigir um contrato e bater a dúvida: é &quot;mil reais&quot; ou &quot;um mil reais&quot;? &quot;Cem&quot; ou &quot;cento&quot;? Onde entra o &quot;e&quot;? Errar essa grafia pode gerar desconforto e até questionamentos sobre a validade do documento.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Por que o valor por extenso é tão importante?</h2>
        <p>Em documentos financeiros, o valor costuma aparecer duas vezes: em números e por extenso. Isso não é redundância — é uma proteção. Se houver qualquer divergência entre as duas formas, a praxe (e a jurisprudência brasileira) costuma dar prevalência ao <strong>valor escrito por extenso</strong>, justamente porque é mais difícil de adulterar do que um número, onde bastaria acrescentar um zero.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">As principais regras (sem complicação)</h2>

        <h3 className="text-xl font-bold mt-6 mb-3">1. &quot;Cem&quot; ou &quot;cento&quot;?</h3>
        <p>Use <strong>&quot;cem&quot;</strong> para o número exato 100 (&quot;cem reais&quot;). A partir de 101, vira <strong>&quot;cento&quot;</strong>: &quot;cento e cinquenta&quot;, &quot;cento e noventa e nove&quot;.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">2. &quot;Mil&quot; nunca vem com &quot;um&quot;</h3>
        <p>A palavra &quot;mil&quot; é invariável e não é precedida de &quot;um&quot;. Portanto, R$ 1.000,00 escreve-se <strong>&quot;mil reais&quot;</strong>, e nunca &quot;um mil reais&quot;.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">3. O conector &quot;e&quot;</h3>
        <p>Dentro de cada classe, o &quot;e&quot; liga a centena, a dezena e a unidade: &quot;duzentos e trinta e quatro&quot;. Entre classes grandes, usa-se vírgula — exceto antes do último grupo, que recebe &quot;e&quot; quando for menor que 100 ou um múltiplo exato de 100. Por isso dizemos &quot;mil e quinhentos&quot;, mas &quot;mil, duzentos e trinta e quatro&quot;.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">4. O &quot;de&quot; em milhões e bilhões</h3>
        <p>Quando o valor termina exatamente em milhão, bilhão ou trilhão, entra a preposição &quot;de&quot;: <strong>&quot;um milhão de reais&quot;</strong>. Mas se houver grupos menores, o &quot;de&quot; some: &quot;um milhão e quinhentos mil reais&quot;.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Exemplos prontos</h2>
        <ul>
          <li><strong>R$ 100,00</strong> → cem reais</li>
          <li><strong>R$ 1.000,00</strong> → mil reais</li>
          <li><strong>R$ 1.234,56</strong> → mil, duzentos e trinta e quatro reais e cinquenta e seis centavos</li>
          <li><strong>R$ 1.000.000,00</strong> → um milhão de reais</li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Faça isso automaticamente</h3>
          <p className="text-blue-800">
            Não quer arriscar errar? Use o nosso <Link href="/utilidades/numero-por-extenso" className="underline font-semibold hover:text-blue-900">Conversor de Número por Extenso</Link>: digite o valor e copie o texto já no formato correto. E se precisar de um recibo completo, o <Link href="/documentos/gerador-recibos" className="underline font-semibold hover:text-blue-900">Gerador de Recibos</Link> já preenche o valor por extenso para você.
          </p>
        </div>
      </>
    )
  },
  'como-calcular-distancia-entre-cidades': {
    title: 'Como calcular a distância entre cidades (e o custo da viagem)',
    date: '02 de Julho, 2026',
    isoDate: '2026-07-02T10:00:00.000Z',
    category: 'Localização',
    description: 'Aprenda a diferença entre distância em linha reta e rodoviária, estime o tempo de viagem e descubra quanto vai gastar de combustível antes de pegar a estrada.',
    content: (
      <>
        <p>Planejar uma viagem de carro ou de ônibus começa por uma pergunta simples: qual é a distância entre a cidade de origem e a de destino? A resposta, porém, não é única — existe a distância em linha reta e a distância pela estrada, e elas costumam ser bem diferentes.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Linha reta x distância rodoviária</h2>
        <p>A <strong>distância em linha reta</strong> (ou geodésica) é a menor distância possível entre dois pontos, calculada com as coordenadas de latitude e longitude pela fórmula de Haversine. É útil para ter uma referência, mas nenhuma estrada é perfeitamente reta.</p>
        <p>A <strong>distância rodoviária</strong> é o que você realmente percorre, acompanhando o traçado das rodovias, contornos e relevo. Na prática, ela costuma ser de 20% a 40% maior que a linha reta. Por isso, em nossas estimativas aplicamos um fator médio de correção de cerca de 30% sobre a linha reta.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Como estimar o tempo de viagem</h2>
        <p>Com a distância rodoviária em mãos, o tempo é uma conta direta: distância dividida pela velocidade média. Para estradas brasileiras, use como referência cerca de 80 km/h de carro e 60 km/h de ônibus. Lembre-se de somar paradas para descanso, abastecimento e refeições — em viagens longas, o tempo real pode ser bem maior que o teórico.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Quanto vou gastar de combustível?</h2>
        <p>O cálculo do combustível depende de dois números: o consumo médio do seu veículo (km por litro) e o preço do litro. A fórmula é:</p>
        <ul>
          <li><strong>Litros necessários</strong> = distância ÷ consumo (km/l)</li>
          <li><strong>Custo</strong> = litros × preço do litro</li>
        </ul>
        <p>Por exemplo, numa viagem de 430 km com um carro que faz 12 km/l e gasolina a R$ 6,00, são cerca de 36 litros, ou aproximadamente R$ 215 só de ida. Para o trajeto de volta, dobre o valor.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Planeje a viagem completa</h2>
        <p>Além de distância e combustível, considere pedágios, manutenção e eventuais hospedagens. Uma boa estimativa evita surpresas no orçamento e ajuda a decidir entre dirigir ou comprar passagem.</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Calcule a sua rota agora</h3>
          <p className="text-blue-800">Use a nossa <Link href="/localizacao/distancia-cidades" className="underline font-semibold hover:text-blue-900">calculadora de distância entre cidades</Link> para qualquer cidade do Brasil. Veja também exemplos prontos, como a <Link href="/localizacao/distancia/rio-de-janeiro-rj/sao-paulo-sp" className="underline font-semibold hover:text-blue-900">distância entre Rio de Janeiro e São Paulo</Link>, e estime o gasto na <Link href="/utilidades/calculadora-combustivel" className="underline font-semibold hover:text-blue-900">calculadora de combustível</Link>.</p>
        </div>
      </>
    )
  },
  'salario-liquido-por-faixa-quanto-sobra': {
    title: 'Salário líquido por faixa: quanto sobra de R$ 2.000 a R$ 10.000',
    date: '02 de Julho, 2026',
    isoDate: '2026-07-02T11:00:00.000Z',
    category: 'Trabalhista',
    description: 'Veja quanto sobra do salário bruto após INSS e IRRF em diferentes faixas e entenda por que o líquido não cresce na mesma proporção que o bruto.',
    content: (
      <>
        <p>Quando você recebe uma proposta de emprego, o valor combinado é quase sempre o salário bruto. Mas o que cai na conta — o líquido — é menor, porque a folha de pagamento desconta INSS e Imposto de Renda na fonte (IRRF). Entender quanto sobra em cada faixa ajuda a negociar melhor e a planejar o orçamento.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Por que o líquido não acompanha o bruto</h2>
        <p>Os dois descontos obrigatórios são <strong>progressivos</strong>: quanto maior o salário, maior a alíquota aplicada sobre a parcela que excede cada faixa. Por isso, dobrar o salário bruto não dobra o líquido — a mordida dos impostos cresce mais rápido nas faixas mais altas.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Os dois descontos: INSS e IRRF</h2>
        <p>O <strong>INSS</strong> é calculado primeiro, pela tabela progressiva, sobre o salário bruto. Em seguida, o <strong>IRRF</strong> incide sobre o salário já descontado o INSS, com direito ao desconto simplificado ou às deduções legais (dependentes e pensão). Salários mais baixos costumam ser isentos de IR.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Tabela: quanto sobra em cada faixa</h2>
        <p>Veja o salário líquido estimado no cenário-base (sem dependentes ou outros descontos), usando as tabelas vigentes:</p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-2 pr-4 font-bold text-slate-700">Salário bruto</th>
                <th className="py-2 font-bold text-slate-700">Salário líquido (aprox.)</th>
              </tr>
            </thead>
            <tbody>
              {[2000, 3000, 4000, 5000, 6000, 8000, 10000].map((v) => (
                <tr key={v} className="border-b border-slate-100">
                  <td className="py-2 pr-4">R$ {v.toLocaleString('pt-BR')}</td>
                  <td className="py-2 font-semibold text-emerald-700">{liquidoBase(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500">Valores no cenário-base, sem dependentes, pensão ou outros descontos (como vale-transporte e plano de saúde), que podem reduzir o líquido.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Como reduzir o desconto legalmente</h2>
        <p>Você pode diminuir a base de cálculo do Imposto de Renda informando <strong>dependentes</strong> e <strong>pensão alimentícia</strong> judicial, além de contribuições previdenciárias. Vale a pena simular com os seus dados reais para saber o valor exato.</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Calcule o seu salário líquido</h3>
          <p className="text-blue-800">Personalize com dependentes e outros descontos na <Link href="/financeiro/salario-liquido" className="underline font-semibold hover:text-blue-900">calculadora de salário líquido</Link>. Pensando em virar PJ? Compare com o <Link href="/financeiro/conversor-clt-pj" className="underline font-semibold hover:text-blue-900">conversor CLT x PJ</Link>.</p>
        </div>
      </>
    )
  },
  'como-saber-se-estou-sendo-processado': {
    title: 'Como saber se estou sendo processado? Guia completo e Legal (LGPD)',
    date: '15 de Junho, 2026',
    isoDate: '2026-06-15T21:00:00.000Z',
    category: 'Jurídico',
    description: 'Descubra como pesquisar se o seu nome está envolvido em processos judiciais de forma totalmente gratuita, segura e de acordo com a LGPD.',
    content: (
      <>
        <p>Receber a notícia de que existe um processo judicial no seu nome é algo que assusta qualquer pessoa. Muitas vezes, descobrimos a existência de uma ação (trabalhista, de consumo, ou cível) tarde demais, quando uma conta bancária é bloqueada ou um oficial de justiça bate à porta.</p>
        <p>Por sorte, a legislação brasileira determina que, via de regra, os processos judiciais são documentos públicos. Isso significa que você mesmo pode investigar a própria situação jurídica sem precisar pagar um advogado logo de cara.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">A Legalidade da Busca e a LGPD</h2>
        <p>Muitas pessoas têm dúvidas se investigar processos de terceiros online ou mesmo usar sites que indexam o Diário Oficial viola a Lei Geral de Proteção de Dados (LGPD). A resposta curta é: <strong>Não viola</strong>.</p>
        <p>O artigo 93, inciso IX da Constituição Federal do Brasil assegura o Princípio da Publicidade dos atos processuais. Ou seja, a regra no país é que processos sejam abertos ao público para garantir a transparência do Judiciário. As únicas exceções são processos que correm em <em>Segredo de Justiça</em> (casos de divórcio, pensão alimentícia envolvendo menores de idade, e alguns crimes específicos).</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Onde e como procurar de forma gratuita?</h2>
        <p>Existem três formas principais de descobrir se você está sendo processado:</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">1. Sites Agregadores (Jusbrasil e Escavador)</h3>
        <p>Esses sites possuem "robôs" que leem todos os Diários Oficiais da Justiça de todos os estados brasileiros diariamente. Quando um juiz dá um despacho citando o seu nome completo, o nome vai para o Diário Oficial, e o Jusbrasil captura essa informação. Essa é a forma mais rápida e fácil de buscar.</p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">2. Sites dos Tribunais de Justiça (TJs) e Justiça do Trabalho (TRTs)</h3>
        <p>Se você desconfia que está sendo processado no seu estado de residência, você pode acessar o site do TJ do seu estado (ex: TJSP para São Paulo, TJRJ para o Rio de Janeiro) e procurar pela seção "Consulta Processual de 1º Grau". A busca pode ser feita utilizando apenas o seu CPF. O mesmo vale para o site da Justiça do Trabalho (TRT).</p>

        <h3 className="text-xl font-bold mt-6 mb-3">3. Consulta Avançada no Google</h3>
        <p>Ao colocar o seu nome completo entre aspas (exemplo: <em>"Joao Batista da Silva"</em>) e adicionar a palavra <em>processo</em> no Google, o buscador faz uma varredura nas bases de dados indexadas do governo e de sites jurídicos.</p>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-emerald-900 mb-2">Encurtamos o caminho para você!</h3>
          <p className="text-emerald-800">
            Criamos uma ferramenta segura e 100% Client-Side (nós não salvamos nem lemos os dados que você digita) que gera os links diretos de busca em todos esses portais com apenas um clique. 
            Acesse o nosso <strong><Link href="/documentos/consulta-processos" className="underline font-semibold hover:text-emerald-900">Gerador de Consulta de Processos</Link></strong> agora mesmo.
          </p>
        </div>
      </>
    )
  },
  'o-que-e-uuid-e-por-que-e-seguro': {
    title: 'O que é um UUID e por que ele é seguro?',
    date: '15 de Junho, 2026',
    isoDate: '2026-06-15T12:00:00.000Z',
    category: 'Tecnologia',
    description: 'Entenda como funcionam os Identificadores Únicos Universais, por que eles são vitais para o desenvolvimento de software e a probabilidade quase nula de uma colisão.',
    content: (
      <>
        <p>Um <strong>UUID</strong> (<em>Universally Unique Identifier</em>) é uma sequência de caracteres de 128 bits usada para identificar informações de forma única e exclusiva na computação, sem a necessidade de coordenação centralizada. Você provavelmente já viu um UUID, que se parece com algo assim: <code>550e8400-e29b-41d4-a716-446655440000</code>.</p>
        
        <h2>A Matemática por Trás do UUID (Por que não repete?)</h2>
        <p>A força primária do UUID v1 ou v4 reside na sua entropia. Com 128 bits, existem exatamente <code>340.282.366.920.938.463.463.374.607.431.768.211.456</code> combinações possíveis. É um número tão gigantesco que foge da compreensão humana. Para colocar em perspectiva, se você gerasse 1 bilhão de UUIDs por segundo durante os próximos 100 anos, a probabilidade de criar um único UUID duplicado seria de menos de 0.00000000006%.</p>
        
        <h2>Uso Prático em Bancos de Dados e Sistemas Distribuídos</h2>
        <p>Desenvolvedores frequentemente precisam de IDs para entidades como "usuários", "produtos" ou "transações". Tradicionalmente, usava-se IDs incrementais (1, 2, 3...), mas com o advento dos microsserviços e da computação em nuvem, bancos de dados distribuídos não podem sincronizar de forma fácil e barata qual foi o "último número gerado" entre servidores na Ásia, Europa e Américas simultaneamente.</p>
        <p>É aqui que o UUID brilha. Qualquer servidor isolado pode gerar um UUID e enviá-lo ao banco central com a confiança cega de que não haverá choque com o ID de outro servidor.</p>

        <h2>Onde usar nosso Gerador?</h2>
        <p>Se você precisa preencher tabelas de teste (seed), mockar APIs (arquivos JSON) ou testar a inserção no banco de dados, o <Link href="/utilidades/gerador-uuid" className="text-blue-600 underline">nosso Gerador de UUID v4</Link> é uma ferramenta excelente. Ele gera as chaves instantaneamente e no seu navegador, garantindo que não estamos logando ou espionando suas operações de infraestrutura.</p>
      </>
    )
  },
  'como-funciona-tabela-fipe': {
    title: 'Como funciona a Tabela FIPE na prática?',
    date: '14 de Junho, 2026',
    isoDate: '2026-06-14T12:00:00.000Z',
    category: 'Financeiro',
    description: 'Descubra como a Fundação Instituto de Pesquisas Econômicas calcula o preço médio dos veículos no Brasil e como usar isso a seu favor na hora da negociação.',
    content: (
      <>
        <p>A Tabela FIPE (Fundação Instituto de Pesquisas Econômicas) é o principal indicador para o mercado de veículos usados e seminovos no Brasil. Seja para comprar, vender ou calcular o valor do IPVA e do seguro, a FIPE é o seu referencial primário. Mas como ela chega naqueles valores exatos mês a mês?</p>

        <h2>Como o preço médio é calculado</h2>
        <p>A metodologia da FIPE consiste na coleta massiva de preços de carros, motos e caminhões usados, seminovos e novos no mercado nacional. Eles filtram valores muito altos ou muito baixos (para remover anomalias estatísticas, como vendas entre familiares com descontos drásticos, ou carros blindados super-valorizados) e tiram a média.</p>
        <p>Por isso, carros que têm "pacotes opcionais" invisíveis no modelo padrão podem ser vendidos acima da tabela, enquanto carros mal cuidados ou de repasse são vendidos consideravelmente abaixo.</p>

        <h2>Tabela FIPE e o Seguro Auto</h2>
        <p>Quando uma corretora de seguros oferece uma cobertura, geralmente vemos cláusulas como "Cobertura de 100% da Tabela FIPE". Isso significa que, em caso de perda total ou roubo, a indenização que você vai receber será o valor exato que estiver listado na FIPE no <strong>mês do pagamento da indenização</strong>, não no mês do sinistro, nem do fechamento do contrato.</p>

        <h2>Facilitando a Consulta</h2>
        <p>No aplicativo do BuscaCentral, você não precisa ficar rodando abas lentas para encontrar o seu modelo. Nós criamos uma <Link href="/financeiro/tabela-fipe" className="text-blue-600 underline">interface unificada e ultrarrápida da Tabela FIPE</Link> onde basta selecionar a Marca, Modelo e Ano para ver a cotação no mesmo segundo, sem recarregar a página.</p>
      </>
    )
  },
  'diferenca-clt-e-pj': {
    title: 'CLT vs PJ: Qual vale mais a pena?',
    date: '10 de Junho, 2026',
    isoDate: '2026-06-10T12:00:00.000Z',
    category: 'Trabalhista',
    description: 'Um guia completo e prático sobre os prós e contras de trabalhar com carteira assinada versus abrir a própria empresa e faturar como Pessoa Jurídica.',
    content: (
      <>
        <p>O debate entre trabalhar sob o regime da CLT (Consolidação das Leis do Trabalho) e trabalhar como PJ (Pessoa Jurídica) é uma constante para profissionais em início de carreira, especialmente na área de tecnologia e prestação de serviços. Entender a matemática por trás dessas duas modalidades é crucial para não perder dinheiro.</p>

        <h2>A Ilusão do Salário Bruto</h2>
        <p>Um erro comum é comparar os salários diretos. Uma proposta CLT de R$ 5.000,00 e uma PJ de R$ 6.000,00 não são iguais. Na CLT, existe uma rede de segurança: 13º salário, 1/3 de férias, FGTS (8% mensais), seguro-desemprego, INSS pago parcialmente pela empresa, plano de saúde, vale-refeição e estabilidade. Ao abrir mão dessa proteção para ir para o regime PJ, o valor do contrato precisa cobrir obrigatoriamente a ausência desses direitos.</p>

        <h2>Como calcular a equivalência</h2>
        <p>Para um salário CLT se equiparar ao PJ, você não deve comparar o valor mensal, mas sim o seu <strong>Faturamento Anual Líquido</strong>. O cálculo inclui deduzir a tabela progressiva do IRPF e do INSS no caso da CLT, somar o pacote de benefícios, contrapor aos custos do CNPJ (Simples Nacional, DAS, contabilidade e INSS sobre o Pró-labore) para o cenário PJ.</p>
        <p>Geralmente, estima-se que para uma vaga PJ valer a pena, o valor bruto oferecido precisa ser cerca de 40% a 60% maior do que o valor bruto da CLT.</p>

        <h2>Ferramenta de Cálculo de Paridade</h2>
        <p>Fazer essas contas no papel usando tabelas tributárias de 2024 é doloroso. É exatamente por isso que desenvolvemos nosso simulador de paridade. Use a nossa <Link href="/financeiro/conversor-clt-pj" className="text-blue-600 underline">Calculadora de Conversão CLT para PJ</Link>. Você insere quanto quer receber como PJ e a ferramenta diz na hora o exato salário CLT equivalente, descontando o imposto atualizado do Governo Federal.</p>
      </>
    )
  },
  'por-que-empresas-precisam-gerar-cpf-para-testes': {
    title: 'Por que empresas precisam gerar CPF para testes?',
    date: '15 de Junho, 2026',
    isoDate: '2026-06-15T12:00:00.000Z',
    category: 'Desenvolvimento',
    description: 'Descubra por que o uso de CPFs reais em ambientes de teste é um risco de segurança e como os geradores de CPF ajudam empresas a validarem seus sistemas de forma ética.',
    content: (
      <>
        <p>A Lei Geral de Proteção de Dados (LGPD) mudou drasticamente a forma como as empresas lidam com informações pessoais. Usar CPFs ou CNPJs reais para testar sistemas não é apenas antiético, é ilegal e pode render multas milionárias.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O perigo do "banco de dados espelho"</h2>
        <p>No passado, era comum que equipes de desenvolvimento fizessem uma cópia do banco de dados de produção para realizar testes localmente. Isso significava que os desenvolvedores tinham acesso a milhares de CPFs de clientes reais.</p>
        <p>Hoje, isso é uma violação grave de segurança. Para testar formulários, integrações com meios de pagamento ou validações de cadastro, os programadores utilizam dados fictícios que obedecem à mesma lógica matemática dos dados reais, mas não pertencem a ninguém.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Como a matemática resolve o problema</h2>
        <p>O CPF possui uma lógica matemática chamada de "Dígitos Verificadores" (os dois últimos números). Um gerador de CPF cria 9 números aleatórios e calcula os dois últimos para que a validação matemática passe perfeitamente nos testes, sem vazar os dados de uma pessoa real.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Precisa testar o seu sistema agora?</h3>
          <p className="text-blue-800">Acesse nossa ferramenta gratuita para <Link href="/documentos/gerador-cpf" className="underline font-semibold hover:text-blue-900">Gerar CPF Válido</Link> e mantenha seus testes seguros e dentro da lei!</p>
        </div>
      </>
    )
  },
  'juros-compostos-o-segredo-dos-investimentos': {
    title: 'Juros Compostos: O segredo para multiplicar seu patrimônio',
    date: '16 de Junho, 2026',
    isoDate: '2026-06-16T12:00:00.000Z',
    category: 'Financeiro',
    description: 'Entenda como a mágica dos juros sobre juros funciona e como o tempo é o seu maior aliado na construção de riqueza a longo prazo.',
    content: (
      <>
        <p>Albert Einstein teria dito certa vez que "os juros compostos são a oitava maravilha do mundo". Seja essa citação verdadeira ou não, a matemática por trás dos juros compostos é, sem dúvida, o motor principal do crescimento de patrimônio.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O que são Juros Compostos?</h2>
        <p>Diferente dos juros simples, onde o rendimento incide apenas sobre o valor inicial, nos juros compostos o rendimento de um mês é somado ao montante inicial, e no mês seguinte, os juros incidirão sobre esse novo valor (o montante total).</p>
        <p>Isso gera o chamado "efeito bola de neve". No começo, o crescimento parece insignificante. Mas ao longo de 10, 20 ou 30 anos, a curva de crescimento torna-se exponencial.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Tempo: O ingrediente secreto</h2>
        <p>Muitas pessoas acham que para investir é preciso ter muito dinheiro. A verdade é que o tempo é muito mais importante que o dinheiro nos juros compostos. Começar a investir R$ 100 por mês aos 20 anos pode resultar em um patrimônio muito maior do que começar a investir R$ 500 por mês aos 40 anos.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Faça as suas próprias simulações</h3>
          <p className="text-blue-800">Descubra quanto dinheiro você terá no futuro utilizando nossa <Link href="/financeiro/juros-compostos" className="underline font-semibold hover:text-blue-900">Calculadora de Juros Compostos</Link>. Planeje sua independência financeira hoje!</p>
        </div>
      </>
    )
  },
  'tamanho-ideal-textos-seo-redes-sociais': {
    title: 'SEO e Textos: O tamanho ideal para cada rede social',
    date: '16 de Junho, 2026',
    isoDate: '2026-06-16T15:00:00.000Z',
    category: 'Marketing',
    description: 'Saber a quantidade exata de caracteres para o Twitter, Instagram, SEO (Meta Titles) e anúncios faz toda a diferença no seu engajamento.',
    content: (
      <>
        <p>Em um mundo onde a atenção é escassa, acertar o tamanho do texto pode determinar se a sua mensagem será lida ou completamente ignorada. E mais: o tamanho correto evita que seu texto seja "cortado" (...), o que afeta drasticamente o SEO e as taxas de clique (CTR).</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Meta Title e Meta Description (SEO)</h2>
        <p>Para o Google, um <strong>Meta Title</strong> deve ter idealmente entre 50 e 60 caracteres. Passou de 60, o Google irá truncar o título. Já a <strong>Meta Description</strong> (o textinho que aparece embaixo do título na pesquisa) tem seu ponto ideal entre 150 e 160 caracteres.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Twitter e Instagram</h2>
        <p>O X (antigo Twitter) permite até 280 caracteres na versão gratuita, mas estudos indicam que tweets entre 71 e 100 caracteres engajam 17% a mais. Já no Instagram, os 125 primeiros caracteres da legenda são cruciais, pois é onde a plataforma insere o botão "Ver mais".</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Conte seus textos antes de publicar</h3>
          <p className="text-blue-800">Não deixe seu texto ser cortado! Utilize o nosso <Link href="/utilidades/contador-caracteres" className="underline font-semibold hover:text-blue-900">Contador de Caracteres e Palavras</Link> para ajustar seus posts de forma milimétrica.</p>
        </div>
      </>
    )
  },
  'calculadora-de-imc-e-peso-ideal': {
    title: 'IMC e Saúde: Como calcular e entender seu peso ideal',
    date: '17 de Junho, 2026',
    isoDate: '2026-06-17T10:00:00.000Z',
    category: 'Saúde',
    description: 'Entenda como funciona o Índice de Massa Corporal (IMC), suas limitações para atletas e como usá-lo como um guia inicial para a sua saúde.',
    content: (
      <>
        <p>O Índice de Massa Corporal (IMC) é uma métrica criada no século 19 pelo matemático Adolphe Quetelet e, até hoje, é o padrão utilizado pela Organização Mundial da Saúde (OMS) para classificar o peso das populações.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Como a matemática do IMC funciona?</h2>
        <p>O cálculo é extremamente simples: basta dividir o seu peso (em quilos) pela sua altura (em metros) elevada ao quadrado. O número resultante encaixa você em uma tabela de classificação que vai de "Abaixo do peso" até "Obesidade Grau III".</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A limitação para Atletas</h2>
        <p>Apesar de ser excelente para dados populacionais, o IMC falha miseravelmente ao analisar atletas ou pessoas com grande volume de massa muscular (hipertrofia). Como músculos pesam mais que gordura (em relação ao volume), um fisiculturista pode ser classificado como "Obeso" no IMC, mesmo tendo apenas 8% de gordura corporal.</p>
        <p>Por isso, o IMC deve ser usado como um indicador inicial de saúde, mas nunca substituir exames como bioimpedância ou a avaliação dobras cutâneas.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Descubra o seu IMC agora mesmo</h3>
          <p className="text-blue-800">Calcule em menos de 5 segundos utilizando a nossa <Link href="/utilidades/calculadora-imc" className="underline font-semibold hover:text-blue-900">Calculadora de IMC Online</Link> e veja em qual classificação você se encontra.</p>
        </div>
      </>
    )
  },
  'o-que-e-base64-e-como-funciona': {
    title: 'O que é Base64 e por que ele é onipresente na web?',
    date: '17 de Junho, 2026',
    isoDate: '2026-06-17T12:00:00.000Z',
    category: 'Desenvolvimento',
    description: 'Descubra como a codificação Base64 transforma imagens, arquivos e dados binários em texto simples para transitarem de forma segura pela internet.',
    content: (
      <>
        <p>Se você já analisou o código fonte de uma página web ou inspecionou um e-mail com anexos, provavelmente já se deparou com um bloco gigante de letras e números aleatórios acompanhados de um `data:image/png;base64,`. Isso é a magia do Base64 em ação.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Por que precisamos de texto?</h2>
        <p>Protocolos antigos da internet (como o SMTP para e-mails) foram desenhados para trafegar apenas texto em inglês (tabela ASCII). Eles entram em pânico se tentarem transmitir um dado "binário" cru, como um arquivo de áudio ou uma imagem. É aí que entra o Base64.</p>
        <p>O Base64 é um algoritmo de <strong>codificação</strong> (não confunda com criptografia) que pega dados binários ilegíveis e os converte num conjunto de 64 caracteres seguros (A-Z, a-z, 0-9, + e /). Assim, um arquivo ZIP pode "fingir" ser um texto normal e passar livremente por qualquer sistema de e-mail ou API JSON.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Codificação não é Criptografia</h2>
        <p>Muitos desenvolvedores novatos cometem o erro catastrófico de "proteger" senhas convertendo-as para Base64. Lembre-se: o Base64 é universal e bidirecional. Qualquer pessoa no planeta consegue reverter um Base64 para o seu estado original em milissegundos, pois não há nenhuma "chave secreta" envolvida.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Ferramenta de Conversão Rápida</h3>
          <p className="text-blue-800">Precisa encodar ou decodar uma string ou token JWT? Use o nosso <Link href="/utilidades/base64" className="underline font-semibold hover:text-blue-900">Conversor Base64 Gratuito</Link> e tenha o resultado na mesma hora, diretamente no seu navegador.</p>
        </div>
      </>
    )
  },
  'como-funciona-api-de-cep-correios': {
    title: 'Como funciona a estrutura e a busca de um CEP no Brasil?',
    date: '18 de Junho, 2026',
    isoDate: '2026-06-18T09:00:00.000Z',
    category: 'Tecnologia',
    description: 'Entenda a lógica por trás dos 8 dígitos do Código de Endereçamento Postal brasileiro e como sistemas integram essas buscas na hora do frete.',
    content: (
      <>
        <p>O Código de Endereçamento Postal (CEP) foi criado pelos Correios em 1971 para acelerar e organizar a entrega de correspondências em um país com dimensões continentais como o Brasil. Mas aqueles 8 dígitos estão longe de serem números aleatórios.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A anatomia de um CEP</h2>
        <p>O Brasil é dividido em 10 regiões postais (o primeiro dígito). Por exemplo, CEPs começando com 0 são da Grande São Paulo, enquanto os começando com 2 cobrem o Rio de Janeiro e Espírito Santo.</p>
        <p>Os 5 primeiros dígitos indicam o roteamento macrorregional (Região, Sub-região, Setor, Subsetor e Divisor de Subsetor). Já os 3 últimos dígitos, após o hífen, representam ruas específicas ou, em cidades muito pequenas, um código geral para toda a cidade (geralmente terminados em -000).</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">APIs de CEP no E-commerce</h2>
        <p>Quando você digita o seu CEP num e-commerce e a sua rua aparece quase como mágica, existe um sistema fazendo uma chamada rápida a uma "API" (uma ponte de dados). O sistema cruza os 8 números com o banco de dados oficial dos Correios (o DNE - Diretório Nacional de Endereços) para popular o formulário de frete sem que você precise digitar a rua, o bairro ou a cidade.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Consulte qualquer endereço</h3>
          <p className="text-blue-800">Descubra a rua exata de qualquer CEP do Brasil em tempo real usando nossa página rápida de <Link href="/localizacao/busca-cep" className="underline font-semibold hover:text-blue-900">Busca de CEP</Link>.</p>
        </div>
      </>
    )
  },
  'entenda-o-calculo-de-rescisao-de-contrato': {
    title: 'Demissão ou Pedido de Contas: Como calcular a Rescisão Trabalhista',
    date: '18 de Junho, 2026',
    isoDate: '2026-06-18T14:00:00.000Z',
    category: 'Trabalhista',
    description: 'Aprenda os conceitos básicos do acerto trabalhista na CLT. Saiba o que muda nos seus direitos quando você é demitido sem justa causa ou decide pedir demissão.',
    content: (
      <>
        <p>O momento da rescisão do contrato de trabalho gera ansiedade tanto para o funcionário quanto para o empregador. Compreender a matemática e a lei por trás das verbas rescisórias evita surpresas e garante que os direitos de ambas as partes sejam respeitados.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Demissão sem Justa Causa</h2>
        <p>Neste cenário, a empresa decide encerrar o vínculo com o funcionário. É a rescisão mais favorável financeiramente ao trabalhador. Ele tem direito a receber o saldo de salário dos dias trabalhados, férias vencidas e proporcionais (acrescidas de 1/3), 13º salário proporcional, e o aviso prévio (que pode ser trabalhado ou indenizado).</p>
        <p>Além disso, o funcionário tem acesso liberado ao seu saldo do FGTS acumulado, acrescido da famosa <strong>multa de 40%</strong> sobre esse total, e pode requerer o Seguro-Desemprego.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Pedido de Demissão</h2>
        <p>Quando a vontade de sair parte do funcionário, a lei retira algumas proteções que antes oneravam a empresa. No pedido de demissão, o funcionário perde o direito de sacar o saldo do FGTS, perde a multa de 40% e não pode acionar o Seguro-Desemprego.</p>
        <p>Além disso, ele deve cumprir o aviso prévio à empresa. Se decidir sair imediatamente e não cumprir os 30 dias de aviso, a empresa tem o direito de <strong>descontar</strong> esse valor do seu acerto final, o que muitas vezes faz a rescisão do funcionário zerar.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Simule seu Acerto Trabalhista</h3>
          <p className="text-blue-800">Calcule os valores exatos e evite surpresas. Use a nossa <Link href="/financeiro/rescisao-trabalhista" className="underline font-semibold hover:text-blue-900">Calculadora de Rescisão do Contrato de Trabalho</Link> de forma 100% gratuita.</p>
        </div>
      </>
    )
  },
  'como-funciona-um-extrator-de-emails': {
    title: 'Extrator de E-mails: O que é, como funciona e cuidados',
    date: '19 de Junho, 2026',
    isoDate: '2026-06-19T10:00:00.000Z',
    category: 'Marketing',
    description: 'Aprenda como funcionam os extratores de e-mail a partir de blocos de texto e as práticas éticas para montar listas de contato.',
    content: (
      <>
        <p>Ao trabalhar com Marketing Digital, Vendas (B2B) ou até mesmo recrutamento, é muito comum receber blocos imensos de texto, planilhas desformatadas ou páginas da web contendo dezenas de e-mails misturados no meio do texto. Puxar um por um manualmente é inviável e propenso a erros.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Lógica da Extração (Regex)</h2>
        <p>Por trás de todo bom extrator de e-mails, existe uma "Expressão Regular" (Regex). O sistema analisa instantaneamente milhares de caracteres de um texto procurando pelo padrão universal: uma palavra, o símbolo de arroba (@), outra palavra e uma terminação de domínio (como .com, .br, .org).</p>
        <p>Uma vez que os e-mails são localizados, a ferramenta os separa, limpa a sujeira do texto em volta, remove os e-mails que apareceram duplicados e os devolve em uma lista limpa, pronta para ser exportada para Excel ou CSV.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Ética e LGPD</h2>
        <p>Extrair e-mails de um documento que a sua empresa possui é uma ferramenta de produtividade. No entanto, utilizar "robôs" para extrair milhões de e-mails da web para fazer "Cold Email" (Spam) em massa fere as diretrizes da Lei Geral de Proteção de Dados (LGPD). Construa suas listas de forma orgânica e ética, sempre oferecendo a opção de desinscrição.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Limpe seu texto agora mesmo</h3>
          <p className="text-blue-800">Tem um bloco de texto cheio de e-mails perdidos? Cole no nosso <Link href="/utilidades/extrator-emails" className="underline font-semibold hover:text-blue-900">Extrator de E-mails</Link> e tenha a lista limpa em menos de um segundo.</p>
        </div>
      </>
    )
  },
  'simulando-investimentos-tesouro-direto-vs-cdb': {
    title: 'Simulando Investimentos: Tesouro Direto vs. CDB',
    date: '19 de Junho, 2026',
    isoDate: '2026-06-19T14:00:00.000Z',
    category: 'Finanças',
    description: 'Entenda as diferenças entre as duas principais portas de entrada para os investimentos de Renda Fixa no Brasil e aprenda a simular a rentabilidade.',
    content: (
      <>
        <p>A poupança perde constantemente para a inflação. Por isso, quem quer proteger e multiplicar seu patrimônio deve migrar para a Renda Fixa. No Brasil, os dois investimentos mais comuns e seguros para isso são o Tesouro Direto e os CDBs (Certificados de Depósito Bancário).</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O Tesouro Direto</h2>
        <p>Ao investir no Tesouro Direto, você está, literalmente, emprestando dinheiro para o Governo Federal. Por isso, é considerado o investimento mais seguro do país. O "Tesouro Selic" segue a taxa básica de juros da economia, enquanto o "Tesouro IPCA+" protege o dinheiro contra a inflação e paga uma taxa fixa adicional.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O que é o CDB?</h2>
        <p>Já no CDB, você empresta o dinheiro para um Banco. Em troca, o banco te paga juros, geralmente atrelados a um indicador chamado CDI (que caminha colado à Selic). A vantagem do CDB é que muitos bancos menores oferecem rentabilidades acima de 100% do CDI, o que paga mais que o Tesouro Direto. O risco também é muito baixo, já que os CDBs contam com a proteção do Fundo Garantidor de Créditos (FGC) para valores até R$ 250 mil.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Simule a sua carteira</h3>
          <p className="text-blue-800">Descubra quanto você terá em 1, 5 ou 10 anos aplicando um pouco por mês. Utilize nosso <Link href="/financeiro/simulador-investimentos" className="underline font-semibold hover:text-blue-900">Simulador de Investimentos</Link>.</p>
        </div>
      </>
    )
  },
  'qr-code-tudo-que-voce-precisa-saber': {
    title: 'QR Code: A tecnologia de matriz que dominou o mundo',
    date: '20 de Junho, 2026',
    isoDate: '2026-06-20T08:00:00.000Z',
    category: 'Tecnologia',
    description: 'Entenda como o Quick Response (QR) funciona, por que ele superou o código de barras tradicional e as melhores formas de gerá-lo.',
    content: (
      <>
        <p>Você o vê em cardápios de restaurantes, placas do PIX e embalagens de produtos. O QR Code (Quick Response Code) foi inventado em 1994 pela Denso Wave (uma subsidiária da Toyota) para rastrear peças de carros durante a montagem. Hoje, ele está em todo lugar.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Código de Barras vs. QR Code</h2>
        <p>O tradicional código de barras é "unidimensional" (1D). Ele lê os dados apenas horizontalmente. Já o QR Code é "bidimensional" (2D), lendo dados de cima para baixo e da esquerda para a direita. Essa diferença simples permite que um código de barras armazene, no máximo, cerca de 20 dígitos numéricos, enquanto um QR Code pode armazenar até 7.000 caracteres de texto denso!</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Tolerância a falhas</h2>
        <p>A mágica mais brilhante do QR Code é a Correção de Erros Reed-Solomon. Ele foi projetado para continuar legível mesmo se estiver arranhado, rasgado ou sujo. Dependendo do nível de correção escolhido na hora de gerá-lo, até 30% da imagem pode ser destruída e a câmera do celular ainda conseguirá ler o conteúdo perfeitamente. É por isso que você consegue escanear um código amassado com tanta facilidade.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Crie o seu gratuitamente</h3>
          <p className="text-blue-800">Quer gerar um código para o seu Wi-Fi, Cardápio ou WhatsApp? Use o nosso <Link href="/utilidades/gerador-qr-code" className="underline font-semibold hover:text-blue-900">Gerador de QR Code</Link> sem instalar nada.</p>
        </div>
      </>
    )
  },
  'dolar-hoje-por-que-a-cotacao-oscila-tanto': {
    title: 'Dólar Hoje: Entenda por que a Cotação da Moeda oscila todos os dias',
    date: '20 de Junho, 2026',
    isoDate: '2026-06-20T16:00:00.000Z',
    category: 'Economia',
    description: 'Aprenda os motivos econômicos e políticos que fazem as moedas globais flutuarem e como acompanhar a cotação em tempo real.',
    content: (
      <>
        <p>A cotação do Dólar dita os rumos da economia mundial. Do pãozinho na padaria (pois o trigo é importado) até a passagem de avião e as peças de tecnologia, quase tudo que consumimos tem seu preço final influenciado pela moeda americana.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O regime de Câmbio Flutuante</h2>
        <p>Desde 1999, o Brasil adota o "câmbio flutuante". Isso significa que o preço do dólar é determinado pela simples lei da oferta e da demanda. Se muitas empresas estrangeiras querem investir no Brasil, elas precisam comprar Reais vendendo Dólares. Se há muitos Dólares no país, a moeda fica mais barata. Já se investidores tiram seu dinheiro daqui, os dólares saem do país, e a cotação sobe.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Juros, Risco Político e Inflação</h2>
        <p>O fluxo de dólares que entra ou sai do país depende, majoritariamente, de três coisas: Os <strong>Juros</strong> (se o banco central americano paga juros altos, os investidores levam os dólares para os EUA), o <strong>Risco Político/Fiscal</strong> (incerteza afasta investidores, gerando fuga de capital) e o balanço de <strong>Exportações</strong> (o Brasil é um dos maiores exportadores agrícolas do mundo, o que traz uma enxurrada de dólares em épocas de safra).</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Acompanhe a variação ao vivo</h3>
          <p className="text-blue-800">Verifique os valores precisos e atualizados. Acesse a <Link href="/financeiro/cotacao" className="underline font-semibold hover:text-blue-900">Cotação de Moedas Hoje</Link> do BuscaCentral.</p>
        </div>
      </>
    )
  }
,
  'salario-bruto-vs-liquido-irrf-inss': {
    title: 'Salário Bruto vs. Líquido: Onde vai parar o seu dinheiro (INSS e IRRF)?',
    date: '21 de Junho, 2026',
    isoDate: '2026-06-21T10:00:00.000Z',
    category: 'Trabalhista',
    description: 'Entenda os descontos obrigatórios na folha de pagamento e aprenda a calcular o seu salário líquido real.',
    content: (
      <>
        <p>Ao assinar um contrato de trabalho, o valor que brilha aos olhos é o Salário Bruto. Porém, no fim do mês, o que cai na conta é o Salário Líquido. A diferença entre os dois é o que chamamos de "descontos em folha", sendo os principais o INSS e o IRRF.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O Leão e a Previdência</h2>
        <p>O INSS (Instituto Nacional do Seguro Social) é a sua contribuição para a aposentadoria e auxílios-doença. Ele segue uma tabela progressiva, onde quem ganha mais, paga uma porcentagem maior. Depois de deduzir o INSS, entra o IRRF (Imposto de Renda Retido na Fonte), que também tem suas faixas progressivas e uma parcela a deduzir.</p>
        <p>Dependendo da sua faixa salarial, esses descontos combinados podem chegar a corroer até 27,5% do seu rendimento.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Calcule o seu salário real</h3>
          <p className="text-blue-800">Use a nossa <Link href="/financeiro/salario-liquido" className="underline font-semibold hover:text-blue-900">Calculadora de Salário Líquido</Link> para saber exatamente quanto vai cair na sua conta.</p>
        </div>
      </>
    )
  },
  'guia-do-decimo-terceiro-salario': {
    title: 'Guia do 13º Salário: Quem tem direito e como é feito o cálculo',
    date: '21 de Junho, 2026',
    isoDate: '2026-06-21T12:00:00.000Z',
    category: 'Trabalhista',
    description: 'Tudo o que você precisa saber sobre a gratificação natalina, os prazos de pagamento e os descontos da segunda parcela.',
    content: (
      <>
        <p>O 13º salário, também conhecido como gratificação natalina, é um direito garantido a todos os trabalhadores com carteira assinada (CLT), além de aposentados, pensionistas e servidores públicos.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Como a matemática funciona?</h2>
        <p>O cálculo é proporcional aos meses trabalhados no ano. Se você trabalhou os 12 meses, recebe um salário inteiro extra. Se trabalhou 6 meses, recebe a metade. A regra de ouro é: para o mês contar para o cálculo, você deve ter trabalhado pelo menos 15 dias nele.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">As duas parcelas e os descontos</h2>
        <p>A primeira parcela (adiantamento) deve ser paga até 30 de novembro e corresponde a 50% do valor bruto, sem descontos. A segunda parcela deve ser paga até 20 de dezembro, e é nela que vêm todos os descontos acumulados (INSS e IRRF) referentes ao valor total do benefício.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Simule seu Décimo Terceiro</h3>
          <p className="text-blue-800">Descubra quanto você vai receber na primeira e na segunda parcela com a nossa <Link href="/financeiro/decimo-terceiro" className="underline font-semibold hover:text-blue-900">Calculadora de 13º Salário</Link>.</p>
        </div>
      </>
    )
  },
  'calculo-de-ferias-e-terco-constitucional': {
    title: 'Cálculo de Férias e Terço Constitucional: O que você precisa saber',
    date: '22 de Junho, 2026',
    isoDate: '2026-06-22T08:00:00.000Z',
    category: 'Trabalhista',
    description: 'Aprenda como funciona o cálculo do seu pagamento de férias, incluindo o adicional de um terço e os descontos legais.',
    content: (
      <>
        <p>O período de férias é o momento mais aguardado do ano. Mas além do descanso, existe um acréscimo financeiro garantido pela Constituição Federal: o Terço Constitucional de Férias.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Lógica do Cálculo</h2>
        <p>Quando você tira 30 dias de férias, a empresa deve pagar o seu salário normal, mais 1/3 (33,33%) desse salário. Por exemplo, se você ganha R$ 3.000, o seu terço constitucional será de R$ 1.000, totalizando R$ 4.000 brutos.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A armadilha dos descontos e do mês seguinte</h2>
        <p>Esse valor bruto também sofre pesados descontos de INSS e IRRF. Além disso, o pagamento das férias é um adiantamento. Como você recebe antes de sair, ao retornar de 30 dias de descanso, o seu contracheque do mês seguinte virá zerado (pois você já recebeu aqueles dias antecipadamente). Por isso, exige muito planejamento financeiro.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Planeje seu descanso</h3>
          <p className="text-blue-800">Antecipe-se e saiba exatamente quanto vai cair na sua conta usando nossa <Link href="/financeiro/ferias" className="underline font-semibold hover:text-blue-900">Calculadora de Férias</Link>.</p>
        </div>
      </>
    )
  },
  'bitcoin-ethereum-volatilidade-mercado': {
    title: 'Bitcoin e Ethereum: Como acompanhar a cotação e entender a volatilidade',
    date: '22 de Junho, 2026',
    isoDate: '2026-06-22T10:00:00.000Z',
    category: 'Economia',
    description: 'Desvende o mercado de criptoativos, entenda as diferenças entre as principais moedas e como a oferta e demanda ditam os preços.',
    content: (
      <>
        <p>As criptomoedas deixaram de ser um experimento cypherpunk e se tornaram uma classe de ativos multibilionária. O mercado é liderado majoritariamente por duas forças: o Bitcoin (BTC) e o Ethereum (ETH).</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Ouro Digital vs. Computador Mundial</h2>
        <p>O Bitcoin foi criado para ser um sistema financeiro descentralizado e escasso. Com um limite máximo de 21 milhões de moedas, ele ganhou o apelido de "Ouro Digital". Por outro lado, o Ethereum é focado em contratos inteligentes (Smart Contracts). Ele funciona como um computador mundial descentralizado onde aplicativos podem ser construídos e executados sem intermediários.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Por que os preços variam tanto?</h2>
        <p>Diferente de moedas estatais, criptomoedas não possuem um Banco Central para controlar a inflação ou segurar os preços. A volatilidade é extrema e impulsionada por fatores como: regulamentações governamentais, adoção institucional, macroeconomia global (taxas de juros dos EUA) e ciclos de mercado (como o Halving do Bitcoin).</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Acompanhe o mercado ao vivo</h3>
          <p className="text-blue-800">Verifique os preços em tempo real com a nossa <Link href="/financeiro/criptomoedas" className="underline font-semibold hover:text-blue-900">Tabela de Cotação de Criptomoedas</Link>.</p>
        </div>
      </>
    )
  },
  'financiamento-veiculos-tabela-price': {
    title: 'A ilusão das parcelas: Entenda a tabela Price no financiamento de veículos',
    date: '23 de Junho, 2026',
    isoDate: '2026-06-23T09:00:00.000Z',
    category: 'Finanças',
    description: 'Entenda como os bancos calculam as prestações do seu carro novo e quanto você realmente está pagando de juros.',
    content: (
      <>
        <p>Comprar um carro novo é o sonho de muitos brasileiros. Mas na empolgação do test-drive, é fácil ignorar a matemática fria que se esconde por trás do contrato de financiamento, muitas vezes resultando em pagar "dois carros e levar apenas um".</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Tabela Price</h2>
        <p>A imensa maioria dos financiamentos de veículos no Brasil utiliza a Tabela Price (ou Sistema Francês de Amortização). A principal característica da Price é que a <strong>parcela é fixa</strong> do início ao fim do contrato. No entanto, a composição dessa parcela muda drasticamente.</p>
        <p>Nas primeiras dezenas de parcelas, quase todo o seu dinheiro vai para pagar os <strong>juros</strong> do banco, abatendo muito pouco do valor real (principal) da dívida. É por isso que, se você tenta quitar um carro de 60 meses no 20º mês, percebe que a sua dívida ainda está quase do mesmo tamanho.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O custo Efetivo Total (CET)</h2>
        <p>Nunca olhe apenas para a "taxa de juros ao mês". Olhe sempre para o CET. Ele embute as taxas de abertura de crédito, seguros e tarifas administrativas. O CET é o custo real da sua dívida.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Não seja enganado</h3>
          <p className="text-blue-800">Antes de assinar qualquer contrato, use a nossa <Link href="/financeiro/financiamento-carro" className="underline font-semibold hover:text-blue-900">Calculadora de Financiamento de Veículos</Link> e veja o valor exato dos juros totais.</p>
        </div>
      </>
    )
  },
  'como-criar-uma-senha-forte': {
    title: 'Ataques de Força Bruta: Como criar uma senha impossível de ser hackeada',
    date: '23 de Junho, 2026',
    isoDate: '2026-06-23T14:00:00.000Z',
    category: 'Segurança',
    description: 'Aprenda os conceitos de criptografia básica e o que realmente torna uma senha impenetrável contra robôs invasores.',
    content: (
      <>
        <p>Senhas como "123456", "senha123" ou a sua data de nascimento são convites abertos para criminosos cibernéticos. Com o poder computacional moderno, descobrir essas senhas leva literalmente menos de 1 segundo.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O que é Ataque de Força Bruta?</h2>
        <p>Robôs hackers não "adivinham" senhas pensando, eles simplesmente testam milhares ou milhões de combinações por segundo. Se a sua senha possui apenas letras minúsculas e tem 6 caracteres, existem apenas algumas centenas de milhões de combinações possíveis, algo que um computador moderno resolve num piscar de olhos.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Comprimento é melhor que complexidade</h2>
        <p>A matemática da entropia diz que adicionar um novo caractere à sua senha aumenta a segurança exponencialmente mais do que trocar uma letra por um símbolo. Uma senha como "CachorroAmareloCorreMuito" (25 caracteres, apenas letras) é incrivelmente mais forte e fácil de lembrar do que "X@9!qZ" (6 caracteres complexos).</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A mistura perfeita</h2>
        <p>O ideal, contudo, é misturar o melhor dos dois mundos: comprimento e variedade (letras, números e símbolos especiais).</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Crie a sua armadura digital</h3>
          <p className="text-blue-800">Utilize o nosso <Link href="/utilidades/gerador-senha" className="underline font-semibold hover:text-blue-900">Gerador de Senhas Seguras</Link> para gerar combinações impenetráveis em um clique.</p>
        </div>
      </>
    )
  },
  'como-consultar-situacao-cnpj': {
    title: 'Como consultar a situação de um CNPJ e evitar fraudes na internet',
    date: '24 de Junho, 2026',
    isoDate: '2026-06-24T09:00:00.000Z',
    category: 'Segurança',
    description: 'Saiba interpretar o comprovante de situação cadastral e como identificar empresas de fachada antes de realizar compras ou contratos.',
    content: (
      <>
        <p>Fazer compras online, fechar parcerias comerciais ou assinar contratos de serviço sempre carrega um risco embutido. A melhor forma de realizar uma "Due Diligence" (diligência prévia) básica é consultar o status do CNPJ da empresa.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O que verificar no Cartão CNPJ?</h2>
        <p>A Receita Federal mantém o banco de dados oficial de todas as empresas do país. Ao consultar um CNPJ, preste atenção nestes três fatores vitais:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Situação Cadastral:</strong> Deve estar obrigatoriamente como "ATIVA". Uma empresa "BAIXADA", "INAPTA" ou "SUSPENSA" não tem permissão para emitir notas fiscais ou operar legalmente.</li>
          <li><strong>Data de Abertura:</strong> Desconfie de empresas oferecendo grandes vantagens, grandes estoques ou empréstimos, cuja data de abertura seja muito recente (menos de 6 meses). Golpistas frequentemente abrem "CNPJs de fachada" que duram poucos meses.</li>
          <li><strong>CNAE Principal:</strong> A atividade econômica da empresa deve bater com o que ela está vendendo. Uma empresa vendendo eletrônicos não deveria ter um CNAE de "Padaria".</li>
        </ul>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Investigue agora mesmo</h3>
          <p className="text-blue-800">Acesse o banco da Receita Federal em segundos através da nossa página de <Link href="/documentos/consulta-cnpj" className="underline font-semibold hover:text-blue-900">Consulta de CNPJ</Link>.</p>
        </div>
      </>
    )
  },
  'gerador-cartao-de-credito-testes': {
    title: 'Por que sistemas de teste usam algoritmos (Módulo 10) para gerar cartões virtuais?',
    date: '24 de Junho, 2026',
    isoDate: '2026-06-24T14:00:00.000Z',
    category: 'Desenvolvimento',
    description: 'Entenda como funciona o Algoritmo de Luhn e a matemática que valida qualquer cartão de crédito do mundo instantaneamente.',
    content: (
      <>
        <p>Quando você digita os 16 números do seu cartão de crédito numa loja virtual e erra um único dígito, o sistema avisa na hora que o número é inválido, antes mesmo de tentar cobrar com a operadora. Como o site sabe disso? A resposta é o Algoritmo de Luhn (ou Módulo 10).</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O Algoritmo de Luhn</h2>
        <p>Inventado por Hans Peter Luhn, um cientista da IBM em 1954, este algoritmo matemático é usado pelas bandeiras (Visa, Mastercard, Elo) para validar números de identificação.</p>
        <p>A conta funciona assim: começando da direita para a esquerda, dobra-se o valor de cada dígito alternado. Se o dobro for maior que 9, os dois dígitos do resultado são somados (ex: 7x2 = 14. 1+4 = 5). No final, soma-se todos os dígitos alterados com os não alterados. Se o resultado final for um múltiplo de 10 (terminar em zero), o número do cartão é matematicamente válido.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A importância para os desenvolvedores</h2>
        <p>Para testar carrinhos de compra e integrações com gateways de pagamento (como Stripe ou Pagar.me), os desenvolvedores não podem usar cartões reais. Eles precisam de números "falsos" que obedeçam rigorosamente ao Algoritmo de Luhn, para que a loja virtual os aceite como se fossem verdadeiros até a etapa final da compra.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Ferramenta para Desenvolvedores</h3>
          <p className="text-blue-800">Crie massa de dados para seus ambientes de Sandbox. Utilize nosso <Link href="/documentos/gerador-cartao-credito" className="underline font-semibold hover:text-blue-900">Gerador de Cartão de Crédito Válido</Link>.</p>
        </div>
      </>
    )
  },
  'criar-link-whatsapp-vendas': {
    title: 'API do WhatsApp: Como criar links diretos para aumentar as vendas',
    date: '25 de Junho, 2026',
    isoDate: '2026-06-25T08:00:00.000Z',
    category: 'Marketing',
    description: 'Aprenda a utilizar a API Click to Chat (wa.me) para encurtar o caminho do seu cliente e automatizar o início da conversa.',
    content: (
      <>
        <p>No e-commerce e no marketing digital modernos, o atrito é o maior inimigo da conversão. Se um cliente vê seu anúncio no Instagram, mas precisa salvar seu número na agenda telefônica antes de poder enviar um "Oi" no WhatsApp, você perderá 90% dos interessados no meio do caminho.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Solução "Click to Chat" (wa.me)</h2>
        <p>O próprio WhatsApp (Meta) desenvolveu uma API pública que permite iniciar uma conversa sem a necessidade de salvar o número do destinatário. Basta utilizar uma URL estruturada como <code>https://wa.me/numerodotelefone</code>.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O poder da Mensagem Pré-definida</h2>
        <p>A mágica real acontece quando você injeta texto nessa URL. Você pode criar um link que, ao ser clicado, não apenas abre o WhatsApp da sua loja, mas já digita na caixa de texto do cliente a mensagem: "Olá, tenho interesse na promoção da calça azul". O cliente só precisa apertar enviar.</p>
        <p>Isso facilita o rastreamento da origem da venda e aumenta drasticamente as taxas de conversão de anúncios pagos.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Gere seus links de forma profissional</h3>
          <p className="text-blue-800">Pare de quebrar a cabeça com a formatação das URLs. Use nosso <Link href="/utilidades/whatsapp-link" className="underline font-semibold hover:text-blue-900">Gerador de Link do WhatsApp</Link> para criar links com textos personalizados instantaneamente.</p>
        </div>
      </>
    )
  },
  'pix-copia-e-cola-br-code': {
    title: 'A evolução do PIX: Como o sistema BR Code revolucionou os pagamentos',
    date: '25 de Junho, 2026',
    isoDate: '2026-06-25T14:00:00.000Z',
    category: 'Tecnologia',
    description: 'Entenda os bastidores técnicos do Pix e como o sistema EMVCo / BR Code formata os dados de um Pix Copia e Cola.',
    content: (
      <>
        <p>O Pix mudou completamente o cenário bancário brasileiro. TEDs e DOCs, restritos por horários comerciais e altas taxas, rapidamente se tornaram obsoletos frente à instantaneidade gratuita do Pix. Mas como o sistema empacota os dados da transação?</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O Padrão EMV e o BR Code</h2>
        <p>O Banco Central do Brasil foi inteligente e não reinventou a roda. Ele utilizou como base o padrão mundial EMV (criado pela Europay, Mastercard e Visa), que rege os QR Codes de pagamentos globalmente. A especificação brasileira em cima do EMV foi batizada de "BR Code".</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A anatomia do Copia e Cola</h2>
        <p>Aquele bloco gigantesco de letras que compõe o "Pix Copia e Cola" é, na verdade, a representação em texto bruto (payload) do QR Code. Ele é fragmentado em diversas tags, como: identificador do recebedor (Chave Pix), valor da transação, cidade, nome do beneficiário e um código validador final (CRC16) que garante que a string não sofreu adulteração.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Crie códigos de cobrança profissionais</h3>
          <p className="text-blue-800">Quer receber sem pagar taxas de maquininha? Crie códigos exatos com valor pré-definido no nosso <Link href="/utilidades/pix-copia-cola" className="underline font-semibold hover:text-blue-900">Gerador de Pix Copia e Cola / QR Code</Link>.</p>
        </div>
      </>
    )
  },
  'rastreio-encomendas-correios': {
    title: 'A logística por trás dos Correios: Como funciona o sistema de rastreamento',
    date: '26 de Junho, 2026',
    isoDate: '2026-06-26T09:00:00.000Z',
    category: 'Tecnologia',
    description: 'Desvende o significado das siglas dos Correios (PAC, SEDEX) e como os pacotes são bipados ao redor do país.',
    content: (
      <>
        <p>Esperar uma encomenda comprada na internet é um teste de ansiedade. O código de rastreio de 13 dígitos dos Correios (ex: <code>NL123456789BR</code>) é a nossa única janela para saber onde a mercadoria está. Mas o que essas letras significam?</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O significado das Siglas</h2>
        <p>Os Correios utilizam um padrão internacional regido pela UPU (União Postal Universal). O código sempre possui 2 letras iniciais, 9 números e 2 letras finais indicando o país de origem (BR para Brasil, CN para China).</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Letras iniciadas com S:</strong> Referem-se ao SEDEX (encomenda expressa).</li>
          <li><strong>Letras iniciadas com P:</strong> Referem-se ao PAC (encomenda econômica).</li>
          <li><strong>Letras iniciadas com N:</strong> Geralmente remessas internacionais de pequenos pacotes.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">Unidades de Tratamento (CTCE / CTE)</h2>
        <p>O pacote não viaja magicamente de uma agência para outra. Ele passa por grandes galpões logísticos chamados CTE (Centro de Tratamento de Encomendas). Toda vez que seu pacote entra e sai de um galpão, um scanner lê o código de barras, e essa atualização de "Objeto encaminhado" reflete na API dos Correios.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Onde está a sua caixa?</h3>
          <p className="text-blue-800">Pare de se preocupar. Acompanhe a jornada do seu pacote em tempo real pelo nosso portal de <Link href="/utilidades/rastreio" className="underline font-semibold hover:text-blue-900">Rastreio de Encomendas dos Correios</Link>.</p>
        </div>
      </>
    )
  },
  'etanol-ou-gasolina-regra-dos-70': {
    title: 'Etanol ou Gasolina? A regra matemática dos 70% na hora de abastecer',
    date: '26 de Junho, 2026',
    isoDate: '2026-06-26T14:00:00.000Z',
    category: 'Finanças',
    description: 'Entenda por que o etanol queima mais rápido e como saber matematicamente qual combustível está valendo mais a pena na bomba.',
    content: (
      <>
        <p>A pergunta clássica nos postos de combustíveis brasileiros com carros flex: Álcool ou Gasolina? A resposta depende estritamente da proporção de preços nas bombas e da termodinâmica do seu motor.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Diferença Energética</h2>
        <p>O Etanol e a Gasolina possuem poder calorífico diferente. O etanol queima mais rápido e gera menos energia por litro em comparação com a gasolina. Isso significa que um carro abastecido com etanol fará menos quilômetros por litro (rendimento menor).</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Regra dos 70%</h2>
        <p>Os engenheiros estimam que, em média, o motor a etanol rende cerca de 70% do que renderia com gasolina. Portanto, para que abastecer com etanol compense financeiramente, o preço do litro do etanol precisa custar <strong>no máximo 70%</strong> do preço do litro da gasolina.</p>
        <p>Por exemplo: se a gasolina custa R$ 5,00, o etanol só valerá a pena se custar até R$ 3,50. Se estiver custando R$ 3,80, você estará perdendo dinheiro e o seu tanque vai esvaziar mais rápido.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Faça as contas sem calculadora</h3>
          <p className="text-blue-800">Chegou no posto e está na dúvida? Use nossa <Link href="/utilidades/calculadora-combustivel" className="underline font-semibold hover:text-blue-900">Calculadora de Combustível (Etanol vs Gasolina)</Link> e saiba qual escolher em 2 segundos.</p>
        </div>
      </>
    )
  },
  'como-calcular-quantidade-de-carne-para-churrasco': {
    title: 'Como calcular a quantidade exata de carne e bebida para o seu churrasco',
    date: '26 de Junho, 2026',
    isoDate: '2026-06-26T10:00:00.000Z',
    category: 'Utilidades',
    description: 'O guia definitivo de gramas por pessoa, bebidas e acompanhamentos para você não errar na festa.',
    content: (
      <>
        <p>Organizar um churrasco e não saber a quantidade certa de comida é um dos maiores medos de qualquer anfitrião. Faltar carne estraga a festa, sobrar demais pesa no bolso.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Regra Prática dos 400 gramas</h2>
        <p>Profissionais de eventos costumam usar a regra de que um adulto come, em média, 400g a 500g de carne em um evento de 4 horas. Para crianças, calcula-se metade disso. Essa conta deve envolver todas as proteínas: bovina, linguiça e frango.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Bebidas e Acompanhamentos</h2>
        <p>No caso das bebidas, a métrica varia muito com o clima e o perfil dos convidados, mas o padrão é 1 litro de cerveja (cerca de 3 latas) e 500ml de refrigerante/água por adulto.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Pare de adivinhar</h3>
          <p className="text-blue-800">Use a nossa <Link href="/utilidades/calculadora-churrasco" className="underline font-semibold hover:text-blue-900">Calculadora de Churrasco</Link> e tenha a lista de compras exata em 5 segundos!</p>
        </div>
      </>
    )
  },
  'como-limpar-listas-de-cpf-e-telefones-no-excel': {
    title: 'Tratamento de Dados: Como formatar milhares de CPFs e Telefones de uma vez',
    date: '27 de Junho, 2026',
    isoDate: '2026-06-27T10:00:00.000Z',
    category: 'Produtividade',
    description: 'Aprenda como ferramentas de automação e limpeza de dados economizam horas de trabalho manual em planilhas.',
    content: (
      <>
        <p>Trabalhar com banco de dados de clientes geralmente significa lidar com planilhas caóticas. Alguns CPFs têm pontos, outros não. Alguns telefones têm DDI, outros nem DDD possuem.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">O problema da inconsistência</h2>
        <p>Sistemas ERPs, CRMs e plataformas de envio de WhatsApp (como a API oficial) são extremamente rigorosos com a formatação. Tentar enviar uma mensagem para um número que contém espaços ou hifens geralmente resulta em erro.</p>
        <p>A limpeza manual disso usando Excel (com fórmulas gigantescas de SUBSTITUIR) pode levar horas e é propensa a erros.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Automatize essa limpeza</h3>
          <p className="text-blue-800">Cole milhares de linhas no nosso <Link href="/utilidades/formatador-dados" className="underline font-semibold hover:text-blue-900">Formatador de Dados em Lote</Link> e deixe a nossa ferramenta padronizar CPFs, CNPJs e Telefones com ou sem pontuação instantaneamente.</p>
        </div>
      </>
    )
  },
  'como-fazer-regra-de-tres-simples-passo-a-passo': {
    title: 'Como fazer Regra de Três Simples (Com exemplos do dia a dia)',
    date: '27 de Junho, 2026',
    isoDate: '2026-06-27T14:00:00.000Z',
    category: 'Matemática',
    description: 'Esqueceu como multiplicar cruzado? Entenda a lógica por trás da regra de três e como ela salva vidas em cálculos diários.',
    content: (
      <>
        <p>A Regra de Três é, sem dúvida, o cálculo matemático mais utilizado na vida adulta. Desde adaptar uma receita de bolo até calcular o consumo de combustível em uma viagem.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Lógica da Proporcionalidade</h2>
        <p>O conceito é simples: se você tem três valores conhecidos que possuem uma relação de proporcionalidade, você pode descobrir o quarto valor oculto (o famoso "X"). O método prático é agrupar as grandezas iguais em colunas e "multiplicar cruzado".</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Cálculo Direto</h3>
          <p className="text-blue-800">Pule a matemática de papel e caneta. Utilize nossa <Link href="/utilidades/regra-de-tres" className="underline font-semibold hover:text-blue-900">Calculadora de Regra de Três</Link> para obter a resposta rapidamente.</p>
        </div>
      </>
    )
  },
  'quantos-litros-de-agua-beber-por-dia-calculo': {
    title: 'A matemática da hidratação: Como calcular o consumo de água ideal para o seu peso',
    date: '28 de Junho, 2026',
    isoDate: '2026-06-28T09:00:00.000Z',
    category: 'Saúde',
    description: 'O mito dos 2 litros: por que a quantidade ideal varia muito e como a Organização Mundial da Saúde faz o cálculo.',
    content: (
      <>
        <p>Desde crianças ouvimos que devemos beber "2 litros de água por dia". Mas pense bem: uma pessoa que pesa 50kg precisa da mesma quantidade de água que alguém de 110kg? Certamente não.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Fórmula Real (35ml por kg)</h2>
        <p>Profissionais de saúde e a OMS recomendam a ingestão diária de 35ml de água para cada quilograma de peso corporal em adultos saudáveis. Isso significa que alguém de 70kg precisa de cerca de 2.450 ml (2,4 litros), enquanto alguém de 100kg precisa de 3,5 litros.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Saiba exatamente a sua meta</h3>
          <p className="text-blue-800">Descubra a quantidade perfeita para o seu corpo usando a nossa <Link href="/utilidades/consumo-agua" className="underline font-semibold hover:text-blue-900">Calculadora de Consumo de Água</Link>.</p>
        </div>
      </>
    )
  },
  'como-precificar-doces-e-salgados-para-vender': {
    title: 'Empreendedorismo Gastronômico: Como calcular o preço de custo e venda dos seus doces',
    date: '28 de Junho, 2026',
    isoDate: '2026-06-28T14:00:00.000Z',
    category: 'Empreendedorismo',
    description: 'Pare de perder dinheiro na embalagem ou no gás. Entenda o que é Markup e como precificar seu cardápio com lucro real.',
    content: (
      <>
        <p>Muitas confeiteiras e donos de delivery fecham as portas não por falta de vendas, mas por venderem com o preço errado. A conta de "multiplicar por três" já não funciona mais em um mercado tão competitivo.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Custos Invisíveis e Markup</h2>
        <p>Quando você faz um bolo, o custo não é só a farinha e os ovos. Você precisa calcular a embalagem, o adesivo, o detergente, a água, a luz e o gás. O Markup é o índice que você aplica sobre esse custo total para garantir que você não apenas pagará os ingredientes, mas terá lucro líquido para o bolso da empresa.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Pare de perder dinheiro hoje</h3>
          <p className="text-blue-800">Cadastre seus ingredientes e deixe o sistema fazer a mágica. Utilize a nossa <Link href="/financeiro/precificacao-receitas" className="underline font-semibold hover:text-blue-900">Calculadora de Precificação de Receitas</Link>.</p>
        </div>
      </>
    )
  },
  'como-fazer-um-recibo-simples-e-com-validade-legal': {
    title: 'Recibo Simples: O que não pode faltar no documento para ter validade',
    date: '29 de Junho, 2026',
    isoDate: '2026-06-29T10:00:00.000Z',
    category: 'Documentos',
    description: 'Trabalha como autônomo? Veja como gerar recibos de pagamento de forma profissional, gratuita e legal.',
    content: (
      <>
        <p>Um recibo não é uma nota fiscal, mas é o documento comprobatório que garante que uma dívida foi paga ou que um serviço foi liquidado. É a segurança jurídica tanto para quem paga quanto para quem recebe.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Itens Obrigatórios</h2>
        <p>Para um recibo ter valor legal (em pequenas causas, por exemplo), ele precisa de: Valor em numeral e por extenso, nome e documento de quem pagou, nome e documento de quem recebeu, data, local e a assinatura do recebedor.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Abandone o bloquinho de papel</h3>
          <p className="text-blue-800">Crie, imprima ou salve em PDF rapidamente usando nosso <Link href="/documentos/gerador-recibos" className="underline font-semibold hover:text-blue-900">Gerador de Recibos Profissionais</Link>.</p>
        </div>
      </>
    )
  },
  'como-calcular-idade-gestacional-dum-dpp': {
    title: 'DUM e DPP: Entenda como a medicina calcula as semanas de gravidez',
    date: '29 de Junho, 2026',
    isoDate: '2026-06-29T14:00:00.000Z',
    category: 'Saúde',
    description: 'Semanas ou meses? Saiba a diferença entre o cálculo pela menstruação e pelo ultrassom, e acompanhe o crescimento do bebê.',
    content: (
      <>
        <p>A primeira grande confusão para mamães de primeira viagem é descobrir que médicos não contam a gravidez em "9 meses", mas sim em 40 semanas. Mas como essa conta começa?</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">DUM vs DPP</h2>
        <p>O método clássico é a DUM (Data da Última Menstruação). Como é quase impossível saber o dia exato da concepção, os médicos contam a partir do primeiro dia do último ciclo. Já a DPP (Data Provável do Parto) costuma ser definida após o primeiro ultrassom morfológico, ajustando a data real com base no tamanho do bebê.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Em qual semana você está?</h3>
          <p className="text-blue-800">Use a nossa <Link href="/utilidades/idade-gestacional" className="underline font-semibold hover:text-blue-900">Calculadora de Idade Gestacional</Link> para saber exatamente o tempo de gestação e ver a barra de progresso do seu trimestre!</p>
        </div>
      </>
    )
  },
  'tecnica-pomodoro-como-parar-de-procrastinar': {
    title: 'Técnica Pomodoro: A ciência de focar por 25 minutos para combater a procrastinação',
    date: '30 de Junho, 2026',
    isoDate: '2026-06-30T09:00:00.000Z',
    category: 'Produtividade',
    description: 'Descubra por que quebrar seu tempo em blocos curtos é o segredo dos estudantes e profissionais de alta performance.',
    content: (
      <>
        <p>Desenvolvida nos anos 80 por Francesco Cirillo, a técnica ganhou esse nome por conta daqueles cronômetros de cozinha em formato de tomate (pomodoro, em italiano). O princípio é simples e neurocientificamente comprovado.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Senso de Urgência vs. Burnout</h2>
        <p>A técnica prega o foco total (sem redes sociais ou distrações) durante 25 minutos. Isso cria um pequeno senso de urgência ("são só 25 minutos, eu consigo"). Em seguida, a pausa obrigatória de 5 minutos permite que o cérebro relaxe e consolide a informação, evitando o famoso esgotamento mental.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Comece o seu primeiro ciclo</h3>
          <p className="text-blue-800">Abra o nosso <Link href="/utilidades/pomodoro" className="underline font-semibold hover:text-blue-900">Cronômetro Pomodoro Online</Link>, ligue o som do navegador e comece a destruir sua lista de tarefas.</p>
        </div>
      </>
    )
  },
  'como-fazer-sorteio-justo-no-instagram': {
    title: 'Sorteio no Instagram e Rifas: Como garantir que o resultado seja 100% justo',
    date: '30 de Junho, 2026',
    isoDate: '2026-06-30T14:00:00.000Z',
    category: 'Utilidades',
    description: 'Entenda por que você não deve usar ferramentas obscuras e como os algoritmos de aleatoriedade garantem que não haja fraude nos sorteios.',
    content: (
      <>
        <p>O engajamento gerado por sorteios no Instagram e em outras redes sociais é massivo, mas o perigo de reclamações por fraude ("foi marmelada") é igualmente grande. Um sorteio transparente é a única forma de preservar a reputação da sua marca.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Criptografia do Navegador</h2>
        <p>Um bom sorteador não guarda dados em um servidor (onde poderiam ser manipulados). Ele roda o código diretamente na sua máquina, embaralhando os participantes usando métodos criptográficos matemáticos que garantem a impossibilidade de viciar o resultado.</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Faça o seu sorteio ao vivo</h3>
          <p className="text-blue-800">Grave a tela e mostre a lisura do processo. Acesse o nosso <Link href="/utilidades/sorteador-nomes" className="underline font-semibold hover:text-blue-900">Sorteador de Nomes e Rifas</Link> e realize o sorteio gratuitamente.</p>
        </div>
      </>
    )
  },
  'a-historia-das-calculadoras-do-amor-na-internet': {
    title: 'Dos cadernos para a web: Como funcionam as calculadoras do amor e testes de compatibilidade',
    date: '01 de Julho, 2026',
    isoDate: '2026-07-01T10:00:00.000Z',
    category: 'Diversão',
    description: 'Uma viagem pela nostalgia dos testes de nomes da adolescência e como algoritmos modernos transformam palavras em números mágicos.',
    content: (
      <>
        <p>Antes dos smartphones, nos anos 90 e 2000, as folhas dos cadernos escolares ficavam cheias de cálculos de amor: contava-se quantas letras em comum existiam entre o nome do garoto e o da garota para achar uma porcentagem de afinidade.</p>
        <h2 className="text-2xl font-bold mt-8 mb-4">A Lógica Computacional da Diversão</h2>
        <p>Hoje, isso foi trazido para a web. As calculadoras modernas usam uma técnica chamada "Hashing" (espalhamento). Elas pegam as letras dos dois nomes inseridos e as transformam em um número longo que, por sua vez, é transformado num valor de 0 a 100.</p>
        <p>Como o cálculo é matemático, se você testar as mesmas duas pessoas mil vezes, o sistema sempre dará a mesma porcentagem, tornando a brincadeira muito mais realista (e engraçada) para grupos de amigos e casais!</p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Será que vai dar namoro?</h3>
          <p className="text-blue-800">As estrelas dizem que sim! Faça o teste com o nome do seu crush agora mesmo na nossa <Link href="/utilidades/calculadora-amor" className="underline font-semibold hover:text-blue-900">Calculadora do Amor</Link>.</p>
        </div>
      </>
    )
  },
  'como-carregar-carro-eletrico-conectores-byd-gwm-volvo': {
    title: 'Como Carregar Carro Elétrico (BYD, GWM e Volvo): Tipos de Conectores e Onde Encontrar Postos',
    date: '12 de Agosto, 2026',
    isoDate: '2026-08-12T12:00:00.000Z',
    category: 'Mobilidade Elétrica',
    description: 'Guia completo para donos de BYD Dolphin, GWM Ora 5 e Volvo: entenda a diferença entre carga AC (Tipo 2) e DC (CCS2), como escolher a potência certa e onde encontrar eletropostos próximos via GPS.',
    content: (
      <>
        <p>O Brasil está vivendo uma revolução silenciosa nas ruas. Em 2024, as vendas de carros elétricos e híbridos plug-in cresceram mais de 90% no país, impulsionadas por marcas como <strong>BYD</strong> (Dolphin, Seal, King), <strong>GWM</strong> (Ora 5), <strong>Volvo</strong>, <strong>BMW</strong> e redes de recarga como <strong>EZVolt</strong> e <strong>Shell Recharge</strong>. Se você é dono de um veículo elétrico ou está pensando em comprar um, entender <em>como carregar carro elétrico</em> de forma eficiente é tão importante quanto saber abastecer — mas envolve mais variáveis.</p>

        <p>Neste guia, explicamos os tipos de conectores, as diferenças entre carga lenta e rápida e como usar o GPS para encontrar o eletroposto mais próximo da sua localização atual.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Seção 1: Carga Lenta (AC) x Carga Rápida (DC) — Qual a diferença?</h2>
        <p>A primeira coisa que todo motorista elétrico precisa entender é que existem dois grandes grupos de carregamento: <strong>Corrente Alternada (AC)</strong> e <strong>Corrente Contínua (DC)</strong>. A distinção entre eles muda completamente o tempo de recarga e o tipo de conector usado.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">Carga AC — Carregador Tipo 2 (o mais comum no Brasil)</h3>
        <p>O <strong>Carregador Tipo 2</strong> (também chamado de <em>T2</em> ou <em>IEC 62196</em>) é o padrão europeu adotado oficialmente no Brasil. Ele é usado para carga AC, que pode variar entre <strong>7 kW e 22 kW</strong> dependendo da tomada e do carregador embarcado do veículo.</p>
        <ul>
          <li><strong>Velocidade:</strong> Em uma tomada doméstica de 7 kW, o BYD Dolphin com bateria de 44,9 kWh leva cerca de 6–7 horas para ir de 20% a 100%.</li>
          <li><strong>Onde usar:</strong> Condomínios, estacionamentos de shopping, empresas e wall boxes residenciais.</li>
          <li><strong>Ideal para:</strong> Cargas noturnas e paradas longas de 4+ horas.</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3">Carga DC — Conector CCS2 (carga rápida)</h3>
        <p>O <strong>conector CCS2</strong> (Combined Charging System 2) é o padrão europeu de carga rápida em corrente contínua. Diferente do Tipo 2, o CCS2 carrega a bateria diretamente com DC, eliminando a conversão interna do veículo e permitindo potências muito maiores: de <strong>50 kW a mais de 350 kW</strong>.</p>
        <ul>
          <li><strong>Velocidade:</strong> Um BYD Seal suportando até 150 kW DC pode recuperar 100 km de autonomia em menos de 15 minutos.</li>
          <li><strong>Onde usar:</strong> Eletropostos dedicados de redes como EZVolt, Shell Recharge e Tupinambá.</li>
          <li><strong>Ideal para:</strong> Viagens longas, paradas rápidas de 20–40 minutos durante a viagem.</li>
        </ul>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50">
                <th className="py-2 pr-4 font-bold text-slate-700">Característica</th>
                <th className="py-2 pr-4 font-bold text-slate-700">Tipo 2 (AC)</th>
                <th className="py-2 font-bold text-slate-700">CCS2 (DC)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">Potência típica</td>
                <td className="py-2 pr-4">7 kW – 22 kW</td>
                <td className="py-2">50 kW – 350 kW</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">Tempo para 80%</td>
                <td className="py-2 pr-4">4 – 8 horas</td>
                <td className="py-2">20 – 45 minutos</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">Custo instalação</td>
                <td className="py-2 pr-4">Baixo (wall box)</td>
                <td className="py-2">Alto (infra dedicada)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">Onde encontrar</td>
                <td className="py-2 pr-4">Shoppings, condomínios</td>
                <td className="py-2">Postos dedicados, rodovias</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Modelos compatíveis</td>
                <td className="py-2 pr-4">Todos os EVs modernos</td>
                <td className="py-2">BYD Dolphin/Seal/King, GWM Ora 5, Volvo, BMW</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Seção 2: Como saber a potência ideal para o seu modelo?</h2>
        <p>Nem todo carro elétrico aceita a mesma potência de carga. A velocidade de recarga real depende de dois fatores: a potência máxima que o carregador oferece <em>e</em> a potência máxima que o carregador embarcado (OBC) do seu veículo suporta. O carregamento ocorrerá sempre na potência mais baixa entre os dois.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">BYD Dolphin — carregar BYD Dolphin</h3>
        <p>O <strong>BYD Dolphin</strong> aceita carga AC de até <strong>7 kW</strong> (via Tipo 2) e carga DC de até <strong>60 kW</strong> (via CCS2). Com uma wall box de 7 kW em casa, vai de 10% a 100% em aproximadamente 7 horas. Em um eletroposto de 50 kW DC, a recarga de 20% a 80% leva cerca de 40 minutos.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">BYD Seal e BYD King</h3>
        <p>Os modelos premium da BYD suportam carga AC de até <strong>11 kW</strong> e DC de até <strong>150 kW</strong> (CCS2). Em um fast charger de 150 kW, é possível recuperar autonomia para mais de 200 km em menos de 20 minutos.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">GWM Ora 5</h3>
        <p>O <strong>GWM Ora 5</strong> suporta carga AC de até <strong>6,6 kW</strong> e DC de até <strong>80 kW</strong>. Em um carregador doméstico, a bateria de 63 kWh vai de vazia a cheia em cerca de 10 horas. Em um eletroposto de 80 kW DC, o tempo de 20% a 80% é de aproximadamente 35 minutos.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">Volvo EX30 e XC40 Recharge</h3>
        <p>Os modelos elétricos da Volvo suportam carga AC de até <strong>11 kW</strong> (XC40) e DC de até <strong>150 kW</strong> (EX30). A Volvo também oferece carregamento doméstico com o kit de instalação da rede EV (incluso em alguns pacotes de compra).</p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-amber-900 mb-2">⚡ Dica Prática: Não use sempre 100% em DC</h3>
          <p className="text-amber-800">As baterias de lítio duram mais quando a carga é mantida entre <strong>20% e 80%</strong>. Carga DC frequente até 100% pode acelerar a degradação da bateria em 2–3× se comparada a cargas AC regulares. Use carga rápida DC para viagens — para o dia a dia, prefira o Tipo 2 em casa ou no trabalho.</p>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Seção 3: Como encontrar estações de recarga pelo GPS</h2>
        <p>Com a expansão do mercado de elétricos no Brasil, a rede de <em>eletropostos</em> também cresceu significativamente. As principais redes em operação incluem:</p>
        <ul>
          <li><strong>EZVolt:</strong> A maior rede independente do Brasil, com postos em shoppings, supermercados e postos de combustível. Oferece carregadores AC (Tipo 2) e DC (CCS2).</li>
          <li><strong>Shell Recharge:</strong> Integrada a postos Shell selecionados, com foco em carregadores DC de alta potência para rodovias e avenidas de grande fluxo.</li>
          <li><strong>Tupinambá:</strong> Rede focada no interior do Brasil, especialmente no estado de São Paulo.</li>
          <li><strong>Enel X Way:</strong> Atuante em regiões da Celpe e Coelba (Nordeste), com wall boxes e fast chargers.</li>
          <li><strong>BYD Charging Network:</strong> Rede própria da BYD em concessionárias e parceiros estratégicos.</li>
        </ul>

        <p>Para encontrar qualquer um desses postos de recarga em tempo real, a forma mais prática é usar a <strong>geolocalização GPS do seu smartphone</strong>. A base de dados global <strong>OpenChargeMap</strong> concentra mais de 70.000 pontos de recarga ao redor do mundo, incluindo todos os estados brasileiros.</p>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 my-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">📍</div>
            <div>
              <h3 className="font-bold text-lg text-green-900 mb-2">Encontre Eletropostos Perto de Você Agora</h3>
              <p className="text-green-800 mb-4 text-sm leading-relaxed">
                Use o localizador de eletropostos do BuscaCentral para encontrar postos de recarga compatíveis com BYD, GWM, Volvo e BMW no raio de <strong>35 km</strong> da sua posição atual. Basta ativar o GPS e a ferramenta consulta o OpenChargeMap em tempo real, exibindo endereço, potência (kW), conectores disponíveis e rota pelo Google Maps.
              </p>
              <Link
                href="/localizacao/carregador-eletrico/perto-de-mim"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                <span>📡</span>
                Eletropostos Perto de Mim
              </Link>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">Dicas para usar o localizador com eficiência</h3>
        <ul>
          <li><strong>Filtre por conector:</strong> Busque especificamente por CCS2 se precisar de carga rápida. Tipo 2 é adequado para paradas de 2+ horas.</li>
          <li><strong>Verifique o status em tempo real:</strong> Alguns postos exibem se o carregador está livre ou ocupado. Confira antes de se deslocar.</li>
          <li><strong>Tenha um plano B:</strong> Em regiões com cobertura mais esparsa, identifique dois postos no trajeto caso o primeiro esteja fora de serviço.</li>
          <li><strong>Use o Google Maps offline:</strong> Antes de uma viagem longa, baixe o mapa da região para não depender de sinal de dados.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Conclusão: Carregar elétrico é simples — quando você sabe o que está fazendo</h2>
        <p>A transição para mobilidade elétrica no Brasil está em plena aceleração. Os desafios de recarga que existiam há dois ou três anos — como falta de infraestrutura e conectores incompatíveis — reduziram significativamente com a padronização do <strong>Tipo 2 AC</strong> e do <strong>CCS2 DC</strong> como padrões nacionais.</p>
        <p>Com as informações certas sobre o seu modelo (BYD Dolphin, GWM Ora 5, Volvo ou qualquer outro), a programação da recarga se torna tão natural quanto qualquer outra parte da rotina. Use a carga AC lenta no dia a dia, reserve a DC rápida para viagens, e mantenha a bateria entre 20% e 80% para maximizar a vida útil das células.</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
          <h3 className="font-bold text-lg text-blue-900 mb-2">Planeje sua próxima recarga</h3>
          <p className="text-blue-800">
            Antes de sair de casa, encontre os{' '}
            <Link href="/localizacao/carregador-eletrico/perto-de-mim" className="underline font-semibold hover:text-blue-900">
              Eletropostos Perto de Mim
            </Link>{' '}
            com GPS ativo — ou pesquise por cidade em nossa página de{' '}
            <Link href="/localizacao/carregador-eletrico" className="underline font-semibold hover:text-blue-900">
              Carregadores Elétricos
            </Link>. Para viagens longas, use o{' '}
            <Link href="/localizacao/planejador-viagem-ev" className="underline font-semibold hover:text-blue-900">
              Planejador de Viagem EV
            </Link>{' '}
            para mapear os postos de recarga em toda a rota.
          </p>
        </div>
      </>
    )
  },
  'potencia-eletropostos-kw-tempo-de-recarga': {
    title: 'Potência de Eletropostos (kW): Quanto Tempo Demora para Carregar um Veículo Elétrico?',
    date: '12 de Agosto, 2026',
    isoDate: '2026-08-12T10:00:00.000Z',
    category: 'Veículos Elétricos',
    description: 'Descubra quanto tempo demora para carregar um carro elétrico, entenda a potência dos eletropostos (kW) e veja estimativas para BYD Dolphin, Haval H6 e Volvo EX30.',
    content: (
      <>
        <p>Com o crescimento da frota de veículos elétricos (VEs) no Brasil, uma das dúvidas mais comuns entre novos e futuros proprietários é o <strong>tempo de carga do carro elétrico</strong>. Diferente do abastecimento por combustão, a velocidade de recarga de um VE depende diretamente da <strong>potência de recarga do veículo elétrico</strong> suportada pelo carro e, principalmente, da potência do carregador utilizado.</p>
        <p>Compreender a diferença entre os tipos de carregadores e a capacidade de entrega de energia em kW (quilowatts) é essencial antes de planejar sua próxima viagem ou decidir em qual estação parar. Um carregador incompatível ou de baixa potência pode transformar uma parada de 30 minutos em uma espera de horas.</p>
        <p>Neste artigo, detalhamos como a potência dos eletropostos afeta o tempo de recarga e apresentamos dados práticos para os modelos mais vendidos no mercado.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Entendendo Potência (kW): Carga Lenta (7kW - 22kW) vs Carga Rápida (40kW - 150kW+)</h2>
        <p>A potência do carregador define a quantidade de energia transferida para a bateria do seu veículo a cada hora. Os eletropostos são divididos basicamente em duas categorias em termos de corrente: Corrente Alternada (AC) para carga lenta/semirrápida e Corrente Contínua (DC) para carga rápida e ultrarrápida.</p>

        <h3 className="text-xl font-bold mt-6 mb-3">Carga Lenta e Semirrápida (AC: 7kW a 22kW)</h3>
        <p>Geralmente encontrados em shoppings, supermercados e wallboxes residenciais, os carregadores AC utilizam o inversor interno do veículo para converter a energia.</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2"><strong>7kW:</strong> Adiciona cerca de 30 a 40 km de autonomia por hora. Ideal para recargas noturnas em casa.</li>
          <li><strong>11kW a 22kW:</strong> Carregadores semirrápidos. No entanto, o tempo real de carga depende do limite do inversor <em>on-board</em> do veículo (muitos carros limitam a entrada AC a 7kW ou 11kW).</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3">Carga Rápida e Ultrarrápida (DC: 40kW a 150kW+)</h3>
        <p>Os carregadores de Corrente Contínua (DC) injetam energia diretamente na bateria, contornando o inversor do veículo. São a escolha ideal para rodovias e viagens longas.</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2"><strong>Eletroposto rápido 40kW a 50kW:</strong> Padrão comum nas estradas. Capaz de carregar a maioria das baterias de 20% a 80% em 40 a 60 minutos.</li>
          <li><strong>Carregador 80kW a 150kW+:</strong> Estações ultrarrápidas que podem elevar o nível da bateria de 20% a 80% em 20 a 30 minutos, dependendo da curva de carga do veículo e da gestão térmica da bateria.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Estimativa Prática de Tempo de Recarga (20% a 80%)</h2>
        <p>Para ilustrar o impacto da potência no tempo de espera, elaboramos uma tabela com a estimativa de tempo de recarga (de 20% a 80%) para três dos modelos mais populares no mercado atual, utilizando diferentes potências de carregamento:</p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-2 pr-4 font-bold text-slate-700">Modelo</th>
                <th className="py-2 pr-4 font-bold text-slate-700">Capacidade da Bateria</th>
                <th className="py-2 pr-4 font-bold text-slate-700">Carga AC (7kW)</th>
                <th className="py-2 pr-4 font-bold text-slate-700">Carga Rápida DC (50kW)</th>
                <th className="py-2 font-bold text-slate-700">Carregador DC (80kW / 150kW)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-semibold">BYD Dolphin (GS)</td>
                <td className="py-2 pr-4">44,9 kWh</td>
                <td className="py-2 pr-4">~4 horas</td>
                <td className="py-2 pr-4">~40 minutos</td>
                <td className="py-2">~30 minutos (Limitado a 60kW DC)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-semibold">GWM Haval H6 (PHEV)</td>
                <td className="py-2 pr-4">34,0 kWh</td>
                <td className="py-2 pr-4">~3 horas</td>
                <td className="py-2 pr-4">~30 minutos</td>
                <td className="py-2">~25 minutos (Limitado a 33kW DC)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-semibold">Volvo EX30 (Extended)</td>
                <td className="py-2 pr-4">69,0 kWh</td>
                <td className="py-2 pr-4">~6 horas</td>
                <td className="py-2 pr-4">~55 minutos</td>
                <td className="py-2">~26 minutos (Suporta até 153kW DC)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-slate-500 mb-6">Nota: O tempo exato pode variar de acordo com a temperatura ambiente, gestão térmica da bateria e a curva de carregamento específica do veículo (a velocidade diminui significativamente após 80% para proteger a vida útil da bateria).</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Precisa carregar o seu carro agora?</h3>
          <p className="text-blue-800 text-lg">
            Encontre as estações compatíveis com a potência ideal para o seu veículo no nosso mapa em tempo real.<br/>
            👉 <Link href="/localizacao/carregador-eletrico/perto-de-mim" className="font-bold underline text-blue-600 hover:text-blue-900 transition-colors">Carregadores Elétricos Próximos</Link>
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Como verificar a potência do posto antes de sair de casa</h2>
        <p>Para evitar contratempos, como chegar com a bateria baixa e descobrir que a estação oferece apenas 7kW (o que atrasaria a sua viagem em várias horas), o planejamento é fundamental. Siga estes passos antes de iniciar o trajeto:</p>

        <ol className="list-decimal pl-6 space-y-3 mb-6">
          <li><strong>Utilize Aplicativos de Mapeamento:</strong> Ferramentas digitais são vitais. Ao buscar por <strong>eletropostos perto de mim</strong>, certifique-se de usar filtros de potência. Selecione opções acima de 50kW para paradas rápidas em rodovias.</li>
          <li><strong>Verifique o Tipo de Conector e Status:</strong> Confirme se o posto possui o conector compatível (geralmente Tipo 2 para AC e CCS2 para DC) e se a estação está online, operacional e disponível.</li>
          <li><strong>Conheça o Limite do Seu Carro:</strong> Não adianta parar em um <strong>carregador 80kW</strong> ou 150kW se o seu carro for limitado a 50kW em DC. Ele carregará na velocidade máxima permitida pelo próprio veículo.</li>
          <li><strong>Considere a Rotação de Cabine (Power Sharing):</strong> Em algumas estações, se dois veículos conectarem simultaneamente, a potência total pode ser dividida. Um carregador de 80kW, por exemplo, pode enviar 40kW para cada carro, aumentando o tempo de espera de ambos.</li>
        </ol>

        <p>Entender a potência de recarga não apenas otimiza o seu tempo, mas também melhora a sua experiência com a mobilidade elétrica, tornando as viagens mais previsíveis e confortáveis.</p>
      </>
    )
  },
  'eletropostos-minas-gerais-rodovias-onde-carregar': {
    title: 'Eletropostos em Minas Gerais e Principais Rodovias: Onde Recarregar com Segurança',
    date: '12 de Agosto, 2026',
    isoDate: '2026-08-12T11:00:00.000Z',
    category: 'Veículos Elétricos',
    description: 'Descubra os principais eletropostos em Minas Gerais (MG), no Triângulo Mineiro (Uberaba/Uberlândia) e nas rodovias. Saiba onde carregar no caminho!',
    content: (
      <>
        <p>A infraestrutura para veículos elétricos (VEs) está em franca expansão no Brasil, e quem viaja ou reside na região Sudeste já sente a diferença. Encontrar <strong>eletropostos em MG</strong> deixou de ser um desafio, graças aos crescentes investimentos nos principais corredores federais e estaduais, bem como em cidades-polo estratégicas.</p>
        <p>A região do Triângulo Mineiro, destacando-se cidades como Uberlândia e Uberaba, tornou-se um <em>hub</em> vital de conexão entre o interior de São Paulo, Belo Horizonte e o Centro-Oeste do país. Planejar <strong>onde carregar no caminho</strong> é fundamental para garantir uma viagem tranquila, sem surpresas e com total segurança energética.</p>
        <p>Neste artigo, mapeamos os corredores elétricos de Minas Gerais e apresentamos dicas valiosas para você planejar a sua próxima aventura de carro elétrico.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Principais Corredores Elétricos nas Rodovias Federais e Estaduais</h2>
        <p>A conectividade rodoviária é o ponto forte de Minas Gerais. O avanço na instalação de <strong>eletropostos em rodovias</strong> permite realizar viagens de longa distância com tranquilidade, utilizando estações de recarga rápida (DC).</p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>BR-050 e Triângulo Mineiro:</strong> Um dos eixos mais bem servidos do Brasil. Se você procura um <strong>posto de recarga no Triângulo Mineiro</strong>, encontrará excelentes opções rápidas conectando Uberlândia e um <strong>carregador elétrico em Uberaba</strong>. Esta rota liga o interior paulista direto a Brasília, passando pelo coração de Minas.</li>
          <li><strong>Rodovia Anhanguera (SP-330):</strong> Fundamental para quem sai de São Paulo em direção a Minas Gerais. Conta com diversos eletropostos de alta potência (acima de 50kW), garantindo uma recarga ultrarrápida antes mesmo de cruzar a fronteira estadual.</li>
          <li><strong>BR-262 e BR-153:</strong> Conectam a região do Triângulo a Belo Horizonte e ao Centro-Oeste. Esses trechos vêm recebendo novas instalações de eletropostos rápidos e semirrápidos, facilitando paradas estratégicas para almoço e descanso enquanto o carro recarrega.</li>
          <li><strong>Corredores rumo a Belo Horizonte (BR-381 e BR-040):</strong> A capital mineira e sua região metropolitana possuem uma rede robusta, sendo destinos frequentes e oferecendo bases de recarga para quem segue para o Rio de Janeiro ou Espírito Santo.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Dicas Práticas para Planejar Viagens Longas de Carro Elétrico Sem Sufoco</h2>
        <p>Viajar de carro elétrico é sinônimo de economia e conforto, desde que você siga a regra de ouro: <strong>planejamento prévio</strong>.</p>

        <ol className="list-decimal pl-6 space-y-3 mb-6">
          <li><strong>Conheça a sua Autonomia Relativa:</strong> A autonomia informada pelo Inmetro (PBEV) ou pelo ciclo WLTP é uma média. Em rodovias, o consumo de bateria é maior devido à ausência de frenagem regenerativa e às velocidades elevadas. Calcule sua viagem considerando pelo menos 20% a 30% a menos da autonomia nominal, dependendo da topografia (trechos de serra exigem mais energia).</li>
          <li><strong>Mantenha uma Margem de Segurança (20%):</strong> A &quot;ansiedade de autonomia&quot; é combatida com a margem de segurança. Nunca planeje chegar a um carregador com menos de 15% ou 20% de bateria. Caso a estação esteja ocupada, em manutenção ou inoperante, essa reserva garantirá que você possa seguir para a próxima estação (plano B).</li>
          <li><strong>Verifique a Potência (kW) e o Status da Parada:</strong> Antes de desligar o carro em um posto, certifique-se da potência da estação. Parar em um carregador de 7kW (AC) no meio da rodovia significará horas de espera. Busque sempre por carregadores rápidos ou ultrarrápidos (DC de 40kW a 150kW) e valide se estão operacionais através dos aplicativos das redes responsáveis.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">Como Localizar Postos em Tempo Real Durante a Viagem Pelo Celular</h2>
        <p>Hoje, a tecnologia é a melhor aliada do motorista de VE. Encontrar o ponto ideal e verificar a sua disponibilidade em tempo real é a diferença entre uma parada de 30 minutos e um atraso na viagem.</p>
        <p>Para localizar <strong>eletropostos em MG</strong> ou em qualquer lugar do Brasil, evite depender apenas do sistema nativo do veículo se ele não estiver com o mapa atualizado. Utilize ferramentas via celular (conectadas ao Apple CarPlay ou Android Auto) para mapear o status atual do carregador.</p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg shadow-sm">
          <h3 className="text-xl font-semibold text-green-900 mb-2">Vai pegar a estrada?</h3>
          <p className="text-green-800 text-lg">
            Está na estrada ou em deslocamento regional? Encontre postos de recarga rápida e conectores compatíveis na sua posição exata através da nossa ferramenta de Eletropostos por GPS em Tempo Real.<br/>
            👉 <Link href="/localizacao/carregador-eletrico/perto-de-mim" className="font-bold underline text-green-600 hover:text-green-900 transition-colors">Carregadores Elétricos Próximos</Link>
          </p>
        </div>

        <p>Com estas dicas e utilizando as ferramentas certas, rodar pelo interior de Minas Gerais, pelo Triângulo Mineiro e pelas principais rodovias nacionais passa a ser uma experiência moderna, econômica e, acima de tudo, segura. Boa viagem!</p>
      </>
    )
  }
};


type Props = {
  params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];
  
  if (!article) {
    return { title: 'Página não encontrada' };
  }

  const url = `https://buscacentral.com.br/artigos/${slug}`;

  return {
    title: `${article.title} | BuscaCentral Artigos`,
    description: article.description,
    alternates: {
      canonical: `/artigos/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url,
      siteName: 'BuscaCentral',
      locale: 'pt_BR',
      publishedTime: article.isoDate,
      modifiedTime: article.isoDate,
      section: article.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  const url = `https://buscacentral.com.br/artigos/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    articleSection: article.category,
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Organization',
      name: 'BuscaCentral',
      url: 'https://buscacentral.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BuscaCentral',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buscacentral.com.br/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://buscacentral.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Artigos', item: 'https://buscacentral.com.br/artigos' },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trilha de navegação (breadcrumbs) */}
        <nav aria-label="Trilha de navegação" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-blue-600 transition-colors">Início</Link>
              <span className="text-slate-300" aria-hidden="true">/</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Link href="/artigos" className="hover:text-blue-600 transition-colors">Artigos</Link>
              <span className="text-slate-300" aria-hidden="true">/</span>
            </li>
            <li className="min-w-0">
              <span
                className="text-slate-700 font-medium truncate block max-w-[60vw] sm:max-w-md"
                aria-current="page"
                title={article.title}
              >
                {article.title}
              </span>
            </li>
          </ol>
        </nav>

        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="bg-sky-100 text-sky-800 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <time className="text-slate-500 font-medium">{article.date}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {article.description}
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="prose prose-lg prose-slate prose-blue max-w-none">
            {article.content}
          </div>
        </div>

        {(() => {
          const ferramentas = getArtigoFerramentas(slug);
          if (ferramentas.length === 0) return null;
          return (
            <section className="mt-10" aria-label="Ferramentas relacionadas">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Ferramentas relacionadas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ferramentas.map((f) => (
                  <Link
                    key={f.url}
                    href={f.url}
                    className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all"
                  >
                    <span className="font-semibold text-slate-800">{f.title}</span>
                    <span className="text-slate-400" aria-hidden="true">›</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        <div className="mt-12 text-center">
          <Link href="/artigos" className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <svg className="w-5 h-5 mr-2 -ml-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para Artigos
          </Link>
        </div>
      </article>
    </main>
  );
}
