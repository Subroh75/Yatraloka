import { Search, Plane, Calendar, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="text-white text-2xl font-bold">Yatraloka</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-200">Flights</a>
          <a href="#" className="text-white hover:text-gray-200">Hotels</a>
          <a href="#" className="text-white hover:text-gray-200">Trains</a>
          <a href="#" className="text-white hover:text-gray-200">Buses</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl text-white/80 text-center mb-12 max-w-2xl">
          Book flights, hotels, and more with the best deals around the world
        </p>

        {/* Smart Search Bar */}
        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="From"
                className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-600"
              />
            </div>
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="To"
                className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-600"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 bg-white/50 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50">
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3 Passengers</option>
                <option>4+ Passengers</option>
              </select>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
            <Search className="h-5 w-5" />
            Search Flights
          </button>
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
      </main>
    </div>
  );
}
