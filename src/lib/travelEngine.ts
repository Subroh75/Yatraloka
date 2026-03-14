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

export async function fetchFlightDeals(
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

  return sampleDeals.map((deal, index) => ({
    id: `deal-${index}`,
    airline: deal.airline,
    destination: deal.destination,
    basePrice: deal.basePrice,
    adjustedPrice: applyGrowthScoutMargin(deal.basePrice, GROWTH_SCOUT_MARGIN),
    margin: GROWTH_SCOUT_MARGIN,
  }));
}
