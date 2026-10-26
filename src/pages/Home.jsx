import { useState } from 'react';
import { MapPin, Search, Calendar, Info, FileText, Navigation, Map as MapIcon, CheckSquare } from 'lucide-react';

export default function Home({ electionData, setElectionData }) {
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY; 

  const fetchCivicData = async (searchAddress) => {
    setIsSearching(true);
    setError('');
    setElectionData(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(searchAddress)}&key=${API_KEY}`
      );
      const data = await response.json();
      
      if (data.error) throw new Error(data.error.message || "Failed to find election data.");
      setElectionData(data);
    } catch (err) {
      setError(err.message || "Could not connect to the election database.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (address.trim()) fetchCivicData(address);
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    
    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          
          if (data.display_name) {
            setAddress(data.display_name);
            fetchCivicData(data.display_name);
          } else {
            throw new Error("Could not translate coordinates to an address.");
          }
        } catch (err) {
          setError("Could not determine your address from GPS. Please type it manually.");
          setIsSearching(false);
        }
      }, 
      () => {
        setError("Location access denied. Please type your address manually.");
        setIsSearching(false);
      }
    );
  };

  const hasAnyData = electionData && (electionData.elections || electionData.pollingLocations || electionData.contests);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 pb-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-navy px-6 py-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Find Your Live Ballot</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Enter your street address or use your GPS location to pull live election logistics.
          </p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleManualSearch} className="max-w-xl mx-auto">
            <div className="relative flex items-center mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal bg-gray-50"
                placeholder="e.g. 123 Main St, Charlotte, NC"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button type="submit" disabled={isSearching} className="ml-3 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 cursor-pointer disabled:opacity-70">
                <Search className="h-4 w-4" />
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
            
            <div className="flex justify-center mb-8">
              <button type="button" onClick={handleLocation} disabled={isSearching} className="text-sm text-navy hover:text-teal font-medium flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50">
                <Navigation className="h-4 w-4" />
                Use my current GPS location
              </button>
            </div>

            <div className="bg-teal/5 border border-teal/20 p-5 rounded-lg">
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2"><CheckSquare className="h-5 w-5 text-teal"/> Voter Action Plan</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-teal focus:ring-teal" /> Confirm your polling location</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-teal focus:ring-teal" /> Review your ballot measures</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-teal focus:ring-teal" /> Investigate candidates (Compare Tab)</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-teal focus:ring-teal" /> Cast your vote on Election Day</label>
              </div>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-red-700 mb-8">{error}</div>}
      
      {electionData && !hasAnyData && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm mb-8 flex gap-4">
          <Info className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-navy mb-2">No Upcoming Elections Found</h3>
            <p className="text-gray-700">Google Civic Information does not show any active upcoming elections for this location.</p>
          </div>
        </div>
      )}

      {hasAnyData && (
        <div className="space-y-6 animate-in fade-in">
          {electionData.elections && (
            <>
              <h2 className="text-2xl font-bold text-navy border-b pb-2">Upcoming Election Dates</h2>
              {electionData.elections.map((election) => (
                <div key={election.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-navy flex items-center gap-2"><Calendar className="h-5 w-5 text-teal" />{election.name}</h3>
                  <p className="text-gray-500 mt-1">Election Day: {election.electionDay}</p>
                </div>
              ))}
            </>
          )}

          {electionData.pollingLocations && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-navy border-b pb-2 mb-4">Your Polling Locations</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {electionData.pollingLocations.map((poll, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-navy flex items-center gap-2 mb-2"><MapIcon className="h-4 w-4 text-teal" /> {poll.address.locationName}</h4>
                    <p className="text-gray-600 text-sm">{poll.address.line1}, {poll.address.city}, {poll.address.state} {poll.address.zip}</p>
                    {poll.pollingHours && <p className="text-sm text-gray-500 mt-2"><strong>Hours:</strong> {poll.pollingHours}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {electionData.contests && electionData.contests.some(c => c.type === 'Referendum') && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-navy border-b pb-2 mb-4">Ballot Measures & Referendums</h2>
              <div className="grid gap-4">
                {electionData.contests.filter(c => c.type === 'Referendum').map((contest, idx) => (
                  <div key={idx} className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
                    <h4 className="font-bold text-navy text-lg flex items-center gap-2"><FileText className="h-5 w-5" /> {contest.referendumTitle || "Ballot Measure"}</h4>
                    {contest.referendumSubtitle && <p className="text-sm font-semibold text-gray-700 mt-2">{contest.referendumSubtitle}</p>}
                    {contest.referendumUrl && <a href={contest.referendumUrl} target="_blank" rel="noreferrer" className="text-teal hover:underline text-sm mt-3 inline-block font-medium">Read Full Measure Text</a>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {electionData.contests && electionData.contests.some(c => c.type !== 'Referendum') && (
            <div className="mt-8 bg-teal/10 p-6 rounded-xl border border-teal/20 text-center">
              <h3 className="text-xl font-bold text-navy mb-2">Candidates Found!</h3>
              <p className="text-gray-700 mb-4">We found live candidate races for your address. Visit the Candidates tab to view the politicians running for office.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}