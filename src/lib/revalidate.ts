'use server';

import { revalidatePath } from 'next/cache';

/**
 * Revalida o cache do Next.js programaticamente de forma segura.
 * Esta função usa 'use server' para ser executada como Server Action/Helper,
 * podendo ser chamada por Client Components, Server Components ou outras Server Actions
 * após a atualização ou salvamento de dados no banco, por exemplo.
 * 
 * @param path O caminho da rota a ser revalidada (ex: '/artigos/[slug]' ou '/artigos/meu-post')
 * @param type Opcional. O tipo de revalidação: 'page' (padrão) ou 'layout'
 */
export async function revalidatePage(path: string, type?: 'page' | 'layout') {
  try {
    revalidatePath(path, type);
    console.log(`[Revalidate] Rota ${path} revalidada programaticamente com sucesso.`);
    return { success: true, path };
  } catch (error) {
    console.error(`[Revalidate] Erro ao revalidar a rota ${path}:`, error);
    return { success: false, error: 'Falha ao revalidar a rota' };
  }
}
