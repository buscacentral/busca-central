import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const token = request.nextUrl.searchParams.get('token');

  const secretToken = process.env.REVALIDATE_TOKEN;

  // Se REVALIDATE_TOKEN estiver configurado nas variáveis de ambiente, exige o token correto
  if (secretToken && token !== secretToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
