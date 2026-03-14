export type FlightDeal = {
  id: string;
  airline: string;
  destination: string;
  basePrice: number;
  adjustedPrice: number;
  margin: number;
};

const GROWTH_SCOUT_MARGIN = 0.12; // 12% margin applied to the base fare

function applyGrowthScoutMargin(basePrice: number, margin: number) {
  return Math.round(basePrice * (1 + margin));
}

export type FetchFlightDealsParams = {
  from?: string;
  to?: string;
  date?: string;
  passengers?: number;
};

import { cache } from 'react';

export const CACHE_CONTROL_HEADER =
  'public, s-maxage=600, stale-while-revalidate=1200';

const cacheTTL = 600 * 1000; // 10 minutes

const dealCache = new Map<
  string,
  { createdAt: number; deals: FlightDeal[] }
>();

async function _fetchFlightDeals(
  params: FetchFlightDealsParams = {}
): Promise<FlightDeal[]> {
  // Simulate a real API call with a short delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  const sampleDeals = [
    {
      airline: 'AiryVista',
      destination: params.to || 'Bali',
      basePrice: 279,
    },
    {
      airline: 'Skylane Express',
      destination: params.to || 'Bali',
      basePrice: 339,
    },
    {
      airline: 'Pacific Wings',
      destination: params.to || 'Bali',
      basePrice: 299,
    },
    {
      airline: 'Sunset Air',
      destination: params.to || 'Bali',
      basePrice: 259,
    },
  ];

  const deals = sampleDeals.map((deal, index) => ({
    id: `deal-${index}`,
    airline: deal.airline,
    destination: deal.destination,
    basePrice: deal.basePrice,
    adjustedPrice: applyGrowthScoutMargin(deal.basePrice, GROWTH_SCOUT_MARGIN),
    margin: GROWTH_SCOUT_MARGIN,
  }));

  return deals;
}

export const fetchFlightDeals = cache(async (params: FetchFlightDealsParams = {}) => {
  const key = JSON.stringify(params);
  const cached = dealCache.get(key);
  const now = Date.now();

  if (cached && now - cached.createdAt < cacheTTL) {
    return cached.deals;
  }

  const deals = await _fetchFlightDeals(params);
  dealCache.set(key, { createdAt: now, deals });
  return deals;
});
