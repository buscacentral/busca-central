import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Redirecionamento 301 definitivo de www -> non-www
  if (host.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.host = host.replace(/^www\./, '');
    return NextResponse.redirect(newUrl, 301);
  }

  // Garante que /localizacao/carregador-eletrico/perto-de-mim
  // seja sempre servido com headers no-cache para geolocalização dinâmica
  if (
    pathname === '/localizacao/carregador-eletrico/perto-de-mim' ||
    pathname === '/localizacao/carregador-eletrico/perto-de-mim/'
  ) {
    const response = NextResponse.next();
    response.headers.set('cache-control', 'no-store, no-cache, must-revalidate');
    response.headers.set('x-matched-route', 'perto-de-mim');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware a todos os caminhos de requisição exceto:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico, sitemap.xml, robots.txt
     * - arquivos com extensões (ex: .png, .jpg, .svg, .webp, .css, .js)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|.*\\..*$).*)',
  ],
};
