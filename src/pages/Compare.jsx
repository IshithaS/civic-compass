import { useState } from 'react';
import { Scale, AlertCircle, ExternalLink, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Compare({ electionData }) {
  const [selectedContest, setSelectedContest] = useState('');
  
  if (!electionData || !electionData.contests) {
    return (
      <div className="max-w-4xl mx-auto mt-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-navy mb-2">No Ballot Loaded</h2>
        <p className="text-gray-600 mb-6">Search your address on the Dashboard to load live candidates for comparison.</p>
        <Link to="/" className="bg-teal text-white px-6 py-3 rounded-lg font-medium">Go to Dashboard</Link>
      </div>
    );
  }

  const racesWithCandidates = electionData.contests.filter(c => c.type !== 'Referendum' && c.candidates?.length > 1);
  const activeContest = racesWithCandidates.find(c => c.office === selectedContest) || racesWithCandidates[0];

  if (!activeContest) {
    return <div className="text-center mt-20 text-gray-600">No contested races found on your ballot to compare.</div>;
  }

  const [cand1, cand2] = activeContest.candidates;
  const issues = ["Economy & Taxes", "Education", "Healthcare", "Infrastructure"];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2 flex items-center gap-3"><Scale className="h-8 w-8 text-teal" /> Policy Research Hub</h1>
        <p className="text-gray-600 max-w-2xl">Select an office to investigate the candidates through independent 3rd-party databases.</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-navy mb-2">Select a Race on Your Ballot:</label>
        <select 
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal bg-white"
          value={activeContest.office}
          onChange={(e) => setSelectedContest(e.target.value)}
        >
          {racesWithCandidates.map((c, idx) => (
            <option key={idx} value={c.office}>{c.office}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-gray-200 border-b border-gray-200 bg-gray-50">
          <div className="p-6 text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 bg-gray-200 text-gray-800">{cand1?.party || "Unknown"}</span>
            <h2 className="text-2xl font-bold text-navy">{cand1?.name}</h2>
            <div className="mt-4 flex flex-col gap-2">
              <a href={`https://ballotpedia.org/wiki/index.php?search=${encodeURIComponent(cand1?.name)}`} target="_blank" rel="noreferrer" className="text-sm bg-blue-50 text-blue-700 py-2 rounded-md hover:bg-blue-100 flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" /> View on Ballotpedia
              </a>
            </div>
          </div>
          <div className="p-6 text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 bg-gray-200 text-gray-800">{cand2?.party || "Unknown"}</span>
            <h2 className="text-2xl font-bold text-navy">{cand2?.name}</h2>
            <div className="mt-4 flex flex-col gap-2">
              <a href={`https://ballotpedia.org/wiki/index.php?search=${encodeURIComponent(cand2?.name)}`} target="_blank" rel="noreferrer" className="text-sm bg-blue-50 text-blue-700 py-2 rounded-md hover:bg-blue-100 flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" /> View on Ballotpedia
              </a>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {issues.map((issue, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="bg-navy text-white py-2 px-4 text-center text-sm font-bold uppercase tracking-widest">{issue}</div>
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="p-6 text-center">
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(cand1?.name + " " + issue + " policy")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-teal hover:text-navy font-medium">
                    <SearchIcon className="h-4 w-4" /> Search {cand1?.name}'s stance
                  </a>
                </div>
                <div className="p-6 text-center">
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(cand2?.name + " " + issue + " policy")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-teal hover:text-navy font-medium">
                    <SearchIcon className="h-4 w-4" /> Search {cand2?.name}'s stance
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}