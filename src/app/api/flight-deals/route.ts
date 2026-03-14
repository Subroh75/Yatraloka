import { NextResponse } from 'next/server';
import { fetchFlightDeals, CACHE_CONTROL_HEADER } from '@/lib/travelEngine';

export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get('from') ?? undefined;
  const to = url.searchParams.get('to') ?? undefined;
  const date = url.searchParams.get('date') ?? undefined;
  const passengers = url.searchParams.has('passengers')
    ? Number(url.searchParams.get('passengers'))
    : undefined;

  const deals = await fetchFlightDeals({ from, to, date, passengers });

  return NextResponse.json(deals, {
    headers: {
      'Cache-Control': CACHE_CONTROL_HEADER,
    },
  });
}
