'use server';

import { revalidatePage } from '@/lib/revalidate';

/**
 * Exemplo de Server Action que simula o salvamento de um dado
 * e automaticamente aciona a revalidação da rota no cache do Next.js.
 * 
 * Você pode importar esta action em formulários ou client components:
 * <form action={salvarArtigoEAtualizarCache}> ... </form>
 */
export async function salvarArtigoEAtualizarCache(slug: string, dados: any) {
  // 1. Lógica fictícia de salvamento de dados (banco de dados, Supabase, etc)
  console.log('Salvando artigo no banco de dados...', slug, dados);
  // await db.artigos.update(slug, dados);

  // 2. Após salvar com sucesso, disparamos a revalidação do cache programaticamente
  const path = `/artigos/${slug}`;
  const result = await revalidatePage(path);

  if (!result.success) {
    throw new Error('Artigo salvo, mas ocorreu um erro ao atualizar o cache da página.');
  }

  return { 
    mensagem: 'Artigo salvo e cache atualizado com sucesso!',
    rotaRevalidada: path 
  };
}
