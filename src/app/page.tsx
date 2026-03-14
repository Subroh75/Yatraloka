'use client';

'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  Plane,
  Calendar,
  Users,
  Loader2,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

import { FlightDeal, fetchFlightDeals } from '@/lib/travelEngine';

export default function Home() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [results, setResults] = useState<FlightDeal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<FlightDeal | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
  };

  const cheapestDealId = useMemo(() => {
    if (results.length === 0) return null;
    return results.reduce<string | null>((bestId, deal) => {
      if (!bestId) return deal.id;
      const bestDeal = results.find((r) => r.id === bestId);
      if (!bestDeal) return deal.id;
      return deal.adjustedPrice < bestDeal.adjustedPrice ? deal.id : bestId;
    }, null);
  }, [results]);

  const handleBook = (deal: FlightDeal) => {
    setSelectedDeal(deal);
    setIsBooking(true);
  };

  const closeBooking = () => {
    setIsBooking(false);
    setSelectedDeal(null);
  };

  const getFlightTimes = (index: number) => {
    const baseHour = 6 + (index % 5) * 2;
    const depart = `${String(baseHour).padStart(2, '0')}:00`;
    const arrive = `${String((baseHour + 2) % 24).padStart(2, '0')}:30`;
    return { depart, arrive };
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      const deals = await fetchFlightDeals({
        from,
        to,
        date,
        passengers,
      });
      setResults(deals);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] via-[#A2D2FF] to-[#FF7E5F]">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="text-white text-2xl font-bold">Yatraloka</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-200">
            Flights
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            Hotels
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            Trains
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            Buses
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--heading)] text-center mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl text-white/80 text-center mb-12 max-w-2xl">
          Book flights, hotels, and more with the best deals around the world
        </p>

        {/* Smart Search Bar */}
        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                type="text"
                placeholder="From"
                className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-600"
              />
            </div>
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                value={to}
                onChange={(event) => setTo(event.target.value)}
                type="text"
                placeholder="To"
                className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-600"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={passengers}
                onChange={(event) => setPassengers(Number(event.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4+ Passengers</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full bg-[var(--button)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Explore Horizon
              </>
            )}
          </button>

          <div className="mt-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-2 text-white/80">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-sm">Fetching the best deals for you…</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((deal, index) => {
                  const { depart, arrive } = getFlightTimes(index);
                  const isCheapest = deal.id === cheapestDealId;

                  return (
                    <div
                      key={deal.id}
                      className="relative bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10"
                    >
                      {isCheapest && (
                        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow">
                          <Sparkles className="h-4 w-4" />
                          Limited Time Offer
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow">
                            <Plane className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Airline</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {deal.airline}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Destination</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {deal.destination}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-gray-50 p-4">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <p className="text-xs font-semibold">Departure</p>
                          </div>
                          <p className="mt-1 text-lg font-semibold text-gray-900">
                            {depart}
                          </p>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-4">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <p className="text-xs font-semibold">Arrival</p>
                          </div>
                          <p className="mt-1 text-lg font-semibold text-gray-900">
                            {arrive}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Adjusted Price</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(deal.adjustedPrice)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Includes Growth Scout margin (≈{Math.round(deal.margin * 100)}%)
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleBook(deal)}
                          className="rounded-xl bg-[var(--button)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(0,210,255,0.25)] transition hover:opacity-90"
                        >
                          Start Your Safar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center text-white/80">
                <p className="font-medium">Search to see flight deals appear here.</p>
                <p className="text-sm mt-2">
                  The results are styled to match the Traveloka experience.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
            <div className="text-3xl mb-2">✈️</div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-white/80">Guaranteed lowest fares on all routes</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
            <div className="text-3xl mb-2">🏨</div>
            <h3 className="text-xl font-semibold mb-2">Premium Hotels</h3>
            <p className="text-white/80">Handpicked luxury accommodations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Fast Booking</h3>
            <p className="text-white/80">Instant confirmation and easy cancellations</p>
          </div>
        </div>

        {isBooking && selectedDeal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {bookingConfirmed ? 'Safar Confirmed!' : 'Confirm Your Safar'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {bookingConfirmed
                      ? 'Your itinerary has been saved. We’ll send a confirmation email shortly.'
                      : 'Review the flight details and lock in your fare.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeBooking}
                  className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  aria-label="Close booking modal"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {bookingConfirmed ? (
                  <div className="flex flex-col items-center gap-4 rounded-2xl bg-emerald-50 p-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      Booking confirmed!
                    </p>
                    <p className="text-sm text-gray-600">
                      Your trip to {selectedDeal.destination} is locked in. Keep an eye on your inbox for itinerary details.
                    </p>
                    <button
                      type="button"
                      onClick={closeBooking}
                      className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                      <div>
                        <p className="text-xs text-gray-500">Airline</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {selectedDeal.airline}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Destination</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {selectedDeal.destination}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs text-gray-500">Departure</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {getFlightTimes(results.findIndex((r) => r.id === selectedDeal.id)).depart}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs text-gray-500">Arrival</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {getFlightTimes(results.findIndex((r) => r.id === selectedDeal.id)).arrive}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">Total (including margin)</p>
                      <p className="mt-1 text-3xl font-bold text-gray-900">
                        {formatCurrency(selectedDeal.adjustedPrice)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Includes Growth Scout margin (≈{Math.round(selectedDeal.margin * 100)}%)
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={closeBooking}
                        className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmBooking}
                        className="rounded-xl bg-[var(--button)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(0,210,255,0.25)] hover:opacity-90"
                      >
                        Confirm Your Safar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
