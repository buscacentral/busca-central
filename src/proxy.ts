import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Se o host começar com 'www.', faz o redirect 301 para a versão root
  if (host.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.host = host.replace(/^www\./, '');
    return NextResponse.redirect(newUrl, 301);
  }

  // Garante que /localizacao/carregador-eletrico/perto-de-mim
  // seja sempre servido pela rota dedicada com no-cache headers
  if (pathname === '/localizacao/carregador-eletrico/perto-de-mim' ||
      pathname === '/localizacao/carregador-eletrico/perto-de-mim/') {
    const response = NextResponse.next();
    response.headers.set('cache-control', 'no-store, no-cache, must-revalidate');
    response.headers.set('x-matched-route', 'perto-de-mim');
    return response;
  }

  // IMPORTANTE: Permite que a requisição continue se não for www
  return NextResponse.next();
}

export const config = {
  // Executa o proxy em todas as rotas, exceto ficheiros estáticos, imagens e APIs
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico|api/).*)'],
};
