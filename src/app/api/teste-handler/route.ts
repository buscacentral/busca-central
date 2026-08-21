export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', path: 'handler-test' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
