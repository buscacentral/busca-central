import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-slate-300 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav aria-label="Rodapé - Navegação principal">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-white font-bold text-xl mb-6">BuscaCentral</h2>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                Central de ferramentas online gratuitas do Brasil. Consultas rápidas sem cadastro.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Documentos</h3>
              <ul className="space-y-4">
                <li><Link href="/documentos/gerador-cpf" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Gerador de CPF</Link></li>
                <li><Link href="/documentos/validador-cpf" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Validador de CPF</Link></li>
                <li><Link href="/documentos/gerador-cnpj" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Gerador de CNPJ</Link></li>
                <li><Link href="/documentos/consulta-cnpj" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Consulta CNPJ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Ferramentas</h3>
              <ul className="space-y-4">
                <li><Link href="/localizacao/carregador-eletrico/perto-de-mim" className="text-sm md:text-base text-sky-400 font-semibold hover:text-white transition-colors block">Eletropostos Perto de Mim 📍</Link></li>
                <li><Link href="/localizacao/busca-cep" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Busca de CEP</Link></li>
                <li><Link href="/financeiro/cotacao" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Cotação de Moedas</Link></li>
                <li><Link href="/financeiro/tabela-fipe" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Tabela FIPE</Link></li>
                <li><Link href="/utilidades/gerador-qr-code" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Gerador de QR Code</Link></li>
                <li><Link href="/utilidades/calculadora-imc" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Calculadora de IMC</Link></li>
                <li><Link href="/utilidades/tabela-calorias" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Tabela de Calorias</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Institucional</h3>
              <ul className="space-y-4">
                <li><Link href="/sobre" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Sobre Nós</Link></li>
                <li><Link href="/novidades" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Novidades</Link></li>
                <li><Link href="/contato" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Contato</Link></li>
                <li><Link href="/artigos" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Artigos e Blog</Link></li>
                <li><Link href="/privacidade" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Política de Privacidade</Link></li>
                <li><Link href="/termos" className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {currentYear} BuscaCentral.com.br — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
