import { useState } from 'react';
import { MapPin, Search, Navigation, AlertTriangle, Calendar, ExternalLink } from 'lucide-react';
import { ncElectionData } from '../data/mockElections';

export default function Home() {
  const [address, setAddress] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!address.trim()) return;
    
    setIsSearching(true);
    // Simulate a quick network request, then load our mock data
    setTimeout(() => {
      setResults(ncElectionData);
      setIsSearching(false);
    }, 600);
  };

  const handleLocation = () => {
    setIsSearching(true);
    setTimeout(() => {
      setAddress("123 Sample St, Charlotte, NC 28202");
      setResults(ncElectionData);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-12">
      {/* Search Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-navy px-6 py-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Find Your Ballot</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Enter your North Carolina street address to see upcoming elections, candidates, and voting deadlines.
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Where are you registered to vote?
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
                disabled={isSearching}
                className="ml-3 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-70"
              >
                <Search className="h-4 w-4" />
                {isSearching ? 'Searching...' : 'Search'}
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

      {/* Results Section */}
      {results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Demonstration Data Warning */}
          {results.isMockData && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong>Prototype Mode:</strong> Showing demonstration data for North Carolina. Always verify official deadlines with the NC State Board of Elections.
              </p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-navy border-b pb-2">Your Upcoming Elections</h2>
          
          {results.upcomingElections.map((election) => (
            <div key={election.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-teal" />
                    {election.name}
                  </h3>
                  <p className="text-gray-500 mt-1">Election Day: {new Date(election.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</p>
                </div>
                <span className="bg-blue-100 text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  {election.type}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">Important Dates</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><span className="font-medium">Registration Deadline:</span> {new Date(election.registrationDeadline).toLocaleDateString()}</li>
                    <li><span className="font-medium">Early Voting Begins:</span> {new Date(election.earlyVotingStart).toLocaleDateString()}</li>
                    <li><span className="font-medium">Early Voting Ends:</span> {new Date(election.earlyVotingEnd).toLocaleDateString()}</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">On Your Ballot</h4>
                  <div className="flex flex-wrap gap-2">
                    {election.offices.map((office, idx) => (
                      <span key={idx} className="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md">
                        {office}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                <a 
                  href={election.officialInfoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-teal hover:text-navy font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  Verify on NCSBE.gov <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}