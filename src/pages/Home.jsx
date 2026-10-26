import { useState } from 'react';
import { MapPin, Search, Calendar, Info } from 'lucide-react';

export default function Home() {
  const [address, setAddress] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // Securely loads the API key from your .env file
  const API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY; 

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!address.trim()) return;
    
    setIsSearching(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(address)}&key=${API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Failed to find election data for this address.");
      }
      
      setResults(data);
    } catch (err) {
      setError(err.message || "Could not connect to the election database.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-navy px-6 py-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Find Your Live Ballot</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Enter your full street address to pull live data from the Google Civic Information database.
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal bg-gray-50"
                placeholder="e.g. 123 Main St, Charlotte, NC 28202"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="ml-3 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <Search className="h-4 w-4" />
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error Message (if the API key is wrong or network fails) */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-red-700 mb-8">
          {error}
        </div>
      )}

      {/* No Elections Message (API works, but no elections for this address) */}
      {results && !results.elections && !results.contests && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm animate-in fade-in mb-8 flex gap-4">
          <Info className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-navy mb-2">No Upcoming Elections Found</h3>
            <p className="text-gray-700">
              The Google Civic Information database does not currently show any active upcoming elections for this specific address. Check back closer to Election Day!
            </p>
          </div>
        </div>
      )}

      {/* Election Results (API works, and elections exist!) */}
      {results && (results.elections || results.contests) && (
        <div className="space-y-6 animate-in fade-in">
          
          {results.elections && (
            <>
              <h2 className="text-2xl font-bold text-navy border-b pb-2">Live Upcoming Elections</h2>
              {results.elections.map((election) => (
                <div key={election.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-teal" />
                        {election.name}
                      </h3>
                      <p className="text-gray-500 mt-1">Election Day: {election.electionDay}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {results.contests && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-navy mb-4">On Your Ballot</h3>
              <div className="grid gap-4">
                {results.contests.map((contest, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900">{contest.office || contest.type}</h4>
                    {contest.candidates && (
                      <ul className="mt-2 space-y-1">
                        {contest.candidates.map((candidate, cIdx) => (
                          <li key={cIdx} className="text-gray-700 flex justify-between">
                            <span>{candidate.name}</span>
                            <span className="text-sm text-gray-500">{candidate.party}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}