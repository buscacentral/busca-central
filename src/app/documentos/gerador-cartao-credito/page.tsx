import type { Metadata } from 'next';
import ToolPageLayout from '@/components/ToolPageLayout';
import GeradorCartaoClient from './GeradorCartaoClient';

const year = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Gerador Cartão de Crédito para Testes (${year})`,
  description: 'Gere números de cartão de crédito válidos com CVV para testes de software e homologação. Algoritmo Luhn, grátis.',
  keywords: ['gerador de cartão de crédito', 'gerador cartão', 'cartão válido teste', 'cc generator', 'luhn algorithm', 'cartão de crédito fake'],
  alternates: { canonical: 'https://buscacentral.com.br/documentos/gerador-cartao-credito' },
};

const faqItems = [
  { question: "Esses cartões de crédito são reais?", answer: "Não. Os números gerados seguem apenas o Algoritmo de Luhn (Mod10), que é a fórmula matemática usada para verificar se um número de cartão de crédito tem uma sequência teoricamente válida. No entanto, eles NÃO estão vinculados a nenhuma conta bancária e NÃO possuem limite de crédito." },
  { question: "Posso fazer compras com estes cartões?", answer: "Não. Tentar usar esses cartões em e-commerces resultará em falha na transação, pois o banco emissor irá rejeitá-los imediatamente. Eles servem exclusivamente para desenvolvedores testarem formulários e integrações de pagamento em ambientes de Sandbox/Homologação." },
  { question: "O que é o Algoritmo de Luhn?", answer: "É uma fórmula de checksum criada por Hans Peter Luhn da IBM. Ela é usada para validar uma variedade de números de identificação, como números de cartão de crédito, e ajuda a evitar erros acidentais de digitação (mas não é um sistema criptográfico de segurança)." },
];

const relatedTools = [
  { title: "Gerador de CPF", url: "/documentos/gerador-cpf", description: "Gere números de CPF válidos para testes de software." },
  { title: "Gerador de CNPJ", url: "/documentos/gerador-cnpj", description: "Gere números de CNPJ válidos para testes corporativos." },
  { title: "Gerador de UUID", url: "/utilidades/gerador-uuid", description: "Gere códigos de identificação únicos globais (UUID v4)." },
];

export default function GeradorCartaoPage() {
  return (
    <ToolPageLayout
      title="Gerador de Cartão de Crédito (Teste)"
      description="Gere números de cartão válidos matematicamente (Algoritmo de Luhn) para testes de desenvolvimento e homologação de gateways."
      ariaLabel="Gerador de Cartão de Crédito interativo"
      path="/documentos/gerador-cartao-credito"
      faqItems={faqItems}
      relatedTools={relatedTools}
    >
      <GeradorCartaoClient />
    </ToolPageLayout>
  );
}
