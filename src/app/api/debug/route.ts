import { NextResponse } from 'next/server';
import { resolvePair, getCapitalBySlug, getCityBySlug, getCapitais, getAllCities } from '@/lib/distancia-cidades';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origem = searchParams.get('origem') || 'sao-paulo-sp';
  const destino = searchParams.get('destino') || 'ubatuba-sp';
  
  const capOrigem = getCapitalBySlug(origem);
  const capDestino = getCapitalBySlug(destino);
  const rawOrigem = getCityBySlug(origem);
  const rawDestino = getCityBySlug(destino);
  const result = resolvePair(origem, destino);
  
  return NextResponse.json({
    origem,
    destino,
    capOrigem,
    capDestino,
    rawOrigem,
    rawDestino,
    result,
    totalCapitais: getCapitais().length,
    totalCities: getAllCities().length,
    ubatubaInCapitais: getCapitais().find(c => c.slug === 'ubatuba-sp'),
    spInCapitais: getCapitais().find(c => c.slug === 'sao-paulo-sp'),
  });
}
