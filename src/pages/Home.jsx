import { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

export default function Home() {
  const [address, setAddress] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for Address:", address);
    // We will add real search logic here in Phase 3
  };

  const handleLocation = () => {
    console.log("Browser location services will be triggered here");
    // Placeholder for Geolocation API
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-navy px-6 py-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Find Your Ballot</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Enter your North Carolina street address to see upcoming elections, candidates, and voting deadlines.
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Where are you registered to vote? (Full address needed for accurate districts)
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="address"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal bg-gray-50"
                placeholder="e.g. 123 Main St, Charlotte, NC 28202"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="submit"
                className="ml-3 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
            
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={handleLocation}
                className="text-sm text-navy hover:text-teal font-medium flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Use my current location instead
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}